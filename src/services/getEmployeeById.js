import { urlAPI } from "../constants/urlAPI";

export const getEmployeeById = async (id_employee) => {
    const url = `${urlAPI}/employee/${id_employee}`;
    const res = await fetch(url);
    const employee = res.json();
    return employee;
}
