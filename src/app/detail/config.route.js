(function () {
    'use strict';

    angular
        .module('app.detail')
        .run(appRun);

    /* @ngInject */
    appRun.$inject = ['statehelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'detail',
                config: {
                    url: '/user?id',
                    templateUrl: 'src/app/detail/detail.html',
                    controller: 'Detail',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();
