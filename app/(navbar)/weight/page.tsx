import { getAllWeights } from "lib/weight-metrics";
import WeightChart from "./weight-chart";
import { Metadata } from "next";
import contactData from "app/card/contact.json";

function calculateBMI(weightKg: number, heightM: number = 1.8) {
  return (weightKg / (heightM * heightM)).toFixed(1);
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Weight",
  description: "Jan's weight progress over time",
};

export default async function WeightPage() {
  const weights = await getAllWeights();
  console.log("Fetched weights:", weights);

  if (!weights || weights.length === 0) {
    return (
      <section>
        <h1 className="font-bold text-3xl font-serif mb-4">Weight</h1>
        <p className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
          I believe in transparency and accountability. Here's my weight
          journey, automatically tracked and shared because data is beautiful –
          and because I can.
        </p>
        <p className="text-neutral-500 dark:text-neutral-400">
          No weight data available. Please check your Google Sheets connection.
        </p>
      </section>
    );
  }

  // Sort weights by timestamp
  weights.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  // Calculate stats
  const latestWeight = weights[weights.length - 1]?.weight;
  const bmi = latestWeight ? calculateBMI(latestWeight) : null;

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-4">Weight</h1>
      <p className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200 mb-8">
        I believe in transparency and accountability. Here's my weight journey,
        automatically tracked and shared because data is beautiful – and because
        I can.
      </p>

      <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8">
        <div>
          <h2 className="text-sm uppercase text-neutral-500 dark:text-neutral-400 mb-1">
            Weight
          </h2>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            {latestWeight}kg
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase text-neutral-500 dark:text-neutral-400 mb-1">
            BMI
          </h2>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            {bmi}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase text-neutral-500 dark:text-neutral-400 mb-1">
            Body Fat
          </h2>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            {weights[weights.length - 1].fatMassPercent}%
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 mb-4">
        <WeightChart weights={weights} />
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Last updated:{" "}
        {new Date(
          weights[weights.length - 1].timestamp
            .replace("Date: ", "")
            .replace(" at ", " ")
            .replace("AM", " AM")
            .replace("PM", " PM"),
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </section>
  );
}
