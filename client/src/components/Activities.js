import Activity from "./Activity";


const Activities = (props) => {
    return (
        <main className="flex-row flex-wrap main">
            {props.activities.map((card, i) =>{
                return (
                    <Activity
                        key={i}
                        index={i}
                        card={card}
                        handleFlipCardClick={props.handleFlipCardClick}
                        handleDelete={props.handleDelete}
                    />
                )
            })
        }
    </main>
    )
}

export default Activities;