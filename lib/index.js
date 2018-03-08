'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _parseHtml = require('./parsers/parse-html');

var _parseHtml2 = _interopRequireDefault(_parseHtml);

var _transformNodesToObjectsTree = require('./transformers/transform-nodes-to-objects-tree');

var _transformNodesToObjectsTree2 = _interopRequireDefault(_transformNodesToObjectsTree);

var _transformTreeToReactComponents = require('./transformers/transform-tree-to-react-components');

var _transformTreeToReactComponents2 = _interopRequireDefault(_transformTreeToReactComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function activeHtml(html, componentsMap) {
    if (!activeHtml.DOMParser) {
        errorLog('DOMParser is undefined');
        return null;
    }

    var nodes = void 0;
    if (typeof html === 'string') {
        nodes = (0, _parseHtml2.default)(html, activeHtml.DOMParser);
    } else if (typeof NodeList !== 'undefined' && html instanceof NodeList || typeof HTMLCollection !== 'undefined' && html instanceof HTMLCollection) {
        nodes = html;
    } else if (typeof Node !== 'undefined' && html instanceof Node) {
        nodes = [html];
    } else {
        errorLog('Invalid parameter: html must be a string or DOM Nodes');
        return null;
    }

    if ((typeof componentsMap === 'undefined' ? 'undefined' : _typeof(componentsMap)) !== 'object') {
        errorLog('Invalid parameter: componentsMap must be an object');
        return null;
    }

    var tree = (0, _transformNodesToObjectsTree2.default)(nodes);
    return (0, _transformTreeToReactComponents2.default)(tree, componentsMap);
}

activeHtml.DOMParser = typeof DOMParser !== 'undefined' ? new DOMParser() : null;

function errorLog(msg) {
    if (typeof console !== 'undefined' && console.error) {
        console.error(msg);
    }
}

exports.default = activeHtml;