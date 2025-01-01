# drpyS搭建

这是一个nodejs作为服务端的drpy实现。全面升级异步写法的项目。

> 大部分node项目均可参考如下做法

::: info 项目信息
1. 项目地址: [drpy-node](https://github.com/hjdhnx/drpy-node)
2. node: v18 以上
3. 运行稍候报错puppeteer, 不影响使用
:::

::: warning 须知
- [x] 有偿提供搭建问题解答(教程不易, 期待你的打赏)
- [x] 不看文档直接请勿咨询
- [x] 该页面旨在提供搭建服务, 项目与数据均与此无关
- [x] 一键脚本为个人小水管机器，服务器流量有限，请勿频繁拉取，不然随时拉闸!!!
:::

## 1. 服务器

### 1.1. 服务器推荐

如果你还没有服务器，欢迎通过以下优惠链接选购。

1. 阿里云：[云服务器0元试用, 首购低至0.9元/月起](https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=hlco4dmi), 更多优惠请点击[此链接](https://www.aliyun.com/minisite/goods?userCode=hlco4dmi);
2. 腾讯云：[2核2G3M云服务器7.92元/月起](https://curl.qcloud.com/jogYnC7h), 2000元代金券免费领, 更多优惠请点击[此链接](https://curl.qcloud.com/1JcRxEfV);
3. 京东云：[2核2G3M云服务器首年仅49元](https://3.cn/20Z-Xyf4);
4. 百度云：[2核2G1M云服务器首年仅59元](https://cloud.baidu.com/campaign/ambassador-product/index.html?ambassadorId=2e198a5e0dac4c5aa9fe44457e2e9cb4#knowledge-bcc);
5. 润雨云: [1核1G50M美国免备案服务器仅16元一月](https://www.rainyun.com/NTU1NDA5_), 更有签到奖励减免购买格

### 1.2. 宝塔面板操作
> 最新版本宝塔面板安装node环境不需要额外安装pm2

#### 1.2.1. 克隆项目
```bash
[1] 安装git
[1.1]ubuntu
    apt-get install git
[1.2]centos
    yum install git
[1.3]其他操作系统
    自行百度
[2] 克隆项目(记住项目目录, 可用pwd查看)
    git clone https://github.com/hjdhnx/drpy-node.git
```

![bt-node-clone](/otherShare/drpy-node/drpyS-bt-clone.png)

#### 1.2.2. 创建node运行环境

> 普通方式和pm2方式创建二选一

![bt-node-install](/otherShare/drpy-node/drpyS-bt-node-install.png)
![bt-node-env](/otherShare/drpy-node/drpyS-bt-node-env.png)

#### 1.2.3. 更新项目

1. 手动更新

```bash
[1]进入项目目录([可选]自己确认目录, 如果已经在目录下可忽略)
    cd drpy-node
[2]更新代码(网络不佳自己使用代理, 优先使用普通拉取提示文件冲突再使用强制拉取)
[2.1]普通拉取
    git pull
[2.2]强制拉取
    git fetch --all && git reset --hard origin/main
[3]重启服务
    网站->Node项目->状态->重启
```

2. 定时更新

![bt-cron-create](/otherShare/drpy-node/drpyS-bt-cron-create.png)

```bash
# 注意: 使用 git 强制更新(如果自定义过一些参数或文件将被覆盖)

# pm2管理方式
# 注意: 自己确认项目目录 以及 node版本路径
PATH=/www/server/nodejs/v18.20.5/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin # 注意此行对应node版本路径
export PATH
export PM2_HOME=/root/.pm2/
export HOME=/root
export NODE_PATH="/www/server/nodejs/v18.20.5/etc/node_modules" # 注意此行对应node版本路径
cd /home/www/drpy-node/ # 注意此行对应项目路径
git fetch --all && git reset --hard origin/main
npm install
npm install -g pm2
pm2 delete drpyS
pm2 start /www/server/nodejs/vhost/pm2_configs/drpyS/ecosystem.config.cjs

# node普通管理方式
# 注意: 自己确认项目目录 以及 node版本路径 以及 运行用户
PATH=/www/server/nodejs/v18.20.5/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin # 注意此行对应node版本路径
export PATH
export HOME=/www  # 注意此行对应用户名
export NODE_PATH="/www/server/nodejs/v18.20.5/etc/node_modules" # 注意此行对应node版本路径
cd /home/www/drpy-node # 注意此行对应项目路径
git fetch --all && git reset --hard origin/main
npm install
pgrep -f "node index.js" | grep -v $$ | xargs -r kill -9
nohup node index.js > /www/wwwlogs/nodejs/drpy_node.log 2>&1 &
```

![bt-cron-log](/otherShare/drpy-node/drpyS-bt-cron-log.png)

### 1.3. 1Panel面板操作

#### 1.3.1. 克隆项目
```bash
[1] 安装git
[1.1]ubuntu
    apt-get install git
[1.2]centos
    yum install git
[1.3]其他操作系统
    自行百度
[2] 克隆项目(记住项目目录, 可用pwd查看)
    git clone https://github.com/hjdhnx/drpy-node.git
```

![1panel-node-clone](/otherShare/drpy-node/drpyS-1panel-clone.png)

#### 1.3.2. 创建node运行环境
![1panel-node-env](/otherShare/drpy-node/drpyS-1panel-env.png)

#### 1.3.3. 代理域名(可忽略)
![1panel-node-web](/otherShare/drpy-node/drpyS-1panel-web.png)

#### 1.4.4. 更新项目

1. 手动更新

```bash
[1]进入项目目录([可选]自己确认目录, 如果已经在目录下可忽略)
    cd drpy-node
[2]更新代码(网络不佳自己使用代理, 优先使用普通拉取提示文件冲突再使用强制拉取)
[2.1]普通拉取
    git pull
[2.2]强制拉取
    git fetch --all && git reset --hard origin/main
[3]更新依赖(自己确认容器名)
    docker exec -it drpyS npm install
[3]重启服务(自己确认编排文件路径和编排版本docker-compose[可能是docker compose])
    docker-compose -f /opt/1panel/runtime/node/drpyS/docker-compose.yml restart
```

2. 定时更新

![1panel-cron-create](/otherShare/drpy-node/drpyS-1panel-cron-create.png)

> 定时任务命令参考如下

```bash
# 注意: 使用 git 强制更新(如果自定义过一些参数或文件将被覆盖)

# 注意: 自己确认项目目录 以及 node容器名
cd /data/drpyS/drpy-node # 注意此行对应项目路径
git fetch --all && git reset --hard origin/main
docker exec -it drpyS npm install > /dev/null 2>&1 # 注意此行对应容器名
docker-compose -f /opt/1panel/runtime/node/drpyS/docker-compose.yml restart # 注意此行对应编排文件路径 和 编排版本docker-compose[可能是docker compose])
```

> 执行日志如下

![1panel-cron-log](/otherShare/drpy-node/drpyS-1panel-cron-log.png)

### 1.4. docker操作

#### 1.4.1. 安装docker

该部分自行百度

#### 1.4.2. 拉取docker镜像

> 拉取慢自己设置代理

```bash
docker pull eulac/my-drpys:latest
```

#### 1.4.3. 克隆项目
```bash
[1] 安装git
[1.1]ubuntu
    apt-get install git
[1.2]centos
    yum install git
[1.3]其他操作系统
    自行百度
[2] 克隆项目(记住项目目录, 可用pwd查看)
    git clone https://github.com/hjdhnx/drpy-node.git
```

#### 1.4.4. 启动项目

```bash
自己确认映射路径 -v 本地目录:容器目录[固定为/root/drpy-node]
docker run -d --name drpyS -p 5757:5757 -v /drpy-node:/root/drpy-node eulac/my-drpys:latest
```

#### 1.4.5. 更新项目

1. 手动更新

```bash
[1]进入项目目录([可选]自己确认目录, 如果已经在目录下可忽略)
    cd drpy-node
[2]更新代码(网络不佳自己使用代理, 优先使用普通拉取提示文件冲突再使用强制拉取)
[2.1]普通拉取
    git pull
[2.2]强制拉取
    git fetch --all && git reset --hard origin/main
[3]更新依赖(根据自己需要选择更新依赖方式)
[3.1]通过普通更新([推荐]自己确认容器名)
    docker exec -it drpyS npm install
[3.2]通过镜像更新
    docker pull eulac/my-drpys:latest
[4]重启服务(自己确认容器名)
    docker rm -f drpyS; docker restart drpyS
```

### 1.5. 命令行操作

> Ubuntu为例

#### 1.5.1. 更新系统依赖并安装必要依赖

```bash
[1]更新系统软件包
    apt-get update
[2]安装git
    apt-get install -y git
[3]回退git请求为http1.1
	git config --global http.version HTTP/1.1
[4]安装nvm(网络不佳自己使用代理)
[4.1]安装模块
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
[4.2]重新加载配置文件
	source ~/.bashrc
[5]用nvm安装nodejs18版本
	nvm install 18
[6]设置nvm使用nodejs18版本
	nvm use 18
[7]设置nvm默认nodejs18版本([可选]如不设置默认则每次都需要使用nvm use 版本号, 参考上一步)
	nvm alias default 18
```
![ubuntu-cmd-env](/otherShare/drpy-node/drpyS-ubuntu-cmd-env.png)

#### 1.5.2. 克隆项目并安装项目依赖

```bash
[1]克隆drpy-node项目
    git clone https://github.com/hjdhnx/drpy-node.git
[2]进入drpy-node目录(自己确认目录)
    cd drpy-node
[3]设置npm为淘宝镜像源([可选]网络快的可忽略)
    npm config set registry https://registry.npmmirror.com
[4]安装所需依赖
    npm install
[5]安装pm2依赖([可选]如果需要用pm2管理项目)
    npm install pm2@latest -g
```

![ubuntu-cmd-project](/otherShare/drpy-node/drpyS-ubuntu-cmd-project.png)

#### 1.5.3. 启动项目

```bash
[1]进入drpy-node目录([可选]自己确认目录, 如果已经在目录下可忽略)
    cd drpy-node
[2]启动项目(根据自己需要选择启动方式)
[2.1]普通
    - 启动: 
        - 前台启动: node index.js
        - 后台启动: nohup node index.js &
    - 停止: 
        - 前台启动方式对应停止: ctrl+c 或 断开 ssh
        - 后台启动方式对应停止: pkill -9 -f "node index.js"
[2.2]pm2管理
    - 启动: pm2 start index.js --name drpyS
    - 任务操作:
        - 任务列表: pm2 list
        - 查看日志: pm2 logs drpyS
        - 任务详情: pm2 show drpyS
        - 停止任务: pm2 stop drpyS
        - 启动任务: pm2 start drpyS
        - 重启任务: pm2 restart drpyS
        - 删除任务: pm2 delete drpyS(该步骤操作后需要重新启动则需要使用第一部操作启动)
```
> node普通管理方式

![ubuntu-cmd-node](/otherShare/drpy-node/drpyS-ubuntu-cmd-node.png)

> pm2管理方式

![ubuntu-cmd-pm2-1](/otherShare/drpy-node/drpyS-ubuntu-cmd-pm2-1.png)
![ubuntu-cmd-pm2-2](/otherShare/drpy-node/drpyS-ubuntu-cmd-pm2-2.png)

#### 1.5.4. 更新项目

1. 手动更新

```bash
[1]进入项目目录([可选]自己确认目录, 如果已经在目录下可忽略)
    cd drpy-node
[2]更新代码(网络不佳自己使用代理, 优先使用普通拉取提示文件冲突再使用强制拉取)
[2.1]普通拉取
    git pull
[2.2]强制拉取
    git fetch --all && git reset --hard origin/main
[3]加载 node 版本为 18([可选]如果已经设置默认为18可忽略)
    nvm use 18
[4]更新依赖
    npm install
[5]重启服务(根据自己需要选择重启方式)
[5.1]node普通管理方式
    pkill -9 -f "node index.js"; nohup node index.js &
[5.2]pm2管理方式
    npm install pm2@latest -g
    pm2 delete drpyS; pm2 start index.js --name drpyS
```

> node普通管理方式

![ubuntu-cmd-update-node](/otherShare/drpy-node/drpyS-ubuntu-cmd-update-node.png)

> pm2管理方式

![ubuntu-cmd-update-pm2](/otherShare/drpy-node/drpyS-ubuntu-cmd-update-pm2.png)

2. 定时更新

配置前自行确认环境是否有`crontab`工具

> node普通管理方式

![ubuntu-cmd-cron-node-create](/otherShare/drpy-node/drpyS-ubuntu-cmd-cron-node-create.png)

> pm2管理方式

![ubuntu-cmd-cron-pm2-create](/otherShare/drpy-node/drpyS-ubuntu-cmd-cron-pm2-create.png)

> 参考任务命令

```bash
# 注意: 使用 git 强制更新(如果自定义过一些参数或文件将被覆盖)

# pm2管理方式
# 注意: 自己确认项目目录 以及 nvm环境变量 以及 node版本
# 复制如下两行内容执行
cron_command="23 5 * * * /bin/bash -l -c 'export NVM_DIR=\"$HOME/.nvm\" && source \"$NVM_DIR/nvm.sh\" && cd /home/hiram/Downloads/drpys/drpy-node && git fetch --all && git reset --hard origin/main && nvm use 18 && npm install; npm install pm2@latest -g && pm2 delete drpyS; pm2 start index.js --name drpyS'"
(crontab -l 2>/dev/null; echo "$cron_command") | crontab -

# node普通管理方式
# 注意: 自己确认项目目录 以及 nvm环境变量 以及 node版本
# 复制如下两行内容执行
cron_command="23 5 * * * /bin/bash -l -c 'export NVM_DIR=\"$HOME/.nvm\" && source \"$NVM_DIR/nvm.sh\" && cd /home/hiram/Downloads/drpys/drpy-node && git fetch --all && git reset --hard origin/main && nvm use 18 && npm install; pgrep -f \"node index.js\" | grep -v \$\$ | xargs -r kill -9; nohup node index.js > /home/hiram/Downloads/drpys/drpy-node/output.log 2>&1 &'"
(crontab -l 2>/dev/null; echo "$cron_command") | crontab -
```

> 执行日志如下

> node普通管理方式

![ubuntu-cmd-cron-node-log](/otherShare/drpy-node/drpyS-ubuntu-cmd-cron-node-log.png)

> pm2管理方式

![ubuntu-cmd-cron-pm2-log](/otherShare/drpy-node/drpyS-ubuntu-cmd-cron-pm2-log.png)


#### 1.5.5. 问题处理

1. node安装失败
    - 报错关键词: `node: /lib/x86_64-linux-gnu/libc.so.6: version 'GLIBC_2.28' not found (required by node)`
    - 注意: 不管提示`version`的`GLIBC`版本多少, 都至少要`2.28`以上版本, 实测提示缺少`2.27`编译后还是提示缺少`2.28`
    - 解决方案:
    ```bash
    # 耐心等待, 编译需要时间
    apt install bison
    wget https://mirror.bjtu.edu.cn/gnu/libc/glibc-2.28.tar.xz
    tar -xf glibc-2.28.tar.xz -C /usr/local
    cd /usr/local/glibc-2.28/
    mkdir build && cd build
    ../configure --disable-sanity-checks
    make && make install
    ```
2. 普通启动方式启动无法后台常驻
    - 现象: 断开 ssh 连接, 进程自动退出
    - 解决方案:
    ```bash
    # 启动命令
    nohup node index.js &
    # 关闭命令
    pkill -9 -f "node index.js"
    ```
3. git pull 失败
    - 现象: 提示文件冲突
    - 解决方案:
    ```bash
    # 使用如下命令替代 git pull
    git fetch --all
    git reset --hard origin/main
    ```

### 1.6. 一键脚本

耐心等待安装过程完成, 实测1MB带宽2h2g机器全过程需5分钟

> 注意脚本不是万能的, 使用前先阅读如下限制

- 只针对主流操作系统有效
- 只支持`yum` `apt` `apt-get` `dnf` `pkg`包管理器
- 自行确认系统源是否可用, 该脚本不具备检查和修改能力

```bash
# 安装/更新都是该命令
bash -c "$(curl -fsSLk https://zy.catni.cn/release/latest/drpys.sh)"
```

::: details 点我查看脚本内容，便于代码审计
```bash:line-numbers
#!/bin/bash

project_info() {
	echo -e "\033[35m     _                  ____  
  __| |_ __ _ __  _   _/ ___| 
 / _\` | '__| '_ \\| | | \___ \\ 
| (_| | |  | |_) | |_| |___) |
 \__,_|_|  | .__/ \__, |____/ 
           |_|    |___/ \033[0m"
	echo -e "\033[35m[项目] 开源地址: https://github.com/hjdhnx/drpy-node\033[0m"
}

server_recommend() {
	echo
	echo -e "\033[32m[广告] 服务器滞销, 帮帮孩子吧:\033[0m"
	echo -e "\033[32m[广告] 阿里云: 0元试用,首购低至0.9元/月起 https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=hlco4dmi\033[0m"
	echo -e "\033[32m[广告] 腾讯云: 2核2G3M云服务器7.92元/月起 https://curl.qcloud.com/jogYnC7h\033[0m"
	echo -e "\033[32m[广告] 京东云: 2核2G3M云服务器仅58元 https://3.cn/20Z-Xyf4\033[0m"
	echo -e "\033[32m[广告] 百度云: 2核2G1M云服务器仅59元 https://cloud.baidu.com/campaign/ambassador-product/index.html?ambassadorId=2e198a5e0dac4c5aa9fe44457e2e9cb4#knowledge-bcc\033[0m"
	echo -e "\033[32m[广告] 润雨云: 1核1G50M美国免备案服务器仅16元一月 https://www.rainyun.com/NTU1NDA5_\033[0m"
}

qrcode_pay() {
    echo

    echo "███████████████████████████████"
    echo "█ ▄▄▄▄▄ █▀ █▀▀ █▀ ▀▄▄ █ ▄▄▄▄▄ █"
    echo "█ █   █ █▀ ▄ █▄▄▀▀▀▄ ▄█ █   █ █"
    echo "█ █▄▄▄█ █▀█ █▄▀██▀  ▄▀█ █▄▄▄█ █"
    echo "█▄▄▄▄▄▄▄█▄█▄█ ▀ ▀▄█▄█ █▄▄▄▄▄▄▄█"
    echo "█  ▄ ▄▀▄   ▄█▄▀▄ ▄ █ ▀ ▀ ▀▄█▄▀█"
    echo "█▀▄▄▀▄▀▄█  ▀ ▄▄▀▀▄█ ▀ ▀▄▄ ▀█▀██"
    echo "███▀▄▄█▄▄▀▄▀▄▀▀▀▄▀█▄ ▀▀▀▀▀▄▄█▀█"
    echo "█▀ █ ██▄▄ ▀▄█▀▄▀▄▄█ ▀▄▄▄▀█▄▄▀██"
    echo "█▀▀ █▄ ▄ ▀ ▄█▄▄ ▀▄▄ ▀▀█▀█▀▄ █▀█"
    echo "█ █▀█  ▄██▀  ▄▄▀▄▄▀ ▀▀ ██▀█▄▀██"
    echo "█▄████▄▄█  █▄ ▀ █▀▀▄▄ ▄▄▄ ▀   █"
    echo "█ ▄▄▄▄▄ █▄▄██ ▀▀ █ █▄ █▄█ ▄▄███"
    echo "█ █   █ █ ▀▀██▀▀▄██ ▀▄▄▄ ▄▀ ▄▄█"
    echo "█ █▄▄▄█ █  ▄█ ▄▀▄▄▀ ▀  ▄   ▄ ██"
    echo "█▄▄▄▄▄▄▄█▄▄▄████▄█▄█▄████▄▄▄███"

    echo
	echo -e "\033[34m[赞助] 支付宝扫描如上二维码请脚本作者喝杯咖啡吧 \033[0m"
}

confirm() {
    echo -e -n "\033[34m[drpyS] $* \033[1;36m(Y/n)\033[0m"
    read -n 1 -s opt

    [[ "$opt" == $'\n' ]] || echo

    case "$opt" in
        'y' | 'Y' ) return 0;;
        'n' | 'N' ) return 1;;
        *) confirm "$1";;
    esac
}

info() {
    echo -e "\033[37m[drpyS] $*\033[0m"
}

warning() {
    echo -e "\033[33m[drpyS] $*\033[0m"
}

abort() {
    echo -e "\033[31m[drpyS] $*\033[0m"
	echo -e "\033[31m[drpyS] 查阅安装文档: https://zy.catni.cn/otherShare/drpyS-build.html\033[0m"
	echo -e "\033[31m[drpyS] 有偿咨询脚本安装问题解答, 联系QQ:29794882\033[0m"
    exit 1
}

command_exists() {
    command -v "$1" 2>&1
}

get_local_ips() {
	local ips=""
    local ip_cmd=""
	
	# 检查 `ip` 或 `ifconfig` 是否存在
    if [ -z `command_exists ip` ]; then
        ip_cmd="ip addr show"
    else
        ip_cmd="ifconfig -a"
    fi

    # 获取 IPv6 地址并添加方括号（过滤私有IPv6）
    local ipv6_list
    ipv6_list=$($ip_cmd | grep -Eo 'inet6 [a-fA-F0-9:]*' | awk '{print $2}')
    for ipv6 in $ipv6_list; do
        # 检查是否属于私有IPv6地址范围 (fc00::/7)
        if [[ $ipv6 =~ ^fc00::.* ]]; then
            ips="${ips}[$ipv6]\n"
        fi
    done

    # 获取 IPv4 地址并过滤私有IPv4地址
    local ipv4_list
    ipv4_list=$($ip_cmd | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | awk '{print $2}')
    for ipv4 in $ipv4_list; do
        # 排除公共 IPv4 地址，保留私有地址范围：
        if [[ $ipv4 =~ ^10\..* || $ipv4 =~ ^172\.(1[6-9]|2[0-9]|3[01])\..* || $ipv4 =~ ^192\.168\..* ]]; then
            ips="${ips}${ipv4}\n"
        fi
    done

    # 输出结果
    echo -e "$ips"
}

get_public_ips() {
    local ips=""

    # 获取 IPv6 地址并添加方括号
    local ipv6
    ipv6=$(curl -s6 https://ifconfig.co || curl -s6 https://api64.ipify.org)
    if [[ -n "$ipv6" ]]; then
        ips="${ips}[$ipv6]\n"
    fi

    # 获取 IPv4 地址
    local ipv4
    ipv4=$(curl -s4 https://ifconfig.co || curl -s4 https://api64.ipify.org)
    if [[ -n "$ipv4" ]]; then
        ips="${ips}${ipv4}\n"
    fi

    # 输出换行后的 IP 列表
    echo -e "$ips"
}

nvm_default_install_dir() {
  [ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm"
}

nvm_install_dir() {
  if [ -n "$NVM_DIR" ]; then
    printf %s "${NVM_DIR}"
  else
    nvm_default_install_dir
  fi
}

check_git_origin_url() {
    local drpys_path="$1"
    local git_repo="$2"
    local git_project="$3"

    # 检查目录是否非空且存在.git目录
    if [[ -d "$drpys_path/$git_project/.git" ]]; then
        local git_config_path="$drpys_path/$git_project/.git/config"

        # 检查.git/config文件是否存在
        if [[ -f "$git_config_path" ]]; then
            # 提取origin的url
            local origin_url=$(awk -F ' = ' '/\[remote "origin"\]/ {getline; print $2}' "$git_config_path")

            # 比较url是否匹配
            if [[ "$origin_url" == "$git_repo" ]]; then
				echo 0
                return
            fi
        fi
    fi

    echo 1
}


check_depend() {
    if [ -z "$BASH" ]; then
        abort "请用 bash 执行本脚本"
    fi

    if [ ! -t 0 ]; then
        abort "STDIN 不是标准的输入设备"
    fi

    if [ "$EUID" -ne "0" ]; then
        abort "请以 root 权限运行"
    fi
	
	local pkg_manage_tool
	if [ ! -z `command_exists yum` ]; then
		# Fedora CentOS
        pkg_manage_tool=yum
	elif [ ! -z `command_exists apt-get` ]; then
		# Debian Ubuntu
        pkg_manage_tool=apt-get
	elif [ ! -z `command_exists apt` ]; then
        pkg_manage_tool=apt
    elif [ ! -z `command_exists dnf` ]; then
		# RedHat AnolisOS
        pkg_manage_tool=dnf
	elif [ ! -z `command_exists zypper` ]; then
		# openSUSE
        pkg_manage_tool=zypper
	elif [ ! -z `command_exists pkg` ]; then
		# Solaris Termux
        pkg_manage_tool=pkg
    else
        abort "仅支持yum｜apt｜apt-get｜dnf｜pkg｜zypper包管理工具"
    fi
	
	info '即将更新系统依赖'
	$pkg_manage_tool update -y

    info "安装环境确认正常"
	echo "$pkg_manage_tool"
}

trap 'onexit' INT
onexit() {
    echo
    abort "用户手动结束安装"
}

project_info
echo -e "\033[35m[脚本] 项目提供内容和数据均匀脚本作者无关, 该脚本只提供安装服务\033[0m"
info "安装预计需两分钟｜更新预计需半分钟 (取决于网络)"
warning "使用前自行确认系统源是否可用, 如不可用自行停止运行该脚本, 该脚本不具备修改系统源能力"

# 根据用户输入设置目录
if [[ -n $input_path ]]; then
	drpys_path=$input_path
fi

local_ips=$(get_local_ips)
public_ips=$(get_public_ips)
pkg_manage_tool=$(check_depend)

# 检查 git
if [ -z `command_exists git` ]; then
	info '即将开始安装git'
	pkg_git_name='git'
	if [ "$pkg_manage_tool" == dnf ]; then
		pkg_git_name='git-all'
	fi
    if ! $pkg_manage_tool install -y $pkg_git_name; then
		abort "安装 $pkg_git_name 失败"
    fi
fi
# 设置http1.1 版本
info '设置git请求为http1.1版本'
git config --global http.version HTTP/1.1
# 设置 github 代理 hosts
info '设置github代理hosts'
sed -i "/# fetch-github-hosts begin/Q" /etc/hosts && curl https://hosts.gitcdn.top/hosts.txt >> /etc/hosts

# 检查nvm
if [ ! -d "$(nvm_install_dir)/.git" ]; then
	info '即将开始安装nvm'
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
fi
# nvm环境变量
export NVM_DIR=$(nvm_install_dir)
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 获取所有已安装的Node.js版本
installed_versions=$(nvm list)
# 初始化变量
version_to_use=""

# 检查是否存在版本20或更高
while IFS= read -r line; do
	if [[ "$line" =~ v20 ]]; then
		version_to_use=$(echo "$line" | grep -o 'v[0-9]*\.[0-9]*\.[0-9]*')
		break
	fi
done <<< "$installed_versions"

# 使用或安装Node.js版本
if [ -n "$version_to_use" ]; then
	info "已安装的Node.js版本中存在$version_to_use, 即将切换到该版本"
	nvm use $version_to_use
else
	info "已安装的Node.js版本中不存在20或更高版本, 即将安装Node.js 20"
	nvm install 20
	nvm use 20
fi

# 设置npm代理
info '设置npm源为淘宝镜像'
npm config set registry https://registry.npmmirror.com

# 检查pm2
if [ -z `command_exists pm2` ]; then
	info '即将开始安装pm2'
    npm install pm2 -g
fi

# 提示用户输入需要创建的目录，30秒后自动使用当前目录
drpys_path=$(pwd)/drpys
git_repo="https://github.com/hjdhnx/drpy-node.git"
git_project="drpy-node"

pm2_show_run_project_path=$(pm2 show drpyS | awk '/│ PWD / {print $4}')
if [ -n "$pm2_show_run_project_path" ]; then
	info "检测到已运行项目路径: $pm2_show_run_project_path"
	drpys_path=$(dirname $pm2_show_run_project_path)
else
	echo -e -n "\033[34m[drpyS] 安装目录(30秒内无输入或留空则为 '$drpys_path'): \033[0m"
	read -t 30 input_path
	
	# 如果用户没有输入路径，则使用默认路径
    [ -z "$input_path" ] && input_path=$drpys_path

	# 根据用户输入设置目录
	if [ -n $input_path ]; then
		drpys_path=$input_path
	fi
	# 检查目录是否存在，如果不存在则创建
	if [ ! -e "$drpys_path" ]; then
		info "当前项目目录不存在, 即将创建"
		mkdir -p "$drpys_path"
	fi
fi
info "项目目录路径格式化: $drpys_path"

# 切换到目标目录
cd $drpys_path

# 检查目录是否为空
result=$(check_git_origin_url "$drpys_path" "$git_repo" "$git_project")
info "目录检查结果: $result | 1代表项目不存在或仓库不对应, 0标识项目仓库对应"
if [ $result -eq 0 ]; then
	cd $git_project
	info '即将开始更新项目代码'
	git pull
	# 检查 git pull 的退出状态
	if [ $? -ne 0 ]; then
	  info "正常更新失败, 即将开始强制覆盖代码"
	  # 强制重置本地分支到远程分支的状态
	  git fetch --all
	  # 请根据你的实际分支名称调整 origin/main
	  git reset --hard origin/main
	fi
else
	rm -rf *
	info '即将开始克隆项目代码'
	git clone $git_repo
	cd $git_project
fi
# 安装依赖
info '即将开始安装项目依赖'
npm install

# 设置 github 代理 host
info '回退系统代理hosts'
sed -i "/# fetch-github-hosts begin/Q" /etc/hosts

info '正在启动项目'
if [ -z `command_exists $(pm2 pid drpyS)` ]; then
	pm2 delete drpyS
fi
pm2 start index.js --name drpyS

warning "安装成功, 请访问以下地址访问控制台"
warning "[监听] http://0.0.0.0:5757"
for ip in $local_ips; do
    warning "[私网] http://$ip:5757"
done
for ip in $public_ips; do
    warning "[公网] http://$ip:5757"
done
warning "如需域名访问, 请自行使用 nginx 反向代理"

server_recommend
qrcode_pay


# bash -c "$(curl -fsSLk https://zy.catni.cn/release/latest/drpys.sh)"

# if  ! crontab -l 2>/dev/null | grep -Fq "https://zy.catni.cn/release/latest/drpys.sh"; then
# 	cron_command="23 5 * * * bash -c \"\$(curl -fsSLk https://zy.catni.cn/release/latest/drpys.sh)\""
#     (crontab -l 2>/dev/null ; echo "$cron_command") | crontab -
# fi
```
:::

#### 1.6.1. 一键安装

![drpyS-shell-install](/otherShare/drpy-node/drpyS-shell-install.png)

#### 1.6.2. 一键更新

![drpyS-shell-update](/otherShare/drpy-node/drpyS-shell-update.png)

#### 1.6.3. 定时更新

配置前自行确认环境是否有`crontab`工具

![drpyS-shell-cron-create](/otherShare/drpy-node/drpyS-shell-cron-create.png)

> 执行如下命令

```bash
# 如下执行时复制全部运行
if  ! crontab -l 2>/dev/null | grep -Fq "https://zy.catni.cn/release/latest/drpys.sh"; then
	cron_command="23 5 * * * bash -c \"\$(curl -fsSLk https://zy.catni.cn/release/latest/drpys.sh)\""
    (crontab -l 2>/dev/null ; echo "$cron_command") | crontab -
fi
```

> 执行日志如下

![drpyS-shell-cron-log](/otherShare/drpy-node/drpyS-shell-cron-log.png)

### 1.7. Serv00

[官网](https://www.serv00.com/)

> 一个提供免费虚拟主机的平台，其托管平台使用的是 FreeBSD 系统。

> 每个账号有效期为 10年，超过三个月不登录 Panel 以及 SSH 则会被删除账号

#### 1.7.1. 创建环境

> serv00创建所选的node版本均不生效, 最后都会变成18版本, 幸运的是该项目的最低要求就是18

![drpyS-serv00-website](/otherShare/drpy-node/drpyS-serv00-website.png)

#### 1.7.2. 开放端口

> serv00会为每个用户创建一个环境, 所以开放端口可能冲突, 冲突则自己随便起一个(0-65535), 注意如果冲突注意如下每一个步骤的注意点

![drpyS-serv00-port](/otherShare/drpy-node/drpyS-serv00-port.png)

#### 1.7.3. 开放权限(可选, pm2需操作)

> 使用pm2时如不开启权限, 则提示无权限

![drpyS-serv00-permission](/otherShare/drpy-node/drpyS-serv00-permission.png)

#### 1.7.4. 克隆项目并安装项目依赖

> 如果需要 pm2 请不要全局安装, serv00环境限制

```bash
[1]克隆drpy-node项目
    git clone https://github.com/hjdhnx/drpy-node.git
[2]进入drpy-node目录(自己确认目录)
    cd drpy-node
[3]安装所需依赖
    npm install
[4]安装pm2依赖([可选]如果需要用pm2管理项目)
    npm install pm2@latest
```

![drpyS-serv00-inatll](/otherShare/drpy-node/drpyS-serv00-install.png)

#### 1.7.5. 编辑`package.json`文件([可选]如果需要用pm2管理项目)

```json{4}
...
"scripts": {
    ...
    "pm2": "pm2" // 增加或修改该行,如pm2占用,则自定义或修改原来,如下涉及pm2都需要注意
}
...
```

![drpyS-serv00-pkg](/otherShare/drpy-node/drpyS-serv00-pkg.png)

#### 1.7.6. 编辑`index.js`文件([可选]如果端口冲突)

```js{4}
...
// 获取当前路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5757; // 修改此处端口数字(范围0-65535), 与上面 1.7.2 对应
...
```

![drpyS-serv00-indexjs](/otherShare/drpy-node/drpyS-serv00-indexjs.png)

#### 1.7.7. 启动项目

```bash
[1]进入drpy-node目录([可选]自己确认目录, 如果已经在目录下可忽略)
    cd drpy-node
[2]启动项目(根据自己需要选择启动方式)
[2.1]普通
    - 启动: 
        - 前台启动: node index.js
        - 后台启动: nohup node index.js &
    - 停止: 
        - 前台启动方式对应停止: ctrl+c 或 断开 ssh
        - 后台启动方式对应停止: 
        
[2.2]pm2管理
    - 启动: npm run pm2 -- start index.js --name drpyS
    - 任务操作:
        - 任务列表: npm run pm2 -- list
        - 查看日志: npm run pm2 -- logs drpyS
        - 任务详情: npm run pm2 -- show drpyS
        - 停止任务: npm run pm2 -- stop drpyS
        - 启动任务: npm run pm2 -- start drpyS
        - 重启任务: npm run pm2 -- restart drpyS
        - 删除任务: npm run pm2 -- delete drpyS(该步骤操作后需要重新启动则需要使用第一部操作启动)
```

> node普通管理方式

![drpyS-serv00-node](/otherShare/drpy-node/drpyS-serv00-node.png)

> pm2管理方式

![drpyS-serv00-pm2-1](/otherShare/drpy-node/drpyS-serv00-pm2-1.png)
![drpyS-serv00-pm2-2](/otherShare/drpy-node/drpyS-serv00-pm2-2.png)
![drpyS-serv00-pm2-3](/otherShare/drpy-node/drpyS-serv00-pm2-3.png)


#### 1.7.8. 更新项目

1. 手动更新

```bash
[1]进入项目目录([可选]自己确认目录, 如果已经在目录下可忽略)
    cd drpy-node
[2]更新代码(网络不佳自己使用代理, 优先使用普通拉取提示文件冲突再使用强制拉取)
[2.1]普通拉取
    git pull
[2.2]强制拉取
    git fetch --all && git reset --hard origin/main
[3]更新依赖
    npm install
[4]修改端口号([可选]如果端口冲突, 参考1.7.5部分)
[5]重启服务(根据自己需要选择重启方式)
[5.1]node普通管理方式
    pkill -9 -f "node index.js"; nohup node index.js &
[5.2]pm2管理方式
    npm install pm2@latest
    npm run pm2 -- delete drpyS; npm run pm2 -- start index.js --name drpyS
```

> node普通管理方式

![drpyS-serv00-update-node](/otherShare/drpy-node/drpyS-serv00-update-node.png)

> pm2管理方式

![drpyS-serv00-update-pm2](/otherShare/drpy-node/drpyS-serv00-update-pm2.png)

2. 定时更新

![drpyS-serv00-cron](/otherShare/drpy-node/drpyS-serv00-cron.png)

> 定时任务命令参考如下

```bash
# 注意: 使用 git 强制更新(如果自定义过一些参数或文件将被覆盖)

# pm2管理方式(如下按需求选其一)
# 注意: 自己确认项目目录
# 默认端口-不冲突
cd /home/hiramxxxx/drpy-node && git fetch --all && git reset --hard origin/main && npm install && npm install pm2 && jq '.scripts.pm2 //= "pm2"' package.json > temp.json && mv temp.json package.json && npm run pm2 -- delete drpyS; npm run pm2 -- start index.js --name drpyS

# 自定义端口-冲突(自己确认端口)
# sed -i '' 'command': 就地编辑文件, 不保留备份. 注意 -i 选项后面的空字符串 '', 这是 FreeBSD 版本的 sed 所必需的
cd /home/hiramxxxx/drpy-node && git fetch --all && git reset --hard origin/main && npm install && npm install pm2 && jq '.scripts.pm2 //= "pm2"' package.json > temp.json && mv temp.json package.json && sed -i '' 's/const PORT = 5757/const PORT = 15757/g' index.js; npm run pm2 -- delete drpyS; npm run pm2 -- start index.js --name drpyS


# node普通管理方式(如下按需求选其一)
# 注意: 自己确认项目目录
# 默认端口-不冲突
cd /home/hiramxxxx/drpy-node && git fetch --all && git reset --hard origin/main && npm install && pkill -9 -f "node index.js"; nohup node index.js &

# 自定义端口-冲突(自己确认端口)
# sed -i '' 'command': 就地编辑文件, 不保留备份. 注意 -i 选项后面的空字符串 '', 这是 FreeBSD 版本的 sed 所必需的
cd /home/hiramxxxx/drpy-node && git fetch --all && git reset --hard origin/main && npm install && sed -i '' 's/const PORT = 5757/const PORT = 15757/g' index.js; pkill -9 -f "node index.js"; nohup node index.js &
```

## 2. 安卓手机

### 2.1. termux

#### 2.1.1. 准备必要工具及软件

> 如下载慢自行准备网络代理

1. [TERMUX](https://github.com/termux/termux-app/releases) - `重要`需要选择自己手机架构和安卓版本对应软件
2. [MT管理器](http://docker.540734621.xyz:57465/s/boC0)

#### 2.1.2. 安装软件
1. 先安装MT管理器; 再安装termux
2. 利用MT管理器并添加本地存储termux, 可参考[MT添加本地存储视频](https://www.alipan.com/s/SbatAyAZMU6)

#### 2.1.3. 安装项目

##### 2.1.2.1. 更新系统依赖并安装必要依赖

```bash
[1]更新termux软件包
    pkg upgrade
[2]安装git
    pkg install git
```

##### 2.1.2.2. 克隆项目并安装项目依赖
```bash
[1]克隆drpy-node项目
    git clone https://github.com/hjdhnx/drpy-node.git
[2]安装nodejs
    pkg install nodejs
[3]进入drpy-node目录(自己确认目录)
    cd drpy-node
[4]设置npm为淘宝镜像源([可选]网络快的可忽略)
    npm config set registry https://registry.npmmirror.com
[5]安装所需依赖
    npm install
[6]安装pm2依赖([可选]如果需要用pm2管理项目)
    npm install pm2@latest -g
```

##### 2.1.2.3. 启动项目

```bash
[1]进入drpy-node目录([可选]自己确认目录, 如果已经在目录下可忽略)
    cd drpy-node
[2]启动项目(根据自己需要选择启动方式)
[2.1]普通
    - 启动: 
        - 前台启动: node index.js
        - 后台启动: nohup node index.js &
    - 停止: 
        - 前台启动方式对应停止: ctrl+c 或 断开 ssh
        - 后台启动方式对应停止: pkill -9 -f "node index.js"
[2.2]pm2管理
    - 启动: pm2 start index.js --name drpyS
    - 任务操作:
        - 任务列表: pm2 list
        - 查看日志: pm2 logs drpyS
        - 任务详情: pm2 show drpyS
        - 停止任务: pm2 stop drpyS
        - 启动任务: pm2 start drpyS
        - 重启任务: pm2 restart drpyS
        - 删除任务: pm2 delete drpyS(该步骤操作后需要重新启动则需要使用第一部操作启动)
```

#### 2.2.4. 更新项目

1. 手动更新

```bash
[1]启动termux
[2]进入项目目录([可选]自己确认目录, 如果已经在目录下可忽略)
    cd drpy-node
[3]更新代码(网络不佳自己使用代理, 优先使用普通拉取提示文件冲突再使用强制拉取)
[3.1]普通拉取
    git pull
[3.2]强制拉取
    git fetch --all && git reset --hard origin/main
[4]更新依赖
    npm install
[5]重启服务(根据自己需要选择重启方式)
[5.1]node普通管理方式
    pkill -9 -f "node index.js"; nohup node index.js &
[5.2]pm2管理方式
    pm2 delete drpyS; pm2 start index.js --name drpyS
```

## 3. 托管

### 3.1. vercel

::: danger 注意
1. vercel国内`无法直接访问`, 自行注册域名托管至cloudfare并解析到vercel服务(具体流程自行百度) 或 自行施展魔法。
2. 该方案部分源可能不兼容(受限于托管平台)
:::

#### 3.1.1 网页端(简单)

##### 3.1.1.1 创建

该方式要求授权`git`授权并在自己账号上创建一个仓库

> 如下方式二选一

- 通过fork导入仓库(适合`经常更新`项目)
    ![drpyS-vercel-create-web-fork](/otherShare/drpy-node/drpyS-vercel-create-web-fork.png)

- 直接导入第三方仓库(适合`不经常更新`项目)
    ![drpyS-vercel-create-web-import](/otherShare/drpy-node/drpyS-vercel-create-web-import.png)

##### 3.1.1.2 更新项目

> 选择自己对应的方式

- 通过fork导入仓库-直接在`Github(不同平台可能不同)`上点击 `Sync fork`
    ![drpyS-vercel-update-web-fork](/otherShare/drpy-node/drpyS-vercel-update-web-fork.png)

- 直接导入第三方仓库-下载原有仓库数据上传到自己仓库

#### 3.1.2 代码端(专业)

##### 3.1.2.1. 准备必要工具及软件

> 如下载慢自行准备网络代理

- 安装 `git`: [参考官方](https://git-scm.com/)
- 安装 `node` (18.x 及以上): [参考官方](https://nodejs.org/zh-cn)
- 注册账号: [vercel官方](https://vercel.com/)

##### 3.1.2.2. 安装项目依赖

```bash
[1]克隆drpy-node项目
    git clone https://github.com/hjdhnx/drpy-node.git
[2]进入drpy-node目录(自己确认目录)
    cd drpy-node
[3]安装所需依赖
    npm install
[4]安装vercel依赖
    npm i vercel -g
    npm i @vercel/node -S
```

![drpyS-vercel-pkg](/otherShare/drpy-node/drpyS-vercel-pkg.png)

##### 3.1.2.3. 配置vercel

项目根目录创建`vercel.json`文件

```json:line-numbers
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

![drpyS-vercel-config](/otherShare/drpy-node/drpyS-vercel-config.png)

##### 3.1.2.4. 托管vercel

```bash
[1]登录(选择自己的登录方式)
    vercel login
[2]本地测试(会生成.vercel目录,里面包括项目信息)
    vercel dev
[3]部署线上
    vercel
```

![drpyS-vercel-push](/otherShare/drpy-node/drpyS-vercel-push.png)

##### 3.1.2.4. 更新项目

```bash
[1]进入项目目录([可选]自己确认目录, 如果已经在目录下可忽略)
    cd drpy-node
[2]更新代码(网络不佳自己使用代理, 优先使用普通拉取提示文件冲突再使用强制拉取)
[2.1]普通拉取
    git pull
[2.2]强制拉取
    git fetch --all && git reset --hard origin/main
[3]更新本地依赖
    npm install
[4]更新线上环境
    vercel
```