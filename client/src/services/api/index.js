import axios from 'axios';
import PokedeskApi from './Pokedesk';

const get = async (path) => {
    // console.log(`path: `, path);
    const result = await axios({
        method: 'get',
        url: path,
    }).catch(error => console.log(error));
    // console.log(`result GET in API`, result);
    return result;
}

const post = async (path, body) => {
    // console.log(`path: `, path);
    // console.log(`body: `, body);
    const result = await axios({
        method: 'post',
        url: path,
        data: body
    }).catch(error => console.log(error));
    // console.log(`result POST in API`, result);
    return result;
}

const Pokedesk = new PokedeskApi({ post, get });

export default {
    Pokedesk,
}