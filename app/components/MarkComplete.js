import { useState } from "react";
import Button from '@mui/material/Button';

export default function MarkComplete({ streak, setStreak, habit }) {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(habit.completedToday);

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

      const response = await res.json()
      console.log("RESPONSE")
      console.log(response)
      // Update streak in parent component
      setStreak(streak + 1);
      setCompleted(response.habit.completedToday)
    } catch (error) {
      console.error("Error updating streak:", error);
      alert("Could not update streak. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleMarkComplete}
      disabled={loading || completed}
    >
      {loading ? "Updating..." : "Mark Complete"}
    </Button>
  );
}
