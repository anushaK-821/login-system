const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/loginDB', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// 🔑 Secret key for JWT
const JWT_SECRET = 'your-super-secret-key';

// 📩 Configure Gmail transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourgmail@gmail.com',
    pass: 'your-app-password' // use app password (not your Gmail password)
  }
});

// 🔐 Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('User not found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send('Invalid password');

  res.send('Login successful');
});

// 🟠 Send Password Reset Email
app.post('/reset-password-request', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found');

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  // send email
  await transporter.sendMail({
    to: email,
    subject: 'Password Reset - AssetTracker',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p>`
  });

  res.send('Reset password link has been sent to your email');
});

// 🟢 Reset Password (actual update)
app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send('Password reset successful');
  } catch (err) {
    res.status(400).send('Invalid or expired token');
  }
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));
