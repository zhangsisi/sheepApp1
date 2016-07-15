angular.module('starter.controllers')
	//设备列表
	.controller('deviceListCtrl', function($scope, hostUrl, _http, $state) {
		//获取用户下的所有设备：
		var storage = window.localStorage;
		$scope.DevicesParam = {
			access_token: storage.getItem("access_token"),
			user_token: storage.getItem("user_token"),
			'pagination.page': '1',
			'paginateion.orderBy': ''
		}
		_http._post(hostUrl, "/wap/Device/list.do", $scope.DevicesParam, function(data) {
			$scope.deviceList = data.message.pageList;
			$scope.totalCount = data.message.totalCount;
			console.log($scope.deviceList);
			if($scope.totalCount > 20) {
				getMoredeviceList();
			} else {
				$scope.state = false;
			}
		})

		//上拉设备列表
		function getMoredeviceList() {
			$scope.DevicesParam['pagination.page'] = 2;
			$scope.state = true;
			$scope.loadMore = function() {
				_http._post(hostUrl, "/wap/Engineerservice/myList.do", $scope.DevicesParam, function(data) {
					console.log("请求拉取更多");
					if(data.message.totalCount / 20 <= $scope.DevicesParam['pagination.page']) {
						$scope.state = false;
					} else {
						$scope.deviceList = $scope.deviceList.concat(data.message.pageList);
						$scope.$broadcast('scroll.infiniteScrollComplete');
						$scope.DevicesParam['pagination.page'] += 1;
					}
				})
			}
		}

		//查看设备分组
		$scope.showDeviGroup = function() {
				$state.go('deviGroup');
			}
			//设置闪烁
		$scope.szss = function(a) {
			$scope.DeviSsParam = {
				deviceId: a,
				alarmTim: 22
			}
			_http._post(hostUrl, "/wap/Device/setAlarm.do", $scope.DeviSsParam, function(data) {
				$scope.showAlert('', data.message, '');
			})
		}
		$scope.hisPosition = function() {
			$state.go('hisPosition');
		}
	})
	//设备所属分组
	.controller('deviGroupCtrl', function($scope,_http,hostUrl) {
		$scope.DeviGroupParam = {
			deviceId:'00000004'
		}
		_http._post(hostUrl, "/wap/DeGroup/device.do", $scope.DeviGroupParam, function(data) {
			$scope.groups=data.rows;
		})
	})
	//位置列表，查询
	.controller('addressListCtrl', function($scope,_http,hostUrl) {
		var storage = window.localStorage;
		$scope.addrelistParam = {
			access_token: storage.getItem("access_token"),
			user_token: storage.getItem("user_token"),
			'pagination.page': '1',
			'paginateion.orderBy': ''
		}
		_http._post(hostUrl, "/wap/Position/myList.do", $scope.addrelistParam, function(data) {
			$scope.addlist=data.message.pageList;
		})
	})
	//设备历史定位
	.controller('hisPositionCtrl', function($scope,_http,hostUrl) {
		var storage = window.localStorage;
		$scope.hisPositionlistParam = {
			deviceId:'00000004',
			access_token: storage.getItem("access_token"),
			user_token: storage.getItem("user_token")
		}
		_http._post(hostUrl, "/wap/Position/hisList.do", $scope.hisPositionlistParam, function(data) {
			
		})
	})
	//所有签到记录
	.controller('allqiandaoCtrl', function($scope,_http,hostUrl) {
		var storage = window.localStorage;
		$scope.allqiandaoParam = {
			access_token: storage.getItem("access_token"),
			user_token: storage.getItem("user_token"),
			'pagination.page': '1',
			'paginateion.orderBy': ''
		}
		_http._post(hostUrl, "/wap/SignInfo/list.do", $scope.allqiandaoParam, function(data) {
			$scope.allqdList=data.message.pageList;
		})
	});