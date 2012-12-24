define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/template.html"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<head><title>'+
((__t=( title ))==null?'':__t)+
'</title></head>';
}
return __p;
};

  return this["JST"];
});