# klippel-scriptbox-fork README

This extension is a fork of the Scriptbox Extension (https://marketplace.visualstudio.com/items?itemName=cubicle6.scriptbox).

It is the foundation for the text edit to streamline the writing process of Manuals.

## Features
It has the same features as Scriptbox. The difference is that our fork dosent take the whole text if nothing is selected. It instead takes an empty string and pastes the example at the cursor position.

## Changes in Scriptbox-8.3.0:
At `scriptbox-*/out/utils/getCurrentTextSelection.js` changed from:

    if (selection.isEmpty) {
        return editor.document.getText();
    }
to:

    if (selection.isEmpty) {
        return "";
    }
At `scriptbox-*/out/utils/updateCurrentTextSelection.js`changed from:

    if (selection.isEmpty) {
        editor.edit((builder) => {
            const currentText = editor.document.getText();
            const definiteLastCharacter = currentText.length;
            const range = new vscode.Range(0, 0, editor.document.lineCount, definiteLastCharacter);
            builder.replace(range, update);
        });
    }
to:

    if (selection.isEmpty) {
        editor.edit((builder) => {
            const position = selection.active;
            const range = new vscode.Range(position, position);
            builder.replace(range, text);
        });
    }
## Requirements
For our local use we need in Addition:
* JS-Files with the text edit prompts
* Activitus Bar
* multi-command
* command-runner
