import { urlAPI } from "../constants/urlAPI";

export const getMunicipalities = async () => {
    const url = `${urlAPI}/municipalities`;
    const res = await fetch(url);
    const municipalities = res.json();
    return municipalities;
}
