const router = require('koa-router')();

router.get('/', async (ctx)=> {

    await ctx.render('./www/getnav', {});

})


module.exports = router
