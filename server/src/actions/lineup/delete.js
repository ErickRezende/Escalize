import dbConnection from "../../lib/dbConection.js";
import LineUpModel from "../../models/lineup/index.js";

export default async function(req, res) {
  try {
    await LineUpModel.findByIdAndDelete(req.params.id)
    res.json({ message: 'LineUp deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}