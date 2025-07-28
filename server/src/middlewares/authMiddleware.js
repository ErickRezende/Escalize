import jwt from 'jsonwebtoken';
import UserModel from '../models/user/index.js';

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido.' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select('-password');

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
}
