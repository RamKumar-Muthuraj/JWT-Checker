const {
  readJSON,
  writeJSON,
  readTEXT,
  appendTEXT,
} = require("../utils/fileHandler");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

const userPath = path.join(__dirname, "../data/users.json");
const userPathText = path.join(__dirname, "../data/sign.txt");

const signService = async (body) => {
  const { name, email, password } = body;

  const users = readJSON(userPath);

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashPassword,
    isLogin: false,
  };

  users.push(newUser);

  writeJSON(userPath, users);

  return { message: "User registered successfully" };
};

const loginService = async (body) => {
  const { email, password } = body;
  const users = readJSON(userPath);
  const existingUser = users.find((u) => u.email === email);

  if (!existingUser) {
    throw new Error("User Not Found");
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  existingUser.isLogin = true;

  writeJSON(userPath, users);
  const token = generateToken(existingUser);

  return {
    message: "Login SuccessFully",
    token,
  };
};

const signServiceText = async (body) => {
  const { name, email, password } = body;
  console.log(password);

  const data = await readTEXT(userPathText);

  const users = data
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [id, name, email, password] = line.split(",");
      return { id, name, email, password };
    });

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const id = uuidv4();
  const newUser = `${id},${name},${email},${hashPassword}\n`;

  await appendTEXT(userPathText, newUser);

  return { message: "User registered Successfully" };
};

const loginServiceText = async (body) => {
  const { email, password } = body;

  const data = await readTEXT(userPathText);

  const users = data
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [id, name, email, password] = line.split(",");
      return { id, name, email, password };
    });

  const existingUser = users.find((u) => u.email === email);

  if (!existingUser) {
    throw new Error("User Not Found");
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = generateToken(existingUser);

  return {
    message: "Login SuccessFully",
    token,
  };
};

module.exports = {
  signService,
  loginService,
  signServiceText,
  loginServiceText,
};
