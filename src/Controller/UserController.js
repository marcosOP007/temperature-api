const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const path = require('path');

// User login
async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render(path.join(__dirname, '../views/html/public/login.ejs'), {
            message: 'Email and password are required!',
        });
    }

    try {
        // Fetch user by email
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.render(path.join(__dirname, '../views/html/public/login.ejs'), {
                message: 'Incorrect email or password!',
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.hash_password);
        if (!isPasswordValid) {
            return res.render(path.join(__dirname, '../views/html/public/login.ejs'), {
                message: 'Incorrect email or password!',
            });
        }

        // Generate JWT token
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '24h' });

        // Set cookie and redirect
        res.cookie('token', token, { httpOnly: true });
        return res.redirect(`/index/${user.id}`);
    } catch (error) {
        console.error('Login error:', error);
        return res.render(path.join(__dirname, '../views/html/public/login.ejs'), {
            message: 'Server error, please try again later.',
        });
    }
}

// User logout
async function logout(req, res) {
    try {
        res.clearCookie('token', { path: '/' });
        return res.status(200).redirect('/index/login/');
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).send('Server error.');
    }
}

// Register a new user
async function register(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    // Validate input
    if (!name || !email || !password || password !== confirmPassword) {
        return res.render(path.join(__dirname, '../views/html/public/register.ejs'), {
            message: 'All fields are required and passwords must match!',
        });
    }

    try {
        // Check if user already exists
        const userExists = await userService.getUserByEmail(email);
        if (userExists) {
            return res.render(path.join(__dirname, '../views/html/public/register.ejs'), {
                message: 'Email is already in use.',
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        await userService.createUser({
            name,
            email,
            hash_password: hashedPassword,
            permission_type: 'USER',
        });

        return res.redirect('/index/login');
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).send('Server error.');
    }
}

// Delete a moderator
async function deleteModerator(req, res) {
    try {
        await userService.deleteUser(req.params.id);
        return res.redirect(`/index/${req.user_id}`);
    } catch (error) {
        console.error('Delete moderator error:', error);
        return res.status(500).send('Server error.');
    }
}

// Update user status
async function updateUserStatus(req, res) {
    const { id } = req.params;
    const { state } = req.body;

    if (!state) {
        return res.status(400).json({ message: 'Invalid state!' });
    }

    try {
        await userService.updateUser(id, { status: state });
        return res.status(200).json({ message: 'Status updated successfully!' });
    } catch (error) {
        console.error('Update status error:', error);
        return res.status(500).send('Server error.');
    }
}

// Update user permissions
async function updateUserPermission(req, res) {
    const { id } = req.params;
    const { perm } = req.body;

    if (!perm) {
        return res.status(400).json({ message: 'Invalid permission!' });
    }

    try {
        await userService.updateUser(id, { permission_type: perm });
        return res.status(200).json({ message: 'Permission updated successfully!' });
    } catch (error) {
        console.error('Update permission error:', error);
        return res.status(500).send('Server error.');
    }
}

module.exports = {
    login,
    logout,
    register,
    deleteModerator,
    updateUserStatus,
    updateUserPermission,
};
