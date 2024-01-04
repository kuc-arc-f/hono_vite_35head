
import { h, Component, render } from 'preact';
import htm from 'htm';
import HttpCommon from './lib/HttpCommon';
import LibPagenate from './lib/LibPagenate';

const html = htm.bind(h);
const perPage = 100;
let pageNumber = 1;
console.log("#Page4.client.ts");
//
const PostIndex = {
    /**
     *
     * @param
     *
     * @return
     */  
    addItem : async function()
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
                name: titleValue,
                content: contentValue,
            }
//console.log("title=", titleValue);
console.log(item);
            const body = JSON.stringify(item);		
            const res = await fetch("/api/sites/create", {
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
    displayItems: function(items: any[])
    {
        try{      
            const li: any[] = [];  
            items.forEach((element) => {
                li.push(html`
                <div>
                    <a href="/sites/${element.id}"><h3 class="text-3xl font-bold"
                    >${element.title}</h3></a>                    
                    <p>id: ${element.id}, ${element.createdAt}</p>
                    <a href="/posts/${element.id}">
                        <button  class="btn-outline-purple ms-2 my-2">Show</button>
                    </a>
                    <a href="/post_edit/${element.id}">
                        <button  class="btn-outline-purple ms-2 my-2">Edit</button>
                    </a>
                    <hr class="my-2" />
                </div>
                `
                );
            });
            /*
            */
            render(li, document.getElementById("root"));
    
        } catch (e) {
            console.error(e);
            throw new Error('Error , displayItems');
        }
    },         
    /**
     *
     * @param
     *
     * @return
     */  
    getList : async function(id: number): Promise<any>
    {
        try{
            let ret: any[] = [];
            const item = {
                siteId: id,
                "limit": 5,
                "offset": 0,
            }
//            const json = await HttpCommon.post(item, "/api/posts/get_list_page");
            const json = await HttpCommon.post(item, "/api/posts/get_list");
console.log(json);
/*
*/
            ret = json.data;
            return ret;
        } catch (e) {
            console.error(e);
            throw new Error('Error , getList');
        }
    }, 
    /**
     *
     * @param
     *
     * @return
     */    
    getListPage : async function(id: number): Promise<any>
    {
        try{
            let ret: any[] = [];
            const pinfo = LibPagenate.getPageStart(pageNumber, perPage);
//console.log(pinfo);
            const item = {
                siteId: id,
//                "limit": pinfo.end,
                "limit": perPage,
                "offset": pinfo.start,
            }
console.log(item);

            const json = await HttpCommon.post(item, "/api/posts/get_list_page");
console.log(json);
/*
*/
            ret = json.data;
            return ret;
        } catch (e) {
            console.error(e);
            throw new Error('Error , getListPage');
        }
    },     
    /**/
    initProc: async function() {
        //console.log("init");
        const id = (<HTMLInputElement>document.querySelector("#item_id")).value;
        console.log("id=", id);
        const page_number = (<HTMLInputElement>document.querySelector("#page_number")).value;
console.log("page_number=", page_number);
        const res = await this.getListPage(Number(id));
//console.log(res);
        this.displayItems(res);
        //btn
        const button = document.querySelector('#save');
        button?.addEventListener('click', async () => {
            const result = await this.addItem();
console.log("result=", result);
            if(result === true) {
                location.reload();
            }
        }); 
        //page_next
        const page_next = document.querySelector('#page_next');
        page_next?.addEventListener('click', async () => {
            pageNumber += 1;
            const res = await this.getListPage(Number(id));
            this.displayItems(res);
//console.log("result=");
        }); 
        //page_before
        const page_before = document.querySelector('#page_before');
        page_before?.addEventListener('click', async () => {
            if(pageNumber >= 1) {
                pageNumber = pageNumber -  1;
            }
            const res = await this.getListPage(Number(id));
            this.displayItems(res);
//console.log("result=");
        }); 

    },
}
PostIndex.initProc();
