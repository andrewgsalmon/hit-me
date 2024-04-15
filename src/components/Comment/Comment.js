import React from 'react'
import './Comment.scss'

function Comment({artistComment}) {
  let {comment, name} = artistComment

  return (
    <article className='comment'>
      <div className='comment__container'>
        <div className='comment__avatar'></div>
        <div className='comment__info'>
          <span className='comment__name'>{name}</span>
          <p className='comment__text'>{comment}</p>
        </div>
      </div>
    </article>
  )
}

export default Comment