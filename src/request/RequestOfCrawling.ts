import {NamePrice, NameTag} from "../dto/ProductDTO";
import {URI_OF_CRAWLING_REQUEST_BY_TAG, URI_OF_CRAWLING_REQUEST_BY_URL} from "../requestinfo/CrawlingRequestInfo";

export async function crwalingByURL() : Promise<NamePrice> {
    return (await fetch(URI_OF_CRAWLING_REQUEST_BY_URL.uri,
        {method: URI_OF_CRAWLING_REQUEST_BY_URL.method}
    )).json()
}

export async function crawlingByName() : Promise<Array<NameTag>> {
    return (await fetch(URI_OF_CRAWLING_REQUEST_BY_TAG.uri,
        {method: URI_OF_CRAWLING_REQUEST_BY_TAG.method}
    )).json()
}

export async function crawlingBy() {

}