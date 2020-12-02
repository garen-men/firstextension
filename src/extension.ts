import { ExtensionContext, commands, window, workspace, Uri, ViewColumn } from 'vscode'
import Provider from './Provider'
import * as Fs from 'fs';
import { getContent, searchOnline } from './utils';


// 激活插件
export function activate(context: ExtensionContext) {


	// 数据类
	const provider = new Provider()

	// 数据注册
	window.registerTreeDataProvider('novel-list', provider)

	// 定时任务
	setInterval(() => {
		provider.refresh(true)
	}, 1 * 1000* 60 * 60 * 24)

	// menu 事件
	context.subscriptions.push(
		// commands.registerCommand(`novel.add`, () => {
		// 	provider.addFund()
		// }),
		commands.registerCommand(`novel.refresh`, () => {
			provider.refresh(true)
		}),
		// commands.registerCommand('novel.item.remove', (fund) => {
		// 	const { code } = fund
		// 	fundHandle.removeConfig(code)
		// 	provider.refresh()
		// }),

		commands.registerCommand('searchOnlineNovel', () => searchOnline(provider)),
		commands.registerCommand(
			'openSelectedNovel',
			function (args) {

				let result = Fs.readFileSync(args.path, 'utf-8')

				// 创建webview
				const panel = window.createWebviewPanel(
					'novelReadWebview', // 标识该Webview的type
					args.name, // 视图标题
					ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
					}
				);
				panel.webview.html = `<html>
					<body>
					<div>
						<pre style="flex: 1 1 auto;white-space: pre-wrap;word-wrap: break-word;">
							${result}
						<pre>
						</div>
					</body>

				</html>`
			}
		),
		commands.registerCommand(
			'openOnlineNovel',
			async function (args) {

				// 创建webview
				const panel = window.createWebviewPanel(
					'novelReadWebview', // 标识该Webview的type
					args.name, // 视图标题
					ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
					}
				);
				panel.webview.html =  await getContent(args.path);

			}
		)
	)

}

export function deactivate() { }
