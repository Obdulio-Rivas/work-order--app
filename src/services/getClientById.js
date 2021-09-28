import { urlAPI } from "../constants/urlAPI";

export const getClientById = async (id_client) => {
    const url = `${urlAPI}/client/${id_client}`;
    const res = await fetch(url);
    const client = res.json();
    return client;
}
