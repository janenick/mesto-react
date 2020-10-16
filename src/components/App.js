import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { CurrentUserContext } from '../contexts/currentUserContext';
import api from '../utils/api.js';
import { renderError } from '../utils/utils.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isImageCardPopupOpen, setIsImageCardPopupOpen] = React.useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [cards, setCards] = React.useState([]);

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
    setSelectedCard({ ...card });
    setIsImageCardPopupOpen(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch((err) => {
        renderError(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.removeCard(card._id).then(() => {
      // Создаем копию массива, исключив из него удалённую карточку
      const newCards = cards.filter((c) => c._id !== card._id);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch((err) => {
        renderError(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    api.changeUserInfo({ name, about }).then(data => {
      setCurrentUser(data);
    })
      .catch((err) => {
        renderError(`Ошибка: ${err}`);
      });
    closeAllPopups();
  }


  function handleUpdateAvatar({ avatar }) {
    api.changeAvatar({ avatar }).then(data => {
      setCurrentUser(data);
    })
      .catch((err) => {
        renderError(`Ошибка: ${err}`);
      });
    closeAllPopups();
  }


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsImageCardPopupOpen(false);
    setIsSubmitPopupOpen(false);

    setSelectedCard({});
  }

  React.useEffect(() => {
    api.getUserInfo().then((initialUserInfo) => {

      setCurrentUser(initialUserInfo);
    }
    )
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    api.getCardsFromServer().then((initialCardList) => {
      const cardList = initialCardList.map(card => card);
      setCards(cardList);
    })
      .catch((err) => console.error(err));
  }, []);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          <Header />
          <Main
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

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

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

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
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
