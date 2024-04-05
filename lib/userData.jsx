import { getToken } from "./authenticate";

async function authenticatedFetch(url, method, data = null) {
  const token = getToken();
  const headers = {
    'Authorization': `JWT ${token}`,
    'Content-Type': 'application/json'
  };

  const options = {
    method: method,
    headers: headers
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const responseData = await response.json();

  if (response.status === 200) {
    return responseData;
  } else {
    return [];
  }
}

// Function to add to favourites
async function addToFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return authenticatedFetch(url, 'PUT');
}

// Function to remove from favourites
async function removeFromFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return authenticatedFetch(url, 'DELETE');
}

// Function to get favourites
async function getFavourites() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
  return authenticatedFetch(url, 'GET');
}

// Function to add to history
async function addToHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return authenticatedFetch(url, 'PUT');
}

// Function to remove from history
async function removeFromHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return authenticatedFetch(url, 'DELETE');
}

// Function to get history
async function getHistory() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history`;
  return authenticatedFetch(url, 'GET');
}

export { addToFavourites, removeFromFavourites, getFavourites, addToHistory, removeFromHistory, getHistory };
