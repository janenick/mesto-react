import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    props.onUpdateAvatar({
      avatar: avatarRef.current/* Значение инпута, полученное с помощью рефа */,
    });
  }


  function handleAvatarChange(event) {
    avatarRef.current = event.target.value;
  }


  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      submitName='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__form-field'>
        <input id='avatar-input' name='popup__input-avatar' ref={avatarRef} onChange={handleAvatarChange} type='url' placeholder='Ссылка на картинку' className='popup__input popup__input_type_avatar' required />
        <span id='avatar-input-error' className='popup__input-error'></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;