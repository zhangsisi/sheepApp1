angular.module('starter.controllers')
	.controller('loginCtrl', function($scope, _http, $state) {

	})
	.controller('infoqueryCtrl', function($scope, _http, hostUrl,
		$state) {
		//羊群分布屏幕点图，位置列表转换为屏幕点分布
		var storage = window.localStorage;
		$scope.addrelistParam = {
			access_token: storage.getItem("access_token"),
			user_token: storage.getItem("user_token"),
			'pagination.page': '1',
			'paginateion.orderBy': ''
		}
//		_http._post(hostUrl, "/wap/Position/myList.do", $scope.addrelistParam, function(data) {
			//		$scope.addPingmlist=data.message.pageList;
			$scope.addPingmlist = [{
				longitude: 132,
				latitude: 35
			}, {
				longitude: 130,
				latitude: 31
			}, {
				longitude: 131,
				latitude: 32
			}];
			
			var o = document.getElementById("area");
			var mywidth = o.offsetWidth; //宽度
			var myheight = o.offsetHeight; //高度

			//地理坐标
			var alist = [];
			var blist = [];
			for(item in $scope.addPingmlist) {
				//地理经度x数组
				alist.push($scope.addPingmlist[item].longitude);
				//地理维度y数组
				blist.push($scope.addPingmlist[item].latitude);
			}
			console.log(alist + '哈' + blist);

			//最大最小值
			Array.max = function(array) {
				return Math.max.apply(Math, array);
			}
			Array.min = function(array) {
					return Math.min.apply(Math, array);
				}
				//地理最大最小
			var minx = Array.min(alist);
			var maxx = Array.max(alist);
			var miny = Array.min(blist);
			var maxy = Array.max(blist);
			console.log(minx + '哈' + maxx + '哈' + miny + '哈' + maxy);
			//地理位置与屏幕比例
			var scaleX = ((maxx - minx) * 3600) / mywidth;
			var scaleY = ((maxy - miny) * 3600) / myheight;
			//		区域左边置最左端, 区域上面置最上端,左上角的点
			var minX = minx * 3600 / scaleX;
			var minY = miny * 3600 / scaleY;
			//屏幕真实的羊群所在点
			//坐标数组
			for(yq in alist) {
				var screenX = alist[yq] * 3600 / scaleX;
				var mysheepX = screenX - minX;
				$scope.addPingmlist[yq].xcoord = mysheepX;
				console.log($scope.addPingmlist[yq].xcoord);
			}
			for(yq in blist) {
				var screenY = blist[yq] * 3600 / scaleY;
				var mysheepY = screenY - minY;
				$scope.addPingmlist[yq].ycoord = mysheepY;
				console.log($scope.addPingmlist[yq].ycoord);
			}
			console.log($scope.addPingmlist);
//		})

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