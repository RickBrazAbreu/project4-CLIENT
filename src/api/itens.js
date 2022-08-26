import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllItens = () => {
    return axios(`${apiUrl}/itens`)
}

// READ => SHOW
export const getOneItem = (id) => {
    return axios(`${apiUrl}/itens/${id}`)
}

// CREATE
export const createItem = (user, newItem) => {
    // console.log('createItem in api was hit')
    // in our createitem form, we're building an object
    // when we pass that object into the api createitemfunction,
    // it's going to look like the itens in our database
    // we're going to refer to this as newitem
    // console.log('this is user', user)
    // console.log('this is newItem', newItem)
	return axios({
		url: apiUrl + '/itens',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { item: newItem }
	})
}

// UPDATE
export const updateItem = (user, updatedItem) => {
    // console.log('createItem in api was hit')
    // in our createitem form, we're building an object
    // when we pass that object into the api createitens function,
    // it's going to look like the itens in our database
    // we're going to refer to this as newitens
    // console.log('this is user', user)
    console.log('this is updatedItem', updatedItem)
	return axios({
		url: `${apiUrl}/itens/${updatedItem.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { iten: updatedItem }
	})
}

// DELETE
export const removeItem = (user, itemId) => {
    return axios({
        url: `${apiUrl}/itens/${itemId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}