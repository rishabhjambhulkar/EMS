import EmployeeModel from '../models/EmployeeModel.js';

export const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const profileImage = req?.file ? req?.file?.path : null;
        body.profileImage = profileImage;
        const emp = new EmployeeModel(body);

        await emp.save();
        res.status(201).json({
            message: 'Employee Created',
            success: true
        });
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
}

// export const getAllEmployees = async (req, res) => {
//     try {
//         let { page, limit, search } = req.query;

//         page = parseInt(page) || 1;
//         limit = parseInt(limit) || 10;
//         const skip = (page - 1) * limit;

//         let searchCriteria = {};
//         if (search) {
//             searchCriteria = {
//                 name: {
//                     $regex: search,
//                     $options: 'i'
//                 }
//             };
//         }

//         const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);
//         const emps = await EmployeeModel.find(searchCriteria)
//             .skip(skip)
//             .limit(limit)
//             .sort({ updatedAt: -1 });

//         const totalPages = Math.ceil(totalEmployees / limit);

//         res.status(200).json({
//             message: 'All Employees',
//             success: true,
//             data: {
//                 employees: emps,
//                 pagination: {
//                     totalEmployees,
//                     currentPage: page,
//                     totalPages,
//                     pageSize: limit
//                 }
//             }
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Internal Server Error',
//             success: false,
//             error: err
//         });
//     }
// };


export const getAllEmployees = async (req, res) => {
    try {
        const emps = await EmployeeModel.find().sort({ updatedAt: -1 });
        console.log('emps', emps);

        res.status(200).json({
            message: 'All Employees',
            success: true,
            data: emps // Return the employees directly
        });
        
        console.log('Fetched employees:', emps); // Log the employee data

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};


export const getEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;
        const emp = await EmployeeModel.findOne({ _id: id });
        res.status(200).json({
            message: 'Employee Details',
            success: true,
            data: emp
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
}

export const deleteEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;
        await EmployeeModel.deleteOne({ _id: id });
        res.status(200).json({
            message: 'Employee Deleted Successfully',
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
}

// export const updateEmployeeById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, email, phone, department, salary } = req.body;
//         let updateData = { name, email, phone, department, salary, updatedAt: new Date() };
        
//         if (req.file) {
//             updateData.profileImage = req.file.path;
//         }

//         const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
//             id,
//             updateData,
//             { new: true }
//         );

//         if (!updatedEmployee) {
//             return res.status(404).json({ message: 'Employee not found' });
//         }

//         res.status(200).json({
//             message: 'Employee Updated Successfully',
//             success: true,
//             data: updatedEmployee
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }



export const updateEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, age, department, status, profileImage } = req.body;
        console.log(req.body)

        // Find the existing employee
        const existingEmployee = await EmployeeModel.findById(id);
        if (!existingEmployee) {
            return res.status(404).send({ error: 'Employee not found' });
        }

        // Save the current state to historicalData array before updating
        const historicalEntry = {
            name: existingEmployee.name,
            address: existingEmployee.address,
            age: existingEmployee.age,
            department: existingEmployee.department,
            status: existingEmployee.status,
            // profileImage: existingEmployee.profileImage,
            changedAt: new Date()
        };
        existingEmployee.historicalData.push(historicalEntry);

        // Update fields with new values
        if (name) { existingEmployee.name = name; }
        if (address) { existingEmployee.address = address; }
        if (age) { existingEmployee.age = age; }
        if (department) { existingEmployee.department = department; }
        if (status) { existingEmployee.status = status; }
        // if (profileImage) { existingEmployee.profileImage = profileImage; }

        console.log(existingEmployee)
        // Save the updated employee record
        await existingEmployee.save();
        console.log('saved',  existingEmployee)
        res.status(200).send({
            message: 'Employee updated successfully',
            data: existingEmployee
        });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).send({ error: error.message });
    }
};