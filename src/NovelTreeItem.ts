import { TreeItem } from 'vscode'

export default class NovelTreeItem extends TreeItem {

    constructor(info: Novel) {
        super(`${info.name}`)

        const tips = [
            `名称:　${info.name}`,
        ]

        this.tooltip = tips.join('\r\n');
        this.command = {
            command: "openSelectedNovel",
            title: "打开该小说",
            arguments: [{ name: info.name, path: info.path }]
        } 
    }

    contextValue = 'local';
}