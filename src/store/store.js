
import { configureStore } from "@reduxjs/toolkit";
import eventosReducer from "../features/eventosSlice";
import categoriasReducer from "../features/categoriasSlice";
import usuarioReducer from "../features/usuarioSlice";

export const store = configureStore({
    reducer: {
        eventos: eventosReducer,
        categorias: categoriasReducer,
        usuario: usuarioReducer
    }
})

export default store;
