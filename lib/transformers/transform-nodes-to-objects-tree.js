'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _transformNodeProps = require('./transform-node-props');

var _transformNodeProps2 = _interopRequireDefault(_transformNodeProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformNodesToObjectsTree(nodes) {
    return Array.from(nodes).map(function (node) {
        if (typeof node.tagName === 'undefined') {
            if (typeof node.nodeValue === 'string') {
                return {
                    node: 'text',
                    text: node.nodeValue
                };
            }
            return null;
        }

        var obj = {
            node: node.tagName.toLowerCase()
        };

        if (node.attributes && node.attributes.length) {
            var attributesAsObject = Array.from(node.attributes).reduce(function (map, attribute) {
                map[attribute.name.toLowerCase()] = attribute.value;
                return map;
            }, {});

            obj.props = (0, _transformNodeProps2.default)(attributesAsObject);
        }

        if (node.childNodes && node.childNodes.length) {
            obj.children = transformNodesToObjectsTree(node.childNodes);
        }

        return obj;
    }).filter(Boolean);
}

exports.default = transformNodesToObjectsTree;