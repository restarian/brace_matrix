
---
### Brace matrix pages
* [Synopsis](https://github.com/restarian/brace_matrix/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_matrix/blob/master/docs/specification/license_information.md)
  * **Package information**
  * [Package information](https://github.com/restarian/brace_matrix/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/brace_matrix/blob/master/docs/specification/unit_test_output.md)
  * [Unit test output](https://github.com/restarian/brace_matrix/blob/master/docs/specification/unit_test_output.md)

--- 
 
**Version**: 1.0.0

**Description**: A port of the GlMatix library with reduced functionality for efficiency.

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)

**Dependencies**: [amdefine](https://npmjs.org/package/amdefine) [brace_maybe](https://npmjs.org/package/brace_maybe) [bracket_print](https://npmjs.org/package/bracket_print) [commander](https://npmjs.org/package/commander)

**Development dependencies**: [brace_document_navlink](https://npmjs.org/package/brace_document_navlink) [bracket_utils](https://npmjs.org/package/bracket_utils) [chai](https://npmjs.org/package/chai) [gl-matrix](https://npmjs.org/package/gl-matrix) [mocha](https://npmjs.org/package/mocha) [requirejs](https://npmjs.org/package/requirejs)

**Optional Dependencies**: [@restarian/batten_document_mocha](https://npmjs.org/package/@restarian/batten_document_mocha) [@restarian/batten_document_specification](https://npmjs.org/package/@restarian/batten_document_specification)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | ```mocha``` |
 | make_docs | ```brace_document --navlink -r -i docs --force-title --title "Brace matrix pages" --sort depth``` |
 | make_docs_extra | ```npm run make_docs --silent -- --batten-document-specification --batten-document-mocha``` |

**Keywords**: *matrix*, *math*, *vector*, *calculus*

**Technologies used in development**:
  * [VIM](https://www.vim.org) As an IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) For unit testing and as the base operating system
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage
