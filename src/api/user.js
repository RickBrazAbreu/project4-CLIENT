import apiUrl from "../apiConfig";
import axios from "axios";

export const getSubstatPrefs = (user) => {
  return axios({
    url: apiUrl + "/get-substat-prefs",
    method: "GET",
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

export const updateSubstatPrefs = (user, newPrefs) => {
  return axios({
    url: apiUrl + "/update-substat-prefs",
    method: "PATCH",
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { newPrefs }
  })
}