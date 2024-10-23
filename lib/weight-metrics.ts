import { google } from "googleapis";

interface Credentials {
  client_email: string;
  private_key: string;
}

interface WeightEntry {
  timestamp: string;
  weight: number;
}

export async function getLatestWeight(): Promise<WeightEntry | null> {
  const credentials: Credentials = process.env
    .GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS)
    : require("../credentials/weight-data-service-account.json");

  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key.replace(/\\n/gm, "\n"),
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

      // Ensure weight is defined
      if (weight) {
        // Parse the weight value (e.g., "70 kg")
        const weightValue = parseFloat(weight.replace(" kg", "").trim());

        // Check if weightValue is a valid number
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
