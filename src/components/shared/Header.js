import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'black',
    textDecoration: 'none',
}
const authenticatedOptions = (
	<>
		<Nav.Item className='m-2' >
			<Link to='/addItem' style={linkStyle}>
				Add a Item
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2 '>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2 icon-wrap cart-btn' >
		
			<Link to='/cart' style={linkStyle}>
				Cart
			</Link>
			<div className='cart-num'>1</div>
		</Nav.Item>

	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2'>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2'>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar className='top'  variant='dark' expand='md'>

		<Navbar.Brand className='mx-2 yellow-logo store-name-top'>
            <Link to='/' style={linkStyle}>
                <h1>YellowStone</h1>
            </Link>
        </Navbar.Brand>

		{/* here is the only part where toglle work for.. */}
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto ' >
				{user && (
					<span style={linkStyle} className='navbar-text mr-2 '>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header