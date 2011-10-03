/*
 *   JStorage minified.
 *   Taken from http://www.jstorage.info/
 *   Used for long term storage of the "Ignore" button.
 */


(function(f){if(!f||!(f.toJSON||Object.toJSON||window.JSON)){throw new Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!")}var g={},d={jStorage:"{}"},h=null,j=0,l=f.toJSON||Object.toJSON||(window.JSON&&(JSON.encode||JSON.stringify)),e=f.evalJSON||(window.JSON&&(JSON.decode||JSON.parse))||function(m){return String(m).evalJSON()},i=false;_XMLService={isXML:function(n){var m=(n?n.ownerDocument||n:0).documentElement;return m?m.nodeName!=="HTML":false},encode:function(n){if(!this.isXML(n)){return false}try{return new XMLSerializer().serializeToString(n)}catch(m){try{return n.xml}catch(o){}}return false},decode:function(n){var m=("DOMParser" in window&&(new DOMParser()).parseFromString)||(window.ActiveXObject&&function(p){var q=new ActiveXObject("Microsoft.XMLDOM");q.async="false";q.loadXML(p);return q}),o;if(!m){return false}o=m.call("DOMParser" in window&&(new DOMParser())||window,n,"text/xml");return this.isXML(o)?o:false}};function k(){if("localStorage" in window){try{if(window.localStorage){d=window.localStorage;i="localStorage"}}catch(p){}}else{if("globalStorage" in window){try{if(window.globalStorage){d=window.globalStorage[window.location.hostname];i="globalStorage"}}catch(o){}}else{h=document.createElement("link");if(h.addBehavior){h.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(h);h.load("jStorage");var n="{}";try{n=h.getAttribute("jStorage")}catch(m){}d.jStorage=n;i="userDataBehavior"}else{h=null;return}}}b()}function b(){if(d.jStorage){try{g=e(String(d.jStorage))}catch(m){d.jStorage="{}"}}else{d.jStorage="{}"}j=d.jStorage?String(d.jStorage).length:0}function c(){try{d.jStorage=l(g);if(h){h.setAttribute("jStorage",d.jStorage);h.save("jStorage")}j=d.jStorage?String(d.jStorage).length:0}catch(m){}}function a(m){if(!m||(typeof m!="string"&&typeof m!="number")){throw new TypeError("Key name must be string or numeric")}return true}f.jStorage={version:"0.1.5.0",set:function(m,n){a(m);if(_XMLService.isXML(n)){n={_is_xml:true,xml:_XMLService.encode(n)}}g[m]=n;c();return n},get:function(m,n){a(m);if(m in g){if(typeof g[m]=="object"&&g[m]._is_xml&&g[m]._is_xml){return _XMLService.decode(g[m].xml)}else{return g[m]}}return typeof(n)=="undefined"?null:n},deleteKey:function(m){a(m);if(m in g){delete g[m];c();return true}return false},flush:function(){g={};c();try{window.localStorage.clear()}catch(m){}return true},storageObj:function(){function m(){}m.prototype=g;return new m()},index:function(){var m=[],n;for(n in g){if(g.hasOwnProperty(n)){m.push(n)}}return m},storageSize:function(){return j},currentBackend:function(){return i},storageAvailable:function(){return !!i},reInit:function(){var m,o;if(h&&h.addBehavior){m=document.createElement("link");h.parentNode.replaceChild(m,h);h=m;h.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(h);h.load("jStorage");o="{}";try{o=h.getAttribute("jStorage")}catch(n){}d.jStorage=o;i="userDataBehavior"}b()}};k()})(window.jQuery||window.$);

var overlay_notification = {

	ignore_item : function(unique_id){

		if (typeof unique_id == 'undefined' || unique_id.length == 0) {
			console.log("Invalid ID");
			return;
		}

		var ignored_items = $.jStorage.get('JSOverlay_notif_ignored');
		if (! ignored_items) {
			ignored_items = [];
		}
		ignored_items.push(unique_id);
		$.jStorage.set('JSOverlay_notif_ignored', ignored_items);
		console.log("Ignoring", unique_id);
	},
	should_ignore_item : function(unique_id) {
		var ignored_items = $.jStorage.get('JSOverlay_notif_ignored');

		console.log(ignored_items, "ignored");

		if (! ignored_items) {
			return false;
		}

		for (i in ignored_items) {
			if (unique_id == ignored_items[i]) {
				return true;
			}

		}


		return false;

	},
	clear_ignores : function(){
		$.jStorage.set('JSOverlay_notif_ignored', []);
	},
	options : {},
	show_overlay_notification : function(options) {
		this.options = options;
		if (typeof options.buttons == 'undefined') {
			options.buttons = [];
		}
		if (typeof options.unique_id == 'undefined') {
			console.log("Unique ID is required to store the ignore.");
		}
		if (typeof options.text == 'undefined') {
			console.log("Text is required");
			return;
		}		

		var unique_id = options.unique_id;

		if (overlay_notification.should_ignore_item(options.unique_id)) {
			console.log("Item ignored. Don't show");
			return;
		}



		var notification = '<div class="notif_wrap"><div class="notif_cont"><table><tr><td><h2>' + options.text + '</h2></td>';
		if (options.buttons.length > 0) {
			for (i in options.buttons) {				
				notification += '<td style="padding-left:20px;">';
				var btn_class = (typeof options.buttons[i].btn_class == 'undefined') ? '' : options.buttons[i].btn_class
				var btn = '<a rel="' + i +'" class="notif_button ' + btn_class + '">' + options.buttons[i].title + '</a>';
				notification += btn + '</td>';
			}
		}

		notification += '<td><a class="notif_close">X Ignore</a></td></tr></table></div></div>';

		$('body').append('<div id="overlay_notification" />');

		$('#overlay_notification').hide().html(notification).fadeIn('slow');

		$('.notif_button').die('click').live('click', function(){
			var index = $(this).prop('rel');
			if (typeof overlay_notification.options.buttons[index].callback != 'undefined') {
				overlay_notification.options.buttons[index].callback();
			}
		});
		$('.notif_close').die('click').live('click', function(){
			overlay_notification.hide_overlay_notification();
			overlay_notification.ignore_item(unique_id)
		});

	},
	hide_overlay_notification : function() {
		$('#overlay_notification').html('').animate({
			'height' : '0px'
		}, 'fast', function(){
			$(this).hide();
		});
	}
}