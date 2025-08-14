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
