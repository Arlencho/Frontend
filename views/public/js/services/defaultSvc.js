login.factory('defaultSvc', function ($resource) {
	var WebUrl = '/';
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