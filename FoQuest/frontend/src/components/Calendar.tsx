"use client";
import { useMemo, useState } from "react";

type EventItem = { id: string; date: string; title: string; };

function pad(n: number) { return n < 10 ? `0${n}` : `${n}`; }
function toISO(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d: Date, k: number) { const nd = new Date(d); nd.setMonth(nd.getMonth()+k); return nd; }
function sameDay(a: Date,b: Date){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
const weekdayLabels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function Calendar({
  initialDate,
  events = [],
  onDateChange,
}: {
  initialDate?: Date;
  events?: EventItem[];
  onDateChange?: (isoDate: string) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState<Date>(initialDate ?? new Date());
  const [selectedISO, setSelectedISO] = useState<string>(toISO(initialDate ?? new Date()));

  const { gridDays, monthLabel } = useMemo(() => {
    const first = startOfMonth(cursor);
    const firstGridDate = new Date(first);
    firstGridDate.setDate(first.getDate() - first.getDay()); // start on Sunday
    const days: { date: Date; inMonth: boolean }[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(firstGridDate);
      d.setDate(firstGridDate.getDate() + i);
      days.push({ date: d, inMonth: d.getMonth() === cursor.getMonth() });
    }
    return {
      gridDays: days,
      monthLabel: `${cursor.toLocaleString(undefined, { month: "long" })} ${cursor.getFullYear()}`,
    };
  }, [cursor]);

  const eventsByDay = useMemo(() => {
    const m = new Map<string, EventItem[]>();
    for (const ev of events) m.set(ev.date, [...(m.get(ev.date) ?? []), ev]);
    return m;
  }, [events]);

  const selectedEvents = eventsByDay.get(selectedISO) ?? [];

  function selectDate(d: Date) {
    const iso = toISO(d);
    setSelectedISO(iso);
    onDateChange?.(iso);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Left: calendar grid - white card with black outline */}
      <div className="rounded-2xl p-4 bg-white border border-black">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-semibold text-black">{monthLabel}</div>

          <div className="flex gap-2 text-black">
            <button
              className="px-3 py-1 rounded-xl border border-black hover:bg-gray-50"
              onClick={() => setCursor(addMonths(cursor,-1))}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 rounded-xl border border-black hover:bg-gray-50"
              onClick={() => setCursor(new Date())}
            >
              Today
            </button>
            <button
              className="px-3 py-1 rounded-xl border border-black hover:bg-gray-50"
              onClick={() => setCursor(addMonths(cursor,1))}
            >
              Next
            </button>
          </div>
        </div>

        {/* Weekday header - black divider line */}
        <div className="grid grid-cols-7 text-sm text-black mb-2">
          {weekdayLabels.map(d => (
            <div key={d} className="px-2 py-1 text-center">{d}</div>
          ))}
        </div>

        {/* Day cells - white with black outlines */}
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
                  "aspect-square rounded-md p-2 text-left",
                  "border border-black",
                  "hover:bg-gray-200",
                  "text-black",
                  inMonth ? "" : "opacity-50",
                  isSelected ? "ring-2 ring-black" : "",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span className={(isToday ? "font-bold underline " : "font-medium ") + "text-black"}>

                    {date.getDate()}
                  </span>
                  {count > 0 ? (
                    <span className="text-xs rounded-full px-2 border border-black">
                      {count}
                    </span>
                  ) : null}
                </div>
                <div className="mt-2 flex gap-1">
                  {(eventsByDay.get(iso) ?? []).slice(0,3).map(ev => (
                    <span key={ev.id} className="w-1.5 h-1.5 rounded-full bg-black" />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: selected day details - white card with black outline */}
      <div className="rounded-2xl p-4 bg-white border border-black">
        <div className="text-lg font-semibold mb-2 text-black">
          {new Date(selectedISO).toLocaleDateString(undefined,{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
        </div>

        {selectedEvents.length === 0 ? (
          <div className="text-sm text-black">No events for this date</div>
        ) : (
          <ul className="space-y-2">
            {selectedEvents.map(ev => (
              <li key={ev.id} className="p-3 rounded-xl border border-black hover:bg-gray-50">
                <div className="bg-yellow-200 text-sm font-medium text-black font-bold">{ev.title}</div>
                <div className="text-xs text-black">{ev.date}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
