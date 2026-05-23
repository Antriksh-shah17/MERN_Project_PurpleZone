import jwt from "jsonwebtoken";

const JWT_EXPIRES_IN = "7d";

export function signAuthToken(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}
