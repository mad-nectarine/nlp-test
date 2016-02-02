'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// == import installed modules ==
var React = require('react');
var react_router_1 = require('react-router');

var EsAppContainer = function (_React$Component) {
    _inherits(EsAppContainer, _React$Component);

    function EsAppContainer() {
        _classCallCheck(this, EsAppContainer);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(EsAppContainer).apply(this, arguments));
    }

    _createClass(EsAppContainer, [{
        key: 'render',
        value: function render() {
            var selectedViewName = "";
            if (this.props.children && this.props.children.props.location) {
                var path = this.props.children.props.location.pathname;
                selectedViewName = path.split("/").slice(-1)[0];
            }
            return React.createElement("div", null, React.createElement("ul", { "className": "tabs", "ref": "tabs" }, this._createLinkItem("search", selectedViewName), this._createLinkItem("state", selectedViewName, "Status"), this._createLinkItem("conf", selectedViewName), this._createLinkItem("log", selectedViewName)), React.createElement("div", { "className": "main-contents" }, React.createElement("section", null, this.props.children)));
        }
    }, {
        key: '_createLinkItem',
        value: function _createLinkItem(viewName, selectedViewName, displayName) {
            var className = viewName == selectedViewName ? "selected" : "";
            if (displayName == null) {
                displayName = viewName.slice(0, 1).toUpperCase() + viewName.slice(1);
            }
            return React.createElement("li", { "className": className }, React.createElement(react_router_1.Link, { "to": "/es/view/" + viewName }, displayName));
        }
    }]);

    return EsAppContainer;
}(React.Component);

exports.EsAppContainer = EsAppContainer;
module.exports = { EsAppContainer: EsAppContainer };