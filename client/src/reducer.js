import { combineReducers } from "redux";

import reqPokedesk from './reducers/reqPokedesk';
import reqAddPokemon from './reducers/reqAddPokemon';
import reqRemovePokemon from './reducers/reqRemovePokemon';
import reqSearchPokemon from './reducers/reqSearchPokemon';
import reqAllUnselectPokemon from './reducers/reqAllUnselectPokemon';

export default combineReducers({
    reqPokedesk,
    reqAddPokemon,
    reqRemovePokemon,
    reqSearchPokemon,
    reqAllUnselectPokemon,
})