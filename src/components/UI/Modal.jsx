import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const portalElement = document.getElementById("overlays");

const Backdrop = (props) => {
    return (
        <div className={styles.backdrop} onClick={props.showCartHandler}></div>
    );
};

Backdrop.propTypes = {
    showCartHandler: PropTypes.func,
};

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
};

ModalOverlay.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
};

const Modal = (props) => {
    return (
        <>
            {createPortal(
                <Backdrop showCartHandler={props.showCartHandler} />,
                portalElement
            )}
            {createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
};

Modal.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    showCartHandler: PropTypes.func,
};

export default Modal;
