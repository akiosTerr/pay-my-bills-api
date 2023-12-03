export const stringToDate = (date:string): Date => {
    const [day,month,year] = date.split('/')
    const newDate = new Date(Number(year),Number(month)-1,Number(day))
    return newDate
}

export const nextMonthDate = (date: Date): Date => {
    const newDate = new Date(date) 
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate
}

export const getNextDateByMonthDay = (targetDay) => {
    // Get the current date
    const currentDate = new Date();
  
    // Set the target day for the current month
    const currentMonthTargetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), targetDay);

    // Set the target day for the next month
    const nextMonthTargetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, targetDay);
  
    // Determine the closest date
    if (currentDate.getDate() < targetDay) {
      return currentMonthTargetDate;
    } else {
      return nextMonthTargetDate;
    }
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
