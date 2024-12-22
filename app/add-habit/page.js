import Link from "next/link";
import AddHabit from "./AddHabit";
import Header from "../components/Header";


export default function AddHabitPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Header/>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Add a New Habit</h1>
        <AddHabit />
      </div>
    </div>
  );
}
