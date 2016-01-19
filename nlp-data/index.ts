import _Config from './src/data/Config'
import _Tweets from './src/data/Tweets'
import _ESClientFactory from './src/util/ESClientFactory'

namespace nlp_data {
    export const Config = _Config
    export const Tweets = _Tweets
    export const ESClientFactory = _ESClientFactory

    export namespace Models {
        export interface IConfig extends _Config.IConfig { }
        export interface ITweet extends _Tweets.ITweet { }
        export interface IElasticSearchClientParam extends _ESClientFactory.IElasticSearchClientParam { }
    }
}

export default nlp_data