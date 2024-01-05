import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { renderToString } from 'react-dom/server';
import type { Database } from '@cloudflare/d1'
import Common from './lib/Common';
//
interface Env {
  DB: Database
}
//
const app = new Hono()
//api-Middleware-auth
app.use("/api/*", async (c, next) => {
  const body = await c.req.json();
  console.log(body);
  const v = await Common.validApiKey(body);
console.log(v);
  if(!v){
    return c.json({ret: "NG", data: [], message: "Error, api-Middleware-auth"});
  }
  await next();
});

// router
import taskRouter from './routes/tasks';
import siteRouter from './routes/site';
import postRouter from './routes/post';
//
import Login from './pages/login/App';
// sites
import SiteIndex from './pages/sites/App';
import SiteShow from './pages/sites/show/App';
//import TaskEdit from './pages/sites/edit/App';
import PostsIndex from './pages/posts/App';
import PostsCreate from './pages/posts/create/App';
import PostsEdit from './pages/posts/edit/App';
import PostsShow from './pages/posts/show/App';

//
app.get('/', async (c) => { 
  let page = c.req.query('page');
  if(!page) { page = '1';}
console.log("page=", page);
  return c.html(renderToString(<SiteIndex items={[]} page={page} />));
});
//Login
app.get('/login', async (c) => { 
  return c.html(renderToString(<Login items={[]} page={0} />));
});
//
app.get('/sites/:id', async (c) => { 
  const {id} = c.req.param();
  const body = {id: id}; 
  let page = c.req.query('page');
  if(!page) { page = '1';}
console.log("page=", page);
  const item = await siteRouter.get(body, c, c.env.DB);
console.log(item);
  console.log("id=", id);
  return c.html(renderToString(<PostsIndex item={item} id={Number(id)} page={Number(page)} />));
});
app.get('/posts/create/:id', async (c) => { 
  const {id} = c.req.param();
console.log("id=", id);
//console.log(item);
  return c.html(renderToString(<PostsCreate item={[]} id={Number(id)} />));
});
//PostsShow
app.get('/posts/:id', async (c) => { 
  const {id} = c.req.param();
console.log("id=", id);
  const item = await postRouter.get(c, c.env.DB, id);
//console.log(item);
  return c.html(renderToString(<PostsShow item={item} id={Number(id)} />));
});

app.get('/post_edit/:id', async (c) => { 
  const {id} = c.req.param();
  //console.log("id=", id);
  const item = await postRouter.get(c, c.env.DB, id);
  //console.log(item);
  return c.html(renderToString(<PostsEdit item={item} id={Number(id)} />));
});

/******
API
******/
/* postRouter */
app.post('/api/posts/create', async (c) => { 
  const body = await c.req.json();
  const resulte = await postRouter.create(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/posts/get_list', async (c) => {
  const body = await c.req.json();
  const resulte = await postRouter.get_list(body, c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/posts/search', async (c) => {
  const body = await c.req.json();
  const resulte = await postRouter.search(body, c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/posts/get_list_page', async (c) => {
  const body = await c.req.json();
  const resulte = await postRouter.get_list_page(body, c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/posts/get', async (c) => { 
  const body = await c.req.json();
  const resulte = await postRouter.get(c, c.env.DB, body.id);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/posts/update', async (c) => { 
  const body = await c.req.json();
  const resulte = await postRouter.update(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/posts/delete', async (c) => { 
  const body = await c.req.json();
  const resulte = await postRouter.delete(body, c.env.DB);
  return c.json(resulte);
});
/*sites */
app.post('/api/sites/create', async (c) => { 
  const body = await c.req.json();
  const resulte = await siteRouter.create(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/sites/get_list', async (c) => { 
  const resulte = await siteRouter.get_list(c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/sites/get', async (c) => { 
  const body = await c.req.json();
  const resulte = await siteRouter.get(body, c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/sites/delete', async (c) => { 
  const body = await c.req.json();
  const resulte = await siteRouter.delete(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/sites/update', async (c) => { 
  const body = await c.req.json();
  const resulte = await siteRouter.update(body, c.env.DB);
  return c.json(resulte);
});

/* tasks */
app.post('/api/tasks/get_list', async (c) => { 
  const resulte = await taskRouter.get_list(c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/tasks/search', async (c) => { 
  const body = await c.req.json();
  const resulte = await taskRouter.search(body, c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/tasks/get', async (c) => { 
  const body = await c.req.json();
  const resulte = await taskRouter.get(body, c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/tasks/create', async (c) => { 
  const body = await c.req.json();
  const resulte = await taskRouter.create(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/tasks/update', async (c) => { 
  const body = await c.req.json();
  const resulte = await taskRouter.update(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/tasks/delete', async (c) => { 
  const body = await c.req.json();
  const resulte = await taskRouter.delete(body, c.env.DB);
  return c.json(resulte);
});
//
app.get('/api/test1', async (c) => {
  const result = await  c.env.DB.prepare(`SELECT * FROM Task ORDER BY id DESC`).all();
  console.log(result.results); 
  return Response.json({ret: "OK", data: result.results});
});

export default app
