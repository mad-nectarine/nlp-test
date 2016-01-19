var ESClientFactory_1 = require("../util/ESClientFactory");
var Data;
(function (Data) {
    class Config {
        constructor(esParam, indexName) {
            this._esSchema = {
                index: "twdata",
                type: "config"
            };
            this._esParam = esParam;
            if (indexName) {
                this._esSchema.index = indexName;
            }
        }
        Save(data) {
            const _data = Object.assign({}, data);
            const client = ESClientFactory_1.default.Create(this._esParam);
            const param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                id: _data.key,
                body: _data
            };
            return new Promise((resolve, reject) => {
                client.index(param, (error, resp) => {
                    let result = {
                        Param: _data,
                        Error: null
                    };
                    if (error) {
                        result.Error = error;
                        reject(result);
                        return;
                    }
                    resolve(result);
                });
            });
        }
        Delete(key) {
            const client = ESClientFactory_1.default.Create(this._esParam);
            const param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                id: key
            };
            return new Promise((resolve, reject) => {
                client.delete(param, (error, resp) => {
                    let result = {
                        Param: { key: key },
                        Error: null
                    };
                    if (error) {
                        result.Error = error;
                        reject(result);
                        return;
                    }
                    resolve(result);
                });
            });
        }
        Get(key) {
            const client = ESClientFactory_1.default.Create(this._esParam);
            const param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                id: key
            };
            return new Promise((resolve, reject) => {
                client.get(param).then((resp) => {
                    let result = {
                        Param: { key: key },
                        Data: resp._source
                    };
                    resolve(result);
                }, (error) => {
                    let result = {
                        Param: { key: key },
                        Data: null,
                        Error: null
                    };
                    if (error.status == 404) {
                        resolve(result);
                    }
                    else {
                        result.Error = error;
                        reject(result);
                    }
                });
            });
        }
        All(size) {
            size = size == null || size < 1 ? 100 : size;
            const client = ESClientFactory_1.default.Create(this._esParam);
            const param = {
                index: this._esSchema.index,
                type: this._esSchema.type,
                body: {
                    size: size
                }
            };
            return new Promise((resolve, reject) => {
                client.search(param).then((resp) => {
                    const result = {
                        Param: { size },
                        Data: resp.hits.hits.map((x) => {
                            let item = {};
                            item = Object.assign(item, x._source);
                            item = Object.assign(item, x);
                            delete item["_source"];
                            return item;
                        }),
                        TotalCount: resp.hits.total,
                        Error: undefined
                    };
                    resolve(result);
                }, (error) => {
                    const result = {
                        Param: { size },
                        Data: null,
                        Error: error
                    };
                    reject(result);
                });
            });
        }
    }
    Data.Config = Config;
})(Data = exports.Data || (exports.Data = {}));
exports.default = Data;
