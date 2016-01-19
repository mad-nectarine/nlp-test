var elasticsearch = require('elasticsearch')

export namespace ESClientFactory {
    export interface IElasticSearchClientParam {
        Host: string;
        Port: number;
        Auth?: {
            name: string;
            password: string;
        };
    }
    export function Create(param: IElasticSearchClientParam){
        return new elasticsearch.Client({
            hosts: [{
                host: param.Host,
                port: param.Port,
                auth: param.Auth ? (param.Auth.name + ":" + param.Auth.password) : null
            }],
            log: ['error', 'warning']
        });
    }
}

export default ESClientFactory;