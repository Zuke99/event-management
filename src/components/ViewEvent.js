import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { registerEvent } from '../redux/slice/registerEventSlice';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { approveEvent } from '../redux/slice/eventSlice';
import styles from "../styling/view-event.module.css";


function ViewEvent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [navigateAbout, setNavigateAbout] = useState(false);
    const [buttonName, setButtonName] = useState("Boot Ticket");
    const approveState = useSelector((state) => state.event)
    useEffect(() => {
        dispatch(isLoggedIn())
          .unwrap()
          .then((result) => {
            console.log("About", result);
          })
          .catch((error) => {
            navigate("/login");
            console.log("AboutReject", error);
          });

          if(localStorage.getItem('navigate')==='about'){
            setNavigateAbout(true);
            setButtonName("Approve Event");

          }

        }, [dispatch,navigate]);

    const state = useSelector((state) => state.registerEvent);
    const viewEvent = localStorage.getItem('viewEvent');
    
    
    let allDetails = JSON.parse(viewEvent);
    allDetails = allDetails.allDetails;
    const onButtonClickHandler = () =>{
      const data = {
        eventId : allDetails._id
     }

      if(navigateAbout === false){
    
        dispatch(registerEvent(data));
        alert(state.message);
        navigate("/")
    } else {
     
        dispatch(approveEvent(data))
        .unwrap()
        .then((result) => {
          alert(approveState.message)
          navigate("/approve-events")
        })
       
    }
        


        

    }
  return (
    <div className='container'>
       <div className="m-auto text-center">
        {/* <img className='w-100' src={allDetails? allDetails?.posterImage: ""} alt="Poster" /> */}
        <img className='w-50' src={allDetails.posterImage} alt="Poster" />
      </div>
      <div className='d-flex flex-wrap justify-content-between align-items-start px-3 my-2 mx-3'>
        <div className='col-7'>
        <div className='d-flex justify-content-start align-items-start my-3'>
            <h3 className={`fs-5 m-0 p-0 fw-bolder ${styles["event-head1"]}`}>{"Title: "}</h3>
            <p className={`m-0 p-0 ms-2 fs-6 fw-normal`}>{allDetails?allDetails?.name:"Loading..."}</p>
          </div>
        <div className='d-flex justify-content-start align-items-start my-3'>
            <h3 className={`fs-5 m-0 p-0 fw-bolder ${styles["event-head1"]}`}>{"Description: "}</h3>
            <p className={`m-0 p-0 ms-2 fs-6 fw-normal`}>{allDetails?allDetails?.description:"..."}</p>
          </div>
          <div className='d-flex justify-content-start align-items-start my-3'>
            <h3 className={`fs-5 m-0 p-0 fw-bolder ${styles["event-head1"]}`}>{"Event Date: "}</h3>
            <p className={`m-0 p-0 ms-2 fs-6 fw-normal`}>{allDetails?allDetails?.date?.slice(0,10):"..."}</p>
          </div>
          <div className='d-flex justify-content-start align-items-start my-3'>
            <h3 className={`fs-5 m-0 p-0 fw-bolder ${styles["event-head1"]}`}>{"Time: "}</h3>
            <p className={`m-0 p-0 ms-2 fs-6 fw-normal`}>{` ${allDetails?allDetails?.start_time:"..."} To: ${allDetails?allDetails?.end_time:"..."}`}</p>
          </div>
          <div className='d-flex justify-content-start align-items-start my-3'>
            <h3 className={`fs-5 m-0 p-0 fw-bolder ${styles["event-head1"]}`}>{"Venue: "}</h3>
            <p className={`m-0 p-2 ms-2 fs-6 fw-normal border border-info rounded-2`}>{allDetails?allDetails?.venue:"..."}</p>
          </div>
          <div className='d-flex justify-content-start align-items-start my-3'>
            <h3 className={`fs-5 m-0 p-0 fw-bolder ${styles["event-head1"]}`}>{"About: "}</h3>
            <p className={`m-0 p-0 ms-2 fs-6 fw-normal`}>{allDetails?allDetails?.about:"..."}</p>
          </div>
          <div className='d-flex flex-wrap justify-content-start align-items-start my-3'>
            <h3 className={`fs-5 m-0 p-0 fw-bolder ${styles["event-head1"]}`}>{"Tags: "}</h3>
            <div className='col-9 d-flex flex-wrap'>
            {allDetails&&allDetails?.tags?.map((data, index) => (
              <span className={styles["event-tag"]} key={index}>{`#${data}`}</span>
            )) }
          </div>
          </div>
        </div>
        <div className='col-5'>
        <div className='d-flex justify-content-start align-items-start my-3'>
            <h3 className={`fs-5 m-0 p-0 fw-bolder ${styles["event-head1"]}`}>{"Category: "}</h3>
            <p className={`m-0 ms-2 fs-6 fw-normal ${styles["event-category"]}`}>{allDetails?allDetails?.category:"..."}</p>
          </div>
          <div className='d-flex justify-content-start align-items-start my-3'>
            <h3 className={`fs-5 m-0 p-0 fw-bolder ${styles["event-head1"]}`}>{"Seats Left: "}</h3>
            <p className={`m-0 ms-2 fs-6 fw-normal`}>{allDetails?allDetails?.seats:"..."}</p>
          </div>
          <div className='d-flex justify-content-start align-items-start my-3'>
            <h3 className={`fs-5 m-0 p-0 fw-bolder ${styles["event-head1"]}`}>{"Event Owner: "}</h3>
            <p className={`m-0 ms-2 fs-6 fw-normal`}>{allDetails?allDetails?.owner:"..."}</p>
          </div>
          <div className='d-flex justify-content-start align-items-start my-3'>
            <h3 className={`fs-5 m-0 p-0 fw-bolder ${styles["event-head1"]}`}>{"Organization: "}</h3>
            <p className={`m-0 ms-2 fs-6 fw-normal`}>{allDetails?allDetails?.organisation:"..."}</p>
          </div>
        </div>
        <div className='col-12 m-auto text-center'>
          <button className='btn btn-success' onClick={onButtonClickHandler}>{buttonName}</button>
        </div>
      </div>
  </div>
  )
}

export default ViewEvent
