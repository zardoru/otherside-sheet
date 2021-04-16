export class Trait {
    name = ""
    upgraded_value = 1
    racial_bonus = 0

    get value(): number { // final value
        return this.upgraded_value + this.racial_bonus;
    }

    set value(v) {
        this.upgraded_value = v;
    }

    constructor(name: string) {
        this.name = name;
    }
}

export class Attribute extends Trait {
    short_name: string = ""
    constructor(name: string, short_name: string) {
        super(name);
        this.short_name = short_name;
    }
}

export class Skill extends Trait {
    racial_modifier = 0

    get value(): number {
        return Math.min(this.upgraded_value + this.racial_bonus, this.cap);
    }

    get cap(): number {
        return 100 + this.racial_modifier
    }

    constructor(name: string) {
        super(name);
    }
}