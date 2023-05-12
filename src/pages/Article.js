import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { app, credentials } from '../mongo';
import { ArticleStructure, Markdown, Metadata } from '../components';

export default function Article() {
    const [content, setContent] = useState({})
    
    let { term } = useParams()

    const addLinks = (markdown, links) => {
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

    useEffect(() => { 
        const fetchContent = async term => {
            const user = await app.logIn(credentials);
            // get article and links in parallel
            Promise.all([ user.functions.getArticle(term), user.functions.getTerms() ])
                // implement links and set content
                .then(([ article, terms ]) => setContent({
                    ...article, markdown: addLinks(article.markdown, terms.terms)
                }))
                .catch(() => fetchContent("404"))
        }
        fetchContent(term)
    }, [term])

    return (
        <ArticleStructure>
            <Markdown markdownText={ content.markdown } />
            { content.author && content.date ? <Metadata author={ content.author } date={ content.date } /> : null }
        </ArticleStructure>
)}