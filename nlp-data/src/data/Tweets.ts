import ESClientFactory from "../util/ESClientFactory"

export namespace Data {
    export class Tweets {

        private _esSchema = {
            index: "twdata",
            type: "tweets"
        }

        private _esParam: ESClientFactory.IElasticSearchClientParam

        constructor(esParam: ESClientFactory.IElasticSearchClientParam, indexName?: string) {
            this._esParam = esParam
            if (indexName) {
                this._esSchema.index = indexName
            }
        }

        BulkSave(tweets: Array<ITweet>) {

            let saveDatas = []
            tweets.forEach(x => {
                var d = this._createSaveData(x)
                saveDatas.push(d.operation)
                saveDatas.push(d.data)
            })

            return new Promise<IBulkSaveResult>((resolve, reject) => {

                const client = ESClientFactory.Create(this._esParam)
                const param = { body: saveDatas }
                let result = {
                    Param: saveDatas,
                    Error: null
                }

                client.bulk(param, (error, resp) => {
                    if (error) {
                        result.Error = error
                        reject(result)
                    } else {
                        resolve(result)
                    }
                })
            })
        }

        private _createSaveData(data: ITweet) {
            return {
                operation: {
                    index: {
                        _index: this._esSchema.index,
                        _type: this._esSchema.type,
                        _id: data.id
                    }
                },
                data: data
            }
        }

        Count(text?: string) {
            const param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                body: {}
            }

            if (text) {
                param.body = {
                    query: {
                        simple_query_string: {
                            query: text,
                            fields: ["text"],
                            default_operator: "and"
                        }
                    }
                }
            }

            return new Promise<ICountResult>((resolve, reject) => {
                const client = ESClientFactory.Create(this._esParam)
                client.count(param).then((resp) => {
                    const result = {
                        Param: { text: text },
                        Data: resp.count,
                        Error: undefined
                    }
                    resolve(result)
                }, error => {
                    const result = {
                        Param: { text: text },
                        Data: null,
                        Error: error
                    }
                    reject(result)
                })
            })
        }
        InformationOfCreateAt() {
            const param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                body: {
                    size: 0,
                    aggs: {
                        max_create_at: {
                            max: { field: "create_at" }
                        },
                        min_create_at: {
                            min: { field: "create_at" }
                        }
                    }
                }
            }
            return new Promise<IInfoOfCreateAtResult>(function(resolve, reject) {
                const client = ESClientFactory.Create(this._esParam)
                client.search(param).then((resp) => {
                    const result = {
                        Data: {
                            max_create_at: resp.aggregations.max_create_at.value,
                            min_create_at: resp.aggregations.min_create_at.value
                        },
                        Error: undefined
                    }
                    resolve(result)
                }, error => {
                    const result = {
                        Data: null,
                        Error: error
                    }
                    reject(result)
                })
            })


        }
        InformationOfId() {
            var param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                body: {
                    size: 0,
                    aggs: {
                        max_id: {
                            max: { field: "id" }
                        },
                        min_id: {
                            min: { field: "id" }
                        }
                    }
                }
            }
            return new Promise<IInfoOfIdResult>((resolve, reject) => {
                const client = ESClientFactory.Create(this._esParam)
                client.search(param).then((resp) => {
                    const result = {
                        Data: {
                            max_id: resp.aggregations.max_id.value,
                            min_id: resp.aggregations.min_id.value
                        },
                        Error: undefined
                    }
                    resolve(result)
                }, (error) => {
                    const result = {
                        Data: null,
                        Error: error
                    }
                    reject(result)
                })
            })
        }
        Search(text: string, size?: number) {
            const param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                body: {
                    size: size,
                    query: {
                        function_score: {
                            score_mode: "sum",
                            boost_mode: "multiply",
                            query: {
                                simple_query_string: {
                                    query: text,
                                    fields: ["text"],
                                    default_operator: "and"
                                }
                            },
                            functions: [{
                                filter: {
                                    query: {
                                        simple_query_string: {
                                            query: text,
                                            fields: ["text.kuromoji"],
                                            default_operator: "and"
                                        }
                                    }
                                },
                                weight: 10
                            }, {
                                    filter: {
                                        query: {
                                            simple_query_string: {
                                                query: text,
                                                fields: ["text.kuromoji"],
                                                default_operator: "or"
                                            }
                                        }
                                    },
                                    weight: 3
                                }, {
                                    filter: {
                                        query: {
                                            simple_query_string: {
                                                query: text,
                                                fields: ["text.ngram"],
                                                default_operator: "and"
                                            }
                                        }
                                    },
                                    weight: 1
                                }]
                        }
                    }
                }
            }
            return new Promise<ISearchResult>(function(resolve, reject) {
                const client = ESClientFactory.Create(this._esParam)
                client.search(param).then((resp) => {
                    const result = {
                        Param: { text, size },
                        Data: resp.hits.hits.map(x => {
                            var item = {}
                            item = Object.assign(item, x._source)
                            item = Object.assign(item, x)
                            delete item["_source"]
                            return item
                        }),
                        TotalCount: resp.hits.total,
                        Error: undefined
                    }
                    resolve(result)
                }, error => {
                    var result = {
                        Param: { text: text },
                        Data: null,
                        Error: error
                    }
                    reject(result)
                })
            })
        }
    }
    export interface ITweet {
        id: number
        text: string
        create_at: number
        retweet_count: number
        favorite_count: number
        user_name: string
        user_id: number
        user_screen_name: string
    }
    export interface IBulkSaveResult {
        Param: Array<ITweet>
        Error?: Error
    }
    export interface ISearchResult {
        Param: {
            text: string
            size?: number
        }
        Data?: Array<ITweet & { _score: number }>
        TotalCount?: number
        Error?: Error
    }
    export interface ICountResult {
        Param: {
            text?: string
        }
        Data?: number
        Error?: Error
    }
    export interface IInfoOfCreateAtResult {
        Data?: {
            max_create_at: number
            min_create_at: number
        }
        Error?: Error
    }
    export interface IInfoOfIdResult {
        Data?: {
            max_id: number
            min_id: number
        }
        Error?: Error
    }
}
export default Data