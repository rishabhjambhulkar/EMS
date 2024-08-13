import { Router } from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById } from '../controllers/employeeController.js';
import { cloudinaryFileUploader } from '../Middlewares/FileUplaoder.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = Router();

router.get('/',verifyToken, getAllEmployees);
router.get('/:id',verifyToken, getEmployeeById);
router.delete('/:id',verifyToken, deleteEmployeeById);
router.put('/:id',verifyToken, updateEmployeeById);
router.post('/',verifyToken, createEmployee);

export default router;
