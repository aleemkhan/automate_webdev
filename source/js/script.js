
/*
	@Author: Abdul Aleem Khan

	-----------------------------------------------------------------------------------------------

	This is the main script file of the application that handles routing and events.

*/

var myApp = angular.module('recordSure', ['ngRoute']);



/*
	Application routing is being handled in the following block.
*/

myApp.config(function($routeProvider) {

    $routeProvider.when("/", {

        templateUrl : "home.html"

    }).when("/applications", {

        templateUrl : "applications.html"

    });

});


/*
	Application Controller.
*/

myApp.controller("mainController", function($scope, $http, $route, $routeParams, $location, $window, $timeout) {

	/*
		First of all data is loaded from the localStorage via getItem(key) method. This method is defined in
		source/js/misc.js
	*/

	if(getItem('applications') == null){


		/*
			Empty initialized if no record is found.
		*/

		$scope.applications = [];

		/*
			setItem(key, value) stores data into localStorage. This method is defined in source/js/misc.js.
			toString(Obj) turns an object into a JSON string. This methid is defined in source/js/misc.js.
		*/

		setItem('applications', toString($scope.applications));

	}else{

		/*
			If the applications tag in localStorage is not empty it is retrieved and converted into an JSON object using toObject(str) method.
			This method converts a JSON string to a JSON object. This method is defined in source/js/misc.js.
		*/

		$scope.applications = toObject(getItem('applications'));

	}


	/*
		consoleLog(Obj) prints an Obj to console it only prints if 'displayConsoleLog' flag is true. This method is defined in source/js/misc.js
	*/

	consoleLog($scope.applications);

	/*
		myColors Array contains colors that are set on different application types selection.
	*/

	$scope.myColors = ['silver', '#663399', '#00bcd4'];


	/*
		interviewForm Object is the model for the form it is used to build the form and to store data after user inputs data.
		
	*/
	
	$scope.interviewForm = {

		interviewType : {

			label: "Select purpose of interview*",

			selected: '',

			types:[

				{id:1, name: 'Visa'},

				{id:2, name: 'Permanent Residence'}

			]

		},

		city:{

			label: "Select a city*",

			selected : '',

			cities: [

				{id:1, name: 'London'},

				{id:2, name: 'Brighton'},

				{id:3, name: 'Belfast'},

				{id:4, name: 'Cardiff'},

				{id:5, name: 'Newcastle'},

				{id:6, name: 'Elsewhere'}

			],

			elsewhere: ""

		},

		address : {

			label: "Your Address*",

			placeholder: "Your Address",

			value:""

		},

		interviewer : {

			label: "Name of interviewer*",

			placeholder: "Name of interviewer",

			value:""

		},

		interviewee : {

			label: "Name of interviewee*",

			placeholder: "Name of interviewee",

			value:""

		},

		email : {

			label: "Enter your email*",

			placeholder: "Enter your email",

			value:""

		},

		phone : {
			label: "Enter your phone*",
			placeholder: "Enter your phone",
			value:""
		},

		date : {

			label: "Select date of interview*",

			placeholder: "Select date of interview",

			value:""

		},

		id : ''

	};



	/*
		resetFormObject Object is replica of interviewFormObject. Its purpose is to reset form.
		
	*/

	$scope.resetFormObject = {

		interviewType : {

			label: "Select purpose of interview*",

			selected: '',

			types:[

				{id:1, name: 'Visa'},

				{id:2, name: 'Permanent Residence'}

			]

		},

		city:{

			label: "Select a city*",

			selected : '',

			cities: [

				{id:1, name: 'London'},

				{id:2, name: 'Brighton'},

				{id:3, name: 'Belfast'},

				{id:4, name: 'Cardiff'},

				{id:5, name: 'Newcastle'},

				{id:6, name: 'Elsewhere'}

			],

			elsewhere: ""

		},

		address : {

			label: "Your Address*",

			placeholder: "Your Address",

			value:""

		},

		interviewer : {

			label: "Name of interviewer*",

			placeholder: "Name of interviewer",

			value:""

		},

		interviewee : {

			label: "Name of interviewee*",

			placeholder: "Name of interviewee",

			value:""

		},

		email : {

			label: "Enter your email*",

			placeholder: "Enter your email",

			value:""

		},

		phone : {
			label: "Enter your phone*",
			placeholder: "Enter your phone",
			value:""
		},

		date : {

			label: "Select date of interview*",

			placeholder: "Select date of interview",

			value:""

		},

		id : ''
		
	};



	/*
		showAlert scope variable is a flag that decides if the alert has to be displayed or not.
	*/

	$scope.showAlert = false;


	/*
		Following sub routine auto hides the alert after 3 seconds.
	*/

	$scope.autoHideAlert = function(){

		$scope.showAlert = true;

		$timeout(function() {

		    $scope.showAlert = false;

		}, 3000);

	};

	
	/*
		formFieldIndex scope variable decides which form field is being filled
	*/

	$scope.formFieldIndex = 1;

	/*
		previousField decrements formFieldIndex scope variable.
	*/

	$scope.previousField = function(){

		$scope.formFieldIndex--;

	};

	/*
		nextField increments formFieldIndex scope variable.
	*/

	$scope.nextField = function(){

		$scope.formFieldIndex++;
		
	};


	/*
		submitForm handles the form submission. Shows the alert. Adds the unique ID to form Object. Stores the object in database.
		Then resets the form. submitForm takes form object as an input argument.
	*/

	$scope.submitForm = function(form){

		/*
			autoHideAlert displayes the alertt and hides it.
		*/

		$scope.autoHideAlert();


		/*
			Unique ID is created via the timestamp which is always a unique string. It is contcatinated with # symbol as per requirement
		*/

		$scope.interviewForm.id = "#"+ new Date().getTime();


		/*
			form object is being added to applicatins object.
		*/

		$scope.applications.push($scope.interviewForm);


		/*
			Applications object is being stored in localStorage
		*/

		setItem('applications', toString($scope.applications));

		/*
			interviewForm is being reset to ots default using resetFormObject.
		*/

		$scope.interviewForm = angular.copy($scope.resetFormObject);

		/*
			form states are being reset.
		*/

		form.$setPristine();

		form.$setUntouched();

		/*
			formFieldIndex is being reset.
		*/

		$scope.formFieldIndex = 1;

	};

});





