import { Link } from '@reach/router';


const Activity = (props) => {
    return (
        <section
            className="card"
            onClick={(event) => {
            props.handleFlipCardClick(event, props.index);
            }}
        >
            <h3>{props.card.title}</h3>
            {/* ternary syntax - condition ? "returned if true" : "returned if false" */}
            {props.card.flipped ? (
                <div className="back">
                    <p>Description: {props.card.description}</p>
                    <p>Location: {props.card.location}</p>
                </div>
            ) : (
                <div className="front">
                    <p>Date: {props.card.date.substring(0, 10)}</p>
                    <p>Time: {props.card.time}</p>
                    <p>Duration: {props.card.duration} {props.card.units}</p>
                </div>
            )}
    
            <button
            onClick={(event) => {
                props.handleDelete(event, props.card);
            }}
            >
            Delete
            </button>
            <Link to={`/activities/${props.card._id}/edit`}>Edit</Link>
        </section>
        );
    };

export default Activity;