const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.register = async (req, res) => {
    console.log("here register");
    
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email already exists' });

    const user = await User.create({ name, email, password, role });

    const token = generateToken(user);
    res.status(201).json({ user: { id: user._id, name: user.name, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken(user);
    res.status(200).json({ user: { id: user._id, name: user.name, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
