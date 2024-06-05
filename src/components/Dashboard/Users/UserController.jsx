import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../FormCategories.module.css';

function UserController() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState({
        email: "",
        orderBy: "",
        orderDirection: "",
        page: 1,
        pageSize: 4
    });
    const [showChangePassword, setShowChangePassword] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    const buildQueryParams = (filter) => {
        let queryParams = "?";
        for (const [key, value] of Object.entries(filter)) {
            if (value !== null && value !== "") {
                if (Array.isArray(value) && value.length > 0) {
                    queryParams += `${key}=${value.join(",")}&`;
                } else {
                    queryParams += `${key}=${value}&`;
                }
            }
        }
        return queryParams;
    };

    useEffect(() => {
        axios.get('/users/filter' + buildQueryParams(filter))
            .then(({ data }) => {
                setUsers(data.items)
            })
            .catch(error => console.error('Error fetching users:', error));
    }, [filter]);

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

    const handleChangePassword = (email) => {
        axios.post(`/users/changePassword`, { email, newPassword })
            .then(() => {
                setNewPassword('');
                setShowChangePassword(null);
                alert('Contraseña actualizada exitosamente');
            })
            .catch(error => console.error('Error changing password:', error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleFilter = () => {
        axios.get('/users/filter' + buildQueryParams(filter))
            .then(({ data }) => {
                setUsers(data.items);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    const nextPage = () => {
        setFilter({ ...filter, page: filter.page + 1 });
        axios.get('/users/filter' + buildQueryParams(filter))
            .then(({ data }) => {
                setUsers(data.items);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    const prevPage = () => {
        setFilter({ ...filter, page: filter.page - 1 });
        axios.get('/users/filter' + buildQueryParams(filter))
            .then(({ data }) => {
                setUsers(data.items);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    return (
        <div className={style.UpdateCategorias}>
            <div className={style.userList}>
                <input type="text" onChange={handleChange} name='email' value={filter.email} />
                <button onClick={handleFilter}>Buscar</button>
                <div>
                    {users.length > 4 && (
                        <>
                            <button onClick={prevPage}>{"<"}</button>
                            <button onClick={nextPage}>{">"}</button>
                        </>
                    )}
                </div>
                <h3>Usuarios</h3>
                {users.map((user) => (
                    <div key={user.id} className={style.userItem}>
                        {user.name} - {user.email}
                        {user.banned ? (
                            <>
                                <span className={style.banned}>Baneado</span>
                                <button onClick={() => handleUnbanUser(user.id)} className={style.button}>Desbanear</button>
                            </>
                        ) : (
                            <button onClick={() => handleBanUser(user.id)} className={style.button}>Banear</button>
                        )}
                        <button onClick={() => setShowChangePassword(user.id)} className={style.button}>Cambiar Contraseña</button>
                        {showChangePassword === user.id && (
                            <div className={style.changePasswordForm}>
                                <input
                                    type="password"
                                    placeholder="Nueva Contraseña"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={style.input}
                                />
                                <button
                                    onClick={() => handleChangePassword(user.email)}
                                    className={style.button}
                                >
                                    Confirmar
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserController;
