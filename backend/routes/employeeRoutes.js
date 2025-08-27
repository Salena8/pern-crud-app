import express from "express";
import { getEmployee, getEmployees, createEmployee, deleteEmployee, updateEmployee} from "../controllers/employeeControllers.js";

const router = express.Router();

router.get('/', getEmployees );

router.get('/:id', getEmployee);

router.post('/', createEmployee );

router.delete('/:id', deleteEmployee);

router.put('/:id', updateEmployee );

export default router;