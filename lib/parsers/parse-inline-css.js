'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toCamelCase = require('to-camel-case');

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cssLinePattern = /[a-z\-]+(\s+)?:(((\s+)?url(\s+)?\(.+\)(\s+)?[,;])+|[^;]+)/gi;
var lastBracketPattern = /;$/;

function parseInlineCss(inlineCss) {
    if (!inlineCss || typeof inlineCss !== 'string') {
        return null;
    }

    var preparedCss = inlineCss.trim();
    if (!preparedCss.length) {
        return null;
    }

    if (preparedCss.slice(-1) !== ';') {
        preparedCss = preparedCss + ';';
    }

    var lines = preparedCss.match(cssLinePattern);

    if (!lines || !lines.length) {
        return null;
    }

    return lines.reduce(function (map, line) {
        var indexOfDivider = (line || '').indexOf(':');
        if (indexOfDivider) {
            var prop = line.substr(0, indexOfDivider);
            var value = line.substr(indexOfDivider + 1);
            map[(0, _toCamelCase2.default)(prop.toLowerCase())] = value.replace(lastBracketPattern, '').trim();
        }
        return map;
    }, {});
}

exports.default = parseInlineCss;