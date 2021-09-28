export const getGroupOrder = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const groupOrder = month < 10 ? `0${month.toString()}-${year}` : `${month.toString()}-${year}`;
    return groupOrder;
}