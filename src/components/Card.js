import React from 'react';

const Card = (props) => {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (< div className='element'>
    <div className='element__container' onClick={handleClick}>
      <button type='button' className='element__btn-trash element__btn-trash_active'></button>
      <img className='element__img' src={props.card.src} alt={props.card.alt} />
    </div>
    <div className='element__info'>
      <h2 className='element__title'>{props.card.name}</h2>
      <div className='element__like-group'>
        <button type='button' className='element__btn-like'></button>
        <p className='element__like-sum'>{props.card.likes}</p>
      </div>
    </div>
  </div>
  );
};

export default Card;