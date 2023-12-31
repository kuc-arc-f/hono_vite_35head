import Layout from '../../layout';
//
import React from 'react';

//
export default function Page(props: any) {
console.log("#taskShow");
console.log(props);
    return (
    <Layout title="TaskEdit">
        <div>
            <link href="/static/postshow.css" rel="stylesheet" />
            <div className="flex flex-row">
                <div className="flex-1 p-2 m-1">
                    <a href={`/sites/${props.id}`} className="btn-outline-purple ms-2 my-2">back</a>
                </div>
                <div className="flex-1 m-1 text-end">
                    <button id="save" className="btn-purple ms-2 my-2">Save</button>
                </div>
            </div>
            <hr className="my-2" />
            <div className="flex flex-row">
                <div className="flex-1 p-2 m-1">
                </div>
                <div className="flex-1 m-1 text-end">
                    {/*
                    <button className="btn-outline-purple" id="btn_edit">Edit</button>
                    <button className="btn-purple ms-2" id="btn_preview">Preview</button>    
                    */}
                    <span className="me-4 mb-0 text-xl">Preview</span><br />
                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                        <input type="checkbox" value="" className="sr-only peer" id="slide_btn" />
                        <div className="w-14 h-7 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>            
                </div>
            </div>

            {/* edit_box_wrap */}
            <div id="edit_box_wrap">
                <hr className="my-2" />
                <label>Title:</label>
                <input type="text" id="title" 
                className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                defaultValue={props.item.title} placeholder="title input"
                />
                <hr className="my-2" />
                <label>Content:</label>
                <textarea id="content" name="content"
                className="border border-gray-400 rounded-md px-3 py-2 w-full h-96 focus:outline-none focus:border-blue-500"
                placeholder="markdown input, please"
                >{props.item.content}</textarea>
            </div>
            <hr className="my-2" />
            <input type="text" className="d-none" id="item_id" defaultValue={props.id} />
            <div id="root"></div>
            <div id="preview_box_wrap">
                <div id="preview_box"></div>
            </div>
            {/* TS */}
            {import.meta.env.PROD ? (
            <>
                <script type="module" src="/static/PostCreate.js"></script>
            </>               
            ) : (
            <>
                <script type="module" src="/src/client/PostCreate.ts"></script>
            </>                
            )}
        </div>    
    </Layout>
    )
}
