import dbConnection from "../../lib/dbConection.js";
import LineUpModel from "../../models/lineup/index.js";

export async function getLineUp(req, res) {
  try {
    const lineup = await LineUpModel.findById(req.params.id)
      .populate('booth signs ministering welcome vocal instrumental musics');
    if (!lineup) return res.status(404).json({ error: 'LineUp not found' });
    res.json(lineup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllLineUps(req, res) {
  try {
    const lineups = await LineUpModel.find()
      .populate('booth signs ministering welcome vocal instrumental musics')
    res.json(lineups)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
