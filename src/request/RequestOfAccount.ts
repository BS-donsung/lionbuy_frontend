import {NameTag} from "../dto/ProductDTO";
import {URI_OF_CRAWLING_REQUEST_BY_TAG} from "../requestinfo/CrawlingRequestInfo";

export async function crawlingByName() : Promise<Array<NameTag>> {
    return (await fetch(URI_OF_CRAWLING_REQUEST_BY_TAG.uri,
        {method: URI_OF_CRAWLING_REQUEST_BY_TAG.method}
    )).json()
}
