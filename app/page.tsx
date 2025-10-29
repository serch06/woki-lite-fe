"use client";

import useSWR from "swr";
import { useState } from "react";
import { format, addDays } from "date-fns";
import { apiGet } from "@/lib/api";

interface Reservation {
  id: string;
  sectorId: string;
  startDateTimeISO: string;
  status: string;
  partySize: number;
}

export default function Home() {
  const [date, setDate] = useState(new Date());

  const { data, error, isLoading, mutate } = useSWR<Reservation[]>(
    `/reservations/day?restaurantId=R1&date=${format(date, "yyyy-MM-dd")}`,
    apiGet
  );

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Woki Lite — Day View</h1>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setDate(addDays(date, -1))}
          className="px-3 py-1 border rounded"
        >
          ← Prev
        </button>
        <span className="px-4 py-1 font-semibold">
          {format(date, "yyyy-MM-dd")}
        </span>
        <button
          onClick={() => setDate(addDays(date, 1))}
          className="px-3 py-1 border rounded"
        >
          Next →
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error loading reservations</p>}

      {data && (
        <div className="space-y-3">
          {data.length === 0 ? (
            <p>No reservations for this day</p>
          ) : (
            data.map((r) => (
              <div
                key={r.id}
                className="p-3 border rounded flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>{r.sectorId}</strong> — {r.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(r.startDateTimeISO).toLocaleTimeString()} ·{" "}
                    {r.partySize} guests
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
