import {Observable, Subject} from 'rxjs';

import axios, { AxiosResponse } from 'axios';

export function ApiCall<T>(clientId: string, verb: 'POST' | 'GET' | 'PATCH', path: string, body?): Promise<T> {
    return new Promise(async (resolve, reject) => {
        if (!clientId) {
            return Promise.reject('Please run await Client.initConnexion() first')
        }

        return getAxios<T>(verb, path, body).then((resp: AxiosResponse<T>) => {
            resolve(resp.data);
        }).catch(reject);
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
