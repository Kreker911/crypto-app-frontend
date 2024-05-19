// export function checkResponse(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     return Promise.reject(`Error: ${res.status}`);
//   }
// }

// export function request(url, options) {
//   return fetch(url, options).then(checkResponse);
// }

export async function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Error: ${res.status}`);
  }
}

export async function request(url, options) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (error) {
    console.error(error);
    return null;
  }
}
