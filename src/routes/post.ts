//import { Hono } from "hono";
import type { Database } from '@cloudflare/d1'
//
interface Env {
    DB: Database
}
const retObj = {ret: "NG", data: [], message: "Error, Internal Server Error"};

const Router = {
    /**
     *
     * @param
     *
     * @return
     */ 
    get_list: async function(body, c, DB)
    {
console.log("#get_list");
        try{    
            const sql = `
            SELECT 
            Post."id"
            ,Post."createdAt"
            ,Post."title"
            ,Post."content"
            ,Post."siteId"
            ,Post."categoryId"
            ,Category."name" as CategoryName
            FROM Post 
            LEFT OUTER JOIN Category
            ON Category."id" = Post.categoryId
            WHERE Post.siteId = ${body.siteId}
            ORDER BY Post.id DESC
            LIMIT 1000
            `; 
            const result = await DB.prepare(sql).all();
//console.log(result.results);
            if(result.results.length < 1) {
                console.error("Error, results.length < 1");
                return [];
            }
            return result.results;
        } catch (e) {
            console.error(e);
            return [];
        } 
    },
    /**
     *
     * @param
     *
     * @return
     */ 
    search: async function(body, c, DB)
    {
//console.log("#search");
        try{    
            if (body) {
                //userId = ${body.userId}
                const sql = `
                SELECT * FROM Task
                WHERE title like '%${body.seachKey}%'
                ORDER BY id DESC
                LIMIT 1000
                `;  
console.log(sql);
                const result = await DB.prepare(sql).all();
                //console.log(result.results);
                if(result.results.length < 1) {
                    console.error("Error, results.length < 1");
                    return [];
                }
                return result.results;
            }
            return [];
        } catch (e) {
            console.error(e);
            return [];
        } 
    },
    /**
     *
     * @param
     *
     * @return
     */    
    //(c, c.env.DB, id)
    get: async function(c, DB, id)
    {
        //console.log("#get");
        try{    
            const sql = `SELECT * FROM Post WHERE id = ${id}`;            
console.log(sql);
            const result = await DB.prepare(sql).all();
            if(result.results.length < 1) {
                console.error("Error, results.length < 1");
                return {};
            }
            return result.results[0];
        } catch (e) {
            console.error(e);
            return {};
        } 
    },    
    /**
     * 
     * @param
     *
     * @return
     */    
    create: async function(body, DB)
    {
        try{    
console.log(body);
            if (body) {
                const sql = `
                INSERT INTO Post ( title, content, siteId, userId, categoryId)
                VALUES('${body.title}', '${body.content}', ${body.siteId}
                ,  ${body.userId}, ${body.categoryId});
                `;
                //console.log(sql);
                await DB.prepare(sql).run();
            }
            return {ret: "OK", data: body};
        } catch (e) {
            console.error(e);
            return [];
        } 
    },
    /**
     * 
     * @param
     *
     * @return
     */    
    update: async function(body, DB)
    {
        try{    
console.log(body);
            if (body) {
                const sql = `
                UPDATE Post 
                SET title = '${body.title}', content='${body.content}',
                categoryId = '${body.categoryId}'
                WHERE id = ${body.id}
                `;
console.log(sql);
                await DB.prepare(sql).run();
            }
            return {ret: "OK", data: body};
        } catch (e) {
            console.error(e);
            return [];
        } 
    },
    /**
     * 
     * @param
     *
     * @return
     */    
    delete: async function(body, DB)
    {
        try{    
console.log(body);
            if (body) {
                const sql = `
                DELETE FROM Post  WHERE id= ${body.id};
                `;
console.log(sql);
                await DB.prepare(sql).run();
            }
            return {ret: "OK", data: body};
        } catch (e) {
            console.error(e);
            return {ret: "NG", data: body};
        } 
    },

}
export default Router;