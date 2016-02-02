'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDom = require('react-dom/server');
var ReduxProviderLayout_1 = require('./ReduxProviderLayout');

var ReduxFullPageLayout = function (_React$Component) {
    _inherits(ReduxFullPageLayout, _React$Component);

    function ReduxFullPageLayout() {
        _classCallCheck(this, ReduxFullPageLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ReduxFullPageLayout).apply(this, arguments));
    }

    _createClass(ReduxFullPageLayout, [{
        key: 'render',
        value: function render() {
            //create contents html
            var contents = React.createElement(ReduxProviderLayout_1.ReduxProviderLayout, { "store": this.props.store, "hasDevTool": this.props.isDevelopment }, this.props.children);
            var html = ReactDom.renderToString(contents);
            //create initial state
            var initialState = this.props.store.getState();
            var stateJson = JSON.stringify(initialState);
            //script src
            var extensions = this.props.isDevelopment ? ".debug.js" : ".min.js";
            var scriptSrc = "/scripts/apps/" + this.props.pageName.toLowerCase() + extensions;
            //create full page elemements
            return React.createElement("html", null, React.createElement("head", null, React.createElement("title", null, this.props.title), React.createElement("link", { "rel": "stylesheet", "href": "/stylesheets/style.css" }), React.createElement("meta", { "charSet": "utf-8" }), React.createElement("meta", { "name": "viewport", "content": "width=device-width, initial-scale=1.0" })), React.createElement("body", null, React.createElement("div", { "id": "root", "dangerouslySetInnerHTML": { __html: html }, "data-initialstate": stateJson, "data-dev": this.props.isDevelopment }), React.createElement("script", { "type": "text/javascript", "src": scriptSrc })));
        }
    }]);

    return ReduxFullPageLayout;
}(React.Component);

exports.ReduxFullPageLayout = ReduxFullPageLayout;
exports.default = { ReduxFullPageLayout: ReduxFullPageLayout };