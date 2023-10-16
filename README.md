<sub><em>Tycho's</em></sub>

<h1>Quick Open Project<sup><em> for VS Code</em></sup></h1>

It helps you to easily access your projects using custom shortcuts, no matter where they are located.

## Use it

### Available Commands

- `Quick Open Project: Open Project 1`: Open project 1 in New Window
- `Quick Open Project: Open Project 2`: Open project 2 in New Window
- ...
- `Quick Open Project: Open Project 10`: Open project 10 in New Window

### Manage your projects

You can manage your projects by editing the `settings.json` file.

> To open the `settings.json` file, you can run `Preferences: Open User Settings (JSON)`.

Example:

```json
"quickOpenProject.projects": {
  "project1": "~/foo/project1",
  "project2": "~/foo/project2",
  // ...
  "project10": "~/foo/project10"
},
```

### Custom shortcuts

You can customize the shortcuts by editing the `keybindings.json` file.

> To open the `keybindings.json` file, you can run `Preferences: Open Keyboard Shortcuts (JSON)`.

Example:

```json
{
  "key": "ctrl+1",
  "command": "quickOpenProject.openProject1"
},
{
  "key": "ctrl+2",
  "command": "quickOpenProject.openProject2"
}
```

## Support

If you find it helpful, please consider giving it a star.

## License

This project is licensed under the [MIT License](/LICENCE).
