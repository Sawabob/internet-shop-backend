const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor({ userModel }) {
    this.User = userModel;
  }

  async register(userData) {
    const { name, email, password } = userData;

    const existingUser = await this.User.findOne({ email });
    if (existingUser) {
      throw new Error('Користувач з таким email вже існує');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  async login(credentials) {
    const { email, password } = credentials;

    const user = await this.User.findOne({ email });
    if (!user) {
      throw new Error('Невірний email або пароль');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Невірний email або пароль');
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  generateToken(user) {
    return jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }
}

module.exports = AuthService;
