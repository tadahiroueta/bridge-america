import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { HandThumbUpIcon, HandThumbDownIcon, FlagIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid, HandThumbDownIcon as HandThumbDownIconSolid } 
  from "@heroicons/react/24/solid";

import { app, credentials } from '../mongo';
import { addLinks, updateHeight } from '../utils';
import { ArticleStructure, Markdown, Metadata, SingleStructure } from '../components';
import countries from '../data/countries.json';

const comments = [
  {
    _id: "0",
    country: "us",
    grade: "Senior",
    school: "Lebanon Trail High School",
    message: "The hardest choices require the strongest wills",
    likes: 12,
    replies: [
      {
        _id: "1",
        parentId: "0",
        country: "in",
        grade: "Parent",
        school: "Reedy High School",
        message: "Shut up",
        likes: 4,
        replies: []
}]}]

const iconSize = "h-6 w-6";

const likeSort = (a, b) => a.likes < b.likes ? 1 : -1;

function AddComment() {
  const [country, setCountry] = useState();
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState();
  const [message, setMessage] = useState();

  const [previousSchool, setPreviousSchool] = useState();

  const schoolRef = useRef();
  const messageRef = useRef();

  useEffect(() => updateHeight(schoolRef), [ school, message ])
  useEffect(() => updateHeight(messageRef), [ message ])

  useEffect(() => {
    if (previousSchool || !school) return;
    
    setPreviousSchool("select");
    setSchool(school + " High School")
  }, [ school ])

  useEffect(() => {
    if (previousSchool === "select" && schoolRef.current) 
      schoolRef.current.setSelectionRange(1, 1) 
  }, [ school ])

  const handleCancel = () => {
    setCountry(null);
    setGrade(null);
    setSchool(null);
    setMessage("");
  }

  const handleSubmit = () => {
    console.log(country, grade, school, message)
  }

  return (
    <div className="flex justify-center space-x-20">

      {/* flag */}
      <button onClick={ () => setCountry(true) } 
          className="flex-none rounded-full w-20 h-20 flex justify-center items-center 
            bg-white">

          { !country || country === true ? <FlagIcon className="h-6 w-6" />
            : <div className={ `rounded-full !w-full h-full fi fi-${ country } fis` } />}
      </button>


      <div className="flex-grow">
        { country !== true ? (
          <div className="py-4 px-7 bg-white flex flex-col space-y-3">
            { !message ? <div className='text-primary'>Grade - High School</div> : (
              <div className='text-primary flex space-x-2 border-none'>
                <select value={ grade } onChange={ e => setGrade(e.target.value) }>
                  <option value={ null }>Grade</option>
                  {[ "Freshman", "Sophomore", "Junior", "Senior", "Parent", "Teacher",
                      "Alumni", "Pre-High School", "Other" ].map(grade =>
                      <option key={ grade } value={ grade }>{ grade }</option>)}
                </select>
                <div>-</div>
                <textarea
                  ref={ schoolRef }
                  placeholder='High School'
                  value={ school }
                  onChange={ e => { setPreviousSchool(school); setSchool(e.target.value) } }
                  className='flex-grow resize-none focus:outline-none placeholder:italic placeholder-typing'
                />
              </div>
            )}
            <textarea 
              ref={ messageRef }
              placeholder='Add comment...' 
              value={ message }
              onChange={ e => setMessage(e.target.value) }
              className='text-typing placeholder-typing resize-none focus:outline-none placeholder:italic' 
            />
          </div>
        ) : (
          // select flag
          <div className="pb-2 pr-2 flex-grow bg-white">
            { countries.map(country => 
              <span
                onClick={ () => setCountry(country) } key={ country }
                className={ `mt-2 ml-2 rounded-full !w-8 h-8 fi fi-${ country } fis cursor-pointer` } />)}
          </div>
        )}
        { message ? (
          <div className="my-3 mx-7 flex space-x-2">
            { !country || !grade || !school ? 
              <div className='text-red-500'>Add required fields*</div> : null }
            <div onClick={ handleCancel }>Cancel</div>
            <div onClick={ handleSubmit }>Submit</div>
          </div>
        ) : null }
      </div>

    </div>
)}

function Comment({ comment, className }) { 
  const [isLiked, setIsLiked] = useState();
  
  return (
    <div className={ "flex flex-col space-y-6 " + className }>
      <div className='flex justify-center space-x-20'>
        {/* country flag */}
        <div className={ `rounded-full !w-20 h-20 fi fi-${ comment.country } fis` } />

        <div className='flex-grow'>
          
          <div className="py-4 px-7 bg-white flex flex-col space-y-3">
            <div className="text-primary">{ comment.grade + " - " + comment.school }</div>
            <div>{ comment.message }</div>
          </div>
          
          <div className="my-3 mx-7 flex space-x-3">
            
            {/* thumbs up */}
            <button onClick={ () => !isLiked ? setIsLiked(true) : setIsLiked() }>
              { !isLiked 
                ? <HandThumbUpIcon className={ iconSize } /> 
                : <HandThumbUpIconSolid className={ iconSize + " text-green-500" } />}
            </button>
            
            { isLiked == null ? <div className='font-mono'>{ comment.likes }</div>
              : isLiked ? <div className='text-green-500 font-mono'>{ comment.likes + 1 }</div>
              : <div className='text-red-500 font-mono'>{ comment.likes - 1 }</div> }

            {/* thumbs down */}
            <button onClick={ () => isLiked != null ? setIsLiked(false) : setIsLiked() }>
              { isLiked !== false
                ? <HandThumbDownIcon className={ iconSize } />
                : <HandThumbDownIconSolid className={ iconSize + " text-red-500" } />}
            </button>

            <button>Reply</button>

          </div>

        </div>
      </div>

      { comment.replies.sort(likeSort)
        .map(comment => <Comment className="ml-20" comment={ comment } key={ comment.message } />)
      }
    </div>
)}

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

  const iffNot404 = component => content.author && content.date ? component : null;

  return (
    <SingleStructure>
      <ArticleStructure>
        <Markdown markdownText={ content.markdown } />
        { iffNot404(<Metadata author={ content.author } date={ content.date } />) }
      </ArticleStructure>
      { iffNot404(
          <div className="flex flex-col space-y-10">
            <AddComment />
            { comments.sort(likeSort).map(comment => 
              <Comment comment={ comment } key={ comment.message } />)}
          </div>
      )}
    </SingleStructure>
)}