"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
global.requestAnimationFrame = function (callback) {
    setTimeout(callback, 0);
};
var enzyme_1 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
enzyme_1.configure({ adapter: new Adapter() });
