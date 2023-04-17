
class DistinctSet<_Tp, _CheckTp> implements Set<_Tp>{

    container : Array<_Tp>
    mapping : (_Tp) => _CheckTp

    constructor( mapping : (_Tp) => _CheckTp, container : Array<_Tp> = Array<_Tp>() ) {
        this.mapping = mapping
        this.container = container
    }

    readonly [Symbol.toStringTag]: string;
    readonly size: number;

    [Symbol.iterator](): IterableIterator<_Tp> {
        return this.container[Symbol.iterator]();
    }

    add(value: _Tp): this {
        if( !this.has(value) ) {
            this.container.push(value)
        }
        return this;
    }

    clear(): void {
        this.container = new Array<_Tp>()
    }

    update(value: _Tp) : this {
        if(this.delete(value)) {
            this.container.push(value)
        }
        return this;
    }

    delete(value: _Tp): boolean {
        const idx = this.container.findIndex( item => this.isSame(item, value) )
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
        if(this.container.find( item => this.isSame(item, value) ))
            return true;
        else
            return false;
    }

    keys(): IterableIterator<_Tp> {
        return this.container.keys();
    }

    values(): IterableIterator<_Tp> {
        return this.container.values();
    }


    private isSame(lhs : _Tp, rhs : _Tp) {
        return JSON.stringify(this.mapping(lhs)) == JSON.stringify(this.mapping(rhs))
    }
}