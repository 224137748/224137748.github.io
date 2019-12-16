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
ALTER  USER  'root'@'%' IDENTIFIED  WITH  mysql_native_password  BY  'mypwd#2019';
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
