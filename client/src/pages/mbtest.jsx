import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";




  export default function App() {  const { username } = useParams(username);
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getUser() {
    try {
      const useRes = await fetch(`http://localhost:8080/users/${username}`);
      if (!useRes.ok) {
        throw new Error("Failed to fetch user");
      }
      const userData = await useRes.json();
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  }