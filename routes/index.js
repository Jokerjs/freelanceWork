const router = require('koa-router')();

const DB=require('../modules/db');

const works = require('./admin/works/work_login'),
      worksindex = require('./admin/works/work_index');

const users = require('./admin/users/user_login'),
     usersindex = require('./admin/users/user_index');

const www = require('./www/getnav');

/*router.use(async (ctx, next)=>{
    let sessionName = ctx.session.admin_name;

    console.log(sessionName)

    let workN=await DB.find('workUser_table', {user: sessionName});
    let userN=await DB.find('users_table', {user: sessionName});

    console.log(workN.length)
    console.log(userN.length)

    if(workN.length !==0 && ctx.url!=='/worksindex'){

        console.log('开发者');
        await ctx.redirect('/worksindex');

    }else {

        if (userN.length !==0){

            console.log('发布者')
            await ctx.redirect('/usersindex');

        }else{
            console.log('无用户')
        }

    }

    await next()
})*/

router.get('/', async (ctx)=> {
    await ctx.render('./admin/index')
})

router.use('/works', works.routes());
router.use('/worksindex', worksindex.routes());

router.use('/users', users.routes());
router.use('/usersindex', usersindex.routes());

router.use('/www', www.routes());

module.exports = router
