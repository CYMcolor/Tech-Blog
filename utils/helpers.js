module.exports = {
    format_time: (date) => {
        return date.toLocaleTimeString();
    },
    // formats it as M/D/YYYY
    format_date: (date) => {
        let newDate= new Date(date);
        return `${newDate.getMonth() + 1}/${newDate.getDate()}/${
        newDate.getFullYear()
        }`;
    },
}