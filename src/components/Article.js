import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function Article({ id=null, markdown=null }) {
    const [content, setContent] = useState({});

    const params = useParams();
    if (markdown === null && id === null) id = params.id;
    
    const handleSetContent = (data) => {
        let content = {}
        const firstCharacter = data.charAt(0);
        if (firstCharacter === "!" || firstCharacter === " ") content.markdown = data;
        else {
            const lines = data.trim().split('\n');
            content = {
                credit: lines[0].trim(),
                date: lines[1].trim(),
                markdown: lines.slice(2).join('\n')
        }}
        
        if (markdown) {
            setContent(content)
            return
        }
        fetch("https://server.bridgeamerica.tadahiroueta.com/terms")
            .then(response => response.json()) // just learned about this
            .then(json => {
                return json
                    .filter(term => term !== id) // don't link to self
                    .sort((a, b) => b.length - a.length) // check longer terms first
            })
            .then(terms => {
                for (const term of terms){
                    content.markdown = content.markdown.replace(
                        new RegExp(term.replace(/-/i, ' '), 'gi'), `[$&](/${term})`
                    )}
                setContent(content)
    })}

    useEffect(() => {
        if (markdown) {
            handleSetContent(markdown);
            return
        }

        fetch(`https://server.bridgeamerica.tadahiroueta.com/${id}`)
            .then(response => response.text())
            .then(data => handleSetContent(data))

            .catch(() => { fetch("https://server.bridgeamerica.tadahiroueta.com/404")
                .then(response => response.text())
                .then(data => {if (!markdown) handleSetContent(data) })
                        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })}, [id, markdown])

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