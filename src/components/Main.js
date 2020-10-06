import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';
import initialAvatar from '../images/profile/avatar-cousteau.jpg';

function Main(props) {
  const [userName, setUserName] = React.useState("Жак-Ив Кусто");
  const [userDescription, setUserDescription] = React.useState("Исследователь океана");
  const [userAvatar, setUserAvatar] = React.useState({ initialAvatar });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getAppInfo().then(([initialUserInfo, initialCardList]) => {

      setUserName(initialUserInfo.name);
      setUserDescription(initialUserInfo.about);
      setUserAvatar(initialUserInfo.avatar);

      const cardList = initialCardList.map((card) => ({
        id: card._id,
        name: card.name,
        src: card.link,
        alt: card.name,
        likes: card.likes.length
      }));
      setCards(cardList);
    })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="content page__content">
      <section className="profile section">
        <div className="profile__main">
          <div className="profile__avatar-box" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }} >

          </div>
          <div className="profile__info">
            <div className="profile__info-editor">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__btn-edit" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__status">{userDescription}</p>
          </div>
        </div>
        <button type="button" className="profile__btn-add" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements section">
        {cards.map((card) =>
          <Card key={card.id} card={card} onCardClick={props.onCardClick} />
        )}
      </section>
    </main>
  );
}

export default Main;