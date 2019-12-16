# Start

## 安装

最新版本可以在[ MySQL 下载 ](https://dev.mysql.com/downloads/mysql/)中下载中查看,下载完后，我们将 zip 包解压到相应的目录，这里我将解压后的文件夹放在 `C:\mysql-8.0.18-winx64` 下。

**接下来我们需要配置下 MySQL 的配置文件**

打开刚刚解压的文件夹 `C:\mysql-8.0.18-winx64` ，在该文件夹下创建 `my.ini` 配置文件，编辑 `my.ini` 配置以下基本信息：

```ini
[client]
# 设置mysql客户端默认字符集
default-character-set=utf8

[mysqld]
# 设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=C:\\mysql-8.0.18-winx64
# 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可，否则有可能报错
# datadir=C:\\web\\sqldata
# 允许最大连接数
max_connections=20
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

**接下来我们来启动下 MySQL 数据库：**

以 **管理员** 身份打开`cmd`命令行工具，切换目录：

```bash
cd C:\mysql-8.0.18-winx64\bin
```

初始化数据库：

```bash
mysqld --initialize --console
```

执行完成后，会输出`root`用户的初始默认密码，如:

```bash
...
2018-04-20T02:35:05.464644Z 5 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: APWCY5ws&
...
```

`APWCY5ws&` 就是初始密码，后续登录需要用到，你也可以在登陆后修改密码。

输入以下安装命令：(最新版本貌似已经取消这个步骤)

```bash
mysqld install
```

启动输入以下命令即可：

```bash
net start mysql
```

## 连接

当`MySQL`服务已经运行时, 我们可以通过`MySQL`自带的客户端工具登录到`MySQL`数据库中, 首先打开命令提示符, 输入以下格式的命名:

```bash
mysql -h 主机名 -u 用户名 -p
```

参数说明：

- `-h`： 指定客户端所要登录的`MySQL`主机名, 登录本机(`localhost` 或 `127.0.0.1`)该参数可以省略;
- `-u`：登录的用户名
- `-p`：告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。

如果我们要登录本机的`MySQL`数据库，只需要输入以下命令即可：

```bash
mysql -u root -p
```

按回车确认, 如果安装正确且`MySQL`正在运行, 会得到以下响应:

```bash
Enter password:
```

若密码存在, 输入密码登录, 不存在则直接按回车登录。登录成功后你将会看到`Welcome to the MySQL monitor...`的提示语。

然后命令提示符会一直以`mysq>`加一个闪烁的光标等待命令的输入, 输入`exit;`或`quit;`退出登录。
