import { useState, useEffect } from 'react'

// Display stuff
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import messages from '../shared/AutoDismissAlert/messages'

// Componets
import { getAllItems } from '../../api/items'

// Get all user's items display them.

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center-left',
    marginTop: "25px"
}

const ItemsIndex = (props) => {
    console.log('Props in ItemsIndex', props)
    
    // User and messages
    const { user, msgAlert } = props
    const [error, setError] = useState(false)

    // Placeholder for all the user's items from the DB.
    const [items, setItems] = useState(null)

    // Get all the items from the DB
    useEffect(() => {
        console.log(props)
        getAllItems(user)
            .then(res => setItems(res.data.items))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Items',
                    message: messages.getItemsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])


    if (!user) {
        return <p>You need to sign in!</p>
    }
    // If there is an error fetching from the DB
    if (error) {
        return <p>Error!</p>
    }
    // If items haven't been loaded yet, show a loading message
    if (!items) {
        return <LoadingScreen />
     // If the user's items have been loaded, but they don't have any, so there nothing to display.
    } else if (items.length === 0) {
        return <p>No items yet. Better add some, or <Link to={"/items/seed"}>load some sample items</Link>.</p>
    }

    // Puts each item in a little card display.
    const itemCards = items.map(item => {
        const mainStatSection = (
            <span>
                <strong>Main Stat: {item.mainStat} </strong>
                ({item.mainStatAmount})
            </span>
        );

        const subStatList = item.substats.map(sub => {
            return (
                <li key={item._id + "-" + sub.stat}>
                    {sub.stat} ({sub.amount})
                </li>
            )
        })
        
        const subStatSection = (
            <div style={{textAlign: "left"}}>
                <strong>Substats:</strong>
                <ul style={{listStyleType: "none", padding: "0", margin: "0 1em"}}>
                    { subStatList }
                </ul>
            </div>
        );

        return (
            <Card style={{ width: '30%', margin: 5}} key={ item._id }>
                <Card.Header>
                    <Link to={`/items/${item._id}`} style={{textDecoration: "none"}}>
                        <h4 style={{margin: 0}}>{ item.name }</h4>
                    </Link>
                </Card.Header>
                <Card.Body>
                    <Card.Text style={{textAlign: "left"}}>
                        {mainStatSection}
                        {subStatSection}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    })

    // Display's each item in it's little card display.
    return (
        <div style={ cardContainerStyle }>
            { itemCards }
        </div>
    )
}

export default ItemsIndex