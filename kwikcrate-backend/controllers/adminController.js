// backend/controllers/adminController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' }); // or include token/session here
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
