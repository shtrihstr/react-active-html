import HTMLDOMPropertyConfig from 'react-dom/lib/HTMLDOMPropertyConfig';
import SVGDOMPropertyConfig from 'react-dom/lib/SVGDOMPropertyConfig';
import toCamelCase from 'to-camel-case';

let keyMap = {};

for (let validAttr in HTMLDOMPropertyConfig.Properties) {
    if (HTMLDOMPropertyConfig.Properties.hasOwnProperty(validAttr)) {

        let lowerAttr = validAttr.toLowerCase();
        if (lowerAttr !== validAttr) {
            keyMap[lowerAttr] = validAttr;
        }
    }
}

for (let reactAttr in HTMLDOMPropertyConfig.DOMAttributeNames) {
    if (HTMLDOMPropertyConfig.DOMAttributeNames.hasOwnProperty(reactAttr)) {
        let attr = HTMLDOMPropertyConfig.DOMAttributeNames[reactAttr];
        keyMap[attr.toLowerCase()] = reactAttr;
    }
}

for (let reactAttr in SVGDOMPropertyConfig.DOMAttributeNames) {
    if (SVGDOMPropertyConfig.DOMAttributeNames.hasOwnProperty(reactAttr)) {
        let attr = SVGDOMPropertyConfig.DOMAttributeNames[reactAttr];
        keyMap[attr.toLowerCase()] = reactAttr;
    }
}

export default function (attributes) {
    let newAttributes = {};

    for (let key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            let value = attributes[key];

            if (key == 'style' && typeof value === 'object') {
                let camelCaseCss = {};
                for (let cssAttr in value) {
                    if (value.hasOwnProperty(cssAttr)) {
                        camelCaseCss[toCamelCase(cssAttr)] = value[cssAttr];
                    }
                }
                newAttributes[key] = camelCaseCss;
            }
            else if (typeof keyMap[key] !== 'undefined') {
                newAttributes[keyMap[key]] = value;
            }
            else {
                newAttributes[key] = value;
            }
        }
    }

    return newAttributes;
}