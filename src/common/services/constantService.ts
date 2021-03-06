/// <reference path="../../../typings/main.d.ts" />

module app.common.services {

    interface IConstant {
        apiPostURI: string;
    }

    export class ConstantService implements IConstant {
        apiPostURI: string;

        constructor() {
            this.apiPostURI = '/api/posts/';
        }
    }

    angular.module('testApp')
        .service('constantService', ConstantService);
}
