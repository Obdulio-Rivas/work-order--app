import { urlAPI } from "../constants/urlAPI";

export const getEmployees = async () => {
    const url = `${urlAPI}/employees`;
    const res = await fetch(url);
    const employees = res.json();
    return employees;
}