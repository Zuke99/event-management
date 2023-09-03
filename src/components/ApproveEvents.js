import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchEvents } from '../redux/slice/eventSlice';
import { useSelector } from 'react-redux';

import Card from './Card';

function ApproveEvents() {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.app.name);
    useEffect(() => {
      
        dispatch(fetchEvents());
       
       
        
      }, [dispatch]);

      const state = useSelector((state) => state);
      const isLoading = useSelector((state => state.event.isLoading));
     
      
  return (
    <div className='container'>
      <h3>Events Approval Needed</h3>
      <div className="container my-3" >
      <div className='row' >
          
        
          {!isLoading && state.event.data && state.event.data.data.filter((e) => (e.approval === false && e.organisation === userName))
          .map((e) => {
            return(

              <div className="col-md-3" key={e._id}>
              <Card 
              name={e.name} 
              start_date={e.start_date}
              end_date={e.end_date}
              description={e.description}
              allDetails = {e}
              
              />
              </div>
            );
          })}
        
      </div>
      </div>
    </div>
  )
}

export default ApproveEvents
