import React from 'react'
import newevent from "../assets/newevent.jpg";
import style from  "../styling/cssstyling.module.css";
function Card() {
  return (
    <div>
      <div className={style["movie-card"]}>
  <div className={style["movie-image-container"]}>
    <img src={newevent} alt="Movie Poster" className={style["movie-image"]} />
    <div className={style["overlay"]}>
      <button className={style["book-button"]}>Book Now</button>
    </div>
  </div>
  <div className={style["movie-details"]}>
    <h3 className={style["movie-title"]}>Singing Event</h3>
    <p className={style["movie-info"]}>Date: August 31, 2023</p>
    <p className={style["movie-info"]}>Category: Action, Adventure</p>
  </div>
</div>
    </div>
  )
}

export default Card
