
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const token = localStorage.getItem('jwtToken')

console.log("Backend token:", token);

export { BACKEND_URL, token }