import transformNodeProps from './transform-node-props';

function transformNodesToObjectsTree(nodes) {
    return Array.from(nodes).map((node) => {
        if (typeof node.tagName === 'undefined') {
            if (typeof node.nodeValue === 'string') {
                return {
                    node: 'text',
                    text: node.nodeValue
                };
            }
            return null;
        }

        const obj = {
            node: node.tagName.toLowerCase(),
        };

        if (node.attributes && node.attributes.length) {
            const attributesAsObject = Array.from(node.attributes).reduce((map, attribute) => {
                map[attribute.name.toLowerCase()] = attribute.value;
                return map;
            }, {});

            obj.props = transformNodeProps(attributesAsObject);
        }

        if (node.childNodes && node.childNodes.length) {
            obj.children = transformNodesToObjectsTree(node.childNodes);
        }

        return obj;
    }).filter(Boolean);
}

export default transformNodesToObjectsTree;
