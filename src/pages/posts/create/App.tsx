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
                    <button className="btn-outline-purple" id="btn_edit">Edit</button>
                    <button className="btn-purple ms-2" id="btn_preview">Preview</button>                
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
