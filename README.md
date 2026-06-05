![](./icon.svg)

# Command+ API

> v1.0.0 | 把你的终端变成可扩展的开发工具箱

## 🌐 语言 / Language

| [🇺🇸 English](#english) | [🇨🇳 简体中文](#简体中文) | [🇪🇸 Español](#español) | [🇷🇺 Русский](#русский) |
| ------------------------ | ------------------ | ------------------------ | ------------------------ |

---

<a id="english"></a>

## 🇺🇸 English

### What is it?

**Command+ API** is a cross-platform CLI framework that turns your terminal into an extensible toolbox. It comes with a plugin system—install packages to add commands, or write your own in minutes.

**Why use it?**

- **One command, endless tools** — All features share the same `c` prefix
- **Plugin ecosystem** — Drop `.js` files into `lib/`, instantly add new commands
- **API-first design** — Outputs JSON for scripts, errors go to stderr
- **Multi-language** — Built-in English, Chinese, Spanish, Russian
- **No runtime dependencies** — Pre-built binary available, no Node.js required

**What can you do with plugins?**

The base framework only includes `help`, `config`, and `manage`. Install community plugins to get commands like `time`, `uuid`, `hash`, `json`, `find`, `tree`, `zip`, `http.server`, `ip`, `port`, and many more. Or write your own!

### Build from Source

**Prerequisites:** Node.js 16+ and npm

```bash
# Clone the repository
git clone https://github.com/yourname/cmd-plus.git
cd cmd-plus

# Install dependencies
npm install

# Build executable (uses 'pkg' to bundle Node.js)
npm run build
```

After build, you'll find:

- **Windows:** `c.exe` in the project root
- **Linux:** `c` in the project root

The `lib/` folder is also required at runtime—copy it together with the executable.

### Install to System PATH

**Windows (Command Prompt as Administrator):**

```cmd
# Create a directory (e.g., C:\tools\cmd-plus)
mkdir C:\tools\cmd-plus

# Copy files
copy c.exe C:\tools\cmd-plus\
xcopy lib C:\tools\cmd-plus\lib\ /E

# Add to PATH (permanently)
setx PATH "%PATH%;C:\tools\cmd-plus"
```

**Windows (PowerShell as Administrator):**

```powershell
# Create directory
New-Item -ItemType Directory -Path "C:\tools\cmd-plus" -Force

# Copy files
Copy-Item c.exe -Destination "C:\tools\cmd-plus\"
Copy-Item -Recurse lib -Destination "C:\tools\cmd-plus\"

# Add to PATH
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\tools\cmd-plus", "User")
```

**Linux / macOS:**

```bash
# Create directory (e.g., ~/tools/cmd-plus)
mkdir -p ~/tools/cmd-plus

# Copy files
cp c ~/tools/cmd-plus/
cp -r lib ~/tools/cmd-plus/

# Add to PATH (temporary)
export PATH="$PATH:~/tools/cmd-plus"

# Add to PATH (permanent) - add the line below to ~/.bashrc or ~/.zshrc
echo 'export PATH="$PATH:~/tools/cmd-plus"' >> ~/.bashrc
```

**Verify installation:**

```bash
c help
```

### User Install (No Build)

Download the pre-built binary from [Releases](https://github.com/yourname/cmd-plus/releases) for your platform:

- Windows: `cmd-plus-windows-x64.zip`
- Linux: `cmd-plus-linux-x64.tar.gz`
- macOS: `cmd-plus-darwin-x64.tar.gz`

Extract and follow the PATH setup steps above.

### Quick Start

```bash
c help              # Show help
c config language zh   # Switch to Chinese
c manage list       # List installed plugin packages
c manage enable <name>   # Enable a package
c manage disable <name>  # Disable a package
```

### Write Your First Plugin

Create `lib/hello.js`:

```javascript
module.exports = {
  name: 'hello',
  description: { en: 'Say hello', zh: '打招呼' },
  run: async (args, ctx) => {
    console.log('Hello World!');
  }
};
```

Run it:

```bash
c hello
```

### Documentation

📖 **Main site:** https://wiki.hellowyq.com/docs/Command_API/install

📖 **Mirror:** https://wangyqwiki.vercel.app/docs/Command_API/install

The documentation includes: User Guide, Plugin Development Guide, Command Reference, and more.

---

<a id="简体中文"></a>

## 🇨🇳 简体中文

### 这是什么？

**Command+ API** 是一个跨平台命令行框架，把你的终端变成可扩展的工具箱。它内置插件系统——安装插件包即可添加命令，或自己花几分钟写一个。

**为什么用它？**

- **一个命令，无限工具** —— 所有功能共用 `c` 前缀
- **插件生态** —— 把 `.js` 文件放进 `lib/`，立即添加新命令
- **API 优先设计** —— 输出 JSON 供脚本解析，错误走 stderr
- **多语言支持** —— 内置中、英、西、俄四语言
- **无需运行时** —— 提供预编译二进制，不需要安装 Node.js

**能用插件做什么？**

基础框架只包含 `help`、`config`、`manage` 三个命令。安装社区插件包后，可获得 `time`、`uuid`、`hash`、`json`、`find`、`tree`、`zip`、`http.server`、`ip`、`port` 等大量实用命令。你也可以自己写！

### 从源码编译

**环境要求：** Node.js 16+ 和 npm

```bash
# 克隆仓库
git clone https://github.com/yourname/cmd-plus.git
cd cmd-plus

# 安装依赖
npm install

# 编译可执行文件（使用 'pkg' 打包 Node.js）
npm run build
```

编译完成后：

- **Windows：** 项目根目录下生成 `c.exe`
- **Linux：** 项目根目录下生成 `c`

运行时需要 `lib/` 文件夹，请与可执行文件一起复制。

### 安装到系统 PATH

**Windows（以管理员身份运行命令提示符）：**

```cmd
# 创建目录（例如 C:\tools\cmd-plus）
mkdir C:\tools\cmd-plus

# 复制文件
copy c.exe C:\tools\cmd-plus\
xcopy lib C:\tools\cmd-plus\lib\ /E

# 添加到 PATH（永久生效）
setx PATH "%PATH%;C:\tools\cmd-plus"
```

**Windows（以管理员身份运行 PowerShell）：**

```powershell
# 创建目录
New-Item -ItemType Directory -Path "C:\tools\cmd-plus" -Force

# 复制文件
Copy-Item c.exe -Destination "C:\tools\cmd-plus\"
Copy-Item -Recurse lib -Destination "C:\tools\cmd-plus\"

# 添加到 PATH
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\tools\cmd-plus", "User")
```

**Linux / macOS：**

```bash
# 创建目录（例如 ~/tools/cmd-plus）
mkdir -p ~/tools/cmd-plus

# 复制文件
cp c ~/tools/cmd-plus/
cp -r lib ~/tools/cmd-plus/

# 添加到 PATH（临时生效）
export PATH="$PATH:~/tools/cmd-plus"

# 添加到 PATH（永久生效）- 将下面这行加入 ~/.bashrc 或 ~/.zshrc
echo 'export PATH="$PATH:~/tools/cmd-plus"' >> ~/.bashrc
```

**验证安装：**

```bash
c help
```

### 用户安装（无需编译）

从 [Releases](https://github.com/yourname/cmd-plus/releases) 下载对应平台的预编译包：

- Windows：`cmd-plus-windows-x64.zip`
- Linux：`cmd-plus-linux-x64.tar.gz`
- macOS：`cmd-plus-darwin-x64.tar.gz`

解压后按上述 PATH 配置步骤操作。

### 快速上手

```bash
c help                    # 查看帮助
c config language en      # 切换为英文
c manage list             # 列出已安装的插件包
c manage enable <名称>    # 启用一个包
c manage disable <名称>   # 禁用一个包
```

### 编写第一个插件

创建 `lib/hello.js`：

```javascript
module.exports = {
  name: 'hello',
  description: { en: 'Say hello', zh: '打招呼' },
  run: async (args, ctx) => {
    console.log('Hello World!');
  }
};
```

运行它：

```bash
c hello
```

### 文档

📖 **主站：** https://wiki.hellowyq.com/docs/Command_API/install

📖 **备用站：** https://wangyqwiki.vercel.app/docs/Command_API/install

文档包含：使用教程、插件开发指南、命令参考等。

---

<a id="español"></a>

## 🇪🇸 Español

### ¿Qué es?

**Command+ API** es un framework CLI multiplataforma que convierte tu terminal en una caja de herramientas extensible. Incluye un sistema de plugins—instala paquetes para añadir comandos o escribe los tuyos en minutos.

**¿Por qué usarlo?**

- **Un comando, infinitas herramientas** — Todas las funciones comparten el prefijo `c`
- **Ecosistema de plugins** — Archivos `.js` en `lib/` añaden comandos al instante
- **Diseño API-first** — Salida JSON para scripts, errores a stderr
- **Multilingüe** — Inglés, chino, español, ruso integrados
- **Sin dependencias** — Binario precompilado, no requiere Node.js

### Compilación desde código fuente

**Requisitos:** Node.js 16+ y npm

```bash
git clone https://github.com/yourname/cmd-plus.git
cd cmd-plus
npm install
npm run build
```

### Instalación

**Windows (PowerShell como Administrador):**

```powershell
New-Item -ItemType Directory -Path "C:\tools\cmd-plus" -Force
Copy-Item c.exe -Destination "C:\tools\cmd-plus\"
Copy-Item -Recurse lib -Destination "C:\tools\cmd-plus\"
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\tools\cmd-plus", "User")
```

**Linux:**

```bash
mkdir -p ~/tools/cmd-plus
cp c ~/tools/cmd-plus/
cp -r lib ~/tools/cmd-plus/
echo 'export PATH="$PATH:~/tools/cmd-plus"' >> ~/.bashrc
```

### Inicio rápido

```bash
c help
c config language es
c manage list
```

### Documentación

📖 **Sitio principal:** https://wiki.hellowyq.com/docs/Command_API/install

📖 **Espejo:** https://wangyqwiki.vercel.app/docs/Command_API/install

---

<a id="русский"></a>

## 🇷🇺 Русский

### Что это?

**Command+ API** — это кросс-платформенный CLI-фреймворк, превращающий терминал в расширяемый инструментарий. Встроенная система плагинов — устанавливайте пакеты для добавления команд или пишите свои за минуты.

**Почему стоит использовать?**

- **Одна команда, бесконечные инструменты** — Все функции используют префикс `c`
- **Экосистема плагинов** — Файлы `.js` в `lib/` мгновенно добавляют команды
- **API-ориентированный дизайн** — Вывод JSON для скриптов, ошибки в stderr
- **Многоязычность** — Встроен английский, китайский, испанский, русский
- **Без зависимостей** — Предварительно собранный бинарник, Node.js не требуется

### Сборка из исходников

**Требования:** Node.js 16+ и npm

```bash
git clone https://github.com/yourname/cmd-plus.git
cd cmd-plus
npm install
npm run build
```

### Установка

**Linux:**

```bash
mkdir -p ~/tools/cmd-plus
cp c ~/tools/cmd-plus/
cp -r lib ~/tools/cmd-plus/
echo 'export PATH="$PATH:~/tools/cmd-plus"' >> ~/.bashrc
```

### Быстрый старт

```bash
c help
c config language ru
c manage list
```

### Документация

📖 **Основной сайт:** https://wiki.hellowyq.com/docs/Command_API/install

📖 **Зеркало:** https://wangyqwiki.vercel.app/docs/Command_API/install

---

## License

MIT
