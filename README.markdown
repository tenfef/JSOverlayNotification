# JSOverlayNotification

This is a simple project that I threw together to allow an overlay notification at the top of a page.

## Usage

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

## Requirements
* Jquery.
I'm using 1.6 but I assume it will work for versions > 1.4
* Not an entirely useless browser.
I've only tested this in recent versions of Safari, Firefox and Chrome.   
God help you if you are using IE.

## Features
* An ignore button which will use local storage to store whether the user has ignored the notification.
* You can add any number of buttons and callbacks to the notification.

## License

This is released under [WTFPL](http://en.wikipedia.org/wiki/WTFPL) (Meaning i don't care what you do with it.)
If you do use it I wouldn't mind hearing from you: jordan(at)jaycodesign.co.nz