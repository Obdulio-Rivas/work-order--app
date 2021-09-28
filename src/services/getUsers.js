import { urlAPI } from "../constants/urlAPI";

export const getUsers = async () => {
    const url = `${urlAPI}/users`;
    const res = await fetch(url);
    const users = res.json();
    return users;
}
