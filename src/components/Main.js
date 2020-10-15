import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';
import initialAvatar from '../images/profile/avatar-cousteau.jpg';
import { CurrentUserContext } from '../contexts/currentUserContext';

function Main(props) {
  // Подписываемся на контекст TranslationContext
  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    console.log("del card: ", card._id);
    /*// Отправляем запрос в API и получаем обновлённые данные карточки
    api.removeCard(card._id).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });*/
  }

  React.useEffect(() => {
    api.getCardsFromServer().then((initialCardList) => {
      const cardList = initialCardList.map(card => card);
      setCards(cardList);
    })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="content page__content">
      <section className="profile section">
        <div className="profile__main">
          <div className="profile__avatar-box" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} >

          </div>
          <div className="profile__info">
            <div className="profile__info-editor">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__btn-edit" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__status">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__btn-add" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements section">
        {cards.map((card) =>

          <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>

        )}
      </section>
    </main>
  );
}

export default Main;