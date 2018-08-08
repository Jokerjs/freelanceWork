$(function(){
	var imgID = 0;
	$('a.artZoom').click(function(){
		var id = $(this).attr('rel');
		if(id == ''){
			id = imgID += 1;
			$(this).attr('id','artZoomLink-' +id);
			$(this).attr('rel',id)
		};
		var url = $(this).attr('href');
	
		$(this).append('<div class="loading" title="loading.."></div>');//loading..
		
		function getImageSize(url,fn){
			var img = new Image();
			img.src = url;
			if (img.complete){
				fn.call(img);
			}else{
				img.onload = function(){
					fn.call(img);
				};
			};
		};
		getImageSize(url,function(){
			$('#artZoomLink-' +id+ ' .loading').remove();
			$('#artZoomLink-' +id).hide();
			if (id != '' && $('#artZoomBox-' +id).length == 0){
				var html = '';
				html += '<div class="artZoomBox" id="artZoomBox-' +id+ '" style="display:none">';
				html += '	<div class="tool"><a class="hideImg" href="#" rel="' +id+ '">收起</a><a class="imgLeft" href="#" rel="' +id+ '">向左转</a><a class="imgRight" href="#" rel="' +id+ '">向右转</a><a class="viewImg" href="#" rel="' +id+ '">新窗口打开</a></div>';
				html += '	<a href="' +url+ '" class="maxImgLink" id="maxImgLink-' +id+ '" rel="' +id+ '"> <img class="maxImg" width="' +this.width+ '" height="' +this.height+ '" id="maxImg-' +id+ '" src="' +url+ '" /> </a>';
				html += '</div>';
				$('#artZoomLink-' +id).after(html);
			};
			$('#artZoomBox-' +id).show('fast');
		});
		
		return false;
	});
	
	//让IE8在图片旋转后高度能被包含
	function IE8height(id){
		var w = $('#maxImg-' +id).outerWidth();
		var h =  $('#maxImg-' +id).outerHeight();
		$('#artZoomBox-' +id+ ' a.maxImgLink').css('height','');
		if ($.browser.version == '8.0' && w > h) {
			var maxHeight = Math.max(w, h);
			$('#artZoomBox-' +id+ ' a.maxImgLink').css('height',maxHeight+ 'px');
		};
	};
	
	$('.artZoomBox a').live('click', function(){
		var id = $(this).attr('rel');
		
		//收起
		if($(this).attr('class') == 'hideImg' || $(this).attr('class') == 'maxImgLink') {
			$('#artZoomBox-' +id).hide('fast',function(){
				$('#artZoomLink-' +id).show();
			});
		};
		//左旋转
		if($(this).attr('class') == 'imgLeft') {
			IE8height(id);
			$('#maxImg-' +id).rotateLeft(90);
		};
		//右旋转
		if($(this).attr('class') == 'imgRight') {
			IE8height(id);
			$('#maxImg-' +id).rotateRight(90);
		};
		//新窗口打开
		if($(this).attr('class') == 'viewImg') window.open($('#maxImgLink-' +id).attr('href'));
		
		return false;
	});
	
});
jQuery.fn.rotate = function(angle,whence) {
	var p = this.get(0);

	// we store the angle inside the image tag for persistence
	if (!whence) {
		p.angle = ((p.angle==undefined?0:p.angle) + angle) % 360;
	} else {
		p.angle = angle;
	}

	if (p.angle >= 0) {
		var rotation = Math.PI * p.angle / 180;
	} else {
		var rotation = Math.PI * (360+p.angle) / 180;
	}
	var costheta = Math.cos(rotation);
	var sintheta = Math.sin(rotation);

	if (document.all && !window.opera) {
		var canvas = document.createElement('img');
		
		canvas.src = p.src;
		canvas.height = p.height;
		canvas.width = p.width;
		canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+costheta+",M12="+(-sintheta)+",M21="+sintheta+",M22="+costheta+",SizingMethod='auto expand')";
	} else {
		var canvas = document.createElement('canvas');
		if (!p.oImage) {
			canvas.oImage = new Image();
			canvas.oImage.src = p.src;
		} else {
			canvas.oImage = p.oImage;
		}

		canvas.style.width = canvas.width = Math.abs(costheta*canvas.oImage.width) + Math.abs(sintheta*canvas.oImage.height);
		canvas.style.height = canvas.height = Math.abs(costheta*canvas.oImage.height) + Math.abs(sintheta*canvas.oImage.width);

		var context = canvas.getContext('2d');
		context.save();
		if (rotation <= Math.PI/2) {
			context.translate(sintheta*canvas.oImage.height,0);
		} else if (rotation <= Math.PI) {
			context.translate(canvas.width,-costheta*canvas.oImage.height);
		} else if (rotation <= 1.5*Math.PI) {
			context.translate(-costheta*canvas.oImage.width,canvas.height);
		} else {
			context.translate(0,-sintheta*canvas.oImage.width);
		}
		context.rotate(rotation);
		context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height);
		context.restore();
	}
	canvas.id = p.id;
	canvas.className = 'maxImg';//定义图片旋转后的className
	canvas.angle = p.angle;
	p.parentNode.replaceChild(canvas, p);
}
jQuery.fn.rotateRight = function(angle) {
	this.rotate(angle==undefined?90:angle);
}
jQuery.fn.rotateLeft = function(angle) {
	this.rotate(angle==undefined?-90:-angle);
}