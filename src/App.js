import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

// Styles
import "./app.css"

// Components
import { UserForm } from "./components/user-form/UserForm.component";
import { Grid } from "./components/grid/Grid.component";

function App() {

  // States
  const [users, setUsers]= useState([]);
  const [onEdit, setOnEdit]= useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.name > b.name ? 1: -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  // Effects
  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <div className="App">
        <h2>Users Registration</h2>
        <UserForm onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} setUsers={setUsers} users={users} />
      <ToastContainer autoClose={3000} position="bottom-left" />
    </div>
  );
}

export default App;
