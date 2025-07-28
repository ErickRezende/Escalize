import mongoose from "mongoose";

const MusicSchema = mongoose.Schema({
    title: String,
    theme: [String],
    chordsLink: String,
    youtubeLink: String,
    originalTone: String,
    tone: String,
    author: String,
    references: [String]
})

const MusicModel = mongoose.model("music", MusicSchema)

export default MusicModel
