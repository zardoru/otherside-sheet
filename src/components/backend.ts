import {Character} from "./classes/character";

const API = 'http://localhost:3000'; /* replaced by webpack */

export class Backend {
    static async SaveCharacter(key, obj) {
        const endpoint = API + "/data/" + encodeURIComponent(key);
        const data = await fetch(endpoint, {
            method: 'post', body: JSON.stringify(obj)
        });

        return data.status;
    }

    static async LoadCharacter(player_name): Promise<Character> {
        const endpoint = API + "/data/" + encodeURIComponent(player_name);
        const data = await fetch(endpoint, {
            method: 'get'
        });

        if (data.status !== 200)
            return null;

        const json = await data.json();

        if (json === null)
            return null;

        return Character.from_json(json);
    }
}