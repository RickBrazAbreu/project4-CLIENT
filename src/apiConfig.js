let apiUrl
const apiUrls = {
	production: 'https://yellow-stone-proj-back.herokuapp.com',
	development: 'http://localhost:8200',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl