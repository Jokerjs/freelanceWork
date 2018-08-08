const router = require('koa-router')();

const DB = require('../../../../modules/db');

router.get('/', async (ctx)=> {
    await ctx.render('./admin/users/project/release_rel', {})
})

//添加
router.post('/rel', async (ctx)=> {

    let postData = ctx.request.body

    let relData = {
        code: '0',
        user: ctx.session.admin_name,
        work_name: postData.work_name,
        work_phone: postData.work_phone,
        work_text: postData.work_text,
        work_time: new Date(),
        work_money: postData.work_money
    }

    let data=await DB.insert('work_table',relData);
    //console.log(data);
    try{
        if(data.result.ok){

            ctx.redirect('/usersindex/release-pro')

        }
    }catch(err){
        console.log(err);
        ctx.redirect('/usersindex/release-rel');
    }


})


module.exports = router
