import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ItemForm from '../shared/ItemForm'
import { updateItemSuccess, updateItemFailure } from '../shared/AutoDismissAlert/messages'

const EditItemModal = (props) => {
    const { 
        user, show, handleClose, 
        updateItem, msgAlert, triggerRefresh
    } = props

    const [item, setItem] = useState(props.item)

    console.log('item in edit modal', item)

    const handleChange = (e) => {
        setItem(prevItem => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "new" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "new" && !e.target.checked) {
                updatedValue = false
            }

            const updatedItem = {
                [updatedName]: updatedValue
            }
            return {
                ...prevItem,
                ...updatedItem
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateItem(user, item)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateItemSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showItem component
            // updated is in ShowItem's useEffect's dependency array
            // changes to the updated boolean cause ShowItem's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateItemFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ItemForm 
                    item={item}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Item"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditItemModal