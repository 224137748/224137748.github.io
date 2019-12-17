# 密码

## 查询用户密码

查询用户密码命令：

```bash
select  host,  user,  authentication_string  from  mysql.user ;
```

- `host`：允许用户登录的`ip` '位置'%表示可以远程；

- `user`：当前数据库的用户名；

- `authentication_string`：用户密码（后面有提到此字段）；

## 设置密码

默认 `root` 密码为空的话 ，下面使用 `navicat` 就无法连接 ，所以这里需要修改 `root` 的密码。

此乃关键一步。为此我被坑了好长时间（所以才有了这篇文章），后来尝试了很多才知道在 `mysql 5.7.9` 以后废弃了 `password` 字段和 `password()` 函数；

`authentication_string`：字段表示用户密码。

### 操作步骤

- 1.如果当前 `root` 用户 `authentication_string` 字段下有内容，可先将其设置为空，不然直接进行二步骤。

```bash
# 密码设置为空
update user set authentication_string='' where user='root';
```

- 2.使用 `ALTER` 修改 `root` 用户密码, 方法为 `ALTER user 'root'@'localhost' IDENTIFIED BY '新密码'` 。如下：

```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'mypwd#2019';
```

也可输入：

```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mypwd#2019'
```

::: tip 提示
`root@` 后面是 `user` 表的 `Host` 字段的内容，新安装默认是 `localhost` , 因为在这增加了远程访问，所以将 `localhost` 手动改成了 `%`。
:::
改完之后可执行：`flush privileges;` （ 重新加载权限表 ）

```bash
flush privileges;
```

**注意：`mysql8.0` 之后的版本，下面方法已经不适用。切记！！！**

```bash
UPDATE user SET password=PASSWORD("新密码") WHERE user='用户名';
```

## Node.js 连接 Mysql 密码问题

昨天我通过 `Node.js` 中 `mysql` 模块连接数据时，控制台一直报错，起初我以为是我代码逻辑有问题，最终定位到只要数据库连接就会报一下错误信息：

```bash
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
    at Handshake.Sequence._packetToError (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\sequences\Sequence.js:47:14)
    at Handshake.ErrorPacket (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\sequences\Handshake.js:123:18)
    at Protocol._parsePacket (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\Protocol.js:291:23)
    at Parser._parsePacket (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\Parser.js:433:10)
    at Parser.write (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\Parser.js:43:10)
    at Protocol.write (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\protocol\Protocol.js:38:16)
    at Socket.<anonymous> (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\Connection.js:91:28)
    at Socket.<anonymous> (D:\workspaceGithub\nodejs-book-samples\samples\mysql-demo\node_modules\mysql\lib\Connection.js:525:10)
    at Socket.emit (events.js:196:13)
    at addChunk (_stream_readable.js:290:12)
    --------------------

```

问题描述在这里 `Client does not support authentication protocol requested by server; consider upgrading MySQL client at Handshake.Sequence._packetToError`，说我的 `mysql` 客户端版本不支持用户身份验证，但是我安装的客户端是目前比较新的版本，按理说不会不支持呀，带着问题我向度娘寻找答案。

### 出错原因

原来，最新的 `mysql` 模块并未完全支持 `MySQL 8` 的 `caching_sha2_password` 加密方式，而 `caching_sha2_password` 在`MySQL 8` 中是默认的加密方式。因此，下面的方式命令是默认已经使用了 `caching_sha2_password` 加密方式，该账号、密码无法在 `mysql` 模块中使用。

```mysql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
Query OK, 0 rows affected (0.12 sec)
```

### 解决办法

解决方法是从新修改用户`root`的密码，并指定`mysql`模块能够支持的加密方式：

```mysql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
Query OK, 0 rows affected (0.12 sec)
```

通过上述 `sql` 语句，我们指定了使用 `mysql_native_password` 的加密方式。这种方式是在 `mysql` 模块能够支持。
