// Define the function to add s

// // import seatData from './seatData.json' assert { type: "json" };
// import seatData from "file:///C:/Users/jambh/Desktop/MERN/loginapp/mern-auth/api/seatData.json" assert { type: "json" };
// // import seatData from './seatData.json';


// import Seat from './models/rsmodel.js';


function addSeats() {
    // Your code snippet for adding seats
    Seat.insertMany(seatData)
      .then((docs) => {
        console.log(`${docs.length} seats added to the database`);
        mongoose.disconnect(); // Close the connection after adding data
      })
      .catch(error => {
        console.error('Error adding seats:', error);
        mongoose.disconnect(); // Close the connection in case of error
      });
  }