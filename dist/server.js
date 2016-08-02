module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _jobs = __webpack_require__(2);

	var _jobs2 = _interopRequireDefault(_jobs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();
	var jobsCtrl = new _jobs2.default();

	app.get('/', function (req, res) {
	    res.send('hello world');
	}).get('/jobs', jobsCtrl.getJobs).listen(3000, function () {
	    console.log('Example app listening on port 3000!');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lodash = __webpack_require__(3);

	var _ = _interopRequireWildcard(_lodash);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var mocks = [{
	    id: 1,
	    company: "Dropbox",
	    job_title: "Senior Scala Engineer",
	    description: "Blah blah blah, this is a description about the job",
	    salary: 150000,
	    external_url: "https://dropbox.com/jobs",
	    tour_duration: 2,
	    company_values: [1, 2, 7, 9],
	    status: "approved"
	}, {
	    id: 2,
	    company: "Apple",
	    job_title: "Senior UI Designer",
	    description: "Blah blah blah, this is a description about the job",
	    salary: 175000,
	    external_url: "https://dropbox.com/jobs",
	    tour_duration: 4,
	    company_values: [1, 2, 7, 9],
	    status: "pending"
	}, {
	    id: 3,
	    company: "Google",
	    job_title: "UX specialist",
	    description: "Blah blah blah, this is a description about the job",
	    salary: 185000,
	    external_url: "https://dropbox.com/jobs",
	    tour_duration: 4,
	    company_values: [1, 2, 7, 9],
	    status: "archived"
	}];

	var JobsController = function () {
	    function JobsController() {
	        _classCallCheck(this, JobsController);
	    }

	    _createClass(JobsController, [{
	        key: "getJobs",
	        value: function getJobs(req, res) {
	            console.log(req);

	            var jobs = mocks.filter(function (job) {
	                return job.status === "approved";
	            });

	            res.send(jobs);
	        }
	    }]);

	    return JobsController;
	}();

	exports.default = JobsController;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ }
/******/ ]);