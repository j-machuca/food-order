import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import PropTypes from "prop-types";
import CartContext from "../../store/cartContext";

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const { items } = useContext(CartContext);

    const itemsCount = items.reduce((prevValue, item) => {
        return prevValue + item.amount;
    }, 0);

    const btnClasses = `${styles.button} ${
        btnIsHighlighted ? styles.bump : ""
    }`;

    useEffect(() => {
        if (items.length === 0) return;
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{itemsCount}</span>
        </button>
    );
};

HeaderCartButton.propTypes = {
    onClick: PropTypes.func,
};

export default HeaderCartButton;
