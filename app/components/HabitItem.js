"use client";

import { useState } from "react";

export default function HabitItem({ habit }) {
  const [streak, setStreak] = useState(habit.streak);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(habit.completedToday)

  const handleMarkComplete = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/habits/${habit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ streak: streak + 1 }),
      });

      if (!res.ok) {
        throw new Error("Failed to update habit");
      }

      setStreak(streak + 1);
      setCompleted(true)
    } catch (error) {
      console.error("Error updating streak:", error);
      alert("Could not update streak. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{habit.name}</h2>
        <p className="text-sm text-gray-500">
          Streak: {streak} day{streak !== 1 ? "s" : ""}
        </p>
      </div>
      {!completed &&
        <button
          className={`${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-1 px-3 rounded-md transition`}
          onClick={handleMarkComplete}
          disabled={loading || completed}
        >
          {loading ? "Updating..." : "Mark Complete"}
        </button>}
    </li>
  );
}
