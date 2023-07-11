import base from "./baseURL";

export  const LOCALSTORAGE_KEY = "token";

export async function signin(username, password) {
  // Make request to singin user to retrieve a token
  const response = await base.post("users/signin", {
    username,
    password,
  });

  // Put the token on localstorage, for 30min (duration set in server)
  localStorage.setItem(LOCALSTORAGE_KEY, response.data.token);

  return response.data;

}

export async function signup(username, password) {
  const response = await base.post("users/signup", {
    username,
    password,
  });

  return response.data;
}

export async function isTokenValid() {
  try {
    const response = await base.get('/auth/isTokenValid');
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Token validation failed:', error);
    throw error;
  }
}