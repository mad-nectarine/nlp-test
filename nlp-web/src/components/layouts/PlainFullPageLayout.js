"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var PlainFullPageLayout = function (_React$Component) {
    _inherits(PlainFullPageLayout, _React$Component);

    function PlainFullPageLayout() {
        _classCallCheck(this, PlainFullPageLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PlainFullPageLayout).apply(this, arguments));
    }

    _createClass(PlainFullPageLayout, [{
        key: "render",
        value: function render() {
            return React.createElement("html", null, React.createElement("head", null, React.createElement("title", null, this.props.title), React.createElement("link", { "rel": "stylesheet", "href": "/stylesheets/style.css" })), React.createElement("body", null, React.createElement("div", { "id": "root" }, this.props.children)));
        }
    }]);

    return PlainFullPageLayout;
}(React.Component);

exports.PlainFullPageLayout = PlainFullPageLayout;
exports.default = { PlainFullPageLayout: PlainFullPageLayout };