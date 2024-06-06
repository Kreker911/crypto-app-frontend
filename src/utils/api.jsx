import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

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
    // return <ErrorMessage message={error.message} />;
    return null;
  }
}
