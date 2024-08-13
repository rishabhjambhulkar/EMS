// src/components/EmployeeModal.js

import React, { useState } from 'react';

const EmployeeModal = ({ employee, isOpen, onClose }) => {
  const [showAuditTrail, setShowAuditTrail] = useState(false);

  if (!isOpen || !employee) return null;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const combinedDetails = [employee, ...(employee.historicalData || [])];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Employee: {employee.name}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <div className="border-b mb-4">
          <button
            className={`px-4 py-2 ${!showAuditTrail ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setShowAuditTrail(false)}
          >
            Employee Details
          </button>
          <button
            className={`px-4 py-2 ${showAuditTrail ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setShowAuditTrail(true)}
          >
            Audit Trail
          </button>
        </div>
        <div>
          {!showAuditTrail && (
           
              <div>
              <p><strong>Employee Id:</strong> {employee.employeeId}</p>
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Address:</strong> {employee.address}</p>
              <p><strong>Age:</strong> {employee.age}</p>
              <p><strong>Status:</strong> {employee.status}</p>
            </div>
          )}
          {showAuditTrail && (
            <div>
              <h3 className="text-lg font-bold mb-2">Audit Trail</h3>
              {employee.historicalData && employee.historicalData.length > 0 ? (
                <ul className="list-disc pl-5">
                  {employee.historicalData.map((history, index) => (
                    <li key={index} className="mb-2">
                      <p><strong>Name:</strong> {history.name}</p>
                      <p><strong>Address:</strong> {history.address}</p>
                      <p><strong>Age:</strong> {history.age}</p>
                      <p><strong>Department:</strong> {history.department}</p>
                      <p><strong>Status:</strong> {history.status}</p>
                      <p><strong>Updated At:</strong> {formatDate(history.changedAt)}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No audit trail available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
