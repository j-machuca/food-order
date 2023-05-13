import { useReducer } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    // eslint-disable-next-line no-unused-vars
    addItem: (item) => {},
    // eslint-disable-next-line no-unused-vars
    removeItem: (id) => {},
});

const defaultState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const newTotal =
            state.totalAmount + action.payload.price * action.payload.amount;

        const itemIndex = state.items.findIndex(
            (item) => item.id === action.payload.id
        );

        let updatedItems;

        if (itemIndex !== -1) {
            const currItem = state.items[itemIndex];
            const updatedItem = {
                ...currItem,
                amount: currItem.amount + action.payload.amount,
            };
            updatedItems = [...state.items];
            updatedItems[itemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.payload);
        }

        return {
            items: updatedItems,
            totalAmount: newTotal,
        };
    }
    if (action.type === "REMOVE") {
        const itemIndex = state.items.findIndex(
            (item) => item.id === action.payload
        );
        const currItem = state.items[itemIndex];
        const newTotal = state.totalAmount - currItem.price;

        let updatedItems;
        if (currItem.amount === 1) {
            // remove item from array
            updatedItems = state.items.filter(
                (item) => item.id !== action.payload
            );
        } else {
            // decrease value by one
            const updatedItem = { ...currItem, amount: currItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[itemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: newTotal,
        };
    }

    return defaultState;
};

const CartProvider = (props) => {
    const [cartState, dispatch] = useReducer(cartReducer, defaultState);

    const addItem = (item) => {
        dispatch({ type: "ADD", payload: item });
    };

    const removeItem = (id) => {
        dispatch({ type: "REMOVE", payload: id });
    };

    const cartContextValue = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem,
        removeItem,
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {props.children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.bool, PropTypes.element])
    ),
};

export { CartProvider };

export default CartContext;
