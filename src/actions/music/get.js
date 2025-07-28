import axios from "axios";

export default async function getMusic() {
    return await axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/music/'
    }).then((res) => {
        return res.data
    }).catch((err) => {
        return { sucess: false, error: err}
    })
}