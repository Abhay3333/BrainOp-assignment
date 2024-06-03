const  User  = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {sendEmail} = require('../utils/email');
const {welcomeEmailTemplate} = require('../utils/emailTemplate');



const register = async (req, res) => {
    try {
        const { email, password, username, confirmPassword } = req.body;
        const existingUser = await User.findOne({ email: req.body.email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists', success: false });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match', success: false });
        }

        const plainPassword = password;
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(plainPassword, salt);
        
        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,

        });

        await newUser.save();
        const subject = 'Welcome to Our Service';
        const html = welcomeEmailTemplate(username);
        await sendEmail(email, subject, html);

        res.status(200).send({ message: 'User registered successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: 'Invalid email or password', success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid email or password', success: false });
        }
        else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });
            res.status(200).send({ message: 'Logged in successfully', success: true, data: token });

        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error during login', success: false });
    }
};

const getUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false });
        } else {
            return res.status(200).send({ success: true, data: user });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error getting user details', success: false });
    }
};

const updateUserById = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user by ID:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await User.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { register, login, getUser, getUserById, updateUserById, deleteUserById };
