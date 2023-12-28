
import Layout from '../../layout';
import React from 'react';

//
export default function Page(props: any) {
console.log("#taskShow");
console.log(props.item);
    return (
    <Layout title="TaskShow">
        <div>
            <div>
            <a href="/tasks" className="btn-outline-purple ms-2 my-2">back</a>
            <hr className="my-4" />
            <h1 className="text-4xl font-bold">{props.item.title}</h1>
            <p>ID: {props.item.id}
            , {props.item.createdAt}
            </p>
            <hr className="my-2" />
            content:<br />
            <pre>{props.item.content}</pre>
            <hr className="my-2" />
            <input type="text" className="d-none" id="item_id" defaultValue={props.item.id} />
            <div id="root"></div>
            <button id="btn_delete" className="btn-red ms-2 my-2">Delete</button>
            {/* TS */}
            {import.meta.env.PROD ? (
                <script src="/static/TaskShow.js"></script>
            ) : (
                <script src="/src/client/TaskShow.ts"></script>
            )}
        </div>       
        </div>
    </Layout>
    )
}


/*
{html`<script src="/js/tasks/delete.js?${timeStamp}"></script>`}
*/
