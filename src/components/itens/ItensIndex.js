import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllItens } from '../../api/itens'
import messages from '../shared/AutoDismissAlert/messages'

// ItensIndex should make a request to the api
// To get all itens
// Then display them when it gets them

// style for our card container
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
                    heading: 'Error Getting Itens',
                    message: messages.getItensFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If itens haven't been loaded yet, show a loading message
    if (!itens) {
        return <LoadingScreen />
    } else if (itens.length === 0) {
        return <p>No itens yet. Better add some.</p>
    }

    const itemCards = itens.map(item => (
        <Card style={{ width: '30%', margin: 5}} key={ item.id }>
            <Card.Header>{ item.item }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/itens/${item.id}`}>View { item.name }</Link>
                    <button>Add To Cart</button>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { itemCards }
        </div>
    )
}

export default ItensIndex