import UserModel from '../../models/user/index.js';
import jwt from 'jsonwebtoken';

export default async function signup(req, res) {
  const { name, email, password, admin, roles } = req.body;

  try {
    
    const existing = await UserModel.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email já cadastrado' });

    const newUser = new UserModel({ name, email, password, admin, roles });
    await newUser.save();

    // gera token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      user: { name: newUser.name, email: newUser.email }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno ao criar usuário' });
  }
}
