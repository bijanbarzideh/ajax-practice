console.info('App.js loaded!')

angular.module('MyApp', [])
    .controller('MyController', MyController)
    .factory('MyAppFactory', MyAppFactory)

MyController.$inject = ['MyAppFactory']
MyAppFactory.$inject = ['$http']

function MyController(MyAppFactory){
    console.debug('MyController:loaded')
    console.debug('MyController:MyAppFactory', MyAppFactory)


//load data into factory on page load and then use filter to filter results
    var myCtrl = this;

    myCtrl.companyInfo = '';

    myCtrl.clickToShow = function(){

      MyAppFactory.getCompany()
        .then(function(res){
          console.debug('getCompany:res', res)

              var data  = res.data   || {}
                  value = data.value || {}
                  name  = value.name || ''

               myCtrl.companyInfo = name || ':( no name found.'
        })
    }


}

function MyAppFactory($http){
    console.debug('MyAppFactory:loaded')
    return {
        getData : function(){
    			return $http.get()
    		},
        getCompany: function() {
            return $http.get('http://dev.markitondemand.com/Api/v2/Lookup')
        }
    }
}
