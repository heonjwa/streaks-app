"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddHabit() {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Name is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/habits`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setName("");
        router.push("/");
      } else {
        const errorMessage = await res.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2 text-black"
        type="text"
        placeholder="Habit"
      />

      <button
        type="submit"
        className={`bg-green-600 font-bold text-white py-3 px-6 w-fit ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Habit"}
      </button>
    </form>
  );
}
