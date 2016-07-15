angular.module('starter.controllers', [])
	.controller('myappCtrl', function($scope, $window, _http, hostUrl, $state, $rootScope,$ionicPopup) {
		//公用值		
		//返回上一页
		$scope.backlast = function() {
				$window.history.back();
			}
			//对话框确定
			//  alert（警告） 对话框
		$scope.showAlert = function(myTitle, myTemplate) {
			var alertPopup = $ionicPopup.alert({
				title: myTitle,
				template: myTemplate
			});
		};

		//  confirm 对话框
		$scope.showConfirm = function(myTitle, myTemplate, success) {
			var confirmPopup = $ionicPopup.confirm({
				title: myTitle,
				template: myTemplate
			});
			confirmPopup.then(function(res) {
				if (res) {
					success();
				} else {

				}
			});
		};

		//用户登录共用
		$scope.user = {
			loginName:"",
			password: ""
		}
		$scope.login = function() {
				_http._post(hostUrl, "/wap/Login/submit.do", $scope.user, function(data) {
					if (data.success == true) {
						var storage = window.localStorage;
						storage.setItem("access_token", data.access_token);
						storage.setItem("user_token", data.user_token);
						storage.setItem("yonghuming", $scope.user.loginName);
						storage.setItem("mima", $scope.user.password);
						$state.go('tab.infoquery');
					} else {
						$scope.showAlert(data.message+"<br/>请重新登录");
					}

				})
			}
			//登录testend
	});