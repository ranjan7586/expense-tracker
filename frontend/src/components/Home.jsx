import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/contextProvider'
import axiosInstance from '../context/axios';

const Home = () => {
  const [users, setUsers] = useState([]);
  async function getUsers() {
    try {
      const response = await axiosInstance.get('/api/v1/users');
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      Home
      {/* Render users or handle loading */}
    </div>
  );
}

export default Home;
