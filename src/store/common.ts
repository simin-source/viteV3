import { reactive } from 'vue';

interface CommonSotreType {
    token?: string;
}

class SotreManager {
    constructor() {
        this._store = reactive({
            token: undefined,
        });
    }

    private _store: CommonSotreType;

    set userToken(token: string | undefined) {
        this._store.token = token;
    }

    get userToken() {
        return this._store.token;
    }
}

export const commSotre = new SotreManager();