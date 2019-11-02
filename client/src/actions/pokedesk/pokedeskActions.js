import {
    REQUEST_POKEDESK,
    REQUEST_POKEDESK_SUCCESS,
    REQUEST_POKEDESK_FAIL,

    REQUEST_ADD_POKEMON,
    REQUEST_ADD_POKEMON_SUCCESS,
    REQUEST_ADD_POKEMON_FAIL,

    REQUEST_REMOVE_POKEMON,
    REQUEST_REMOVE_POKEMON_SUCCESS,
    REQUEST_REMOVE_POKEMON_FAIL,

    REQUEST_SEARCH_POKEMON,
    REQUEST_SEARCH_POKEMON_SUCCESS,
    REQUEST_SEARCH_POKEMON_FAIL
} from './pokedeskActionTypes';
// *********************************************************
// REQUEST REQUEST_POKEDESK
// *********************************************************
export const reqPokedesk = (params) => {
    return {
        type: REQUEST_POKEDESK,
        params
    }
}
export const reqPokedeskSuccess = (data) => {
    return {
        type: REQUEST_POKEDESK_SUCCESS,
        payload: data
    }
}
export const reqPokedeskFail = (error) => ({
    type: REQUEST_POKEDESK_FAIL,
    payload: error
})
// *********************************************************
// REQUEST REQUEST_SEARCH_POKEMON
// *********************************************************
export const reqSearchPokemon = (params) => {
    return {
        type: REQUEST_SEARCH_POKEMON,
        params
    }
}
export const reqSearchPokemonSuccess = (data) => {
    return {
        type: REQUEST_SEARCH_POKEMON_SUCCESS,
        payload: data
    }
}
export const reqSearchPokemonFail = (error) => ({
    type: REQUEST_SEARCH_POKEMON_FAIL,
    payload: error
})
// *********************************************************
// REQUEST REQUEST_ADD_POKEMON
// *********************************************************
export const reqAddPokemon = (params) => {
    return {
        type: REQUEST_ADD_POKEMON,
        params
    }
}
export const reqAddPokemonSuccess = (data) => {
    return {
        type: REQUEST_ADD_POKEMON_SUCCESS,
        payload: data
    }
}
export const reqAddPokemonFail = (error) => ({
    type: REQUEST_ADD_POKEMON_FAIL,
    payload: error
})
// *********************************************************
// REQUEST REQUEST_REMOVE_POKEMON
// *********************************************************
export const reqRemovePokemon = (params) => {
    return {
        type: REQUEST_REMOVE_POKEMON,
        params
    }
}
export const reqRemovePokemonSuccess = (data) => {
    return {
        type: REQUEST_REMOVE_POKEMON_SUCCESS,
        payload: data
    }
}
export const reqRemovePokemonFail = (error) => ({
    type: REQUEST_REMOVE_POKEMON_FAIL,
    payload: error
})