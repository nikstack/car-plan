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
        plainEntry.prio = +plainEntry.prio;
        plainEntry.creationDate = new Date(+plainEntry.creationDate);
        plainEntry.dateFrom = new Date(+plainEntry.dateFrom);
        plainEntry.dateTo = new Date(+plainEntry.dateTo);
        return plainEntry as Entry;
    }
}