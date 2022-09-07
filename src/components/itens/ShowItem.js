import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button, Image } from 'react-bootstrap'


import LoadingScreen from '../shared/LoadingScreen'
import { getOneItem, updateItem, removeItem } from '../../api/itens'
import messages from '../shared/AutoDismissAlert/messages'
import EditItemModal from './EditItemModal'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowItem = (props) => {
    const [item, setItem] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the item in showItem', item)

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
            })
    }, [updated])

    const removeTheItem = () => {
        removeItem(user, item.id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeItemSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing item',
                    message: messages.removeItemFailure,
                    variant: 'danger'
                })
            })
    }
   
    const buyTheItem = () => {
        removeItem(user, item.id)
            .then(() => {
                msgAlert({
                    heading: 'Purchased',
                    message: messages.removeItemSuccess,
                    variant: 'Item is now yours'
                })
            })
            .then(() => {navigate('/')})
            .catch(err => {                   
                msgAlert({
                    heading: 'Error buying item',
                    message: messages.removeItemFailure,
                    variant: 'try again momentarily'
                })
            })
    }

    if (!item) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid "  >

                <div className='row' >
                    <div className='col-md-5' style={{textAlign: 'center', marginTop:10}}>

                    
                    <Card style={{ borderRadius:15 }}>
                        <Card.Header className='itens-name-card'> <h1>{ item.item } </h1> </Card.Header>
                        <Card.Body className="card-color" >
                            <Card.Text className="card-color">
                                {/* <div className="card-color-name"><h1>{ item.item }</h1></div> */}
                                <h2 className="card-color">{item.brand}</h2>

                                <Image fluid={true} src={item.itemtype} alt=''/>

                                {/* <Image fluid={true} >{item.itemtype}</Image> */}

                                <h2 className="card-color">{item.price}</h2>
                                <div className="card-color"> 
                                    <small className='new-Item'> New: {item.new ? 'yes' : 'no'}
                                    </small>
                                    </div>
                                
                                
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            {/* <Button onClick={() => setEditModalShow(true)}
                                className="m-2" variant="info"
                            >
                                Give {item.name} edit!
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
                                        Delete {item.name}
                                    </Button>
                                </>
                                :
                                null
                            }
                        </Card.Footer>
                    </Card>

                    </div>
                </div>

                <Card style={{ borderRadius:15 }}>
                    <Card.Header className='itens-name-card'> <h1>{ item.item } </h1> </Card.Header>
                    <Card.Body className="card-color" >
                        <Card.Text className="card-color">
                            <h2 className="card-color">{item.brand}</h2>
                            <h2 className="card-color">{item.price}</h2>
                            <div className="card-color"> 
                                <small className='new-Item'> New: {item.new ? 'yes' : 'no'}
                                </small>
                            </div>
                            
                            
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
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
                                    Delete {item.name}
                                </Button>
                                <Button onClick = {() =>
                                    buyTheItem()}
                                        className="m-2"
                                        variant='bought'
                                >
                                    Buy {item.name}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>

            </Container>
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
