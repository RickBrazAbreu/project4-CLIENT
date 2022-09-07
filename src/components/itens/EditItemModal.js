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
                updatedValue = parseInt(e.target.value)
            }
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
        e.preventDefault()

        updateItem(user, item)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateItemSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
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