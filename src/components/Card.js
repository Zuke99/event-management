import React from 'react'
import newevent from "../assets/newevent.jpg";
import style from  "../styling/cssstyling.module.css";
function Card() {

 // const { message } = useSelector(state => state.message);


  
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
    <h3 className={style["movie-title"]}>Event Name</h3>
    <p className={style["movie-info"]}>Date: </p>
    <p className={style["movie-info"]} >Description:</p>
  </div>
</div>
    </div>
  )
}

export default Card
