# Brace Matrix
### Package Specifications

----

### Brace Matrix help pages
* [Synopsis](https://github.com/restarian/brace_matrix/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_matrix/blob/master/docs/specification/license_information.md)
  * **Package information**
  * [Unit test output](https://github.com/restarian/brace_matrix/blob/master/docs/specification/unit_test_output.md)
----

**Version**: 1.0.3

**Description**: A port of the GlMatix library with reduced functionality and an easy to use design

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)

**Development dependencies**: [brace_maybe](https://npmjs.org/package/brace_maybe) [brace_umd](https://npmjs.org/package/brace_umd) [bracket_utils](https://npmjs.org/package/bracket_utils) [chai](https://npmjs.org/package/chai) [gl-matrix](https://npmjs.org/package/gl-matrix) [mocha](https://npmjs.org/package/mocha) [requirejs](https://npmjs.org/package/requirejs)

**Optional Dependencies**: [brace_document](https://npmjs.org/package/brace_document) [brace_document_link](https://npmjs.org/package/brace_document_link) [brace_document_mocha](https://npmjs.org/package/brace_document_mocha) [brace_document_navlink](https://npmjs.org/package/brace_document_navlink) [brace_document_specification](https://npmjs.org/package/brace_document_specification)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | ```mocha``` |
 | build_config | ```node ./node_modules/brace_umd/bin/build_umd.js --config-file uglify_option.json``` |
 | build_umd | ```r_js -o ./rjs_build_first.js && r_js -o ./rjs_build_second.js suffix="_umd"``` |
 | build_amd | ```r_js -o ./rjs_build_first.js && r_js -o ./rjs_build_second.js``` |
 | build | ```npm run build_config && npm run build_umd && npm run build_amd``` |
 | make_docs | ```brace_document --navlink --link --link-dest ../Readme.md --link-path ../docs/synopsis.md -r -i docs --force-title --title "Brace Matrix help pages" --sort depth --specification --mocha``` |

**Keywords**: *matrix*, *math*, *vector*, *calculus*

**Technologies used in development**:
  * [VIM](https://www.vim.org) As an IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) For unit testing and as the base operating system
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage