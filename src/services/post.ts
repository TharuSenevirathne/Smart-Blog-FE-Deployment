// import api from "./api";
// import axios from "axios";

// type postDataTypes = {
//     title: string,
//     content: string,
//     tags: string,
//     image: string
// }

// export const getAllPosts = async (page: number = 1, limit: number = 10) => {
//   const response = await api.get('/', {
//     params: { page, limit } // query parameters
//   });
//   return response.data;
// }

// export const createPost = async (data: postDataTypes) => {
//   const response = await api.post('/post', data);
//   return response.data;
// }


// services/post.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/post"
});

export const getAllPosts = async (page: number = 1, limit: number = 10) => {
  const response = await api.get("/", {
    params: { page, limit }
  });
  return response.data; // { data: [...], totalPages: x }
};

