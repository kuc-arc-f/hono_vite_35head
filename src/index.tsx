import { Hono } from 'hono'
import { renderToString } from 'react-dom/server';
import type { Database } from '@cloudflare/d1'
//
interface Env {
  DB: Database
}
//
const app = new Hono()

// router
import taskRouter from './routes/tasks';
import siteRouter from './routes/site';
import postRouter from './routes/post';

//
function Page(props: any) {
  return (
  <div>
    <h1 className="text-4xl font-bold">Top</h1>
    <hr className="my-2" />
  </div>
  )
}
//
app.get('/', (c) => {
  return c.html(renderToString(Page([])))
})

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
app.post('/api/posts/get', async (c) => { 
  const body = await c.req.json();
  const resulte = await postRouter.get(body, c, c.env.DB);
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
