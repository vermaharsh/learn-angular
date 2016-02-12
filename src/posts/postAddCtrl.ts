/// <reference path="../common/services/ConstantService.ts" />
/// <reference path="../common/services/DataService.ts" />
/// <reference path="../domain/Post.ts" />
/// <reference path="../../typings/main.d.ts" />

module app.postAdd {

    interface IAddPostViewModel {
        post: app.domain.IPost;
        add(): void;
    }

    class PostAddCtrl implements IAddPostViewModel {

        post: app.domain.IPost;

        static $inject = ['$location', 'constantService', 'dataService'];
        constructor(private $location: ng.ILocationService,
            private constantService: app.common.services.ConstantService,
            private dataService: app.common.services.DataService) {
        }

        add(): void {
            this.dataService.add(this.constantService.apiPostURI, this.post)
                .then((result: app.domain.IPost) => {
                    alert(result.Title + ' submitted successfully');
                    this.$location.path('/');
                });
        }
    }

    angular.module('testAdd')
        .controller('PostAddCtrl', PostAddCtrl);
}
