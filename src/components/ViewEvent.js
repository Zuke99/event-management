import React, { useState } from 'react'
import imageUrl from "../assets/newevent.jpg"
import { useSelector } from 'react-redux'
import { registerEvent } from '../redux/slice/registerEventSlice';
import { useDispatch } from 'react-redux';

function ViewEvent() {

    const state = useSelector((state) => state.registerEvent);
    const viewEvent = localStorage.getItem('viewEvent');
    const dispatch = useDispatch();
    
    let allDetails = JSON.parse(viewEvent);
    allDetails = allDetails.allDetails;
    const onButtonClickHandler = () =>{
     const data = {
        eventId : allDetails._id
     }
        dispatch(registerEvent(data));
        alert(state.message);
        


        

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
    <button onClick={onButtonClickHandler}>Book Ticket</button>
    <br/>
    
  </div>
  )
}

export default ViewEvent
