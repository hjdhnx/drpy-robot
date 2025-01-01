# 数据库管理

## 1. 命令行

> 与`pgsql`语法保持一致

```js:line-numbers
cd 开发目录
node

// 导库
const { PGlite } = await import("@electric-sql/pglite")
// 连接数据库, 数据库地址为自己实际地址
const db = new PGlite('/Users/HiramWong/Library/Application\ Support/zyfun/database')
// 查询pg数据库版本号
(await db.query("SELECT version();")).rows[0].version
// 查询数据库
(await db.query("SELECT schema_name FROM information_schema.schemata;")).rows
// 查询数据表
(await db.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'tbl_%';")).rows
// 查询数据字段类型
(await db.query("SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name = 'tbl_star';")).rows
// 修改数据字段长度
await db.query(`ALTER TABLE tbl_star ALTER COLUMN "videoImage" TYPE varchar(512);`)
// 查询数据库
(await db.query("SELECT * FROM public.tbl_setting where key = 'theme';")).rows[0]
// 修改数据
await db.query(`UPDATE tbl_setting SET value = '{"data":"light"}' where key = 'theme';`) 
// 删除数据
await db.query("DELETE FROM tbl_setting where key = 'theme';")
// 插入数据
await db.query(`INSERT INTO tbl_setting (key, value) VALUES ('theme', '{"data":"auto"}');`)
```

![pglite-1](/dev/db-pglite/pglite-cmd-1.png)
![pglite-2](/dev/db-pglite/pglite-cmd-2.png)

## 2. 可视化

### 2.1.启动服务
```js:line-numbers
cd 开发目录
node

// 导库
const { PGlite } = await import("@electric-sql/pglite");
const { createServer } = await import("pglite-server");

const start = async () => {
  // 连接数据库, 数据库地址为自己实际地址
  const db = new PGlite('/Users/HiramWong/Library/Application\ Support/zyfun/database');
  // 等待数据库连接成功
  await db.waitReady;
  // 端口
  const PORT = 5432;
  // 创建服务
  const pgServer = createServer(db);
  // 监听端口
  pgServer.listen(PORT, () => {
    console.log(`Server bound to port ${PORT}`);
  });
}

start();
```

![pglite-3](/dev/db-pglite/pglite-cmd-3.png)

### 2.2.链接服务

> 如下使用`Navicat Premium Lite`管理工具, `chat2db`无法显示数据

![pglite-navicat](/dev/db-pglite/pglite-navcat.png)
