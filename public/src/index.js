import HomeModel from './models/HomeModel.js';
// import ProductModel from './models/ProductModel.js';
// import { parseRequestUrl } from './utils.js';
// import Error404Model from './models/Error404Model.js';
// import SigninModel from './models/SigninModel.js';
// import RegisterModel from './models/RegisterModel.js';
// import Catalog from './catalog.js';
import Hood from './models/Hood.js';

const hoodContainer = document.getElementsByClassName("grid-container")[0];
const hood = new Hood(hoodContainer);
hood.render();

const root = document.getElementById('main-container');

const homeModel = new HomeModel(root);
homeModel.render();

// let user;
// coockieCheckRequest(user);

// async function f(user) {
//     return coockieCheckRequest(user);
// }

// let user = await f;

let result = cookieCheckRequest();

// async function f() {

//     let promise = new Promise((resolve, reject) => {
//         resolve(coockieCheckRequest())
//     });

//     let result = await promise; 

// }

// f();

let response;
(async () => {
    response = await cookieCheckRequest();
    // let user = await response.json();
    // let user = await console.log(response);
})();


console.log(response);

// console.log(user);


