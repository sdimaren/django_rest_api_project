import api from './apiConfig'

const LOCALSTORAGE_KEY = 'token'

export async function signin(username, password) {
  const response = await api.post('/login/', { username, password });
  const { token, user } = response.data;
  localStorage.setItem(LOCALSTORAGE_KEY, token);
  localStorage.setItem('user', JSON.stringify(user));
  return response.data;
}

export async function signup(username, handle, email, password) {
  const response = await api.post('/signup/', {
      username, handle, email, password
  })

  return response.data
}

export async function isTokenValid() {
  const response = await api.get('/auth/test_token/')
  return response.data
}