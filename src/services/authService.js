import axios from 'axios';

export const login = async (email, password) => {
  const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
  return response.data;
};

// export const register = async (firstname,lastname , email, password) => {
//   const response = await axios.post('http://localhost:3000/api/auth/register', { firstname,lastname , email, password });
//   return response.data;
// };
export const register = async (firstname, lastname, email, password) => {
    try {
      console.log(firstname,lastname,email,password,'checker')
      const response = await axios.post(
        'http://localhost:3000/api/auth/register',
        { firstname, lastname, email, password },
        {
          headers: { 'Content-Type': 'application/json' }, // Ensure correct headers
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data);  // Log the actual error message from the server
      throw error;  // Rethrow to handle in calling function
    }
  };
  
