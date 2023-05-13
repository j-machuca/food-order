import PropTypes from "prop-types";
import styles from "./Card.module.css";

const Card = ({ children }) => {
    return <div className={styles.card}>{children}</div>;
};

Card.propTypes = {
    children: PropTypes.element,
};

export default Card;
