import * as vscode from 'vscode';

import os = require('os');
import path = require('path');

const userHome = os.homedir();

function joinUserHome(uri: string) {
  return path.join(userHome, uri.replace(/^~/, ''));
}

function isHomeDirPath(uri: string) {
  return /^~/.test(uri);
}

function getConfig() {
  return vscode.workspace.getConfiguration('quickOpenProject');
}

function getUrl(key: number): vscode.Uri | void {
  const config = getConfig();
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
          vscode.commands
            .executeCommand('vscode.openFolder', uri, {
              forceNewWindow: true,
            })
            .then(
              () => ({}), // done
              () =>
                vscode.window.showInformationMessage(
                  `Could not open the project${i}: ${uri}`
                )
            );
      }
    );

    context.subscriptions.push(disposable);
  }

  const copyFilenameDisposable = vscode.commands.registerCommand(
    'quickOpenProject.copyfilename',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('No active editor to copy from.');
        return;
      }

      const filePath = editor.document.fileName;
      const parsed = path.parse(filePath);
      let nameToCopy = parsed.name;

      if (parsed.name.toLowerCase() === 'index') {
        nameToCopy = path.basename(parsed.dir);
      }

      if (!nameToCopy) {
        vscode.window.showInformationMessage(
          'Unable to determine a name to copy.'
        );
        return;
      }

      await vscode.env.clipboard.writeText(nameToCopy);
      vscode.window.setStatusBarMessage(`Copied: ${nameToCopy}`, 1500);
    }
  );

  context.subscriptions.push(copyFilenameDisposable);
}

export function deactivate() {}
