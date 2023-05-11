import ReactMarkdown from 'react-markdown'

export function ArticleStructure({ children }) { return (
    <div className="flex justify-center">
        <div className="mb-32 w-2/3 flex justify-between">
            { children }
        </div>
    </div>
)}

export function CardOnRight({ className, children }) { return (
    <div className={ "mb-6 px-6 py-3 w-72 h-min bg-white " + className }>
        { children }
    </div>
)}

export function Markdown({ markdownText }) { return (
    <ReactMarkdown className="px-7 py-6 w-160 bg-white prose prose-h1:text-primary prose-h1:mb-6 prose-h3:font-bold prose-h3:mt-0">{ markdownText }</ReactMarkdown>
)}

export function Metadata({ className, author, date }) { return (
    <CardOnRight className={ "!py-5 " + className }>
        <div className="text-xl">by <span className="text-3xl font-semibold text-primary">{ author }</span></div>
        <div className="flex justify-end text-lg">{ date }</div>
    </CardOnRight>
)}