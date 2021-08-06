// import MockAdapter from 'axios-mock-adapter';
// import * as axios from 'axios';
// import { Client, API_URL, Environment } from '..';
//
// describe('client', () => {
//     let client;
//     beforeEach(() => {
//         client = new Client();
//     });
//
//     it('should instantiate', () => {
//         expect(client).toBeTruthy();
//     });
//
//     it('should return data when generateQRCode is called', done => {
//         const mock = new MockAdapter(axios);
//         const data = {response: true};
//         const webhook = 'https://test.fr';
//         mock.onPost(`${API_URL}/authorize`, {
//             environment: Environment.TESTNET,
//             webhook
//         }).reply(200, data);
//         client.generateQRCode(Environment.TESTNET, webhook).then(response => {
//             expect(response).toEqual(data);
//             done();
//         });
//     })
//
// });
