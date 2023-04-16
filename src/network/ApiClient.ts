import axios, {AxiosResponse} from "axios";

const DEFAULT_API_VERSION = '3';
const BASE_URL = 'https://api.themoviedb.org';

interface ApiClientOption {
    apiVersion?:string
}
interface ApiKeys {
    movieApiKey?:string
}

class ApiClient {
    // define variables
    private apiVersion: string;
    private options: ApiClientOption;
    private resource: string;
    private apiKeys: ApiKeys;

    constructor(resource:string,options:ApiClientOption={}){
        this.apiVersion = options.apiVersion || DEFAULT_API_VERSION;
        this.options = options;
        this.resource = resource;
        this.apiKeys = {
            movieApiKey: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
        };
    }

    get url(){
        return `${this.baseUrl()}/${this.apiVersion}/${this.resource}`;
    }

    baseUrl(){
        return BASE_URL;
    }

    get():Promise<AxiosResponse>{
        return axios.get(this.url);
    }

    getKeys(){
        return this.apiKeys;
    }
}

export default ApiClient;

