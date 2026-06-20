<img title="" src="./icon.svg" alt="" data-align="left" width="242">

# Command+ API

> **v1.0.2 | Turn your terminal into an extensible developer toolbox / 把你的终端变成可扩展的开发工具箱**

> [!WARNING]
> **插件与主程序运行在同一个 Node.js 进程中。** 虽然 `ctx` 对象提供了上下文隔离，但它并非严格的安全沙箱。加载不可信的第三方插件可能存在安全风险（如任意代码执行）。请仅安装来自可信来源的插件，除非你确保此插件安全。<br />
> **Plugins run in the same Node.js process.** While the `ctx` object provides context isolation, it is NOT a strict security sandbox. Loading untrusted third-party plugins may pose security risks (e.g., arbitrary code execution). Only install plugins from trusted sources.

> **[License / 协议]** MIT

---

### **Language / 语言**

This document is available in multiple languages. <br />You can select a language and switch between them.


| [🇺🇸 English](#english) | [🇨🇳 简体中文](#简体中文) |

---

<a id="english"></a>

## 🇺🇸 English

### What is it?

Command+ API is a cross-platform CLI framework that turns your terminal into an extensible toolbox. It comes with a plugin system—install packages to add commands, or write your own in minutes.

### Why use it?

* **One command, infinite possibilities** — All features share the `c` prefix.
* **Plugin ecosystem** — Just drop `.js` files into the `lib/` folder to add new commands.
* **API-first design** — Some commands support JSON output for easy script parsing. Errors are routed to `stderr`, making it highly convenient for other programs to invoke.
* **Multilingual support** — The core program includes built-in support for English, Chinese, Spanish, and Russian. Plugin packages can further extend this.
* **Extremely lightweight** — The core code + `node_modules` is only about 1.5MB (uncompiled).
* **MIT License** — Free for commercial use.

### Installation

#### (Method 1) Direct Installation (Run after extraction)

Download the pre-compiled package for your platform from [Releases](https://github.com/GlassShadowX-studio/Command_plus_API/releases/):

* **Windows:** `c-win-x64.zip`
* **Linux:** `c-linux-x64.zip`
* **macOS:** `c-macos-x64.zip`

*Note: Release packages are automatically compiled via GitHub Actions. If you find they cannot run, you can try compiling them yourself (This is the author's first time using GitHub Actions, thank you for your understanding).*

After extraction, please refer to the "Add to System PATH" section below.

#### (Method 2) Compile from Source (Recommended)

**Requirements:** Node.js 16+ and npm

```bash
# Clone the repository
git clone https://github.com/GlassShadowX-studio/Command_plus_API.git
cd Command_plus_API

# Install dependencies
npm install

# Compile the executable (using 'pkg')
npm run build:win    # For Windows
npm run build:mac    # For macOS
npm run build:linux  # For Linux
```

The application will be generated in the `dist` folder.
*Note: The `lib/` folder is required at runtime. After compilation, please copy the `lib/` folder into the `dist/` folder. The `lib/` folder must be distributed alongside the executable.*

### Add to System PATH

**Windows (Run Command Prompt as Administrator):**

```cmd
:: Create a directory (e.g., install to C:\Program Files (x86)\command+ API)
mkdir "C:\Program Files (x86)\command+ API"

:: Copy files
copy c.exe "C:\Program Files (x86)\command+ API\"
xcopy lib "C:\Program Files (x86)\command+ API\lib\" /E

:: Add to PATH (Takes effect permanently)
setx PATH "%PATH%;C:\Program Files (x86)\command+ API"
```

*You need to restart your command line for the changes to take effect.*

**Linux / macOS:**

```bash
# Create a directory (e.g., ~/tools/cmd-plus)
mkdir -p ~/tools/cmd-plus

# Copy files
cp c ~/tools/cmd-plus/
cp -r lib ~/tools/cmd-plus/

# Add to PATH (Temporary)
export PATH="$PATH:~/tools/cmd-plus"

# Add to PATH (Permanent) - Add the following line to ~/.bashrc or ~/.zshrc
echo 'export PATH="$PATH:~/tools/cmd-plus"' >> ~/.bashrc
```

### Verify Installation

```bash
c --help
```

### Quick Start

```bash
c --help                    # View help
c config language en        # Switch to English
c manage list               # List installed plugin packages
c manage enable <name>      # Enable a package
c manage disable <name>     # Disable a package
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

### Documentation (More detailed tutorials)

📖 **Main Site:** https://wiki.hellowyq.com/docs/Command_API/install
📖 **Backup Site:** https://wangyqwiki.vercel.app/docs/Command_API/install

### License

MIT

---

<a id="简体中文"></a>

## 🇨🇳 简体中文

### 这是什么？

Command+ API 是一个跨平台命令行框架，它为你的终端加入了一个可扩展的命令。它内置插件系统，安装插件包即可添加命令，甚至可以自己用几分钟很容易地写一个扩展。

### 为什么用它？

* **一个命令，无限内容** —— 所有功能共用 `c` 前缀。
* **插件生态** —— 把 `.js` 文件放进 `lib/`，即可添加新命令。
* **API 优先设计** —— 部分命令支持输出 JSON 供脚本解析，错误用 `stderr`，其他程序调用本软件方便。
* **多语言支持** —— 主程序内置中、英、西、俄四语言，插件包可以继续扩展。
* **十分轻量** —— 核心代码+`node_modules`仅1.5MB(未编译)。
* **MIT协议** —— 你可以免费商业使用本软件。

### 安装软件

#### (方法一)直接安装(解压即可运行)

从 [Releases](https://github.com/GlassShadowX-studio/Command_plus_API/releases/) 下载对应平台的预编译包：

* **Windows：**`c-win-x64.zip`
* **Linux：**`c-linux-x64.zip`
* **macOS：**`c-macos-x64.zip`

*Releases 包由 Github Action 自动编译, 若您发现无法运行可尝试自行编译(本作者第一次用Github Action,感谢您的理解)*

解压后请往本文档下面看如何添加到Path。

#### (方法二)从源码编译(推荐)

**环境要求：** Node.js 16+ 和 npm

```bash
# 克隆仓库
git clone https://github.com/GlassShadowX-studio/Command_plus_API.git
cd Command_plus_API

# 安装依赖
npm install

# 编译可执行文件（使用 'pkg' 打包）
npm run build:win    # windows
npm run build:mac    # mac
npm run build:linux  # linux
```

之后会在 `dist` 文件夹生成应用。
*注意：运行时需要 `lib/` 文件夹，编译好后请将 `lib/` 文件夹复制到 `dist/` 文件夹，并且 `lib/` 文件夹需要和可执行文件放在一起。*

### 安装到系统 PATH

**Windows（以管理员身份运行命令提示符）：**

```cmd
:: 创建目录（例如安装到C:\Program Files (x86)\command+ API）
mkdir "C:\Program Files (x86)\command+ API"

:: 复制文件
copy c.exe "C:\Program Files (x86)\command+ API\"
xcopy lib "C:\Program Files (x86)\command+ API\lib\" /E

:: 添加到 PATH（永久生效）
setx PATH "%PATH%;C:\Program Files (x86)\command+ API"
```

*之后需要重启命令行生效。*

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

### 验证安装：

```bash
c --help
```

### 快速上手

```bash
c --help                    # 查看帮助
c config language en        # 切换为英文
c manage list               # 列出已安装的插件包
c manage enable <名称>      # 启用一个包
c manage disable <名称>     # 禁用一个包
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

### 软件文档(更详细的教程)

📖 **主站：** https://wiki.hellowyq.com/docs/Command_API/install
📖 **备用站：** https://wangyqwiki.vercel.app/docs/Command_API/install

### License/协议

MIT