// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import os = require('os');
import path = require('path');

const userHome = os.homedir();
const config = vscode.workspace.getConfiguration('quickOpenProject');

function getUrl(key: number) {
  const uri = config.get(`projects.project${key}`, '').replace(/^~/, '');
  return uri ? vscode.Uri.file(path.join(userHome, uri)) : '';
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  for (let i = 1; i <= 10; i++) {
    const disposable = vscode.commands.registerCommand(
      `quickOpenProject.openProject${i}`,
      () => {
        const uri = getUrl(i);

        uri &&
          vscode.commands.executeCommand('vscode.openFolder', uri, {}).then(
            () => ({}), // done
            () =>
              vscode.window.showInformationMessage(
                `Could not open the project${i}!`
              )
          );
      }
    );

    context.subscriptions.push(disposable);
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
