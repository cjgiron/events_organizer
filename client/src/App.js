import React, { useEffect, useState } from "react";
import { Link, Router, Redirect } from '@reach/router'
import axios from "axios";
import Activities from './components/Activities';
import NewActivity from './views/NewActivity';
import UpdateActivity from './views/UpdateActivity';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';

function App() {

  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState(false)

  useEffect(() => {
    fetchActivities()
  }, [newActivity])


  const handleFlipCardClick = (event, selectedIdx) => {
    const updatedActivities = activities.map((card, i) => {
      if(i === selectedIdx) {
        card.flipped = !card.flipped;
      }
      return card;
    })
    setActivities(updatedActivities)
  }

  const handleDelete = (e, cardToDel) => {
    // This stops the onClick from skipping this function and going to the
    // card onClick.
    e.stopPropagation();

    alert("Are you sure you want to delete this activity?")

    axios
      .delete("http://localhost:8002/api/activities/" + cardToDel._id)
      .then((res) => {
        const filteredActivities = activities.filter((card) => {
          /* 
          return true to keep, false to remove.
          returns true for all of the cards except the cardToDel one.
          */
          return card !== cardToDel;
        })
        setActivities(filteredActivities);
      })
      .catch((err) => {
        console.log(err);
      })
  };


  const fetchActivities = () => {

    axios
      .get("http://localhost:8002/api/activities")
      .then((resp) => {
        setActivities(resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const sortArray = (event) => {
    event.preventDefault();

    const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date));
    console.log("these activities are sorted: ", sorted);
    setActivities(sorted);
}


  return (
    <div className="container">
      <div style={{ textAlign: "center" }}>
        <h1>Activities Organizer</h1>
        <a className="btn btn-sm btn-outline-primary" href="/activities" style={{ textDecoration: "none"}}>Home</a>{" "}
        <a className="btn btn-sm btn-outline-primary" href="/activities/new" style={{ textDecoration: "none"}}>Create New Activity</a>{" "}
        <button className="btn btn-sm btn-outline-primary" onClick={(event) => {
          sortArray(event)
        }}>Sort Activities by Date</button>
      </div>
      <hr/>

      <Router>
        <NewActivity setNewActivity={setNewActivity} path="/activities/new"/>
        <Activities
          path="/activities"
          activities={activities}
          handleFlipCardClick={handleFlipCardClick}
          handleDelete={handleDelete}
        />
        <UpdateActivity fetchActivities={fetchActivities} path="/activities/:id/edit"/>
        <Redirect from="/" to="/activities" noThrow="true"/>
      </Router>
    </div>
  );
}

export default App;
