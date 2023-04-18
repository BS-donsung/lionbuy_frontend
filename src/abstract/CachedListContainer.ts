import {AsyncProcessService} from "./AsyncProcessService";
import {RequestInfo} from "../requestinfo";
import {DistinctSet} from "../util/DistinctSet";

export class CachedListContainer<_Tp, _CheckTp, _DataUniquenessCriteriaFunc extends ( item : _Tp ) => _CheckTp> extends AsyncProcessService {

    private checkDistinct : _DataUniquenessCriteriaFunc;
    private cache : DistinctSet<_Tp, any>
    constructor( func : _DataUniquenessCriteriaFunc) {
        super();
        this.checkDistinct = func
        this.cache = new DistinctSet<_Tp, any>(this.checkDistinct);
    }

    getDataList() : Array<_Tp> {
        return this.cache.container
    }

    async updateCache( requestInfo : RequestInfo ) : Promise<boolean> {
        try {
            const optionalResult = await this.asyncProcessing<Array<_Tp>, unknown>(requestInfo)
            if(optionalResult.isEmpty())
                return false;
            const result = optionalResult.get()
            for( const item of result)
                this.cache.add(item)
            return true;
        } catch {
            return false
        }
    }

    async add( requestInfo: RequestInfo, data : _Tp ) : Promise<boolean> {
        try {
            await this.asyncProcessing(requestInfo, data)
            this.cache.add(data)
            return true;
        } catch {
            return false;
        }
    }
    async update( requestInfo : RequestInfo, data : _Tp ) : Promise<boolean> {
        try {
            await this.asyncProcessing(requestInfo, data)
            this.cache.update(data)
            return true
        } catch {
            return false
        }
    }
    async delete( requestInfo : RequestInfo, data : _Tp ) : Promise<boolean> {
        try {
            await this.asyncProcessing(requestInfo, data)
            this.cache.delete(data)
            return true
        } catch {
            return false
        }
    }
}