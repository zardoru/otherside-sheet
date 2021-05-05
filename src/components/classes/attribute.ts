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

    get cap(): number {
        return 100 + this.racial_bonus + this.class_bonus;
    }

    constructor(name: string) {
        this.name = name;
    }

    get isPositiveBonus() {
        return this.racial_bonus + this.class_bonus > 0;
    }

    get isNegativeBonus() {
        return this.racial_bonus + this.class_bonus < 0;
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
    current_value = 0
    short_name: string = ""

    constructor(name: string, short_name: string, start_value: number) {
        super(name);
        this.short_name = short_name;
        if (start_value != null) {
            this.start_value = start_value;
        }

        this.current_value = this.start_value;
    }

    get temporal_cap():number {
        return this.start_value + this.upgraded_value;
    }

    get capped_current_value(): number {
        return Math.max(Math.min(this.current_value, this.temporal_cap), 0);
    }

    set capped_current_value(v: number) {
        this.current_value = Math.max(Math.min(v, this.temporal_cap), 0);
    }

    get value(): number { // final value
        return Math.min(this.start_value + this.upgraded_value, this.cap);
    }

    set value(v) {
        this.upgraded_value = Math.min(v - this.start_value, this.cap);
    }

    as_json(): any {
        let o = super.as_json()
        return Object.assign(o, {
            short_name: this.short_name,
            current_value: this.current_value
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
        attr.current_value = x.current_value
        return attr;
    }
}

export class Skill extends Trait {
    category = "";
    get value(): number {
        let effective = this.upgraded_value + this.class_bonus + this.racial_bonus;
        return Math.max(Math.min(effective, this.cap), 1);
    }

    constructor(name: string, category: string) {
        super(name);
        this.upgraded_value = 0;
        this.category = category;
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