import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Article({ name }) {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        let file;
        try { file = require(`./articles/${name}.md`) }
        catch (e) { file = require(`./articles/404.md`) }
        
        fetch(file)
            .then(response => response.text())
            .then(data => setMarkdown(data))
    }, [])

    return (
        <div className='Article'>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
}