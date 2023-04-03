import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function Definition() {
    const [markdown, setMarkdown] = useState('');
    const { term } = useParams();

    useEffect(() => {
        let file;
        try { file = require(`../content/definitions/${term}.md`) }
        catch (e) { file = require(`../content/404.md`) }

        fetch(file)
            .then(response => response.text())
            .then(data => setMarkdown(data))
    }, [term])

    return (
        <div className='Definition'>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
}