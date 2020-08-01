export default class AppBarMenuItem {
    constructor(
        public view: any,
        public label: string,
        public onClick: (() => void) | null,
        public position: 'left' | 'right' | 'hidden',
    ) {}
};