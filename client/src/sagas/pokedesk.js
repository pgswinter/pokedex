import {
    put,
    call,
    takeLatest,
    all,
    fork,
} from "redux-saga/effects";

import {
    REQUEST_POKEDESK,
    REQUEST_ADD_POKEMON,
    REQUEST_REMOVE_POKEMON,
    REQUEST_SEARCH_POKEMON,
} from '../actions/pokedesk/pokedeskActionTypes';
import {
    reqPokedeskSuccess,
    reqPokedeskFail,

    reqAddPokemonSuccess,
    reqAddPokemonFail,

    reqRemovePokemonSuccess,
    reqRemovePokemonFail,

    reqSearchPokemonSuccess,
    reqSearchPokemonFail
} from '../actions/pokedesk/pokedeskActions';

import api from '../services/api';
// *********************************************************
// REQUEST REQUEST_POKEDESK
// *********************************************************
function* reqPokedesk(params) {
    try {
        const data = yield call(() => api.Pokedesk.getAllLimit(params.params));
        yield put(reqPokedeskSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(reqPokedeskFail(error))
    }
}
function* watchReqPokedesk() {
    yield takeLatest(REQUEST_POKEDESK, reqPokedesk);
}
// *********************************************************
// REQUEST REQUEST_SEARCH_POKEMON
// *********************************************************
function* reqSearchPokemon(params) {
    try {
        const data = yield call(() => api.Pokedesk.search(params.params));
        yield put(reqSearchPokemonSuccess(data));
        
    } catch (error) {
        console.log(error);
        yield put(reqSearchPokemonFail(error))
    }
}
function* watchReqSearchPokemon() {
    yield takeLatest(REQUEST_SEARCH_POKEMON, reqSearchPokemon);
}
// *********************************************************
// REQUEST REQUEST_ADD_POKEMON
// *********************************************************
function* reqAddPokemon(params) {
    try {
        const data = yield call(() => api.Pokedesk.add(params.params));
        yield put(reqAddPokemonSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(reqAddPokemonFail(error))
    }
}
function* watchReqAddPokemon() {
    yield takeLatest(REQUEST_ADD_POKEMON, reqAddPokemon);
}
// *********************************************************
// REQUEST REQUEST_REMOVE_POKEMON
// *********************************************************
function* reqRemovePokemon(params) {
    try {
        const data = yield call(() => api.Pokedesk.remove(params.params));
        yield put(reqRemovePokemonSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(reqRemovePokemonFail(error))
    }
}
function* watchReqRemovePokemon() {
    yield takeLatest(REQUEST_REMOVE_POKEMON, reqRemovePokemon);
}

export default function* () {
    yield all([
        fork(watchReqPokedesk),
        fork(watchReqAddPokemon),
        fork(watchReqRemovePokemon),
        fork(watchReqSearchPokemon)
    ])
}
