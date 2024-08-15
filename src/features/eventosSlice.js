// src/features/eventosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    eventos: []
}

export const eventosSlice = createSlice({
    name: "eventos",
    initialState,
    reducers: {
        guardarEventos: (state, action) => {
            state.eventos = action.payload;
        },
        agregarEvento: (state, action) => {
            state.eventos.push(action.payload);
        },
        eliminarEvento: (state, action) => {
            state.eventos = state.eventos.filter(evento => evento.id !== action.payload);
        }
    }
})

export const { guardarEventos, agregarEvento, eliminarEvento} = eventosSlice.actions;
export default eventosSlice.reducer;
