import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './User.module.css';
import buildQueryParams from '../../../Utils/QueryFilterPath';

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
        <div className={style.container}>
            <div className={style.filterSection}>
                <input type="text" onChange={handleChange} name='email' value={filter.email} className={style.input} placeholder="Buscar por email" />
                <button onClick={handleFilter} className={style.button}>Buscar</button>
            </div>
            <div className={style.userList}>
                <h3>Usuarios</h3>
                {users.map((user) => (
                    <div key={user.id} className={style.userItem}>
                        <div className={style.userInfo}>
                            <p>{user.name} - {user.email}</p>
                            {user.banned ? (
                                <span className={style.banned}>Baneado</span>
                            ) : null}
                        </div>
                        <div className={style.userActions}>
                            {user.banned ? (
                                <button onClick={() => handleUnbanUser(user.id)} className={style.button}>Desbanear</button>
                            ) : (
                                <button onClick={() => handleBanUser(user.id)} className={style.button}>Banear</button>
                            )}
                            <button onClick={() => setShowChangePassword(user.id)} className={style.button}>Cambiar Contraseña</button>
                        </div>
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
                {users.length > 0 && renderPagination()}
            </div>
        </div>
    );
}

export default UserController;
