import _Config from './src/data/Config';
import _Tweets from './src/data/Tweets';
import _ESClientFactory from './src/util/ESClientFactory';
declare namespace nlp_data {
    const Config: typeof _Config;
    const Tweets: typeof _Tweets;
    const ESClientFactory: typeof _ESClientFactory;
    namespace Models {
        interface IConfig extends _Config.IConfig {
        }
        interface ITweet extends _Tweets.ITweet {
        }
        interface IElasticSearchClientParam extends _ESClientFactory.IElasticSearchClientParam {
        }
    }
}
export default nlp_data;
