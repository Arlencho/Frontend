if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
} else {
    alert('The File APIs are not fully supported in this browser.');
}
var app = angular.module('login');
angular.module('login').filter('FilterBySearch', function () {
    return function (input, search) {
        var modifiedInput = [];
        for (var i = 0; i < input.length; i++) {
            if (input[i].id.toLowerCase().search(search.toLowerCase()) > -1 ||
                input[i].label.toLowerCase().search(search.toLowerCase()) > -1 ||
                input[i].age.toString().toLowerCase().search(search.toLowerCase()) > -1) {

                modifiedInput.push(input[i]);
            }
        }
        return modifiedInput;
    };
});

app.controller('dataTableController', function ($scope, $http) {
    var json = '{"items":  [     {"id": "Open", "label": "About Adobe CVG Viewer...", "age":34},     {"id": "OpenNew", "label": "Open New", "age":23},     {"id": "ZoomIn", "label": "Zoom In", "age":45},     {"id": "ZoomOut", "label": "Zoom Out", "age":23},     {"id": "OriginalView", "label": "Original View", "age":456},     {"id": "Quality", "label": "About Adobe CVG Viewer...", "age":2134},     {"id": "Pause", "label": "About Adobe CVG Viewer...", "age":456},     {"id": "Mute", "label": "About Adobe CVG Viewer...", "age":2134},     {"id": "Find", "label": "Find...", "age":456},     {"id": "FindAgain", "label": "Find Again", "age":23},     {"id": "Copy", "label": "About Adobe CVG Viewer...", "age":5},     {"id": "CopyAgain", "label": "Copy Again", "age":234},     {"id": "CopySVG", "label": "Copy SVG", "age":5},     {"id": "ViewSVG", "label": "View SVG", "age":4},     {"id": "ViewSource", "label": "View Source", "age":23},     {"id": "SaveAs", "label": "Save As", "age":45},     {"id": "SaveAs", "label": "Save As", "age":56},     {"id": "SaveAs", "label": "Save As", "age":67},     {"id": "SaveAs", "label": "Save As", "age":78},     {"id": "SaveAs", "label": "Save As", "age":89},     {"id": "SaveAs", "label": "Save As", "age":34},     {"id": "Help", "label": "About Adobe CVG Viewer...", "age":43},     {"id": "About", "label": "About Adobe CVG Viewer...", "age":5} ] }'
    $scope.names = JSON.parse(json);

    $scope.namesOrg = JSON.parse(json);
    $scope.pageList = [1, 2, 3];
    $scope.pageIndex = 1;
    $scope.orderByVar = 'id';
    $scope.reverseBool = false;
    $scope.searchValue = "";
    /*-----------------------------------------*/
    $scope.ChangeOrder = function (order) {
        if ($scope.orderByVar === order) {
            $scope.reverseBool = !$scope.reverseBool;
        } else $scope.reverseBool = true;
        $scope.orderByVar = order;
    }
    $scope.setCurrent = function (page) {
        console.log(page);
    }
    $scope.pageIndexChanged = function () {
        if (parseInt($scope.pageIndex) == "NaN" || $scope.pageIndex == 0) return;
        var noOfPages = $scope.names.items.length / $scope.pageIndex;
        $scope.pageList = [];
        for (var i = 0; i < noOfPages; i++) {
            $scope.pageList.push(i + 1);
        }
    }
    $scope.searchValueChanged = function () {
        $scope.names.items = [];
        var input = $scope.namesOrg.items;
        for (var i = 0; i < input.length; i++) {
            if (input[i].id.toLowerCase().search($scope.searchValue.toLowerCase()) > -1 ||
                input[i].label.toLowerCase().search($scope.searchValue.toLowerCase()) > -1 ||
                input[i].age.toString().toLowerCase().search($scope.searchValue.toLowerCase()) > -1) {

                $scope.names.items.push(input[i]);
            }
        }
        //$scope.$apply();
    }
    /*-----------------------------------------*/
    function readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    var allText = rawFile.responseText;
                    $scope.names = JSON.parse(allText);
                    $scope.namesOrg = JSON.parse(allText);
                    //console.log($scope.names);
                    //$scope.$apply();
                }
            }
        }
        rawFile.send(null);
    }
 //   readTextFile("/JsonData.txt");
    /*-----------------------------------------*/
    $scope.list = $scope.$parent.personList;
    $scope.config = {
        itemsPerPage: 5,
        fillLastPage: true
    }
});