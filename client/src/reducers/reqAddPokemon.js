import {
    REQUEST_ADD_POKEMON,
    REQUEST_ADD_POKEMON_SUCCESS,
    REQUEST_ADD_POKEMON_FAIL,
} from '../actions/pokedesk/pokedeskActionTypes';

export let defaultData = {}

const initialState = {
    loading: false,
    error: '',
    data: {},
    isLoaded: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_ADD_POKEMON:
            return {
                ...state,
                loading: true
            }
        case REQUEST_ADD_POKEMON_SUCCESS:
            defaultData = action && action.payload && action.payload.data;
            return {
                ...state,
                loading: false,
                data: defaultData,
                isLoaded: true
            }
        case REQUEST_ADD_POKEMON_FAIL:
            return {
                ...state,
                loading: false,
                error: action,
                isLoaded: true
            }
        default:
            return state;
    }
}