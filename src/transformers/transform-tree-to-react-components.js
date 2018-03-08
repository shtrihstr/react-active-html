import React from 'react';

function transformTreeToReactComponents(tree, componentsMap = {}) {
    let key = 0;
    return tree.map((item) => {

        if (item.node === 'text') {
            return item.text;
        }

        const props = Object.assign({
            key: key++
        }, item.props);

        if (item.children) {
            props.children = transformTreeToReactComponents(item.children, componentsMap);
        }

        if (!componentsMap[item.node]) {
            return React.createElement(item.node, props);
        }

        if (typeof componentsMap[item.node] === 'function') {
            return componentsMap[item.node].apply(this, [props]);
        }

        return componentsMap[item.node];
    });
}

export default transformTreeToReactComponents;
