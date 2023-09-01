
import Form from "react-validation/build/form";
import style from "../styling/createevent.module.css"
import React, {  useState ,useRef, useEffect} from "react";
import DatePicker from "react-datepicker";
import {  useDispatch } from "react-redux";
import {  useNavigate } from 'react-router-dom';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import assets from "../assets/loading.gif"
import "react-datepicker/dist/react-datepicker.css";
import { isLoggedIn } from "../redux/userSlice";
import { addEvent } from "../redux/eventSlice";
import axios from "axios";
import { getCategories, getOrganisations } from "../redux/slice/eventSlice";
import { useSelector } from "react-redux";


function CreateEvent() {
   
    
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
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

    const[loading, setLoading] = useState(false);
    const [url, setUrl] = useState();
    const categories= useSelector((state) => state.event.categories);
    const organisations = useSelector((state) => state.event.organisations);
    //const { message } = useSelector(state => state.message);


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

          dispatch(getCategories())
          .unwrap()
          .then((result) => {
           
           setCategory(result.data[0].category_name);

          })
          dispatch(getOrganisations())
          .unwrap()
          .then((result) => {
           //console.log("Organisation",result.data[0].name);
             setOrganisation(result.data[0].name);

          })

      }, [dispatch, navigate]);

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
        }
    };
    

    // if (!currentUser) {
    //     return <Navigate to="/login" />;
    //   }

    // function onImageChanges(e){
    //     const selectedImage = e.target.files[0];
    //     setImage(selectedImage);

    //     if (selectedImage) {
    //         const imageUrl = URL.createObjectURL(selectedImage);
    //         setImageUrl(imageUrl);
    //     }
    // }

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
        e.preventDefault();
      

        form.current.validateAll();

        const data = {
            name : name,
            description : description,
            seats : seats,
            category : category,
            posterImage : url,
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


    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

      function uploadSingleImage(base64) {
        setLoading(true);
        axios
          .post("http://localhost:8080/uploadImage", { image: base64 })
          .then((res) => {
            setUrl(res.data);
            alert("Image uploaded Succesfully");
          })
          .then(() => setLoading(false))
          .catch(console.log);
      }

      const uploadImage = async (event) => {
        const files = event.target.files;
        console.log(files.length);
    

          const base64 = await convertBase64(files[0]);
          uploadSingleImage(base64);
          return;
        
    
       
      };

      function UploadInput() {
        return (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                onChange={uploadImage}
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
              />
            </label>
          </div>
        );
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
           
              {categories.map((e) => {
               return <option key = {e._id} value={e.category_name}>{e.category_name}</option>;
              })}
              
           
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
            {organisations.map((e) =>{
              return <option key={e._id} value={e.name}>{e.name}</option>
            })}
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



       {/* *************************************************** */}
       <div className="flex justify-center flex-col m-8 ">
      <div>
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Upload Photo
        </h2>
      </div>
      <div>
        {url && (
          <div>
            Access you file at{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <div className="flex items-center justify-center">
            <img src={assets} alt="upload-event"/>{" "}
          </div >
        ) : (
            <div className={`col-sm-10 `}>
          <UploadInput />
          </div>
        )}
      </div>
    </div>
       {/* *************************************************** */}


        {/* <div className={`form-group row ${style['input-container']}`}>
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Image Upload</label>
            <div className={`col-sm-10 `} >
            <Input type="file" accept="image/*" onChange={onImageChanges} />
           { image && <img src={imageUrl} alt="upload-event" className={style['event-image']}/>}
            </div>
        </div> */}
        

        <div className={`form-group row ${style['input-container']}`}>
        <button  className="btn btn-primary">Submit</button>
        </div>
        
        
        

        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      </div>
    </div>
  )
}

export default CreateEvent
