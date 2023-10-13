import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { addLinks, app, credentials, likeSort, updateHeight } from '../utils';
import { countries } from '../data';

import { FlagIcon, HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/outline"
import { HandThumbUpIcon as HandThumbUpIconSolid, HandThumbDownIcon as HandThumbDownIconSolid } from "@heroicons/react/24/solid"
import Markdown from "./Markdown";

function AddComment({ onAdd }) {
  const [country, setCountry] = useState();
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState();
  const [message, setMessage] = useState();
  // helper for school input
  const [previousSchool, setPreviousSchool] = useState();

  const schoolRef = useRef();
  const messageRef = useRef();
  
  // message as initial
  useEffect(() => updateHeight(schoolRef), [school, message])
  // also update message after reappering
  useEffect(() => updateHeight(messageRef), [message, country])

  // automatically add "High School" to school name
  useEffect(() => {
    if (previousSchool || !school) return;
    
    setPreviousSchool("cursor");
    setSchool(school + " High School")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [school])

  // keep cursor at user input
  useEffect(() => {
    if (previousSchool !== "cursor" || !schoolRef.current) return;
      
    setPreviousSchool("inactive")
    schoolRef.current.setSelectionRange(1, 1) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ previousSchool ])

  const isSubmittable = () => country && grade && school;

  // handle change with helper
  const handleSchoolChange = e => {
    setPreviousSchool(school);
    setSchool(e.target.value);
  }

  const handleCancel = () => {
    setCountry(null);
    setGrade("");
    setSchool(null);
    setMessage("");
  }

  const handleSubmit = () => {
    if (!isSubmittable()) return;
    onAdd({ country, grade, school, message, likes: 0, replies: [] })
    handleCancel();
  }

  return (
    <div className="flex space-x-8">
      {/* flag */}
      <button onClick={ () => setCountry(true) } className="flex items-center justify-center flex-none w-16 h-16 rounded-full bg-ashes-100">
        { 
          !country || country === true ? 
          <FlagIcon className="w-6" /> : 
          <div className={ "rounded-full !w-full h-full fi fi-" + country + " fis" } />
        }
      </button>
      {/* right side */}
      <div className="flex-grow space-y-5">
        {/* white part */}
        { country === true ? (
          // select flag
          <div className="w-full pb-2 pr-2 bg-ashes-100">
            { countries.map(country => 
              <span onClick={ () => setCountry(country) } key={ country } className={ "mt-2 ml-2 rounded-full !w-8 h-8 fi fi" + country + " fis cursor-pointer" } />
            )}
          </div>
        ) : (
          // text
          <div className="w-full p-5 space-y-2.5 bg-ashes-100">
            { !message ? 
              // placeholder
              <div className="text-ashes-700">Grade - High School</div> :
              // header
              <div className="space-x-2 space-y-2 md:flex text-ashes-700">
                {/* grade */}
                <select value={ grade } onChange={ e => setGrade(e.target.value) }>
                  <option value={ null }>Grade</option>
                  {[
                    "Freshman",
                    "Sophomore",
                    "Junior",
                    "Senior",
                    "Parent",
                    "Teacher",
                    "Alumni",
                    "Pre-High School",
                    "Other"
                  ].map(grade => 
                    <option key={ grade } value={ grade }>{ grade }</option>
                  )}
                </select>
                {/* right side of header */}
                <div className="flex space-x-2">
                  <div>-</div>
                  {/* school */}
                  <textarea 
                    ref={ schoolRef } 
                    placeholder="High School" 
                    value={ school } 
                    onChange={ handleSchoolChange } 
                    className="flex-grow resize-none focus:outline-none placeholder:italic placeholder-ashes-500" 
                  />
                </div>
              </div>
            }
            {/* message */}
            <textarea 
              ref={ messageRef } 
              placeholder="Add comment..." 
              value={ message } 
              onChange={ e => setMessage(e.target.value) }
              className="pl-5 resize-none text-ashes-500 placeholder-ashes-500 focus:outline-none placeholder:italic"
            />
          </div>
        )}
        {/* underneath the white part */}
        { message && (
          <div className="flex flex-wrap space-x-4 pl-7">
            {/* invalid message */}
            { !isSubmittable() &&
              <div className="text-red-500">Please fill all fields</div> 
            }
            {/* buttons */}
            <div onClick={ handleCancel }>Cancel</div>
            <div onClick={ handleSubmit }>Submit</div>
          </div>
        )}
      </div>
    </div>
)}

function Comment({ comment, i, onUpdate }) {
  const [isLiked, setIsLiked] = useState();
  const [isReplying, setIsReplying] = useState(false);

  const handleLike = liked => {
    let likes = comment.likes
    if ((liked && isLiked == null) || (liked == null && isLiked === false)) 
      likes++;
    else if ((liked == null && isLiked === true) || (liked === false && isLiked == null))
      likes--;
    else if (liked && isLiked === false) likes += 2;
    else if (liked === false && isLiked) likes -= 2;

    setIsLiked(liked);
    onUpdate({ ...comment, likes })
  }

  const update = (reply, i) => {
    let replies = [ ...comment.replies ];
    replies[i] = reply;
    replies.sort(likeSort);

    onUpdate({ ...comment, replies });
  }

  const add = reply => {
    onUpdate({ ...comment, replies: [ ...comment.replies, reply ]})
    setIsReplying(false)
  }

  return (
    <div className="space-y-8">
      {/* actual comment */}
      <div className="flex space-x-8">
        {/* flag */}
        <div className={ "rounded-full h-16 !w-16 flex-none fi fi-" + comment.country + " fis" } />
        {/* right side */}
        <div className="flex-grow space-y-5">
          {/* white part */}
          <div className="p-5 space-y-2.5 bg-ashes-100">
            {/* header */}
            <div className="text-ashes-700">{ comment.grade + " - " + comment.school }</div>
            {/* message */}
            <div className="pl-5">{ comment.message }</div>
          </div>
          {/* underneath the white part */}
          <div className="flex space-x-2.5 pl-7">
            {/* thumbs up */}
            <button onClick={ () => !isLiked ? handleLike(true) : handleLike() }>
              { 
                !isLiked ? 
                <HandThumbUpIcon className="h-6" /> :
                <HandThumbUpIconSolid className="h-6 text-green-500" /> 
              }
            </button>
            {/* like count */}
            {
              isLiked == null ?
              <div className="font-mono">{ comment.likes }</div> :
              isLiked ?
              <div className="font-mono text-green-500">{ comment.likes }</div> :
              <div className="font-mono text-red-500">{ comment.likes }</div>
            }
            {/* thumbs down */}
            <button onClick={ () => isLiked !== false ? handleLike(false) : handleLike() }>
              {
                isLiked !== false ?
                <HandThumbDownIcon className="h-6" /> :
                <HandThumbDownIconSolid className="h-6 text-red-500" />
              }
            </button>
            {/* reply */}
            <button onClick={ () => setIsReplying(true) }>Reply</button>
          </div>
        </div>
      </div>
      {/* replies */}
      <div className="ml-20 space-y-8">
        { isReplying && <AddComment onAdd={ add } /> }
        { comment.replies.map((reply, i) =>
          <Comment comment={ reply } onUpdate={ reply => update(reply, i) } key={ i } />
        )}
      </div>
    </div>
)}

export default function Article() {
  const { term } = useParams()

  const [content, setContent] = useState({})

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
    fetchContent(term)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateComments = comments => {
    setContent({ ...content, comments }); // update locally

    // update database
    app.logIn(credentials)
      .then(user => user.functions.updateOne("articles", { title: term }, { $set: { comments }}));
  }

  const addComment = comment => updateComments([ ...content.comments, comment ]);
  
  const updateComment = (comment, i) => {
    let comments = [ ...content.comments ];
    comments[i] = comment;
    comments.sort(likeSort);
    updateComments(comments);
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-ashes-300">
      {/* center of screen */}
      <div className="w-full md:p-5 md:w-3/5 md:pr-44 md:pt-7">
        {/* article half */}
        <div className="w-full p-5 md:p-0">
          {/* box */}
          <Markdown
            term={ content.title }
            author={ content.author }
            date={ content.date }
            markdown={ content.markdown }
          />
        </div>
        {/* comments half */}
        { content.markdown && content.markdown !== "404" && (
          <div className="px-5 py-20 space-y-16">
            {/* add comment */}
            <AddComment onAdd={ addComment } />
            {/* comments */}
            { content.comments && content.comments.map((comment, i) => (
              <Comment comment={ comment } onUpdate={ comment => updateComment(comment, i) } key={ i } />
            ))}
          </div>
        )}
      </div>
    </div>
)}