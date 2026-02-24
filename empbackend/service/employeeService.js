require('dotenv').config();

const employeeDao = require('../dao/employeeDao');


const addEmployee = async (data) => {
    try {
        const { empId, firstName, lastName, city, password } = data;

        // Validation
        if (!empId) {
            return { success: false, status: 400, message: "Employee ID required" };
        }

        if (!firstName || firstName.trim() === "") {
            return { success: false, status: 400, message: "First name required" };
        }

        if (!password || password.trim() === "") {
            return { success: false, status: 400, message: "Password required" };
        }

        const result = await employeeDao.addEmployee(
            empId,
            firstName,
            lastName,
            city,
            password
        );

        if (!result.success) {
            return { success: false, status: 500, message: result.message };
        }

        return { success: true, status: 201, message: result.message };

    } catch (err) {
        return { success: false, status: 500, message: err.message };
    }
};


const getAllEmployees = async () => {
    try {
        const result = await employeeDao.getAllEmployees();

        if (!result.success) {
            return { success: false, status: 500, message: result.message };
        }

        return {
            success: true,
            status: 200,
            data: result.data
        };

    } catch (err) {
        return { success: false, status: 500, message: err.message };
    }
};


const getEmployeeById = async (empId) => {
    try {
        if (!empId) {
            return { success: false, status: 400, message: "Employee ID required" };
        }

        const result = await employeeDao.getEmployeeById(empId);

        if (!result.success) {
            return { success: false, status: 404, message: result.message };
        }

        return {
            success: true,
            status: 200,
            data: result.data
        };

    } catch (err) {
        return { success: false, status: 500, message: err.message };
    }
};


const updateEmployee = async (empId, data) => {
    try {
        const { first_name, last_name, city, mobile_no, email } = data; // ← snake_case
        
        const result = await employeeDao.updateEmployee(
            empId,
            first_name,
            last_name,
            city,
            mobile_no,
            email
        );

        if (!result.success) {
            return { success: false, status: 404, message: result.message };
        }

        return { success: true, status: 200, message: result.message };

    } catch (err) {
        return { success: false, status: 500, message: err.message };
    }
};

const deleteEmployee = async (empId) => {
    try {
        if (!empId) {
            return { success: false, status: 400, message: "Employee ID required" };
        }

        const result = await employeeDao.deleteEmployee(empId);

        if (!result.success) {
            return { success: false, status: 404, message: result.message };
        }

        return {
            success: true,
            status: 200,
            message: result.message
        };

    } catch (err) {
        return { success: false, status: 500, message: err.message };
    }
};

const validateEmployee = async (empId, password) => {
    try {
        if (!empId) {
            return { success: false, status: 400, message: "Employee ID required" };
        }

        if (!password || password.trim() === "") {
            return { success: false, status: 400, message: "Password required" };
        }

        const result = await employeeDao.validateEmployee(empId, password);

        if (!result.success) {
            return { success: false, status: 401, message: result.message };
        }

        // 🔥 THIS LINE WAS MISSING
        return {
            success: true,
            status: 200,
            message: result.message,
            data: result.data   // ← VERY IMPORTANT
        };

    } catch (err) {
        return { success: false, status: 500, message: err.message };
    }
};

module.exports = {
    addEmployee,
    getAllEmployees,
    getEmployeeById,        
    updateEmployee,
    deleteEmployee,
    validateEmployee
};
