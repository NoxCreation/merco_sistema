export const formatNumber = (num: number | string) => {
    if (typeof num === 'number') 
        num = num.toString();
    let partes = num.split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return partes.join(',');
}