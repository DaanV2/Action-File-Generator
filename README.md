# Action-File-Generator

- [Action-File-Generator](#action-file-generator)
  - [Inputs](#inputs)
  - [Examples](#examples)
    - [Example Filespecification](#example-filespecification)
    - [Example usage](#example-usage)

TODO Description

## Inputs

**folder**: The folder path to start at, defaults to `${{github.workspace}}`  
**specification**: The folder path to start at, defaults to `${{github.workspace}}/filespecification.json`

---

## Examples

### Example Filespecification

Example [filespecification.json](./examples/filespecification.json) you can use the provide json schema:
`https://raw.githubusercontent.com/DaanV2/Action-File-Generator/main/schema/filespecification.schema.json`

```json
{
  "$schema": "https://raw.githubusercontent.com/DaanV2/Action-File-Generator/main/schema/filespecification.schema.json",
  "process": [
    {
      "source": "./template/account",
      "destination": "./accounts",
      "replace": [
        { "old": "%id%", "new": "steve", "path": true, "content": true },
        { "old": "%first%", "new": "steve", "path": true, "content": true },
        { "old": "%surname%", "new": "sample", "path": true, "content": true }
      ]
    }
  ]
}
```

### Example usage

```yml
# This is a basic workflow to help you get started with Actions

name: generate-files

# Controls when the action will run.
on:
  # Triggers the workflow on push or pull request events but only for the master branch
  push:
    branches: [main]
  pull_request:
    branches: [main]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - uses: actions/checkout@v2.3.4

      # Runs a single command using the runners shell
      - uses: DaanV2/Action-File-Generator@v1.0.0
        with:
          folder: ${{github.workspace}}/data
          specification: ${{github.workspace}}/data/specification.json

      - name: Commit changes
        continue-on-error: true
        run: |
          cd ${{github.workspace}}
          git config --global user.email "Bot@Blockception.com"
          git config --global user.name "Blockception Bot"
          git add .
          git commit -m "auto: Generated typescript includes"
          git push
```
