
import Form from "react-validation/build/form";
import style from "../styling/createevent.module.css"
import React, {  useState ,useRef, useEffect} from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "react-datepicker/dist/react-datepicker.css";
import { isLoggedIn, role } from "../redux/userSlice";
import { addEvent } from "../redux/eventSlice";


function CreateEvent() {
    console.log("Inside CReateEvent")
   
    
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [seats, setSeats] = useState();
    const [category, setCategory] = useState();
    const [venue, setVenue] = useState();
    const [about, setAbout] = useState();
    const [organisation, setOrganisation] = useState();
    const [successful, setSuccessful] = useState();
    //const { message } = useSelector(state => state.message);
    const [message, setMessage] = useState();

    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const dispatch = useDispatch();


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
      }, [dispatch]);

      //Use this to check Roles

    // useEffect(() => {
    //     dispatch(role())
    //       .unwrap()
    //       .then((result) => {
    //         if(result.result===1){
    //             console.log("Admin");
    //         } else {
    //             console.log("NotAdmin");
    //         }
          
    //       })
    //       .catch((error) => {
    //         console.log("ROLE", error);
           
    //       });
    //   }, [dispatch]);
   
    const required = (value) => {
        if (!value) {
          return (
            <div className={style['req-field']} role="alert">
              This field is required!
            </div>
          );
        }
      };

    const handleTagInputChange = (event) => {
        const input = event.target.value;
        setTagInput(input);

        // const inputTags = input.split(/\s+/).filter(tag => tag.trim() !== '');
         //setTags([...tags, event.target.value]);
    };

    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            setTags([...tags, event.target.value]);
            setTagInput('');
            console.log("Tags", tags);
        }
    };
    

    // if (!currentUser) {
    //     return <Navigate to="/login" />;
    //   }

    function onImageChanges(e){
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        if (selectedImage) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setImageUrl(imageUrl);
        }
    }

    function onRadioButtonChange(e){
        if(disabled){
            setDisabled(false);
        } else {
            setSeats(-1);
            setDisabled(true);
        }
    }

    const onChangeName = (e) => {
        const name= e.target.value;
        setName(name);
    }
    const onChangeDescription = (e) => {
        const description= e.target.value;
        setDescription(description);
    }
    const onChangeSeats = (e) => {
        const seats= e.target.value;
        setSeats(seats);
    }
    const onChangeCategory = (e) => {
        const category= e.target.value;
        setCategory(category);
    }
    const onChangeVenue = (e) => {
        const venue= e.target.value;
        setVenue(venue);
    }
    const onChangeAbout = (e) => {
        const about= e.target.value;
        setAbout(about);
    }
    const onChangeOrganisation = (e) => {
        const organisation= e.target.value;
        setOrganisation(organisation);
    }

    const handleSubmit = (e) => {
        console.log("Submit pressed");
        e.preventDefault();
        setSuccessful(false);

        form.current.validateAll();

        const data = {
            name : name,
            description : description,
            seats : seats,
            category : category,
            posterImage : imageUrl,
            date : startDate,
            start_time : startTime,
            end_time : endTime,
            venue : venue,
            about : about,
            tags : tags,
            organisation : organisation,
        }

        if (checkBtn.current.context._errors.length === 0) {
           dispatch(addEvent(data))
           .unwrap()
           .then((result) => {
            alert(result.message);
            navigate("/");
            //window.location.reload();
           }).catch((error) => {
            alert(error);
           })
        }

    }

   
  return (
    <div className={style['container']}>
        <div className={style['heading-container']}>
          <h3 className={style['heading']}>Create Event</h3>
          </div>



        <div className={style['form-container']}>
      <Form onSubmit={handleSubmit} ref={form}>
        <div className={`form-group row ${style['input-container']}`}>
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
                <Input type="text" className="form-control" onChange={onChangeName} id="inputPassword" placeholder="Event Name" validations={[required]}/>
            </div>
        </div>


        <div className={`form-group row ${style['input-container']}`}>
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Description</label>
            <div className={`col-sm-10 `} >
                <Input type="text" className="form-control" onChange={onChangeDescription} id="inputPassword" placeholder="Event Description" validations={[required]}/>
            </div>
        </div>


        <div className={`form-group row ${style['input-container']}`}>
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Total Seats</label>
            <div className="col-sm-10">
                <Input type="number" disabled={disabled} onChange={onChangeSeats} className="form-control" id="inputPassword" placeholder="Number Of Seats"/>
                
                <div className="custom-control custom-switch">
                <input type="checkbox" onChange={onRadioButtonChange} className="custom-control-input" id="customSwitches"/>
                <label className="custom-control-label" htmlFor="customSwitches"> &nbsp; No seat limit</label>
                </div>
            </div>
        </div>


        <div className={`form-group row ${style['input-container']}`}>
            <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Category</label>
            <div className="col-sm-10">
            <select className="form-control" onChange={onChangeCategory} id="exampleFormControlSelect1" >
            <option>Sports</option>
            <option>Games</option>
            <option>Movies</option>
            <option>Music</option>
            <option>Comedy</option>
            </select>
            </div>
        </div>


        <div className={`form-group row ${style['input-container']}`}>
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Event Date</label>
        <div className="col-sm-10">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} validations={[required]}/>
            </div>
        </div>

        <div className={`form-group row ${style['input-container']}`}>
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Event Start Time</label>
        <div className="col-sm-10">
            <DatePicker
                selected={startTime}
                onChange={(time) => setStartTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
        /> &nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Event End Time</label>
        <DatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
        />
            </div>
        </div>

        <div className={`form-group row ${style['input-container']}`}>
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Venue</label>
            <div className={`col-sm-10 `} >
            <textarea className="form-control" onChange={onChangeVenue} id="exampleFormControlTextarea1" rows="3" validations={[required]} placeholder="Where is this Event going to take place ..."></textarea>
            </div>
        </div>


        <div className={`form-group row ${style['input-container']}`}>
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">About The Event</label>
            <div className={`col-sm-10 `} >
            <textarea className="form-control" onChange={onChangeAbout} id="exampleFormControlTextarea1" rows="3" placeholder="Tell us more about the Event ..."></textarea>
            </div>
        </div>


        <div className={`form-group row ${style['input-container']}`}>
            <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Organisation</label>
            <div className="col-sm-10">
            <select className="form-control" onChange={onChangeOrganisation} id="exampleFormControlSelect1">
            <option>College Org.</option>
            <option>Community Org.</option>
            <option>State Org.</option>
            <option>Public Org.</option>
            </select>
            </div>
        </div>

        <div className={`form-group row ${style['input-container']}`}>
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Tags</label>
            <div className={`col-sm-10 `} >
            <textarea
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Specify keywords poeple might type to search this Event"
            />
            <div className="tags">
               {tags.join(',')}
            </div>
            </div>
        </div>




        <div className={`form-group row ${style['input-container']}`}>
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Image Upload</label>
            <div className={`col-sm-10 `} >
            <Input type="file" accept="image/*" onChange={onImageChanges} />
           { image && <img src={imageUrl} alt="upload-event" className={style['event-image']}/>}
            </div>
        </div>
        

        <div className={`form-group row ${style['input-container']}`}>
        <button  className="btn btn-primary">Submit</button>
        </div>
        
        
        {(message || successful) && (
            <div  className="form-group" >
              <div className={style['alert']} role="alert">
                {message}
              </div>
            </div>
          )}

        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      </div>
    </div>
  )
}

export default CreateEvent
