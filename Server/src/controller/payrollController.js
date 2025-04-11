import payrollModel from '../model/payrollModel.js';

// Get all payroll records
export const getAllPayroll = async (req, res) => {
    try {
        const payrolls = await payrollModel.find().sort({ createdAt: -1 }).select("-__v");
        res.status(200).json(payrolls);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch payrolls", error: error.message });
    }
};

// Get payroll for a specific employee
export const getPayroll = async (req, res) => {
    try {
        const id = req.employeeId;

        if (!id) {
            return res.status(400).json({ message: "Employee ID is required" });
        }

        const payroll = await payrollModel.find({ employeeId: id }).sort({ date: -1 });

        if (!payroll || payroll.length === 0) {
            return res.status(404).json({ message: "No payroll found for this employee" });
        }

        res.status(200).json({
            message: "Employee payroll successfully fetched",
            data: payroll
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching payroll", error: error.message });
    }
};

// Create a new payroll record
export const createPayroll = async (req, res) => {
    try {
        const { name, employeeId, salary, allowance = 0, deduction = 0, total, status, date } = req.body;

        if (!employeeId || !name || !salary || !total) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newPayroll = new payrollModel({
            name,
            employeeId,
            salary,
            allowance,
            deduction,
            total,
            status,
            date
        });

        await newPayroll.save();

        res.status(201).json({
            message: 'Payroll created successfully',
            data: newPayroll
        });

    } catch (error) {
        res.status(400).json({ message: "Error creating payroll", error: error.message });
    }
};


// Update payroll status
export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Payroll ID is required" });
        }

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const updatedPayroll = await payrollModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedPayroll) {
            return res.status(404).json({ message: "Payroll not found" });
        }

        res.status(200).json({
            message: "Payroll status updated successfully",
            data: updatedPayroll
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating payroll status", error: error.message });
    }
};
      