export default class Entry {
    public static priorities: string[] = ["unwichtig", "wichtig", "unverzichtbar"];

    constructor(
        public userName: string,
        public creationDate: Date,
        public dateFrom: Date,
        public dateTo: Date,
        public prio: number,
        public description: string
    ) {}

    public id?: number

    public static plainToEntry(plainEntry: any): Entry {
        const newEntry = {...plainEntry};
        newEntry.prio = +plainEntry.prio;
        newEntry.creationDate = new Date(+plainEntry.creationDate);
        newEntry.dateFrom = new Date(+plainEntry.dateFrom);
        newEntry.dateTo = new Date(+plainEntry.dateTo);
        return newEntry as Entry;
    }
}