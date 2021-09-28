import { urlAPI } from "../constants/urlAPI";

export const getDepartments = async () => {
    const url = `${urlAPI}/departments`;
    const res = await fetch(url);
    const departments = res.json();
    return departments;
}