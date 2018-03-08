import parseHtml from './parsers/parse-html';
import transformNodesToObjectsTree from './transformers/transform-nodes-to-objects-tree';
import transformTreeToReactComponents from './transformers/transform-tree-to-react-components';

function activeHtml(html, componentsMap) {
    if (!activeHtml.DOMParser) {
        errorLog('DOMParser is undefined');
        return null;
    }

    let nodes;
    if (typeof html === 'string') {
        nodes = parseHtml(html, activeHtml.DOMParser);
    } else if (typeof NodeList !== 'undefined' && NodeList instanceof NodeList) {
        nodes = NodeList;
    } else if (typeof Node !== 'undefined' && html instanceof Node) {
        nodes = [Node];
    } else {
        errorLog('Invalid parameter: html must be a string or DOM Nodes');
        return null;
    }

    if (typeof componentsMap !== 'object') {
        errorLog('Invalid parameter: componentsMap must be an object');
        return null;
    }

    const tree = transformNodesToObjectsTree(nodes);
    return transformTreeToReactComponents(tree, componentsMap);
}

activeHtml.DOMParser = typeof DOMParser !== 'undefined' ? new DOMParser() : null;

function errorLog(msg) {
    if (typeof console !== 'undefined' && console.error) {
        console.error(msg);
    }
}

export default activeHtml;
