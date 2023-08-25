import React from 'react'
import newevent from "../assets/newevent.jpg";
import style from  "../styling/cssstyling.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { eventRegister } from '../actions/home';
function Card(props) {

 // const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onClick = () =>{
    console.log("Clicked");
    dispatch(eventRegister(props._id))
    .then(() =>{
      console.log("hmmm")
    })
  }
  return (
    <div>
      <div className={style["movie-card"]}>
  <div className={style["movie-image-container"]}>
    <img src={newevent} alt="Movie Poster" className={style["movie-image"]} />
    <div className={style["overlay"]}>
      <button className={style["book-button"]} onClick={onClick}>Book Now</button>
    </div>
  </div>
  <div className={style["movie-details"]}>
    <h3 className={style["movie-title"]}>{props.name}</h3>
    <p className={style["movie-info"]}>Date: {props.date}</p>
    <p className={style["movie-info"]} >Description:{props.description}</p>
  </div>
</div>
    </div>
  )
}

export default Card
