import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import FourOFour from './FourOFour';

export default function Article() {
    const [content, setContent] = useState({});
    const [fourOFour, setFourOFour] = useState(false);
    const { id } = useParams();

    const handleSetContent = (data) => {
        const lines = data.trim().split('\n');
        setContent({
            credit: lines[0].trim(),
            date: lines[1].trim(),
            markdown: lines.slice(2).join('\n')
    })}

    useEffect(() => {
        let file;
        try { file = require(`../content/${id}.md`) }
        catch (e) { setFourOFour(true) }

        fetch(file)
            .then(response => response.text())
            .then(data => handleSetContent(data))
    }, [id])

    return fourOFour ? <FourOFour /> : (
        <div className='Article'>

            <div className='Content'>
                <ReactMarkdown>{content.markdown}</ReactMarkdown>
            </div>

            <div className='MetaInformation'>
                <h3>by <span>{content.credit}</span></h3>
                <h4>{content.date}</h4>
            </div>
        
        </div>
    );
}