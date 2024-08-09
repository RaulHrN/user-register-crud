import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Styles
import './userForm.css';
import CheckIcon from '@mui/icons-material/Check';
import { Button, TextField } from "@mui/material";

export const UserForm = ({ onEdit, setOnEdit, getUsers }) => {
  const ref = useRef({
    name: null,
    email: null,
    phone: null,
    birthday: null,
  });

  //Effects
  useEffect(() => {
    if (onEdit) {
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
      return toast.warn("Fill in all fields.");
    }

    if (onEdit) {
      await axios
        .put(`http://localhost:8800/${onEdit.id}`, {
          name: currUser.name.value,
          email: currUser.email.value,
          phone: currUser.phone.value,
          birthday: currUser.birthday.value,
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input_area">
        <TextField
          type="text"
          label="Name"
          inputRef={(el) => (ref.current.name = el)}
          required
        />
        <TextField
          type="email"
          label="Email"
          inputRef={(el) => (ref.current.email = el)}
          required
        />
        <TextField
          type="tel"
          label="Phone"
          inputRef={(el) => (ref.current.phone = el)}
          required
        />
        <TextField
          type="date"
          inputRef={(el) => (ref.current.birthday = el)}
          required
        />
      </div>

      <Button variant="contained" children="Save" endIcon={<CheckIcon />} type="submit" />
    </form>
  )
}