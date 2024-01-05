
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
        <div className="text-center">
          <h1 className="text-4xl font-bold">Site : {props.item.name}</h1>
        </div>
        <hr className="my-2" />
        <div className="flex flex-row">
          <div className="flex-1 p-0 m-1 "><h3 className="text-3xl font-bold">Posts-index</h3>
          </div>
          <div className="flex-1 pt-2 m-1 text-center">
            <a href={`/posts/create/${props.id}`} className="btn-purple ms-2">Create</a>
          </div>
        </div>
        <hr className="my-2" />
        <input type="text" className="d-none" id="item_id" defaultValue={props.id} />
        <input type="text" className="d-none" id="page_number" defaultValue={props.page} />
        <div className="col-md-6 text-end">
            <span className="search_key_wrap">
            <input type="text" 
            className="mx-2 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" 
            name="searchKey" id="searchKey"
            placeholder="Title search" />
            </span>                
            <button className="ms-2 btn-outline-purple" id="btn_search"
            >Search</button>
        </div>

        <div id="root"></div>
        
        {/* paginate */}
        <div className="paginate_wrap py-2" id="paginate_wrap">
          <button className="btn-outline-purple" id="page_before"> ＜ </button>
          <button className="btn-outline-purple" id="page_next"> ＞ </button>
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