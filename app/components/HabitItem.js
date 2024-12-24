"use client";

import { useState } from "react";
import DeleteHabit from "./DeleteHabit";
import MarkComplete from "./MarkComplete";

export default function HabitItem({ habit, onDelete }) {
  const [streak, setStreak] = useState(habit.streak);

  return (
    <li className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{habit.name}</h2>
        <p className="text-sm text-gray-500">
          Streak: {streak} day{streak !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="flex space-x-2">
        <MarkComplete streak={streak} setStreak={setStreak} habit={habit} />
        <DeleteHabit id={habit._id} onDelete={onDelete} />
      </div>
    </li>
  );
}
