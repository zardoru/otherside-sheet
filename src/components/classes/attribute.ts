export class Trait {
    name = ""
    upgraded_value = 0
    racial_bonus = 0
    class_bonus = 0

    get value(): number { // final value
        return 100 + this.upgraded_value + this.racial_bonus + this.class_bonus;
    }

    set value(v) {
        this.upgraded_value = v - 100;
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
    get value(): number {
        return Math.min(this.upgraded_value, this.cap);
    }

    get cap(): number {
        return 100 + this.racial_bonus + this.class_bonus
    }

    constructor(name: string) {
        super(name);
        this.upgraded_value = 0;
    }
}