const token = localStorage.getItem("token");
console.log(token);

export const header = {
  Authorization: `Bearer ${token}`,
};
