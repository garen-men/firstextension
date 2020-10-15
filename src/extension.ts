// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const insertText = (val:string) => {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		vscode.window.showErrorMessage('Can\'t insert log because no document is open');
		return;
	}

	const selection = editor.selection;

	const lineOfSelectedVar = selection.active.line;

	editor.edit((editBuilder) => {
		editBuilder.insert(new vscode.Position(lineOfSelectedVar + 1, 0),val)
	});
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {  

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "firstextension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('firstExt.hello', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World 123 !');
		vscode.window.showInformationMessage('要不要去珠峰官网呢?', '是', '否').then(result => {
			if (result === '是') {
				vscode.env.openExternal(vscode.Uri.parse('http://www.zhufengpeixun.cn/'));
			}
		});
		//vscode.window.show
	});

	context.subscriptions.push(disposable);

	const insertLog = vscode.commands.registerCommand('firstExt.insertLog', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		const selection = editor.selection;
		const text = editor.document.getText(selection);
		const logToInsert = `console.log('${text}: ',${text});\n`;
		text ? insertText(logToInsert) : insertText('console.log();');
	});
	context.subscriptions.push(insertLog);

}

// this method is called when your extension is deactivated
export function deactivate() {}
