import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteEmployeeById } from '../api';
import { notify } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployeesThunk } from '../../redux/user/employeeSlice.js'; // Adjust the path to your slice


function EmployeeTable({employees,
    handleUpdateEmployee }) {


//   const dispatch = useDispatch();
//     const {  employees, loading, error } = useSelector((state) => state.employeeData.employees);
    
//     useEffect(() => {
//       dispatch(fetchEmployeesThunk());
//     }, [dispatch]);
    
//     if (loading) {
//       return <div>Loading...</div>;
//     }
    
//     if (error) {
//       console.log(error);
//       return <div>Error: {error}</div>;
//     }
    
//     useEffect(() => {
//       if (!loading) {
//        // Log employee data in the component
//       }
//     }, [employees, loading]);

    // const fetchEmployees = async () => {
    //     console.log('Called fetchEmployees')
    //     try {
    //         const data =
    //             await GetAllEmployees(search, page, limit);
    //         console.log(data);
    //         setEmployeesData(data);
    //     } catch (err) {
    //         alert('Error', err);
    //     }
    // }
    
    // useEffect(() => {
    //     fetchEmployees();
    // }, [])
   

    const handleDeleteEmployee = async (id) => {
        try {
            const { success, message } = await DeleteEmployeeById(id);
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            fetchEmployees();
        } catch (err) {
            console.error(err);
            notify('Failed to delete Employee', 'error')
        }
    }


    const TableRow = ({ employee }) => {
        console.log(employee)
        return <tr>
            <td>{employee.employeeId}</td>
            <td>
                <Link to={`/employee/${employee._id}`} className="text-decoration-none">
                    {employee.name}
                </Link>
            </td>
           
            <td>
            <button
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg mr-2 font-semibold hover:bg-yellow-300"
                onClick={() => handleUpdateEmployee(employee._id)}
                title="Edit"
            >
                Edit
            </button>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-400"
                onClick={() => handleDeleteEmployee(employee._id)}
                title="Delete"
            >
                Delete
            </button>

            </td>
        </tr>
    }
    
    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {
                            headers.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.length === 0 ? <div> Data Not Found</div>
                            : employees.map((emp) => (
                                <TableRow employee={emp} key={emp._id} />
                            ))
                    }
                </tbody>
            </table>

           

        </>
    )
}

export default EmployeeTable