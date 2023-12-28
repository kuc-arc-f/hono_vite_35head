
//@ts-ignore
//console.log("#TaskShow.client=", TaskItemId);
let itemId = 0;
//
//
const TaskShow = {
    testFunc: function(n: number){
        console.log("testFunc=", n);
    },
    /**
     *
     * @param
     *
     * @return
     */  
    delete : async function()
    {
        try{
            let ret = false;
            const item = {
                api_key: "",
                //@ts-ignore
                id: Number(itemId),
            }
console.log(item);
//return;
//console.log("title=", titleValue);
            const body = JSON.stringify(item);		
            const res = await fetch("/api/test/delete", {
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
            console.error("Error, delete");
            console.error(e);
            throw new Error('Error , delete');
        }
    },         
    /**
     * startProc
     * @param
     *
     * @return
     */   
    startProc :async function ()
    {
        try{
console.log("#startProc");
            //btn
            const item_id = document.querySelector('#item_id') as HTMLInputElement;
            if(item_id) { itemId = Number(item_id.value);}
            const button = document.querySelector('#btn_delete') as HTMLElement;
            button.addEventListener('click', async () => {
//console.log("btn_delete=");
                const result = await this.delete();
console.log("result=", result);
                if(result === true) {
                    window.location.href = '/tasks';
                }
            });
//console.log("itemId=", itemId) 
        } catch (e) {
            console.error(e);
        }    
    },
}
TaskShow.startProc();
