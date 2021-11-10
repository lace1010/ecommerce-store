import axios from "axios";

const BASE_URL = "https://backend-ecommerce-store.herokuapp.com/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODNhZWQ2MGY4ZjIyOWJkNjk4MjIwYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjMwNTk0NSwiZXhwIjoxNjM2NTY1MTQ1fQ.AwJ-TVBHgCtGvYcRKbNjuRVE1KVg_6jn9v5fuayfPp4";

export const frontEndUrl = "http://localhost:3000";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
