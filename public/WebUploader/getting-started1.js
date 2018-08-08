// 文件上传

$(function(){
    var $list = $('#thelist'),
        $btn = $('#ctlBtn');
 
    var uploader = WebUploader.create({
      resize: false, // 不压缩image     
      swf: 'js/uploader.swf', // swf文件路径
      server: 'upload.php', // 文件接收服务端。
      pick: '#picker', // 选择文件的按钮。可选
      chunked: true, //是否要分片处理大文件上传
      chunkSize:2*1024*1024 //分片上传，每片2M，默认是5M
      //auto: false //选择文件后是否自动上传
     // chunkRetry : 2, //如果某个分片由于网络问题出错，允许自动重传次数
      //runtimeOrder: 'html5,flash',
      // accept: {
      //   title: 'Images',
      //   extensions: 'gif,jpg,jpeg,bmp,png',
      //   mimeTypes: 'image/*'
      // }
    });
    // 当有文件被添加进队列的时候
    uploader.on( 'fileQueued', function( file ) {
        var fileName = file.name;
        $list.append( 
            '<div id="' + file.id + '" class="item file-box">' +
              '<h4 class="info">'+' <i class="fa fa-cloud"></i>'+ fileName + '<i class="remove fa fa-trash"></i>' + '</h4>' +
              '<p class="state">等待上传...</p>' +
            '</div>' 
          );

        $('.remove').on('click', function(){
            //alert($(this).parent().parent().attr('id'))
              //removeFile( file );
              $(this).parent().parent().remove();
          });

    });
   
    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<div class="progress progress-striped active">' +
              '<div class="progress-bar" role="progressbar" style="width: 0%">' +
              '</div>' +
            '</div>').appendTo( $li ).find('.progress-bar');
        }

        $li.find('p.state').text('上传中');

        $percent.css( 'width', percentage * 100 + '%' );
    });
    // 文件上传成功
    uploader.on( 'uploadSuccess', function( file ) {
        $( '#'+file.id ).find('p.state').text('已上传');
    });

    // 文件上传失败，显示上传出错
    uploader.on( 'uploadError', function( file ) {
        $( '#'+file.id ).find('p.state').text('上传出错');
    });
    // 完成上传完
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').fadeOut();
    });

    $btn.on('click', function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            uploader.upload();
            // if (state === 'ready') {
            //     uploader.upload();
            // } else if (state === 'paused') {
            //     uploader.upload();
            // } else if (state === 'uploading') {
            //     uploader.stop();
            // }
        });
});