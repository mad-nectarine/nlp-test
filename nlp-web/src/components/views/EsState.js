'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var MessageArea_1 = require('./MessageArea');

var EsState = function (_React$Component) {
    _inherits(EsState, _React$Component);

    function EsState() {
        _classCallCheck(this, EsState);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(EsState).apply(this, arguments));
    }

    _createClass(EsState, [{
        key: '_handleCount',
        value: function _handleCount(event) {
            this.props.loadCount();
        }
    }, {
        key: '_handleInfoCreateAt',
        value: function _handleInfoCreateAt(event) {
            this.props.loadInfoCreateAt();
        }
    }, {
        key: '_handleInfoId',
        value: function _handleInfoId(event) {
            this.props.loadInfoId();
        }
    }, {
        key: '_handleChangeInputValue',
        value: function _handleChangeInputValue(event) {
            this.props.changeInput({});
        }
    }, {
        key: 'render',
        value: function render() {
            //get values from props
            var _props = this.props;
            var message = _props.message;
            var input = _props.input;

            var inputValue = {};
            inputValue = Object.assign(inputValue, input);
            return React.createElement("div", { "className": "essearch" }, React.createElement(MessageArea_1.MessageArea, { "message": message }), React.createElement("ul", { "className": "list unselectable state" }, this._createCount(), this._createInfoId(), this._createInfoCreateAt()));
        }
    }, {
        key: '_createCount',
        value: function _createCount() {
            var count = this.props.count;

            return React.createElement("li", null, React.createElement("h3", null, "Count"), React.createElement("input", { "type": "button", "value": "Get", "onClick": this._handleCount.bind(this) }), React.createElement("p", null, count == null ? "" : count));
        }
    }, {
        key: '_createInfoCreateAt',
        value: function _createInfoCreateAt() {
            var createAtInfo = this.props.createAtInfo;

            var result = "";
            if (createAtInfo) {
                var max = this._getDateText(createAtInfo.max_create_at);
                var min = this._getDateText(createAtInfo.min_create_at);
                result = "Min:" + min + " / Max:" + max;
            }
            return React.createElement("li", null, React.createElement("h3", null, "CrateAt"), React.createElement("input", { "type": "button", "value": "Get", "onClick": this._handleInfoCreateAt.bind(this) }), React.createElement("p", null, result));
        }
    }, {
        key: '_createInfoId',
        value: function _createInfoId() {
            var idInfo = this.props.idInfo;

            var result = "";
            if (idInfo) {
                result = "Min:" + idInfo.min_id + " / Max:" + idInfo.max_id;
            }
            return React.createElement("li", null, React.createElement("h3", null, "ID"), React.createElement("input", { "type": "button", "value": "Get", "onClick": this._handleInfoId.bind(this) }), React.createElement("p", null, result));
        }
    }, {
        key: '_getDateText',
        value: function _getDateText(time) {
            var d = new Date("1970-01-01");
            d.setTime(time);
            var year = d.getFullYear().toString();
            var month = (d.getMonth() + 1).toString();
            var date = d.getDate().toString();
            var hours = d.getHours().toString();
            var minutes = d.getMinutes().toString();
            month = month.length == 1 ? "0" + month : month;
            date = date.length == 1 ? "0" + date : date;
            hours = hours.length == 1 ? "0" + hours : hours;
            minutes = minutes.length == 1 ? "0" + minutes : minutes;
            return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
        }
    }]);

    return EsState;
}(React.Component);

exports.EsState = EsState;
exports.default = { EsState: EsState };