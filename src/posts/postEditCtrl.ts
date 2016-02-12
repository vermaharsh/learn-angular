/// <reference path="../common/services/ConstantService.ts" />
/// <reference path="../common/services/DataService.ts" />
/// <reference path="../domain/Post.ts" />
/// <reference path="../../typings/main.d.ts" />

module app.postEdit {

    interface IEditPostViewModel {
        post: app.domain.IPost;
        update(): void;
    }

    interface IPostParams extends ng.route.IRouteParamsService {
        id: number;
    }

    class PostEditCtrl implements IEditPostViewModel {

        post: app.domain.IPost;
        private postId: number;

        static $inject = ['$routeParams', '$location', 'constantService', 'dataService'];
        constructor(private $routeParams: IPostParams,
            private $location: ng.ILocationService,
            private constantService: app.common.services.ConstantService,
            private dataService: app.common.services.DataService) {
            this.postId = $routeParams.id;

            dataService.getSingle(this.constantService.apiPostURI + this.postId)
                .then((result: app.domain.IPost) => {
                    this.post = result;
                });
        }

        update(): void {
            this.dataService.update(this.constantService.apiPostURI + this.postId, this.post)
                .then((result: app.domain.IPost) => {
                    this.$location.path('/');
                });
        }
    }

    angular.module('testApp')
        .controller('PostEditCtrl', PostEditCtrl);
}
