import React from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Styles
import "./grid.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

export const Grid = ({ users, setUsers, setOnEdit }) => {

    //Handlers
    const handleEdit = (user) => {
        setOnEdit(user);
    };

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, i) => (
                    <tr key={i}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td><IconButton aria-label="Edit user" onClick={handleEdit}><EditIcon /></IconButton></td>
                        <td><IconButton aria-label="Delete user" onClick={handleDelete}><DeleteIcon /></IconButton></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}