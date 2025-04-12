import { google } from "googleapis";

// File: https://docs.google.com/spreadsheets/d/12kHjNl0sjaZzCweM0pXahO8ij_wljivv3cnSMeypFaM/edit?gid=0#gid=0

interface Credentials {
  client_email: string;
  private_key: string;
}

export interface WeightEntry {
  timestamp: string;
  weight: number;
  fatMassPercent: string;
}

interface CacheEntry {
  data: WeightEntry[];
  timestamp: number;
}

let weightsCache: CacheEntry | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

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

async function getSheets() {
  let credentialsJson: string = getCredentialsFromEnv();
  let credentials: Credentials;

  try {
    credentials = JSON.parse(credentialsJson);
  } catch (error) {
    console.error("Error parsing service account credentials JSON:", error);
    throw error;
  }

  credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  );

  return google.sheets({ version: "v4", auth });
}

async function fetchWeights(): Promise<WeightEntry[]> {
  const sheets = await getSheets();
  const spreadsheetId = "12kHjNl0sjaZzCweM0pXahO8ij_wljivv3cnSMeypFaM";

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Measurements!A:D",
    });

    const rows = res.data.values;

    if (!rows || rows.length <= 1) {
      console.error("No data found in the sheet.");
      return [];
    }

    // Skip header row and process all entries
    return rows
      .slice(1)
      .map((row) => {
        const [timestamp, weightStr, , fatMassPercentStr] = row;
        const weight = parseFloat(weightStr.replace(/^Weight:\s*/, "").trim());
        const fatMassPercent = fatMassPercentStr
          .replace(/^Fat mass percent:\s*/, "")
          .trim();

        if (isNaN(weight)) {
          console.warn(`Invalid weight value found: ${weightStr}`);
          return null;
        }

        return {
          timestamp,
          weight,
          fatMassPercent,
        };
      })
      .filter((entry): entry is WeightEntry => entry !== null);
  } catch (error) {
    console.error("Error fetching weight data:", error);
    return [];
  }
}

export async function getAllWeights(): Promise<WeightEntry[]> {
  // Check if we have valid cached data
  if (weightsCache && Date.now() - weightsCache.timestamp < CACHE_DURATION) {
    return weightsCache.data;
  }

  // Fetch fresh data
  const weights = await fetchWeights();

  // Update cache
  weightsCache = {
    data: weights,
    timestamp: Date.now(),
  };

  return weights;
}

export async function getLatestWeight(): Promise<WeightEntry | null> {
  const weights = await getAllWeights();
  return weights.length > 0 ? weights[weights.length - 1] : null;
}
