'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function parseHtml(html, parser) {
    if (!html || typeof html !== 'string') {
        return [];
    }

    var doc = parser.parseFromString(html, 'text/html');

    if (doc.body && doc.body.childNodes) {
        return doc.body.childNodes;
    }

    if (doc.childNodes) {
        return doc.childNodes;
    }

    return [];
}

exports.default = parseHtml;