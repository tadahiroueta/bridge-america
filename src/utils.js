export function addLinks(markdown, links, term) {
    // skip the title
    const lines = markdown.split('\n');
    const firstLine = lines[0];
    let rest = lines.slice(1).join('\n');

    links = links.filter(link => link !== term) // don't link to self
        .sort((a, b) => b.length - a.length); // check longer links first

    for (const link of links) rest = rest.replace(new RegExp(
            // replace - for ' ' and check that it's not already linked
            `(?<!\\[|\\-|\\/)\\b${link.replace(/-/i, ' ')}\\b(?!\\]|\\-)`, 'gi'
        ), `[$&](/${link})`
    )
    return firstLine + "\n" + rest;
}

