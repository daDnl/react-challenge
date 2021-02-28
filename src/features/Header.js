import React from 'react';

export const Header = () => {
  return (
    <div className="container-fluid rc-intro ">
      <div className="container justify-content-between ">
        <div className="row align-items-center no-gutters">
          <img className="rc-img col-3 no-gutters" src="images/logo.svg" alt="" />
          <div className="col-9">
            <h1 className="rc-title">React Challenge</h1>
            <p className="rc-description">Поиск и сортировка данных</p>
          </div>
        </div>
      </div>
    </div>
  )
}