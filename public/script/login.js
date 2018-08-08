$(function () {

    var regPwd;
    var regUid

    $(".signup-form input").on("focus", function () {

        $(this).parent().addClass("border");

    });

    $(".signup-form input").on("blur", function () {

        $(this).parent().removeClass("border");

    })

    //注册方式切换

    $(".signup-select").on("click", function () {

        var _text = $(this).text();

        var $_input = $(this).prev();

        $_input.val('');

        if (_text == "手机注册") {

            $(".signup-tel").fadeIn(200);

            $(".signup-email").fadeOut(180);

            $(this).text("邮箱注册");

            $_input.attr("placeholder", "手机号码");

            $_input.attr("onblur", "verify.verifyMobile(this)");

            $(this).parents(".form-group").find(".error-notic").text("手机号码格式不正确")


        }

        if (_text == "邮箱注册") {

            $(".signup-tel").fadeOut(180);

            $(".signup-email").fadeIn(200);

            $(this).text("手机注册");

            $_input.attr("placeholder", "邮箱");

            $_input.attr("onblur", "verify.verifyEmail(this)");

            $(this).parents(".form-group").find(".error-notic").text("邮箱格式不正确")

        }

    });

    //步骤切换

    var _boxCon = $(".box-con");

    $(".move-login").on("click", function () {

        $(_boxCon).css({

            'marginLeft': 0

        })

    });

    $(".move-signup").on("click", function () {

        $(_boxCon).css({

            'marginLeft': -320

        })

    });

    $(".move-other").on("click", function () {

        $(_boxCon).css({

            'marginLeft': -640

        })

    });

    $(".move-reset").on("click", function () {

        $(_boxCon).css({

            'marginLeft': -960

        })

    });

    $("body").on("click", ".move-addinf", function () {

        $(_boxCon).css({

            'marginLeft': -1280

        })

    });


    //获取短信验证码

    var messageVerify = function () {

        $(".get-message").on("click", function () {

            if (_handle) {

                $("#message-inf").fadeIn(100)

                $(this).html('<a href="javascript:;">下一步</a><img class="loading" src="images/loading.gif">').addClass("move-addinf");

            }

        });

    }();

});


//表单验证

function showNotic(_this) {

    $(_this).parents(".form-group").find(".error-notic").fadeIn(100);

    $(_this).focus();

}//错误提示显示

function hideNotic(_this) {

    $(_this).parents(".form-group").find(".error-notic").fadeOut(100);

}//错误提示隐藏

var verify = {

    verifyEmail: function (_this) {

        /*var validateReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        var _value = $(_this).val();

        if (!validateReg.test(_value)) {

            showNotic(_this)

        } else {

            hideNotic(_this)

        }*/
        if($("input[name='regUid']").val() ==''){
            $(".error-regUid").show();
            return regUid = false;
        }else{
            $(".error-regUid").hide()
            return regUid = true;
        }

    },//验证邮箱

    verifyMobile: function (_this) {

        var validateReg = /^((\+?86)|(\(\+86\)))?1\d{10}$/;

        var _value = $(_this).val();

        if (!validateReg.test(_value)) {

            showNotic(_this);

            _handle = false;

        } else {

            hideNotic(_this);

            _handle = true;

        }

        return _handle

    },//验证手机号码

    PasswordLenght: function (_this) {

        var _length = $(_this).val().length;

        if($("input[name='regPwd']").val() ==''){

            $(".error-regPwd").show()
            return regPwd = false;

        }else{

            $(".error-regPwd").hide()

            if (_length < 6) {

                showNotic(_this)
                $(".error-regPwd").hide()
                return regPwd = false;

            } else {

                hideNotic(_this)
                return regPwd = true;

            }

        }



    },//验证设置密码长度

    VerifyCount: function (_this) {

        var _count = "123456";

        var _value = $(_this).val();

        console.log(_value)

        if (_value != _count) {

            showNotic(_this)

        } else {

            hideNotic(_this)

        }

    }//验证验证码

}





