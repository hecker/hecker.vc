import { google } from "googleapis";

interface Credentials {
  client_email: string;
  private_key: string;
}

interface WeightEntry {
  timestamp: string;
  weight: number;
}

function getCredentialsFromEnv(): string {
  const credentialsEnvVar = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;

  if (!credentialsEnvVar) {
    throw new Error(
      "Service account credentials not found in environment variables.",
    );
  }

  let credentialsJson = credentialsEnvVar;

  if (credentialsJson.startsWith('"') && credentialsJson.endsWith('"')) {
    credentialsJson = credentialsJson.substring(1, credentialsJson.length - 1);
  }

  return credentialsJson;
}

export async function getLatestWeight(): Promise<WeightEntry | null> {
  let credentialsJson: string = getCredentialsFromEnv();
  let credentials: Credentials;

  try {
    credentials = JSON.parse(credentialsJson);
  } catch (error) {
    console.error("Error parsing service account credentials JSON:", error);
    return null;
  }

  credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  );

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "12kHjNl0sjaZzCweM0pXahO8ij_wljivv3cnSMeypFaM";

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Measurements!A:B",
    });

    const rows = res.data.values;

    if (rows && rows.length) {
      const latestEntry = rows[rows.length - 1];
      const [timestamp, weight] = latestEntry;

      if (weight) {
        const weightValue = parseFloat(
          weight.replace(/^Weight:\s*/, "").trim(),
        );
        if (!isNaN(weightValue)) {
          return {
            timestamp,
            weight: weightValue,
          };
        }
      }

      console.error("Weight value is not a valid number:", weight);
      return null;
    } else {
      console.error("No data found in the sheet.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching weight data:", error);
    return null;
  }
}
