import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { addLinks, app, credentials, likeSort } from '../utils';
import { ArticleStructure, Markdown, Metadata, SingleStructure } from '../elements';

import Comment from './Comment';
import AddComment from './AddComment';

/** (content from markdown) */
export default function Article() {
  const { title } = useParams()

  const [ content, setContent ] = useState({})

  // initial fetch
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateComments = comments => {
    setContent({ ...content, comments }); // update locally

    // update database
    app.logIn(credentials)
      .then(user => user.functions.updateOne("articles", { title }, { $set: { comments }}));
  }

  const addComment = comment => updateComments([ ...content.comments, comment ]);
  
  const updateComment = (comment, i) => {
    let comments = [ ...content.comments ];
    comments[i] = comment;
    comments.sort(likeSort);
    updateComments(comments);
  }

  // hide component if 404
  const iffNot404 = component => !content.author || !content.date ? null : component;

  return (
    <SingleStructure>

      <ArticleStructure>
        <Markdown markdownText={ content.markdown } />
        { iffNot404(<Metadata author={ content.author } date={ content.date } />) }
      </ArticleStructure>

      {/* comments */}
      { iffNot404(
          <div className="flex flex-col space-y-10">

            <AddComment onAdd={ addComment } />
            { !content.comments ? null : content.comments.map((comment, i) => 
                <Comment comment={ comment } 
                  onUpdate={ comment => updateComment(comment, i) } key={ i } /> )}
          </div>
      )}

    </SingleStructure>
)}