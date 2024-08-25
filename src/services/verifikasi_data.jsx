const getUserToken = () => {
  return localStorage.getItem("userToken");
};

export const Validation = () => {
  const userToken = getUserToken();
  if (!userToken) {
    return false;
  }
  return true;
};