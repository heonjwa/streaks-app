"use client";

import { useState } from "react";

export default function DeleteHabit({ id, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/habits?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      

      if (!res.ok) {
        throw new Error("Failed to delete habit");
      }

      onDelete(id); // Notify the parent to update the habits list
    } catch (error) {
      console.error("Error deleting habit:", error);
      alert("Could not delete habit. Please try again later.");
    } finally {
       setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      className={`${
        isDeleting ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
      } text-white font-bold py-1 px-3 rounded-md transition`}
      disabled={isDeleting}
      onClick={handleDelete}
    >
      {isDeleting ? "Deleting..." : "X"}
    </button>
  );
}
