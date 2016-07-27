angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
	//	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
//	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('bottom');
	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');
		$stateProvider
	//tab-----start-----------------		
		// setup an abstract state for the tabs directive
			.state('tab', {
			url: '/tab',
			abstract: true,
			templateUrl: 'templates/tabs.html',
			
		})

		// Each tab has its own nav history stack:
		.state('tab.infoquery', {
			url: '/infoquery',
			views: {
				'tab-infoquery': {
					templateUrl: 'templates/tab-infoquery.html',
					controller: 'infoqueryCtrl'
				}
			}
		})
		
		.state('tab.mine', {
				url: '/mine',
				views: {
					'tab-mine': {
						templateUrl: 'templates/tab-mine.html',
						controller: 'mineCtrl'
					}
				}
			})
	//tab-----end-----------------		
			.state('login', {
				url: '/login',
				templateUrl: 'templates/login.html',
				controller: 'loginCtrl'
			})
			
			//tab1信息查询
			//所有员工签到
			.state('allqiandao', {
				url: '/allqiandao',
				templateUrl: 'templates/infoquery/allqiandao.html',
				controller: 'allqiandaoCtrl'
			})
			//设备列表
			.state('deviceList', {
				url: '/deviceList',
				templateUrl: 'templates/infoquery/device-list.html',
				controller: 'deviceListCtrl'
			})
			.state('hisPosition', {
				url: '/hisPosition',
				templateUrl: 'templates/infoquery/hisPosition.html',
				controller: 'hisPositionCtrl'
			})
			.state('deviGroup', {
				url: '/deviGroup',
				templateUrl: 'templates/infoquery/device-group.html',
				controller: 'deviGroupCtrl'
			})
			.state('addressList', {
				url: '/addressList',
				templateUrl: 'templates/infoquery/address-list.html',
				controller: 'addressListCtrl'
			})
			//tab2个人中心	
			.state('changePass', {
				url: '/changePass',
				templateUrl: 'templates/mine/change-pass.html',
				controller: 'changePassCtrl'
			})
			
			;

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('login');
//		$urlRouterProvider.otherwise('tab/infoquery');

	})
	.value("hostUrl", "http://139.129.119.141:8282/herd");