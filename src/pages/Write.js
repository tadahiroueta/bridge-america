import { useEffect, useRef, useState } from "react";

import { app, credentials } from "../mongo";
import { addLinks } from "../utils";
import { ArticleStructure, Card, Markdown, Metadata } from "../components";

function Submitted({ markdown, author, date }) { return (
  <ArticleStructure>
      <Markdown markdownText={ markdown } />
      
      <div className="space-y-6 text-lg">
          <Metadata author={ author } date={ date } />
          <Card className="py-3">
              <div>submitted emailed to</div>
              <div className="text-base text-right text-primary">tadahiroueta@gmail.com</div>
          </Card>
          <Card className="text-3xl font-semibold text-center text-primary">THANK YOU!</Card>
      </div>
  </ArticleStructure>
)}

/** where people can submit articles */
export default function Write() {
    const [ markdown, setMarkdown ] = useState("");
    const [ author, setAuthor ] = useState("<Name Name>");
    const [ date, setDate ] = useState("mm/dd/yyyy");
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    
    const markdownReference = useRef();
    const authorReference = useRef();
    const dateReference = useRef();

    useEffect(() => {
      const fetchContent = async term => {
        const user = await app.logIn(credentials);
        // get article and links in parallel
        Promise.all([ user.functions.getArticle(term), user.functions.getTerms() ])
          // implement links and set content
          .then(([ article, terms ]) => 
            setMarkdown(addLinks(article.markdown, terms.terms, term))
          )
          .catch(() => fetchContent("404"))
      }
      fetchContent("write")
    }, []);

    useEffect(() => 
      [ markdownReference, authorReference, dateReference ].forEach(updateHeight), 
      [ markdown, author, date ]
    );

    const updateHeight = (reference, minHeight="auto") => {
      reference.current.style.height = minHeight;
      reference.current.style.height = `${reference.current.scrollHeight}px`;
    }

    const handleClick = () => {
      app.logIn(credentials)
        .then(user => user.functions.uploadArticle(markdown, author, date))
        .then(() => setIsSubmitted(true))
        .catch(() => alert("Fuck."))
    }

    return isSubmitted ? <Submitted markdownText={ markdown } author={ author } date={ date } /> : (
      <ArticleStructure className="space-x-12 w-min">

        <div className="space-y-7">
          <Markdown markdownText={ markdown } />
          <Card className="float-right !py-5">

            <div className="text-xl flex space-x-3 items-baseline">
              <div>by</div> 
              <textarea 
                ref={ authorReference } 
                value={ author } 
                onChange={ e => { setAuthor(e.target.value); updateHeight(authorReference, "2.5rem"); }} 
                className="w-64 bg-transparent text-3xl font-semibold text-primary resize-none focus:outline-none" 
              />
            </div>
            <textarea 
              ref={ dateReference } 
              value={ date } 
              onChange={ e => { setDate(e.target.value); updateHeight(dateReference); }} 
              className="float-right text-right !h-7 resize-none focus:outline-none" 
            />

          </Card>
        </div>

        <div className="space-y-5 h-min">
          <textarea 
            ref={ markdownReference } 
            value={ markdown } 
            onChange={ e => { setMarkdown(e.target.value); updateHeight(markdownReference); }} 
            className="px-7 py-6 w-[40rem] text-gray-500 resize-none focus:outline-none" 
          />
          <button onClick={ handleClick } className="float-right">
            <Card className="!px-4 w-min text-primary font-semibold text-3xl">Submit</Card>
          </button>
        </div>

      </ArticleStructure>
)}