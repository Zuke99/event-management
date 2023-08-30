import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { registerEvent } from '../redux/slice/registerEventSlice';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { approveEvent } from '../redux/slice/eventSlice';

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
    <h1>Event Details</h1>
    <ul>
      {Object.keys(allDetails).map((property) => (
        <li key={property}>
          <strong>{property}:</strong> {allDetails[property]}
        </li>
      ))}
    </ul>
    <button onClick={onButtonClickHandler}>{buttonName}</button>
    <br/>
    
  </div>
  )
}

export default ViewEvent
