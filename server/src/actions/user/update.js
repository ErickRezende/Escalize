import UserModel from '../../models/user/index.js'

export default async function updateUser(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};