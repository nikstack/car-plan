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
}