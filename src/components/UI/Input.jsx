import styles from "./Input.module.css";
import PropTypes from "prop-types";
import React from "react";

// const Input = (props, ref) => {
//     return (
//         <div className={styles.input}>
//             <label htmlFor={props.input.id}>{props.label}</label>
//             <input {...props.input} />
//         </div>
//     );
// };

const Input = React.forwardRef(function Input(props, ref) {
    return (
        <div className={styles.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} ref={ref} />
        </div>
    );
});

Input.propTypes = {
    label: PropTypes.string,
    input: PropTypes.object,
};

export default Input;
