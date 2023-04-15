import { useEffect, useState, useRef } from "react"
import Article from "./Article"

export default function Write() {
    const [markdown, setMarkdown] = useState("")
    const reference = useRef(null);

    useEffect(() => {
        fetch(require("../content/write.md"))
            .then(response => response.text())
            .then(data => setMarkdown(data))
        
        setTimeout(() => updateHeight(), 50)
    }, [])

    const updateHeight = () => {
        reference.current.style.height = 'auto';
        reference.current.style.height = `${reference.current.scrollHeight}px`;
    }

    const handleChange = e => {
        setMarkdown(e.target.value)
        updateHeight()
    }

    // eslint-disable-next-line
    const handleSubmit = () => { {} }
    
    return (
        <div className='Write'>
            <Article markdown={markdown} />
            <div className="Right">
                <textarea ref={reference} value={markdown} onChange={handleChange} />
                {/* submit button */}
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </div>
        </div>
    )
}