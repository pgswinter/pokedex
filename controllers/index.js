import fs from 'fs';
import data from '../data';
import path from 'path';
const { pokedesk } = data
class Cards {
    static searchPokemon(req, res) {
        const {
            search_text,
        } = req.body;
        const filterPokedesk = pokedesk.filter(item => {
            if (
                item.name.toLowerCase().indexOf(search_text.toLowerCase()) >= 0 && 
                search_text !== "" &&
                item.isPicked === false
            ) {
                return item;
            }
        });
        return res.status(200).send({
            message: 'Add new pokemon success',
            search_result: filterPokedesk
        })
    }
    static getAllLimitPokemon(req, res) {
        const { limit } = req.params;

        const filterPokedesk = pokedesk.filter(item => {
            if (
                item.isPicked === true
            ) {
                return item;
            }
        });

        const newPokedesk = filterPokedesk.slice(0, limit);
        return res.status(200).send({
            pokedesk: newPokedesk
        })
    }
    static getPokemon(req, res) {
        const { limit, name, type } = req.params;

        const filterPokedesk = pokedesk.filter(item => {
            if (
                item.type.toLowerCase() === type.toString() &&
                item.name.toLowerCase() === name.toString().toLowerCase() &&
                item.isPicked === true
            ) {
                return item;
            }
        });

        const newPokedesk = filterPokedesk.slice(0, limit);
        return res.status(200).send({
            pokedesk: newPokedesk
        })
    }
    static addPokemon(req, res) {
        const {
            id
        } = req.body;
        const newPokedesk = pokedesk.map(item => {
            if (item.id === id) {
                item.isPicked = true
            }
            return item;
        });

        const newData = {
            "pokedesk": newPokedesk
        }

        fs.writeFileSync(path.join(__dirname, '../data/index.json'), JSON.stringify(newData, null, 4));
        return res.status(200).send({
            message: 'remove pokemon success',
            new_pokedesk: pokedesk
        })
    }
    static createPokemon(req, res) {
        const {
            name,
            type,
            hp,
        } = req.body;
        const attacks = req.body.attacks || '';
        const weaknesses = req.body.weaknesses || '';
        const biggestId = pokedesk.sort((a, b) => b.id - a.id)[0].id;

        const newPokemon = {
            id: biggestId + 1,
            name,
            hp,
            type,
            attacks,
            weaknesses,
        }
        pokedesk.push(newPokemon);
        data.pokedesk = pokedesk;
        fs.writeFileSync(path.join(__dirname, '../data/index.json'), JSON.stringify(data, null, 4));
        return res.status(200).send({
            message: 'Add new pokemon success',
            new_pokedesk: data.pokedesk
        })
    }

    static removePokemon(req, res) {
        const {
            id
        } = req.body;
        const newPokedesk = pokedesk.map(item => {
            if (item.id === id) {
                item.isPicked = false
            }
            return item;
        });

        const newData = {
            "pokedesk": newPokedesk
        }

        fs.writeFileSync(path.join(__dirname, '../data/index.json'), JSON.stringify(newData, null, 4));
        return res.status(200).send({
            message: 'remove pokemon success',
            new_pokedesk: pokedesk
        })
    }
}

export default Cards