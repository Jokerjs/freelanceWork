const router = require('koa-router')();

const DB=require('../../../modules/db');

const releasepro = require('./project/release_pro'),
      releaserel = require('./project/release_rel')

router.get('/', async (ctx)=> {

    let projectData=await DB.find('work_table', {user: ctx.session.admin_name});
    let dateYes = projectData.filter((v)=>{
        return v.code==='1';
    });
    let dateNo = projectData.filter((v)=>{
        return v.code==='0';
    });
    await ctx.render('./admin/users/user_index', {dateYes, dateNo})
})

router.use('/release-pro', releasepro.routes());
router.use('/release-rel', releaserel.routes());


module.exports = router
