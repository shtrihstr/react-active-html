'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (htmlSting) {
    var componentsMap = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (typeof htmlSting !== 'string') {
        if (debug) {
            console && console.error("Html should be string, " + (typeof htmlSting === 'undefined' ? 'undefined' : _typeof(htmlSting)) + " was given.");
            return null;
        }
    }

    var removeEmptyStrings = options && options.removeEmptyStrings === false ? false : true;
    var serializer = getSerializer();
    serializer.removeEmptyStrings(removeEmptyStrings);

    var tree = serializer.parseHtml(htmlSting);

    return htmlTreeToComponents(tree, componentsMap);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HtmlSerializer = require('./HtmlSerializer');

var _HtmlSerializer2 = _interopRequireDefault(_HtmlSerializer);

var _adapter = require('./adapter');

var _adapter2 = _interopRequireDefault(_adapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = process.env.NODE_ENV !== 'production';

var _serializer = null;

function getSerializer() {
    if (_serializer === null) {
        _serializer = new _HtmlSerializer2.default();
        _serializer.setAttributesAdapter(_adapter2.default);
    }
    return _serializer;
}

function htmlTreeToComponents(tree, componentsMap) {
    var index = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];


    return tree.map(function (item) {

        if (item.node === 'text') {
            return item.text;
        }

        var componentProps = {
            key: index
        };

        if (typeof item.attributes !== 'undefined') {
            componentProps = Object.assign(componentProps, item.attributes);
        }

        if (typeof item.children !== 'undefined') {
            componentProps = Object.assign(componentProps, {
                children: htmlTreeToComponents(item.children, componentsMap, ++index)
            });
        }

        if (typeof componentsMap[item.node] === 'undefined') {
            return _react2.default.createElement(item.node, componentProps);
        }

        if (typeof componentsMap[item.node] === 'function') {
            return componentsMap[item.node](componentProps);
        }

        if (debug) {
            console && console.warn("Component mapping should return a function, " + _typeof(componentsMap[item.node]) + " was given.");
        }

        return componentsMap[item.node];
    });
}