import mongoose from 'mongoose';

const userVerifySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    verifyToken: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true  // This adds 'createdAt' and 'updatedAt' fields
});

const Userverify = mongoose.model('Userverify', userVerifySchema);

export default Userverify; // Exporting the Userverify model
