import { spawn } from "node:child_process";


export function installpackage(projectPath:string){
    return new Promise<void>((resolve,reject)=>{
        const npm=process.platform==="win32"?"npm.cmd":"npm";
        spawn(npm,["install"],{cwd:projectPath,stdio:"inherit"})
        .on("close",(code)=>{
            code===0?resolve():reject(new Error("npm install failed."))
        })
    })
}