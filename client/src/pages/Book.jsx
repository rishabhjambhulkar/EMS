import React, { useState, useEffect } from 'react';
import './book.css'

export default function Book() {
  const [data, setData] = useState([]);
  const [seatNumber, setSeatNumber] = useState('');
  const [reservationStatus, setReservationStatus] = useState('');

  const reserveSeat = async () => {
    try {
      const response = await fetch('/api/book/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seat: seatNumber }),
      });
      const data = await response.json();
      setReservationStatus(data.message);
      fetchData()
    } catch (error) {
      console.error('Error reserving seat:', error);
      setReservationStatus('Error reserving seat');
    }
  };

  const cancelReservation = async () => {
    try {
      const response = await fetch('/api/book/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seat: seatNumber }),
      });
      const data = await response.json();
      setReservationStatus(data.message);
      fetchData()
    } catch (error) {
      console.error('Error canceling reservation:', error);
      setReservationStatus('Error canceling reservation');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/book'); // Replace '/api/data' with your backend endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <h1>Reservation System</h1>
      <table>
        <thead>
          <tr>
            <th className="blue-header">Seat Number</th>
            {/* <th className="blue-header">Name</th> */}
            <th className="blue-header">Availability</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.seat}</td>
              {/* <td>{item.name}</td> */}
              <td>{item.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <input
        type="number"
        placeholder="Enter seat number"
        value={seatNumber}
        onChange={(e) => setSeatNumber(e.target.value)}
      />
      <button onClick={reserveSeat} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Reserve Seat
      </button>
      <button onClick={cancelReservation} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Cancel Reservation
      </button>

      {/* <button onClick={reserveSeat}>Reserve Seat</button>
      <button onClick={cancelReservation}>Cancel Reservation</button> */}
      {reservationStatus && <p>{reservationStatus}</p>}
    </>
  );
}
