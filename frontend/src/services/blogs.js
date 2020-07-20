import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = { headers: {Authorization: token} }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const likePost = async (object) => {
  const id = object.id
  const url = baseUrl + '/' + id
  const newObject = {
    description: object.description,
    user: object.user.id,
    likes : object.likes + 1,
    author: object.author,
    title : object.title,
    url: object.url,
    comments: object.comments
  }

  const response = await axios.put(url, newObject)
  return response.data
}

const commentPost = async (object, comment) => {
  const id = object.id
  const url = baseUrl + '/' + id
  const newComments = object.comments.concat(comment)

  const newObject = {
    description: object.description,
    user: object.user.id,
    likes : object.likes,
    author: object.author,
    title : object.title,
    url: object.url,
    comments: newComments
  }

  const response = await axios.put(url, newObject)
  console.log(response.data)
  return response.data
}

const setToken = (newtoken) => {
  token = `bearer ${newtoken}`
}

const deletePost = async (object) => {
  const id = object.id
  const url = baseUrl + '/' + id
  const config = { headers: {Authorization: token} }

  if(window.confirm(`Remove blog ${object.title} by ${object.author}`)){
    const response = await axios.delete(url, config)
    return response.data
  }

}

export default { getAll, create, setToken, likePost, deletePost, commentPost}