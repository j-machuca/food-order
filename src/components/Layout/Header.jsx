import meals from "../../assets/meals.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import PropTypes from "prop-types";

const Header = (props) => {
    return (
        <>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.showCartHandler} />
            </header>
            <div className={styles["main-image"]}>
                <img src={meals} />
            </div>
        </>
    );
};

Header.propTypes = {
    showCartHandler: PropTypes.func,
};

export default Header;
