//
const LibPagenate = {
  per_page: 20,
  /**
  *
  * @param
  *
  * @return
  */  
  set_per_page:function(num: number){
    this.per_page = num;
  },  
  /**
  *
  * @param
  *
  * @return
  */  
  getMaxPage:function(count: number){
    let ret = count / this.per_page;
    ret = Math.ceil(ret);
    return ret;
  }, 
  /**
  * get start, limit
  * @param
  *
  * @return
  */  
  getPageStart:function(page: number, per_page: number){
//console.log("page:", page)
    const start_num = (page - 1) * per_page;
    const end = (start_num + per_page);
    const ret ={ start: start_num,  end: end,}        
    return ret;
  },
  /**
  *
  * @param
  *
  * @return
  */  
  get_per_page:function(){
    console.log("per_page:",this.per_page)
    return this.per_page;
  },
  /**
  *
  * @param
  *
  * @return
  */  
  is_paging_display(count: number){
    let ret = 0;
    const num = count / this.per_page;
    if(num >= 1){
        ret = 1
    }
    //ret = parseInt( num );
    return ret;
  },
  /**
  *
  * @param
  *
  * @return
  */  
  get_page_items(data: any){
    const paginate_disp = this.is_paging_display(data.length)
    const page_item = {
        "item_count":data.length ,"paginate_disp": paginate_disp
    }
    const param = {
          "docs": data ,
          "page_item": page_item,            
    };
    return  param;       
  },
}
export default LibPagenate;
