import { Suspense } from "react";
import WeightChart from "./weight-chart";
import { Metadata } from "next";
import Digits from "components/digits";
import { cachedWeights, Skeleton } from "components/metrics";

function calculateBMI(weightKg: number, heightM: number = 1.8) {
  return (weightKg / (heightM * heightM)).toFixed(1);
}

export const metadata: Metadata = {
  title: "Weight",
  description: "Jan's weight progress over time",
};

export default function WeightPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-4">Weight</h1>
      <p className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200 mb-8">
        I believe in transparency and accountability. Here's my weight journey,
        automatically tracked and shared because data is beautiful – and because
        I can.
      </p>
      <Suspense fallback={<WeightStatsSkeleton />}>
        <WeightStats />
      </Suspense>
    </section>
  );
}

async function WeightStats() {
  const weights = await cachedWeights();

  if (!weights || weights.length === 0) {
    return (
      <p className="text-neutral-500 dark:text-neutral-400">
        No weight data available. Please check your Google Sheets connection.
      </p>
    );
  }

  const latest = weights[weights.length - 1];
  const bmi = calculateBMI(latest.weight);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8">
        <div>
          <h2 className="text-sm uppercase text-neutral-500 dark:text-neutral-400 mb-1">
            Weight
          </h2>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            <Digits name="stat-weight" value={`${latest.weight}kg`} />
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase text-neutral-500 dark:text-neutral-400 mb-1">
            BMI
          </h2>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            <Digits name="stat-bmi" value={bmi} />
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase text-neutral-500 dark:text-neutral-400 mb-1">
            Body Fat
          </h2>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            <Digits name="stat-body-fat" value={`${latest.fatMassPercent}%`} />
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 mb-4">
        <WeightChart weights={weights} />
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Last updated:{" "}
        {new Date(
          latest.timestamp
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
    </>
  );
}

function WeightStatsSkeleton() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8">
        {["Weight", "BMI", "Body Fat"].map((label) => (
          <div key={label}>
            <h2 className="text-sm uppercase text-neutral-500 dark:text-neutral-400 mb-1">
              {label}
            </h2>
            <p className="text-2xl font-bold">
              <Skeleton className="h-7 w-16" />
            </p>
          </div>
        ))}
      </div>
      <div className="t-skel-skeleton is-pulsing mb-4">
        <div className="w-full h-[400px] rounded bg-neutral-100 dark:bg-neutral-900" />
      </div>
      <p className="text-sm">
        <Skeleton className="h-4 w-48" />
      </p>
    </>
  );
}
