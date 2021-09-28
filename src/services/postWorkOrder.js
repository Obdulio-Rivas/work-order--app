import { urlAPI } from "../constants/urlAPI";

export const postWorkOrder = async (data) => {
    const url = `${urlAPI}/work_order`;
    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return res.json();
}