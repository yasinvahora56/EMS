import jwt from "jsonwebtoken"; // ✅ Importing jsonwebtoken for token verification


const FetchEmployeeId = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized, Token Missing" });
        }

        const token = authHeader.split(" ")[1]; // ✅ Extract JWT Token

        // ✅ Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token:", decoded); // Debugging

        req.employeeId = decoded.userId || decoded._id;
        
        if (!req.employeeId) {
            return res.status(400).json({ message: "Invalid Token: Employee ID missing" });
        }

        next(); // ✅ Move to the next middleware

    } catch (error) {
        console.error("Error decoding token:", error);
        return res.status(403).json({ message: "Invalid Token", error: error.message });
    }
};
export default FetchEmployeeId;
