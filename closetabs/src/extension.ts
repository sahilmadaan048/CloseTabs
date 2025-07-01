import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration('closetabs');
	const requireConfirmation = config.get<boolean>('requireConfirmation', false);
	const showButton = config.get<boolean>('showStatusBarButton', true);

	const cmdId = 'closetabs.closeAll';
	const closeAllHandler = () => {
		if (requireConfirmation) {
			vscode.window.showWarningMessage(
				'Close all open tabs?',
				{ modal: true },
				'Yes'
			).then(selection => {
				if (selection === 'Yes') {
					vscode.commands.executeCommand('workbench.action.closeAllEditors');
				}
			});
		} else {
			vscode.commands.executeCommand('workbench.action.closeAllEditors');
		}
	};

	const disposable = vscode.commands.registerCommand(cmdId, closeAllHandler);
	context.subscriptions.push(disposable);

	if (showButton) {
		const statusBarItem = vscode.window.createStatusBarItem(
			vscode.StatusBarAlignment.Left, 100
		);
		statusBarItem.text = '$(close-all) Close All Tabs';
		statusBarItem.tooltip = 'Close all open editor tabs';
		statusBarItem.command = cmdId;
		statusBarItem.show();
		context.subscriptions.push(statusBarItem);
	}
}

export function deactivate() { }


