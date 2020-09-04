// General Provider
export default class GP {
    private static key: string = '';
    private static user: string = '';

    public static getUser() {
        if (GP.user === '') {
            const url = new URL(window.location.href);
            const tempUser = url.searchParams.get('u');
            GP.user = tempUser === null ? '' : tempUser;
        }

        return GP.user;
    }

    public static getKey() {
        if (GP.key === '') {
            const url = new URL(window.location.href);
            const tempKey = url.searchParams.get('k');
            GP.key = tempKey === null ? '' : tempKey;
        }

        return GP.key;
    }

    public static getBaseServerURL() {
        return 'http://car-plan-server.localhost'
    }
}