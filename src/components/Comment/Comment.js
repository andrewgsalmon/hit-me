import React from 'react'
import './Comment.scss'

function Comment({ artistComment }) {
  let { comment, name, created_at } = artistComment

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  const formattedDate = formatDate(created_at);

  return (
    <article className='comment'>
      <div className='comment__container'>
        <div className='comment__avatar'></div>
        <div className='comment__info'>
          <div className='comment__name-date--desktop'>
            <span className='comment__name'>{name}</span>
            <span>{formattedDate}</span>
          </div>
          <p className='comment__text'>{comment}</p>
        </div>
      </div>
    </article>
  )
}

export default Comment