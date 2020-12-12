import { TreeItem, TreeItemCollapsibleState } from 'vscode'

export default class OnlineTreeItem extends TreeItem {

    constructor(info: Novel) {
        super(`${info.name}`)

        const tips = [
            `名称:　${info.name}`,
        ]
        this.tooltip = tips.join('\r\n');

        this.collapsibleState = info.isDirectory ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None;

        this.command = info.isDirectory ? undefined : {
            command: "openOnlineNovel",
            title: "打开该网络小说",
            arguments: [{ name: info.name, path: info.path }]
        } 
        this.contextValue = info.isDirectory ? 'online' : 'onlineChapter'
    }

    contextValue = 'online';
}