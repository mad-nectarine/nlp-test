'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var MessageArea_1 = require('./MessageArea');

var EsConf = function (_React$Component) {
    _inherits(EsConf, _React$Component);

    function EsConf() {
        _classCallCheck(this, EsConf);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(EsConf).apply(this, arguments));
    }

    _createClass(EsConf, [{
        key: '_getInput',
        value: function _getInput() {
            return {
                key: this.refs["inputKey"].value,
                value: this.refs["inputValue"].value
            };
        }
    }, {
        key: '_handleSave',
        value: function _handleSave(event) {
            this.props.save(this._getInput());
        }
    }, {
        key: '_handleChangeInputValue',
        value: function _handleChangeInputValue(event) {
            this.props.changeInput(this._getInput());
        }
    }, {
        key: '_handleReload',
        value: function _handleReload(event) {
            this.props.loadItems();
        }
    }, {
        key: '_handleItemSelect',
        value: function _handleItemSelect(index, event) {
            var item = this.props.items[index];
            this.props.changeInput(Object.assign({}, item));
        }
    }, {
        key: '_handleDelete',
        value: function _handleDelete(index, event) {
            var item = this.props.items[index];
            if (!confirm(item.key + "を削除してもよろしいですか")) return;
            this.props.deleteItem(item.key);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.loadItems();
        }
    }, {
        key: 'render',
        value: function render() {
            //get values from props
            var message = this.props.message;

            return React.createElement("div", { "className": "esconf" }, React.createElement(MessageArea_1.MessageArea, { "message": message }), React.createElement("div", { "className": "conf-container" }, this._getItemsDom(), this._getInputDom()));
        }
    }, {
        key: '_getItemsDom',
        value: function _getItemsDom() {
            var items = this.props.items;

            var dom = null;
            var click = function (index) {
                return function (event) {
                    this._handleItemSelect(index, event);
                }.bind(this);
            }.bind(this);
            var deleteItem = function (index) {
                return function (event) {
                    this._handleDelete(index, event);
                }.bind(this);
            }.bind(this);
            if (items && items.length) {
                dom = items.map(function (item, index) {
                    return React.createElement("li", { "key": index, "ref": "item_" + index, "onClick": click(index) }, React.createElement("span", { "className": "key" }, item.key), React.createElement("span", { "className": "value" }, item.value), React.createElement("input", { "className": "delete", "type": "button", "value": "×", "onClick": deleteItem(index) }));
                });
            } else {
                dom = React.createElement("li", null, "no items");
            }
            return React.createElement("div", { "className": "items" }, React.createElement("div", { "className": "list-operations" }, React.createElement("input", { "type": "button", "value": "Reload", "onClick": this._handleReload.bind(this) })), React.createElement("ul", { "className": "list conf" }, dom));
        }
    }, {
        key: '_getInputDom',
        value: function _getInputDom() {
            var input = this.props.input;

            var inputValue = { key: "", value: "" };
            inputValue = Object.assign(inputValue, input);
            return React.createElement("div", { "className": "input-form" }, React.createElement("p", null, React.createElement("label", null, "Key"), React.createElement("input", { "type": "text", "ref": "inputKey", "value": inputValue.key, "onChange": this._handleChangeInputValue.bind(this) })), React.createElement("p", null, React.createElement("label", null, "Value"), React.createElement("input", { "type": "text", "ref": "inputValue", "value": inputValue.value, "onChange": this._handleChangeInputValue.bind(this) })), React.createElement("p", { "className": "operations" }, React.createElement("input", { "type": "button", "value": "save", "onClick": this._handleSave.bind(this) })));
        }
    }]);

    return EsConf;
}(React.Component);

exports.EsConf = EsConf;
exports.default = { EsConf: EsConf };