import { useContext } from "react";
import CartContext from "../../store/cartContext";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import PropTypes from "prop-types";
import CartItem from "./CartItem";

const Cart = (props) => {
    const { items, totalAmount, addItem, removeItem } = useContext(CartContext);

    const displayTotal = `$ ${totalAmount.toFixed(2)}`;

    const removeFromCartHandler = (id) => {
        removeItem(id);
    };

    const addFromCartHandler = (item) => {
        addItem({ ...item, amount: 1 });
    };

    const cartItems = (
        <ul className={styles["cart-items"]}>
            {items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={removeFromCartHandler.bind(null, item.id)}
                    onAdd={addFromCartHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    return (
        <Modal showCartHandler={props.showCartHandler}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{displayTotal}</span>
            </div>
            <div className={styles.actions}>
                <button
                    onClick={props.showCartHandler}
                    className={styles["button--alt"]}
                >
                    Close
                </button>
                {items.length > 0 && (
                    <button
                        onClick={props.showCartHandler}
                        className={styles.button}
                    >
                        Order
                    </button>
                )}
            </div>
        </Modal>
    );
};

Cart.propTypes = {
    showCartHandler: PropTypes.func,
};

export default Cart;
