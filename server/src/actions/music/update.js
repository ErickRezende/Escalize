import MusicModel from "../../models/music/index.js";
import dbConnection from "../../lib/dbConection.js";

export default async function updateMusic(req, res){
    const {
		title,
        theme,
        chordsLink,
        youtubeLink,
        originalTone,
        tone,
        author,
        references
	} = req.body

    const {
        _id
    } = req.params

	/*if (
		!title ||
        !theme ||
        !chordsLink ||
        !youtubeLink ||
        !originalTone ||
        !tone ||
        !author ||
        !references
	){
        //return res.status(406).json({ sucess: false, error: "Error: Wrong fields" })
    }*/

    /*if (
		!_id
	){
        return res.status(406).json({ sucess: false, error: "Error: Wrong parameter" })
    }*/

    await dbConnection()

    const _music = {
		title: title,
        theme: theme,
        chordsLink: chordsLink,
        youtubeLink: youtubeLink,
        originalTone: originalTone,
        tone: tone,
        author: author,
        references: references
	}

    let music = await MusicModel.findOneAndUpdate(
        { _id: req.body.params.id },
        { $set: _music },
        { new: true, runValidators: true }
    )

    res.status(201).json(music)
}