const I18N = {
  en: {
    port_in_use: 'Port {port} is in use', port_free: 'free', error_port_range: 'Error: port must be between 1 and 65535',
    server_started: 'Server started at http://localhost:{port}/.\nServing directory: {cwd}', server_stopped: 'Server stopped.',
    http_error_url: 'Error: URL is required.',
    http_error_headers: 'Error: Invalid JSON format for headers.',
    http_saving: 'Saved to ./output',
    http_timeout: 'Request timed out',
    ip_scan_start: 'Scanning {count} hosts in {subnet}...',
    ip_scan_mode: 'Mode: {mode}',
    ip_scan_complete: 'Scan complete.',
    ip_active_hosts: 'Active hosts:',
    ip_no_hosts: 'No active hosts found.',
    ip_error_mask: 'Error: Subnet mask must be between 16 and 30',
    ip_error_ip: 'Error: Invalid IP address format'
  },
  zh: {
    port_in_use: '端口 {port} 已被占用', port_free: '空闲', error_port_range: '错误：端口必须在 1 到 65535 之间',
    server_started: '服务器已启动于 http://localhost:{port}/。\n服务目录：{cwd}', server_stopped: '服务器已停止。',
    http_error_url: '错误：缺少 URL 参数。',
    http_error_headers: '错误：headers 的 JSON 格式无效。',
    http_saving: '已保存到 ./output',
    http_timeout: '请求超时',
    ip_scan_start: '正在扫描 {subnet} 中的 {count} 个主机...',
    ip_scan_mode: '扫描模式: {mode}',
    ip_scan_complete: '扫描完成。',
    ip_active_hosts: '在线主机:',
    ip_no_hosts: '未发现在线主机。',
    ip_error_mask: '错误：子网掩码必须在 16 到 30 之间',
    ip_error_ip: '错误：无效的 IP 地址格式'
  },
  es: {
    port_in_use: 'El puerto {port} está en uso', port_free: 'libre', error_port_range: 'Error: el puerto debe ser entre 1 y 65535',
    server_started: 'Servidor iniciado en http://localhost:{port}/.\nDirectorio: {cwd}', server_stopped: 'Servidor detenido.',
    http_error_url: 'Error: Se requiere URL.',
    http_error_headers: 'Error: Formato JSON inválido para headers.',
    http_saving: 'Guardado en ./output',
    http_timeout: 'Tiempo de espera agotado',
    ip_scan_start: 'Escaneando {count} hosts en {subnet}...',
    ip_scan_mode: 'Modo: {mode}',
    ip_scan_complete: 'Escaneo completado.',
    ip_active_hosts: 'Hosts activos:',
    ip_no_hosts: 'No se encontraron hosts activos.',
    ip_error_mask: 'Error: La máscara de subred debe estar entre 16 y 30',
    ip_error_ip: 'Error: Formato de dirección IP inválido'
  },
  ru: {
    port_in_use: 'Порт {port} используется', port_free: 'свободен', error_port_range: 'Ошибка: порт должен быть от 1 до 65535',
    server_started: 'Сервер запущен на http://localhost:{port}/.\nДиректория: {cwd}', server_stopped: 'Сервер остановлен.',
    http_error_url: 'Ошибка: Требуется URL.',
    http_error_headers: 'Ошибка: Неверный JSON формат для headers.',
    http_saving: 'Сохранено в ./output',
    http_timeout: 'Время ожидания истекло',
    ip_scan_start: 'Сканирование {count} хостов в {subnet}...',
    ip_scan_mode: 'Режим: {mode}',
    ip_scan_complete: 'Сканирование завершено.',
    ip_active_hosts: 'Активные хосты:',
    ip_no_hosts: 'Активные хосты не найдены.',
    ip_error_mask: 'Ошибка: Маска подсети должна быть от 16 до 30',
    ip_error_ip: 'Ошибка: Неверный формат IP-адреса'
  }
};

function t(key, args = {}, lang = 'en') {
  let str = I18N[lang] && I18N[lang][key] ? I18N[lang][key] : (I18N.en[key] || key);
  for (const k in args) str = str.replace(`{${k}}`, args[k]);
  return str;
}

module.exports = [
  {
    name: 'http',
    description: { en: 'HTTP server and client utility', zh: 'HTTP 服务器与客户端工具', es: 'Utilidad de servidor y cliente HTTP', ru: 'Утилита HTTP-сервера и клиента' },
    help: {
      en: `c http [arguments]\n\nDESCRIPTION:\n Starts a local static file server or sends HTTP GET requests.\n\nSUBCOMMANDS:\n server [port] Start a minimalist HTTP static file server.\n get <url> [timeout] [headers] [mode]\n Send an HTTP GET request.\n\nARGUMENTS (for get):\n url Target URL (http/https).\n timeout (Optional) Max wait time in ms. Default: 10000.\n headers (Optional) JSON string of headers.\n mode (Optional) "print" (default, stdout) or "output" (save to ./output).\n\nEXAMPLES:\n c http server 8080\n c http get https://api.github.com\n c http get http://example.com 5000 "{'Accept':'application/json'}" output`,
      zh: `c http [参数]\n\n功能描述:\n 启动本地静态文件服务器或发送 HTTP GET 请求。\n\n子命令列表:\n server [端口] 启动极简 HTTP 静态文件服务器。\n get <url> [超时] [表头] [模式]\n 发送 HTTP GET 请求。\n\n参数说明 (get):\n url 目标 URL (支持 http/https)。\n 超时 (可选) 最长等待时间(毫秒)。默认: 10000。\n 表头 (可选) JSON 格式的 Headers 字符串。\n 模式 (可选) "print" (默认，输出到控制台) 或 "output" (保存到 ./output 文件)。\n\n使用示例:\n c http server 8080\n c http get https://api.github.com\n c http get http://example.com 5000 "{'Accept':'application/json'}" output`,
      es: `c http [argumentos]\n\nDESCRIPCIÓN:\n Inicia un servidor de archivos estáticos o envía peticiones HTTP GET.\n\nSUBCOMANDOS:\n server [puerto] Iniciar servidor HTTP estático.\n get <url> [timeout] [headers] [modo]\n Enviar petición HTTP GET.\n\nARGUMENTOS (para get):\n url URL objetivo.\n timeout (Opcional) Tiempo máximo en ms. Default: 10000.\n headers (Opcional) Cadena JSON de cabeceras.\n modo (Opcional) "print" (stdout) o "output" (guardar en ./output).\n\nEJEMPLOS:\n c http server 8080\n c http get https://api.github.com`,
      ru: `c http [аргументы]\n\nОПИСАНИЕ:\n Запускает локальный сервер или отправляет HTTP GET запросы.\n\nПОДКОМАНДЫ:\n server [порт] Запустить HTTP-сервер.\n get <url> [таймаут] [заголовки] [режим]\n Отправить HTTP GET запрос.\n\nАРГУМЕНТЫ (для get):\n url Целевой URL.\n таймаут (Опц.) Макс. время ожидания в мс. По умолч: 10000.\n заголовки (Опц.) JSON строка заголовков.\n режим (Опц.) "print" (stdout) или "output" (сохранить в ./output).\n\nПРИМЕРЫ:\n c http server 8080\n c http get https://api.github.com`
    },
    run: async function(args, ctx) {
      const subCmd = args[0];
      
      if (subCmd === 'server') {
        let port = 80;
        if (args.length > 1) { 
          const p = parseInt(args[1], 10); 
          if (!isNaN(p) && p > 0 && p <= 65535) port = p; 
        }
        const cwd = process.cwd();
        const server = ctx.http.createServer((req, res) => {
          const parsedUrl = ctx.url.parse(req.url, true);
          let pathname = decodeURIComponent(parsedUrl.pathname);
          const resolvedPath = ctx.path.resolve(cwd, '.' + pathname);
          
          const relative = ctx.path.relative(cwd, resolvedPath);
          if (relative.startsWith('..') || ctx.path.isAbsolute(relative)) { 
             res.writeHead(403); res.end('403 Forbidden'); return; 
          }

          ctx.fs.stat(resolvedPath, (err, stats) => {
            if (err) { res.writeHead(404); res.end('404 Not Found'); return; }
            if (stats.isDirectory()) {
              let indexPath = ctx.path.join(resolvedPath, 'index.html');
              if (ctx.fs.existsSync(indexPath)) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                ctx.fs.createReadStream(indexPath).pipe(res);
              } else {
                const files = ctx.fs.readdirSync(resolvedPath);
                const items = files.map(f => { 
                  const st = ctx.fs.statSync(ctx.path.join(resolvedPath, f)); 
                  return { name: f, isDir: st.isDirectory(), size: st.size, mtime: st.mtime }; 
                }).sort((a, b) => (a.isDir === b.isDir ? a.name.localeCompare(b.name) : (a.isDir ? -1 : 1)));
                
                const safePath = resolvedPath.substring(cwd.length).replace(/\\/g, '/') || '/';
                
                let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Index of ${safePath}</title>
<style>
:root {
  --bg-color: #f4f4f5;
  --card-bg: #ffffff;
  --text-primary: #18181b;
  --text-secondary: #71717a;
  --border-color: #e4e4e7;
  --hover-bg: #f4f4f5;
  --link-color: #3f3f46;
  --link-hover: #09090b;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
  margin: 0;
  padding: 40px 20px;
  line-height: 1.5;
}
.container {
  max-width: 960px;
  margin: 0 auto;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
h1 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  letter-spacing: -0.025em;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
th, td {
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}
th {
  background-color: #fafafa;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}
th:last-child, td:last-child {
  text-align: right;
}
tr:last-child td {
  border-bottom: none;
}
tr:hover {
  background-color: var(--hover-bg);
}
a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.15s ease;
}
a:hover {
  color: var(--link-hover);
  text-decoration: underline;
}
/* 图标相关样式 (优雅降级) */
.icon-container {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 45px;
}
.icon-feather {
  display: none; /* 默认隐藏，防止离线时出现空白占位 */
  width: 18px;
  height: 18px;
}
.icon-fallback {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}
/* 当 feather.js 加载成功时，隐藏文本，显示 SVG */
body.feather-loaded .icon-fallback {
  display: none;
}
body.feather-loaded svg.feather {
  display: inline-block;
  width: 18px;
  height: 18px;
  stroke-width: 2;
}
/* 为不同类型的图标设置专属颜色，提升美观度 */
body.feather-loaded svg.feather-folder { color: #d97706; } /* 文件夹：琥珀黄 */
body.feather-loaded svg.feather-file { color: #2563eb; }   /* 文件：蓝色 */
body.feather-loaded svg.feather-arrow-up { color: var(--text-secondary); } /* 返回：灰色 */

.size, .mtime {
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}
</style>
</head>
<body>
<div class="container">
<h1>Index of ${safePath}</h1>
<table>
<thead>
<tr>
<th>Name</th>
<th>Size</th>
<th>Modified</th>
</tr>
</thead>
<tbody>
`;
                if (safePath !== '/') {
                  const pathParts = safePath.split('/').filter(p => p.length > 0);
                  pathParts.pop();
                  // 修复：如果 pathParts 为空，则直接返回 '/'，避免生成 '//' 导致 about:blank#blocked
                  const upHref = pathParts.length > 0 ? '/' + pathParts.join('/') + '/' : '/'; 
                  html += `
  <tr>
    <td>
      <span class="icon-container">
        <i data-feather="arrow-up" class="icon-feather"></i>
        <span class="icon-fallback">[UP]</span>
      </span>
      <a href="${upHref}">..</a>
    </td>
    <td class="size">-</td>
    <td class="mtime">-</td>
  </tr>
`;
                }
                for (const item of items) {
                  const href = ctx.path.join(safePath, item.name).replace(/\\/g, '/') + (item.isDir ? '/' : '');
                  const size = item.isDir ? '-' : (item.size / 1024).toFixed(2) + ' KB';
                  const mtime = new Date(item.mtime).toISOString().replace('T', ' ').substring(0, 19);
                  
                  // 动态判断使用 folder 还是 file 图标
                  const iconName = item.isDir ? 'folder' : 'file';
                  const typeLabel = item.isDir ? '[DIR]' : '[FILE]';
                  
                  html += `
    <tr>
      <td>
        <span class="icon-container">
          <i data-feather="${iconName}" class="icon-feather"></i>
          <span class="icon-fallback">${typeLabel}</span>
        </span>
        <a href="${href}">${item.name}</a>
      </td>
      <td class="size">${size}</td>
      <td class="mtime">${mtime}</td>
    </tr>
`; 
                } 
                html += `</tbody>
</table>
</div>
<!-- 引入 Feathericons，加载成功后触发 onload 替换图标并切换 CSS 状态 -->
<script src="https://cdn.bootcdn.net/ajax/libs/feather-icons/4.29.2/feather.min.js" onload="document.body.classList.add('feather-loaded'); feather.replace();"></script>
</body>
</html>`;
                res.writeHead(200, { 'Content-Type': 'text/html' }); 
                res.end(html);
              }
            } else {
              const stream = ctx.fs.createReadStream(resolvedPath);
              res.writeHead(200); 
              stream.pipe(res);
            }
          });
        });
        
        server.on('error', (err) => { 
          if (err.code === 'EADDRINUSE') console.error(t('port_in_use', { port }, ctx.state.lang)); 
          process.exit(1); 
        });
        server.listen(port, () => console.log(t('server_started', { port, cwd }, ctx.state.lang)));
        
        let isShuttingDown = false;
        const shutdown = () => {
          if (isShuttingDown) return;
          isShuttingDown = true;
          
          // 1. 使用 try-catch 防止终端关闭时 console.log 抛出 EPIPE 错误导致退出流程中断
          try {
            console.log('\n' + t('server_stopped', {}, ctx.state.lang));
          } catch (e) {}
          
          // 2. Node.js 18.2.0+ 支持强制关闭所有连接，防止 Keep-Alive 导致 server.close() 阻塞
          if (typeof server.closeAllConnections === 'function') {
            server.closeAllConnections();
          }
          
          server.close(() => { 
            process.exit(0); 
          });
          
          // 3. 强制兜底退出，缩短延迟以确保快速响应并释放端口
          setTimeout(() => { 
            process.exit(0); 
          }, 500); 
        };
        process.on('SIGINT', shutdown);
        if (process.platform === 'win32') process.on('SIGBREAK', shutdown);
        return;
      }

      if (subCmd === 'get') {
        let url = args[1];
        if (!url) { console.error(t('http_error_url', {}, ctx.state.lang)); process.exit(1); }
        if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'http://' + url;

        const timeout = args[2] ? (parseInt(args[2], 10) || 10000) : 10000;
        let headers = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36' };
        
        if (args[3]) {
          let hStr = args[3];
          if (hStr.startsWith("'") && hStr.endsWith("'")) hStr = hStr.slice(1, -1);
          hStr = hStr.replace(/'/g, '"');
          try { headers = JSON.parse(hStr); } 
          catch (e) { 
            console.error(t('http_error_headers', {}, ctx.state.lang));
            process.exit(1); 
          }
        }
        
        const mode = args[4] || 'print';
        const lib = url.startsWith('https') ? ctx.https : ctx.http;

        try {
          const result = await new Promise((resolve) => {
            const req = lib.get(url, { headers, timeout }, (res) => {
              let data = '';
              res.setEncoding('utf8');
              res.on('data', (chunk) => data += chunk);
              res.on('end', () => resolve({ return: String(res.statusCode), text: data }));
            });
            req.setTimeout(timeout, () => { req.destroy(); resolve({ return: 'TIMEOUT', text: t('http_timeout', {}, ctx.state.lang) }); });
            req.on('error', (e) => { resolve({ return: 'ERROR', text: e.message }); });
          });
          
          const outStr = JSON.stringify(result);
          if (mode === 'output') {
            ctx.fs.writeFileSync('./output', outStr, 'utf-8');
            console.log(t('http_saving', {}, ctx.state.lang));
          } else {
            console.log(outStr);
          }
        } catch (e) {
          console.error(`Error: ${e.message}`);
          process.exit(1);
        }
        return;
      }

      console.log(ctx.coreT('help_type_cmd').replace('<command>', 'http'));
    }
  },
  {
    name: 'ip',
    description: { en: 'Show network IP information', zh: '显示网络 IP 信息', es: 'Mostrar información de IP de red', ru: 'Показать сетевую IP информацию' },
    help: {
      en: `c ip [-list]\nc ip find [subnet] [-s|-u] [-list]\n\nDESCRIPTION:\n Displays local network interfaces and IP addresses.\n 'find' scans a local subnet for active hosts.\n\nARGUMENTS (find):\n subnet Target subnet (Default: 192.168.1.0/24).\n -s TCP Connect scan (simulates SYN).\n -u (Default) UDP ping scan (fallback to system ping).\n -list Output as pure JSON array ["ip1", "ip2"].\n\nEXAMPLES:\n c ip\n c ip -list\n c ip find\n c ip find 10.0.0.0/24 -s -list`,
      zh: `c ip [-list]\nc ip find [网段] [-s|-u] [-list]\n\n功能描述:\n 显示本地网络接口和 IP 地址。\n 'find' 子命令用于扫描局域网内在线的主机。\n\n参数说明 (find):\n 网段 目标网段 (默认: 192.168.1.0/24)。\n -s TCP 连接扫描 (模拟 SYN 扫描)。\n -u (默认) UDP ping 扫描 (回退至系统 ping)。\n -list 以纯 JSON 数组格式输出 ["ip1", "ip2"]。\n\n使用示例:\n c ip\n c ip -list\n c ip find\n c ip find 10.0.0.0/24 -s -list`,
      es: `c ip [-list]\nc ip find [subred] [-s|-u] [-list]\n\nDESCRIPCIÓN:\n Muestra interfaces de red locales y direcciones IP.\n 'find' escanea una subred local en busca de hosts activos.\n\nARGUMENTOS (find):\n subred Subred objetivo (Predeterminado: 192.168.1.0/24).\n -s Escaneo TCP Connect (simula SYN).\n -u (Predeterminado) Escaneo UDP ping (usa el ping del sistema).\n -list Salida como array JSON puro ["ip1", "ip2"].\n\nEJEMPLOS:\n c ip\n c ip -list\n c ip find\n c ip find 10.0.0.0/24 -s -list`,
      ru: `c ip [-list]\nc ip find [подсеть] [-s|-u] [-list]\n\nОПИСАНИЕ:\n Отображает локальные сетевые интерфейсы и IP-адреса.\n 'find' сканирует локальную подсеть на наличие активных хостов.\n\nАРГУМЕНТЫ (find):\n подсеть Целевая подсеть (По умолчанию: 192.168.1.0/24).\n -s TCP Connect сканирование (имитация SYN).\n -u (По умолч.) UDP ping сканирование (системный ping).\n -list Вывод в виде чистого JSON массива ["ip1", "ip2"].\n\nПРИМЕРЫ:\n c ip\n c ip -list\n c ip find\n c ip find 10.0.0.0/24 -s -list`
    },
    run: async function(args, ctx) {
      if (args[0] === 'find') {
        let subnet = '192.168.1.0/24'; 
        let useUdp = true;             
        let asList = false;
        for (let i = 1; i < args.length; i++) {
          if (args[i] === '-s') useUdp = false;
          else if (args[i] === '-u') useUdp = true;
          else if (args[i] === '-list') asList = true;
          else if (args[i].includes('/')) subnet = args[i]; 
        }
        
        const [baseIp, maskStr] = subnet.split('/');
        const mask = parseInt(maskStr, 10);
        if (isNaN(mask) || mask < 16 || mask > 30) {
          console.error(t('ip_error_mask', {}, ctx.state.lang));
          process.exit(1);
        }
        
        const ipParts = baseIp.split('.').map(Number);
        if (ipParts.length !== 4 || ipParts.some(isNaN)) {
          console.error(t('ip_error_ip', {}, ctx.state.lang));
          process.exit(1);
        }
        
        const startIpNum = (ipParts[0] << 24) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3];
        const networkNum = startIpNum & (~((1 << (32 - mask)) - 1));
        const firstHost = networkNum + 1;
        const lastHost = networkNum + (1 << (32 - mask)) - 2;
        
        const targets = [];
        for (let i = firstHost; i <= lastHost; i++) {
          targets.push(`${(i >> 24) & 255}.${(i >> 16) & 255}.${(i >> 8) & 255}.${i & 255}`);
        }
        
        const activeHosts = [];
        const concurrency = 50;
        
        if (!asList) {
          console.log(t('ip_scan_start', { count: targets.length, subnet }, ctx.state.lang));
          console.log(t('ip_scan_mode', { mode: useUdp ? 'UDP Ping (System ICMP)' : 'TCP Connect (Simulated SYN + Common Ports)' }, ctx.state.lang));
        }
        
        const scanHost = async (ip) => {
          return new Promise((resolve) => {
            if (useUdp) {
              const isWin = process.platform === 'win32';
              const cmd = isWin ? `ping -n 1 -w 500 ${ip}` : `ping -c 1 -W 1 ${ip}`;
              ctx.child_process.exec(cmd, (err) => {
                resolve(err ? null : ip);
              });
            } else {
              const ports = [80, 443, 22, 3389, 135, 139, 445, 53, 8080];
              let resolved = false;
              let activeCount = 0;
              
              const finish = (isUp) => {
                if (!resolved) {
                  resolved = true;
                  resolve(isUp ? ip : null);
                }
              };
              
              ports.forEach(port => {
                const socket = ctx.net.connect({ host: ip, port: port, timeout: 600 });
                socket.on('connect', () => { socket.destroy(); finish(true); });
                socket.on('error', (err) => {
                  socket.destroy();
                  if (err.code === 'ECONNREFUSED') {
                    finish(true); 
                  } else {
                    activeCount++;
                    if (activeCount === ports.length && !resolved) finish(false);
                  }
                });
                socket.on('timeout', () => {
                  socket.destroy();
                  activeCount++;
                  if (activeCount === ports.length && !resolved) finish(false);
                });
              });
            }
          });
        };
        
        for (let i = 0; i < targets.length; i += concurrency) {
          const batch = targets.slice(i, i + concurrency);
          const results = await Promise.all(batch.map(scanHost));
          const found = results.filter(r => r !== null);
          activeHosts.push(...found);
          
          if (!asList) {
            process.stdout.write(`\rProgress: ${Math.min(i + concurrency, targets.length)}/${targets.length} | Found: ${activeHosts.length}`);
          }
        }
        
        const ipToNum = ip => ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
        activeHosts.sort((a, b) => ipToNum(a) - ipToNum(b));
        
        if (!asList) {
          console.log('\n' + t('ip_scan_complete', {}, ctx.state.lang));
          if (activeHosts.length > 0) {
            console.log(t('ip_active_hosts', {}, ctx.state.lang));
            activeHosts.forEach(ip => console.log(`  ${ip}`));
          } else {
            console.log(t('ip_no_hosts', {}, ctx.state.lang));
          }
        } else {
          console.log(JSON.stringify(activeHosts));
        }
        return;
      }

      const interfaces = ctx.os.networkInterfaces();
      const ipv4 = [];
      const ipv6 = []; 
      for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
          if (!iface.internal) {
            if (iface.family === 'IPv4' || iface.family === 4) {
              ipv4.push({ ip: iface.address, name });
            } else if (iface.family === 'IPv6' || iface.family === 6) {
              ipv6.push({ ip: iface.address, name });
            }
          }
        }
      }
      if (args.includes('-list')) { 
        console.log(JSON.stringify(ipv4.map(i => i.ip))); 
        return; 
      }
      
      console.log(`Hostname: ${ctx.os.hostname()}`);
      if (ipv4.length > 0) {
        console.log('IPv4 Addresses:');
        ipv4.forEach(i => console.log(`  ${i.ip} (${i.name})`));
      }
      if (ipv6.length > 0) {
        console.log('IPv6 Addresses:');
        ipv6.forEach(i => console.log(`  ${i.ip} (${i.name})`));
      }
      if (ipv4.length === 0 && ipv6.length === 0) {
        console.log('No active network interfaces found.');
      }
    }
  },
  {
    name: 'port',
    description: { en: 'Check port availability and process info', zh: '检查端口可用性及进程信息', es: 'Verificar disponibilidad de puerto', ru: 'Проверка доступности порта' },
    help: {
      en: `c port <number>\n\nDESCRIPTION:\n Checks if a specific TCP port is currently occupied.\n\nARGUMENTS:\n number Port number to check (1-65535).\n\nEXAMPLES:\n c port 80 -> Checks if port 80 is free or in use`,
      zh: `c port <数字>\n\n功能描述:\n 检查特定 TCP 端口当前是否被占用。\n\n参数说明:\n 数字 要检查的端口号 (1-65535)。\n\n使用示例:\n c port 80 -> 检查 80 端口是否空闲或被占用`,
      es: `c port <número>\n\nDESCRIPCIÓN:\n Verifica si un puerto TCP específico está ocupado.\n\nARGUMENTOS:\n número Número de puerto a verificar (1-65535).\n\nEJEMPLOS:\n c port 80 -> Verifica si el puerto 80 está libre`,
      ru: `c port <число>\n\nОПИСАНИЕ:\n Проверяет, занят ли конкретный TCP-порт.\n\nАРГУМЕНТЫ:\n число Номер порта для проверки (1-65535).\n\nПРИМЕРЫ:\n c port 80 -> Проверяет, свободен ли порт 80`
    },
    run: async function(args, ctx) {
      const port = parseInt(args[0], 10);
      if (isNaN(port) || port < 1 || port > 65535) {
        console.error(t('error_port_range', {}, ctx.state.lang));
        process.exit(1);
      }
      const server = ctx.net.createServer();
      server.once('error', (err) => { 
        if (err.code === 'EADDRINUSE') {
          try {
            let pid = '';
            if (process.platform === 'win32') {
              const out = ctx.child_process.execSync(`netstat -ano | findstr LISTENING | findstr :${port}`).toString();
              pid = out.trim().split(/\s+/).pop();
            } else {
              pid = ctx.child_process.execSync(`lsof -t -i:${port} || ss -lptn 'sport = :${port}' | grep -oP 'pid=\\K\\d+'`).toString().trim().split('\n')[0];
            }
            if(pid) console.log(`${t('port_in_use', { port }, ctx.state.lang)} (PID: ${pid})`);
            else console.log(t('port_in_use', { port }, ctx.state.lang));
          } catch(e) { 
            console.log(t('port_in_use', { port }, ctx.state.lang)); 
          }
        } else {
           console.error(`Error: ${err.message}`);
        }
        process.exit(0); 
      });
      
      server.once('listening', () => { 
        server.close(); 
        console.log(t('port_free', {}, ctx.state.lang)); 
        process.exit(0); 
      });
      
      server.listen(port); 
    }
  }
];


// ==========================================
// 插件市场元数据 (Plugin Market Metadata)
// ==========================================
module.exports.information = {
  module_name: {
    "zh": "网络",
    "en": "Network & Web Tools",
    "es": "Network & Web Tools",
    "ru": "Network & Web Tools"
  },
  module_other: {
    "zh": "",
    "en": "",
    "es": "",
    "ru": ""
  },
  file_name: "web.js",
  module_v: "1.0.4",
  module_commandapi_v: "1.0.2",
  module_lang: ['en', 'zh', 'es', 'ru'],
  module_writer: "Wangyq(Wanyyq)",
  module_tag: ['Network', 'HTTP', 'IP', 'Port', 'Scanner'],
  module_platform: ['linux', 'windows', 'mac', 'other'],
  module_create: "2026-01-05",
  module_update: "2026-06-23",
  module_express: {
    "zh": "网络与 Web 工具集，内置极简静态 HTTP 服务器、HTTP GET 请求客户端、局域网 IP 扫描器以及 TCP 端口占用检测工具。",
    "en": "Network and Web toolkit featuring a minimalist static HTTP server, HTTP GET client, LAN IP scanner, and TCP port availability checker.",
    "es": "Conjunto de herramientas de red y web con un servidor HTTP estático minimalista, cliente HTTP GET, escáner de IP LAN y verificador de puertos TCP.",
    "ru": "Набор сетевых и веб-инструментов с минималистичным статическим HTTP-сервером, HTTP GET клиентом, сканером IP в локальной сети и проверкой занятости TCP-портов."
  }
};