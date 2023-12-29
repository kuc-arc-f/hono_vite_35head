
import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);
console.log("#PostCreate.client.ts");
//
const PostCreate = {
    /**
     *
     * @param
     *
     * @return
     */  
    addItem : async function(siteId: number)
    {
        try{
            let ret = false;
            let titleValue = "";
            const title = document.querySelector("#title") as HTMLInputElement;
            if(title) {
                titleValue = title.value;
            }
            let contentValue = "";
            const content = document.querySelector("#content") as HTMLInputElement;
            if(content) {
                contentValue = content.value;
            }              
            const item = {
                title: titleValue,
                content: contentValue,
                siteId: siteId,
                categoryId: 0,
                userId: 0,
            }
//console.log("title=", titleValue);
console.log(item);
            const body = JSON.stringify(item);		
            const res = await fetch("/api/posts/create", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},      
                body: body
            });
            const json = await res.json()
console.log(json);   
            if (res.status !== 200) {
                console.error("error, status <> 200");
                throw new Error(await res.text());
            }
            if (json.ret !==  "OK") {
                console.error("Error, json.ret <> OK");
                return ret;
            }
            ret = true;
            return ret;
        } catch (e) {
            console.error("Error, addItem");
            console.error(e);
            throw new Error('Error , addItem');
        }
    },      
    /**
     *
     * @param
     *
     * @return
     */  
    getList : async function(): Promise<any>
    {
        try{
            let ret: any[] = [];
            const item = {
            }
            const body = JSON.stringify(item);		
            const res = await fetch("/api/sites/get_list", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},      
                body: body
            });
            const json = await res.json()
console.log(json);   
            if (res.status !== 200) {
                console.error("error, status <> 200");
                throw new Error(await res.text());
            }
            ret = json.data;
            return ret;
        } catch (e) {
            console.error(e);
            throw new Error('Error , getList');
        }
    }, 
    /**/
    initProc: async function() {
        //console.log("init");
        const id = (<HTMLInputElement>document.querySelector("#item_id")).value;
console.log("id=", id);
        //btn
        const button = document.querySelector('#save');
        button?.addEventListener('click', async () => {
            const result = await this.addItem(Number(id));
console.log("result=", result);
            if(result === true) {
                //http://localhost:5173/sites/11
                location.href= `/sites/${id}`;

//                location.reload();
            }
        }); 
    },
}
PostCreate.initProc();
