import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllItems = (user) => {
	// console.log(user)
    return axios({
	url: apiUrl + '/ietms',
	method: 'GET',
	headers: {
		Authorization: `Token token=${user.token}`,
	}
})
}

// READ => SHOW
export const getOneItem = (user, id) => {
    return axios({
		url: apiUrl + '/ietms/' + id,
		method: 'GET',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}

export const createItem = (user, newItem) => {
	console.log('newItem', newItem)
	return axios({
		url: apiUrl + '/items',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { item: newItem }
	})
}

export const updateItem = (user, updatedItem) => {
    console.log('this is updatedItem', updatedItem)

	return axios({
		url: `${apiUrl}/items/${updatedItem._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { item: updatedItem }
	})
}

export const removeItem = (user, itemId) => {
    return axios({
        url: `${apiUrl}/items/${itemId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}

export const seedItems = (user) => {
	return axios({
		url: `${apiUrl}/items/seed`,
		method: "GET",
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	});
}