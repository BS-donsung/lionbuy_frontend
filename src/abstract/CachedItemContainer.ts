import {AsyncProcessService} from "./AsyncProcessService";
import {RequestInfo} from "../requestinfo";
import {DistinctSet} from "../util/DistinctSet";

export class CachedItemContainer<_Tp> extends AsyncProcessService {

    private defaultData : _Tp
    private data : _Tp
    constructor(defaultData : _Tp) {
        super();
        this.defaultData = defaultData;
        this.data = defaultData;
    }

    getData() : _Tp {
        return this.data
    }

    setData( data : _Tp ) : void {
        this.data = data
    }

    async updateCache( requestInfo : RequestInfo ) : Promise<boolean> {
        try {
            const optionalResult = await this.asyncProcessing<_Tp, unknown>(requestInfo)
            if(optionalResult.isEmpty())
                return false;
            this.data = optionalResult.get()
            return true;
        } catch {
            return false
        }
    }

    async change( requestInfo: RequestInfo, data : _Tp ) : Promise<boolean> {
        try {
            const optionalResult = await this.asyncProcessing(requestInfo, data)
            if(optionalResult.isEmpty())
                return false;
            this.data = data
            return true;
        } catch {
            return false;
        }
    }
    async update( requestInfo : RequestInfo, data : _Tp ) : Promise<boolean> {
        try {
            const optionalResult = await this.asyncProcessing(requestInfo, data)
            if(optionalResult.isEmpty()) {
                return false
            }
            this.data = data
            return true
        } catch {
            return false
        }
    }
    async clear( requestInfo : RequestInfo) : Promise<boolean> {
        try {
            const optionalResult = await this.asyncProcessing(requestInfo)
            if(optionalResult.isEmpty()) {
                return false
            }
            this.data = this.defaultData
            return true
        } catch {
            return false
        }
    }

    forcingClear() {
        this.data = this.defaultData
    }
}