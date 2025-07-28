import mongoose from "mongoose";

const LineUpSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    rehearsalDates: {
        type: [Date],
        default: [],
    },
    booth: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    signs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ministering: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    welcome: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    vocal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    instrumental: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'music',
    }],
    obs: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

const LineUpModel = mongoose.model('LineUp', LineUpSchema);

export default LineUpModel;