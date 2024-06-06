import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../FormCategories.module.css';

function UserController() {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
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

    const fetchUsers = (filter) => {
        axios.get('/users/filter' + buildQueryParams(filter))
            .then(({ data }) => {
                setUsers(data.items);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    useEffect(() => {
        fetchUsers(filter);
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
        setFilter({ ...filter, page: 1 });
    };

    const handlePageChange = (newPage) => {
        setFilter({ ...filter, page: newPage });
    };

    const nextPage = () => {
        if (filter.page < totalPages) {
            handlePageChange(filter.page + 1);
        }
    };

    const prevPage = () => {
        if (filter.page > 1) {
            handlePageChange(filter.page - 1);
        }
    };

    const renderPagination = () => {
        const maxPageButtons = 5;
        const pages = [];
        let startPage = Math.max(1, filter.page - Math.floor(maxPageButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (endPage - startPage < maxPageButtons - 1) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={`${style.pageButton} ${filter.page === i ? style.activePage : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className={style.pagination}>
                {filter.page > 1 && (
                    <button onClick={prevPage} className={style.pageButton}>{"<"}</button>
                )}
                {pages}
                {filter.page < totalPages && (
                    <button onClick={nextPage} className={style.pageButton}>{">"}</button>
                )}
            </div>
        );
    };

    return (
        <div className={style.UpdateCategorias}>
            <div className={style.userList}>
                <input type="text" onChange={handleChange} name='email' value={filter.email} className={style.input}/>
                <button onClick={handleFilter} className={style.button}>Buscar</button>
                <div>
                    {users.length > 0 && renderPagination()}
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
