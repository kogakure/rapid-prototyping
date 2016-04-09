# Simple Setup for Rapid Prototyping with PostCSS and Gulp

## Installation

```sh
npm install
```

## Development Server

To start a development server run:

```sh
gulp
```

## Editing Files

To create a new template, create a `HTML` file in `templates`. Changes on these files will automatically refresh the browser.

Stylesheets are written in PostCSS. Only change files in `postcss`. Feel free to create partials, more files, or install additional PostCSS plugins.

All three folders (`css`, `postcss` and `templates`) are served on root. The server thinks all folders are one.
