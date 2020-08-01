export default class Entry {
    constructor(
        public id: number,
        public userName: string,
        public creationDate: Date,
        public dateFrom: Date,
        public dateTo: Date,
        public prio: number,
        public description: string
    ) {}

    public getPrioDescription() {
        switch (this.prio) {
            case 1:
                return "unwichtig";
            case 2:
                return "wichtig";
            case 3:
                return "unverzichtbar";
        }
    }
}