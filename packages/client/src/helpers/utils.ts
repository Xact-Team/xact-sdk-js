import {Observable, Subject} from 'rxjs';

import axios, {AxiosError, AxiosResponse} from 'axios';
import Logger from 'js-logger';

export function ApiCall<T>(clientId: string, verb: 'POST' | 'GET' | 'PATCH' | 'DELETE', path: string, body?): Promise<T> {
    return new Promise(async (resolve, reject) => {
        if (!clientId) {
            return Promise.reject('Please run await Client.initConnexion() first')
        }

        return getAxios<T>(verb, path, body).then((resp: AxiosResponse<T>) => {
            resolve(resp.data);
        }).catch((e: AxiosError) => {
            reject(e.response.data ? e.response.data.error : e.response.data);
        });
    })

}

function getAxios<T>(verb, path: string, body): Promise<AxiosResponse<T>> {
    switch (verb) {
        case 'POST':
            return axios.post(path, body);
        case 'GET':
            return axios.get(path);
        case 'PATCH':
            return axios.patch(path, body);
        case 'DELETE':
            return axios.delete(path);
    }
}

export function listenForEvent<T>(socket, action: string) {
    const subject = new Subject<T>();
    const obs: Observable<T> = subject.asObservable();

    socket.on(action, (res: T) => {
        subject.next(res);
    });

    return obs;
}
