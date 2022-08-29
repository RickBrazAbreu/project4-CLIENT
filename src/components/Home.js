import ItensIndex from './itens/ItensIndex'
import './style.css'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props

	return (
		<div className='main-screen'>
			<h2>See the Items</h2>
			<ItensIndex msgAlert={ msgAlert } />
		</div>
	)
}

export default Home