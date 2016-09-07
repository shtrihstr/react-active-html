
export default class HtmlSerializer {

    constructor() {

        if (typeof DOMParser !== 'undefined') {
            this.parser = new DOMParser();
        }

        this._removeEmptyStrings = false;
        this._attributesAdapter = null;
    }

    removeEmptyStrings(remove = true) {
        this._removeEmptyStrings = remove;
    }

    setAttributesAdapter(adapter) {
        this._attributesAdapter = adapter;
    }

    parseInlineCss(css) {
        let urls = [];
        let tmpCss = css.replace(/url(\s+)?\(.*\)/i, (match) => {
            const key = urls.length;
            urls.push(match);
            return '%%' + key + '%%';
        });

        let arr = tmpCss.split(';').filter((item) => item.indexOf(':') !== -1);

        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i].split(':');
            let key = item[0].trim();
            let value = item[1].trim();

            if (/%%\d+%%/.test(value)) {
                value = value.replace(/%%\d+%%/, (m) => urls[parseInt(m.replace(/\%/g, ''))]);
            }
            obj[key] = value;
        }

        return obj;
    }

    parseHtml(html) {
        if (typeof html !== 'string' || html == '') {
            return [];
        }

        if (!this.parser) {
            console && console.error("DOMParser was not found.");
            return html;
        }

        let doc = this.parser.parseFromString(html, "text/html");

        if (doc.body) {
            doc = doc.body;
        }

        if (!doc.childNodes) {
            return [];
        }

        return this._parseNodes(doc.childNodes);
    }

    _parseNodes(nodes) {
        let i, k, node;
        let objects = [];

        for (i = 0; i < nodes.length; i++) {
            node = nodes[i];

            var obj = {};

            if (typeof node.tagName === 'undefined' && typeof node.nodeValue === 'string') {
                obj.node = 'text';
                obj.text = node.nodeValue;

                if (this._removeEmptyStrings && obj.text.trim().length == 0) {
                    continue;
                }

            }
            else {
                obj.node = node.tagName.toLowerCase();
            }


            if (typeof node.attributes === 'object' && node.attributes && node.attributes.length > 0) {
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

            if (typeof node.childNodes === 'object' && node.childNodes && node.childNodes.length > 0) {
                obj.children = this._parseNodes(node.childNodes);
            }
            objects.push(obj);
        }

        return objects;
    }


}