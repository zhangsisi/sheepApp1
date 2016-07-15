angular.module('starter.controllers')
.controller('loginCtrl', function($scope, _http, $state) {

})
.controller('infoqueryCtrl', function($scope, _http, hostUrl, $state) {
	//羊群分布屏幕点图，位置列表转换为屏幕点分布
	var storage = window.localStorage;
	$scope.addrelistParam = {
		access_token: storage.getItem("access_token"),
		user_token: storage.getItem("user_token"),
		'pagination.page': '1',
		'paginateion.orderBy': ''
	}
	_http._post(hostUrl, "/wap/Position/myList.do", $scope.addrelistParam, function(data) {
		$scope.addPingmlist=data.message.pageList;
	})
	
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
	$scope.qd=function(){
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