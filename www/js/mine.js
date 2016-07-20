angular.module('starter.controllers')
	.controller('changePassCtrl', function($scope, _http, hostUrl) {
		var storage = window.localStorage;
		$scope.passobj = {
				oldPwd: '',
				password: '',
				user_token: storage.getItem("access_token"),
				access_token: storage.getItem("user_token")
			}
			//修改密码
		$scope.changepass = function() {
			if (!$scope.passobj.oldPwd) {
				$scope.showAlert("旧密码不能为空");
				return;
			}
			if ($scope.passobj.oldPwd != window.localStorage.getItem("mima")) {
				$scope.showAlert("旧密码有误，请重新输入");
				return;
			}
			if (!$scope.passobj.password) {
				$scope.showAlert("新密码不能为空");
				return;
			}
			if (!$scope.passobj.password2) {
				$scope.showAlert("确认密码不能为空");
				return;
			}
			if ($scope.passobj.password != $scope.passobj.password2) {
				$scope.showAlert("确认密码有误，请重新输入");
				return;
			}

			_http._post(hostUrl, '/wap/User/updatePwd.do', $scope.passobj, function(data) {

			})

		}
		
		//测试
		var c=document.getElementById("myCanvas");
		var cxt=c.getContext("2d");
		var img=new Image()
		img.src="img/yang.png"
		img.onload = function() {
 			cxt.drawImage(img, 0, 0);
 		}


	});
	