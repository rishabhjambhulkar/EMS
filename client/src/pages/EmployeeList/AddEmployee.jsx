// import React, { useEffect, useState } from 'react';
// import { notify } from '../utils';
// import { CreateEmployee, UpdateEmployeeById } from '../api';
// import {fetchEmployeesAndDispatch} from '../../redux/user/employeeSlice.js';
// import { useSelector, useDispatch } from 'react-redux';

// function AddEmployee({
//     showModal, setShowModal, employeeID, isUpdateMode
// }) {

//     const dispatch = useDispatch();
    
//     const [employee, setEmployee] = useState({
//         name: '',
//         address: '',
//         age: 0,
//         department: '',
//         status: '',
//         profileImage: null
//     });

//     useEffect(() => {
//         if (isUpdateMode && employeeID) {
//             console.log('Update mode', employeeID);
//             // Add logic to fetch and populate employee data for editing
//             // Example: fetchEmployeeById(employeeID).then(data => setEmployee(data));
//         }
//     }, [employeeID, isUpdateMode]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEmployee({ ...employee, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setEmployee({ ...employee, profileImage: e.target.files[0] });
//     };

//     const resetEmployeeStates = () => {
//         setEmployee({
//             name: '',
//             address: '',
//             age: 18,
//             department: '',
//             status: '',
//             profileImage: null,
//         });
//     };

//     const handleAddEmployee = async (e) => {
//         e.preventDefault();
//         try {
//             const { success, message } = isUpdateMode
//                 ? await UpdateEmployeeById(employee, employeeID)
//                 : await CreateEmployee(employee);
    
//             if (success) {
//                 // Differentiate messages based on whether it's an update or an addition
//                 const successMessage = isUpdateMode
//                     ? 'Employee updated successfully!'
//                     : 'Employee added successfully!';
//                 alert(successMessage);
//             } else {
//                 alert(message);
//             }
    
//             setShowModal(false);
//             dispatch(fetchEmployeesAndDispatch());
//             resetEmployeeStates();
//         } catch (err) {
//             console.error(err);
//             alert('Failed to process request');
//         }
//     };

//     const handleModalClose = () => {
//         setShowModal(false);
//         resetEmployeeStates();
//     };

//     return (
//         <div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
//             <div className="modal-dialog" role="document">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title">{isUpdateMode ? 'Update Employee' : 'Add Employee'}</h5>
                        
//                          <button
//                             type="button"
//                             className="cursor-default bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-2 rounded-full"
//                             onClick={handleModalClose}
//                             >
//                             &times;
//                         </button>

//                     </div>
//                     <div className="modal-body">
//                         <form onSubmit={handleAddEmployee}>
//                             <div className="mb-3">
//                                 <label className="form-label">Name</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     name="name"
//                                     value={employee.name}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Address</label>
//                                 <select
//                                     id="address"
//                                     name="address"
//                                     className="form-control"
//                                     value={employee.address}
//                                     onChange={handleChange}
//                                 >
//                                     <option value="">Select a city</option>
//                                     <option value="Delhi">Delhi</option>
//                                     <option value="Mumbai">Mumbai</option>
//                                     <option value="Pune">Pune</option>
//                                     <option value="Hyderabad">Hyderabad</option>
//                                     <option value="Chennai">Chennai</option>
//                                 </select>
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Age</label>
//                                 <input
//                                     type="number"
//                                     className="form-control"
//                                     name="age"
//                                     value={employee.age}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Department</label>
//                                 <select
//                                     id="department"
//                                     name="department"
//                                     className="form-control"
//                                     value={employee.department}
//                                     onChange={handleChange}
//                                 >
//                                     <option value="">Select a department</option>
//                                     <option value="Software">Software</option>
//                                     <option value="Sales">Sales</option>
//                                     <option value="Marketing">Marketing</option>
//                                     <option value="HR">HR</option>
//                                     <option value="Analyst">Analyst</option>
//                                 </select>
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Status</label>
//                                 <select
//                                     className="form-control"
//                                     name="status"
//                                     value={employee.status}
//                                     onChange={handleChange}
//                                 >
//                                      <option value="">Select Employment Type</option>
//                                     <option value="Remote Location">Remote Location</option>
//                                     <option value="Contract Employee">Contract Employee</option>
//                                     <option value="Full-Time">Full-Time</option>
//                                 </select>

//                             </div>
//                             {/* <div className="mb-3">
//                                 <label className="form-label">Profile Image</label>
//                                 <input
//                                     type="file"
//                                     className="form-control"
//                                     name="profileImage"
//                                     onChange={handleFileChange}
//                                 />
//                             </div> */}
//                                 <button
//                                 type="submit"
//                                 className="cursor-default bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                                 >
//                                 {isUpdateMode ? 'Update' : 'Save'}
//                                 </button>

//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddEmployee;



import React, { useEffect, useState } from 'react';
import { CreateEmployee, UpdateEmployeeById } from '../api';
import { fetchEmployeesAndDispatch } from '../../redux/user/employeeSlice.js';
import { useDispatch } from 'react-redux';

function AddEmployee({ showModal, setShowModal, employeeID, isUpdateMode }) {
    const dispatch = useDispatch();
    const [employee, setEmployee] = useState({
        name: '',
        address: '',
        age: 0,
        department: '',
        status: '',
        profileImage: null,
    });

    useEffect(() => {
        if (isUpdateMode && employeeID) {
            console.log('Update mode', employeeID);
            // Fetch and populate employee data for editing
        }
    }, [employeeID, isUpdateMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, profileImage: e.target.files[0] });
    };

    const resetEmployeeStates = () => {
        setEmployee({
            name: '',
            address: '',
            age: 18,
            department: '',
            status: '',
            profileImage: null,
        });
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = isUpdateMode
                ? await UpdateEmployeeById(employee, employeeID)
                : await CreateEmployee(employee);

            if (success) {
                const successMessage = isUpdateMode
                    ? 'Employee updated successfully!'
                    : 'Employee added successfully!';
                alert(successMessage);
            } else {
                alert(message);
            }

            setShowModal(false);
            dispatch(fetchEmployeesAndDispatch());
            resetEmployeeStates();
        } catch (err) {
            console.error(err);
            alert('Failed to process request');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        resetEmployeeStates();
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${showModal ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
                <div className="flex justify-between items-center px-4 py-2 border-b">
                    <h5 className="text-lg font-bold">
                        {isUpdateMode ? 'Update Employee' : 'Add Employee'}
                    </h5>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={handleModalClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="px-6 py-4">
                    <form onSubmit={handleAddEmployee}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <select
                                id="address"
                                name="address"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={employee.address}
                                onChange={handleChange}
                            >
                                <option value="">Select a city</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Pune">Pune</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Chennai">Chennai</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                name="age"
                                value={employee.age}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <select
                                id="department"
                                name="department"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={employee.department}
                                onChange={handleChange}
                            >
                                <option value="">Select a department</option>
                                <option value="Software">Software</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Analyst">Analyst</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                name="status"
                                value={employee.status}
                                onChange={handleChange}
                            >
                                <option value="">Select Employment Type</option>
                                <option value="Remote Location">Remote Location</option>
                                <option value="Contract Employee">Contract Employee</option>
                                <option value="Full-Time">Full-Time</option>
                            </select>
                        </div>
                        {/* Uncomment if Profile Image upload is needed
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                            <input
                                type="file"
                                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer"
                                name="profileImage"
                                onChange={handleFileChange}
                            />
                        </div>
                        */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                            >
                                {isUpdateMode ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
