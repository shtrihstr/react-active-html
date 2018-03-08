import toCamelCase from 'to-camel-case';

const cssLinePattern = /[a-z\-]+(\s+)?:(((\s+)?url(\s+)?\(.+\)(\s+)?[,;])+|[^;]+)/gi;
const lastBracketPattern = /;$/;

function parseInlineCss(inlineCss) {
    if (!inlineCss || typeof inlineCss !== 'string') {
        return null;
    }

    let preparedCss = inlineCss.trim();
    if (!preparedCss.length) {
        return null;
    }

    if (preparedCss.slice(-1) !== ';') {
        preparedCss = `${preparedCss};`;
    }

    const lines = preparedCss.match(cssLinePattern);

    if (!lines || !lines.length) {
        return null;
    }

    return lines.reduce((map, line) => {
        const indexOfDivider = (line || '').indexOf(':');
        if (indexOfDivider) {
            const prop = line.substr(0, indexOfDivider);
            const value = line.substr(indexOfDivider + 1);
            map[toCamelCase(prop.toLowerCase())] = value.replace(lastBracketPattern, '').trim();
        }
        return map;
    }, {});
}

export default parseInlineCss;
