export const MapData = (datas: Array<any>, columns: any) => {
    let rows = datas.map((item: any) => {
        return Object.keys(columns).map((column: any) => {
            let keys = column.split('.');
            let value = item;
            for (let key of keys) {
                value = value[key];
            }
            return value;
        });
    });

    return rows
}
