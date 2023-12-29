
import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);
console.log("#PostEdit.client.ts");
//
const PostEdit = {
    /**
     *
     * @param
     *
     * @return
     */  
    addItem : async function(id: number)
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
                id: id,
                categoryId: 0,
                userId: 0,
            }
//console.log("title=", titleValue);
console.log(item);
            const body = JSON.stringify(item);		
            const res = await fetch("/api/posts/update", {
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
    delete : async function(id: number)
    {
        try{
            let ret = false;
            const item = {
                api_key: "",
                //@ts-ignore
                id: Number(id),
            }
console.log(item);
//console.log("title=", titleValue);
            const body = JSON.stringify(item);	
            const res = await fetch("/api/posts/delete", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},      
                body: body
            });
            if (res.status !== 200) {
                console.error("error, status <> 200");
                throw new Error(await res.text());
            }
            const json = await res.json()
console.log(json);   
            if (json.ret !==  "OK") {
                console.error("Error, json.ret <> OK");
                return ret;
            }
            ret = true;
            return ret;
        } catch (e) {
            console.error(e);
            throw new Error('Error , delete');
        }
    },     
    /**
     *
     * @param
     *
     * @return
     */  
    initProc: async function() {
        //console.log("init");
        const id = (<HTMLInputElement>document.querySelector("#item_id")).value;
        const site_id = (<HTMLInputElement>document.querySelector("#site_id")).value;
console.log("id=", id);
//console.log("site_id=", site_id);
        //btn
        const button = document.querySelector('#save');
        button?.addEventListener('click', async () => {
            const result = await this.addItem(Number(id));
console.log("result=", result);
            if(result === true) {
                location.href= `/sites/${site_id}`;
            }
        }); 
        //btn_delete
        const btn_delete = document.querySelector('#btn_delete');
        btn_delete?.addEventListener('click', async () => {
            const result = await this.delete(Number(id));
console.log("result=", result);
            if(result === true) {
                location.href= `/sites/${site_id}`;
            }
        }); 
    },
}
PostEdit.initProc();
