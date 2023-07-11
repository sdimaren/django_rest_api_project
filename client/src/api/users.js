import api from "./apiConfig";

export async function getProfile(id) {
  const response = await api.get(`users/${id}/`)
  return response.data
}

export async function editProfile(id, username, handle, email, password, inital_username) {
  const token = localStorage.getItem('token')
  const response = await api.patch(`/users/${inital_username}/`, {
    username,
    handle,
    email,
    password
  }, {
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  console.log('resp:')
  console.log(response.data)
  localStorage.setItem('user', JSON.stringify(response.data))
  return response.data
}

export async function deleteProfile(id, token) {
  const response = await api.delete(`users/${id}/`, {headers: {'Authorization': `token ${token}`}});
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return response.data
}