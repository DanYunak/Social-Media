export const updateObjInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {

    return items.map((u: any) => { //* Map створює масив на основі минулого масиву, це хороший варіант для зміни даних, для додавання чогось в масив map можна не використовувати, а просто копіювати масив
        if (u[objPropName] === itemId) { 
            return { ...u, newObjProps } //* Якщо id співпадає то повертає копію і змінює стан підписки, якщо ні, то повертає оригінал без змін
        }
        return u;
    })
}