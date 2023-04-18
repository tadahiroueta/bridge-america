import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function Article({ id = null, markdown=null }) {
    const [content, setContent] = useState({});

    const params = useParams();
    if (markdown === null && id === null) id = params.id;
    
    const handleSetContent = (data) => {
        if (data.charAt(0) === "!") {
            setContent({ markdown: data })
            return
        }

        const lines = data.trim().split('\n');
        setContent({
            credit: lines[0].trim(),
            date: lines[1].trim(),
            markdown: addLinks(lines.slice(2).join('\n'))
    })}

    useEffect(() => {
        if (markdown) {
            handleSetContent(markdown);
            return
        }

        let file;
        try { file = require(`../content/${id}.md`) }
        catch (e) { file = require("../content/404.md") }

        fetch(file)
            .then(response => response.text())
            .then(data => handleSetContent(data))
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markdown])

    const addLinks = (markdown) => { 
        const terms = require("../content/terms.json")
            .filter(term => term !== id) // don't link to self
            .sort((a, b) => b.length - a.length) // check longer terms first

        for (const term of terms)
            markdown = markdown.replace(
                new RegExp(term.replace(/-/i, ' '), 'gi'), 
                `[$&](/${term})`
            )
        return markdown
    }

    return (
        <div className='Article'>

            <div className='Content'>
                <ReactMarkdown>{content.markdown}</ReactMarkdown>
            </div>

            { content.credit == null ? null : (
                <div className='MetaInformation'>
                    <h3>by <span>{content.credit}</span></h3>
                    <h4>{content.date}</h4>
                </div>
            ) }
        
        </div>
    );
}