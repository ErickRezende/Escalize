import api from "@/lib/api";

export default async function getMusic() {
    return await api.get(`/music/`).then((res) => {
        return res.data
    }).catch((err) => {
        return { sucess: false, error: err}
    })
}