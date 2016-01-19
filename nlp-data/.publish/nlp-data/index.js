var Config_1 = require('./src/data/Config');
var Tweets_1 = require('./src/data/Tweets');
var ESClientFactory_1 = require('./src/util/ESClientFactory');
var nlp_data;
(function (nlp_data) {
    nlp_data.Config = Config_1.default;
    nlp_data.Tweets = Tweets_1.default;
    nlp_data.ESClientFactory = ESClientFactory_1.default;
})(nlp_data || (nlp_data = {}));
exports.default = nlp_data;
