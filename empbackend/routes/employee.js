var express = require('express');
var router = express.Router();
const employeeService = require('../service/employeeService');

router.post('/', async (req, res) => {
    const result = await employeeService.addEmployee(req.body);
    res.status(result.status).json(result);
});

router.post('/validate', async (req, res) => {
    const result = await employeeService.validateEmployee(req.body.empId, req.body.password);
    res.status(result.status).json(result);
});
router.get('/', async (req, res) => {
    const result = await employeeService.getAllEmployees();
    res.status(result.status).json(result);
});




router.get('/:id', async (req, res) => {
    const result = await employeeService.getEmployeeById(req.params.id);
    res.status(result.status).json(result);
});


router.put('/:id', async (req, res) => {
    try {
        console.log("Body received:", req.body); // ← add this
        const result = await employeeService.updateEmployee(req.params.id, req.body);
        console.log("Service result:", result);  // ← add this
        res.status(result.status).json(result);
    } catch (err) {
        console.error("Route error:", err);       // ← add this
        res.status(500).json({ success: false, message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await employeeService.deleteEmployee(req.params.id);
    res.status(result.status).json(result);
});

module.exports = router;
