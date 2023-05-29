import ReactMarkdown from 'react-markdown'

export function SingleStructure({ children }) { return (
  <div className="flex justify-center">
    <div className='w-2/3 flex flex-col space-y-48'>
      { children }
    </div>
  </div>
)}

/** 
 * splits the screen in two columns
 * (classname applies to inner div)
 */
export function ArticleStructure({ className, children }) { return (
  <div className={ "flex justify-between " + className }>
    { children }
  </div>
)}

/** space for two articles */
export function WriteStructure({ children }) { return (
  <div className="flex justify-center">
    <ArticleStructure className="space-x-12 w-min">
      { children }
    </ArticleStructure>
  </div>
)}

/** space between markdown editor and button */
export function EditorButton({ children }) { return (
  <div className="space-y-5 h-min">
    { children }
  </div>
)}

/** for information beside articles */
export function Card({ className, children }) { return (
  <div className={ "px-6 py-3 w-72 h-min bg-white " + className }>
    { children }
  </div>
)}

/** converts markdown to styled html */
export function Markdown({ markdownText }) { return (
    <ReactMarkdown className="px-7 py-6 w-[40rem] bg-white prose prose-h1:text-primary prose-h1:mb-6 prose-h3:font-bold prose-h3:mt-0 prose-a:no-underline prose-a:text-primary prose-a:font-semibold prose-img:mt-0">{ markdownText }</ReactMarkdown>
)}

/** list articles */
export function ListArticles({ markdown }) { return (
  <ArticleStructure>
    <Markdown markdownText={ markdown } />
  </ArticleStructure>
)}

/** common article card */
export function Metadata({ className, author, date }) { return (
  <Card className={ "!py-5 " + className }>
    <div className="text-xl">by <span className="text-3xl font-semibold text-primary">{ author }</span></div>
    <div className="flex justify-end text-lg">{ date }</div>
  </Card>
)}

/** minor sentence card */
export function Minor({ className, children }) { return (
    <Card className={ "text-3xl font-semibold text-center " + className }>{ children }</Card>
)}

/** markdown and editable metadata */
export function LeftWrite({ markdown, author, authorReference, authorOnChange, date, dateReference, dateOnChange }) { return (
  <div className="space-y-7">
    <Markdown markdownText={ markdown } />
    <Card className="float-right !py-5">

      <div className="text-xl flex space-x-3 items-baseline">
        <div>by</div> 
        <textarea 
          ref={ authorReference } 
          value={ author } 
          onChange={ authorOnChange } 
          className="w-64 bg-transparent text-3xl font-semibold text-primary resize-none focus:outline-none" 
        />
      </div>
      <textarea 
        ref={ dateReference } 
        value={ date } 
        onChange={ dateOnChange } 
        readOnly={ !dateOnChange }
        className="float-right text-right !h-7 resize-none focus:outline-none" 
      />

    </Card>
  </div>
)}

export function MarkdownEditor({ markdown, markdownReference, markdownOnChange }) { 
  return <textarea 
    ref={ markdownReference } 
    value={ markdown } 
    onChange={ markdownOnChange } 
    className="px-7 py-6 w-[40rem] text-typing resize-none focus:outline-none" 
  />
}

export function Button({ onClick, className, children }) { return (
  <button onClick={ onClick } className={ "float-right " + className }>
    <Card className="!px-4 w-min font-semibold text-3xl">{ children }</Card>
  </button>
)}