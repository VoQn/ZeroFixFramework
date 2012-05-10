# Zero Fix Framework
ニコニコ動画の ZERO バージョンを javascript そんなに強くなくても自分好みにしたい人の為の js フレームワーク ( を目標にしてる何か )

## About
鳥居みゆっきが書いた ZeroFix に触発されて

    「これ，自分なりにカスタマイズするの大変っていうか javascript 知らん人きつそうだな…. フレームワーク作ってみるか」

と思いつきで作ったものです．
可能な限り， JavaScript をフルに記述する事なく，簡潔な表現のみで watch ページの見た目を変えられる (場合によっては構造を変えられる) ようなフレームワークを目標にしています

## 注意事項
今現在は"とりあえず動かせた"レベルのバージョンなので，あまり利便性は高くありません．CoffeeScript で現在開発を進めていますが，利用者がそのコンパイル環境を必要としないようにします

## How to Use

### とりあえず UserScript を使いたい
GreaseMonkey, または UserScript が使えるブラウザである必要があります
examples の中にある `.user.js` で終わるファイルをブラウザで開き，インストールしてください

### UserScript を自作する
自作の ZERO watch 用のスクリプトを作成するには my_fix.coffee ファイルを編集します
_なお，現在はCoffeeScriptで記述されているので，CoffeeScriptをコンパイルできる環境が必要です_

1. `zero_fix.set_conf()` にスタイルシートと，ページの構成を上書きするコールバックを記述します.

2. `my_license.js` に ユーザースクリプトの為の ライセンス情報を記述してください

3. `create_script_by_coffee.sh` を実行すると，`my_zero_fix.user.js` が生成されます
4. `my_zero_fix.user.js` をブラウザにインストールさせることで，自作の ZERO watch ページのスタイリングが可能になります

## 開発状況など
github のリポジトリページのチケットを参照してください
