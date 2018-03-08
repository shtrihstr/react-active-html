'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformTreeToReactComponents(tree) {
    var _this = this;

    var componentsMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var key = 0;
    return tree.map(function (item) {

        if (item.node === 'text') {
            return item.text;
        }

        var props = Object.assign({
            key: key++
        }, item.props);

        if (item.children) {
            props.children = transformTreeToReactComponents(item.children, componentsMap);
        }

        if (!componentsMap[item.node]) {
            return _react2.default.createElement(item.node, props);
        }

        if (typeof componentsMap[item.node] === 'function') {
            return componentsMap[item.node].apply(_this, [props]);
        }

        return componentsMap[item.node];
    });
}

exports.default = transformTreeToReactComponents;