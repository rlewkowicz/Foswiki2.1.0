jQuery(function($){var defaults={loop:false,overlayOpacity:.8,overlayFadeDuration:400,resizeDuration:300,resizeEasing:"swing",initialWidth:250,initialHeight:250,imageFadeDuration:300,captionAnimationDuration:200,counterText:"Image {x} of {y}",itemSelector:"a[href]",titleAttr:"title"};$(function(){var counterText=foswiki.getPreference("ImagePlugin.counterText");if(counterText){defaults.counterText=counterText}});$(".jqSlimbox:not(.jqInitedSlimbox)").livequery(function(){var $this=$(this);$this.addClass("jqInitedSlimbox");var opts=$.extend({},defaults,$this.metadata());var groupRel="lightbox-"+Math.floor(Math.random()*100);$this.find(opts.itemSelector).attr("rel",groupRel).slimbox(opts,function(el){var $el=$(el);var imgOpts=$.extend({},$el.metadata());var href=imgOpts.origUrl||el.href;var imgTitle=imgOpts.title||$el.attr(opts.titleAttr)||"";imgTitle=imgTitle.replace(/\..*?$/,"").replace(/[\-_]/g," ");return[el.href,'<a href="'+href+'">'+imgTitle+"</a>"]},function(el){return this==el||this.rel.length>8&&this.rel==el.rel})})});