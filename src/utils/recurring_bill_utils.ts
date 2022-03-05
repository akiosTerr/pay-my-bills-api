export const calculateBillStatus = (dayDifference) => {
    let status = ''
    // console.log(dayDifference)
    switch (true) {
        case dayDifference < 0:
            status = 'danger'
            break;
        case dayDifference < 6:
            status = 'warning'
            break;
        case dayDifference < 15:
            status = 'safe'
            break;
        default:
            status = 'paid'
            break;
    }
    
    return status
}