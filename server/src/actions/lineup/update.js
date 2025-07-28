import dbConnection from "../../lib/dbConection.js";
import LineUpModel from "../../models/lineup/index.js";


export default async function(req, res) {
  try {
    const lineup = await LineUpModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(lineup)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}