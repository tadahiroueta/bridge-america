import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { app, credentials } from '../mongo';
import { addLinks } from '../utils';
import { ArticleStructure, Markdown, Metadata } from '../components';

export default function Article() {
  const [content, setContent] = useState({})
  
  let { term } = useParams()

  useEffect(() => { 
    const fetchContent = async term => {
      const user = await app.logIn(credentials);
      // get article and links in parallel
      Promise.all([ user.functions.getArticle(term), user.functions.getTerms() ])
        // implement links and set content
        .then(([ article, terms ]) => setContent({
          ...article, markdown: addLinks(article.markdown, terms.terms, term)
        }))
        .catch(() => fetchContent("404"))
    }
    fetchContent(term)
  }, [term])

  return (
    <ArticleStructure>
      <Markdown markdownText={ content.markdown } />
      { content.author && content.date ? <Metadata author={ content.author } date={ content.date } /> : null }
    </ArticleStructure>
)}