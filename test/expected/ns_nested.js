this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["JST"] = this["MyApp"]["JST"] || {};
this["MyApp"]["JST"]["Main"] = this["MyApp"]["JST"]["Main"] || {};

this["MyApp"]["JST"]["Main"]["test/fixtures/template.html"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<head><title>'+
((__t=( title ))==null?'':__t)+
'</title></head>';
}
return __p;
};