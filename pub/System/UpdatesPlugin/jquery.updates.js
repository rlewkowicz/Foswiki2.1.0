(function($){var defaults={configureUrl:undefined,endpointUrl:undefined,debug:false,delay:1e3,timeout:5e3,cookieName:"FOSWIKI_UPDATESPLUGIN",cookieExpires:7},foswikiUpdates;function FoswikiUpdates(options){var self=this;self.options=$.extend({},defaults,options);if(self.options.debug){console.log("called new FoswikiUpdates")}self.init();self.loadPluginInfo(0);return self}FoswikiUpdates.prototype.init=function(){var self=this;if(typeof self.options.configureUrl==="undefined"){self.options.configureUrl=foswiki.getPreference("UPDATESPLUGIN::CONFIGUREURL")}if(typeof self.options.endpointUrl==="undefined"){self.options.endpointUrl=foswiki.getScriptUrl("rest","UpdatesPlugin","check")}$(document).bind("refresh.foswikiUpdates",function(){self.loadPluginInfo(0)});$(document).bind("forceRefresh.foswikiUpdates",function(){$.cookie(self.options.cookieName,null,{expires:-1,path:"/"});self.loadPluginInfo(1)});$(document).bind("display.foswikiUpdates",function(){self.displayPluginInfo(0)});$(document).on("click","#foswikiUpdatesIgnore",function(){$.cookie(self.options.cookieName,0,{expires:self.options.cookieExpires,path:"/"});$(".foswikiUpdatesMessage").fadeOut();return false})};FoswikiUpdates.prototype.loadPluginInfo=function(forced){var self=this,key,version;self.numberOutdatedPlugins=$.cookie(self.options.cookieName);if(typeof self.numberOutdatedPlugins==="undefined"){window.setTimeout(function(){$.ajax({type:"get",url:self.options.endpointUrl,dataType:"json",timeout:self.options.timeout,success:function(data,status,xhr){self.numberOutdatedPlugins=data.length;$.cookie(self.options.cookieName,self.numberOutdatedPlugins,{expires:self.options.cookieExpires,path:"/"});if(self.numberOutdatedPlugins>0||forced){$(document).trigger("display.foswikiUpdates")}},error:function(xhr,msg,status){$.cookie(self.options.cookieName,-1,{expires:self.options.cookieExpires,path:"/"})}})},self.options.delay)}else if(self.numberOutdatedPlugins>0){$(document).trigger("display.foswikiUpdates")}};FoswikiUpdates.prototype.displayPluginInfo=function(){var self=this,elem;$(".foswikiUpdateMessage").remove();elem=$("#foswikiUpdatesTmpl").render([{nrPlugins:self.numberOutdatedPlugins,cookieExpires:self.options.cookieExpires,configureUrl:self.options.configureUrl}]);$(elem).prependTo("body").fadeIn()};$(function(){foswikiUpdates=foswikiUpdates||new FoswikiUpdates})})(jQuery);