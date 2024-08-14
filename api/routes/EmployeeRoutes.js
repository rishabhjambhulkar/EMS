import { Router } from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById } from '../controllers/employeeController.js';
import { cloudinaryFileUploader } from '../Middlewares/FileUplaoder.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = Router();

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.delete('/:id', deleteEmployeeById);
router.put('/:id', updateEmployeeById);
router.post('/', createEmployee);

export default router;
