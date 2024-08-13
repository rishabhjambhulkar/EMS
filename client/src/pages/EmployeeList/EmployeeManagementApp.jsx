import React, { useEffect, useState } from 'react';
// import EmployeeTable from './EmployeeTable.jsx';
import AddEmployee from './AddEmployee';
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import {fetchEmployeesAndDispatch} from '../../redux/user/employeeSlice.js';
import EmployeeModal from './EmployeeModal.jsx';

const notificationContainerStyles = {
    // Define your styles here
    backgroundColor: 'lightgray',
    padding: '10px',
    borderRadius: '5px',
  };
  

const EmployeeManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeID, setEmployeeID] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false); // Track if we are in update mode
    const [showEmployeeModal, setShowEmployeeModal] = useState(false); 

    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(fetchEmployeesAndDispatch());
    }, [dispatch]);

    const employees = useSelector((state) => {
        const fetchedEmployees = state.employeeData.employees;
        return Array.isArray(fetchedEmployees) && fetchedEmployees.length > 0 ? fetchedEmployees : [];
      });
      
    

    console.log('Employees:', employees);
    
       const handleEdit = (e,id) => {
        e.stopPropagation(); 
        setEmployeeID(id);
        setIsUpdateMode(true);  // Set to update mode
        setShowModal(true);
        console.log('edit:',id );
    };


    const handleDelete = async (e, id) => {
        e.stopPropagation();
        
        // Confirm the deletion with the user
        const confirmed = window.confirm('Are you sure you want to delete this employee?');
        
        if (!confirmed) return; // If not confirmed, exit the function
        
        try {
            await DeleteEmployeeById(id); // Assuming this returns a promise
            console.log(`Deleted employee with ID: ${id}`);
            alert('Employee deleted successfully!');
            dispatch(fetchEmployeesAndDispatch()); // Fetch updated employee list
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('Failed to delete employee. Please try again.');
        }
    };

    const handleRowClick = (id) => {
        setEmployeeID(id);
        // setIsUpdateMode(true);  
        setShowEmployeeModal(true);
        console.log('Selected employee ID:', id);
    };
    const selectedEmployee = employees.length>0 ? employees.find(emp => emp._id === employeeID) : null;

    return (
        <div className='d-flex flex-column justify-center items-center w-70 p-3 pl-[20%]'>
  
            <div className='w-100 d-flex justify-content-center'>
                <div className='w-80 border bg-light p-3' style={{ width: '80%' }}>
                    <div className='d-flex justify-content-between mb-3'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => {
                            setShowModal(true);
                            setIsUpdateMode(false);
                        }}
                        >
                        Add
                        </button>
                       
                    </div>

                    {employees.length > 0 ? (
                        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
                            <h1 className="text-center text-2xl font-bold mb-4 p-4">Employee Table</h1>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {employees.map(employee => (
                                        <tr key={employee._id}
                                        onClick={() => handleRowClick(employee._id)}
                                        className="cursor-pointer">
                                            <td className="px-6 py-4 whitespace-nowrap">{employee.employeeId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={(e) => handleEdit(e, employee._id)}  // Pass the event and id
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(e,employee._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        ) : (
                            <div>No employees found</div>
                        )}
                   

                  
                            {/* <EmployeeTable
                                employees={employees}
                                // pagination={employeesData.pagination}
                                // fetchEmployees={fetchEmployees}
                                handleUpdateEmployee={handleUpdateEmployee}
                            /> */}

                        <AddEmployee
                        
                        showModal={showModal}
                        setShowModal={setShowModal}
                        employeeID={employeeID}
                        isUpdateMode={isUpdateMode}  // Pass the update mode
                        
                        />
                          <EmployeeModal
                           isOpen={showEmployeeModal}
                           onClose={() => setShowEmployeeModal(false)} // Close modal handler
                        employee={selectedEmployee}  // Pass selected employee data
                    />
                </div>
            </div>
            {/* <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            /> */}
        </div>
    );
};

export default EmployeeManagementApp;
