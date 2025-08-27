import { React, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../../constants/global_variable";

const AddEmployeeButton = ({ children, type = "add", data }) => {
  const [open, setOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState(
    type === "add"
      ? {
          name: "",
          email: "",
          role: "",
          salary: "",
        }
      : data
  );

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setNewEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Mutation for adding employee
  const addEmployeeMutation = useMutation({
    mutationFn: async (employeeData) => {
      const response = await axios.post(BASE_URL, employeeData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setNewEmployee({
        name: "",
        email: "",
        role: "",
        salary: "",
      });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error adding employee", error);
      alert("Failed to add employee");
    },
  });

  //mutation for updating employee
  const updateEmployeeMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.put(BASE_URL + "/" + id, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setNewEmployee({
        name: "",
        email: "",
        role: "",
        salary: "",
      });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error updating employee", error);
      alert("Failed to update employee");
    },
  });

  //form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "add") {
      addEmployeeMutation.mutate(newEmployee);
    } else {
      updateEmployeeMutation.mutate(newEmployee);
    }
    setNewEmployee({
      name: "",
      email: "",
      role: "",
      salary: "",
    });
    e.target.reset();
  };
  return (
    <div className="flex justify-between items-center">
      <Dialog open={open} onOpenChange={(e) => setOpen(e.open)}>
        {children}
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {type === "add" ? "Add New Employee" : "Update employee"}
            </DialogTitle>
            <DialogDescription>
              {type === "add"
                ? " Fill in the details of the new employee below."
                : "Update the employee detail below."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleChange}
              placeholder="Employee Name"
              className="border rounded p-2 w-full mb-4"
              required
            />
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleChange}
              placeholder="Employee Email"
              className="border rounded p-2 w-full mb-4"
              required
            />
            <select
              className="border rounded p-2 w-full mb-4"
              name="role"
              value={newEmployee.role}
              onChange={handleChange}
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="intern">Intern</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="data analyst">Data Analyst</option>
            </select>
            <input
              type="number"
              step="0.01"
              name="salary"
              value={newEmployee.salary}
              onChange={handleChange}
              placeholder="Employee salary"
              className="border rounded p-2 w-full mb-4"
              required
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="mr-2">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {type === "add" ? "Add Employee" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEmployeeButton;
