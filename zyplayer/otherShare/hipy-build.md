# hipy搭建

> 项目信息
1. 前端: [hipy-ui](https://github.com/hjdhnx/hipy-ui)
2. 后端: [hipy-server](https://github.com/hjdhnx/hipy-server)
3. 嗅探器: [hipy-sniffer](https://github.com/hjdhnx/hipy-sniffer)

> 须知
- [x] **有偿提供搭建问题解答**
- [x] **不看文档直接请勿咨询**
- [x] **该页面旨在提供搭建服务, 项目与数据均与此无关**
- [x] **个人小水管机器，服务器流量有限，请勿频繁拉取，不然随时拉闸！！！**
- [x] **如下一键脚本仅支持 Linux 环境下执行，不支持手机~_~**

## 1. 服务器推荐

如果你还没有服务器，欢迎通过以下优惠链接选购。

1. 阿里云：[云服务器0元试用, 首购低至0.9元/月起](https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=hlco4dmi), 更多优惠请点击[此链接](https://www.aliyun.com/minisite/goods?userCode=hlco4dmi);
2. 腾讯云：[2核2G3M云服务器7.92元/月起](https://curl.qcloud.com/jogYnC7h), 2000元代金券免费领, 更多优惠请点击[此链接](https://curl.qcloud.com/1JcRxEfV);
3. 京东云：[2核2G3M云服务器首年仅49元](https://3.cn/20Z-Xyf4);
4. 百度云：[2核2G1M云服务器首年仅59元](https://cloud.baidu.com/campaign/ambassador-product/index.html?ambassadorId=2e198a5e0dac4c5aa9fe44457e2e9cb4#knowledge-bcc);
5. 润雨云: [1核1G50M美国免备案服务器仅16元一月](https://www.rainyun.com/NTU1NDA5_), 更有签到奖励减免购买格

## 2. 默认账号密码

| 角色   | 用户名   | 密码    |
|--------|--------|----------|
| 管理员  | admin  | admin123 |
| 运维员  | opt    | opt123   |
| 普通用户| user   | 123456   |
| 道长    | hjdhnx | 123456   |

## 3. 一键安装脚本

耐心等待安装过程完成，实测1MB带宽2h2g机器全过程需20分钟

> 先确保服务器依赖安装`unzip`

> 中途退出安装请删除安装目录后重新运行脚本[默认路径: `/data/hipy`]

```bash
bash -c "$(curl -fsSLk https://zy.catni.cn/release/latest/setup.sh)"
```

::: details 点我查看脚本内容，便于代码审计
```bash:line-numbers
#!/bin/bash

echo "
  _       _                 
 | |     (_)                
 | |__    _   _ __    _   _ 
 | '_ \  | | | '_ \  | | | |
 | | | | | | | |_) | | |_| |
 |_| |_| |_| | .__/   \__, |
             | |       __/ |
             |_|      |___/ 
"

echo "相关项目信息:
前端: https://github.com/hjdhnx/hipy-ui
后端: [主]https://github.com/hjdhnx/hipy-server  [备]https://github.com/sanshu-rom/server-release
桌面: https://github.com/Hiram-Wong/ZyPlayer
教程: https://zy.catni.cn
源动力: https://www.sourcepower.top"
echo -e "\033[33m有偿咨询安装问题, 联系QQ:29794882\033[0m"
echo
echo "服务器推荐:
阿里云: 0元试用,首购低至0.9元/月起 https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=hlco4dmi
腾讯云: 2核2G3M云服务器7.92元/月起 https://curl.qcloud.com/jogYnC7h
京东云: 2核2G3M云服务器仅49元 https://3.cn/20Z-Xyf4"

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

qrcode_pay

echo -e "\033[33m[Hipy] 安装预计需半小时(取决于网络), 中途退出安装请删除安装目录后重新运行脚本[默认路径: /data/hipy]\033[0m"

qrcode_qqgroup() {
    echo

    echo "█████████████████████████████"
    echo "██ ▄▄▄▄▄ █▀▀ ▀▀   ▄█ ▄▄▄▄▄ ██"
    echo "██ █   █ █▄▀█  █ ███ █   █ ██"
    echo "██ █▄▄▄█ █ ▄▀██ ▀  █ █▄▄▄█ ██"
    echo "██▄▄▄▄▄▄▄█ █ █▄█ █▄█▄▄▄▄▄▄▄██"
    echo "██▄▄▀ ██▄ ▀▀██ ▄█▄ ▀ ▄▄█▄▄▀██"
    echo "██▄▄ █▀█▄▄█▀▀█ ▀██▄ █▀ ██▄▄██"
    echo "██▄▄▄▀▀█▄█ ▀▄▄  ██▄▀  █ ▀▄ ██"
    echo "██▄▀▄▀▀ ▄▀▄ ▀ ▀▀▄█ ▀▀▄ █▄▀▄██"
    echo "██▄▄█▄█▄▄▄▀▄█▀▀▄▀  ▄▄▄  ▄█▀██"
    echo "██ ▄▄▄▄▄ █▄▄███▄▄  █▄█  ▀  ██"
    echo "██ █   █ █▀█▀▄▀▄▄█▄▄▄   ▀████"
    echo "██ █▄▄▄█ █▀███ ▀▄█▀▄█▄▄▀▄█▄██"
    echo "██▄▄▄▄▄▄▄▀▄▄█▄▄██▄▄▄▄▄███▄▄██"
    echo "█████████████████████████████"

    echo
    echo "QQ扫描上方二维码加入项目讨论组"
}

confirm() {
    echo -e -n "\033[34m[Hipy] $* \033[1;36m(Y/n)\033[0m"
    read -n 1 -s opt

    [[ "$opt" == $'\n' ]] || echo

    case "$opt" in
        'y' | 'Y' ) return 0;;
        'n' | 'N' ) return 1;;
        *) confirm "$1";;
    esac
}

info() {
    echo -e "\033[37m[Hipy] $*\033[0m"
}

warning() {
    echo -e "\033[33m[Hipy] $*\033[0m"
}

abort() {
    echo -e "\033[31m[Hipy] $*\033[0m"
	echo -e "\033[31m[Hipy] 查阅安装文档: https://zy.catni.cn/hipy-build.html\033[0m"
	echo -e "\033[31m[Hipy] 有偿咨询安装问题, 联系QQ:29794882\033[0m"
    exit 1
}

command_exists() {
    command -v "$1" 2>&1
}

check_container_health() {
    local container_name=$1
    local max_retry=30
    local retry=0
    local health_status="unhealthy"
    info "Waiting for $container_name to be healthy"
    while [[ "$health_status" == "unhealthy" && $retry -lt $max_retry ]]; do
        health_status=$(docker inspect --format='{{.State.Health.Status}}' $container_name 2>/dev/null || info 'unhealthy')
        sleep 5
        retry=$((retry+1))
    done
    if [[ "$health_status" == "unhealthy" ]]; then
        abort "Container $container_name is unhealthy"
    fi
    info "Container $container_name is healthy"
}

space_left() {
    dir="$1"
    while [ ! -d "$dir" ]; do
        dir=`dirname "$dir"`;
    done
    echo `df -h "$dir" --output='avail' | tail -n 1`
}

local_ips() {
    if [ -z `command_exists ip` ]; then
        ip_cmd="ip addr show"
    else
        ip_cmd="ifconfig -a"
    fi

    echo $($ip_cmd | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | awk '{print $2}')
}

get_average_delay() {
    local source=$1
    local total_delay=0
    local iterations=3

    for ((i = 0; i < iterations; i++)); do
        # check timeout
        if ! curl -o /dev/null -m 1 -s -w "%{http_code}\n" "$source" > /dev/null; then
            delay=999
        else
            delay=$(curl -o /dev/null -s -w "%{time_total}\n" "$source")
        fi
        total_delay=$(awk "BEGIN {print $total_delay + $delay}")
    done

    average_delay=$(awk "BEGIN {print $total_delay / $iterations}")
    echo "$average_delay"
}

install_docker() {
    curl -fsSL "https://zy.catni.cn/release/latest/get-docker.sh" -o get-docker.sh
    sources=(
        "https://mirrors.aliyun.com/docker-ce"
        "https://mirrors.tencent.com/docker-ce"
        "https://download.docker.com"
    )
    min_delay=${#sources[@]}
    selected_source=""
    for source in "${sources[@]}"; do
        average_delay=$(get_average_delay "$source")
        echo "source: $source, delay: $average_delay"
        if (( $(awk 'BEGIN { print '"$average_delay"' < '"$min_delay"' }') )); then
            min_delay=$average_delay
            selected_source=$source
        fi
    done

    echo "selected source: $selected_source"
    export DOWNLOAD_URL="$selected_source"
    bash get-docker.sh

    start_docker
    docker version > /dev/null 2>&1
    if [ $? -ne "0" ]; then
        echo "Docker 安装失败, 请检查网络连接或手动安装 Docker"
        echo "参考文档: https://docs.docker.com/engine/install/"
        abort "Docker 安装失败"
    fi
    info "Docker 安装成功"
}

start_docker() {
    systemctl enable docker
    systemctl daemon-reload
    systemctl start docker
}

config_docker_proxy() {
  cat <<EOF > /etc/docker/daemon.json
{
    "registry-mirrors": [
        "https://dockerproxy.net",
        "https://docker.m.daocloud.io",
        "https://docker.1panel.live",
        "https://mirror.ccs.tencentyun.com",
        "https://registry.cn-hangzhou.aliyuncs.com",
        "https://hub.littlediary.com.cn",
        "https://hub.littlediary.cn",
        "https://hub.cloudyun.top",
        "https://dockerhub.timeweb.cloud",
        "https://huecker.io"
    ]
}
EOF
}

check_depend() {
    # CPU ssse3 指令集检查
    support_ssse3=1
    lscpu | grep ssse3 > /dev/null 2>&1
    if [ $? -ne "0" ]; then
        echo "not found info in lscpu"
        support_ssse3=0
    fi
    cat /proc/cpuinfo | grep ssse3 > /dev/null 2>&1
    if [ $support_ssse3 -eq "0" -a $? -ne "0" ]; then
      abort "hipy需要运行在支持 ssse3 指令集的 CPU 上，虚拟机请自行配置开启 CPU ssse3 指令集支持"
    fi

	which unzip > /dev/null 2>&1
	if [ $? -ne "0" ]; then
		info "请手动安装解压缩unzip环境后继续"
		abort "中止安装"
	else
		info "解压缩环境unzip已安装"
	fi

    if [ -z "$BASH" ]; then
        abort "请用 bash 执行本脚本"
    fi

    if [ ! -t 0 ]; then
        abort "STDIN 不是标准的输入设备"
    fi

    if [ "$EUID" -ne "0" ]; then
        abort "请以 root 权限运行"
    fi

    if [ -z `command_exists docker` ]; then
        warning "缺少 Docker 环境"
        if confirm "是否需要自动安装 Docker"; then
            install_docker
        else
            abort "中止安装"
        fi
    fi

    info "发现 Docker 环境: '`command -v docker`'"

    docker version > /dev/null 2>&1
    if [ $? -ne "0" ]; then
        abort "Docker 服务工作异常"
    fi

    compose_command="docker compose"
    if $compose_command version; then
        info "发现 Docker Compose Plugin"
    else
        warning "未发现 Docker Compose Plugin"
        if confirm "是否需要自动安装 Docker Compose Plugin"; then
            install_docker
            if [ $? -ne "0" ]; then
                abort "Docker Compose Plugin 安装失败"
            fi
            info "Docker Compose Plugin 安装完成"
        else
            abort "中止安装"
        fi
    fi

    # check docker compose support -d
    if ! $compose_command up -d --help > /dev/null 2>&1; then
        warning "Docker Compose Plugin 不支持 '-d' 参数"
        if confirm "是否需要自动升级 Docker Compose Plugin"; then
            install_docker
            if [ $? -ne "0" ]; then
                abort "Docker Compose Plugin 升级失败"
            fi
            info "Docker Compose Plugin 升级完成"
        else
            abort "中止安装"
        fi
    fi
	
	if confirm "是否需要配置Docker代理"; then      
		config_docker_proxy
	fi

    start_docker

    info "安装环境确认正常"
}

trap 'onexit' INT
onexit() {
    echo
    abort "用户手动结束安装"
}

replace_domain() {
    local directory="$1"
    local old_domain="$2"
    local new_domain="$3"

    # 使用sed命令替换文件中的域名
	sed -i "s#$old_domain#$new_domain#g" $(grep -rl "$old_domain" "$directory")
	sed -i "s#^API_DOMAIN=.*\$#API_DOMAIN=$new_domain#" ".env"

    info "域名已替换为: $new_domain"
}

check_depend

docker network rm hipy-network 2>/dev/null

ips=`local_ips`
hipy_path='/data/hipy'
api_domain='http://172.23.0.3:5707/'

while true; do
    echo -e -n "\033[34m[Hipy] hipy安装目录 (留空则为 '$hipy_path'): \033[0m"
    read input_path
    [[ -z "$input_path" ]] && input_path=$hipy_path

    if [[ ! $input_path == /* ]]; then
        warning "'$input_path' 不是合法的绝对路径"
        continue
    fi

    if [ -f "$input_path" ] || [ -d "$input_path" ]; then
        warning "'$input_path' 路径已经存在，请换一个"
        continue
    fi

    hipy_path=$input_path

    if confirm "目录 '$hipy_path' 当前剩余存储空间为 `space_left \"$hipy_path\"` ，hipy至少需要 5G，是否确定"; then
        break
    fi
done

mkdir -p "$hipy_path"
if [ $? -ne "0" ]; then
    abort "创建安装目录 '$hipy_path' 失败"
fi
info "创建安装目录 '$hipy_path' 成功"
cd "$hipy_path"

curl "https://zy.catni.cn/release/latest/compose.yaml" -sSLk -o compose.yaml

if [ $? -ne "0" ]; then
    abort "下载 compose.yaml 脚本失败"
fi
info "下载 compose.yaml 脚本成功"

touch ".env"
if [ $? -ne "0" ]; then
    abort "创建 .env 脚本失败"
fi
info "创建 .env 脚本成功"

echo "HIPY_DIR=$hipy_path" >> .env
echo "FASTAPI_PORT=5707" >> .env
echo "SNIFFER_PORT=5708" >> .env
echo "VUE_PORT=8707" >> .env
echo "POSTGRES_PASSWORD=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 32)" >> .env
echo "REDIS_PASSWORD=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 32)" >> .env
echo "SUBNET_PREFIX=172.23.0" >> .env
echo "API_DOMAIN=http://172.23.0.3:5707/" >> .env

info "即下载 github 加速hosts 文件"
mv /etc/hosts /etc/hosts.bak
curl "https://gitlab.com/ineo6/hosts/-/raw/master/hosts" -sSLk -o /etc/hosts -w "\nDownload complete. Total size: %{size_download} bytes. Speed: %{speed_download}\n"

mkdir -p hipyTmp
if [ $? -ne "0" ]; then
    abort "创建 hipyTmp 临时目录失败"
fi
info "创建 hipyTmp 临时目录成功"

info "即将开始拉取 sniffer 最新代码"
mkdir -p resources/sniffer
curl "https://github.com/hjdhnx/hipy-sniffer/archive/refs/heads/main.zip" -sSLk -o ./hipyTmp/sniffer.zip -w "\nDownload complete. Total size: %{size_download} bytes. Speed: %{speed_download}\n"
unzip -q ./hipyTmp/sniffer.zip -d ./hipyTmp/sniffer
sed -i 's/"USE_CHROME": true,/"USE_CHROME": false,/g' ./hipyTmp/sniffer/hipy-sniffer-main/quart_config.json
mv ./hipyTmp/sniffer/hipy-sniffer-main/* ./resources/sniffer
touch "./resources/sniffer/nohup.out"

info "即将开始拉取 server 最新代码"
mkdir -p resources/fastapi
if confirm "是否有私仓权限"; then
	read -p "GitHub用户名: " git_username
	read -p "GitHub密钥: " git_token

	echo "GIT_PERMIT=1" >> .env
	echo "GIT_USER=$git_username" >> .env
	echo "GIT_TOKEN=$git_token" >> .env
	curl -H "Authorization: token $git_token" "https://github.com/hjdhnx/hipy-server/archive/refs/heads/master.zip" -sSLk -o ./hipyTmp/server.zip -w "\nDownload complete. Total size: %{size_download} bytes. Speed: %{speed_download}\n"
	unzip -q ./hipyTmp/server.zip -d ./hipyTmp/server
	mv ./hipyTmp/server/hipy-server-master/app/* ./resources/fastapi
else
	echo "GIT_PERMIT=0" >> .env
	echo "GIT_USER=" >> .env
	echo "GIT_TOKEN=" >> .env
	curl "https://github.com/sanshu-rom/server-release/releases/download/latest/hipy-server-latest.zip" -sSLk -o ./hipyTmp/server.zip -w "\nDownload complete. Total size: %{size_download} bytes. Speed: %{speed_download}\n"
	unzip -q ./hipyTmp/server.zip -d ./hipyTmp/server
	mv ./hipyTmp/server/hipy-server-latest/app/* ./resources/fastapi
fi
curl "https://zy.catni.cn/release/latest/.env" -sSLk -o ./resources/fastapi/configs/.env

info "即将开始拉取 vue 最新代码"
mkdir -p resources/vue
curl "https://zy.catni.cn/release/latest/vue.zip" -sSLk -o ./hipyTmp/vue.zip -w "\nDownload complete. Total size: %{size_download} bytes. Speed: %{speed_download}\n"
unzip -q ./hipyTmp/vue.zip -d ./hipyTmp/vue
mv ./hipyTmp/vue/* resources/vue/

while true; do
    echo -e -n "\033[34m[Hipy] 是否自定义后端API域名 (留空则为 '$api_domain'): \033[0m"
    read input_api_domain
    [[ -z "$input_api_domain" ]] && input_api_domain=$api_domain
	
	if ! [[ $input_api_domain =~ ^https?://[^/]+/$ ]]; then
        warning "'$input_api_domain' 不是合法的域名，必须以'http://'或'https://'开头，并以'/'结尾。"
        continue
    fi

    if confirm "启用新后端域名:$input_api_domain，是否确定"; then
		replace_domain "./resources/vue" "$api_domain" "$input_api_domain"
        break
    fi
done

info "即将还原系统hosts文件"
rm -rf /etc/hosts
mv /etc/hosts.bak /etc/hosts

info "即将开始下载 Docker 镜像"

$compose_command up -d

if [ $? -ne "0" ]; then
    abort "启动 Docker 容器失败"
fi

qrcode_pay

check_container_health hipy-pg
check_container_health hipy-fastapi
sleep 1

docker exec hipy-fastapi python3 initial_data.py > /dev/null 2>&1
info "数据库初始化完成"

CRON_COMMAND="*/30 * * * * docker restart hipy-sniffer"
(crontab -l ; echo "$CRON_COMMAND") | crontab -
info "嗅探器定时重启任务写入成功"

warning "安装成功, 请访问以下地址访问控制台"
warning "http://0.0.0.0:8707"
for ip in $ips; do
    warning http://$ip:8707
done
warning "如需域名访问, 请自行使用 nginx 反向代理"

# bash -c "$(curl -fsSLk https://zy.catni.cn/release/latest/setup.sh)"
```
:::

![一键搭建](/otherShare/hipy-build/hipy-build.png)

## 4. 一键升级脚本

耐心等待升级过程完成, 实测1MB带宽2h2g机器全过程需2分钟。

> 先确保服务器依赖安装`unzip`

> 手动修改的容器参数更新完都会失效, 需再次手动修改。

```bash
bash -c "$(curl -fsSLk https://zy.catni.cn/release/latest/upgrade.sh)"
```

::: details 点我查看脚本内容，便于代码审计
```bash:line-numbers
#!/bin/bash

echo "
  _       _                 
 | |     (_)                
 | |__    _   _ __    _   _ 
 | '_ \  | | | '_ \  | | | |
 | | | | | | | |_) | | |_| |
 |_| |_| |_| | .__/   \__, |
             | |       __/ |
             |_|      |___/ 
"

echo "相关项目信息:
前端: https://github.com/hjdhnx/hipy-ui
后端: [主]https://github.com/hjdhnx/hipy-server  [备]https://github.com/sanshu-rom/server-release
桌面: https://github.com/Hiram-Wong/ZyPlayer
教程: https://zy.catni.cn
源动力: https://www.sourcepower.top"
echo -e "\033[33m有偿咨询安装问题, 联系QQ:29794882\033[0m"
echo
echo "服务器推荐:
阿里云: 0元试用,首购低至0.9元/月起 https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=hlco4dmi
腾讯云: 2核2G3M云服务器7.92元/月起 https://curl.qcloud.com/jogYnC7h
京东云: 2核2G3M云服务器仅49元 https://3.cn/20Z-Xyf4"

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

qrcode_pay

echo -e "\033[33m[Hipy] 升级预计需 5 分钟(取决于网络), 使用该升级脚本前提必须使用配套的一键搭建\033[0m"

qrcode_qqgroup() {
    echo

    echo "█████████████████████████████"
    echo "██ ▄▄▄▄▄ █▀▀ ▀▀   ▄█ ▄▄▄▄▄ ██"
    echo "██ █   █ █▄▀█  █ ███ █   █ ██"
    echo "██ █▄▄▄█ █ ▄▀██ ▀  █ █▄▄▄█ ██"
    echo "██▄▄▄▄▄▄▄█ █ █▄█ █▄█▄▄▄▄▄▄▄██"
    echo "██▄▄▀ ██▄ ▀▀██ ▄█▄ ▀ ▄▄█▄▄▀██"
    echo "██▄▄ █▀█▄▄█▀▀█ ▀██▄ █▀ ██▄▄██"
    echo "██▄▄▄▀▀█▄█ ▀▄▄  ██▄▀  █ ▀▄ ██"
    echo "██▄▀▄▀▀ ▄▀▄ ▀ ▀▀▄█ ▀▀▄ █▄▀▄██"
    echo "██▄▄█▄█▄▄▄▀▄█▀▀▄▀  ▄▄▄  ▄█▀██"
    echo "██ ▄▄▄▄▄ █▄▄███▄▄  █▄█  ▀  ██"
    echo "██ █   █ █▀█▀▄▀▄▄█▄▄▄   ▀████"
    echo "██ █▄▄▄█ █▀███ ▀▄█▀▄█▄▄▀▄█▄██"
    echo "██▄▄▄▄▄▄▄▀▄▄█▄▄██▄▄▄▄▄███▄▄██"
    echo "█████████████████████████████"

    echo
    echo "QQ扫描上方二维码加入项目讨论组"
}

confirm() {
    echo -e -n "\033[34m[Hipy] $* \033[1;36m(Y/n)\033[0m"
    read -n 1 -s opt

    [[ "$opt" == $'\n' ]] || echo

    case "$opt" in
        'y' | 'Y' ) return 0;;
        'n' | 'N' ) return 1;;
        *) confirm "$1";;
    esac
}

info() {
    echo -e "\033[37m[Hipy] $*\033[0m"
}

warning() {
    echo -e "\033[33m[Hipy] $*\033[0m"
}

abort() {
    echo -e "\033[31m[Hipy] $*\033[0m"
	echo -e "\033[31m[Hipy] 查阅安装文档: https://zy.catni.cn/hipy-build.html\033[0m"
	echo -e "\033[31m[Hipy] 有偿咨询安装问题, 联系QQ:29794882\033[0m"
    exit 1
}

command_exists() {
    command -v "$1" 2>&1
}

check_container_health() {
    local container_name=$1
    local max_retry=30
    local retry=0
    local health_status="unhealthy"
    info "Waiting for $container_name to be healthy"
    while [[ "$health_status" == "unhealthy" && $retry -lt $max_retry ]]; do
        health_status=$(docker inspect --format='{{.State.Health.Status}}' $container_name 2>/dev/null || info 'unhealthy')
        sleep 5
        retry=$((retry+1))
    done
    if [[ "$health_status" == "unhealthy" ]]; then
        abort "Container $container_name is unhealthy"
    fi
    info "Container $container_name is healthy"
}

space_left() {
    dir="$1"
    while [ ! -d "$dir" ]; do
        dir=`dirname "$dir"`;
    done
    echo `df -h "$dir" --output='avail' | tail -n 1`
}

local_ips() {
    if [ -z `command_exists ip` ]; then
        ip_cmd="ip addr show"
    else
        ip_cmd="ifconfig -a"
    fi

    echo $($ip_cmd | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | awk '{print $2}')
}

get_average_delay() {
    local source=$1
    local total_delay=0
    local iterations=3

    for ((i = 0; i < iterations; i++)); do
        # check timeout
        if ! curl -o /dev/null -m 1 -s -w "%{http_code}\n" "$source" > /dev/null; then
            delay=999
        else
            delay=$(curl -o /dev/null -s -w "%{time_total}\n" "$source")
        fi
        total_delay=$(awk "BEGIN {print $total_delay + $delay}")
    done

    average_delay=$(awk "BEGIN {print $total_delay / $iterations}")
    echo "$average_delay"
}

install_docker() {
    curl -fsSL "https://zy.catni.cn/release/latest/get-docker.sh" -o get-docker.sh
    sources=(
        "https://mirrors.aliyun.com/docker-ce"
        "https://mirrors.tencent.com/docker-ce"
        "https://download.docker.com"
    )
    min_delay=${#sources[@]}
    selected_source=""
    for source in "${sources[@]}"; do
        average_delay=$(get_average_delay "$source")
        echo "source: $source, delay: $average_delay"
        if (( $(awk 'BEGIN { print '"$average_delay"' < '"$min_delay"' }') )); then
            min_delay=$average_delay
            selected_source=$source
        fi
    done

    echo "selected source: $selected_source"
    export DOWNLOAD_URL="$selected_source"
    bash get-docker.sh

    start_docker
    docker version > /dev/null 2>&1
    if [ $? -ne "0" ]; then
        echo "Docker 安装失败, 请检查网络连接或手动安装 Docker"
        echo "参考文档: https://docs.docker.com/engine/install/"
        abort "Docker 安装失败"
    fi
    info "Docker 安装成功"
}

start_docker() {
    systemctl enable docker
    systemctl daemon-reload
    systemctl start docker
}

config_docker_proxy() {
  cat <<EOF > /etc/docker/daemon.json
{
    "registry-mirrors": [
        "https://dockerproxy.net",
        "https://docker.1panel.live",
        "https://mirror.ccs.tencentyun.com",
        "https://registry.cn-hangzhou.aliyuncs.com",
        "https://hub.littlediary.com.cn",
        "https://hub.littlediary.cn",
        "https://hub.cloudyun.top",
        "https://dockerhub.timeweb.cloud",
        "https://huecker.io"
    ]
}
EOF
}

check_depend() {
    # CPU ssse3 指令集检查
    support_ssse3=1
    lscpu | grep ssse3 > /dev/null 2>&1
    if [ $? -ne "0" ]; then
        echo "not found info in lscpu"
        support_ssse3=0
    fi
    cat /proc/cpuinfo | grep ssse3 > /dev/null 2>&1
    if [ $support_ssse3 -eq "0" -a $? -ne "0" ]; then
      abort "hipy需要运行在支持 ssse3 指令集的 CPU 上，虚拟机请自行配置开启 CPU ssse3 指令集支持"
    fi

	which unzip > /dev/null 2>&1
	if [ $? -ne "0" ]; then
		info "请手动安装解压缩unzip环境后继续"
		abort "中止安装"
	else
		info "解压缩环境unzip已安装"
	fi

    if [ -z "$BASH" ]; then
        abort "请用 bash 执行本脚本"
    fi

    if [ ! -t 0 ]; then
        abort "STDIN 不是标准的输入设备"
    fi

    if [ "$EUID" -ne "0" ]; then
        abort "请以 root 权限运行"
    fi

    if [ -z `command_exists docker` ]; then
        warning "缺少 Docker 环境"
        if confirm "是否需要自动安装 Docker"; then
            install_docker
        else
            abort "中止安装"
        fi
    fi

    info "发现 Docker 环境: '`command -v docker`'"

    docker version > /dev/null 2>&1
    if [ $? -ne "0" ]; then
        abort "Docker 服务工作异常"
    fi

    compose_command="docker compose"
    if $compose_command version; then
        info "发现 Docker Compose Plugin"
    else
        warning "未发现 Docker Compose Plugin"
        if confirm "是否需要自动安装 Docker Compose Plugin"; then
            install_docker
            if [ $? -ne "0" ]; then
                abort "Docker Compose Plugin 安装失败"
            fi
            info "Docker Compose Plugin 安装完成"
        else
            abort "中止安装"
        fi
    fi

    # check docker compose support -d
    if ! $compose_command up -d --help > /dev/null 2>&1; then
        warning "Docker Compose Plugin 不支持 '-d' 参数"
        if confirm "是否需要自动升级 Docker Compose Plugin"; then
            install_docker
            if [ $? -ne "0" ]; then
                abort "Docker Compose Plugin 升级失败"
            fi
            info "Docker Compose Plugin 升级完成"
        else
            abort "中止安装"
        fi
    fi
	
	if confirm "是否需要配置Docker代理"; then      
		config_docker_proxy
	fi

    start_docker

    info "安装环境确认正常"
}

trap 'onexit' INT
onexit() {
    echo
    abort "用户手动结束安装"
}

replace_domain() {
    local directory="$1"
    local old_domain="$2"
    local new_domain="$3"

    # 使用sed命令替换文件中的域名
	sed -i "s#$old_domain#$new_domain#g" $(grep -rl "$old_domain" "$directory")
	sed -i "s#^API_DOMAIN=.*\$#API_DOMAIN=$new_domain#" ".env"

    info "域名已替换为: $new_domain"
}



get_env_var() {
    local var_name="$1"
    local env_file=".env"
    
    if [ -f "$env_file" ]; then
        # 使用grep查找匹配的行，然后用awk提取等号右边的部分
        value=$(grep "^$var_name=" "$env_file" | awk -F '=' '{print $2}' | xargs)
        export "$var_name=${value:-http://172.23.0.3:5707/}"
    fi
}

check_depend

container_id=$(docker ps -n 1 --filter name=.*hipy.* --format '{{.ID}}')
hipy_path=$(docker inspect --format '{{index .Config.Labels "com.docker.compose.project.working_dir"}}' $container_id)
ips=`local_ips`

while [ -z "$hipy_path" ]; do
    echo -e -n "\033[34m[Hipy] 未发现正在运行的hipy，请输入hipy安装路径 (留空则为 '$(pwd)'): \033[0m"
    read input_path
    [[ -z "$input_path" ]] && input_path=$(pwd)

    if [[ ! $input_path == /* ]]; then
        warning "'$input_path' 不是合法的绝对路径"
        continue
    fi

    hipy_path=$input_path
done

cd "$hipy_path"

compose_name=$(ls docker-compose.yaml compose.yaml 2>/dev/null)
compose_path=$hipy_path/$compose_name

if [ -f "$compose_path" ]; then
    info "发现位于 '$hipy_path' 的hipy环境"
else
    abort "没有发现位于 $hipy_path 的hipy环境"
fi

mv $compose_name $compose_name.old || true

curl "https://zy.catni.cn/release/latest/compose.yaml" -sSLk -o compose.yaml

if [ $? -ne "0" ]; then
    abort "下载 compose.yaml 脚本失败"
fi
info "下载 compose.yaml 脚本成功"

grep "HIPY_DIR" ".env" >/dev/null || echo "HIPY_DIR=$(pwd)" >>".env"
grep "FASTAPI_PORT" ".env" >/dev/null || echo "FASTAPI_PORT=5707" >>".env"
grep "VUE_PORT" ".env" >/dev/null || echo "VUE_PORT=8707" >>".env"
grep "SNIFFER_PORT" ".env" >/dev/null || echo "SNIFFER_PORT=5708" >>".env"
grep "POSTGRES_PASSWORD" ".env" >/dev/null || echo "POSTGRES_PASSWORD=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 32)" >>".env"
grep "REDIS_PASSWORD" ".env" >/dev/null || echo "REDIS_PASSWORD=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 32)" >>".env"
grep "SUBNET_PREFIX" ".env" >/dev/null || echo "SUBNET_PREFIX=172.23.0" >>".env"
grep "API_DOMAIN" ".env" >/dev/null || echo "API_DOMAIN=http://172.23.0.3:5707/" >>".env"
grep "GIT_PERMIT" ".env" >/dev/null || echo "GIT_PERMIT=" >>".env"
grep "GIT_USER" ".env" >/dev/null || echo "GIT_USER=" >>".env"
grep "GIT_TOKEN" ".env" >/dev/null || echo "GIT_TOKEN=" >>".env"
info "升级 .env 脚本成功"

info "即下载 github 加速hosts 文件"
mv /etc/hosts /etc/hosts.bak
curl "https://gitlab.com/ineo6/hosts/-/raw/master/hosts" -sSLk -o /etc/hosts -w "\nDownload complete. Total size: %{size_download} bytes. Speed: %{speed_download}\n"

rm -rf hipyTmp resources/fastapi resources/sniffer resources/vue
mkdir -p hipyTmp
if [ $? -ne "0" ]; then
    abort "创建 hipyTmp 临时目录失败"
fi
info "创建 hipyTmp 临时目录成功"

info "即将开始拉取 sniffer 最新代码"
mkdir -p resources/sniffer
curl "https://github.com/hjdhnx/hipy-sniffer/archive/refs/heads/main.zip" -sSLk -o ./hipyTmp/sniffer.zip -w "\nDownload complete. Total size: %{size_download} bytes. Speed: %{speed_download}\n"
unzip -q ./hipyTmp/sniffer.zip -d ./hipyTmp/sniffer
sed -i 's/"USE_CHROME": true,/"USE_CHROME": false,/g' ./hipyTmp/sniffer/hipy-sniffer-main/quart_config.json
mv ./hipyTmp/sniffer/hipy-sniffer-main/* ./resources/sniffer
touch "./resources/sniffer/nohup.out"

info "即将开始拉取 server 最新代码"
mkdir -p resources/fastapi
get_env_var "GIT_PERMIT"
if [[ $GIT_PERMIT -eq 1 ]]; then
	get_env_var "GIT_USER"
	get_env_var "GIT_TOKEN"
	info "识别到私仓权限, 走线路主"
	curl -H "Authorization: token $GIT_TOKEN" "https://github.com/hjdhnx/hipy-server/archive/refs/heads/master.zip" -sSLk -o ./hipyTmp/server.zip -w "\nDownload complete. Total size: %{size_download} bytes. Speed: %{speed_download}\n"
	unzip -q ./hipyTmp/server.zip -d ./hipyTmp/server
	mv ./hipyTmp/server/hipy-server-master/app/* ./resources/fastapi
else
	info "未识别到私仓权限, 走线路备"
	curl "https://github.com/sanshu-rom/server-release/releases/download/latest/hipy-server-latest.zip" -sSLk -o ./hipyTmp/server.zip -w "\nDownload complete. Total size: %{size_download} bytes. Speed: %{speed_download}\n"
	unzip -q ./hipyTmp/server.zip -d ./hipyTmp/server
	mv ./hipyTmp/server/hipy-server-latest/app/* ./resources/fastapi
fi
curl "https://zy.catni.cn/release/latest/.env" -sSLk -o ./resources/fastapi/configs/.env

info "即将开始拉取 vue 最新代码"
mkdir -p resources/vue
curl "https://zy.catni.cn/release/latest/vue.zip" -sSLk -o ./hipyTmp/vue.zip -w "\nDownload complete. Total size: %{size_download} bytes. Speed: %{speed_download}\n"
unzip -q ./hipyTmp/vue.zip -d ./hipyTmp/vue
mv ./hipyTmp/vue/* resources/vue/
get_env_var "API_DOMAIN"
replace_domain "./resources/vue" "http://172.23.0.3:5707/" "$API_DOMAIN"

info "即将还原系统hosts文件"
rm -rf /etc/hosts
mv /etc/hosts.bak /etc/hosts

info "即将开始重启 Docker 容器"

$compose_command down --remove-orphans && $compose_command up -d
if [ $? -ne "0" ]; then
    abort "重启 Docker 容器失败"
fi

qrcode_pay

check_container_health hipy-pg
check_container_health hipy-fastapi

info "hipy升级成功"

warning "安装成功, 请访问以下地址访问控制台"
warning "http://0.0.0.0:8707"
for ip in $ips; do
    warning http://$ip:8707
done
warning "如需域名访问, 请自行使用 nginx 反向代理"

# bash -c "$(curl -fsSLk https://zy.catni.cn/release/latest/upgrade.sh)"
```
:::

![一键升级](/otherShare/hipy-build/hipy-upgrade.png)

## 5. 手动修改通讯地址

### 5.1. 方法1

```bash
[1] cd 安装目录 # 默认安装路径: /data/hipy/
[2] cat .env # 查看当前API_DOMAIN域名
[3] old_domain=上一条命令查看的API_DOMAIN域名 # =前后不要空格
[4] new_domain=新的通讯地址 # =前后不要空格，必须以'http://'或'https://'开头，并以'/'结尾
[5] sed -i "s#$old_domain#$new_domain#g" $(grep -rl "$old_domain" "./resources/vue") # 修改vue目录下所有通讯字段
[6] sed -i "s#^API_DOMAIN=.*\$#API_DOMAIN=$new_domain#" ".env" # 修改.envAPI_DOMAIN字段 
[7] docker-compose restart # 重启容器 有些机器可能是 docker compose restart
```

### 5.2. 方法2

```bash
[1] cd 安装目录 # 默认安装路径: /data/hipy/
[2] vi .env API_DOMAIN字段 # 必须以'http://'或'https://'开头，并以'/'
[3] bash -c "$(curl -fsSLk https://zy.catni.cn/release/latest/upgrade.sh)" # 执行一键升级脚本
```

## 6. 反向代理

如需映射域名代理查看此章节

:::info 代理地址说明
如下均是默认端口，如自行修改请修改对应端口

前端: http协议 127.0.0.1:8707

后端: http协议 127.0.0.1:5707

嗅探器: http协议 127.0.0.1:5708
:::

### 6.1. 1Panel

> 网站 -> 网站 -> 创建网站 -> 反向代理 -> 主域名[代理域名]|代理地址 -> 确认

::: details 点我查看nginx内容，便于手动配置
```nginx
location ^~ / {
    proxy_pass http://127.0.0.1:8707; 
    proxy_set_header Host $host; 
    proxy_set_header X-Real-IP $remote_addr; 
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
    proxy_set_header REMOTE-HOST $remote_addr; 
    proxy_set_header Upgrade $http_upgrade; 
    proxy_set_header Connection "upgrade"; 
    proxy_set_header X-Forwarded-Proto $scheme; 
    proxy_http_version 1.1; 
    add_header X-Cache $upstream_cache_status; 
    add_header Cache-Control no-cache; 
}
```
:::

![代理](/otherShare/hipy-build/hipy-proxy-1panel.png)

### 6.2. 宝塔

> 网站 -> PHP项目 -> 添加站点 -> 域名|php版本[纯静态] -> 确定 -> 创建的站点 -> 反向代理 -> 添加反向代理 -> 开启代理|代理名称[随意]|目标 URL|发送域名[$host] -> 确定

::: details 点我查看nginx内容，便于手动配置
```nginx

#PROXY-START/

location ^~ /
{
    proxy_pass http://127.0.0.1:8707;
    proxy_set_header Host 127.0.0.1;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_http_version 1.1;
    # proxy_hide_header Upgrade;

    add_header X-Cache $upstream_cache_status;
    #Set Nginx Cache

    set $static_fileHPQ3IV8j 0;
    if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
    {
        set $static_fileHPQ3IV8j 1;
        expires 1m;
    }
    if ( $static_fileHPQ3IV8j = 0 )
    {
        add_header Cache-Control no-cache;
    }
}
#PROXY-END/
```
:::

![代理](/otherShare/hipy-build/hipy-proxy-bt-1.png)
![代理](/otherShare/hipy-build/hipy-proxy-bt-2.png)

## 7. 常见问题

由于每人机器性能和架构以及脚本兼容性不一样，可能会出现部分问题。

### 7.1. 安装报错

为了更好的体验脚本做了限制, 一般不支持主流命令的都是一般为小型洋垃圾cpu或者为小众服务器操作系统。

```bash
如下安装脚本为例|升级脚本同理

# 不支持ssee3指令集
[1]下载脚本 `wget https://zy.catni.cn/release/latest/setup.sh`
[2]修改脚本 `vi setup.sh`
    注释如下代码
    # CPU ssse3 指令集检查
    # support_ssse3=1
    # lscpu | grep ssse3 >/dev/null 2>&1
    # if [ $? -ne "0" ]; then
    #     echo "not found info in lscpu"
    #     support_ssse3=0
    # fi

    # cat /proc/cpuinfo | grep ssse3 >/dev/null 2>&1
    # if [ $support_ssse3 -eq "0" -a $? -ne "0" ]; then
    #     abort "hipy需要运行在支持 ssse3 指令集的 CPU 上，虚拟机请自行配置开启 CPU ssse3 指令集支持"
    # fi
[3]bash setup.sh

# 不支持docker compose
按照docker-compose v1 版本, 注意每个操作系统服务目录不一致, 这里不赘述, 自行查询操作系统路径, 如下为大多操作系统做法
[1] 下载并按照 `sudo curl -L https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose`
[2] 赋予执行权限 `sudo chmod +x /usr/local/bin/docker-compose`
[3] 重新运行脚本

# 不支持定时任务写入
注释掉定时任务写入
# CRON_COMMAND="*/30 * * * * docker restart hipy-sniffer"
# (crontab -l ; echo "$CRON_COMMAND") | crontab -
```

### 7.2. 首次登录提示账号密码错误

```bash
执行如下命令
docker exec hipy-fastapi python3 initial_data.py
```

### 7.3. 首次登录提示请求超时: timeout of 5000ms exceeded

多数为对自己机器ip不了解，导致设置前后端通讯地址设置错误从而不通。

参考篇章[手动修改通讯地址](hipy-build.html#_5-手动修改通讯地址)

### 7.4. 嗅探器激活失败

```bash
执行如下命令
curl http://127.0.0.1:5708/active
```

### 7.5. hipy-fastapi容器无限重启[172.32.0.4:5432密码错误]

> 生成的密码兼容性问题

- 方法一: 重新搭建
- 方法二: 停止docker编排文件, 手动修改.env的POSTGRES_PASSWORD字段密码, 删除resources/postgres/文件夹, 重启docker编排文件

### 7.6. 执行升级脚本提示找不到.env

- docker容器没有启动, 在安装目录下执行`docker-compose up -d`或者`docker compose up -d`自行分辨`docker-compose`版本
- 不是使用一键脚本安装, 卸载原有的, 使用一键脚本安装

### 7.7. 在线预览用不了

最新版本已解决, 自行更新。

同时数据源key必须是`hipy_t4`或`drpy_t4`开头.


### 7.8. 替换嗅探容器chrome

一键脚本安装的均是Chromium。

x86_64架构支持Chrome浏览器, arm架构不支持Chrome只能用Chromium。

```bash
[1] docker exec -it hipy-sniffer bash # 进入容器
[2] apt update # 更新源
[3] wget -O google-chrome-104.deb -c https://www.slimjet.com/chrome/download-chrome.php?file=files%2F104.0.5112.102%2Fgoogle-chrome-stable_current_amd64.deb # 下载deb包
[4] dpkg -i google-chrome-104.deb # 安装deb包
[5] google-chrome --version # 查看版本 Google Chrome 104.0.5112.101
[6] vi quart_config.json 修改USE_CHROME参数改为true
[7] exit # 退出容器
[8] docker restart hipy-sniffer # 重启容器
```

### 7.9. sniifer容器启用显示不支持限制内容 [Your kernel does not support swap limit capabilities or the cgroup is not mounted. Memory limited without swap.]

![内存限制报错](/otherShare/hipy-build/ubuntu-error-swap-1.png)

Ubuntu内核层未开启swap限制, 开启方式如下(Centos自行百度相关命令)

```bash
echo 'GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"' >> /etc/default/grub # 添加配置
update-grub # 重新生成grub
reboot # 重启生效
```
![内存限制解决](/otherShare/hipy-build/ubuntu-resove-swap-1.png)

### 7.10. wsl2网络问题 [wsl2 curl内容正常，同时wsl2和宿主机获取ip是同一个，宿主机上无法访问]

win10: [点我查看文档](https://github.com/HobaiRiku/wsl2-auto-portproxy)

win11: [点我查看文档](https://blog.csdn.net/qq_43283565/article/details/137374497)

### 7.11. docker编排问题 [有时候的指令是`docker-compose`，有时候是`docker compose`]

[官方文档](https://docs.docker.com/compose/install/linux/)提及: Compose分为V1和V2版本，安装方式分独立安装和插件安装。

|    | V1   | V2    |
|--------|--------|----------|
| standalone（独立式安装）  | docker-compose  | docker-compose |
| plugin（插件式安装）  |  没有安装成功   | docker compose   |

`docker compose`较新项目, 用于将`compose`与`docker`项目的其余部分一起迁移到 Go, [`docker/composev2`]存储库的分支。

`docker-compose`最初python项目, [`docker-composedocker/compose repo 的 v1`]现已被弃用，开发已转移到 v2。

### 7.12. 手动安装 docker

运行如下脚本，根据提示选择即可安装docker

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```

### 7.13. 手动搭建 docker hub

政策原因，导致无法直接拉取镜像

1. [基于Cloudflare Workers 搭建 Docker Hub 镜像加速](https://www.jcebing.com/archives/ji-yu-cloudflare-workers-da-jian-docker-hub-jing-xiang-jia-su)
2. [public-image-mirror(自建crproxy方法)](https://github.com/DaoCloud/crproxy/tree/master/examples/default)
3. [image-mirror(github actions 方法)](https://github.com/imdingtalk/image-mirror)
4. [渡渡鸟的容器镜像小站](https://docker.aityp.com/)
5. docker proxy

    3.1. 方法一

    ```bash
    # 如下代理信息尖括号<>中的内容需要替换为自己的代理服务器信息

    [1] mkdir -p  /etc/systemd/system/docker.service.d/
    [2] cat <<EOF >  /etc/systemd/system/docker.service.d/http-proxy.conf
        [Service]
        # 新增环境变量提供代理服务器信息
        Environment="HTTP_PROXY=http://<user>:<password>@<domain>:<port>"
        Environment="HTTPS_PROXY=http://<user>:<password>@<domain>:<port>"
        # 如果使用了国内镜像源可以配置镜像服务器不使用代理
        Environment="NO_PROXY=localhost,127.0.0.1,.coding.net,.tencentyun.com,.myqcloud.com,harbor.bsgchina.com"
        EOF
    [3] systemctl daemon-reload && systemctl restart docker
    ```

    3.2. 方法二

    ```bash
    # 如下代理信息尖括号<>中的内容需要替换为自己的代理服务器信息

    [1] vi /etc/docker/daemon.json
    {
        "registry-mirrors": ["..."],
        "proxies": {
            "http-proxy": "http://<user>:<password>@<domain>:<port>",
            "https-proxy": "http://<user>:<password>@<domain>:<port>",
            "no-proxy": "<registry.domain>"
        }
    }
    [2] systemctl daemon-reload && systemctl restart docker
    ```
6. 暂时还可用镜像地址

    ```bash
    [1] vi /etc/docker/daemon.json # 配置如下信息
    {
        "registry-mirrors": [
            "https://dockerproxy.net",
            "https://docker.1panel.live",
            "https://registry.cn-hangzhou.aliyuncs.com",
            "https://backbone.littlediary.cn:49443",
            "https://docker.m.daocloud.io", # 限速限流
        ]
    }
    [2] systemctl daemon-reload && systemctl restart docker
    ```

### 7.14. hipy-fastapi容器缺少git环境解决办法

由于政策原因重新build上传变得困难，请各位同学使用如下命令安装。最新安装和升级脚本中均已内置安装缺失依赖。

```bash
docker exec hipy-fastapi apt install git -y > /dev/null 2>&1
```

### 7.15. 关于 github 数据拉取失败

默认采用了镜像站拉取，如失败，请自行更换脚本中镜像站或者源github地址

常见镜像站
1. https://ghp.ci
2. https://kkgithub.com
3. https://gitclone.com
4. https://github.ur1.fun

hosts推荐
1. [Fetch GitHub Hosts](https://hosts.gitcdn.top)
2. [湖中剑](https://gitlab.com/ineo6/hosts/-/raw/master/hosts)

### 7.16. 旧数据怎么走道长私仓升级

仅部分高级用户拥有道长的邀请权限，其他用户别问。

```bash
[1] cd /data/hipy/ [实际安装目录以自己为准，默认为/data/hipy/]
[2] vi .env 添加或修改 如下参数
    GIT_PERMIT=1   1标识启用 0 标识不启用
    GIT_USER=xxxx  GitHub用户名
    GIT_TOKEN=xxxx GitHub密钥[需要给repo权限]
[3] 执行升级
```

## 8. 其他

- [ ] Linux基础: [点我查看鸟哥私房菜](https://linux.vbird.org/)
- [ ] Docker基础: [点我查看文档](https://www.cnblogs.com/jojoword/p/11078525.html)