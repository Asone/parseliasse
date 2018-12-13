
export interface ParamsInterface<T>{
    cronjob?: boolean;
    url?: string;
    requestParams?: T;
}

export interface InitParamsInterface<T>{
    cronjob: boolean;
    url: string;
    requestParams: T;
}

export interface CommonEliasseInterface{
    legislature?: number;
    organeAbrv?: string;
    bibard?: number;
    bibardSuffixe?: string | null;
}

export interface AmdtDerouleurRequestParams extends CommonEliasseInterface{
    startPosition?: number;
    endPosition?: number;
    start?: number;
    limit?: number;
    page?: number;
}

export interface AmendementRequestParams extends CommonEliasseInterface{
    numAmdt?: number | Array<number>;
    start?: number;
    limit?: number;
    page?: number;
}

export interface DiscussionRequestParams extends CommonEliasseInterface{
    numAmdt?: number | Array<number>;
    start?: number;
    limit?: number;
    page?: number;
}
