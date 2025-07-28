import api from "@/lib/api";

export default async function getLineUp() {
    return await api.get(`/lineup/`).then((res) => {
        return res.data
    }).catch((err) => {
        return { sucess: false, error: err}
    })
}