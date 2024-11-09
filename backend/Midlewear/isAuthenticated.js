import jwt from "jsonwebtoken";

export const Authentecation = async (req, res, next) => {
  const token = req.header("Authorization");
  try {
    if (!token) return res.json({ message: "No token, authorization denied" });
    const decoded = jwt.verify(token, process.env.SECERATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error While MiddleWaer Token", error.message);
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.user.role === "admin") {
      next();
    } else {
      return res.json({
        success: false,
        message: "You are not authorized to access this Action",
      });
    }
  } catch (error) {
    console.log("Error While Checking Admin Role", error.message);
    res.json({ msg: "Error While Checking Admin Role" });
  }
};
