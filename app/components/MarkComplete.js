import { useState } from "react";

export default function MarkComplete({ streak, setStreak, habit }) {
  const [loading, setLoading] = useState(false);

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

      // Update streak in parent component
      setStreak(streak + 1);
    } catch (error) {
      console.error("Error updating streak:", error);
      alert("Could not update streak. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`${
        loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
      } text-white font-bold py-1 px-3 rounded-md transition`}
      onClick={handleMarkComplete}
      disabled={loading}
    >
      {loading ? "Updating..." : "Mark Complete"}
    </button>
  );
}
