"use strict";var walletsApp=angular.module("walletsApp",["ui.router","userList","userTransactions","userDetail","templates"]);walletsApp.config(["$stateProvider","$locationProvider","$urlRouterProvider",function(e,r,t){e.state("user-list",{url:"/users",templateUrl:"controllers/user-list/UserListTemplate.html",controllerAs:"$ctrlUserList",controller:"UserListCtrl"}),e.state("user-detail",{url:"/user?id",templateUrl:"controllers/user-detail/UserDetailTemplate.html",controllerAs:"$ctrlDetail",controller:"UserDetailCtrl"}),e.state("user-transactions",{url:"/user/transactions?id",templateUrl:"controllers/user-transactions/UserTransactionsTemplate.html",controllerAs:"$ctrlUserTransactions",controller:"UserTransactionsCtrl"}),t.otherwise(function(e){var r=e.get("$state");r.go("user-list")})}]),walletsApp.run(["$rootScope","$location",function(e,r){e.$on("$locationChangeSuccess",function(){e.currentUrl=r.url()})}]);var userListCtrl=angular.module("userList",["core.user"]);userListCtrl.controller("UserListCtrl",["Users","$location","$injector",function(e,r,t){function a(){n.isLoading=!0,e(n.paginationsParams,function(e){n.users=e.data.data,n.isLoading=!1,n.pages=Math.ceil(e.data.recordsTotal/n.paginationsParams.limit)},function(){n.isLoading=!1})}var n=this;n.perPageChoices=[5,10,15],n.pages=0,n.paginationsParams={limit:n.perPageChoices[0],offset:0},a(),n.selectPerPage=function(e){n.paginationsParams.offset=0,n.paginationsParams.limit=e,a()},n.setPage=function(e){n.paginationsParams.offset=e,a()},n.openUser=function(e){var r=t.get("$state");r.go("user-detail",{id:e})},n.getPages=function(){return new Array(n.pages)}}]),angular.module("userEdit",["ui.router","core.user"]);var emailRegexp=new RegExp(["^","(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*",'|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]','|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")',"@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?","|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}","(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:","(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]","|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)","\\])","$"].join(""));angular.module("userEdit").component("userEdit",{templateUrl:"controllers/user-edit/UserEditTemplate.html",controllerAs:"$ctrlEdit",controller:["CreateUser","UpdateUser","OneUser","$stateParams","$location",function(e,r,t,a,n){var s=this;s.user={user_id:"",user_name:"",user_custom:"",email:""},a.id&&(s.userId=a.id,s.isLoading=!0,t(s.userId,function(e){s.user=e.data,s.isLoading=!1},function(){s.isLoading=!1})),s.submitUser=function(t){s.errors=[],t.email.length>0&&(emailRegexp.test(t.email)||s.errors.push({message:"Invalid email"})),t.user_id||s.errors.push({message:"ID is required!"}),s.errors.length>0||(s.isLoading=!0,s.userId?r(s.userId,t,function(e){s.isLoading=!1,e.data&&204!=e.data.http_status_code&&s.errors.push({message:e.data.message})},function(e){s.errors.push({message:e.message}),s.isLoading=!1}):e(t,function(e){s.isLoading=!1,e.data?204!=e.data.http_status_code&&s.errors.push({message:e.data.message}):n.path("/users/edit/"+t.user_id)},function(e){s.errors.push({message:e.message}),s.isLoading=!1}))}}]});var userDetailCtrl=angular.module("userDetail",["ui.router","userEdit","userInfo","newRecharge"]);userDetailCtrl.controller("UserDetailCtrl",["$stateParams",function(e){var r=this;e.id&&(r.id=e.id)}]),angular.module("userInfo",["ui.router","core.user"]),angular.module("userInfo").component("userInfo",{templateUrl:"controllers/user-info/UserInfoTemplate.html",controllerAs:"$ctrlInfo",controller:["OneUser","$stateParams",function(e,r){var t=this;t.user={},t.userId=r.id,t.isLoading=!0,e(t.userId,function(e){t.user=e.data,t.isLoading=!1},function(){t.isLoading=!1})}]});var userTransactionsCtrl=angular.module("userTransactions",["ui.router","transactionList"]);userTransactionsCtrl.controller("UserTransactionsCtrl",["$stateParams",function(e){var r=this;r.id=e.id}]),angular.module("transactionList",["ui.router","core.user"]),angular.module("transactionList").component("transactionList",{templateUrl:"controllers/transaction-list/TransactionListTemplate.html",controllerAs:"$ctrlTransactionList",controller:["UserTransactions","$stateParams",function(e,r){var t=this;t.userId=r.id;var a={datetime_from:"2015-01-01T00:00:00 UTC",datetime_to:"2017-03-03T00:00:00 UTC"};t.isLoading=!0,e(t.userId,a,function(e){t.isLoading=!1,t.transactions=e.data},function(){t.isLoading=!1})}]}),angular.module("newRecharge",["ui.router","core.user"]),angular.module("newRecharge").component("newRecharge",{templateUrl:"controllers/new-recharge/NewRechargeTemplate.html",controllerAs:"$ctrlNewRecharge",controller:["NewRecharge","$stateParams",function(e,r){var t=this;t.userId=r.id,t.newTransaction={amount:"",comment:""},t.submitRecharge=function(r){t.errors=[],t.errors.length>0||(t.isLoading=!0,e(t.userId,r,function(e){t.isLoading=!1,e.data&&(e.data.amount||t.errors.push({message:e.data.message}))},function(e){t.errors.push({message:e.message}),t.isLoading=!1}))}}]}),angular.module("core.user",["core-api"]),angular.module("core.user").factory("Users",["api","$http",function(e,r){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return e(r).get("/users",t,a,n)}}]).factory("OneUser",["api","$http",function(e,r){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return e(r).get("/users/"+t,null,a,n)}}]).factory("UpdateUser",["api","$http",function(e,r){return function(t,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return e(r).update("/users/"+t,a,n,s)}}]).factory("CreateUser",["api","$http",function(e,r){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return e(r).create("/users",t,a,n)}}]).factory("NewRecharge",["api","$http",function(e,r){return function(t,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return e(r).create("/users/"+t+"/recharge",a,n,s)}}]).factory("UserTransactions",["api","$http",function(e,r){return function(t,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return e(r).get("/users/"+t+"/transactions",a,n,s)}}]),angular.module("core-api",[]),angular.module("core-api").factory("api",[function(){var e="https://livedemo.xsolla.com/fe/test-task/baev";return function(r){function t(e,r,t){return r&&t?e.then(function(e){r(e)},function(e){e(e)}):t?e.then(function(e){e(e)}):r?e.then(function(e){r(e)}):e}function a(a){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i="";if(n){i="?";for(var u in n)n.hasOwnProperty(u)&&(i+=u+"="+n[u]+"&");i=i.slice(0,-1)}var l=r.get(e+a+i);return t(l,s,o)}function n(a,n,s,o){n||(n={});var i=r.put(e+a,n);return t(i,s,o)}function s(a,n,s,o){var i=r.post(e+a,n);return t(i,s,o)}return{update:n,create:s,get:a}}}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyJdLCJuYW1lcyI6WyJ3YWxsZXRzQXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsImNvbnRyb2xsZXIiLCIkbG9jYXRpb25Qcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsInVybCIsInN0YXRlIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyQXMiLCIkc3RhdGVQcm92aWRlciIsIiRpbmplY3RvciIsImdldCIsIiRzdGF0ZSIsImdvIiwiJHJvb3RTY29wZSIsImN1cnJlbnRVcmwiLCIkbG9jYXRpb24iLCIkY3RybFVzZXJMaXN0IiwibGltaXQiLCJvZmZzZXQiLCJzZWxlY3RQZXJQYWdlIiwidXNlckxpc3RDdHJsIiwicGFnaW5hdGlvbnNQYXJhbXMiLCJzZXRQYWdlIiwiaXNMb2FkaW5nIiwiJGN0cmxFZGl0IiwicmVzcCIsInVzZXJzIiwiZGF0YSIsInVzZXJfaWQiLCJ1c2VyX25hbWUiLCJwYWdlcyIsIk1hdGgiLCJjZWlsIiwidXNlcl9jdXN0b20iLCJyZWNvcmRzVG90YWwiLCJsb2FkVXNlcnMiLCJwZXJQYWdlQ2hvaWNlcyIsInVzZXJJZCIsIkFycmF5IiwicGFnZSIsIm9wZW5Vc2VyIiwiaWQiLCJnZXRQYWdlcyIsImVtYWlsUmVnZXhwIiwiUmVnRXhwIiwiam9pbiIsImNvbXBvbmVudCIsIkNyZWF0ZVVzZXIiLCJyZXNwb25zZSIsIlVwZGF0ZVVzZXIiLCJPbmVVc2VyIiwiJHN0YXRlUGFyYW1zIiwiZW1haWwiLCJ1c2VyRGV0YWlsQ3RybCIsIiRjdHJsRGV0YWlsIiwic3VibWl0VXNlciIsInVzZXIiLCJlcnJvcnMiLCJsZW5ndGgiLCJ0ZXN0IiwicHVzaCIsIm1lc3NhZ2UiLCIkY3RybEluZm8iLCIkY3RybFRyYW5zYWN0aW9uTGlzdCIsInBhcmFtcyIsImRhdGV0aW1lX2Zyb20iLCJkYXRldGltZV90byIsIlVzZXJUcmFuc2FjdGlvbnMiLCJlcnJvciIsInVzZXJUcmFuc2FjdGlvbnNDdHJsIiwiJGN0cmxVc2VyVHJhbnNhY3Rpb25zIiwiJGN0cmxOZXdSZWNoYXJnZSIsInN1Ym1pdFJlY2hhcmdlIiwidGhpcyIsInN1Y2Nlc3NDYiIsIiRodHRwIiwiZmFjdG9yeSIsImVycm9yQ2IiLCJiYXNlVXJsIiwic3VjY2VzcyIsInRyYW5zYWN0aW9ucyIsIk5ld1JlY2hhcmdlIiwibmV3VHJhbnNhY3Rpb24iLCJwYXJhbXNTdHJpbmciLCJrZXkiLCJzbGljZSIsIm5ld1JlY2hhcmdlIiwiYW1vdW50IiwicSIsInB1dCIsImFkZENhbGxiYWNrcyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImFwaSIsInVwZGF0ZSIsImNyZWF0ZSIsInRoZW4iLCJyZXN1bHQiLCJoYXNPd25Qcm9wZXJ0eSIsInBvc3QiXSwibWFwcGluZ3MiOiJBQUFBLFlBQUEsSUFBQUEsWUFBQUMsUUFBQUMsT0FBQSxjQUNFLFlBREYsV0FHRSxtQkFLRkYsYUFIRSxhQUdGQSxZQUNHRyxRQUFBQSxpQkFBQUEsb0JBQUFBLHFCQVNLQyxTQUFBQSxFQVBNQyxFQUNBQyxHQVVOQyxFQUFLQyxNQUFBLGFBQ0xDLElBQUFBLFNBQ0FDLFlBQWMsOENBQ2ROLGFBQVksZ0JBUFpBLFdBQVksaUJBV1pHLEVBQUtDLE1BQUEsZUFDTEMsSUFBQUEsV0FDQUMsWUFBYyxrREFDZE4sYUFBWSxjQVBaQSxXQUFZLG1CQVdaTyxFQUFlQyxNQUFVQyxxQkFDekJDLElBQU9DLHdCQVBQTixZQUFhLDhEQUNiQyxhQUFjLHdCQUNkTixXQUFZLHlCQWVkWSxFQUFXQyxVQUFhQyxTQUFVWCxHQVhoQyxHQUFNTyxHQUFTRixFQUFVQyxJQUFJLFNBQzdCQyxHQUFPQyxHQUFHLGtCQUtsQmYsV0FpQlVtQixLQUNOQSxhQUNBQSxZQUNBQSxTQUFBQSxFQUFBQSxHQUNFQyxFQUFPRCxJQUFBQSx5QkFBNkIsV0FDcENFLEVBQVFKLFdBQUFDLEVBQUFYLFVBWmQsSUFpQklZLGNBQWNHLFFBQUFBLE9BQWdCLFlBQWlCLGFBZm5EQyxjQWlCTUosV0FBY0ssZ0JBaEJsQixRQUNBLFlBQ0Es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USxDQUNWbUIsRUFBZSxHQUNmLEtBQUssR0FBTUMsS0FBT3BCLEdBQ1pBLEVBQU9rQyxlQUFlZCxLQUN4QkQsR0FBZ0JDLEVBQU0sSUFBTXBCLEVBQU9vQixHQUFPLElBRzlDRCxHQUFlQSxFQUFhRSxNQUFNLEdBQUcsR0FFdkMsR0FBTUcsR0FBSWIsRUFBTWpFLElBQUlvRSxFQUFVMUUsRUFBTStFLEVBQ3BDLE9BQU9PLEdBQWFGLEVBQUdkLEVBQVdHLEdBWXBDLFFBQVNpQixHQUFPMUYsRUFBS3VCLEVBQU0rQyxFQUFXRyxHQUMvQmxELElBQ0hBLEtBRUYsSUFBTTZELEdBQUliLEVBQU1jLElBQUlYLEVBQVUxRSxFQUFLdUIsRUFDbkMsT0FBTytELEdBQWFGLEVBQUdkLEVBQVdHLEdBWXBDLFFBQVNrQixHQUFPM0YsRUFBS3VCLEVBQU0rQyxFQUFXRyxHQUNwQyxHQUFNVyxHQUFJYixFQUFNd0IsS0FBS3JCLEVBQVUxRSxFQUFLdUIsRUFDcEMsT0FBTytELEdBQWFGLEVBQUdkLEVBQVdHLEdBR3BDLE9BQ0VpQixPQUFRQSxFQUNSQyxPQUFRQSxFQUNSckYsSUFBS0EiLCJmaWxlIjoianMvYXBwLTAxMjU2MDYzYmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB3YWxsZXRzQXBwID0gYW5ndWxhci5tb2R1bGUoJ3dhbGxldHNBcHAnLCBbXG4gICd1aS5yb3V0ZXInLFxuICAndXNlckxpc3QnLFxuICAndXNlclRyYW5zYWN0aW9ucycsXG4gICd1c2VyRGV0YWlsJyxcbiAgJ3RlbXBsYXRlcydcbl0pO1xuXG53YWxsZXRzQXBwXG4gIC5jb25maWcoXG4gICAgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLFxuICAgICAgICAgICAgICAkbG9jYXRpb25Qcm92aWRlcixcbiAgICAgICAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCd1c2VyLWxpc3QnLHtcbiAgICAgICAgdXJsOiAnL3VzZXJzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdjb250cm9sbGVycy91c2VyLWxpc3QvVXNlckxpc3RUZW1wbGF0ZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmxVc2VyTGlzdCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyTGlzdEN0cmwnXG4gICAgICB9KTtcblxuICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3VzZXItZGV0YWlsJywge1xuICAgICAgICB1cmw6ICcvdXNlcj9pZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnY29udHJvbGxlcnMvdXNlci1kZXRhaWwvVXNlckRldGFpbFRlbXBsYXRlLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybERldGFpbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyRGV0YWlsQ3RybCdcbiAgICAgIH0pO1xuXG4gICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgndXNlci10cmFuc2FjdGlvbnMnLHtcbiAgICAgICAgdXJsOiAnL3VzZXIvdHJhbnNhY3Rpb25zP2lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdjb250cm9sbGVycy91c2VyLXRyYW5zYWN0aW9ucy9Vc2VyVHJhbnNhY3Rpb25zVGVtcGxhdGUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsVXNlclRyYW5zYWN0aW9ucycsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyVHJhbnNhY3Rpb25zQ3RybCdcbiAgICAgIH0pO1xuXG4gICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbiAgICAgICAgY29uc3QgJHN0YXRlID0gJGluamVjdG9yLmdldCgnJHN0YXRlJyk7XG4gICAgICAgICRzdGF0ZS5nbygndXNlci1saXN0Jyk7XG4gICAgICB9KTtcbiAgICB9XG4gICk7XG5cbndhbGxldHNBcHAucnVuKFtcbiAgJyRyb290U2NvcGUnLFxuICAnJGxvY2F0aW9uJyxcbiAgKCRyb290U2NvcGUsICRsb2NhdGlvbikgPT4ge1xuICAgICRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKCkge1xuICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXJsID0gJGxvY2F0aW9uLnVybCgpO1xuICAgIH0pO1xuICB9XG5dKTtcblxuY29uc3QgdXNlckxpc3RDdHJsID0gYW5ndWxhci5tb2R1bGUoJ3VzZXJMaXN0JywgWydjb3JlLnVzZXInXSk7XG5cbnVzZXJMaXN0Q3RybC5jb250cm9sbGVyKCdVc2VyTGlzdEN0cmwnLCBbXG4gICdVc2VycycsXG4gICckbG9jYXRpb24nLFxuICAnJGluamVjdG9yJyxcbiAgZnVuY3Rpb24gKFVzZXJzLCAkbG9jYXRpb24sICRpbmplY3Rvcikge1xuICAgIGNvbnN0ICRjdHJsVXNlckxpc3QgPSB0aGlzO1xuICAgICRjdHJsVXNlckxpc3QucGVyUGFnZUNob2ljZXMgPSBbNSwgMTAsIDE1XTtcbiAgICAkY3RybFVzZXJMaXN0LnBhZ2VzID0gMDtcbiAgICAkY3RybFVzZXJMaXN0LnBhZ2luYXRpb25zUGFyYW1zID0ge1xuICAgICAgbGltaXQ6ICRjdHJsVXNlckxpc3QucGVyUGFnZUNob2ljZXNbMF0sXG4gICAgICBvZmZzZXQ6IDBcbiAgICB9O1xuXG4gICAgbG9hZFVzZXJzKCk7XG5cbiAgICAkY3RybFVzZXJMaXN0LnNlbGVjdFBlclBhZ2UgPSBmdW5jdGlvbiAobGltaXQpIHtcbiAgICAgICRjdHJsVXNlckxpc3QucGFnaW5hdGlvbnNQYXJhbXMub2Zmc2V0ID0gMDtcbiAgICAgICRjdHJsVXNlckxpc3QucGFnaW5hdGlvbnNQYXJhbXMubGltaXQgPSBsaW1pdDtcbiAgICAgIGxvYWRVc2VycygpO1xuICAgIH07XG5cbiAgICAkY3RybFVzZXJMaXN0LnNldFBhZ2UgPSBmdW5jdGlvbiAocGFnZSkge1xuICAgICAgJGN0cmxVc2VyTGlzdC5wYWdpbmF0aW9uc1BhcmFtcy5vZmZzZXQgPSBwYWdlO1xuICAgICAgbG9hZFVzZXJzKCk7XG4gICAgfTtcblxuICAgICRjdHJsVXNlckxpc3Qub3BlblVzZXIgPSBmdW5jdGlvbiAodXNlcklkKSB7XG4gICAgICBjb25zdCAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKTtcbiAgICAgICRzdGF0ZS5nbygndXNlci1kZXRhaWwnLCB7IGlkOiB1c2VySWQgfSk7XG4gICAgfTtcblxuICAgICRjdHJsVXNlckxpc3QuZ2V0UGFnZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IEFycmF5KCRjdHJsVXNlckxpc3QucGFnZXMpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb2FkVXNlcnMoKSB7XG4gICAgICAkY3RybFVzZXJMaXN0LmlzTG9hZGluZyA9IHRydWU7XG4gICAgICBVc2VycyhcbiAgICAgICAgJGN0cmxVc2VyTGlzdC5wYWdpbmF0aW9uc1BhcmFtcyxcbiAgICAgICAgZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAgICAgICAkY3RybFVzZXJMaXN0LnVzZXJzID0gcmVzcC5kYXRhLmRhdGE7XG4gICAgICAgICAgJGN0cmxVc2VyTGlzdC5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAkY3RybFVzZXJMaXN0LnBhZ2VzID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgcmVzcC5kYXRhLnJlY29yZHNUb3RhbCAvICRjdHJsVXNlckxpc3QucGFnaW5hdGlvbnNQYXJhbXMubGltaXRcbiAgICAgICAgICApO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJGN0cmxVc2VyTGlzdC5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5dKTtcblxuYW5ndWxhci5tb2R1bGUoJ3VzZXJFZGl0JywgW1xuICAndWkucm91dGVyJyxcbiAgJ2NvcmUudXNlcidcbl0pO1xuXG5jb25zdCBlbWFpbFJlZ2V4cCA9IG5ldyBSZWdFeHAoXG4gIFtcbiAgICAnXicsXG4gICAgJyg/OlthLXowLTkhIyQlJlxcJyorLz0/Xl9ge3x9fi1dKyg/OlxcXFwuW2EtejAtOSEjJCUmXFwnKisvPT9eX2B7fH1+LV0rKSonLFxuICAgICd8XCIoPzpbXFxcXHgwMS1cXFxceDA4XFxcXHgwYlxcXFx4MGNcXFxceDBlLVxcXFx4MWZcXFxceDIxXFxcXHgyMy1cXFxceDViXFxcXHg1ZC1cXFxceDdmXScsXG4gICAgJ3xcXFxcXFxcXFtcXFxceDAxLVxcXFx4MDlcXFxceDBiXFxcXHgwY1xcXFx4MGUtXFxcXHg3Zl0pKlwiKScsXG4gICAgJ0AoPzooPzpbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/XFxcXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT8nLFxuICAgICd8XFxcXFsoPzooPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4pezN9JyxcbiAgICAnKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/fFthLXowLTktXSpbYS16MC05XTonLFxuICAgICcoPzpbXFxcXHgwMS1cXFxceDA4XFxcXHgwYlxcXFx4MGNcXFxceDBlLVxcXFx4MWZcXFxceDIxLVxcXFx4NWFcXFxceDUzLVxcXFx4N2ZdJyxcbiAgICAnfFxcXFxcXFxcW1xcXFx4MDEtXFxcXHgwOVxcXFx4MGJcXFxceDBjXFxcXHgwZS1cXFxceDdmXSkrKScsXG4gICAgJ1xcXFxdKScsXG4gICAgJyQnXG4gIF0uam9pbignJylcbik7XG5cbmFuZ3VsYXJcbiAgLm1vZHVsZSgndXNlckVkaXQnKVxuICAuY29tcG9uZW50KCd1c2VyRWRpdCcsIHtcbiAgICB0ZW1wbGF0ZVVybDogJ2NvbnRyb2xsZXJzL3VzZXItZWRpdC9Vc2VyRWRpdFRlbXBsYXRlLmh0bWwnLFxuICAgIGNvbnRyb2xsZXJBczogJyRjdHJsRWRpdCcsXG4gICAgY29udHJvbGxlcjogW1xuICAgICAgJ0NyZWF0ZVVzZXInLFxuICAgICAgJ1VwZGF0ZVVzZXInLFxuICAgICAgJ09uZVVzZXInLFxuICAgICAgJyRzdGF0ZVBhcmFtcycsXG4gICAgICAnJGxvY2F0aW9uJyxcbiAgICAgIGZ1bmN0aW9uIChcbiAgICAgICAgQ3JlYXRlVXNlcixcbiAgICAgICAgVXBkYXRlVXNlcixcbiAgICAgICAgT25lVXNlcixcbiAgICAgICAgJHN0YXRlUGFyYW1zLFxuICAgICAgICAkbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3QgJGN0cmxFZGl0ID0gdGhpcztcblxuICAgICAgICAkY3RybEVkaXQudXNlciA9IHtcbiAgICAgICAgICB1c2VyX2lkOiAnJyxcbiAgICAgICAgICB1c2VyX25hbWU6ICcnLFxuICAgICAgICAgIHVzZXJfY3VzdG9tOiAnJyxcbiAgICAgICAgICBlbWFpbDogJydcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoJHN0YXRlUGFyYW1zLmlkKSB7XG4gICAgICAgICAgJGN0cmxFZGl0LnVzZXJJZCA9ICRzdGF0ZVBhcmFtcy5pZDtcbiAgICAgICAgICAkY3RybEVkaXQuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICBPbmVVc2VyKFxuICAgICAgICAgICAgJGN0cmxFZGl0LnVzZXJJZCxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAkY3RybEVkaXQudXNlciA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICRjdHJsRWRpdC5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICRjdHJsRWRpdC5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgJGN0cmxFZGl0LnN1Ym1pdFVzZXIgPSBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICRjdHJsRWRpdC5lcnJvcnMgPSBbXTtcbiAgICAgICAgICBpZiAodXNlci5lbWFpbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoIWVtYWlsUmVnZXhwLnRlc3QodXNlci5lbWFpbCkpIHtcbiAgICAgICAgICAgICAgJGN0cmxFZGl0LmVycm9ycy5wdXNoKHttZXNzYWdlOiAnSW52YWxpZCBlbWFpbCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF1c2VyLnVzZXJfaWQpIHtcbiAgICAgICAgICAgICRjdHJsRWRpdC5lcnJvcnMucHVzaCh7bWVzc2FnZTogJ0lEIGlzIHJlcXVpcmVkISd9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoJGN0cmxFZGl0LmVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJGN0cmxFZGl0LmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgaWYgKCEkY3RybEVkaXQudXNlcklkKSB7XG4gICAgICAgICAgICBDcmVhdGVVc2VyKFxuICAgICAgICAgICAgICB1c2VyLFxuICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAkY3RybEVkaXQuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmh0dHBfc3RhdHVzX2NvZGUgIT0gMjA0KSB7XG4gICAgICAgICAgICAgICAgICAgICRjdHJsRWRpdC5lcnJvcnMucHVzaCh7bWVzc2FnZTogcmVzcG9uc2UuZGF0YS5tZXNzYWdlfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvdXNlcnMvZWRpdC8nICsgdXNlci51c2VyX2lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICRjdHJsRWRpdC5lcnJvcnMucHVzaCh7bWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgICAgICAgICAgICRjdHJsRWRpdC5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVXBkYXRlVXNlcihcbiAgICAgICAgICAgICAgJGN0cmxFZGl0LnVzZXJJZCxcbiAgICAgICAgICAgICAgdXNlcixcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgJGN0cmxFZGl0LmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5odHRwX3N0YXR1c19jb2RlICE9IDIwNCkge1xuICAgICAgICAgICAgICAgICAgICAkY3RybEVkaXQuZXJyb3JzLnB1c2goe21lc3NhZ2U6IHJlc3BvbnNlLmRhdGEubWVzc2FnZX0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgJGN0cmxFZGl0LmVycm9ycy5wdXNoKHttZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgICAgICAgICAgICAgJGN0cmxFZGl0LmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICB9O1xuICAgICAgfVxuICAgIF1cbiAgfSk7XG5cbmNvbnN0IHVzZXJEZXRhaWxDdHJsID0gYW5ndWxhci5tb2R1bGUoJ3VzZXJEZXRhaWwnLCBbXG4gICd1aS5yb3V0ZXInLFxuICAndXNlckVkaXQnLFxuICAndXNlckluZm8nLFxuICAnbmV3UmVjaGFyZ2UnXG5dKTtcblxudXNlckRldGFpbEN0cmwuY29udHJvbGxlcignVXNlckRldGFpbEN0cmwnLCBbXG4gICckc3RhdGVQYXJhbXMnLFxuICBmdW5jdGlvbiAoJHN0YXRlUGFyYW1zKSB7XG4gICAgY29uc3QgJGN0cmxEZXRhaWwgPSB0aGlzO1xuICAgIGlmICgkc3RhdGVQYXJhbXMuaWQpIHtcbiAgICAgICRjdHJsRGV0YWlsLmlkID0gJHN0YXRlUGFyYW1zLmlkO1xuICAgIH1cbiAgfVxuXSk7XG5cbmFuZ3VsYXIubW9kdWxlKCd1c2VySW5mbycsIFtcbiAgJ3VpLnJvdXRlcicsXG4gICdjb3JlLnVzZXInXG5dKTtcblxuYW5ndWxhclxuICAubW9kdWxlKCd1c2VySW5mbycpXG4gIC5jb21wb25lbnQoJ3VzZXJJbmZvJywge1xuICAgIHRlbXBsYXRlVXJsOiAnY29udHJvbGxlcnMvdXNlci1pbmZvL1VzZXJJbmZvVGVtcGxhdGUuaHRtbCcsXG4gICAgY29udHJvbGxlckFzOiAnJGN0cmxJbmZvJyxcbiAgICBjb250cm9sbGVyOiBbXG4gICAgICAnT25lVXNlcicsXG4gICAgICAnJHN0YXRlUGFyYW1zJyxcbiAgICAgIGZ1bmN0aW9uIChPbmVVc2VyLFxuICAgICAgICAgICAgICAgICRzdGF0ZVBhcmFtcykge1xuXG4gICAgICAgIGNvbnN0ICRjdHJsSW5mbyA9IHRoaXM7XG5cbiAgICAgICAgJGN0cmxJbmZvLnVzZXIgPSB7fTtcblxuICAgICAgICAkY3RybEluZm8udXNlcklkID0gJHN0YXRlUGFyYW1zLmlkO1xuICAgICAgICAkY3RybEluZm8uaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgT25lVXNlcihcbiAgICAgICAgICAkY3RybEluZm8udXNlcklkLFxuICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgJGN0cmxJbmZvLnVzZXIgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgJGN0cmxJbmZvLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGN0cmxJbmZvLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgfVxuICAgIF1cbiAgfSk7XG5cbmNvbnN0IHVzZXJUcmFuc2FjdGlvbnNDdHJsID0gYW5ndWxhci5tb2R1bGUoJ3VzZXJUcmFuc2FjdGlvbnMnLCBbXG4gICd1aS5yb3V0ZXInLFxuICAndHJhbnNhY3Rpb25MaXN0J1xuXSk7XG5cbnVzZXJUcmFuc2FjdGlvbnNDdHJsLmNvbnRyb2xsZXIoJ1VzZXJUcmFuc2FjdGlvbnNDdHJsJywgW1xuICAnJHN0YXRlUGFyYW1zJyxcbiAgZnVuY3Rpb24gKCRzdGF0ZVBhcmFtcykge1xuICAgIGNvbnN0ICRjdHJsVXNlclRyYW5zYWN0aW9ucyA9IHRoaXM7XG4gICAgJGN0cmxVc2VyVHJhbnNhY3Rpb25zLmlkID0gJHN0YXRlUGFyYW1zLmlkO1xuICB9XG5dKTtcblxuYW5ndWxhci5tb2R1bGUoJ3RyYW5zYWN0aW9uTGlzdCcsIFtcbiAgJ3VpLnJvdXRlcicsXG4gICdjb3JlLnVzZXInXG5dKTtcblxuYW5ndWxhclxuICAubW9kdWxlKCd0cmFuc2FjdGlvbkxpc3QnKVxuICAuY29tcG9uZW50KCd0cmFuc2FjdGlvbkxpc3QnLCB7XG4gICAgdGVtcGxhdGVVcmw6ICdjb250cm9sbGVycy90cmFuc2FjdGlvbi1saXN0L1RyYW5zYWN0aW9uTGlzdFRlbXBsYXRlLmh0bWwnLFxuICAgIGNvbnRyb2xsZXJBczogJyRjdHJsVHJhbnNhY3Rpb25MaXN0JyxcbiAgICBjb250cm9sbGVyOiBbXG4gICAgICAnVXNlclRyYW5zYWN0aW9ucycsXG4gICAgICAnJHN0YXRlUGFyYW1zJyxcbiAgICAgIGZ1bmN0aW9uIChcbiAgICAgICAgVXNlclRyYW5zYWN0aW9ucyxcbiAgICAgICAgJHN0YXRlUGFyYW1zKSB7XG4gICAgICAgIGNvbnN0ICRjdHJsVHJhbnNhY3Rpb25MaXN0ID0gdGhpcztcbiAgICAgICAgJGN0cmxUcmFuc2FjdGlvbkxpc3QudXNlcklkID0gJHN0YXRlUGFyYW1zLmlkO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSAge1xuICAgICAgICAgIGRhdGV0aW1lX2Zyb206ICcyMDE1LTAxLTAxVDAwOjAwOjAwIFVUQycsXG4gICAgICAgICAgZGF0ZXRpbWVfdG86ICcyMDE3LTAzLTAzVDAwOjAwOjAwIFVUQydcbiAgICAgICAgfTtcbiAgICAgICAgJGN0cmxUcmFuc2FjdGlvbkxpc3QuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgVXNlclRyYW5zYWN0aW9ucyhcbiAgICAgICAgICAkY3RybFRyYW5zYWN0aW9uTGlzdC51c2VySWQsXG4gICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgJGN0cmxUcmFuc2FjdGlvbkxpc3QuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAkY3RybFRyYW5zYWN0aW9uTGlzdC50cmFuc2FjdGlvbnMgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGN0cmxUcmFuc2FjdGlvbkxpc3QuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIF1cbn0pO1xuXG5hbmd1bGFyLm1vZHVsZSgnbmV3UmVjaGFyZ2UnLCBbXG4gICd1aS5yb3V0ZXInLFxuICAnY29yZS51c2VyJ1xuXSk7XG5cbmFuZ3VsYXJcbiAgLm1vZHVsZSgnbmV3UmVjaGFyZ2UnKVxuICAuY29tcG9uZW50KCduZXdSZWNoYXJnZScsIHtcbiAgICB0ZW1wbGF0ZVVybDogJ2NvbnRyb2xsZXJzL25ldy1yZWNoYXJnZS9OZXdSZWNoYXJnZVRlbXBsYXRlLmh0bWwnLFxuICAgIGNvbnRyb2xsZXJBczogJyRjdHJsTmV3UmVjaGFyZ2UnLFxuICAgIGNvbnRyb2xsZXI6IFtcbiAgICAgICdOZXdSZWNoYXJnZScsXG4gICAgICAnJHN0YXRlUGFyYW1zJyxcbiAgICAgIGZ1bmN0aW9uIChcbiAgICAgICAgTmV3UmVjaGFyZ2UsXG4gICAgICAgICRzdGF0ZVBhcmFtcykge1xuICAgICAgICBjb25zdCAkY3RybE5ld1JlY2hhcmdlID0gdGhpcztcblxuICAgICAgICAkY3RybE5ld1JlY2hhcmdlLnVzZXJJZCA9ICRzdGF0ZVBhcmFtcy5pZDtcbiAgICAgICAgJGN0cmxOZXdSZWNoYXJnZS5uZXdUcmFuc2FjdGlvbiA9IHtcbiAgICAgICAgICBhbW91bnQ6ICcnLFxuICAgICAgICAgIGNvbW1lbnQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgJGN0cmxOZXdSZWNoYXJnZS5zdWJtaXRSZWNoYXJnZSA9IGZ1bmN0aW9uIChuZXdSZWNoYXJnZSkge1xuICAgICAgICAgICRjdHJsTmV3UmVjaGFyZ2UuZXJyb3JzID0gW107XG5cbiAgICAgICAgICBpZiAoJGN0cmxOZXdSZWNoYXJnZS5lcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRjdHJsTmV3UmVjaGFyZ2UuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgIE5ld1JlY2hhcmdlKFxuICAgICAgICAgICAgJGN0cmxOZXdSZWNoYXJnZS51c2VySWQsXG4gICAgICAgICAgICBuZXdSZWNoYXJnZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAkY3RybE5ld1JlY2hhcmdlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YS5hbW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICRjdHJsTmV3UmVjaGFyZ2UuZXJyb3JzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHttZXNzYWdlOiByZXNwb25zZS5kYXRhLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAkY3RybE5ld1JlY2hhcmdlLmVycm9ycy5wdXNoKHttZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgICAgICAgICAgICRjdHJsTmV3UmVjaGFyZ2UuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9O1xuICAgICAgfVxuICAgIF1cbiAgfSk7XG5cbmFuZ3VsYXIubW9kdWxlKFxuICAnY29yZS51c2VyJyxcbiAgWydjb3JlLWFwaSddXG4pO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdjb3JlLnVzZXInKVxuICAuZmFjdG9yeSgnVXNlcnMnLCBbXG4gICAgJ2FwaScsXG4gICAgJyRodHRwJyxcbiAgICBmdW5jdGlvbiAoYXBpLCAkaHR0cCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChwYXJhbXMsIHN1Y2Nlc3NDYiA9IG51bGwsIGVycm9yQ2IgPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBhcGkoJGh0dHApLmdldChcbiAgICAgICAgICAnL3VzZXJzJyxcbiAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgc3VjY2Vzc0NiLFxuICAgICAgICAgIGVycm9yQ2JcbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgfVxuICBdKVxuICAuZmFjdG9yeSgnT25lVXNlcicsIFtcbiAgICAnYXBpJyxcbiAgICAnJGh0dHAnLFxuICAgIGZ1bmN0aW9uIChhcGksICRodHRwKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGlkLCBzdWNjZXNzQ2IgPSBudWxsLCBlcnJvckNiID0gbnVsbCkge1xuICAgICAgICByZXR1cm4gYXBpKCRodHRwKS5nZXQoXG4gICAgICAgICAgJy91c2Vycy8nICsgaWQsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBzdWNjZXNzQ2IsXG4gICAgICAgICAgZXJyb3JDYlxuICAgICAgICApO1xuICAgICAgfTtcbiAgICB9XG4gIF0pXG4gIC5mYWN0b3J5KCdVcGRhdGVVc2VyJywgW1xuICAgICdhcGknLFxuICAgICckaHR0cCcsXG4gICAgZnVuY3Rpb24gKGFwaSwgJGh0dHApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoaWQsIHBhcmFtcywgc3VjY2Vzc0NiID0gbnVsbCwgZXJyb3JDYiA9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGFwaSgkaHR0cCkudXBkYXRlKFxuICAgICAgICAgICcvdXNlcnMvJyArIGlkLFxuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICBzdWNjZXNzQ2IsXG4gICAgICAgICAgZXJyb3JDYlxuICAgICAgICApO1xuICAgICAgfTtcbiAgICB9XG4gIF0pXG4gIC5mYWN0b3J5KCdDcmVhdGVVc2VyJywgW1xuICAgICdhcGknLFxuICAgICckaHR0cCcsXG4gICAgZnVuY3Rpb24gKGFwaSwgJGh0dHApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAocGFyYW1zLCBzdWNjZXNzQ2IgPSBudWxsLCBlcnJvckNiID0gbnVsbCkge1xuICAgICAgICByZXR1cm4gYXBpKCRodHRwKS5jcmVhdGUoXG4gICAgICAgICAgJy91c2VycycsXG4gICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgIHN1Y2Nlc3NDYixcbiAgICAgICAgICBlcnJvckNiXG4gICAgICAgICk7XG4gICAgICB9O1xuICAgIH1cbiAgXSlcbiAgLmZhY3RvcnkoJ05ld1JlY2hhcmdlJywgW1xuICAgICdhcGknLFxuICAgICckaHR0cCcsXG4gICAgZnVuY3Rpb24gKGFwaSwgJGh0dHApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoaWQsIHBhcmFtcywgc3VjY2Vzc0NiID0gbnVsbCwgZXJyb3JDYiA9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGFwaSgkaHR0cCkuY3JlYXRlKFxuICAgICAgICAgICcvdXNlcnMvJyArIGlkICsgJy9yZWNoYXJnZScsXG4gICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgIHN1Y2Nlc3NDYixcbiAgICAgICAgICBlcnJvckNiXG4gICAgICAgICk7XG4gICAgICB9O1xuICAgIH1cbiAgXSlcbiAgLmZhY3RvcnkoJ1VzZXJUcmFuc2FjdGlvbnMnLCBbXG4gICAgJ2FwaScsXG4gICAgJyRodHRwJyxcbiAgICBmdW5jdGlvbiAoYXBpLCAkaHR0cCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpZCwgcGFyYW1zLCBzdWNjZXNzQ2IgPSBudWxsLCBlcnJvckNiID0gbnVsbCkge1xuICAgICAgICByZXR1cm4gYXBpKCRodHRwKS5nZXQoXG4gICAgICAgICAgJy91c2Vycy8nICsgaWQgKyAnL3RyYW5zYWN0aW9ucycsXG4gICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgIHN1Y2Nlc3NDYixcbiAgICAgICAgICBlcnJvckNiXG4gICAgICAgICk7XG4gICAgICB9O1xuICAgIH1cbiAgXSk7XG5hbmd1bGFyXG4gIC5tb2R1bGUoXG4gICAgJ2NvcmUtYXBpJywgW11cbiAgKTtcblxuYW5ndWxhclxuICAubW9kdWxlKCdjb3JlLWFwaScpLmZhY3RvcnkoJ2FwaScsIFtcbiAgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly9saXZlZGVtby54c29sbGEuY29tL2ZlL3Rlc3QtdGFzay9iYWV2JztcbiAgICByZXR1cm4gZnVuY3Rpb24gYXBpKCRodHRwKSB7XG4gICAgICAvKipcbiAgICAgICAqIEFkZCBjYWxsYmFja3NcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge1Byb21pc2V9IHFcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1Y2Nlc3MgY2FsbGJhY2tcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yIGNhbGxiYWNrXG4gICAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gYWRkQ2FsbGJhY2tzKHEsIHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgIGlmIChzdWNjZXNzICYmIGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHEudGhlbihcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBxLnRoZW4oXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgcmV0dXJuIHEudGhlbihcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIFF1ZXJ5IGZvciBnZXQgbGlzdFxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1Y2Nlc3NDYlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZXJyb3JDYlxuICAgICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGdldCh1cmwsIHBhcmFtcyA9IG51bGwsIHN1Y2Nlc3NDYiA9IG51bGwsIGVycm9yQ2IgPSBudWxsKSB7XG4gICAgICAgIGxldCBwYXJhbXNTdHJpbmcgPSAnJztcbiAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgIHBhcmFtc1N0cmluZyA9ICc/JztcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICBwYXJhbXNTdHJpbmcgKz0ga2V5ICsgJz0nICsgcGFyYW1zW2tleV0gKyAnJic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmFtc1N0cmluZyA9IHBhcmFtc1N0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcSA9ICRodHRwLmdldChiYXNlVXJsICsgdXJsICsgcGFyYW1zU3RyaW5nKTtcbiAgICAgICAgcmV0dXJuIGFkZENhbGxiYWNrcyhxLCBzdWNjZXNzQ2IsIGVycm9yQ2IpO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIFVwZGF0ZSByZXF1ZXN0XG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzdWNjZXNzQ2JdXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZXJyb3JDYl1cbiAgICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiB1cGRhdGUodXJsLCBkYXRhLCBzdWNjZXNzQ2IsIGVycm9yQ2IpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHEgPSAkaHR0cC5wdXQoYmFzZVVybCArIHVybCwgZGF0YSk7XG4gICAgICAgIHJldHVybiBhZGRDYWxsYmFja3MocSwgc3VjY2Vzc0NiLCBlcnJvckNiKTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGUgcXVlcnlcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3N1Y2Nlc3NDYl1cbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlcnJvckNiXVxuICAgICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmwsIGRhdGEsIHN1Y2Nlc3NDYiwgZXJyb3JDYikge1xuICAgICAgICBjb25zdCBxID0gJGh0dHAucG9zdChiYXNlVXJsICsgdXJsLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIGFkZENhbGxiYWNrcyhxLCBzdWNjZXNzQ2IsIGVycm9yQ2IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcbiAgICAgICAgY3JlYXRlOiBjcmVhdGUsXG4gICAgICAgIGdldDogZ2V0XG4gICAgICB9O1xuICAgIH07XG4gIH1cbl0pO1xuIl19
