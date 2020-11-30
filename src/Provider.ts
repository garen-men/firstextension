import { window, Event, EventEmitter, TreeDataProvider } from 'vscode'
import { fundApi, getLocalBooks } from './utils'
import fundHandle from './Handle'
// eslint-disable-next-line no-unused-vars
import NovelTreeItem from './NovelTreeItem'

export default class DataProvider implements TreeDataProvider<Novel> {
    public refreshEvent: EventEmitter<Novel | null> = new EventEmitter<Novel | null>()

    readonly onDidChangeTreeData: Event<Novel | null> = this.refreshEvent.event

    private order: number

    constructor() {
        this.order = -1
    }

    refresh() {
        setTimeout(() => {
            this.refreshEvent.fire(null)
        }, 200)
    }

    getTreeItem(info: Novel): NovelTreeItem {
        return new NovelTreeItem(info)
    }

    getChildren(): Promise<Novel[]> {
        return getLocalBooks()
    }

    changeOrder(): void {
        this.order *= -1
        this.refresh()
    }

    // async addFund() {
    //     const res = await window.showInputBox({
    //         value: '',
    //         valueSelection: [5, -1],
    //         prompt: '添加基金到自选',
    //         placeHolder: 'Add Fund To Favorite',
    //         validateInput: (inputCode: string) => {
    //             const codeArray = inputCode.split(/[\W]/)
    //             const hasError = codeArray.some((code) => {
    //                 return code !== '' && !/^\d+$/.test(code)
    //             })
    //             return hasError ? '基金代码输入有误' : null
    //         },
    //     })
    //     if (res !== undefined) {
    //         const codeArray = res.split(/[\W]/) || []
    //         const newFunds: string[] = [...codeArray]
    //         const result = await fundApi(newFunds)
    //         if (result && result.length > 0) {
    //             // 只更新能正常请求的代码
    //             const codes = result.map((i) => i.code)
    //             fundHandle.updateConfig(codes)
    //             this.refresh()
    //         } else {
    //             window.showWarningMessage('stocks not found')
    //         }
    //     }
    // }
}
