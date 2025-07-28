import UserModel from '../../models/user/index.js'

export default async function deleteUser(req, res) {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};