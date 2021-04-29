export class Trait {
    name = ""
    upgraded_value = 0
    racial_bonus = 0
    class_bonus = 0
    start_value = 100

    get value(): number { // final value
        return this.start_value + this.upgraded_value + this.racial_bonus + this.class_bonus;
    }

    set value(v) {
        this.upgraded_value = v - 100;
    }

    constructor(name: string) {
        this.name = name;
    }

    as_json() {
        return {
            name: this.name,
            upgraded_value: this.upgraded_value,
            racial_bonus: this.racial_bonus,
            class_bonus: this.class_bonus,
            start_value: this.start_value
        };
    }
}

export class Attribute extends Trait {
    short_name: string = ""
    constructor(name: string, short_name: string, start_value: number) {
        super(name);
        this.short_name = short_name;
        if (start_value != null) {
            this.start_value = start_value;
        }
    }

    as_json(): any {
        let o = super.as_json()
        return Object.assign(o, {
            short_name: this.short_name
        });
    }

    static from_json(x): Attribute {
        let attr = new Attribute('', '', 0);
        attr.name = x.name;
        attr.short_name = x.short_name;
        attr.upgraded_value = x.upgraded_value;
        attr.racial_bonus = x.racial_bonus;
        attr.class_bonus = x.class_bonus;
        attr.start_value = x.start_value;
        return attr;
    }
}

export class Skill extends Trait {
    category = "";
    get value(): number {
        return Math.min(this.upgraded_value, this.cap);
    }

    get cap(): number {
        return 100 + this.racial_bonus + this.class_bonus;
    }

    constructor(name: string, category: string) {
        super(name);
        this.upgraded_value = 0;
    }

    as_json() {
        return Object.assign(super.as_json(), {
            category: this.category
        })
    }

    static from_json(x): Skill {
        let skill = new Skill('', '');
        skill.name = x.name;
        skill.upgraded_value = x.upgraded_value;
        skill.racial_bonus = x.racial_bonus;
        skill.class_bonus = x.class_bonus;
        skill.start_value = x.start_value;
        skill.category = x.category;
        return skill;
    }
}