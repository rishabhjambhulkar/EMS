import React from 'react';
import  { useEffect, useState } from 'react';
import AgeDistributionChart from './Age.jsx'
import DepartmentDistributionChart from './Department.jsx';
import StatusDistributionChart from './Status.jsx';
import AddressDistributionChart from './Address.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {fetchEmployeesAndDispatch} from '../../redux/user/employeeSlice.js';


const Dashboard = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(fetchEmployeesAndDispatch());
    }, [dispatch]);

    const employees = useSelector((state) => {
        const fetchedEmployees = state.employeeData.employees;
        return Array.isArray(fetchedEmployees) && fetchedEmployees.length > 0 ? fetchedEmployees : [];
      });


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Age Distribution</h2>
                    <AgeDistributionChart employees={employees} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Department Distribution</h2>
                    <DepartmentDistributionChart employees={employees} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Status Distribution</h2>
                    <StatusDistributionChart employees={employees} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Address Distribution</h2>
                    <AddressDistributionChart employees={employees} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
