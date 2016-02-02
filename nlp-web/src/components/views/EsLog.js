"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var EsLog = function (_React$Component) {
    _inherits(EsLog, _React$Component);

    function EsLog() {
        _classCallCheck(this, EsLog);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(EsLog).apply(this, arguments));
    }

    _createClass(EsLog, [{
        key: "_handleReload",
        value: function _handleReload(event) {
            this.props.load();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.props.load();
        }
    }, {
        key: "render",
        value: function render() {
            //get values from props
            var log = this.props.log;

            return React.createElement("div", { "className": "eslog" }, React.createElement("div", { "className": "log-container" }, React.createElement("h3", null, log == null ? "" : log.fileName == null ? "" : log.fileName), React.createElement("div", { "className": "list-operations" }, React.createElement("input", { "type": "button", "value": "Reload", "onClick": this._handleReload.bind(this) })), this._getItemsDom()));
        }
    }, {
        key: "_getItemsDom",
        value: function _getItemsDom() {
            var log = this.props.log;

            var dom = null;
            if (log && log.data && log.data.length) {
                dom = log.data.map(function (item, index) {
                    return React.createElement("li", { "key": index }, item);
                });
            } else {
                dom = React.createElement("li", null, "no items");
            }
            return React.createElement("ul", { "className": "list unSelectable" }, dom);
        }
    }]);

    return EsLog;
}(React.Component);

exports.EsLog = EsLog;
exports.default = { EsLog: EsLog };