import ESClientFactory from "../util/ESClientFactory";
export declare namespace Data {
    class Tweets {
        private _esSchema;
        private _esParam;
        constructor(esParam: ESClientFactory.IElasticSearchClientParam, indexName?: string);
        BulkSave(tweets: Array<ITweet>): Promise<IBulkSaveResult>;
        private _createSaveData(data);
        Count(text?: string): Promise<ICountResult>;
        InformationOfCreateAt(): Promise<IInfoOfCreateAtResult>;
        InformationOfId(): Promise<IInfoOfIdResult>;
        Search(text: string, size?: number): Promise<ISearchResult>;
    }
    interface ITweet {
        id: number;
        text: string;
        create_at: number;
        retweet_count: number;
        favorite_count: number;
        user_name: string;
        user_id: number;
        user_screen_name: string;
    }
    interface IBulkSaveResult {
        Param: Array<ITweet>;
        Error?: Error;
    }
    interface ISearchResult {
        Param: {
            text: string;
            size?: number;
        };
        Data?: Array<ITweet & {
            _score: number;
        }>;
        TotalCount?: number;
        Error?: Error;
    }
    interface ICountResult {
        Param: {
            text?: string;
        };
        Data?: number;
        Error?: Error;
    }
    interface IInfoOfCreateAtResult {
        Data?: {
            max_create_at: number;
            min_create_at: number;
        };
        Error?: Error;
    }
    interface IInfoOfIdResult {
        Data?: {
            max_id: number;
            min_id: number;
        };
        Error?: Error;
    }
}
export default Data;
