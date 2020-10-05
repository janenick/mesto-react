import React from 'react';
import api from '../utils/api.js';
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
        likes: card.likes.length,
        name: card.name,
        alt: card.name,
        src: card.link,

      }));
      setCards(cardList);
    });
  }, [userName, userDescription, userAvatar, cards]);

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

      <section className="elements section"></section>

      <section className="elements section">
        {cards.map(({ id, ...card }) => (
                           
          < div className = 'element' key = {id}>
            <div className='element__container'>
              <button type='button' className='element__btn-trash'></button>
              <img className='element__img' src={card.src} alt={card.alt} />
            </div>
            <div className='element__info'>
              <h2 className='element__title'>{card.name}</h2>
              <div className='element__like-group'>
                <button type='button' className='element__btn-like'></button>
                <p className='element__like-sum'>{card.likes}</p>
              </div>
            </div>
          </div>
        )
        )}
      </section>
    </main>
  );
}

export default Main;