angular.module('starter.controllers')
	.controller('loginCtrl', function($scope, _http, $state,$ionicPopup) {

	})
	.controller('infoqueryCtrl', function($scope, _http, hostUrl,
		$state, $window,$parse,$ionicPopup) {
		//签到
	$scope.qd = function() {
		var storage = window.localStorage;
		$scope.qiandParam = {
			access_token: storage.getItem("access_token"),
			user_token: storage.getItem("user_token"),
			latitude: '111',
			longitude: '123'
		}
		_http._post(hostUrl, "/wap/SignInfo/save.do", $scope.qiandParam, function(data) {
			$scope.showAlert(data.message);
		})
	}
	
	//签到end___________________---------------------------------------------------------
		//羊群分布屏幕点图
		 $scope.currentSheeps = [];
        var storage = window.localStorage;
        $scope.addrelistParam = {
            access_token: storage.getItem("access_token"),
            user_token: storage.getItem("user_token"),
            'pagination.page': '1',
            'paginateion.orderBy': ''
        }

        function getSheepList() {
            _http._post(hostUrl, "/wap/Position/myList.do", $scope.addrelistParam, function (data) {
                console.info(data);
                $scope.currentSheeps = data.message.pageList;
            });
        }
        getSheepList();
        $window.setInterval(function () {
            getSheepList();
        }, 10000);
        
        $scope.showyangAlert = function(myTitle, myTemplate) {
			var alertPopup = $ionicPopup.alert({
				title: myTitle,
				template: myTemplate
			});
		};
		

	})

.controller('mineCtrl', function($scope, _http, hostUrl, $state) {
	var storage = window.localStorage;
	var access_token = storage.getItem("access_token");
	//退出登录
	$scope.logout = function() {
			var strLogout = "您确定退出当前账号？";
			$scope.showConfirm('', strLogout, function() {
				_http._post(hostUrl, '/wap/Login/logoff.do', {
					access_token: access_token
				}, function(data) {
					localStorage.clear();
					$state.go('login');
				})
			})

		}
		//签到
	$scope.qd = function() {
		var storage = window.localStorage;
		$scope.qiandParam = {
			access_token: storage.getItem("access_token"),
			user_token: storage.getItem("user_token"),
			latitude: '111',
			longitude: '123'
		}
		_http._post(hostUrl, "/wap/SignInfo/save.do", $scope.qiandParam, function(data) {
			$scope.showAlert(data.message);
		})
	}
});