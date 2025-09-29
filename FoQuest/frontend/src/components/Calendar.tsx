"use client"; // This component runs on the client (uses state, events, etc.)
import { useMemo, useState } from "react";

// Minimal event shape used by the calendar
type EventItem = { id: string; date: string; title: string; };

// Helpers for date formatting and comparison
function pad(n: number) { return n < 10 ? `0${n}` : `${n}`; }
function toISO(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function endOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth()+1, 0); }
function addMonths(d: Date, k: number) { const nd = new Date(d); nd.setMonth(nd.getMonth()+k); return nd; }
function sameDay(a: Date,b: Date){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}

// Labels for the weekday header row
const weekdayLabels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

/**
 * Calendar component
 * Props:
 *  - initialDate: optional date to focus on when mounting
 *  - events: list of { id, date: "YYYY-MM-DD", title }
 *  - onDateChange: callback when a user selects a date (ISO string)
 */
export default function Calendar({
  initialDate,
  events = [],
  onDateChange,
}: {
  initialDate?: Date;
  events?: EventItem[];
  onDateChange?: (isoDate: string) => void;
}) {
  // Snapshot of "today" so it does not change during re-renders
  const today = useMemo(() => new Date(), []);

  // "cursor" is the month being viewed
  const [cursor, setCursor] = useState<Date>(initialDate ?? new Date());

  // Currently selected day in ISO format
  const [selectedISO, setSelectedISO] = useState<string>(toISO(initialDate ?? new Date()));

  // Build the visible 6 week grid and the "September 2025" style label
  const { gridDays, monthLabel } = useMemo(() => {
    const first = startOfMonth(cursor);

    // Start the grid on the Sunday at or before day 1 of the month
    const firstGridDate = new Date(first);
    firstGridDate.setDate(first.getDate() - first.getDay());

    // Always render 6 rows x 7 days to keep the layout stable
    const days: { date: Date; inMonth: boolean }[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(firstGridDate);
      d.setDate(firstGridDate.getDate() + i);
      days.push({ date: d, inMonth: d.getMonth() === cursor.getMonth() });
    }

    return {
      gridDays: days,
      monthLabel: `${cursor.toLocaleString(undefined,{month:"long"})} ${cursor.getFullYear()}`
    };
  }, [cursor]);

  // Index events by date for quick lookup and badge counts
  const eventsByDay = useMemo(() => {
    const m = new Map<string, EventItem[]>();
    for (const ev of events) m.set(ev.date, [...(m.get(ev.date) ?? []), ev]);
    return m;
  }, [events]);

  // Events for the currently selected day
  const selectedEvents = eventsByDay.get(selectedISO) ?? [];

  // When a user clicks a day cell
  function selectDate(d: Date) {
    const iso = toISO(d);
    setSelectedISO(iso);
    onDateChange?.(iso);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Left side: calendar grid */}
      <div className="rounded-2xl shadow p-4 bg-white/50 dark:bg-zinc-900/50">
        {/* Header with month title and navigation */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-semibold">{monthLabel}</div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded-xl border"
              onClick={() => setCursor(addMonths(cursor,-1))}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 rounded-xl border"
              onClick={() => setCursor(new Date())}
            >
              Today
            </button>
            <button
              className="px-3 py-1 rounded-xl border"
              onClick={() => setCursor(addMonths(cursor,1))}
            >
              Next
            </button>
          </div>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 text-sm text-zinc-500 mb-2">
          {weekdayLabels.map(d => (
            <div key={d} className="px-2 py-1 text-center">{d}</div>
          ))}
        </div>

        {/* 6x7 grid of day cells */}
        <div className="grid grid-cols-7 gap-1">
          {gridDays.map(({ date, inMonth }) => {
            const iso = toISO(date);
            const isToday = sameDay(date, today);
            const isSelected = iso === selectedISO;
            const count = (eventsByDay.get(iso)?.length ?? 0);

            return (
              <button
                key={iso}
                onClick={() => selectDate(date)}
                className={[
                  "aspect-square rounded-xl p-2 text-left border hover:shadow-sm",
                  inMonth ? "" : "opacity-40", // dim days outside the current month
                  isSelected ? "ring-2 ring-black/70 dark:ring-white" : "", // highlight selected
                ].join(" ")}
              >
                {/* Day number and optional count badge */}
                <div className="flex items-center justify-between">
                  <span className={isToday ? "font-bold underline" : "font-medium"}>
                    {date.getDate()}
                  </span>
                  {count > 0 ? (
                    <span className="text-xs rounded-full px-2 border">{count}</span>
                  ) : null}
                </div>

                {/* Small dots to hint multiple events */}
                <div className="mt-2 flex gap-1">
                  {(eventsByDay.get(iso) ?? []).slice(0,3).map(ev => (
                    <span key={ev.id} className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: selected day details */}
      <div className="rounded-2xl shadow p-4 bg-white/50 dark:bg-zinc-900/50">
        <div className="text-lg font-semibold mb-2">
          {new Date(selectedISO).toLocaleDateString(undefined, {
            weekday:"long", year:"numeric", month:"long", day:"numeric"
          })}
        </div>

        {/* List events for the selected date */}
        {selectedEvents.length === 0 ? (
          <div className="text-sm text-zinc-500">No events for this date</div>
        ) : (
          <ul className="space-y-2">
            {selectedEvents.map(ev => (
              <li key={ev.id} className="p-3 rounded-xl border hover:shadow-sm">
                <div className="text-sm font-medium">{ev.title}</div>
                <div className="text-xs text-zinc-500">{ev.date}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
