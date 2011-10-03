# JSOverlayNotification

This is a simple project that I threw together to allow an overlay notification at the top of a page and allow the user to ignore notifications.    
https://github.com/tenfef/JSOverlayNotification/    

## Demo
You can see a very [simple demo here](http://www.jaycodesign.co.nz/wp-content/uploads/demos/JSOverlayNotification/Example.html):    



## Usage
```javascript
	overlay_notification.show_overlay_notification({
		text : 'The world is going to end.',
		unique_id : "notification_id",
		buttons : [
			{
				title : "Click Me",
				callback : function(){
					alert('First button click');
				}						
			},
			{
				title : "Second Button",
				callback : function(){
					alert('Second Button Click');
				}						
			}
		]
	});
```
## Requirements
* Jquery.
I'm using 1.6 but I assume it will work for versions > 1.4
* Not an entirely useless browser.
I've only tested this in recent versions of Safari, Firefox and Chrome.   
God help you if you are using IE.

## Features
* An ignore button which will use local storage to store whether the user has ignored the notification.
* You can add any number of buttons and callbacks to the notification.

## Notes
I'm using the JStorage plugin which I carefully lifted from http://www.jstorage.info/ by Andris Reinman.    
I dont think He'll mind me including his code in this project, but don't really know proper open source edicate.

This is my first time open sourcing anything. Comments and improvements are welcome.    
I dont know that I'll have much time to improve it, so feel free to fork it and change it however you like, the code should be quite straight forward.


## License

Everything accept for Andris Reinman's JStorage is released under [WTFPL](http://en.wikipedia.org/wiki/WTFPL) (Meaning i don't care what you do with it.)        
JStorage is licensed under MIT details here: http://www.jstorage.info/

If you do use it I wouldn't mind hearing from you: jordan(at)jaycodesign.co.nz