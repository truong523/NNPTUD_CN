const express = require('express');
const mongoose = require('mongoose');
const { Role, User } = require('./models');

const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/my_database');

// --- CÂU 1: CRUD (C R UD Xóa mềm) ---

// Create User & Role
app.post('/users', async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
});

app.post('/roles', async (req, res) => {
    const newRole = await Role.create(req.body);
    res.json(newRole);
});

// Get All (R) - Chỉ lấy những cái chưa bị xóa mềm
app.get('/users', async (req, res) => {
    const users = await User.find({ isDeleted: false }).populate('role');
    res.json(users);
});

// Get theo ID (R)
app.get('/users/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id, isDeleted: false });
    res.json(user);
});

// Xóa mềm (UD) - Cập nhật isDeleted thay vì xóa thật
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: "Đã xóa mềm thành công" });
});


// --- CÂU 2: POST /enable ---
app.post('/enable', async (req, res) => {
    const { email, username } = req.body;
    const user = await User.findOneAndUpdate(
        { email: email, username: username }, 
        { status: true }, 
        { new: true }
    );
    if (!user) return res.status(404).send("Thông tin không đúng");
    res.json(user);
});


// --- CÂU 3: POST /disable ---
app.post('/disable', async (req, res) => {
    const { email, username } = req.body;
    const user = await User.findOneAndUpdate(
        { email: email, username: username }, 
        { status: false }, 
        { new: true }
    );
    if (!user) return res.status(404).send("Thông tin không đúng");
    res.json(user);
});


// --- CÂU 4: GET /roles/:id/users ---
app.get('/roles/:id/users', async (req, res) => {
    const users = await User.find({ role: req.params.id, isDeleted: false });
    res.json(users);
});

app.listen(3000, () => console.log("Server đang chạy ở port 3000"));