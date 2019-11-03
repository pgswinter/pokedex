import {
    REQUEST_SEARCH_LOCAL,
    REQUEST_PROCESS_LOCAL,
    REQUEST_ALL_UNSELECT_POKEMON,
    REQUEST_ALL_UNSELECT_POKEMON_SUCCESS,
    REQUEST_ALL_UNSELECT_POKEMON_FAIL,
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
        case REQUEST_ALL_UNSELECT_POKEMON:
            return {
                ...state,
                loading: true
            }
        case REQUEST_SEARCH_LOCAL:
            const searchText = action.params;
            const currentUnselectList2 = state.data.pokedesk
            const searchResult = currentUnselectList2.filter(item => item.name.indexOf(searchText) > -1);
            defaultData = {
                pokedesk: searchResult
            }
            return {
                ...state,
                loading: false,
                data: defaultData,
                isLoaded: true
            }
        case REQUEST_PROCESS_LOCAL:
            const currentUnselectList = state.data.pokedesk

            defaultData = action.params.data;
            const type = action.params.type;
            const id = action.params.id;
            if (type === 'remove/notPicked') {
                defaultData = {
                    pokedesk: defaultData.filter(item => item.id !== id)
                }
            }
            if (type === 'remove/wasPicked') {
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
        case REQUEST_ALL_UNSELECT_POKEMON_SUCCESS:
            defaultData = action && action.payload && action.payload.data;
            return {
                ...state,
                loading: false,
                data: defaultData,
                isLoaded: true
            }
        case REQUEST_ALL_UNSELECT_POKEMON_FAIL:
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