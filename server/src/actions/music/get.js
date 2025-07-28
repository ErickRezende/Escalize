import MusicModel from "../../models/music/index.js";
import dbConnection from "../../lib/dbConection.js";

export async function getMusic(req, res) {
    /*if(!dbConnection().sucess){
        console.log(dbConnection())
        return res.status(406).json({sucess: false, error: `ERROR: Can't to connect to database.`})
    }*/

    await dbConnection()

    let music = await MusicModel.find(req.body)

    res.status(200).json(music)
}

export async function getAllMusics(req, res) {
    // pass
}
