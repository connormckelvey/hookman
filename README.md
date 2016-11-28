# Hookman ![Build Status](https://travis-ci.org/connormckelvey/hookman.svg?branch=master)

Hookman is a Command Line Tool that helps your team manage and distribute commands and 
scripts used within your Git workflow.

## Requirements

- Node 6.2.1
- A Git repository for your project

## Installation

`npm install -g hookman`

## Usage

### Setting up hookman for your project
If your project is not already configured for use with hookman:

1. Navigate to the root of your project and run `hookman init`
2. Add and commit `hooks/` directory and `hookman.json`

### Installing project hooks to Git
If your project has a `hooks/` directory and a `hookman.json` file:
1. Navigate to the root of your project and run `hookman install`

### Adding a hook scripts
In most cases hook scripts get the job done. Hooks scripts are similar 
to npm scripts. They live in the `hookman.json` file and are simple commands
that hookman will execute when git invokes a Githook.

1. Open the `hookman.json` file in the root of your project.
2. Locate the hook you would like to target (`pre-commit`, `pre-push`, etc.)
3. Write a command (just like you would in terminal) as the value for the hook

#### Example

```
  {
    ...
    "pre-commit": "npm run lint"
  }
```

### Adding hook executables
Hook executables are a big step up from hook scripts allowing your to write hooks 
for your project in any language. This allows you to harness existing code in your 
project as well as managed dependencies installed from your favorite package manager.

1. From the root of your project run `hookman create`
2. Choose the hook you would like to target from the list provided.
3. Locate the newly created file in your projects `hooks/` directory and start coding.
