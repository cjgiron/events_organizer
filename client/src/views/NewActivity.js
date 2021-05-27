import React, { useState } from "react";
import { navigate } from '@reach/router'
import axios from "axios";

const NewActivity = (props) => {

    const [title, setTitle] = useState("")

    const [location, setLocation] = useState("")
  
    const [duration, setDuration] = useState("")
  
    const [units, setUnits] = useState("")
  
    const [date, setDate] = useState("")
  
    const [time, setTime] = useState("")
  
    const [description, setDescription] = useState("")

    const [errors, setErrors] = useState(null)

    const handleNewActivitySubmit = (event) => {
        event.preventDefault();
    
        const newActivity = {
            title,
            location,
            duration,
            units,
            date,
            time,
            description
        }
        
        axios
            .post("http://localhost:8002/api/activities", newActivity)
            .then((res) => {
                console.log("new activity response", res);
                props.setNewActivity(true);
                navigate("/activities/");
            })
            .catch((err) => {
                setErrors(err.response?.data?.errors);
                console.log(err.response);
            })
        
        setTitle("");
        setLocation("");
        setDuration("");
        setUnits("");
        setDate("");
        setTime("");
        setDescription("");
    }


    return (
        <form style={{marginBottom: "20px"}} onSubmit={(event) => {
            handleNewActivitySubmit(event);
            }}
            >
            <h3 style={{ textAlign: "center"}}>Create a New Activity</h3>
            <div className="form-group col-md-6">
                <label>Title: </label>
                {errors?.title && (
                    <span className="text-danger"> - {errors?.title?.message}</span>
                )}
                <input className="form-control" onChange={(event) => {
                    setTitle(event.target.value)
                }}
                type="text"
                value={title}
                name="title"
                />
            </div>
            
            <div className="form-group col-md-6">
                <label>Location: </label>
                {errors?.location && (
                    <span className="text-danger"> - {errors?.location?.message}</span>
                )}
                <input className="form-control" onChange={(event) => {
                    setLocation(event.target.value)
                }}
                type="text"
                value={location}
                name="location"
                />
            </div>
    
            <div className="form-group col-md-6">
                <label>Duration: </label>
                {errors?.duration && (
                    <span className="text-danger"> - {errors?.duration?.message}</span>
                )}
                <input className="form-control" onChange={(event) => {
                    setDuration(event.target.value)
                }}
                type="text"
                value={duration}
                name="duration"
                />
            </div>
    
            <div className="form-group col-md-6">
                <label>Units: </label>
                {errors?.units && (
                    <span className="text-danger"> - {errors?.units?.message}</span>
                )}
                <input className="form-control" onChange={(event) => {
                    setUnits(event.target.value)
                }}
                type="text"
                value={units}
                name="units"
                />
            </div>
    
            <div className="form-group col-md-6">
                <label>Date: </label>
                {errors?.date && (
                    <span className="text-danger"> - {errors?.date?.message}</span>
                )}
                <input className="form-control" onChange={(event) => {
                    setDate(event.target.value)
                }}
                type="date"
                value={date}
                name="date"
                />
            </div>
    
            <div className="form-group col-md-6">
                <label>Time: </label>
                {errors?.time && (
                    <span className="text-danger"> - {errors?.time?.message}</span>
                )}
                <input className="form-control" onChange={(event) => {
                    setTime(event.target.value)
                }}
                type="text"
                value={time}
                name="time"
                />
            </div>
    
            <div className="form-group col-md-6">
                <label>Description: </label>
                {errors?.description && (
                    <span className="text-danger"> - {errors?.description?.message}</span>
                )}
                <input className="form-control" onChange={(event) => {
                    setDescription(event.target.value)
                }}
                type="text"
                value={description}
                name="description"
                />
            </div>
    
            <button>Submit</button>
        </form>
    )
}

export default NewActivity;