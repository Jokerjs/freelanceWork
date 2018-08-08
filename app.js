const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const render = require('koa-art-template'),
      path = require('path'),
      session = require('koa-session');

const index = require('./routes/index'),
      Config = require('./config/config');

const app = new Koa();

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

//静态资源
app.use(require('koa-static')(path.join(__dirname + '/public')));

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//session
app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'sess_id',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: true,
};

app.use(session(CONFIG, app));

app.use(async (ctx, next) => {
    if(!ctx.session.admin_name && ctx.url!='/' && ctx.url!='/works' && ctx.url!='/users'){
        await ctx.redirect('/');
    }else{
        await next()
    }
});

// routes
app.use(index.routes(), index.allowedMethods());



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(Config.port);

console.log('Server is running at http://localhost:9091/');
//module.exports = app
