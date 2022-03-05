export const stringToDate = (date:string): Date => {
    const [day,month,year] = date.split('/')
    const newDate = new Date(Number(year),Number(month)-1,Number(day))
    return newDate
}

export const nextMonthDate = (date: Date): Date => {
    const monthOffset = 1
    const parsedDate = new Date(date.getFullYear(),date.getMonth()+monthOffset,date.getDate())
    return parsedDate
}

export const modifyDay = (day: number) => (date: Date): Date => {
    const originDate = new Date(date)
    const newDate = new Date(originDate.getFullYear(),originDate.getMonth(), day)
    return newDate
}

export const compareDateToPresent = (date: Date) => {
    const presentDate = new Date()
    const Difference_In_Time = date.getTime() - presentDate.getTime();  
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.trunc(Difference_In_Days)
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
