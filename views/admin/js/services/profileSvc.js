login.factory('profileSvc', function ($resource) {
	var WebUrl = '/admin/';
	return {
        readData: function () {
            return $resource(WebUrl+'new');
        },
        readOneData: function () {
            return $resource(WebUrl + ':id');
        },        
        updateData: function () {
            return $resource(WebUrl + ':id', null,
                { 'update': { method: 'PUT' } });
        },
        deleteData: function () {
            return $resource(WebUrl + ':id', null,
                { 'delete': { method: 'DELETE' } });
        }
	}
});