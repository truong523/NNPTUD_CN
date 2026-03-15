const mongoose = require('mongoose');

// Object Role
const RoleSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, default: "" }
}, { timestamps: true });

// Object User
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, default: "" },
    avatarUrl: { type: String, default: "https://i.sstatic.net/l60Hf.png" },
    status: { type: Boolean, default: false },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    loginCount: { type: Number, default: 0, min: 0 },
    isDeleted: { type: Boolean, default: false } // Phục vụ xóa mềm
}, { timestamps: true });

const Role = mongoose.model('Role', RoleSchema);
const User = mongoose.model('User', UserSchema);

module.exports = { Role, User };