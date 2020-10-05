import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState();
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState();
  const [isImageCardPopupOpen, setIsImageCardPopupOpen] = React.useState();
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }


  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }


  function handleCardClick(card) {
    setSelectedCard({...card});
    setIsImageCardPopupOpen(true);
  }


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsImageCardPopupOpen(false);
    setIsSubmitPopupOpen(false);

    setSelectedCard({});
  }


  return (
    <body className='page'>
      <div className='page__container'>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <PopupWithForm
          name='profile'
          title='Редактировать профиль'
          submitName='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <label className='popup__form-field'>
            <input id='name-input' name='popup__input-name' type='text' placeholder='Имя' className='popup__input popup__input_type_name' required minLength='2' maxLength='40' />
            <span id='name-input-error' className='popup__input-error'></span>
          </label>
          <label className='popup__form-field'>
            <input id='status-input' name='popup__input-status' type='text' placeholder='Вид деятельности' className='popup__input popup__input_type_status' required minLength='2' maxLength='200' />
            <span id='status-input-error' className='popup__input-error'></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name='new-place'
          title='Новое место'
          submitName='Сохранить'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <label className='popup__form-field'>
            <input id='new-place-name-input' name='popup__input-new-place-name' type='text' placeholder='Название' className='popup__input popup__input_type_new-place-name' required minLength='1' maxLength='30' />
            <span id='new-place-name-input-error' className='popup__input-error'></span>
          </label>
          <label className='popup__form-field'>
            <input id='new-place-img-input' name='popup__input-new-place-img' type='url' placeholder='Ссылка на картинку' className='popup__input popup__input_type_new-place-img' required />
            <span id='new-place-img-input-error' className='popup__input-error'></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name='avatar'
          title='Обновить аватар'
          submitName='Сохранить'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <label className='popup__form-field'>
            <input id='avatar-input' name='popup__input-avatar' type='url' placeholder='Ссылка на картинку' className='popup__input popup__input_type_avatar' required />
            <span id='avatar-input-error' className='popup__input-error'></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name='delete-submit'
          title='Вы уверены?'
          submitName='Да'
          isOpen={isSubmitPopupOpen}
          onClose={closeAllPopups}>
        </PopupWithForm>

        <ImagePopup
          name='img'
          isOpen={isImageCardPopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}>
        </ImagePopup>


        <template id='element-template' className='element-template'>
          <div className='element'>
            <div className='element__container'>
              <button type='button' className='element__btn-trash'></button>
              <img className='element__img' src='#' alt='' />
            </div>
            <div className='element__info'>
              <h2 className='element__title'></h2>
              <div className='element__like-group'>
                <button type='button' className='element__btn-like'></button>
                <p className='element__like-sum'></p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </body>
  );
}

export default App;
