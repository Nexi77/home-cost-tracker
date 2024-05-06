export function getCurrentDate() {
    // Date object
    const date = new Date();

    const currentDay= String(date.getDate()).padStart(2, '0');
    const currentMonth = String(date.getMonth()+1).padStart(2,"0");
    const currentYear = date.getFullYear();

    const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    return currentDate;
}

export function getFirstDayOfMonth(date: Date): string {
    const year = date.getFullYear();
    const month = addLeadingZero(date.getMonth() + 1);
    return `${year}-${month}-01`;
}

export function getFirstDayOfQuarter(date: Date): string {
    const quarterStartMonth = Math.floor(date.getMonth() / 3) * 3;
    let year = date.getFullYear();
    let month = quarterStartMonth - 2; // Three months before the start of the quarter
    let quarterStartDate: Date;

    if (month < 0) {
        // If the month is negative, subtract from the year as well
        year--;
        month += 12; // Adjusting for negative months
    }

    quarterStartDate = new Date(year, month, 1);
    return getFirstDayOfMonth(quarterStartDate);
}

export function getFirstDayOfYear(date: Date): string {
    const year = date.getFullYear();
    return `${year}-01-01`;
}

function addLeadingZero(number: number): string {
    return number < 10 ? '0' + number : number.toString();
}