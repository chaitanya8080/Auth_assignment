import { User } from "../models/UserModel.js";

import { sendToken } from "../utils/sendToken.js";


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({ message: "please add all fields" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "user already exist" });
    }
    user = await User.create({
      name,
      email,
      password,
    });

    sendToken(res, user, "Register Successfully", 201);

  } catch (error) {
    return res.status(400).json({error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "please add all fields" });
    }
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Incorrect Email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Email or password" });
    }

    sendToken(res, user, `Welcome back ${user.name}`, 201);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

//logout User
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none"
      })
      .json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};



