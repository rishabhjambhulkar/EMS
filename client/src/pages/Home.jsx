import React from 'react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
    <h1 className="text-4xl font-extrabold mb-6 text-slate-800">
      Employee Management System
    </h1>
    <p className="mb-6 text-lg leading-relaxed text-slate-700">
      Welcome to the Employee Management System, a powerful full-stack platform built on the MERN stack (MongoDB, Express, React, Node.js). This system enables efficient management of employee records with features like automatic Employee ID generation, detailed employee profiles, and a comprehensive audit trail for tracking historical changes.
    </p>
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">Core Features:</h2>
      <ul className="list-disc list-inside pl-4 text-slate-700">
        <li className="mb-2">
          <span className="font-medium">Grid View:</span> Display all employee records in a responsive and intuitive grid layout.
        </li>
        <li className="mb-2">
          <span className="font-medium">Side Modal/Popup:</span> Access detailed employee information with a clean and organized modal that includes tabs for Employee Details and Audit Trail.
        </li>
        <li className="mb-2">
          <span className="font-medium">State Management:</span> Utilize Redux for consistent state management across the application.
        </li>
        <li className="mb-2">
          <span className="font-medium">Data Visualization:</span> Leverage ChartJS within a dynamic dashboard to present employee data in various chart formats, including bar diagrams and pie charts.
        </li>
        <li className="mb-2">
          <span className="font-medium">Authentication & Authorization:</span> Secure the platform with JWT, ensuring only authenticated users have access to protected routes.
        </li>
      </ul>
    </div>
    <p className="mb-6 text-lg leading-relaxed text-slate-700">
      This platform is designed to be a robust, scalable solution for managing employee data with a focus on security, data integrity, and user experience. Whether you're managing a small team or a large organization, the Employee Management System provides the tools you need to keep your data organized and secure.
    </p>
    <div className="text-center">
      {/* <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition duration-200">
        Get Started
      </button> */}
    </div>
  </div>
  
  
  );
}
