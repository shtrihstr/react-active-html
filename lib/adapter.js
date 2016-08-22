'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (attributes) {
    var newAttributes = {};

    for (var key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            var value = attributes[key];

            if (key == 'style' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                var camelCaseCss = {};
                for (var cssAttr in value) {
                    if (value.hasOwnProperty(cssAttr)) {
                        camelCaseCss[(0, _toCamelCase2.default)(cssAttr)] = value[cssAttr];
                    }
                }
                newAttributes[key] = camelCaseCss;
            } else if (typeof keyMap[key] !== 'undefined') {
                newAttributes[keyMap[key]] = value;
            } else {
                newAttributes[key] = value;
            }
        }
    }

    return newAttributes;
};

var _HTMLDOMPropertyConfig = require('react/lib/HTMLDOMPropertyConfig');

var _HTMLDOMPropertyConfig2 = _interopRequireDefault(_HTMLDOMPropertyConfig);

var _SVGDOMPropertyConfig = require('react/lib/SVGDOMPropertyConfig');

var _SVGDOMPropertyConfig2 = _interopRequireDefault(_SVGDOMPropertyConfig);

var _toCamelCase = require('to-camel-case');

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyMap = {};

for (var validAttr in _HTMLDOMPropertyConfig2.default.Properties) {
    if (_HTMLDOMPropertyConfig2.default.Properties.hasOwnProperty(validAttr)) {

        var lowerAttr = validAttr.toLowerCase();
        if (lowerAttr !== validAttr) {
            keyMap[lowerAttr] = validAttr;
        }
    }
}

for (var reactAttr in _HTMLDOMPropertyConfig2.default.DOMAttributeNames) {
    if (_HTMLDOMPropertyConfig2.default.DOMAttributeNames.hasOwnProperty(reactAttr)) {
        var attr = _HTMLDOMPropertyConfig2.default.DOMAttributeNames[reactAttr];
        keyMap[attr.toLowerCase()] = reactAttr;
    }
}

for (var _reactAttr in _SVGDOMPropertyConfig2.default.DOMAttributeNames) {
    if (_SVGDOMPropertyConfig2.default.DOMAttributeNames.hasOwnProperty(_reactAttr)) {
        var _attr = _SVGDOMPropertyConfig2.default.DOMAttributeNames[_reactAttr];
        keyMap[_attr.toLowerCase()] = _reactAttr;
    }
}