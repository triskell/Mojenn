#! /bin/sh

# The MIT License
#
# Copyright (c) 2010-2012 Google, Inc. http://angularjs.org
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

NG_BUILD_DIR=$1
if [[ ! -e "$NG_BUILD_DIR/angular.js" ]]; then
  echo "Usage: update-angular <build-dir>"
  exit 1
fi

SCRIPT_DIR=$(dirname $0)
ROOT_DIR=$SCRIPT_DIR/../
VERSION=$(cat $NG_BUILD_DIR/version.txt)

cd $ROOT_DIR

rm -fr app/lib/angular
mkdir app/lib/angular
cp -r $NG_BUILD_DIR/* app/lib/angular
rm -fr app/lib/angular/docs
rm app/lib/angular/*.zip
mv app/lib/angular/angular-mocks.js test/lib/angular
cp app/lib/angular/version.txt test/lib/angular

# Update the inlined angular-loader in app/index-async.html
sed '/@@NG_LOADER@@/{
    s/@@NG_LOADER@@//g
    r app/lib/angular/angular-loader.min.js
}' app/index-async.html.template > app/index-async.html

git add $ROOT_DIR/app
git add $ROOT_DIR/test
git commit -m "update(angular): bump to $VERSION"
