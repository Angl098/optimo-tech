import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSuplement, cleanProductById, addToCart, showShoppingCart } from "../../Redux/actions";
import styles from "./Detail.module.css";
import axios from "axios";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const getSuplementById = useSelector((state) => state.getSuplementById);
    const [comments, setComments] = useState([]);
    const [productData, setProductData] = useState({
        image: "default-image-url.jpg",
        name: "Nombre del Suplemento",
        description: "Descripción del suplemento",
        category: [{ name: "Categoría 1" }, { name: "Categoría 2" }],
        price: 100,
    });

    useEffect(() => {
        axios.get(`/comments/${id}`).then(({ data }) => {
            setComments(data);
        });

        dispatch(getSuplement(id));
        return () => {
            dispatch(cleanProductById());
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (getSuplementById) {
            setProductData(getSuplementById);
        }
    }, [getSuplementById]);

    const handleAddToCart = () => {
        if (productData && productData.id) {
            dispatch(addToCart(productData));
            dispatch(showShoppingCart(true));
        }
    };

    const [newComment, setNewComment] = useState("");
    const [parentId, setParentId] = useState(null);
    const userId = JSON.parse(localStorage.getItem("User")).id;

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        axios.post("/comments", { content: newComment, userId, suplementId: id, parentId }).then(({ data }) => {
            // Update the comments list with the new comment
            setComments((prevComments) => [...prevComments, data]);
        });
        setNewComment("");
        setParentId(null);
    };

    const handleReplyToComment = (commentId) => {
        setParentId(commentId);
    };

    return (
        <div className={styles.body}>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={productData.image} alt={productData.name} />
                </div>
                <div className={styles.details}>
                    <h2 className={styles.title}>{productData.name}</h2>
                    <p className={styles.description}>{productData.description}</p>
                    <p className={styles.category}>Categoria: {productData.category?.name}</p>
                    <p className={styles.price}>Precio: ${productData.price}</p>
                    <button className={styles.btnAddToCart} onClick={handleAddToCart}>
                        Añadir al carrito
                    </button>
                    <Link to="/home">
                        <button className={styles.btnBack}>Volver</button>
                    </Link>
                </div>
                <div className={styles.commentsSection}>
                    <h3>Comentarios:</h3>
                    {comments.map((comment) => (
                        <div key={comment.id} className={styles.comment}>
                            <p className={styles.commentAuthor}>{comment.user.name}</p>
                            <p className={styles.commentContent}>{comment.content}</p>
                            {userId !== comment.userId && (
                                <div className={styles.commentActions}>
                                    <button
                                        className={styles.replyButton}
                                        onClick={() => handleReplyToComment(comment.id)}
                                    >
                                        Responder
                                    </button>
                                </div>
                            )}
                            {parentId === comment.id && (
                                <div className={styles.replyInput}>
                                    <input
                                        type="text"
                                        placeholder="Escribe tu respuesta..."
                                        value={newComment}
                                        onChange={handleCommentChange}
                                    />
                                    <button onClick={handleAddComment}>Responder</button>
                                </div>
                            )}
                            {comment.responses && comment.responses.length > 0 && (
                                <div className={styles.replySection}>
                                    {comment.responses.map((response) => (
                                        <div key={response.id} className={styles.comment}>
                                            <p className={styles.commentAuthor}>{response.user.name}</p>
                                            <p className={styles.commentContent}>{response.content}</p>
                                            {userId !== response.userId && (
                                                <div className={styles.commentActions}>
                                                    <button
                                                        className={styles.replyButton}
                                                        onClick={() => handleReplyToComment(response.id)}
                                                    >
                                                        Responder
                                                    </button>
                                                </div>
                                            )}
                                            {parentId === response.id && (
                                                <div className={styles.replyInput}>
                                                   <input
                                                        type="text"
                                                        placeholder="Escribe tu respuesta..."
                                                        value={newComment}
                                                        onChange={handleCommentChange}
                                                    /> 
                                                    <button onClick={handleAddComment}>Responder</button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.addComment}>
                    <input
                        type="text"
                        placeholder="Escribe tu comentario..."
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                    <button onClick={handleAddComment}>Agregar comentario</button>
                </div>
            </div>
        </div>
    );
};

export default Detail;
