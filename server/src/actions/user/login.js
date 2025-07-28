import UserModel from '../../models/user/index.js';
import jwt from 'jsonwebtoken';

export default async function login(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

  res.json({ token, user: { name: user.name, email: user.email } })
}
