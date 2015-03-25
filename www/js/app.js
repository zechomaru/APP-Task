// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.controller("Tasks",function($scope, $http){
    $scope.tasks = [];
    $scope.newTask = {};
    $scope.update = {};
    $scope.tasksIncomplete = false;
    $scope.tasksComplete = true;

    $http.get('http://190.39.179.26:3000/tasks')
      .success(function(data) {
        console.log(data);
        $scope.tasks = data;
        })
        .error(function(data) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
        $scope.addTask = function(){
          $http.post('http://190.39.179.26:3000/tasks', {
            body: $scope.newTask.body
          })
          .success(function(data, status, headers, config) {
            console.log(data);
            $scope.tasks.push(data);
            $scope.newTask = {};
              
            })
          .error(function(data, status, headers, config) {
              console.log(error);
            });
        }

        $scope.updateTask = function(Id, status){
          $http.put('http://190.39.179.26:3000/tasks/'+ Id, {
            status: status
          })
          .success(function(data, status, headers, config) {
            console.log(data);
              
            })
          .error(function(data, status, headers, config) {
              console.log(error);
            });
        }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at 
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});
