const { signService, loginService, signServiceText, loginServiceText } = require("../service/auth.service");


exports.signUp = async (req, res, next) => {
  try {
    const result = await signService(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) =>{
    try {
      const result = await loginService(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
}

exports.signText = async (req, res, next) => {
  try {
    const result = await signServiceText(req.body);
    res.status(200).json(result);

  } catch (error) {
    next(error);
  }
}

exports.loginText = async (req, res, next) =>{
    try {
      const result = await loginServiceText(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
}