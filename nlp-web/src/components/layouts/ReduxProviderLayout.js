'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var react_redux_1 = require('react-redux');
var react_1 = require('redux-devtools/lib/react');

var ReduxProviderLayout = function (_React$Component) {
    _inherits(ReduxProviderLayout, _React$Component);

    function ReduxProviderLayout() {
        _classCallCheck(this, ReduxProviderLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ReduxProviderLayout).apply(this, arguments));
    }

    _createClass(ReduxProviderLayout, [{
        key: 'render',
        value: function render() {
            var debug = null;
            if (this.props.hasDevTool) {
                debug = React.createElement(react_1.DebugPanel, { "top": true, "right": true, "bottom": true }, React.createElement(react_1.DevTools, { "store": this.props.store, "monitor": react_1.LogMonitor }));
            }
            return React.createElement("div", null, React.createElement(react_redux_1.Provider, { "store": this.props.store }, this.props.children), debug);
        }
    }]);

    return ReduxProviderLayout;
}(React.Component);

exports.ReduxProviderLayout = ReduxProviderLayout;
exports.default = { ReduxProviderLayout: ReduxProviderLayout };