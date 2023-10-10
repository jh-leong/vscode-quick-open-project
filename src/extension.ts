import * as vscode from 'vscode';

import os = require('os');
import path = require('path');

const userHome = os.homedir();
const config = vscode.workspace.getConfiguration('quickOpenProject');

function joinUserHome(uri: string) {
  return path.join(userHome, uri.replace(/^~/, ''));
}

function isHomeDirPath(uri: string) {
  return /^~/.test(uri);
}

function getUrl(key: number): vscode.Uri | void {
  const uri = config.get<string>(`projects.project${key}`, '');

  return uri
    ? vscode.Uri.file(isHomeDirPath(uri) ? joinUserHome(uri) : uri)
    : undefined;
}

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

export function deactivate() {}
