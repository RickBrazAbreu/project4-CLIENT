import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneItem, updateItem, removeItem } from '../../api/itens'
import messages from '../shared/AutoDismissAlert/messages'
import EditItemModal from './EditItemModal'


// We need to get the item's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the toy cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowItem = (props) => {
    const [item, setItem] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    //const [toyModalShow, setToyModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the item in showItem', item)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneItem(id)
            .then(res => setItem(res.data.item))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting item',
                    message: messages.getItensFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the item
    // this function's promise chain should send a message, and then go somewhere
    const removeTheItem = () => {
        removeItem(user, item.id)
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
   

    if (!item) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ item.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><h1>{ item.item }</h1></div>
                            <h2>{item.brand}</h2>
                            <h2>{item.price}</h2>
                            <div> 
                                <small className='new-Item'> New: {item.new ? 'yes' : 'no'}
                                </small>
                                </div>
                            
                            
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {/* <Button onClick={() => setToyModalShow(true)}
                            className="m-2" variant="info"
                        >
                            Give {item.name} a toy!
                        </Button> */}
                        {
                            item.owner && user && item.owner._id === user._id 
                            ?
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
                                    Set {item.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            {/* <Container style={cardContainerLayout}>
                {toyCards}
            </Container> */}
            <EditItemModal 
                user={user}
                item={item} 
                show={editModalShow} 
                updateItem={updateItem}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            {/* <NewToyModal 
                item={item}
                show={toyModalShow}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setToyModalShow(false)} 
            /> */}
        </>
    )
}

export default ShowItem