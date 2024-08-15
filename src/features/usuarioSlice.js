import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usuarioLogueado: false
}

export const usuarioSlice = createSlice({
    name: "usuario",
    initialState,
    reducers: {
        loguearUsuario: (state) => {
            state.usuarioLogueado = true;
        },
        desloguearUsuario: (state) => {
            state.usuarioLogueado = false;
        }
    }
});

export const { loguearUsuario, desloguearUsuario } = usuarioSlice.actions;
export default usuarioSlice.reducer;
