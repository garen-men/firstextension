import * as https from 'https';
import * as Fs from 'fs';
import * as Path from 'path';
import * as Open from 'open';
import { window, workspace } from 'vscode';
export const LocalNovelsPath = '/Users/menglinlun/'
import * as cheerio from 'cheerio';
import DataProvider from './Provider';

const DOMAIN = 'https://www.biquge.com.cn';

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


export const searchOnline = async function (provider: DataProvider) {
        const msg = await window.showInputBox({
            password: false,
            ignoreFocusOut: false,
            placeHolder: '请输入小说的名字',
            prompt: ''
        });
        if (msg) {
            provider.treeNode = await search(msg);
            provider.refresh(true);
        }
};


export const search = async (keyword: string)=>{
    const result = [] as any;
    try {
        const res = await request(DOMAIN + '/search.php?q=' + encodeURI(keyword));
        console.log(res);

        const $ = cheerio.load(res);
        $('.result-list .result-item.result-game-item').each(function (i: number, elem: any) {
            const title = $(elem).find('a.result-game-item-title-link span').text();
            const author = $(elem).find('.result-game-item-info .result-game-item-info-tag:nth-child(1) span:nth-child(2)').text();
            const path = $(elem).find('a.result-game-item-pic-link').attr().href;
            console.log(title, author, path);

            result.push(
                    {
                        type: '.biquge',
                        name: `${title} - ${author}`,
                        isDirectory: true,
                        path
                    }
            );
        });
    } catch(error) {
        console.warn(error);
    }
    return result;
}

export const getChapter = async (pathStr: string)=> {
    const result = [] as any;
    try {
        const res = await request(DOMAIN + pathStr);
        const $ = cheerio.load(res);
        $('#list dd').each(function (i: number, elem: any) {
            const name = $(elem).find('a').text();
            const path = $(elem).find('a').attr().href;
            result.push(
                {
                    type: '.biquge',
                    name,
                    isDirectory: false,
                    path
                }
            );
        });
    } catch(error) {
        console.warn(error);
    }
        return result;
}

export const getContent = async(pathStr: string)=> {
    let result = '';
    try {
        const res = await request(DOMAIN + pathStr);
        const $ = cheerio.load(res);
        const html = $('#content').html();
        result = html ? html : '';
    } catch(error) {
        console.warn(error);
    }
    return result;
}