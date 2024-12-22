import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Your Habits</h1>
      <Link href="/add-habit">
        <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition">
          Add Habit
        </button>
      </Link>
    </header>
  );
}
