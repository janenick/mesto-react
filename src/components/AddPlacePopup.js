import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const nameInput = useRef(null);
  const linkInput = useRef(null);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    e.target.reset();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: nameInput.current,
      link: linkInput.current,
    });
  }


  function handleNameChange(event) {
    nameInput.current = event.target.value;
  }


  function handleLinkChange(event) {
    linkInput.current = event.target.value;
  }


  return (
    <PopupWithForm
      name='new-place'
      title='Новое место'
      submitName='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__form-field'>
        <input ref={nameInput} onChange={handleNameChange} id='new-place-name-input' name='popup__input-new-place-name' type='text' placeholder='Название' className='popup__input popup__input_type_new-place-name' required minLength='1' maxLength='30' />
        <span id='new-place-name-input-error' className='popup__input-error'></span>
      </label>
      <label className='popup__form-field'>
        <input ref={linkInput} onChange={handleLinkChange} id='new-place-img-input' name='popup__input-new-place-img' type='url' placeholder='Ссылка на картинку' className='popup__input popup__input_type_new-place-img' required />
        <span id='new-place-img-input-error' className='popup__input-error'></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
