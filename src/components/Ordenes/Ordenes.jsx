import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Ordenes.module.css';
import buildQueryParams from '../../Utils/QueryFilterPath';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState({
        fecha: "",
        orderBy: "",
        orderDirection: "",
        page: 1,
        pageSize: 15
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/orders' + buildQueryParams(filter));
                setOrders(response.data.items);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [filter]);

    const viewOrderDetails = (id) => {
        navigate(`/orders/${id}`);
    };

    const handleDateChange = (e) => {
        setFilter({ ...filter, fecha: e.target.value });
    };

    const handleFilter = () => {
        setFilter({ ...filter, page: 1 });
    };

    const formatISODate = (isoDateString) => {
        const date = new Date(isoDateString);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
        return formattedDate;
    };

    const handlePageChange = (newPage) => {
        setFilter({ ...filter, page: newPage });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Ordenes de compra</h2>
            <div className={styles.filterContainer}>
                <label htmlFor="fecha">Fecha: </label>
                <input
                    type="date"
                    id="fecha"
                    value={filter.fecha}
                    onChange={handleDateChange}
                    className={styles.input}
                />
                <button onClick={handleFilter} className={styles.button}>Filtrar</button>
            </div>
            <table className={styles.orderTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Fecha de creación</th>
                        <th>User</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{(order.total / 100).toFixed(2)}</td>
                            <td>{order.status}</td>
                            <td>{formatISODate(order.createdAt)}</td>
                            <td>{order.userId}</td>
                            <td>
                                <button onClick={() => viewOrderDetails(order.id)}>Ver Detalles</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                {filter.page > 1 && (
                    <button onClick={() => handlePageChange(filter.page - 1)} className={styles.pageButton}>{"<"}</button>
                )}
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.pageButton} ${filter.page === i + 1 ? styles.activePage : ''}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                {filter.page < totalPages && (
                    <button onClick={() => handlePageChange(filter.page + 1)} className={styles.pageButton}>{">"}</button>
                )}
            </div>
        </div>
    );
};

export default Orders;
