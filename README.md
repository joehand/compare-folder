# dir-equals

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

check if two directories are the same, with support for custom fs

Currently checks:

* total file count
* total size
* total directory count

**Warning**: Could have false positives if all the above are the same. 

## Install

```
npm install dir-equals
```

## Usage

```js
var compare = require('compare-folder')

compare('dir-one', 'dir-two', function (err, isSame) {
  if (err) throw err

  if (isSame) {
    console.log('Directories are the same.')
  } else {
    console.log('Directories are different.')
  }
})
```

## API

### `compare(dir1, dir2, [opts], cb)`

The `dir` variables are either paths or `{name, fs}` for custom fs.

Use custom fs:
```js
var dir1 = {fs: customFs, name: '/'}
```

## TODO: 

* Add options for more in depth checks
  * Check file names
  * Check fs.stat results
  * Check file contents

## License

[MIT](LICENSE.md)

[npm-image]: https://img.shields.io/npm/v/dir-equals.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/dir-equals
[travis-image]: https://img.shields.io/travis/joehand/dir-equals.svg?style=flat-square
[travis-url]: https://travis-ci.org/joehand/dir-equals
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
