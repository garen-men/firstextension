import { ExtensionContext, commands, window, workspace, Uri, ViewColumn } from 'vscode'
import Provider from './Provider'
import fundHandle from './Handle'


// 激活插件
export function activate(context: ExtensionContext) {


	// 数据类
	const provider = new Provider()

	// 数据注册
	window.registerTreeDataProvider('novel-list', provider)

	// 定时任务
	setInterval(() => {
		provider.refresh()
	}, 1 * 1000* 60 * 60 * 24)

	// menu 事件
	context.subscriptions.push(
		// commands.registerCommand(`novel.add`, () => {
		// 	provider.addFund()
		// }),
		commands.registerCommand(`novel.refresh`, () => {
			provider.refresh()
		}),
		commands.registerCommand('novel.item.remove', (fund) => {
			const { code } = fund
			fundHandle.removeConfig(code)
			provider.refresh()
		}),
		// commands.registerCommand('openSelectedNovel', (args) => {
		// 	console.log(args);
		// 	commands.executeCommand('vscode.open', Uri.parse(args.path));
		// }),
		commands.registerCommand(
			'openSelectedNovel',
			function (uri) {
				// 创建webview
				const panel = window.createWebviewPanel(
					'testWebview', // viewType
					"WebView演示", // 视图标题
					ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
					}
				);
				panel.webview.html = `<html><body>你好，我是Webview</body></html>`
			}
		)
	)

}

export function deactivate() { }
