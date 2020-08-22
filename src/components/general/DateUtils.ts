export default class DateUtils {
    public static formatDate(date: Date): string {
        const year = new Intl.DateTimeFormat('default', {year: 'numeric'}).format(date)
        const month = new Intl.DateTimeFormat('default', {month: '2-digit'}).format(date)
        const day = new Intl.DateTimeFormat('default', {day: '2-digit'}).format(date)

        return `${day}.${month}.${year}`;
    }

    public static formatTime(date: Date): string {
        const intlHour = new Intl.DateTimeFormat('default', {hour: '2-digit'}).format(date)
        const hour = intlHour.slice(0, 2);
        const intlMinute = new Intl.DateTimeFormat('default', {minute: '2-digit'}).format(date)
        const minute = intlMinute.length === 1 ? '0' + intlMinute : intlMinute;

        return `${hour}:${minute}`;
    }

    public static getNextDay(timestamp: number): number {
        return timestamp + 86400;
    }

    public static forEachDay(from: Date, to: Date, callback: (day: Date, dayTimestamp: number, index: number) => void) {
        let index = 0;
        for (let t = from.getTime(); t <= to.getTime(); t = DateUtils.getNextDay(t)) {
            callback(new Date(t), t, index);
            index++;
        }
    }
}