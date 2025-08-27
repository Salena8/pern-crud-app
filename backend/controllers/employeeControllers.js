import express from 'express'
import Employee from '../models/employee.js';

export async function getEmployees(req, res){
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (err) {
       res.status(500).json({error: 'failed to fetch employees'}) 
    }
}
export async function getEmployee(req, res){
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({error: 'Employee not found'});
        res.json(employee);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch employee'})
    }
}
export async function createEmployee(req, res){
    try {
        console.log("Incoming body:", req.body);
        const {name, email,role, salary} = req.body;

        if (!name || !email || !role || !salary) {
            return res.status(400).json({ error: 'Missing required fields' });
          }
          
        const employee = await Employee.create({name, email, role, salary});
        res.status(201).json(employee);
    } catch (error) {
        console.error("error creating employee", error);
        res.status(500).json({error: 'Failed to create employee'})
    }
}
export async function deleteEmployee(req, res){
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({error: 'Employee not found'});

        await employee.destroy();
        res.json({message: 'Employee deleted'})

    } catch (error) {
        res.status(500).json({error: 'Failed to delete employee'})
    }
}
export async function updateEmployee(req, res){
    try {
        const {name, email, role, salary} = req.body;
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({error: 'Employee not found'});
        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.role = role || employee.role;
        employee.salary = salary || employee.salary;

        await employee.save();
        res.status(200).json({message: 'Employee updated', employee })
    } catch (error) {
        return res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
}