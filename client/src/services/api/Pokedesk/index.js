import {
    commonApi
} from '../../constant';

export default class {
    constructor(initApi) {
        this.initApi = initApi;
    }
    getAllUnselect = () => {
        return this.initApi.get(`${commonApi.getAllUnselect}`);
    }
    getAllLimit = (params) => {
        const { limit  } = params;
        return this.initApi.get(`${commonApi.get}${limit}`);
    }
    get = (params) => {
        const { limit, name, type } = params;
        return this.initApi.get(`${commonApi.get}${limit}/${name}/${type}`);
    }
    add = (body) => {
        return this.initApi.post(`${commonApi.add}`, body);
    }
    remove = (body) => {
        return this.initApi.post(`${commonApi.remove}`, body);
    }
    search = (body) => {
        return this.initApi.post(`${commonApi.search}`, body);
    }
}