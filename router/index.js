import Cards from '../controllers';

export default (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Pokedesk API!',
    }));
    app.get('/api/cards/:limit', Cards.getAllLimitPokemon);
    app.get('/api/cards/:limit/:name/:type', Cards.getPokemon);
    app.post('/api/cards/add', Cards.addPokemon);
    app.post('/api/cards/remove', Cards.removePokemon);
    app.post('/api/cards/search', Cards.searchPokemon);
    app.post('/api/cards/create', Cards.createPokemon);
}