import {Optional} from "typescript-optional";

export class DistinctSet<_Tp, _CheckTp> implements Iterable<_Tp>{

    container : Array<_Tp>
    mapping : ( arg : _Tp) => _CheckTp

    get size() : number { return this.container.length }
    get length() : number { return this.container.length }

    constructor( mapping : ( original : _Tp) => _CheckTp, container : Array<_Tp> = [] ) {
        this.mapping = mapping
        this.container = container
    }

    [Symbol.iterator](): Iterator<_Tp> {
        return this.container[Symbol.iterator]();
    }

    get( basis : _CheckTp) : Optional<_Tp> {
        if(this.container && this.container.length > 0){
            const result = this.container.find( item => this.isSameByStandard(item, basis))
            if(result != undefined)
                return Optional.of(result)
        }
        return Optional.empty();
    }

    add(value: _Tp): this {
        if( this.container && !this.has(value) ) {
            this.container.push(value)
        }
        return this;
    }

    clear(): void {
        this.container = new Array<_Tp>()
    }

    update(value: _Tp) : this {
        if(this.delete(this.mapping(value))) {
            this.container.push(value)
        }
        return this;
    }


    delete(base: _CheckTp): boolean {
        const idx = this.container.findIndex( item => this.isSameByStandard(item, base) )
        if(idx >= 0) {
            this.container.splice(idx, 1)
            return true;
        }
        return false;
    }
    //
    // delete(value: _Tp): boolean {
    //     const idx = this.container.findIndex( item => this.isSame(item, value) )
    //     if(idx >= 0) {
    //         this.container.splice(idx, 1)
    //         return true;
    //     }
    //     return false;
    // }

    has(value: _Tp): boolean {
        if(this.container && this.container.length > 0){
            if(this.container.find( item => this.isSame(item, value) )) {
                return true;
            }
        }
        return false;
    }

    hasStandard( standard : _CheckTp ) : boolean {
        if(this.container && this.container.length > 0){
            if(this.container.find( item => this.isSameByStandard(item, standard) )) {
                return true;
            }
        }
        return false;
    }

    private isSame(lhs : _Tp, rhs : _Tp): boolean {
        return JSON.stringify(this.mapping(lhs)) == JSON.stringify(this.mapping(rhs))
    }

    private isSameByStandard(item : _Tp, base : _CheckTp) {
        return JSON.stringify(this.mapping(item)) == JSON.stringify(base)
    }


}