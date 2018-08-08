const router = require('koa-router')();

const DB=require('../../../modules/db'),
      hash=require('../../../modules/hash');

router.get('/', async (ctx)=> {
    await ctx.render('./admin/works/work_login')
})

router.post('/', async (ctx)=> {

    let user = ctx.request.body.UID;
    let password = ctx.request.body.PWD;
    var result=await DB.find('workUser_table',{user:user});

    if(result[0]==undefined){

        await ctx.render('./admin/works/work_login', {
            code: "400",
            message: '账号不存在'
        })

    }else{
        if(result[0].password==hash.sha(password)){

            ctx.session.admin_name=result[0].user
            await ctx.redirect('/worksindex')

        }else{

            await ctx.render('./admin/works/work_login', {
                code: "300",
                message: '密码错误'
            })

        }

    }

})

router.post('/workReg', async (ctx)=> {

    let getUser = ctx.request.body
    let doUser = {
        user: getUser.regUid,
        password: hash.sha(getUser.regPwd),
        sex: getUser.regSex,
        age: getUser.regAge
    }
    var result=await DB.find('workUser_table',{user:doUser.user});
    
    if(result[0]==undefined){

        let data=await DB.insert('workUser_table',doUser);
        try{
            if(data.result.ok){
                ctx.body={
                    code: "600",
                    mes: '注册成功'
                }
            }
        }catch(err){
            console.log(err);
            ctx.body={
                code: "400",
                mes: '错误'
            }
            return;
            ctx.redirect('/');
        }

    }else{
        ctx.body={
            code: "500",
            mes: '账号已存在'
        }
    }

})



module.exports = router
