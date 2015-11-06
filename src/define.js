/**
 * Created by amr on 11/7/15.
 */

/*
 * support require.js
 * if define is a function
 * define module
 */

if(typeof define === 'function'){
    define(function(){
        return angular.module('loader-component');
    });
}