import { useState, useEffect, useRef } from "react"

import { FlagIcon } from "@heroicons/react/24/outline"

import { updateHeight } from "../utils";
import { countries } from '../data';

/** write a comment without account */
export default function AddComment({ onAdd }) {
    const [ country, setCountry ] = useState();
    const [ grade, setGrade ] = useState("");
    const [ school, setSchool ] = useState();
    const [ message, setMessage ] = useState();
  
    // helper for school input 
    const [ previousSchool, setPreviousSchool ] = useState();
  
    const schoolRef = useRef();
    const messageRef = useRef();
  
    useEffect(() => updateHeight(schoolRef), [ school, message ]) // message as initial
    // also update message after reappering
    useEffect(() => updateHeight(messageRef), [ message, country ]) 
  
    // automatically add "High School" to school name
    useEffect(() => {
      if (previousSchool || !school) return;
      
      setPreviousSchool("cursor");
      setSchool(school + " High School")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ school ])
  
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
      <div className="flex justify-center space-x-20">
  
        {/* flag */}
        <button onClick={ () => setCountry(true) } className="flex-none rounded-full w-20 h-20 
          flex justify-center items-center bg-white">
          {/* flag placeholder/chosen flag */}
          { !country || country === true ? <FlagIcon className="h-6 w-6" />
            : <div className={ `rounded-full !w-full h-full fi fi-${ country } fis` } />}
        </button>
  
        {/* right side */}
        <div className="flex-grow">
          { country === true ? (
            // select flag
            <div className="pb-2 pr-2 flex-grow bg-white">
              { countries.map(country => 
                <span onClick={ () => setCountry(country) } key={ country }
                  className={ `mt-2 ml-2 rounded-full !w-8 h-8 fi fi-${ country } fis 
                  cursor-pointer` } />
              )}
            </div>
          
          ) : (
            // text inputs
            <div className="py-4 px-7 bg-white flex text-primary flex-col space-y-3">
  
              { !message ? <div>Grade - High School</div> : ( // placeholders
  
                <div className='flex space-x-2 border-none'>
  
                  {/* grade input */}
                  <select value={ grade } onChange={ e => setGrade(e.target.value) }>
                    <option value={ null }>Grade</option>
                    {[ "Freshman", "Sophomore", "Junior", "Senior", "Parent", "Teacher",
                      "Alumni", "Pre-High School", "Other" ].map(grade =>
                      <option key={ grade } value={ grade }>{ grade }</option>
                    )}
                  </select>
  
                  <div>-</div>
  
                  {/* school input */}
                  <textarea ref={ schoolRef } placeholder='High School' value={ school }
                    onChange={ handleSchoolChange } className='flex-grow resize-none 
                    focus:outline-none placeholder:italic placeholder-typing' />
  
                </div>
              )}
  
              {/* message input */}
              <textarea ref={ messageRef } placeholder='Add comment...' value={ message }
                onChange={ e => setMessage(e.target.value) } className='text-typing 
                placeholder-typing resize-none focus:outline-none placeholder:italic' />
            
            </div>
          )}
          {/* underneath */}
          { !message ? null : (
            <div className="my-3 mx-7 flex space-x-4">
  
              { isSubmittable() ? null : 
                <div className='text-red-500'>Please fill all fields</div> }
  
              <div onClick={ handleCancel }>Cancel</div>
              <div onClick={ handleSubmit }>Submit</div>
  
            </div>
          )}
        </div>
  
      </div>
  )}
  