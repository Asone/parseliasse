
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

export interface AmdtDerouleurRequestParams{
    legislature?: number;
    organeAbrv?: string;
    bibard?: number;
    bibardSuffixe?: string | null;
    startPosition?: number;
    endPosition?: number;
    start?: number;
    limit?: number;
    page?: number;
}

export interface AmendementRequestParams{
    legislature?: number;
    organeAbrv?: string;
    bibard?: number;
    bibardSuffixe?: string | null;
    numAmdt?: number | Array<number>;
    start?: number;
    limit?: number;
    page?: number;
}

export interface DiscussionRequestParams{
    legislature?: number;
    organeAbrv?: string;
    bibard?: number;
    bibardSuffixe?: string | null;
    numAmdt?: number | Array<number>;
    start?: number;
    limit?: number;
    page?: number;
}
