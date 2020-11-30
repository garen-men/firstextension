import * as https from 'https';
import * as vscode from 'vscode';
import * as Fs from 'fs';
import * as Path from 'path';
import * as Open from 'open';
export const LocalNovelsPath = '/Users/menglinlun/'

// 请求
const request = async (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let chunks = ''
            if (!res || res.statusCode !== 200) {
                reject(new Error('网络请求错误!'))
                return
            }
            res.on('data', (chunk) => {
                chunks += chunk.toString('utf8')
            })
            res.on('end', () => {
                resolve(chunks)
            })
        })
    })
}

export function fundApi(fundConfig: string[]): Promise<Novel[]> {
    const time = Date.now()
    const promises: Promise<string>[] = []

    // const fileDir = vscode.workspace.getConfiguration('firstextension').get('fileDir', '');
    // Open(fileDir);
    const files = Fs.readdirSync("/Users/menglinlun");

    // const files = Fs.readdirSync("/Users/menglinlun/.vscode/extensions/aooiu.z-reader-1.0.3/book");
    console.log(files);

        // files.forEach((file, inx) => {
        //     file = Path.extname(file).substr(1)
        // })
    // vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('/Users/menglinlun/射雕英雄传的副本.txt'));

    
        
    const loaclnovellist = [] as any;
    files.forEach((file: string) => {
        const extname = Path.extname(file).substr(1);
        const path = Path.join(LocalNovelsPath, file);
        console.log(path);
        if (extname === 'txt') {
            const name = Path.basename(file, '.txt');
            loaclnovellist.push({
                path,
                name,
            })
        }
    })
    return Promise.resolve(loaclnovellist)
    // vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(fileDir));
    // vscode.Uri(fileDir);
    // const treeNode: TreeNode[] = await explorerNodeManager.getAllBooks();
    // treeDataProvider.fire();
    // explorerNodeManager.treeNode = treeNode;
    // fundConfig.forEach((code) => {
    //     const url = `https://fundgz.1234567.com.cn/js/${code}.js?rt=${time}`
    //     promises.push(request(url))
    // })
    // return Promise.all(promises).then((results) => {
    //     const resultArr: Novel[] = []
    //     // results.forEach((rsp: string) => {
    //     //     const match = rsp.match(/jsonpgz\((.+)\)/)
    //     //     if (!match || !match[1]) {
    //     //         return
    //     //     }
    //     //     const str = match[1]
    //     //     const obj = JSON.parse(str)
    //     //     const info: Novel = {
    //     //         now: obj.gsz,
    //     //         name: obj.name,
    //     //         code: obj.fundcode,
    //     //         lastClose: obj.dwjz,
    //     //         changeRate: obj.gszzl,
    //     //         changeAmount: (obj.gsz - obj.dwjz).toFixed(4),
    //     //     }
    //     //     resultArr.push(info)
    //     // })
    //     return [{
    //         now: "123",
    //         name: "123",
    //         code: "123",
    //         lastClose: "123",
    //         changeRate: "123",
    //         changeAmount: "123",
    //     }]
    // })
}

/**
 * 获取某个扩展文件相对于webview需要的一种特殊路径格式
 * 形如：vscode-resource:/Users/toonces/projects/vscode-cat-coding/media/cat.gif
 * @param context 上下文
 * @param relativePath 扩展中某个文件相对于根目录的路径，如 images/test.jpg
 */

// export const getExtensionFileVscodeResource = function(context, relativePath) {
//     const diskPath = Uri.file(Path.join(context.extensionPath, relativePath));
//     return diskPath.with({ scheme: 'vscode-resource' }).toString();
// }

export function unique(arr: any[]) {
    return Array.from(new Set(arr))
}

export function getLocalBooks(): Promise <Novel[]> {

    const files = Fs.readdirSync(LocalNovelsPath);
    const loaclnovellist = [] as any;
    files.forEach((file: string) => {
        const extname = Path.extname(file).substr(1);
        if (extname === 'txt') {
            const name = Path.basename(file, '.txt');
            const path = Path.join(LocalNovelsPath, file);
            loaclnovellist.push({
                path,
                name,
            })
        }
    })
    return Promise.resolve(loaclnovellist)
}
