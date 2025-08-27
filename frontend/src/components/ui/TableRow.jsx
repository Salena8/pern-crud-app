import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../../../constants/global_variable";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import EmployeeDialogButton from "../buttons/EmployeeDialogButton.jsx";
import { DialogTrigger } from "./dialog.jsx";
import { Button } from "./button.jsx";

const TableRow = ({ data }) => {
  console.log("TableRow received data:", data);
  const queryClient = useQueryClient();

  // Handle loading or empty data
  if (!data || data.length === 0) {
    return (
      <div className="overflow-x-auto transition-colors duration-300">
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No employees found</p>
        </div>
      </div>
    );
  }
  //mutation for deletion
  const deleteEmployee = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(BASE_URL + "/" + id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee");
    },
  });

  return (
    <div className="overflow-x-auto transition-colors duration-300">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-lg transition-colors duration-300">
        <thead className="bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600 transition-colors duration-300">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600 transition-colors duration-300">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600 transition-colors duration-300">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600 transition-colors duration-300">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600 transition-colors duration-300">
              Salary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600 transition-colors duration-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-300 dark:divide-gray-600 transition-colors duration-300">
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {item.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {item.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {item.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {item.salary}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteEmployee.mutate(item.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300"
                  >
                    <AddEmployeeButton data={item} type="update">
                      <DialogTrigger asChild>
                        <FaTrash className="w-4 h-4" />
                      </DialogTrigger>
                    </AddEmployeeButton>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRow;
