import { urlAPI } from "../constants/urlAPI";

export const getWorkOrders = async () => {
    const url = `${urlAPI}/work_orders`;
    const res = await fetch(url);
    const workOrders = res.json();
    return workOrders;
}
