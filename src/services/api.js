import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Users
export const getUsers = () => api.get("/users");
export const getUserPosts = (userId) => api.get(`/users/${userId}/posts`);
export const getUserAlbums = (userId) => api.get(`/users/${userId}/albums`);

// Posts
export const getPostDetail = (postId) => api.get(`/posts/${postId}`);
export const getPostComments = (postId) => api.get(`/posts/${postId}/comments`);

// Albums
export const getAlbumPhotos = (albumId) => api.get(`/albums/${albumId}/photos`);

// Photos
export const getPhotoDetail = (photoId) => api.get(`/photos/${photoId}`);

// Posts CRUD
export const createPost = (data) => api.post("/posts", data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Comments CRUD
export const createComment = (data) => api.post("/comments", data);
export const updateComment = (id, data) => api.put(`/comments/${id}`, data);
export const deleteComment = (id) => api.delete(`/comments/${id}`);
