import {ProcessStatus} from "../enums/ProcessStatus";
import {HTTP_METHOD, RequestInfo} from "../requestinfo"
import { Optional } from "typescript-optional"

export class AsyncProcessService extends ProcessStatus {

    async asyncProcessing<_ResTp, _InpTp>( requestInfo : RequestInfo, inputData : _InpTp = undefined) : Promise<Optional<_ResTp>> {
        try {
            // processing이 진행중이면 false를 리턴한다.
            if(this.isPending())
                return Optional.empty();

            this.setPending()
            // logic start

            const response = await fetch(requestInfo.uri, this.setFetchOption(requestInfo, inputData) )
            const result : _ResTp = await response.json()
            // logic end

            this.setSuccess()
            return Optional.of(result)
        } catch (e) {
            this.setFailure()
            return Optional.empty();
        }
    }
    asyncInputProcessing<_InpTp, _ResTp>( requestInfo : RequestInfo, inputData : _InpTp = undefined) : Promise<_ResTp> {
        return this.asyncProcessing(requestInfo, inputData)
    }

    asyncOutputProcessing<_InpTp, _ResTp>( requestInfo : RequestInfo, inputData : _InpTp = undefined, callback : (_ResTp) => void = () => {}) : Promise<_ResTp> {
        return this.asyncProcessing(requestInfo, undefined)
    }

    private setFetchOption<_InpTp>( requestInfo : RequestInfo, inputData : _InpTp) : RequestInit {
        if( requestInfo.method == HTTP_METHOD.GET || inputData == undefined )
            return { method : requestInfo.method }
        else
            return { method : requestInfo.method, body : JSON.stringify(inputData) }
    }

}