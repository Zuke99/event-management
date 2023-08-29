import React from 'react'
import newevent from "../assets/newevent.jpg";
import style from  "../styling/cssstyling.module.css";
function Card(props) {

 // const { message } = useSelector(state => state.message);

const date = new Date(props.date);
const d = date.getDate();
const m = date.getMonth()+1;
const y = date.getFullYear();
  
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
    <h3 className={style["movie-title"]}>{props.name}</h3>
    <p className={style["movie-info"]}>Date: {d}/{m}/{y}</p>
    <p className={style["movie-info"]} >Description: {props.description}</p>
  </div>
</div>
    </div>
  )
}

export default Card
