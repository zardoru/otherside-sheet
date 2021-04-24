import {Attribute, Skill} from "./attribute";
import {skill_list} from "./data/skills";
import {attributes} from "./data/attributes";
import {races} from "./data/races";

export class Equipment {
    head = null;
    chest = null;
    right_hand = null;
    left_hand = null;
    legs = null;
    feet = null;
    accessory1 = null;
    accessory2 = null;
}

export class Item {
    name = ''
    description = '';
    uses = 0
    weight = 0
}

let new_attr = () => Object.keys(attributes).map(key => new Attribute(attributes[key], key, key == "MP" ? 50 : 100));
let new_skills = () => skill_list.map(x => new Skill(x));

export class Character {
    name = 'character mcdiceface';
    _race = 'Human';
    subrace = '';
    save_point = 'none yet';
    player = 'a good one';
    attributes = new_attr();
    skills = new_skills();
    items: Array<Item> = [];
    weight = '';
    equipment = new Equipment();
    gold = 0;
    char_class = '';
    class_level = 0;



    get race(): string {
        return this._race;
    }

    set race(value) {
        this._race = value;

        const cur_race = races[this._race];
        for (let skill of this.skills) {
            skill.racial_bonus = cur_race.skill_bonus[skill.name] || cur_race.weapon_bonus[skill.name] || 0;
        }
        // this.skills = this.skills; // force svelte update lol

        for (let attribute of this.attributes) {
            attribute.racial_bonus = cur_race.attribute_bonus[attribute.short_name] || 0;
        }
    }
}