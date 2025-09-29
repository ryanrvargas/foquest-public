import Link from "next/link";
import Calendar from "@/components/Calendar"; 
//CALENDAR PAGE

//Add events here to dates
export default function CalendarPage() {
  const demoEvents = [
    { id: "1", date: "2025-09-29", title: "Yuh" },
    { id: "2", date: "2025-10-02", title: "Now this is epic" },
  ];

  return (
    <main className="p-6 space-y-6">
      {/* Back to home link */}
      <Link
        href="/"
        className="inline-block rounded-xl border px-4 py-2 hover:shadow"
      >
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold">Calendar</h1>
      <Calendar events={demoEvents} />
    </main>
  );
}
