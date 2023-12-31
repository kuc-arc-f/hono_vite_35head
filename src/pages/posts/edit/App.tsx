import Layout from '../../layout';
//
import React from 'react';

//
export default function Page(props: any) {
console.log("#taskShow");
console.log(props.item);
    return (
    <Layout title="TaskEdit">
        <link href="/static/postshow.css" rel="stylesheet" />
        <div>
            
            <div className="flex flex-row">
                <div className="flex-1 p-2 m-1">
                    <a href={`/sites/${props.item.siteId}`} className="btn-outline-purple ms-2 my-2"
                    >back</a>
                </div>
                <div className="flex-1 m-1 text-end">
                    <button id="save" className="btn-purple ms-2 my-2">Save</button>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="flex-1 p-0 m-1">
                    <p>ID: {props.item.id}
                    , {props.item.createdAt}
                    </p>
                </div>
                <div className="flex-1 m-1 pb-0 text-end">
                    {/*
                    <button className="btn-outline-purple" id="btn_edit">Edit</button>
                    <button className="btn-purple ms-2" id="btn_preview">Preview</button>                    
                    */}
                    {/* slide */}
                    <span className="me-4 mb-0 text-xl">Preview</span><br />
                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                        <input type="checkbox" value="" className="sr-only peer" id="slide_btn" />
                        <div className="w-14 h-7 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>
                </div>
            </div>


            <hr className="my-2" />
            <div id="edit_box_wrap">
            {/* edit_box_wrap */}
                <label>Title:</label>
                <input type="text" id="title" 
                className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                defaultValue={props.item.title}
                />
                <hr className="my-2" />
                {/* <label>Content:</label> */}                
                <textarea id="content" name="content"
                className="border border-gray-400 rounded-md px-3 py-2 w-full h-96 focus:outline-none focus:border-blue-500"
                placeholder="" defaultValue={props.item.content}
                ></textarea>
            </div>
            <div id="preview_box_wrap">
                <div id="preview_box"></div>
            </div>
            <hr className="my-4" />
            <input type="text" className="d-none" id="item_id" defaultValue={props.item.id} />
            <input type="text" className="d-none" id="site_id" defaultValue={props.item.siteId} />
            {/* root */}
            <div id="root"></div>
            <button id="btn_delete" className="btn-red ms-2 my-2">Delete</button>
            <hr className="mt-4 mb-12" />
            {/* TS */}
            {import.meta.env.PROD ? (
            <>
                <script type="module" src="/static/PostEdit.js"></script>
            </>               
            ) : (
            <>
                <script type="module" src="/src/client/PostEdit.ts"></script>
            </>                
            )}
        </div> 
    </Layout>
    )
}
