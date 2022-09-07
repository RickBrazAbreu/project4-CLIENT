// import { 
//     useState, 
//     useEffect 
// } from 'react'
// import Card from 'react-bootstrap/Card'
// import { Link } from 'react-router-dom'

// import LoadingScreen from '../shared/LoadingScreen'
// import { getAllItens } from '../../api/itens'
// import messages from '../shared/AutoDismissAlert/messages'

// // ItensIndex should make a request to the api
// // To get all itens
// // Then display them when it gets them


// const SignIn = (props) => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const navigate = useNavigate()
// 	const onSignIn = (event) => {
// 		event.preventDefault()
//         console.log('the props', props)
// 		const { msgAlert, setUser } = props
// // style for our card container
// const cardContainerStyle = {
//     display: 'flex',
//     flexFlow: 'row wrap',
//     justifyContent: 'center'
// }

// const CartIndex = (props) => {
//     const [itens, setItens] = useState(null)
//     const [error, setError] = useState(false)

//     const { msgAlert } = props

//     console.log('Props in ItensIndex', props)

//     useEffect(() => {
//         console.log(props)
//         getAllItens()
//             .then(res => setItens(res.data.itens))
//             .catch(err => {
//                 msgAlert({
//                     heading: 'Error Getting Items',
//                     message: messages.getItensFailure,
//                     variant: 'danger',
//                 })
//                 setError(true)
//             })
//     }, [])

//     if (error) {
//         return <p>Error!</p>
//     }

//     // If itens haven't been loaded yet, show a loading message
//     if (!itens) {
//         return <LoadingScreen />
//     } else if (itens.length === 0) {
//         return <p>No items yet. Better add some.</p>
//     }

//     const itemCards = itens.map(item => (
//         <Card className='card-shape'  style={{ width: '30%', margin: 5}} key={ item.id }>
//             <Card.Header>{ item.item }</Card.Header>
//             <Card.Body className="card-color">
//                 <Card.Text>
//                     <Link to={`/itens/${item.id}`}>View { item.name }</Link>
//                     <button>Add To Cart</button>
//                 </Card.Text>
//             </Card.Body>
//         </Card>
//     ))

//     return (
//         <div style={ cardContainerStyle }>
//             { itemCards }
//         </div>
//     )
// }

// export default CartIndex