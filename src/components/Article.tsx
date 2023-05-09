import { useEffect, useState } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useParams } from "react-router-dom"
import { getArticle, getTerms } from "../mongo"

type Content = {
    credit?: string,
    date?: string,
    markdown?: string
}

const Article: React.FC = () => {
    const [content, setContent] = useState({} as Content)
    const [terms, setTerms] = useState([] as string[])

    const { id } = useParams();
    
    const handleSetContent = (data: string) => {
        let content = {} as Content
        const firstCharacter = data.charAt(0)

        const noMetadata = ["!", " ", "#"]

        if (noMetadata.includes(firstCharacter)) content.markdown = data
        else {
            const lines = data.trim().split("\n")
            try {
                content = {
                    credit: lines[0].trim(),
                    date: lines[1].trim(),
                    markdown: lines.slice(2).join("\n")
            }}
            catch (e) { content.markdown = data }
        }
        setContent(content)
    }

    const addLinks = () => {
        if (terms.length === 0 || content.markdown == null) return; // can't do nothing yet
    
        const altContent = { ...content } as { markdown: string }
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
    useEffect(() => { getTerms().then(setTerms) }, [])

    useEffect(() => {
        // if (markdown !== null) {
        //     handleSetContent(markdown);
        //     return
        // }

        getArticle(id)
            .then(data => handleSetContent(data))

            // .catch(() => { fetch(serverURL + "404")
            //     .then(response => response.text())
            //     .then(data => {if (!markdown) handleSetContent(data) })
            // })           
    }, [id])
    
    return (
        <div className="flex justify-center">
            <div className="mb-32 w-2/3 flex justify-between">
                
                <ReactMarkdown className="w-160 bg-white"># init?</ReactMarkdown>
                
                <div className="px-8 py-5 w-80 bg-white">
                    <div className="text-xl">by <span className="text-3xl font-semibold text-primary">Hugh Jass</span></div>
                    <div className="flex justify-end text-lg">5/8/2023</div>
                </div>
            
            </div>
        </div>
    )
}

export default Article