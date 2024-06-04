const Koa = require('koa');

const app = new Koa();

const Router = require('@koa/router');

const router = new Router();

const cors = require('@koa/cors');
let corsOptions = {
    origin: process.env.CLIENT_HOST,
    credentials: true,
} 
app.use(cors(corsOptions))
router.get('/cal', (ctx, next) => {

    const totalViewDate = 42;

    const cal = [];

    const currentMonthFirstDate = new Date();
    
    currentMonthFirstDate.setDate(1);

    const firstDay = currentMonthFirstDate.getDay();

    const currentMonthLastDateObject = new Date();
    
    currentMonthLastDateObject.setMonth(currentMonthLastDateObject.getMonth() + 1);
    currentMonthLastDateObject.setDate(0);

    const currentMonthLastDate = currentMonthLastDateObject.getDate();

    const nextLastDate = totalViewDate - firstDay - currentMonthLastDate;
    
    const beforeMonthLastDateObject = new Date();
    
    beforeMonthLastDateObject.setDate(0);
    
    let beforeMonthLastDate = beforeMonthLastDateObject.getDate();
    
    console.log(firstDay.toString())

    // 6 * 7, 42

    for (let i = 0; i < firstDay; i++){
        
        cal.push({date : beforeMonthLastDate-firstDay+i+1});

    }

    for (let date = 1; date <= currentMonthLastDate; date++){
        cal.push({date: date})
    }

    for (let i = 1; i <= nextLastDate; i++){
        cal.push({date: i})
    }

    ctx.body = cal
})

app
    .use(router.routes())
    .use(router.allowedMethods());

app.use(async ctx => {

});

app.listen(8001);