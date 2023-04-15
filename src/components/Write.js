import { useEffect, useState } from "react"
import Article from "./Article"

export default function Write() {
    const [markdown, setMarkdown] = useState("")

    useEffect(() => {
        fetch(require("../content/write.md"))
            .then(response => response.text())
            .then(data => setMarkdown(data))
    }, [])

    const handleSubmit = () => { {} }
    
    return (
        <div className='Write'>
            <Article markdown={markdown} />
            <div className="Right">
                <div className="Markdown">
                    <textarea value={markdown} onChange={e => setMarkdown(e.target.value)} />
                </div>
                {/* submit button */}
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </div>
        </div>
    )
}