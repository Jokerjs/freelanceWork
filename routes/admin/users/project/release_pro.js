const router = require('koa-router')();

const DB=require('../../../../modules/db');

router.get('/', async (ctx)=> {
    let projectData=await DB.find('work_table', {user: ctx.session.admin_name});
    await ctx.render('./admin/users/project/release_pro', {projectData})
})

//修改
router.get('/deta', async (ctx)=> {

    let id = ctx.query.id
    let data=await DB.find('work_table',{"_id": DB.getObjectId(id) });
    ctx.body=data;

})

router.post('/mod', async (ctx)=> {

    let modData = ctx.request.body

    console.log(modData);

    let data=await DB.update('work_table',{"_id":DB.getObjectId(modData.work_id)},{
        work_name: modData.work_name,
        work_text: modData.work_text,
        work_money: modData.work_money
    })

    try{
        if(data){
            ctx.redirect('/usersindex/release-pro')
        }
    }catch(err){
        console.log(err);
        ctx.redirect('/usersindex/release-pro');
    }


})

//删除
router.get('/del', async (ctx)=> {

    let id = ctx.query.id
    var data=await DB.remove('work_table',{"_id":DB.getObjectId(id)});
    if(data){
        ctx.redirect('/usersindex/release-pro')
    }

})

module.exports = router
