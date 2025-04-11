import payrollModel from '../model/payrollModel.js';

export const getAllPayroll = async (req, res) => {
    try {
        const payrolls = await payrollModel.find().sort({ createdAt: -1 }).select("-__v");
        res.status(200).json(payrolls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export const getPayroll = (req, res) => {
    try {
        const id  = req.employeeId

        if (!id) {
            return res.status(400).json({ message: "Employee ID is required" });
        }
        const payroll = payrollModel.find({ employeeId: id });
        res.status(200).json({messsage: "One Payroll Successfully Fetched",payroll});
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }

};

export const createPayroll = (req, res) => {
    
    const { name, salary, Allowance, Deduction, total, status, date } = req.body;
    const newPayroll = new payrollModel({
        name,
        salary,
        Allowance,
        Deduction,
        total,
        status,
        date,
    });
    newPayroll.save()
        .then(() => res.status(201).json({ message: 'Payroll created successfully', data: newPayroll }))
        .catch((error) => res.status(400).json({ message: error.message }));

};
