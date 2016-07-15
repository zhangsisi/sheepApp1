angular.module('starter.services', [])
	.factory('_http',function($http) {
		return {				
			_get: function(hostUrl, Url, callback) {
				$http.get(hostUrl + Url)
					.success(function(data) {
						callback(data);
					});
			},
			_post: function(hostUrl, Url, param, callback) {
				$http({
					method: 'post',
					url: hostUrl + Url,
					params: param
				}).success(function(data) {
					callback(data);
				});

			}
		}
	});