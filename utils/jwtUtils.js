import jwt from "jsonwebtoken";

// Generate JWT token for the user (superadmin)
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2d" } 
  );
};
