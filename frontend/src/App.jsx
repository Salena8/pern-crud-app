import { Button } from "@/components/ui/button";
import TableRow from "./components/ui/TableRow";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../constants/global_variable.js";
import EmployeeDialogButton from "./components/buttons/EmployeeDialogButton.jsx";
import { DialogTrigger } from "./components/ui/dialog.jsx";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };
  async function fetchEmployees() {
    const response = await axios.get(BASE_URL);
    return response.data;
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  console.log("data from db", data);
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "dark bg-zinc-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header with dark mode toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Employee Management</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <AddEmployeeButton>
            <DialogTrigger asChild>
              <Button variant="default">Add Employee</Button>
            </DialogTrigger>
          </AddEmployeeButton>
          <TableRow data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
