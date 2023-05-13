import PropTypes from "prop-types";
import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = parseInt(amountRef.current.value);

        if (!enteredAmount || enteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                ref={amountRef}
                label="Amount"
                input={{
                    id: "amount" + props.id,
                    type: "number",
                    min: 1,
                    max: 5,
                    step: 1,
                    defaultValue: 1,
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
};

MealItemForm.propTypes = {
    id: PropTypes.string,
    onAddToCart: PropTypes.func,
};

export default MealItemForm;
