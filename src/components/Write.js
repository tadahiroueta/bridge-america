import { useEffect, useState, useRef } from "react"
import axios from "axios"
import Article from "./Article"

export default function Write() {
    const [markdown, setMarkdown] = useState(" ")
    const [submit, setSubmit] = useState("Submit")
    const reference = useRef(null);

    useEffect(() => {
        fetch("https://server.bridgeamerica.tadahiroueta.com/write")
            .then(response => response.text())
            .then(data => {
                setMarkdown(data)
                for (const time of [50, 100, 200, 400]) setTimeout(() => updateHeight(), time)
            })
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
    const handleSubmit = () => {
        setSubmit("Submitting...")
        axios.post("https://server.bridgeamerica.tadahiroueta.com/submit", { markdown })
            .then(response => { if (response.status === 200) setSubmit("Submitted") });
    }
    
    return ( submit === "Submitted" ? <Article markdown={markdown} isSubmitted={true} /> :

        <div className='Write'>
            <Article markdown={markdown} />
        
            <div className="Right">
                <textarea ref={reference} value={markdown} onChange={handleChange} />
                <input type="submit" value={submit} onClick={handleSubmit} />
            </div>
        </div>
    )
}