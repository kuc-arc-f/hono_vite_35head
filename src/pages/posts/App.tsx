
import Layout from '../layout';
import React from 'react';
let itemId = 100;
let nextPage = 1;
let beforePage = 1;
//
export default function Page(props: any) {
//console.log(props.item);
  if(props.page){
    nextPage = Number(props.page) + 1;
    beforePage = Number(props.page) - 1;
    if(beforePage <= 1) { beforePage = 1;}
  }
//
  return (
  <Layout>
    <div>
        <h1 className="text-4xl font-bold">Site : {props.item.name}</h1>
        <hr className="my-2" />
        <h3 className="text-3xl font-bold">Posts-index</h3>
        <hr className="my-2" />
        <div className="py-1">
            <a href={`/posts/create/${props.id}`} className="btn-purple ms-2">Create</a>
        </div>
        <hr className="my-2" />
        <input type="text" className="d-none" id="item_id" defaultValue={props.id} />
        <input type="text" className="d-none" id="page_number" defaultValue={props.page} />
        <div id="root"></div>
        
        {/* paginate */}
        <div className="paginate_wrap py-2">
          <a href={`/tasks?page=${beforePage}`}><button className="btn-outline-purple"> ＜ </button>
          </a>
          <a href={`/tasks?page=${nextPage}`}><button className="btn-outline-purple"> ＞ </button>
          </a>
        </div>
        <hr className="my-8" />
        {/* JS */}
        {import.meta.env.PROD ? (
            <script type="module" src="/static/PostIndex.js"></script>
        ) : (
            <script type="module" src="/src/client/PostIndex.ts"></script>
        )}        
    </div>
  </Layout>
  )
}

/*
> ＞ <
>Before<
*/