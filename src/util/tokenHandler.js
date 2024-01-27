import { Jwt } from "jsonwebtoken";
import { config } from "dotenv";
config();

const generateToken = (data, access = true) => {
    const secret = access
        ? process.env.ACCESS_TOKEN_SECRET
        : procees.env.REF_TOKEN_SECRET;
    try {
        return Jwt.verify(token, secret);
    } catch (error) {
        return {
            status: 401,
            message: `Unauthorized: ${error.message}`
        }
    }

}