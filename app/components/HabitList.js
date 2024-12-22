"use client";

import { useState, useEffect } from "react";
import HabitItem from "./HabitItem";

export default function HabitList() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("/api/habits");
        if (!res.ok) throw new Error("Failed to fetch habits");

        const data = await res.json();
        setHabits(data.habits);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading habits...</p>;
  }

  if (habits.length === 0) {
    return <p className="text-center text-gray-500">No habits yet. Add your first habit!</p>;
  }

  return (
    <ul className="space-y-4">
      {habits.map((habit) => (
        <HabitItem key={habit._id} habit={habit} />
      ))}
    </ul>
  );
}
