import {AsyncProcessService} from "./AsyncProcessService";
import {RequestInfo} from "../requestinfo";

export class CachedListContainer<_Tp, _DataUniquenessCriteriaFunc extends ( _Tp ) => any> extends AsyncProcessService {

    private checkDistinct : _DataUniquenessCriteriaFunc;
    private cache : DistinctSet<_Tp, any>
    constructor( func : _DataUniquenessCriteriaFunc) {
        super();
        this.checkDistinct = func
        this.cache = new DistinctSet<_Tp, any>(this.checkDistinct);
    }

    // async function getItemList() : Promise<boolean> {
    //     return await true;
    // }
    getDataList() : _Tp[] {
        return this.cache.container
    }

    async updateCache( requestInfo : RequestInfo ) : Promise<boolean> {
        try {
            const optionalResult = await this.asyncProcessing<_Tp[]>(requestInfo)
            if(optionalResult.isEmpty())
                return false;
            const result = optionalResult.get()
            this.cache.add(result)
        } catch {
            return false
        }
    }

    async add( requestInfo: RequestInfo, data : _Tp ) : Promise<boolean> {
        try {
            await this.asyncInputProcessing(requestInfo, data)
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