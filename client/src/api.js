// api.js

const baseURL = process.env.NODE_ENV === "development"
  ? "http://localhost:5000"
  : "https://sparktales-blog-app.vercel.app";

export default baseURL;
