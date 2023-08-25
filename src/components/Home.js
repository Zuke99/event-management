import food from "../assets/food.png";
import movie from "../assets/movie.png";
import sports from "../assets/sports.png";
import gaming from "../assets/gaming.png";
import music from "../assets/music.png";
import openmic from "../assets/openmic.png";
import workshop from "../assets/workshop.png";
import comedy from "../assets/comedy.png";
import event from "../assets/event.jpg";
import style from "../styling/cssstyling.module.css";
import Card from "./Card";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { getEvent } from "../actions/home";
function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  const events = useSelector(state => state.homeReducer);
  console.log("HomePage",events);
  return (
    <div className={`page ${style.page}`}>
      <div className="Banner">
        <img src={event} alt="profile-img" className={style["img-banner"]} />
      </div>
      <div className={style["center-container"]}>
        <h3>Explore Categories</h3>
      </div>
      <div className={style["category-div"]}>
        <div className={style["category-row"]}>
          <div className={style["category-item-div"]}>
            <img src={food} alt="profile-img" className={style["img"]} />
            <span>Food Festival</span>
          </div>

          <div className={style["category-item-div"]}>
            <img src={movie} alt="profile-img" className={style["img"]} />
            <span>Movies</span>
          </div>
          <div className={style["category-item-div"]}>
            <img src={comedy} alt="profile-img" className={style["img"]} />
            <span>Standup Comedy</span>
          </div>
          <div className={style["category-item-div"]}>
            <img src={music} alt="profile-img" className={style["img"]} />
            <span>Music</span>
          </div>
        </div>

        <div className={style["category-row"]}>
          <div className={style["category-item-div"]}>
            <img src={sports} alt="profile-img" className={style["img"]} />
            <span>Sports</span>
          </div>
          <div className={style["category-item-div"]}>
            <img src={gaming} alt="profile-img" className={style["img"]} />
            <span>Gaming</span>
          </div>
          <div className={style["category-item-div"]}>
            <img src={openmic} alt="profile-img" className={style["img"]} />
            <span>Open Mic</span>
          </div>
          <div className={style["category-item-div"]}>
            <img src={workshop} alt="profile-img" className={style["img"]} />
            <span>Workshop</span>
          </div>
        </div>
      </div>
      <div className="container my-3" >
      <div className='row' >

      
      {console.log("cards",events)}
      {events.map(event => 
        <div className='col-md-3 ' key={event._id}>
            <Card name={event?.name} date={event?.date} description={event?.description} id={event._id}/>
          </div>
        
      )}
        
   


      </div>
      </div>
    </div>
  );
}

export default Home;
