const connection = require('../util/dbconnect');

const addEmployee = async (empId , firstName , lastName,photo , city, mobileNo,email ,type , password) => {
    const sql = 'INSERT INTO Employees1 (emp_id , first_name, last_name, photo, city , mobile_no , email , type , password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [empId, firstName, lastName,photo, city, mobileNo,email,type, password];

    try {
        const [result] = await connection.promise().query(sql, values);
        return {
            success: true,
            message: 'Employee added successfully',
            data: result
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error adding employee',
            error: error
        };
    }
};

const getAllEmployees = async () => {
  const sql = 'SELECT * FROM Employees1';
  const [rows] = await connection.promise().query(sql);
  const employees = rows.map(emp => emp.photo ? { ...emp, photo: Buffer.from(emp.photo).toString('base64') } : emp);
  return { success: true, data: employees };
};
const getEmployeeById = async (empId) => {
    const sql = 'SELECT * FROM Employees1 WHERE emp_id = ?';

    try {
        const [rows] = await connection.promise().query(sql, [empId]);

        if (rows.length > 0) {
            return {
                success: true,
                message: 'Employee found',
                data: rows[0]
            };
        } else {
            return {
                success: false,
                message: 'Employee not found'
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error finding employee',
            error: error
        };
    }
};

const updateEmployee = async (empId, firstName, lastName, city, mobileNo, email) => {
    const sql = `
        UPDATE Employees1 
        SET first_name = ?, last_name = ?, city = ?, mobile_no = ?, email = ?
        WHERE emp_id = ?
    `;
    const values = [firstName, lastName, city, mobileNo, email, empId];

    try {
        const [result] = await connection.promise().query(sql, values);
        if (result.affectedRows > 0) {
            return { success: true, message: 'Employee updated successfully' };
        } else {
            return { success: false, message: 'Employee not found' };
        }
    } catch (error) {
        return { success: false, message: 'Error updating employee', error };
    }
};

const deleteEmployee = async (empId) => {
    const sql = 'DELETE FROM Employees1 WHERE emp_id = ?';

    try {
        const [result] = await connection.promise().query(sql, [empId]);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: 'Employee deleted successfully'
            };
        } else {
            return {
                success: false,
                message: 'Employee not found'
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error deleting employee',
            error: error
        };
    }
};

const validateEmployee = async (empId, password) => {
  const sql = 'SELECT * FROM Employees1 WHERE emp_id = ? AND password = ?';
  const [rows] = await connection.promise().query(sql, [empId, password]);
  if (rows.length > 0) return { success: true, message: 'Employee validated successfully', data: rows[0] };
  return { success: false, message: 'Invalid employee ID or password' };
};
module.exports = {
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    validateEmployee
};
