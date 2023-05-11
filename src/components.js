import ReactMarkdown from 'react-markdown'

/** 
 * splits the screen in two columns
 * (classname applies to inner div)
 */
export function ArticleStructure({ className, children }) { return (
    <div className="flex justify-center">
        <div className={ "mb-32 w-2/3 flex justify-between" + className }>
            { children } // TODO add className
        </div>
    </div>
)}

/** for information beside articles */
export function Card({ className, children }) { return (
    <div className={ "mb-6 px-6 py-3 w-72 h-min bg-white " + className }>
        { children }
    </div>
)}

/** converts markdown to styled html */
export function Markdown({ markdownText }) { return (
    <ReactMarkdown className="px-7 py-6 w-160 bg-white prose prose-h1:text-primary prose-h1:mb-6 prose-h3:font-bold prose-h3:mt-0">{ markdownText }</ReactMarkdown>
)}

/** common article card */
export function Metadata({ className, author, date }) { return (
    <Card className={ "!py-5 " + className }>
        <div className="text-xl">by <span className="text-3xl font-semibold text-primary">{ author }</span></div>
        <div className="flex justify-end text-lg">{ date }</div>
    </Card>
)}