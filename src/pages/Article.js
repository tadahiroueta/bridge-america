import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { app, credentials } from '../mongo';
import { ArticleStructure, Markdown, Metadata } from '../components';

export default function Article() {
    const [content, setContent] = useState({})
    
    const { term } = useParams()

    const addLinks = (markdown, links) => {
        const lines = markdown.split('\n');
        const firstLine = lines[0];
        let rest = lines.slice(1).join('\n');

        links = links.filter(link => link !== term) // don't link to self
            .sort((a, b) => b.length - a.length); // check longer links first

        for (const link of links) rest = rest.replace(
            new RegExp(
                // replace - for ' ' and check that it's not already linked
                `(?<!\\[|\\-|\\/)\\b${link.replace(/-/i, ' ')}\\b(?!\\]|\\-)`, 'gi'
            ), `[$&](/${link})`
        )
        return firstLine + "\n" + rest;
    }

    useEffect(() => { 
        (async () => {
            const user = await app.logIn(credentials);
            // get article and links in parallel
            Promise.all([ user.functions.getArticle(term), user.functions.getTerms() ])
                // implement links and set content
                .then(([ article, terms ]) => setContent({
                    ...article, markdown: addLinks(article.markdown, terms.terms)
        }))})();
    }, [term])

    return (
        <ArticleStructure>
            <Markdown markdownText={ content.markdown } />
            <Metadata author={ content.author } date={ content.date } />
        </ArticleStructure>
)}