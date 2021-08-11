///API

const baseUrl = (path) => `http://localhost:3000/api/${path}`;

const loginAPI = async (username, password) => {
  return await fetch(baseUrl("auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });
};

const registerAPI = async (username, email, password) => {
  return await fetch(baseUrl("auth/register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
};

const getMeAPI = async (token) => {
  return await fetch(baseUrl("auth/me"), {
    method: "GET",
    headers: { "Content-Type": "application/json", authorization: token },
    
  });
};
