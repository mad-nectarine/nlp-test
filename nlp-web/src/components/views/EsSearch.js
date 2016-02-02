'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var MessageArea_1 = require('./MessageArea');

var EsSearch = function (_React$Component) {
    _inherits(EsSearch, _React$Component);

    function EsSearch() {
        _classCallCheck(this, EsSearch);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(EsSearch).apply(this, arguments));
    }

    _createClass(EsSearch, [{
        key: '_getSearchText',
        value: function _getSearchText() {
            return this.refs["searchtext"].value;
        }
    }, {
        key: '_handleSearch',
        value: function _handleSearch(event) {
            this.props.search(this._getSearchText());
        }
    }, {
        key: '_handleChangeInputValue',
        value: function _handleChangeInputValue(event) {
            this.props.changeInput({
                searchText: this._getSearchText()
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            //get values from props
            var _props = this.props;
            var items = _props.items;
            var message = _props.message;
            var input = _props.input;

            var itemsDom = null;
            if (items && items.length) {
                itemsDom = items.map(function (item, index) {
                    return React.createElement("li", { "key": index }, React.createElement("span", { "className": "score" }, item["_score"]), React.createElement("span", { "className": "text" }, item.text), React.createElement("div", { "className": "user" }, React.createElement("span", { "className": "un" }, item.user_name), React.createElement("span", { "className": "usn" }, "@" + item.user_screen_name), React.createElement("span", { "className": "uid" }, "-" + item.user_id + "-")), React.createElement("div", { "className": "time" }, React.createElement("span", null, _this2._getDateText(item.create_at))), React.createElement("div", { "className": "others" }, React.createElement("span", null, "favorite " + item.favorite_count), React.createElement("span", null, "/ retweet " + item.retweet_count), React.createElement("span", null, "/ id  " + item.id)));
                });
            } else {
                itemsDom = React.createElement("li", null, "no items");
            }
            var searchText = input && input.searchText ? input.searchText : "";
            return React.createElement("div", { "className": "essearch" }, React.createElement(MessageArea_1.MessageArea, { "message": message }), React.createElement("div", { "className": "search-container" }, React.createElement("div", { "className": "condition" }, React.createElement("input", { "type": "text", "ref": "searchtext", "placeholder": "検索ワードを入力してください", "value": searchText, "onChange": this._handleChangeInputValue.bind(this) }), React.createElement("input", { "type": "button", "value": "search", "onClick": this._handleSearch.bind(this) })), React.createElement("ul", { "className": "list tweets unselectable" }, itemsDom)));
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

    return EsSearch;
}(React.Component);

exports.EsSearch = EsSearch;
exports.default = { EsSearch: EsSearch };