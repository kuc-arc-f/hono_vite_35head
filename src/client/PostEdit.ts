
import { h, Component, render } from 'preact';
import htm from 'htm';
import { marked } from 'marked';
import HttpCommon from './lib/HttpCommon';

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
            const json = await HttpCommon.post(item, "/api/posts/update");
//console.log(json);
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
            const json = await HttpCommon.post(item, "/api/posts/delete");
//console.log(item);
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
      console.log("slide_btn.change=", slide_btn.checked);
          if(slide_btn.checked) {
            console.log("checked"); 
            const result = await this.desiplayPreview();
          }else{
            console.log("checked-NONE");
            const result = await this.displayEdit(); 
          }
        }); 
    },
}
PostEdit.initProc();
