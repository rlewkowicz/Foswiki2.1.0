(function(){var initializing=false,fnTest=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(prop){var _super=this.prototype,prototype,name;initializing=true;prototype=new this;initializing=false;for(name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?function(name,fn){return function(){var tmp=this._super,ret;this._super=_super[name];ret=fn.apply(this,arguments);this._super=tmp;return ret}}(name,prop[name]):prop[name]}function Class(){if(!initializing&&this.init){this.init.apply(this,arguments)}}Class.prototype=prototype;Class.prototype.constructor=Class;Class.extend=arguments.callee;return Class}})();