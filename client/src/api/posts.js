import api from './apiConfig'

// GET requests
export async function getPosts() {
  const response = await api.get('/posts/')
  console.log(response.data);
  return response.data
}

export async function getPost(id) {
  const response = await api.get(`/posts/${id}/`)
  console.log(response.data);
  return response.data
}

// POST requests
export async function createPost(text, author_id) {
  console.log('id:');
  console.log(author_id);
  const response = await api.post('/posts/', {
    text,
    author_id
  })
  console.log('resp:');
  console.log(response.data);
  return response.data
}

// DELETE requests
export const deletePost = async(id, token) => {
  try {
      const response = await api.delete(`posts/${id}/`, {headers: {'Authorization': `token ${token}`}});
      return response.data;
  } catch (error) {
      throw error;
  }
}