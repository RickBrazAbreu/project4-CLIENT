import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Display inports
import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
// components
import messages from '../shared/AutoDismissAlert/messages'
// API stuff
import { getOneItem, updateItem, removeItem } from '../../api/items'
import EditItemModal from './EditItemModal'
import ReactTooltip from 'react-tooltip';

import './item.css'

// Get item from the the api and display them.

const ShowItem = (props) => {
    const { user, msgAlert } = props
    const navigate = useNavigate()
    
    // place holder the the item and the item's id, so the API can fetch it.
    const [item, setItem] = useState(null)

    // used to update the item.
    const { id } = useParams()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const setBgCondition = (slot) => {
        if (slot === 'Flower') {
            return({width: '18rem', backgroundColor:'#b5ead7'})
        } else if (slot === 'Feather') {
            return({width: '18rem', backgroundColor:'#ffdac1'})
        } else if (slot === 'Sands'){
            return({width: '18rem', backgroundColor:'#ff9aa2'})
        } else if (slot === 'Goblet'){
            return({width: '18rem', backgroundColor:'#ff9aa2'})
        } else {
            return({width: '18rem', backgroundColor:'#ff9aa2'})
        }
    }

    const [updated, setUpdated] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    
    console.log('user in props', user)
    console.log('the item in showItem', item)
    
    // Get the item from the API
    useEffect(() => {
        getOneItem(user, id)
            .then(res => setItem(res.data.item))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting item',
                    message: messages.getItemsFailure,
                    variant: 'danger'
                })
                navigate('/')
            })
    }, [updated])

    // Delete the item from API if user click the remove button
    const removeTheItem = () => {
        removeItem(user, id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeItemSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing item',
                    message: messages.removeItemFailure,
                    variant: 'danger'
                })
            })
    }
    
    // If the item hasn't been loaded yet, show a loading message
    if (!item) {
        return <LoadingScreen />
    }

    // Displays the substats array
    const substats = item.substats.map(substat => (
        <div className='substat'>
            <div>
                <small>Stats: { substat.stat }</small>
            </div>
            <div>
                <small>Amount: { substat.amount }</small>
            </div>
        </div>
    ))

    let ratingArea;
    if (!item.ratings) {
        ratingArea = <p>{ messages["noRatingFound"] }</p>
    }
    else if (item.ratings.error) {
        ratingArea = <p>{ messages[item.ratings.messageName] }</p>
    } else {
        const ratingList = item.ratings.map((rating, i) => {
            return (<li key={i}>
                <ReactTooltip effect="solid" id={"tooltip-" + i} html="true">
                    { messages[rating.tooltipId] }
                </ReactTooltip>
                <a data-tip data-for={"tooltip-" + i} style={{textDecorationStyle: "dotted", textDecorationLine: "underline"}}>{ rating.readableName }</a>: { rating.value }
            </li>);
        })

        ratingArea = <ul style={{listStyle: "none", margin: 0, padding: 0}}>{ ratingList }</ul>
    }

    return (
        <>
            <Container className="fluid" style={{display: "flex", justifyContent: "center"}}>
                <Card className="m-2" style={setBgCondition(item.slot)}>
                    <Card.Header><h2 style={{color: 'rgb(61, 61, 132)'}}>{ item.name }</h2></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>slot: { item.slot }</small></div>
                            <div><small>level: { item.level }</small></div>
                            <div><small>mainStat: { item.mainStat }</small></div>
                            <div><small>mainStatAmount: { item.mainStatAmount }</small></div>
                            <div className='substats-grid'>
                                { substats }
                            </div>
                            <div style={{marginTop: "25px", marginBottom: "15px"}}>
                                <h4>Item Ratings</h4>
                                { ratingArea }
                            </div>
                        </Card.Text>
                    </Card.Body>
                    {/* Buttons that the user can click. */}
                    <Card.Footer>
                        {
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Item
                                </Button>
                                <Button onClick={() => removeTheItem()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Remove {item.name}
                                </Button>
                            </>
                        }
                    </Card.Footer>
                </Card>
            </Container>
            {/* What shows up when the user clicked "Edit Item" */}
            <EditItemModal 
                user={user}
                item={item} 
                show={editModalShow} 
                updateItem={updateItem}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )
}

export default ShowItem