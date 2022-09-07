import { 
    useState, 
    useEffect 
} from 'react'

import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllItens } from '../../api/itens'
import messages from '../shared/AutoDismissAlert/messages'
import pantsImg from '../../imgs store/pants.jpeg'
import {Container, Card, Row, Col, Image} from 'react-bootstrap'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ItensIndex = (props) => {
    const [itens, setItens] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in ItensIndex', props)

    useEffect(() => {
        console.log(props)
        getAllItens()
            .then(res => setItens(res.data.itens))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Items',
                    message: messages.getItensFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    if (!itens) {
        return <LoadingScreen />
    } else if (itens.length === 0) {
        return <p>No items yet. Better add some.</p>
    }

    const itemCards = itens.map(item => (
        <Col md='4'>
       
        <Card  style={{ width: '100%', margin: 5, borderRadius:15 }} key={ item.id }>
            <Card.Header className='itens-name-card'>{ item.item }</Card.Header>
            <Card.Body className="card-color" >
            
            {/* <Image src={item.itemtype} fluid={true} alt=''/> */}
                {/* <Image fluid={true} src={item.itemtype} alt=''/> */}

                

                <Card.Text className='itens-name-card'>
                    <Link to={`/itens/${item.id}`}>View { item.name }</Link>
                    {/* <button>Add To Cart</button> */}
                </Card.Text>
            </Card.Body>
        </Card>
        </Col>
    ))

    return (
        <Container>
            <Row style={cardContainerStyle}>
                { itemCards}

            </Row>
        </Container>
        // <div style={ cardContainerStyle }>
        //     { itemCards }
        // </div>
    )
}

export default ItensIndex