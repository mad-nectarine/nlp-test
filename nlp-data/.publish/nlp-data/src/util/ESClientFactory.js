var elasticsearch = require('elasticsearch');
var ESClientFactory;
(function (ESClientFactory) {
    function Create(param) {
        return new elasticsearch.Client({
            hosts: [{
                    host: param.Host,
                    port: param.Port,
                    auth: param.Auth ? (param.Auth.name + ":" + param.Auth.password) : null
                }],
            log: ['error', 'warning']
        });
    }
    ESClientFactory.Create = Create;
})(ESClientFactory = exports.ESClientFactory || (exports.ESClientFactory = {}));
exports.default = ESClientFactory;
