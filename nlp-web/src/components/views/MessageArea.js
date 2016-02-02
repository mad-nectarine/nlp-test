"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var MessageArea = function (_React$Component) {
    _inherits(MessageArea, _React$Component);

    function MessageArea() {
        _classCallCheck(this, MessageArea);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MessageArea).apply(this, arguments));
    }

    _createClass(MessageArea, [{
        key: "render",
        value: function render() {
            if (this.props.message) {
                return React.createElement("div", { "className": "message " + this.props.message.type }, this.props.message.text);
            }
            return React.createElement("div", { "className": "message none" });
        }
    }]);

    return MessageArea;
}(React.Component);

exports.MessageArea = MessageArea;
exports.default = { MessageArea: MessageArea };