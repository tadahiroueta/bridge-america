import { useState } from 'react';

import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/outline";
import { 
  HandThumbUpIcon as HandThumbUpIconSolid, 
  HandThumbDownIcon as HandThumbDownIconSolid
} from "@heroicons/react/24/solid";

import { likeSort } from '../utils';
import AddComment from './AddComment';

const iconSize = "h-6 w-6"

/** comment, init? */
export default function Comment({ comment, onUpdate }) { 
  const [ isLiked, setIsLiked ] = useState();
  const [ isReplying, setIsReplying ] = useState(false);

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
    <div className="flex flex-col space-y-6">

        <div className='flex justify-center space-x-20'>

        {/* country flag */}
        <div className={ `rounded-full !w-20 h-20 fi fi-${ comment.country } fis` } />

        {/* right side */}
        <div className='flex-grow'>

          {/* text */}
          <div className="py-4 px-7 bg-white flex flex-col space-y-3">
            <div className="text-primary">{ comment.grade + " - " + comment.school }</div>
            <div>{ comment.message }</div>
          </div>

          {/* underneath */}
          <div className="my-3 mx-7 flex space-x-3">
            
            {/* thumbs up */}
            <button onClick={ () => !isLiked ? handleLike(true) : handleLike() }>
              { !isLiked ? <HandThumbUpIcon className={ iconSize } /> :
                <HandThumbUpIconSolid className={ iconSize + " text-green-500" } /> }
            </button>
            
            {/* like count */}
            { isLiked == null ? <div className='font-mono'>{ comment.likes }</div> :
              isLiked ? 
                <div className='text-green-500 font-mono'>{ comment.likes }</div> :
                <div className='text-red-500 font-mono'>{ comment.likes }</div> }

            {/* thumbs down */}
            <button onClick={ () => isLiked !== false ? handleLike(false) : handleLike() }>
              { isLiked !== false ? <HandThumbDownIcon className={ iconSize } /> :
                <HandThumbDownIconSolid className={ iconSize + " text-red-500" } />}
            </button>

            <button onClick={ () => setIsReplying(true) }>Reply</button>

          </div>

        </div>

      </div>

      {/* replies */}
      <div className="ml-20 flex flex-col">
        { isReplying ? <AddComment onAdd={ add } /> : null }
        { comment.replies.map((comment, i) => 
            <Comment comment={ comment } onUpdate={ reply => update(reply, i) } 
              key={ i } />)}
      </div>

    </div>
)}
