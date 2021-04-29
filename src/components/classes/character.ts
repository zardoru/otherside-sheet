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

    as_json() {
        return {
            head: this.head,
            chest: this.chest,
            right_hand: this.right_hand,
            left_hand: this.left_hand,
            legs: this.legs,
            feet: this.feet,
            accessory1: this.accessory1,
            accessory2: this.accessory2
        };
    }

    static from_json(equipment) {
        let equip = new Equipment();
        equip.head = equipment.head;
        equip.chest = equipment.chest;
        equip.right_hand = equipment.right_hand;
        equip.left_hand = equipment.left_hand;
        equip.legs = equipment.legs;
        equip.feet = equipment.feet;
        equip.accessory1 = equipment.accessory1;
        equip.accessory2 = equipment.accessory2;
        return equip;
    }
}

export class Item {
    name = ''
    description = '';
    uses = 0
    weight = 0

    as_json() {
        return {
            name: this.name,
            description: this.description,
            uses: this.uses,
            weight: this.weight
        };
    }

    static from_json(x): Item {
        const item = new Item();
        item.name = x.name;
        item.description = x.description;
        item.uses = x.uses;
        item.weight = x.weight;
        return item
    }
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

    as_json(): any {
        return {
            name: this.name,
            race: this._race,
            subrace: this.subrace,
            save_point: this.save_point,
            player: this.player,
            attributes: this.attributes.map(x => x.as_json()),
            skills: this.skills.map(x => x.as_json()),
            items: this.items.map(x => x.as_json()),
            weight: this.weight,
            equipment: this.equipment.as_json(),
            gold: this.gold,
            char_class: this.char_class,
            class_level: this.class_level
        };
    }

    static from_json(json: any): Character {
        let char = new Character();
        char.name = json.name;
        char.race = json.race;
        char.save_point = json.save_point
        char.player = json.player
        char.attributes = json.attributes.map(x => Attribute.from_json(x));
        char.skills = json.skills.map(x => Skill.from_json(x));
        char.items = json.items.map(x => Item.from_json(x));
        char.weight = json.weight;
        char.equipment = Equipment.from_json(json.equipment);
        char.gold = json.gold;
        char.char_class = json.char_class;
        char.class_level = json.class_level;

        return char
    }
}