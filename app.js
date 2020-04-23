var app = angular.module('sbApp', []);

app.controller('sbCtrl', function ($scope, $http) {

  $scope.title = "SchoolsBuddy";
  $scope.year = new Date().getFullYear();
  $scope.author = "Tristan Jarrett";
  $scope.currency = "£";
  $scope.userList = [];

  $scope.list = {
    "value": "name",
    "values": ["name", "-name"]
  };

  $http.get('./users.json').then(function (response) {
    var users = response.data;
    console.log(users);

    for (i = 0; i < users.length; i++) {
      console.log(i);

      var reg = dateFix(users[i].registered);
      console.log(reg);

      var user = {
        'id': users[i]._id,
        'isActive': users[i].isActive,
        'name': users[i].name,
        'age': users[i].age,
        'registered': reg,
        'email': users[i].email,
        'balance': users[i].balance
      }
      $scope.userList.push(user)
    }

    console.log($scope.userList)
  });

  $scope.resetBal = function () {
    for (i = 0; i < $scope.userList.length; i++) {
      $scope.userList[i].balance = 0;
    }
  }

  function dateFix(date) {
    var year = date.substr(0, 4);
    var month = date.substr(5, 2);
    var day = date.substr(8, 2);
    var dd = date.substr(11, 2);
    var mm = date.substr(14, 2);
    var ss = date.substr(17, 2);
    return day + '-' + month + '-' + year + ' ' + dd + ':' + mm + ':' + ss;
  }

});