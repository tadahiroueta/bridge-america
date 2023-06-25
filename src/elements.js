import ReactMarkdown from 'react-markdown'

/** A single centered column taking most of the page */
export function SingleStructure({ children }) { return (
  <div className="flex justify-center">
    <div className='w-11/12 flex flex-col space-y-36 md:w-2/3'>
      { children }
    </div>
  </div>
)}

/** 
 * splits the screen in two columns
 * (classname applies to inner div)
 */
export function ArticleStructure({ className, children }) { return (
  <div className={ "flex flex-col items-start justify-end space-y-8 md:flex-row md:justify-between md:space-y-0 " + className }>
    { children }
  </div>
)}

/** space for two articles */
export function WriteStructure({ children }) { return (
  <div className="flex justify-center">
    <ArticleStructure className="w-11/12 flex-col-reverse !space-y-0 md:w-min md:space-x-12">
      { children }
    </ArticleStructure>
  </div>
)}

/** space between markdown editor and button */
export function RightWriteStructure({ children }) { return (
  <div className="space-y-5 h-min w-full">
    { children }
  </div>
)}

/** for information beside articles */
export function Card({ className, children }) { return (
  <div className={ "float-right px-6 py-3 w-72 h-min bg-white " + className }>
    { children }
  </div>
)}

/** converts markdown to styled html */
export function Markdown({ markdownText }) { return (
  <ReactMarkdown className="p-5 w-full bg-white prose prose-h1:text-primary 
    prose-h1:mb-6 prose-h3:font-bold prose-h3:mt-0 prose-a:no-underline 
    prose-a:text-primary prose-a:font-semibold prose-img:mt-0 md:px-7 md:py-6 
    md:w-[40rem]">{ markdownText }</ReactMarkdown>
)}

/** list articles */
export function ListArticles({ markdown }) { return (
  <ArticleStructure>
    <Markdown markdownText={ markdown } />
  </ArticleStructure>
)}

/** common article card */
export function Metadata({ className, author, date }) { return (
  <div className="float-right flex justify-end md:float-none">
    <Card className={ "!py-5 " + className }>
      <div className="text-xl">
        <span>by </span><span className="text-3xl font-semibold text-primary">{ author }</span>
      </div>
      <div className="flex justify-end text-lg">{ date }</div>
    </Card>
  </div>
)}

/** minor sentence card */
export function Minor({ className, children }) { return (
  <Card className={ "text-3xl font-semibold text-center " + className }>{ children }</Card>)}

/** markdown and editable metadata */
export function LeftWrite({ markdown, author, authorReference, authorOnChange, date, 
  dateReference, dateOnChange }) { 
  return (
    <div className="mt-8 space-y-7 md:mt-0">
      <Markdown markdownText={ markdown } />
      <Card className="float-right !py-5">

        <div className="text-xl flex space-x-3 items-baseline">
          <div>by</div> 
          <textarea ref={ authorReference } value={ author } onChange={ authorOnChange } 
            className="w-64 bg-transparent text-3xl font-semibold text-primary resize-none 
            focus:outline-none" />
        </div>

        <textarea ref={ dateReference } value={ date } onChange={ dateOnChange } 
          readOnly={ !dateOnChange }
          className="float-right !h-7 bg-transparent text-right resize-none focus:outline-none" 
        />

      </Card>
    </div>
)}

/** where the user can write for the markdown */
export function MarkdownEditor({ markdown, markdownReference, markdownOnChange }) { 
  return <textarea ref={ markdownReference } value={ markdown } onChange={ markdownOnChange } 
    className="px-7 py-6 w-full text-typing resize-none focus:outline-none md:w-[40rem]" />
}

/** */
export function CardButton({ onClick, className, children }) { return (
  <button onClick={ onClick } className={ "float-right " + className }>
    <Card className="text-2xl !px-4 w-min font-semibold md:text-3xl">{ children }</Card>
  </button>
)}