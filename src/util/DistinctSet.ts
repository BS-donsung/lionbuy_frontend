
class DistinctSet<_Tp> implements Set<_Tp>{

    container : Array<_Tp>
    filtering : (_Tp) => boolean

    constructor( filtering : (_Tp) => boolean, container : Array<_Tp> = Array<_Tp>() ) {
        this.filtering = filtering
        this.container = container
    }

    readonly [Symbol.toStringTag]: string;
    readonly size: number;

    [Symbol.iterator](): IterableIterator<_Tp> {
        return this.container[Symbol.iterator]();
    }

    add(value: _Tp): this {
        if( !this.container.find( item => this.filtering(item) ) ) {
            this.container.push(value)
        }
        return this;
    }

    clear(): void {
        this.container = new Array<_Tp>()
    }

    delete(value: _Tp): boolean {
        const idx = this.container.findIndex( item => this.filtering(item) )
        if(idx >= 0) {
            this.container.splice(idx, 1)
            return true;
        }
        return false;
    }
    entries(): IterableIterator<[_Tp, _Tp]> {
        return this.container.entries();
    }

    forEach(callbackfn: (value: _Tp, value2: _Tp, set: Set<_Tp>) => void, thisArg?: any): void {
        this.container.forEach( (data, index, set) => callbackfn(data, index, new Set(this.container)) )
    }

    has(value: _Tp): boolean {
        return this.container.has(value);
    }

    keys(): IterableIterator<_Tp> {
        return this.container.keys();
    }

    values(): IterableIterator<_Tp> {
        return this.container.values();
    }


}