var _ = require('underscore');

exports["test/fixtures/it's-a-bad-filename.html"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='never name your file like this.';
}
return __p;
};