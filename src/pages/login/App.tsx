import Layout from '../layout';
//
import React from 'react';

//
export default function Page(props: any) {
console.log("#taskShow");
console.log(props);
    return (
    <Layout title="TaskEdit">
        <div>
            <h1 className="text-4xl font-bold">Login</h1>
            <hr className="my-2" />
            {/* edit_box_wrap */}
            <label className="text-2xl block text-gray-700 font-bold mb-2">UserName:
            </label>
            <input type="text" className="input_text" name="email" id="email" />
            <br />
            <label className="text-2xl block text-gray-700 font-bold mb-2">Password:
            </label>
            <input type="password" className="input_text" name="password" id="password" />
            <hr />
            <button id="btn_login" className="btn my-2">Login</button>
            <input type="text" className="d-none" id="item_id" defaultValue={props.id} />
            <div id="root"></div>
            {/* TS */}
            {import.meta.env.PROD ? (
            <>
                <script type="module" src="/static/Login.js"></script>
            </>               
            ) : (
            <>
                <script type="module" src="/src/client/Login.ts"></script>
            </>                
            )}
        </div>    
    </Layout>
    )
}
