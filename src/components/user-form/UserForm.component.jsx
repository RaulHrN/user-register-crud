import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Styles
import './UserForm.css';
import CheckIcon from '@mui/icons-material/Check';
import { Button, TextField } from "@mui/material";

export const UserForm = ({ onEdit, setOnEdit, getUsers }) => {
    const ref = useRef();

    //Effects
    useEffect(() => {
         if(onEdit) {
            const currUser = ref.current;

            currUser.name.value = onEdit.name;
            currUser.email.value = onEdit.email;
            currUser.phone.value = onEdit.phone;
            currUser.birthday.value = onEdit.birthday;
         }
    }, [onEdit]);

    // Handlers
    const handleSubmit = async (e) => {
        e.preventDefault();

        const currUser = ref.current;

        if (
            !currUser.name.value ||
            !currUser.email.value ||
            !currUser.phone.value ||
            !currUser.birthday.value
          ) {
            return toast.warn("Preencha todos os campos!");
          }
      
          if (onEdit) {
            await axios
              .put("http://localhost:8800/" + onEdit.id, {
                name: currUser.name.value,
                email: currUser.email.value,
                phone: currUser.phone.value,
                birthday:currUser.birthday.value,
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));
          } else {
            await axios
              .post("http://localhost:8800", {
                name: currUser.name.value,
                email: currUser.email.value,
                phone: currUser.phone.value,
                birthday: currUser.birthday.value,
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));
          }
      
          currUser.name.value = "";
          currUser.email.value = "";
          currUser.phone.value = "";
          currUser.birthday.value = "";
      
          setOnEdit(null);
          getUsers();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input_area">
                <TextField type="text" defaultValue="Name" required />
                <TextField type="email" defaultValue="Email" required />
                <TextField type="number" defaultValue="Phone" required />
                <TextField type="date" defaultValue="Birthday" required />
            </div>

            <Button variant="contained" children="Save" endIcon={<CheckIcon />} />
        </form>
    )
}