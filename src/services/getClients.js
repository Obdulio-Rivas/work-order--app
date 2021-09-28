import { urlAPI } from "../constants/urlAPI";

export const getClients = async () => {
    const url = `${urlAPI}/clients`;
    const res = await fetch(url);
    const clients = res.json();
    return clients;
}