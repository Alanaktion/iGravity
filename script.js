var $b,w,h,x,y,z,a,ox=0,oy=0;
$(document).ready(function(){
	resize();
	window.addEventListener('resize',resize,false);
	if('ondevicemotion' in window) {	
		$b = $('<b/>').offset({top:h/2,left:w/2}).appendTo('body');
		window.addEventListener('devicemotion',onDeviceMotion,false);
		$('<a/>').css({
			position: 'absolute',
			display: 'block',
			padding: '5px',
			bottom: 0,
			'text-align': 'center'
		}).text('Calibrate').click(function(){
			ox = rx; oy = ry;
			$b.css({top:h/2,left:w/2});
		}).appendTo('body');
	} else
		$('body').html('<h1><img src="ball20@2x.png" alt>&nbsp;iGravity</h1><p>This device does not support motion detection.  Please open iGravity on a  supported device, such as an iPhone, iPod touch, or Android device.</p>');
});
function resize() {
	w = $(window).width();
	h = $(window).height();
}
function onDeviceMotion(e) {
	// initialize
	var acc = e.accelerationIncludingGravity;
	rx = acc.x; ry = acc.y; //a = Math.atan2(y,x);
	
	// calculate new position
	x = (rx>0) ? Math.pow(rx-ox,2) : -1*Math.pow(rx-ox,2);
	y = (ry<0) ? Math.pow(ry-oy,2) : -1*Math.pow(ry-oy,2);
	
	// display position
	$('span').html('x: '+Math.round(x,4)+'<br>y: '+Math.round(y,4) );//+'<br>a: '+Math.round(a*180/Math.PI,4)+'&deg;');
	
	// update element position
	var pos = $b.offset(),t,l;
	if(pos.top+y > 0 && pos.top+y < h - 20)
		t = pos.top+y;
	else
		t = (pos.top+y < 0) ? 0 : h - 20;
	if(pos.left+x > 0 && pos.left+x < w - 20)
		l = pos.left+x;
	else
		l = (pos.left+x < 0) ? 0 : w - 20;	
	$b.css({top:t,left:l});
}