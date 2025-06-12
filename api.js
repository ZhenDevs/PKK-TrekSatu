const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3001;
const crypto = require('crypto');
const JWT_SECRET = 'akbardisini'

app.use(cors());
app.use(express.json());

let ADMIN_SECRET_KEY;
try {
  ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || crypto.randomBytes(16).toString('hex');
} catch (error) {
  console.warn('Crypto module not available, using fallback random generator');
  const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || generateRandomString(32);
}

console.log('Admin registration key (save this for admin registration):', ADMIN_SECRET_KEY);

const sequelize = new Sequelize(
  process.env.DB_NAME || 'treksatu',
  process.env.DB_USER || 'barr',
  process.env.DB_PASSWORD || 'barr123',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
});

const uploadDir = path.join(__dirname, 'uploads', 'mountains');
fs.ensureDirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'mountain-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const Mountain = sequelize.define('Mountain', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('buka', 'waspada', 'tutup'),
    defaultValue: 'buka'
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

const ForumPost = sequelize.define('ForumPost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

const ForumComment = sequelize.define('ForumComment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: ForumPost,
      key: 'id'
    }
  }
});

User.hasMany(ForumPost, { foreignKey: 'authorId' });
ForumPost.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(ForumComment, { foreignKey: 'authorId' });
ForumComment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

ForumPost.hasMany(ForumComment, { foreignKey: 'postId' });
ForumComment.belongsTo(ForumPost, { foreignKey: 'postId' });

User.hasMany(Mountain, { foreignKey: 'updatedBy' });
Mountain.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' });

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables recreated');
});

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
};

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/mountains', async (req, res) => {
  try {
    const mountains = await Mountain.findAll({
      order: [['name', 'ASC']],
      include: [
        {
          model: User,
          as: 'updatedByUser',
          attributes: ['name']
        }
      ]
    });
    res.json(mountains);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/mountains/:id', async (req, res) => {
  try {
    const mountain = await Mountain.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'updatedByUser',
          attributes: ['name']
        }
      ]
    });
    
    if (!mountain) {
      return res.status(404).json({ message: 'Mountain not found' });
    }
    
    res.json(mountain);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/mountains', [authMiddleware, adminMiddleware, upload.single('photo')], async (req, res) => {
  const { name, location, height, description, status } = req.body;
  
  try {
    const newMountain = await Mountain.create({
      name,
      location,
      height,
      description,
      status,
      photoUrl: req.file ? `/uploads/mountains/${req.file.filename}` : null,
      updatedBy: req.user.id
    });
    
    res.json(newMountain);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.put('/api/mountains/:id', [authMiddleware, adminMiddleware, upload.single('photo')], async (req, res) => {
  const { name, location, height, description, status } = req.body;
  
  try {
    let mountain = await Mountain.findByPk(req.params.id);
    
    if (!mountain) {
      return res.status(404).json({ message: 'Mountain not found' });
    }
    
    if (req.file && mountain.photoUrl) {
      const oldPhotoPath = path.join(__dirname, mountain.photoUrl);
      try {
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      } catch (unlinkErr) {
        console.error('Error deleting old photo:', unlinkErr);
      }
    }
    
    await mountain.update({
      name: name || mountain.name,
      location: location || mountain.location,
      height: height || mountain.height,
      description: description || mountain.description,
      status: status || mountain.status,
      photoUrl: req.file ? `/uploads/mountains/${req.file.filename}` : mountain.photoUrl,
      updatedBy: req.user.id
    });
    
    res.json(mountain);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/mountains/:id/photo', [authMiddleware, adminMiddleware, upload.single('photo')], async (req, res) => {
  try {
    let mountain = await Mountain.findByPk(req.params.id);
    
    if (!mountain) {
      return res.status(404).json({ message: 'Mountain not found' });
    }
    
    if (mountain.photoUrl) {
      const oldPhotoPath = path.join(__dirname, mountain.photoUrl);
      try {
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      } catch (unlinkErr) {
        console.error('Error deleting old photo:', unlinkErr);
      }
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No photo uploaded' });
    }
    
    await mountain.update({
      photoUrl: `/uploads/mountains/${req.file.filename}`,
      updatedBy: req.user.id
    });
    
    res.json(mountain);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/api/mountains/:id/photo', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const mountain = await Mountain.findByPk(req.params.id);
    
    if (!mountain) {
      return res.status(404).json({ message: 'Mountain not found' });
    }
    
    if (!mountain.photoUrl) {
      return res.status(404).json({ message: 'Mountain has no photo' });
    }
    
    const photoPath = path.join(__dirname, mountain.photoUrl);
    try {
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    } catch (unlinkErr) {
      console.error('Error deleting photo:', unlinkErr);
    }
    
    await mountain.update({
      photoUrl: null,
      updatedBy: req.user.id
    });
    
    res.json({ message: 'Photo removed', mountain });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.patch('/api/mountains/:id/status', [authMiddleware, adminMiddleware], async (req, res) => {
  const { status } = req.body;
  
  try {
    let mountain = await Mountain.findByPk(req.params.id);
    
    if (!mountain) {
      return res.status(404).json({ message: 'Mountain not found' });
    }
    
    await mountain.update({
      status,
      updatedBy: req.user.id
    });
    
    res.json(mountain);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/forum', async (req, res) => {
  try {
    const posts = await ForumPost.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name']
        },
        {
          model: ForumComment,
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });
    
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/forum/:id', async (req, res) => {
  try {
    const post = await ForumPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name']
        },
        {
          model: ForumComment,
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/forum', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  
  try {
    const newPost = await ForumPost.create({
      title,
      content,
      authorId: req.user.id
    });
    
    const post = await ForumPost.findByPk(newPost.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name']
        }
      ]
    });
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.put('/api/forum/:id', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  
  try {
    let post = await ForumPost.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (post.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }
    
    await post.update({
      title: title || post.title,
      content: content || post.content
    });
    
    const updatedPost = await ForumPost.findByPk(post.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name']
        },
        {
          model: ForumComment,
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });
    
    res.json(updatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/api/forum/:id', authMiddleware, async (req, res) => {
  try {
    const post = await ForumPost.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (post.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    
    await ForumComment.destroy({
      where: {
        postId: post.id
      }
    });
    
    await post.destroy();
    
    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/forum/:id/comments', authMiddleware, async (req, res) => {
  const { content } = req.body;
  
  try {
    const post = await ForumPost.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    await ForumComment.create({
      content,
      authorId: req.user.id,
      postId: post.id
    });
    
    const updatedPost = await ForumPost.findByPk(post.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name']
        },
        {
          model: ForumComment,
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });
    
    res.json(updatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/api/forum/comments/:commentId', authMiddleware, async (req, res) => {
  try {
    const comment = await ForumComment.findByPk(req.params.commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    if (comment.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    
    const postId = comment.postId;
    
    await comment.destroy();
    
    const updatedPost = await ForumPost.findByPk(postId, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name']
        },
        {
          model: ForumComment,
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });
    
    res.json(updatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/users', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/users', [authMiddleware, adminMiddleware], async (req, res) => {
  const { name, email, password, role } = req.body;
  
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role && ['user', 'admin'].includes(role) ? role : 'user'
    });
    
    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };
    
    res.status(201).json(userResponse);
  } catch (err) {
    console.error('Error creating user:', err.message);
    
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/users/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  const { name, email, role, password } = req.body;
  
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const updateData = {};
    
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role && ['user', 'admin'].includes(role)) updateData.role = role;
    
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    
    await user.update(updateData);
    
    const updatedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err.message);
    
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/users/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }
    
    await user.destroy();
    
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/users/:id/role', [authMiddleware, adminMiddleware], async (req, res) => {
  const { role } = req.body;
  
  if (!role || !['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }
  
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.update({ role });
    
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/auth/register-admin', async (req, res) => {
  const { name, email, password, adminKey } = req.body;
  
  if (adminKey !== ADMIN_SECRET_KEY) {
    return res.status(403).json({ message: 'Invalid admin key' });
  }
  
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });
    
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    
    jwt.sign(
      payload,
      JWT_SECRET, 
      { expiresIn: '7d' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ 
          message: 'Admin account created successfully',
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error('Admin registration error:', err.message);
    res.status(500).send('Server error during admin registration');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;