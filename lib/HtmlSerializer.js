'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HtmlSerializer = function () {
    function HtmlSerializer() {
        _classCallCheck(this, HtmlSerializer);

        if (typeof DOMParser !== 'undefined') {
            this.parser = new DOMParser();
        }

        this._removeEmptyStrings = false;
        this._attributesAdapter = null;
    }

    _createClass(HtmlSerializer, [{
        key: 'removeEmptyStrings',
        value: function removeEmptyStrings() {
            var remove = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            this._removeEmptyStrings = remove;
        }
    }, {
        key: 'setAttributesAdapter',
        value: function setAttributesAdapter(adapter) {
            this._attributesAdapter = adapter;
        }
    }, {
        key: 'parseInlineCss',
        value: function parseInlineCss(css) {
            var urls = [];
            var tmpCss = css.replace(/url(\s+)?\(.*\)/i, function (match) {
                var key = urls.length;
                urls.push(match);
                return '%%' + key + '%%';
            });

            var arr = tmpCss.split(';').filter(function (item) {
                return item.indexOf(':') !== -1;
            });

            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i].split(':');
                var key = item[0].trim();
                var value = item[1].trim();

                if (/%%\d+%%/.test(value)) {
                    value = value.replace(/%%\d+%%/, function (m) {
                        return urls[parseInt(m.replace(/\%/g, ''))];
                    });
                }
                obj[key] = value;
            }

            return obj;
        }
    }, {
        key: 'parseHtml',
        value: function parseHtml(html) {
            if (typeof html !== 'string' || html == '') {
                return [];
            }

            if (!this.parser) {
                console && console.error("DOMParser was not found.");
                return html;
            }

            var doc = this.parser.parseFromString(html, "text/html");

            if (doc.body) {
                doc = doc.body;
            }

            if (!doc.childNodes) {
                return [];
            }

            return this._parseNodes(doc.childNodes);
        }
    }, {
        key: '_parseNodes',
        value: function _parseNodes(nodes) {
            var i = void 0,
                k = void 0,
                node = void 0;
            var objects = [];

            for (i = 0; i < nodes.length; i++) {
                node = nodes[i];

                var obj = {};

                if (typeof node.tagName === 'undefined' && typeof node.nodeValue === 'string') {
                    obj.node = 'text';
                    obj.text = node.nodeValue;

                    if (this._removeEmptyStrings && obj.text.trim().length == 0) {
                        continue;
                    }
                } else {
                    obj.node = node.tagName.toLowerCase();
                }

                if (_typeof(node.attributes) === 'object' && node.attributes && node.attributes.length > 0) {
                    var attributes = {};
                    for (k = 0; k < node.attributes.length; k++) {
                        var attribute = node.attributes[k];
                        attributes[attribute.name.toLowerCase()] = attribute.value;
                    }

                    if (typeof attributes.style !== 'undefined') {
                        attributes.style = this.parseInlineCss(attributes.style);
                    }

                    if (typeof this._attributesAdapter === 'function') {
                        attributes = this._attributesAdapter(attributes);
                    }

                    obj.attributes = attributes;
                }

                if (_typeof(node.childNodes) === 'object' && node.childNodes && node.childNodes.length > 0) {
                    obj.children = this._parseNodes(node.childNodes);
                }
                objects.push(obj);
            }

            return objects;
        }
    }]);

    return HtmlSerializer;
}();

exports.default = HtmlSerializer;