import UserModel from '../../models/user/index.js'

export default async function createUser(req, res) {
  try {
    const user = await UserModel.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}