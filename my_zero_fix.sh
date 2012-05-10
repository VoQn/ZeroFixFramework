#! /usr/bin/env sh
APPNAME=MyZeroFix
VERSION=0.3.0

MSG_HEAD=${APPNAME}-${VERSION}:

TARGET=my_zero_fix.user.js
HEADER=my_license.js
CORE=src/core.coffee
USER_STYLE=my_fix.coffee

cat $HEADER > $TARGET
echo "(function(){" >> $TARGET
coffee -c -p -b $CORE >> $TARGET
coffee -c -p -b $USER_STYLE >> $TARGET
echo "})();" >> $TARGET

echo "${MSG_HEAD} ${TARGET} user script file is generated"
exit 0
