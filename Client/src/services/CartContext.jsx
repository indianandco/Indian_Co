import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = [];

const buyReducer = (state = initialState, action) => {
    switch (action.type) {
        case '[CARRITO] Agregar Compra':
            return [...state, action.payload];
        case '[CARRITO] Aumentar Cantidad Compra':
            return state.map(item => {
                if (item.id === action.payload) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        case '[CARRITO] Disminuir Cantidad Compra':
            return state.map(item => {
                if (item.id === action.payload && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
        case '[CARRITO] Eliminar Compra':
            return state.filter(compra => compra.id !== action.payload);
        default:
            return state;
    }
};

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [buyLists, dispatch] = useReducer(buyReducer, initialState);

    const clickAdd = (buy) => {
        buy.quantity = 1;
        const action = {
            type: '[CARRITO] Agregar Compra',
            payload: buy
        };
        dispatch(action);
    };

    const addQuantity = (id) => {
        const action = {
            type: '[CARRITO] Aumentar Cantidad Compra',
            payload: id
        };
        dispatch(action);
    };

    const removeQuantity = (id) => {
        const action = {
            type: '[CARRITO] Disminuir Cantidad Compra',
            payload: id
        };
        dispatch(action);
    };

    const clickRemove = (id) => {
        const action = {
            type: '[CARRITO] Eliminar Compra',
            payload: id
        };
        dispatch(action);
    };

    return (
        <CartContext.Provider value={{ buyLists, clickAdd, clickRemove, removeQuantity, addQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
