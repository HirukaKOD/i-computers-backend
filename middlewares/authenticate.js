import jwt from "jsonwebtoken";
export default function authenticateUser(req, res, next) {
  const header = req.header("Authorization");

  if (header != null) {
    const token = header.replace("Bearer ", "").replaceAll('"', "");

    jwt.verify(token, "hiraaa123@", (err, decoded) => {
      if (err || decoded == null) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = decoded;
      next();
    });
  } else {
    next();
  }
}