import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import FourOFour from './FourOFour';

export default function Article() {
    const [markdown, setMarkdown] = useState('');
    const [fourOFour, setFourOFour] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        let file;
        try { file = require(`../content/${id}.md`) }
        catch (e) { setFourOFour(true) }

        fetch(file)
            .then(response => response.text())
            .then(data => setMarkdown(data))
    }, [id])

    return fourOFour ? <FourOFour /> : (
        <div className='Article'>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
}