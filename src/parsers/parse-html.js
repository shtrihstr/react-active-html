function parseHtml(html, parser) {
    if (!html || typeof html !== 'string') {
        return [];
    }

    const doc = parser.parseFromString(html, 'text/html');

    if (doc.body && doc.body.childNodes) {
        return doc.body.childNodes;
    }

    if (doc.childNodes) {
        return doc.childNodes;
    }

    return [];
}

export default parseHtml;
