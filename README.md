# learn-angular
Learning angular with typescript using gulp, npm and bower

## Setup
The entire project is based on this nice blog [TypeScript, AngularJS, Gulp and Bower in Visual Studio 2015](http://chsakell.com/2015/09/19/typescript-angularjs-gulp-and-bower-in-visual-studio-2015/) with minor modification so that Visual Studio is not required.

You need to setup following in order to use this project:
* node + npm
* bower
* gulp
* typescript
* typings

The above provides detail for installing each of them except typings, though you can follow the [official typings npm package page](https://www.npmjs.com/package/typings) to instructions to install it.

## Build
You need to install all the required packages locally before building the project. To do so run the following commands from your git project root folder.

1. Install bower components
`$bower install`

2. Install TypeScript definitions
`$typings install`

3. Install package dependencies
`$npm install`

Now, you can run the gulp build task to build the project. It will place the built files under .build folder under the root folder of the git project.
`$gulp build`

_ENJOY!!!_