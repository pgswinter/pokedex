import {
    REQUEST_PROCESS_LOCAL,
    REQUEST_SEARCH_POKEMON,
    REQUEST_SEARCH_POKEMON_SUCCESS,
    REQUEST_SEARCH_POKEMON_FAIL
} from '../actions/pokedesk/pokedeskActionTypes';

export let defaultData = {}

const initialState = {
    loading: false,
    error: '',
    data: [],
    isLoaded: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_SEARCH_POKEMON:
            return {
                ...state,
                loading: true
            }
        case REQUEST_PROCESS_LOCAL:
            const currentUnselectList = state.data
            
            defaultData = action.params.data;
            const type = action.params.type;
            const id = action.params.id;
            if (type === 'remove/search/notPicked') {
                defaultData = {
                    pokedesk: defaultData.filter(item => item.id !== id)
                }
                console.log(defaultData.pokedesk);
            }
            if (type === 'remove/search/wasPicked') {
                const selectedPokemonWasRemoved = defaultData.filter(item => item.id === id)[0]
                currentUnselectList.push(selectedPokemonWasRemoved)
                defaultData = {
                    pokedesk: currentUnselectList
                }
            }
            return {
                ...state,
                loading: false,
                data: defaultData,
                isLoaded: true
            }
        case REQUEST_SEARCH_POKEMON_SUCCESS:
            defaultData = action && action.payload && action.payload.data;
            return {
                ...state,
                loading: false,
                data: defaultData,
                isLoaded: true
            }
        case REQUEST_SEARCH_POKEMON_FAIL:
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