import Header from "./components/Header";
import HabitList from "./components/HabitList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Header />
        <HabitList />
      </div>
    </div>
  );
}
