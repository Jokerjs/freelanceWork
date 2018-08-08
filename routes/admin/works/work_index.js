const router = require('koa-router')();

const DB=require('../../../modules/db');

router.get('/', async (ctx)=> {

    let workData=await DB.find('work_table', {});

    await ctx.render('./admin/works/work_index', {workData});

})


module.exports = router
