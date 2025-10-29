"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";
import { addDays, format, parseISO } from "date-fns";
import { apiGet } from "@/lib/api";

type Customer = { name: string; phone: string; email: string };
interface Reservation {
  id: string;
  sectorId: string;
  tableIds: string[];
  start: string;
  end: string;
  status: string;
  partySize: number;
  notes?: string | null;
  customer: Customer;
}
interface DayPayload {
  date: string;
  items: Reservation[];
}

const STATUS_CLASS: Record<string, string> = {
  CONFIRMED: "text-emerald-600",
  PENDING: "text-amber-600",
  CANCELLED: "text-rose-600",
};

export default function Home() {
  const [date, setDate] = useState(new Date());

const { data, error, isLoading } = useSWR<DayPayload>(
  `/reservations/day?restaurantId=R1&date=${format(date, "yyyy-MM-dd")}`,
  apiGet
);

const reservations = data?.items ?? [];
console.log(reservations)
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-8 text-slate-900">
      <header className="flex items-center justify-between border-b pb-4">
        <h1 className="text-3xl font-semibold">Woki Lite — Reservas por dia</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDate(addDays(date, -1))}
            className="rounded border px-3 py-1 text-sm transition hover:bg-slate-100"
          >
            ← Anterior
          </button>
          <span className="rounded bg-slate-100 px-4 py-1 font-medium">
            {format(date, "yyyy-MM-dd")}
          </span>
          <button
            onClick={() => setDate(addDays(date, 1))}
            className="rounded border px-3 py-1 text-sm transition hover:bg-slate-100"
          >
            Siguiente →
          </button>
        </div>
      </header>

      {isLoading && <p>Cargando reservas</p>}
      {error && (
        <p className="rounded border border-rose-200 bg-rose-50 p-3 text-rose-700">
          Error cargando reservas!
        </p>
      )}
{!isLoading && !error && (
  reservations.length === 0 ? (
    <p className="text-slate-500">No reservations for this day.</p>
  ) : (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-100 text-slate-600">
            <th className="px-4 py-3 text-left font-semibold">Sector</th>
            <th className="px-4 py-3 text-left font-semibold">Inicio</th>
            <th className="px-4 py-3 text-left font-semibold">Fin</th>
            <th className="px-4 py-3 text-left font-semibold">Mesa(s)</th>
            <th className="px-4 py-3 text-left font-semibold">Estado</th>
            <th className="px-4 py-3 text-left font-semibold"># Pers.</th>
            <th className="px-4 py-3 text-left font-semibold">Cliente</th>
            <th className="px-4 py-3 text-left font-semibold">Phone</th>
            <th className="px-4 py-3 text-left font-semibold">Email</th>
            <th className="px-4 py-3 text-left font-semibold">Notas</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {reservations.map((r) => (
            <tr key={r.id} className="hover:bg-slate-50 transition-colors">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-800">
                {r.sectorId}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                {format(parseISO(r.start), "HH:mm")}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                {format(parseISO(r.end), "HH:mm")}
              </td>
              <td className="px-4 py-3 text-slate-700">
                {r.tableIds.join(", ")}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                    STATUS_CLASS[r.status] ?? "text-slate-600"
                  }`}
                >
                  {r.status}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-700">{r.partySize}</td>
              <td className="px-4 py-3 text-slate-800">{r.customer.name}</td>
              <td className="px-4 py-3 text-slate-500">{r.customer.phone}</td>
              <td className="px-4 py-3 text-slate-500">{r.customer.email}</td>
              <td className="px-4 py-3 text-slate-600">{r.notes ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
)}
    </main>
  );
}
