import {Character} from "./classes/character";
import * as Parse from 'parse/dist/parse.min.js';

Parse.serverURL = 'https://parseapi.back4app.com';
Parse.initialize(
    'ZPQdtzalt7VSb5JcNZxoNURMluxKSLYcz2pME70z', // Application ID
    'ax8THROWUVzFCQ9rjUJJxY0Cc0zWOGqEPidEBysE', // Javascript key
    null // no master key
);

export type CharIdPair = {
    character: Character,
    id: any
};

const PCharsheet = Parse.Object.extend('Charsheet');

export class Backend {
    static async SaveCharacter(key, obj, discord_url) {
        const query = new Parse.Query(PCharsheet);
        console.log(query);
        query.equalTo("owner", key);
        let sheet_row = await query.first();
        if (sheet_row === undefined || sheet_row == null) {
            let new_sheet = new PCharsheet();
            new_sheet.set("owner", key);
            new_sheet.set("sheetData", obj);
            new_sheet.set("webhook_uri", discord_url);

            new_sheet.save();
        } else {
            sheet_row.set("sheetData", obj);
            sheet_row.set("webhook_uri", discord_url);
            sheet_row.save();
        }
    }
    static async LoadCharacter(key): Promise<[Character, string]> {
        const query = new Parse.Query(PCharsheet);
        query.equalTo("owner", key);
        let sheet_row = await query.first();
        let json = sheet_row.get("sheetData");
        let uri = sheet_row.get("webhook_uri");
        return [Character.from_json(json), uri];
    }

    static async Login(name: string, pass: string) {
        return await Parse.User.logIn(name, pass);
    }

    static async Logout() {
        return await Parse.User.logOut();
    }

    static async GetCurrentUser() {
        return await Parse.User.current();
    }

    static async GetCharacterList(): Promise<Array<CharIdPair>> {
        const query = new Parse.Query(PCharsheet);
        return (await query.find()).map(x => {
            return {
                character: Character.from_json(x.get("sheetData")), id: x
            };
        });
    }

    static async SaveCharacterGM(charIdPair: CharIdPair): Promise<CharIdPair> {
        let sheet_row = charIdPair.id;
        sheet_row.set("sheetData", charIdPair.character.as_json());
        sheet_row = await sheet_row.save();
        return {
            character: Character.from_json(sheet_row.get("sheetData")),
            id: sheet_row
        };
    }

    static async LoadCharacterGM(charIdPair: CharIdPair): Promise<CharIdPair> {
        let sheet_row = charIdPair.id;
        sheet_row = await sheet_row.fetch();
        return {
            character: Character.from_json(sheet_row.get("sheetData")),
            id: sheet_row
        };
    }

    static GetKey(charIdPair: CharIdPair): any {
        return charIdPair.id.id;
    }

    static async ReloadCharacterList(characters_displayed: Array<CharIdPair>): Promise<Array<CharIdPair>> {
        let ret = [];
        for (let item of characters_displayed) {
            let new_item = await this.LoadCharacterGM(item);
            ret.push(new_item);
        }

        return Promise.all(ret);
    }

    static async SaveCharacterList(characters_displayed: Array<CharIdPair>): Promise<Array<CharIdPair>> {
        let ret = [];
        for (let item of characters_displayed) {
            let new_item = await this.SaveCharacterGM(item);
            ret.push(new_item);
        }

        return Promise.all(ret);
    }
}

// const API = 'http://localhost:3000'; /* replaced by webpack */
//
// export class Backend {
//     static async SaveCharacter(key, obj) {
//         const endpoint = API + "/data/" + encodeURIComponent(key);
//         const data = await fetch(endpoint, {
//             method: 'post', body: JSON.stringify(obj)
//         });
//
//         return data.status;
//     }
//
//     static async LoadCharacter(player_name): Promise<Character> {
//         const endpoint = API + "/data/" + encodeURIComponent(player_name);
//         const data = await fetch(endpoint, {
//             method: 'get'
//         });
//
//         if (data.status !== 200)
//             return null;
//
//         const json = await data.json();
//
//         if (json === null)
//             return null;
//
//         return Character.from_json(json);
//     }
// }