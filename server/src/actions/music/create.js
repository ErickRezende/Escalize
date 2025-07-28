import dbConnection from "../../lib/dbConection.js";
import MusicModel from "../../models/music/index.js";

export default async function(req, res) {
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

	if (
		!title ||
        !theme ||
        !chordsLink ||
        !youtubeLink ||
        !originalTone ||
        !tone ||
        !author ||
        !references
	){
        return res.status(406).json({ sucess: false, error: "Error: Wrong fields" })
    }
    
    await dbConnection()

	const _music = new MusicModel({
		title: title,
        theme: theme,
        chordsLink: chordsLink,
        youtubeLink: youtubeLink,
        originalTone: originalTone,
        tone: tone,
        author: author,
        references: references
	})

	_music.save()
	res.status(201).json(_music)
}
