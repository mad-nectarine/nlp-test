import ESClientFactory from "../util/ESClientFactory";
export declare namespace Data {
    class Config {
        private _esSchema;
        private _esParam;
        constructor(esParam: ESClientFactory.IElasticSearchClientParam, indexName?: string);
        Save(data: IConfig): Promise<ISaveResult>;
        Delete(key: string): Promise<IDeleteResult>;
        Get(key: string): Promise<IGetResult>;
        All(size?: number): Promise<IAllResult>;
    }
    interface IConfig {
        key: string;
        value: string;
    }
    interface ISaveResult {
        Param: IConfig;
        Error?: Error;
    }
    interface IDeleteResult {
        Param: {
            key: string;
        };
        Error?: Error;
    }
    interface IAllResult {
        Param: {
            size?: number;
        };
        Data?: Array<IConfig>;
        TotalCount?: number;
        Error?: Error;
    }
    interface IGetResult {
        Param: {
            key: string;
        };
        Data?: IConfig;
        Error?: Error;
    }
}
export default Data;
