import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const serverURL = "https://bridge-america-server.onrender.com/"

export default function Article({ id=null, markdown=null, isSubmitted=false }) {
    const [content, setContent] = useState({});
    const [terms, setTerms] = useState([]);

    const params = useParams();
    if (markdown === null && id === null) id = params.id;

    const handleSetContent = data => {
        let content = {}
        const firstCharacter = data.charAt(0);
        if (firstCharacter === "!" || firstCharacter === " " || firstCharacter === "#") content.markdown = data;
        else {
            const lines = data.trim().split('\n');
            try {
                content = {
                    credit: lines[0].trim(),
                    date: lines[1].trim(),
                    markdown: lines.slice(2).join('\n')
            }}
            catch (e) { content.markdown = data } // writer deleted the placeholder
        }
        setContent(content)
    }

    const addLinks = () => {
        if (terms.length === 0 || content.markdown == null) return; // can't do nothing yet
    
        const altContent = { ...content }
        const altTerms = terms.filter(term => term !== id) // don't link to self
            .sort((a, b) => b.length - a.length); // check longer terms first

        for (const term of altTerms) {
            altContent.markdown = altContent.markdown.replace(
                new RegExp(
                    // - for ' ' and check that it's not already linked
                    `(?<!\\[|\\-|\\/)\\b${term.replace(/-/i, ' ')}\\b(?!\\]|\\-)`, 'gi'
                ), `[$&](/${term})`
        )} 
        setContent(altContent)
    }

    useEffect(addLinks, [terms, content, addLinks])

    // get terms
    useEffect(() => {
        fetch(serverURL + "terms")
            .then(response => response.json())
            .then(setTerms)
    }, [])

    useEffect(() => {
        if (markdown !== null) {
            handleSetContent(markdown);
            return
        }

        fetch(serverURL + id)
            .then(response => {
                if (response.status === 404) throw new Error("404")
                return response.text()
            })
            .then(data => handleSetContent(data))

            .catch(() => { fetch(serverURL + "404")
                .then(response => response.text())
                .then(data => {if (!markdown) handleSetContent(data) })
                        
    })}, [id, markdown])

    const metaInformation = () => content.credit == null ? null : (
        <div className='MetaInformation'>
            <h3>by <span>{content.credit}</span></h3>
            <h4>{content.date}</h4>
        </div>
    );

    return (
        <div className='Article'>

            <div className='Content'>
                <ReactMarkdown>{content.markdown}</ReactMarkdown>
            </div>

            { !isSubmitted ? metaInformation() : (
                <div className="SubmittedRight">
                    { metaInformation() }

                    <div className="Emailed">
                        <h3>submission emailed to</h3>
                        <h4><span>tadahiroueta@gmail.com</span></h4>
                    </div>

                    <div className="Thanks">
                        <h3><span>THANK YOU!</span></h3>
                    </div>
                </div>
            )}
        
        </div>
    );
}