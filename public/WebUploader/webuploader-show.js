/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-09-15 16:30:18
 * @version $Id$
 */


function imageShow(obj,arr){
	var $queueListShow = obj.find('div ul:first-child');
	var $Modal = $(

            '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
                            '<h4 class="modal-title" id="myModalLabel">图片预览</h4>' +
                        '</div>'+
                        '<div class="modal-body">'+
                             '<div class="mask-content">'+
                                '<img id="preview_img" class="maximg" src="" alt=""></img>'+
                            '</div>' +
                        '</div>'+           
                    '</div>'+
                '</div>'+
            '</div>'
            );
    $Modal.appendTo('body');
	for (var i=0; i<arr.length; i++){
		var $li =$(
			'<li class="file-item thumbnail thumbnail-show">' +
				'<p class="imgWrap">' +
					'<img src=" '+arr[i]+' " alt="">' +
				'</p>' +
				'<div class="file-panel file-panel-show">' +
		        	'<span class="expand"></span>' +
		        '</div>' +
			'</li>'
        ).appendTo( $queueListShow );

        $li.on('mouseenter', function(){
            $(this).find('.file-panel-show').stop().animate({height:30});
        });
        $li.on('mouseleave', function(){
            $(this).find('.file-panel-show').stop().animate({height:0});
        });

        var $btns = $li.find('.file-panel-show');
        $btns.on('click', 'span', function(){

	        $('#myModal').modal('show');
	        var imgSrc = $(this).parent().parent().find(".imgWrap").children('img').attr('src');
	        $('#preview_img').attr("src",imgSrc);

        });
	};

}