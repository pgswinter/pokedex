import {
    REQUEST_POKEDESK,
    REQUEST_POKEDESK_SUCCESS,
    REQUEST_POKEDESK_FAIL,
    REQUEST_PROCESS_LOCAL
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
        case REQUEST_POKEDESK:
            return {
                ...state,
                loading: true
            }
        case REQUEST_PROCESS_LOCAL:
            const currentSelectedList = state.data.pokedesk
            defaultData = action.params.data;
            const type = action.params.type;
            const id = action.params.id;
            if (type === 'remove/wasPicked') {
                defaultData = {
                    pokedesk: defaultData.filter(item => item.id !== id)
                }
            }
            if (type === 'remove/notPicked') {
                const unselectedPokemonWasRemoved = defaultData.filter(item => item.id === id)[0]
                currentSelectedList.push(unselectedPokemonWasRemoved)
                defaultData = {
                    pokedesk: currentSelectedList
                }
            }
            if (type === 'remove/search/notPicked') {
                const unselectedPokemonWasRemoved = defaultData.filter(item => item.id === id)[0]
                currentSelectedList.push(unselectedPokemonWasRemoved)
                defaultData = {
                    pokedesk: currentSelectedList
                }
            }
            return {
                ...state,
                loading: false,
                data: defaultData,
                isLoaded: true
            }
        case REQUEST_POKEDESK_SUCCESS:
            defaultData = action && action.payload && action.payload.data;
            return {
                ...state,
                loading: false,
                data: defaultData,
                isLoaded: true
            }
        case REQUEST_POKEDESK_FAIL:
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