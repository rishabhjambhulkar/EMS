// import mongoose from 'mongoose';


// const EmployeeSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     address: {
//         type: String,
//         required: true,
       
//     },
//     age: {
//         type: Number,
        
//     },
//     department: {
//         type: String,
//         required: true
//     },
//     profileImage: {
//         type: String
//     },
//     status: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: new Date()
//     },
//     updatedAt: {
//         type: Date,
//         default: new Date()
//     }
// });

// const EmployeeModel = mongoose.model('employees', EmployeeSchema);
// export default EmployeeModel;




import mongoose from 'mongoose';

// Define Employee schema with embedded historical data
const EmployeeSchema = new mongoose.Schema({
    employeeId: { type: Number, unique: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    age: { type: Number },
    department: { type: String, trim: true },
    status: { 
        type: String,
        // enum: ['Remote Location', 'Contract Employee', 'Full-Time'], // Uncomment and customize if needed
    },
    profileImage: { type: String },
    historicalData: [
        {
            name: String,
            address: String,
            age: Number,
            department: String,
            status: String,
            profileImage: String,
            changedAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

// Auto-generate employeeId
EmployeeSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastEmployee = await EmployeeModel.findOne().sort({ employeeId: -1 });
        this.employeeId = lastEmployee ? lastEmployee.employeeId + 1 : 1;
    }
    next();
});

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

export default EmployeeModel;