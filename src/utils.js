export function addLinks(markdown, links, title=null, admin=false) {
    // skip the title
    const lines = markdown.split('\n');
    const firstLine = lines[0];
    let rest = lines.slice(1).join('\n');

    links = links.filter(link => link !== title) // don't link to self
        .sort((a, b) => b.length - a.length); // check longer links first

    for (const link of links) rest = rest.replace(new RegExp(
            // replace - for ' ' and check that it's not already linked
            `(?<!\\[|\\-|\\/)\\b${link.replace(/-/i, ' ')}\\b(?!\\]|\\-)`, 'gi'
        ), `[$&](/${ (admin ? "admin/" : "") + link })`
    )
    return firstLine + "\n" + rest;
}

export function updateHeight(reference, minHeight="auto") {
    reference.current.style.height = minHeight;
    reference.current.style.height = `${reference.current.scrollHeight}px`;
}

export function getTitle(markdown) {
    return markdown.split('\n')[0]
        .replace('# ', '')
        .replace(' ', '-')
        .replace('/', '-')
        .toLowerCase();
}