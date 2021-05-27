import React, { useEffect, useState } from "react";
import { navigate } from '@reach/router'
import axios from "axios";


const UpdateActivity = (props) => {

    const [title, setTitle] = useState("")

    const [location, setLocation] = useState("")

    const [duration, setDuration] = useState("")

    const [units, setUnits] = useState("")

    const [date, setDate] = useState("")

    const [time, setTime] = useState("")

    const [description, setDescription] = useState("")

    const [errors, setErrors] = useState(null)

    useEffect(() => {
        axios
            .get("http://localhost:8002/api/activities/" + props.id)
            .then((res) => {
                setTitle(res.data.title)
                setLocation(res.data.location)
                setDuration(res.data.duration)
                setUnits(res.data.units)
                setDate(res.data.date)
                console.log(res)
                setTime(res.data.time)
                setDescription(res.data.description)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [props.id])

    const handleEditActivitySubmit = (event) => {
        event.preventDefault();

        const editedActivity = {
            title,
            location,
            duration,
            units,
            date,
            time,
            description
        }

        axios.put("http://localhost:8002/api/activities/" + props.id, editedActivity)
            .then((res) => {
                console.log("edit activity response", res)
                props.fetchActivities()
                navigate('/activities')
            })
            .catch((err) =>{ 
                setErrors(err.response?.data?.errors);
                console.log(err.response);
            });
    };

    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Update an Activity</h3>
            <form style={{ marginBottom: "20px" }} onSubmit={(event) => {
            handleEditActivitySubmit(event);
            }}
            >
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
                value={date.substring(0, 10)}
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
        </div>
    )
}

export default UpdateActivity;