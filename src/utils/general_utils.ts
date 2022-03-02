export const stringToDate = (date:string): Date => {
    const [day,month,year] = date.split('/')
    const newDate = new Date(Number(year),Number(month)-1,Number(day))
    return newDate
}

export const nextMonthDate = (date: Date): Date => {
    const newDate = new Date(date.getFullYear(),date.getMonth()+1,date.getDay())
    return newDate
}

export const modifyDay = (day: number) => (date: Date): Date => {
    const newDate = new Date(date.getFullYear(),date.getMonth(), day)
    return newDate
}

export const dateToString = (date: Date): string => {
    return date.toLocaleDateString()
}


export const checkTypeThenApplyFunction = (type: unknown, fn: Function) => (value: unknown) => {
    if(typeof value === type) {
        return fn(value)
    } else {
        return value
    }
}
export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
