import Utils from "./Utils";

class Interval {
    min: number;
    max: number;

    static readonly _universe = new Interval(-Utils.INFINITY, Utils.INFINITY);
    static readonly _empty = new Interval(Utils.INFINITY, -Utils.INFINITY);

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    static get UNIVERSE(): Interval {
        return this._universe;
    }

    static get EMPTY(): Interval {
        return this._empty;
    }

    size(): number {
        return this.max - this.min;
    }

    contains(x: number): boolean {
        return x >= this.min && x <= this.max;
    }

    surrounds(x: number): boolean {
        return x > this.min && x < this.max;
    }

    clamp(x: number): number {
        if (x < this.min) return this.min;
        if (x > this.max) return this.max;
        return x;
    }
}

export default Interval;
