
import { h, Component, render } from 'preact';
import htm from 'htm';
import { marked } from 'marked';

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
    /**
     *
     * @param
     *
     * @return
     */ 
    desiplayPreview: function(){
        try{
            let titleValue = "";
            const title = document.querySelector("#title") as HTMLInputElement;
            if(title) { titleValue = title.value;}
            let contentValue = "";
            const content = document.querySelector("#content") as HTMLInputElement;
            if(content) { contentValue = content.value;} 
            //console.log(contentValue);
            //@ts-ignore 
            contentValue = marked.parse(contentValue);
console.log(contentValue);
            const titleElem = `<h1>${titleValue}</h1><hr />`;
            const preview_box = document.querySelector("#preview_box") as HTMLInputElement;
            if(preview_box) {
                preview_box.innerHTML = titleElem + contentValue;
            }
            //
            const edit_box_wrap = document.querySelector(`#edit_box_wrap`) as HTMLInputElement;
            if (!edit_box_wrap.classList.contains('d-none')) {
                edit_box_wrap?.classList.add('d-none');
            }
            const preview_box_wrap = document.querySelector(`#preview_box_wrap`) as HTMLInputElement;
            if (preview_box_wrap.classList.contains('d-none')) {
                preview_box_wrap?.classList.remove('d-none');
            }
        } catch (e) {
          console.error(e);
        }
    },    
    /**
     *
     * @param
     *
     * @return
     */ 
    displayEdit: function(){
        try{
            //
            const edit_box_wrap = document.querySelector(`#edit_box_wrap`) as HTMLInputElement;
            if (edit_box_wrap.classList.contains('d-none')) {
                edit_box_wrap?.classList.remove('d-none');
            }
            const preview_box_wrap = document.querySelector(`#preview_box_wrap`) as HTMLInputElement;
            if (!preview_box_wrap.classList.contains('d-none')) {
                preview_box_wrap?.classList.add('d-none');
            }
        } catch (e) {
            console.error(e);
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
console.log("id=", id);
        //btn
        const button = document.querySelector('#save');
        button?.addEventListener('click', async () => {
            const result = await this.addItem(Number(id));
console.log("result=", result);
            if(result === true) {
                location.href= `/sites/${id}`;
            }
        }); 
        //
        //btn_edit
        const btn_edit = document.querySelector('#btn_edit');
        btn_edit?.addEventListener('click', async () => {
            const result = await this.displayEdit();
        }); 
        //btn_preview
        const btn_preview = document.querySelector('#btn_preview');
        btn_preview?.addEventListener('click', async () => {
            const result = await this.desiplayPreview();
//console.log("result=", result);
        });  
        //slide_btn
        const slide_btn = document.querySelector('#slide_btn') as HTMLInputElement;
        slide_btn?.addEventListener('change', async () => {
// console.log("slide_btn.change=", slide_btn.checked);
            if(slide_btn.checked) {
            const result = await this.desiplayPreview();
            }else{
            const result = await this.displayEdit(); 
            }
        });

    },
}
PostCreate.initProc();
