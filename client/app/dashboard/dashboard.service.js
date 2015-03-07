'use strict';

angular.module('shaastraApp')
  .service('DashService', function DashService($http) {

  	return {
  		options:[
  			{
  				name : 'Concept and Design',
  				value : 'concept_and_design'
  			},
  			{
  				name : 'Events',
  				value : 'events'
  			},
  			{
  				name : 'Evolve',
  				value : 'evolve'
  			},
  			{
  				name : 'Envisage',
  				value : 'envisage'
  			},
  			{
  				name : 'Finance',
  				value : 'finance'
  			},
  			{
  				name : 'Facilities',
  				value : 'facilities'
  			},
  			{
  				name : 'Sponsorship and PR',
  				value : 'sponsorship_and_pr'
  			},
  			{
  				name : 'Shows(Proshows)',
  				value : 'shows'
  			},
  			{
  				name : 'Student Relations (SR)',
  				value : 'student_relations'
  			},
  			{
  				name : 'QMS',
  				value : 'qms'
  			},
  			{
  				name : 'WebOps and MobOps',
  				value : 'web_and_mob'
  			}
  		]
  	};
});