import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { app, credentials } from '../mongo';
import { addLinks } from '../utils';
import { ArticleStructure, Markdown, Metadata } from '../components';

export default function Article() {
  const { title } = useParams()

  const [content, setContent] = useState({})

  useEffect(() => { 
    const fetchContent = async title => {
      const user = await app.logIn(credentials);
      // get article and links in parallel
      Promise.all([ 
        user.functions.findOne("articles", { title }), 
        user.functions.findOne("titles", { collection: "articles" })
      ])
        // implement links and set content
        .then(([ article, titles ]) => {
          if (!article) throw new Error("404")
          setContent({
            ...article, markdown: addLinks(article.markdown, titles.titles, title)
          })
        })
        .catch(() => fetchContent("404"))
    }
    fetchContent(title)
  }, [title])

  return (
    <ArticleStructure>
      <Markdown markdownText={ content.markdown } />
      { content.author && content.date ? <Metadata author={ content.author } date={ content.date } /> : null }
    </ArticleStructure>
)}