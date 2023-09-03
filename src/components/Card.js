import React from 'react'
import newevent from "../assets/newevent.jpg";
import style from  "../styling/cssstyling.module.css";
import { useDispatch } from 'react-redux';
import { viewEvent } from '../redux/slice/viewEventSlice';
import { useNavigate } from 'react-router-dom';
function Card(props) {

 // const { message } = useSelector(state => state.message);

const start_date = new Date(props.start_date);
const sd = start_date.getDate();
const sm = start_date.getMonth()+1;
const sy = start_date.getFullYear();

const end_date = new Date(props.end_date);
const ed = end_date.getDate();
const em = end_date.getMonth()+1;
const ey = end_date.getFullYear();

const dispatch = useDispatch();
const navigate = useNavigate();

const buttonClickHandler = async () =>{
  
  await dispatch(viewEvent(props));
  localStorage.removeItem('viewEvent');
  localStorage.setItem('viewEvent', JSON.stringify(props));
  navigate("/view-event");
 
}
  
  return (
    <div>
      <div className={style["movie-card"]}>
  <div className={style["movie-image-container"]}>
    <img src={props.allDetails.posterImage} alt="Movie Poster" className={style["movie-image"]} />
    <div className={style["overlay"]}>
      <button className={style["book-button"]} onClick={buttonClickHandler}>View Event</button>
    </div>
  </div>
  <div className={style["movie-details"]}>
    <h3 className={style["movie-title"]}>{props.name}</h3>
    <p className={style["movie-info"]}>Start Date: {sd}/{sm}/{sy}</p>
    {/* <p className={style["movie-info"]}>End Date: {ed}/{em}/{ey}</p> */}
    <p className={style["movie-info"]} >Description: {props.description}</p>
  </div>
</div>
    </div>
  )
}

export default Card
