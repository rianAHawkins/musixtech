import axios from 'axios';

export default class API{
    constructor (){
        //token
        this.client = null;
        this.api_url="http://localhost:8080/";
    }

    init(){
        const headers = {
            Accept:'application/json'
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout:31000,
            header:headers
        });

        return this.client;
    }

    setBaseURL(newURL){
        this.api_url=newURL;
    }

    getHB(){
        return this.init().get('hb')
        //return fetch('http://localhost:8080/api/HB');
    }
}