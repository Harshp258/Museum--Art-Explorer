
import axios from 'axios';
import jwt_decode from "jwt-decode";



function setToken(token) {
  localStorage.setItem("token", token);
}


export function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    return null;
  }
}


export function removeToken() {
  localStorage.removeItem("token");
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwt_decode(token) : null;
  } catch (err) {
    return null;
  }
}


export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

export async function authenticateUser(user, password) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      userName: user,
      password: password
    });
    const token = response.data.token;
    setToken(token);
    return true;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return false;
  }
}



export async function registerUser(user, password, password2) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      userName: user,
      password: password,
      password2: password2
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
}
