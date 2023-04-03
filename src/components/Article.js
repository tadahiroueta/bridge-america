import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function Article() {
    const [markdown, setMarkdown] = useState('');
    const { id } = useParams();

    useEffect(() => {
        let file;
        try { file = require(`../content/articles/${id}.md`) }
        catch (e) { file = require(`../content/404.md`) }

        fetch(file)
            .then(response => response.text())
            .then(data => setMarkdown(data))
    }, [id])

    return (
        <div className='Article'>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
}