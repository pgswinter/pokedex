import {
    all,
    fork
} from 'redux-saga/effects';

import pokedesk from './sagas/pokedesk';

export default function* () {
    yield all([
        fork(pokedesk)
    ])
}