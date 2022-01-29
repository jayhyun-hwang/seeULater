function dateToLocalTimeString(localDate) {
    if (!localDate) {
        return null
    }
    const fullYear = localDate.getFullYear().toString()
    const month = timePadStart(localDate.getMonth() + 1)
    const date = timePadStart(localDate.getDate())
    const hours = timePadStart(localDate.getHours())
    const minutes = timePadStart(localDate.getMinutes())
    const seconds = timePadStart(localDate.getSeconds())

    const fullDateString = [fullYear, month, date].join("-")
    const timeSting = [hours, minutes, seconds].join(":")
    const res = [fullDateString, timeSting].join("\t")
    return res

}
function timePadStart(timeNumber) {
    return timeNumber.toString().padStart(2, '0')
}

module.exports = {
    dateToLocalTimeString
}