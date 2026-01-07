const API_BASE = "http://11.21.37.195:5001/api/functions";

export const user = {
  functions: {
    findOne: async (collection, query) => {
      const res = await fetch(`${API_BASE}/findOne/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      });
      console.log(res.body.values);
      return res.json();
    },

    updateOne: async (collection, filter, update) => {
      const res = await fetch(`${API_BASE}/updateOne/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filter, update })
      });
      return res.json();
    },

    insertOne: async (collection, doc) => {
      const res = await fetch(`${API_BASE}/insertOne/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc)
      });
      return res.json();
    },

    deleteOne: async (collection, query) => {
      const res = await fetch(`${API_BASE}/deleteOne/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      });
      return res.json();
    }
  }
};


export function addLinks(markdown, links, title=null, admin=false) {
    if (!markdown || !links) return null;
    // skip the title
    const lines = markdown.split('\n');
    const firstLine = lines[0];
    let rest = lines.slice(1).join('\n');

    links = links.filter(link => link !== title) // don't link to self
        .sort((a, b) => b.length - a.length); // check longer links first

    for (const link of links) rest = rest.replace(new RegExp(
            // replace - for ' ' and check that it's not already linked
            `(?<!\\[|\\-|\\/)\\b${ link.replace(/-/g, ' ') }\\b(?!\\]|\\-)`, 'gi'
        ), `[$&](/${ (admin ? "admin/" : "") + link })`
    )
    return firstLine + "\n" + rest;
}

export function updateHeight(reference) {
    if (!reference.current) return;
    
    reference.current.style.height = "0";
    reference.current.style.height = `${reference.current.scrollHeight}px`;
}

export function getTitle(markdown) {
    return markdown.split('\n')[0]
        .replace('# ', '')
        .trim()
        .replace(/ /g, '-')
        .replace(/\//g, '-')
        .toLowerCase();
}

// sort by number of likes
export function likeSort(a, b) { return a.likes < b.likes ? 1 : -1; }

export function titlelise(title) { return !title ? null : title.replace(/-/g, ' ').toUpperCase() }
