# Laravel x React x Mysql 環境構築

- Homebrewのインストール

```
# Xcodeコマンドラインツールを入れる
xcode-select --install

/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew --version
```

- gitのインストール
```
brew install git
```

- php のビルドに必要なモジュールのインストール
```
brew update
brew install automake autoconf curl pcre bison re2c mhash libtool icu4c gettext jpeg openssl libxml2 mcrypt gmp libevent
brew upgrade automake autoconf curl pcre bison re2c mhash libtool icu4c gettext jpeg openssl libxml2 mcrypt gmp libevent
brew link icu4c
brew link --force openssl
brew link --force libxml2
```

## PHPバージョン管理ツール（phpbrew）のインストール

```bash
curl -L -O https://github.com/phpbrew/phpbrew/raw/master/phpbrew
chmod +x phpbrew
sudo mv phpbrew /usr/local/bin/phpbrew

# 初期化
phpbrew init
echo 'source ~/.phpbrew/bashrc' >> ~/.bashrc
source ~/.bashrc
phpbrew lookup-prefix homebrew
```

### Nodeバージョン管理ツール（nodebrew）のインストール

```bash
curl -L git.io/nodebrew | perl - setup

# 初期化
echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

## MySQL のインストール

```bash
brew install mysql
brew services restart mysql
```

database作成
```
mysql -uroot

create database <app_name>;
```

PHP 7.2.3 をインストール

```bash
phpbrew self-update
phpbrew known --update
php -d memory_limit=-1 /usr/local/bin/phpbrew install 7.2.3 +default +mysql +opcache +iconv +tokenizer +openssl=$(brew --prefix openssl) +exif

phpbrew switch php-7.2.3
CXXFLAGS="-std=c++11 -stdlib=libc++" phpbrew ext install intl
phpbrew ext install gd -- --with-jpeg-dir=/usr/local/Cellar/jpeg/8d/lib
phpbrew ext install xdebug
phpbrew ext install opcache
pecl install mcrypt channel://pecl.php.net/mcrypt-1.0.1
phpbrew ext enable mcrypt

# PHPのパッケージ管理ツール
phpbrew app get composer
```

php.ini を編集

```bash
vi ~/.phpbrew/php/php-7.2.1/etc/php.ini
```

```ini
[Date]
date.timezone = Asia/Tokyo
; ↑この行を修正
```

バージョンを確認

```
$ php -v
PHP 7.2.3 (cli) (built: Dec  5 2018 11:16:47) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.2.3, Copyright (c) 1999-2018, by Zend Technologies
    with Xdebug v2.6.1, Copyright (c) 2002-2018, by Derick Rethans
```

### node のインストール

Node 8.10.0 をインストール

```bash
nodebrew selfupdate
nodebrew ls-remote
nodebrew install-binary v8.10.0
nodebrew ls
nodebrew use v8.10.0
npm install -g npm@latest
# npmはnodejsのパッケージ管理

brew install yarn
# yarnもnodejsのパッケージ管理 yarn ≒ npm
# バージョンを固定できる
brew upgrade yarn
```

```
$ node -v
v8.10.0
```

## Laravel環境構築

```
# laravelのインストーラーをインストール
composer require global laravel/installer

# プロジェクト作成
composer create-project --prefer-dist laravel/laravel <app_name> "5.8.*"

# phpのサーバー起動
php artisan serve

http://127.0.0.1:8000
```

