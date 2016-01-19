import ESClientFactory from "../util/ESClientFactory"

export namespace Data {
    export class Config {
        
        private _esSchema = {
            index: "twdata",
            type: "config"
        }

        private _esParam: ESClientFactory.IElasticSearchClientParam

        constructor(esParam: ESClientFactory.IElasticSearchClientParam, indexName?: string) {
            this._esParam = esParam
            if (indexName) {
                this._esSchema.index = indexName
            }
        }

        Save(data: IConfig) {
            const _data = Object.assign({}, data)
            const client = ESClientFactory.Create(this._esParam)
            const param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                id: _data.key,
                body: _data
            }
            return new Promise<ISaveResult>((resolve, reject) => {
                client.index(param, (error, resp) => {
                    let result = {
                        Param: _data,
                        Error: null
                    }
                    if (error) {
                        result.Error = error
                        reject(result)
                        return;
                    }
                    resolve(result);
                })
            })
        }

        Delete(key: string) {
            const client = ESClientFactory.Create(this._esParam)
            const param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                id: key
            }
            return new Promise<IDeleteResult>((resolve, reject) => {
                client.delete(param, (error, resp) => {
                    let result = {
                        Param: { key: key },
                        Error: null
                    }
                    if (error) {
                        result.Error = error
                        reject(result)
                        return
                    }
                    resolve(result)
                })
            })
        }

        Get(key: string) {
            const client = ESClientFactory.Create(this._esParam)
            const param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                id: key
            }
            return new Promise<IGetResult>((resolve, reject) => {
                client.get(param).then((resp) => {
                    let result = {
                        Param: { key: key },
                        Data: resp._source
                    }
                    resolve(result)
                }, (error) => {
                    let result = {
                        Param: { key: key },
                        Data: null,
                        Error: null
                    }
                    if (error.status == 404) {
                        resolve(result)
                    } else {
                        result.Error = error
                        reject(result)
                    }
                })
            })
        }

        All(size?: number) {
            size = size == null || size < 1 ? 100 : size
            const client = ESClientFactory.Create(this._esParam)
            const param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                body: {
                    size: size
                }
            }
            return new Promise<IAllResult>((resolve, reject) => {
                client.search(param).then((resp) => {
                    const result = {
                        Param: { size },
                        Data: resp.hits.hits.map((x) => {
                            let item = {};
                            item = Object.assign(item, x._source);
                            item = Object.assign(item, x);
                            delete item["_source"];
                            return item
                        }),
                        TotalCount: resp.hits.total,
                        Error: undefined
                    }
                    resolve(result)

                }, (error) => {
                    const result = {
                        Param: { size },
                        Data: null,
                        Error: error
                    };
                    reject(result)
                })
            })
        }
    }
    export interface IConfig {
        key: string
        value: string
    }
    export interface ISaveResult {
        Param: IConfig
        Error?: Error
    }
    export interface IDeleteResult {
        Param: {
            key: string
        }
        Error?: Error
    }
    export interface IAllResult {
        Param: {
            size?: number
        }
        Data?: Array<IConfig>
        TotalCount?: number
        Error?: Error
    }
    export interface IGetResult {
        Param: {
            key: string
        }
        Data?: IConfig
        Error?: Error
    }
}
export default Data;