import mongoose from 'mongoose';

// Define the schema
const seatSchema = new mongoose.Schema({
    seat: {
        type: Number,
        
    },
    availability: {
        type: String,
        enum: ['available', 'reserved'],
        default: 'available'
    }
});

// Create the model
const Seat = mongoose.model('Seat', seatSchema);

export default Seat;
