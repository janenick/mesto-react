import React from 'react';

function ImagePopup(props) {
  return (
    <div className="popup popup_type_img">
      <div className="popup__img-container">
        <button type="button" className="popup__btn-close"></button>

        <img className="popup__img" src="#" alt="" />
        <p className="popup__caption"></p>
      </div>
    </div>
);
}

export default ImagePopup;