const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[A-Za-z\s]+$/;

exports.validateSignUp = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (
    !name ||
    !name.trim() ||
    !email ||
    !email.trim() ||
    !password.trim() ||
    !password ||
    !confirmPassword ||
    !confirmPassword.trim()
  ) {
    return res.json({
      message: "All fields are Required",
      success: false,
    });
  }

  if (name.length < 3) {
    throw new Error("Name must be at least 3 characters");
  }

  if(!nameRegex.test(name)){
    throw new Error("Name Should be Alphabet Character")
  }

  if (email.length > 100) {
    throw new Error("Email too long");
  }

  if (password.length > 60) {
    throw new Error("Password must less or equal 60 character");
  }

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (!passwordRegex.test(password) || password.includes(" ")) {
    throw new Error("Password must contain at least 8 characters, one uppercase, one lowercase, one number and '@$!%*?&' one special character, with no spaces between");
  }

  if (password != confirmPassword) {
    return res.json({
      message: "Password must Match Confirm Password",
      success: false,
    });
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.trim() || !password || !password.trim()) {
    return res.json({
      message: "All fields are Required",
      success: false,
    });
  }

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    });
  }

  next();
};
