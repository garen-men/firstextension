import * as https from 'https'

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

export function fundApi(fundConfig: string[]): Promise<FundInfo[]> {
    const time = Date.now()
    const promises: Promise<string>[] = []

    // fundConfig.forEach((code) => {
    //     const url = `https://fundgz.1234567.com.cn/js/${code}.js?rt=${time}`
    //     promises.push(request(url))
    // })
    return Promise.all(promises).then((results) => {
        const resultArr: FundInfo[] = []
        // results.forEach((rsp: string) => {
        //     const match = rsp.match(/jsonpgz\((.+)\)/)
        //     if (!match || !match[1]) {
        //         return
        //     }
        //     const str = match[1]
        //     const obj = JSON.parse(str)
        //     const info: FundInfo = {
        //         now: obj.gsz,
        //         name: obj.name,
        //         code: obj.fundcode,
        //         lastClose: obj.dwjz,
        //         changeRate: obj.gszzl,
        //         changeAmount: (obj.gsz - obj.dwjz).toFixed(4),
        //     }
        //     resultArr.push(info)
        // })
        return [{
            now: "123",
            name: "123",
            code: "123",
            lastClose: "123",
            changeRate: "123",
            changeAmount: "123",
        }]
    })
}



export function unique(arr: any[]) {
    return Array.from(new Set(arr))
}