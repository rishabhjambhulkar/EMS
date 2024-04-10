import React from 'react';
import './book.css'; // Assuming styles.css is in the same directory as your JSX file

export default function About() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>Reservation System</h1>

      <table>
      <thead>
        <tr>
          <th>Seat Number</th>
          {/* <th>Name</th> */}
          <th>Availability</th>
          
        </tr>
      </thead>
      <tr>
          <th>1</th>
      </tr>

      <tbody id="table-body">
        
      </tbody>
    </table>
    </div>
  );
}
