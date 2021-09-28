import { urlAPI } from "../constants/urlAPI";

export const getWorkOrderById = async (id_work_order) => {
    const url = `${urlAPI}/work_order/${id_work_order}`;
    const res = await fetch(url);
    const workOrder = res.json();
    return workOrder;
}
