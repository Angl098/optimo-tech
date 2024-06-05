import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../FormCategories.module.css';

function UserController() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/users')
            .then(({data}) => {
                console.log(data);
                setUsers(data)})
            .catch(error => console.error('Error fetching users:', error));
    }, []);


    const handleBanUser = (userId) => {
        axios.post(`/users/ban/${userId}`)
            .then(() => {
                setUsers(users.map(user => user.id === userId ? { ...user, banned: true } : user));
            })
            .catch(error => console.error('Error banning user:', error));
    };

    const handleUnbanUser = (userId) => {
        axios.post(`/users/unBan/${userId}`)
            .then(() => {
                setUsers(users.map(user => user.id === userId ? { ...user, banned: false } : user));
            })
            .catch(error => console.error('Error unbanning user:', error));
    };

    return (
        <div className={style.UpdateCategorias}>
            <div className={style.userList}>
                <h3>Usuarios</h3>
                {users.map((user) => (
                    <div key={user.id} className={style.userItem}>
                        {user.name} - {user.email}
                        {user.banned ? (
                            <>
                                <span className={style.banned}>Banned</span>
                                <button onClick={() => handleUnbanUser(user.id)} className={style.button}>Unban</button>
                            </>
                        ) : (
                            <button onClick={() => handleBanUser(user.id)} className={style.button}>Ban</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserController;
