import React from 'react';

const Card = (props) => {
  return (< div className='element'>
    <div className='element__container'>
      <button type='button' className='element__btn-trash'></button>
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