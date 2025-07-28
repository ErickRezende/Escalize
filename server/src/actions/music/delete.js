import dbConnection from "../../lib/dbConection.js";
import MusicModel from "../../models/music/index.js";

export default async function deleteMusic(req, res) {
    const {
		_id
	} = req.body

	if (
		!_id
	){
        return res.status(406).json({ sucess: false, error: "Error: Wrong field" })
    }

    await dbConnection()

    await MusicModel.findOneAndDelete({ _id: req.body._id }, (err, doc) => {
      if (err) {
        return res.status(500).json({sucess: false, error: `ERROR: ${error}`})
      }
      if (doc) {
        return res.status(200).json({ sucess: true })
      } else {
        return res.status(404).json({sucess: false, error: `ERROR: Music not found.`})
      }
    })
}