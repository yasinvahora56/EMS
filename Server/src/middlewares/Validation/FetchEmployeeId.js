import jwt from "jsonwebtoken"; // ✅ Importing jsonwebtoken for token verification


export const fetchEmployeeId = (req, res, next) => {
    try {
        // get header safely (supports req.headers.authorization and req.get)
        const authHeader = req.headers?.authorization || (typeof req.get === "function" && req.get("authorization"));

        // ensure authHeader exists and is a string before calling startsWith
        if (!authHeader || typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized, Token Missing or Malformed" });
        }

        const token = authHeader.split(" ")[1]; // ✅ Extract JWT Token

        // ✅ Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("fetchEmployeeId decoded token:", decoded);
        req.role = decoded.role;
        req.employeeId = decoded._id;
        
        if (!req.employeeId) {
            return res.status(400).json({ message: "Invalid Token: Employee ID missing" });
        }

        next(); // ✅ Move to the next middleware

    } catch (error) {
        console.error("Error decoding token:", error);
        return res.status(403).json({ message: "Invalid Token", error: error.message });
    }
};
