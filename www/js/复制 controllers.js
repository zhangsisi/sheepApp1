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
			
//			$scope.addPingmlist = [{
//				longitude: 132,
//				latitude: 1
//			}, {
//				longitude: 130,
//				latitude: 199
//			}, {
//				longitude: 131,
//				latitude:90
//			}];
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
//			console.log(alist + '哈' + blist);

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
//			console.log(minx + '哈' + maxx + '哈' + miny + '哈' + maxy);
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
//				console.log($scope.addPingmlist[yq].xcoord);
			}
			for(yq in blist) {
				var screenY = blist[yq] * 3600 / scaleY;
				var mysheepY = screenY - minY;
				$scope.addPingmlist[yq].ycoord = mysheepY;
//				console.log($scope.addPingmlist[yq].ycoord);
			}
//			console.log($scope.addPingmlist);
			//cavas测试羊的位置test1
			var cxt=o.getContext("2d");
			var img=new Image()
			img.src="img/yang.png"
			img.onload = function() {
   				cxt.drawImage(img, 100, 100,50,20);
   				cxt.drawImage(img, 40, 60,50,20);
   				cxt.drawImage(img, 140, 30,50,20);
   			}
		$scope.addPingmlist = [{
			xcoord:100,
			ycoord:100
		}, {
			xcoord:40,
			ycoord:60
		},{
			xcoord:140,
			ycoord:30
		}]
//	
//
//			
//			//模拟数据--------end------------------------------------
//	img.onload = function() {	
//		for(onesh in $scope.addPingmlist){	
//			cxt.drawImage(img,$scope.addPingmlist[onesh].xcoord,$scope.addPingmlist[onesh].ycoord,50,20);
//			console.log($scope.addPingmlist[onesh].xcoord+"哈哈"+onesh+"哈哈"+$scope.addPingmlist[onesh].ycoord);			
//		}	
//	}
			
			//羊群显示完毕
o.onclick = function(e){
	
	e=e||event;//获取事件对象
    //获取事件在canvas中发生的位置
    var x=e.clientX-o.offsetLeft;
    var y=e.clientY-o.offsetTop;
    console.log(x+"哈哈xy"+y);
    //如果事件位置在矩形区域中
    for(onesh in $scope.addPingmlist){
    	var sa=$scope.addPingmlist[onesh].xcoord;
    	var sb=$scope.addPingmlist[onesh].ycoord;
    	console.log(sa+"哈哈sab"+sb);
//		if(x>=sa&&(x<=sa+50)&&y>=sb&&(y<=sb+20)){
		if(y>=sb){
		    alert(11); 
		}
    }
}
			//测试end
			
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