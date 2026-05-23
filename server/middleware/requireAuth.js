import jwt from "jsonwebtoken";

export function requireAuth(request, response, next) {
  const authorization = request.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return response.status(401).json({ message: "Authentication required." });
  }

  const token = authorization.slice(7);

  try {
    request.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (_error) {
    return response.status(401).json({ message: "Invalid or expired token." });
  }
}
