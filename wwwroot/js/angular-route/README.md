# packaged angular-route

**This package contains the legacy AngularJS (version 1.x). AngularJS support has officially ended
as of January 2022.
[See what ending support means](https://docs.angularjs.org/misc/version-support-status) and
[read the end of life announcement](https://goo.gle/angularjs-end-of-life).**

**[See `@angular/core` for the actively supported Angular](https://npmjs.com/@angular/core).**

## Install

You can install this package either with `npm` or with `bower`.

### npm

```shell
npm install angular-route
```

Then add `ngRoute` as a dependency for your app:

```javascript
angular.module('myApp', [require('angular-route')]);
```

### bower

```shell
bower install angular-route
```

Add a `<script>` to your `index.html`:

```html
<script src="/bower_components/angular-route/angular-route.js"></script>
```

Then add `ngRoute` as a dependency for your app:

```javascript
angular.module('myApp', ['ngRoute']);
```

## Documentation

Documentation is available on the
[AngularJS docs site](http://docs.angularjs.org/api/ngRoute).

## License

The MIT License

Copyright (c) 2022 Google LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
