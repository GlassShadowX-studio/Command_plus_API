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
             
             // 完整修复后的 Logo SVG
             const logoSvg = `<svg width="24" height="24" viewBox="0 0 310 340" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-34 -19)"><path d="M344 247.833C344 258.419 335.419 267 324.833 267L299.167 267C288.581 267 280 258.419 280 247.833L280 130.167C280 119.581 288.581 111 299.167 111L324.833 111C335.419 111 344 119.581 344 130.167Z" fill="#14833B"/><path d="M304 277.833C304 288.419 295.419 297 284.833 297L259.167 297C248.581 297 240 288.419 240 277.833L240 100.167C240 89.5812 248.581 81 259.167 81L284.833 81C295.419 81 304 89.5812 304 100.167Z" fill="#199E47"/><path d="M263 299.833C263 310.419 254.419 319 243.833 319L218.167 319C207.581 319 199 310.419 199 299.833L199 78.1668C199 67.5813 207.581 59 218.167 59L243.833 59C254.419 59 263 67.5813 263 78.1668Z" fill="#1DB954"/><path d="M214 320.833C214 331.419 205.419 340 194.833 340L169.167 340C158.581 340 150 331.419 150 320.833L150 57.1667C150 46.5812 158.581 38 169.167 38L194.833 38C205.419 38 214 46.5812 214 57.1667Z" fill="#1ED760"/><path d="M172 338.833C172 349.419 163.419 358 152.833 358L127.167 358C116.581 358 108 349.419 108 338.833L108 38.1666C108 27.5812 116.581 19 127.167 19L152.833 19C163.419 19 172 27.5812 172 38.1666Z" fill="#1FF06C"/><g transform="matrix(1.00543 0 0 1 34 97)"><path d="M15.3333 99.82 15.3333 115C15.3333 153.333 30.6667 168.667 69 168.667L115 168.667C153.333 168.667 168.667 153.333 168.667 115L168.667 69C168.667 30.6667 153.333 15.3333 115 15.3333L69 15.3333C30.6667 15.3333 15.3333 30.6667 15.3333 69" stroke="#169141" stroke-width="11.5" stroke-linecap="round" stroke-linejoin="round" fill="#FFFFFF"/><path d="M110.398 73.6008 73.597 73.6008 73.597 110.401 110.398 110.401 110.398 73.6008Z" stroke="#169141" stroke-width="11.5" stroke-linecap="round" stroke-linejoin="round" fill="#FFFFFF"/><path d="M59.7999 137.999C67.3899 137.999 73.5998 131.789 73.5998 124.199L73.5998 110.399 59.7999 110.399C52.2099 110.399 46 116.609 46 124.199 46 131.789 52.2099 137.999 59.7999 137.999Z" stroke="#169141" stroke-width="11.5" stroke-linecap="round" stroke-linejoin="round" fill="#FFFFFF"/><path d="M59.7999 73.6001 73.5998 73.6001 73.5998 59.7999C73.5998 52.2099 67.3899 46 59.7999 46 52.2099 46 46 52.2099 46 59.7999 46 67.3899 52.2099 73.6001 59.7999 73.6001Z" stroke="#169141" stroke-width="11.5" stroke-linecap="round" stroke-linejoin="round" fill="#FFFFFF"/><path d="M110.403 73.6001 124.203 73.6001C131.793 73.6001 138.003 67.3899 138.003 59.7999 138.003 52.2099 131.793 46 124.203 46 116.613 46 110.403 52.2099 110.403 59.7999L110.403 73.6001Z" stroke="#169141" stroke-width="11.5" stroke-linecap="round" stroke-linejoin="round" fill="#FFFFFF"/><path d="M124.203 137.999C131.793 137.999 138.003 131.789 138.003 124.199 138.003 116.609 131.793 110.399 124.203 110.399L110.403 110.399 110.403 124.199C110.403 131.789 116.613 137.999 124.203 137.999Z" stroke="#169141" stroke-width="11.5" stroke-linecap="round" stroke-linejoin="round" fill="#FFFFFF"/></g></g></svg>`;

             const icons = {
               folder: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`,
               file: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`,
               up: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>`
             };

             let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Index of ${safePath}</title>
<style>
@font-face {
  font-family: 'Google Sans Flex';
  src: url('./lib/google_sans_flex.woff') format('woff');
  font-weight: 100 900;
  font-display: swap;
}
:root {
  --bg: #fff; --bg-card: #fff; --bg-elevated: #fafafa; --bg-hover: #f5f5f5;
  --border: #eaeaea; --border-hover: #999; --text-primary: #000;
  --text-secondary: #666; --text-tertiary: #888; --accent: #000;
  --accent-text: #fff; --success: #0070f3; --success-bg: rgba(0,112,243,.1);
  --shadow: 0 4px 12px rgba(0,0,0,.04); --shadow-lg: 0 10px 40px rgba(0,0,0,.08);
  --radius: 10px; --radius-lg: 16px;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  background: var(--bg); color: var(--text-primary);
  font-family: 'Google Sans Flex', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px; line-height: 1.6; -webkit-font-smoothing: antialiased; min-height: 100vh;
}
a { color: inherit; text-decoration: none; }

/* Nav */
nav {
  position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,.85);
  backdrop-filter: saturate(180%) blur(12px); -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-container {
  max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 56px;
  display: flex; align-items: center; justify-content: space-between;
}
.logo { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 15px; letter-spacing: -.02em; }
.nav-breadcrumb {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;
}
.nav-breadcrumb .sep { color: var(--border-hover); }
.nav-breadcrumb .current { color: var(--text-primary); font-weight: 500; }

/* Hero */
.hero { max-width: 1200px; margin: 0 auto; padding: 48px 24px 24px; }
h1 {
  font-size: clamp(32px, 5vw, 56px); font-weight: 700; letter-spacing: -.04em;
  line-height: 1.1; color: var(--text-primary); margin-bottom: 12px;
}
.hero-subtitle { font-size: 15px; color: var(--text-secondary); margin-bottom: 32px; }

/* 1. 完全复刻 index.css 的 plugins-grid 卡片网格 */
.plugins-grid {
  max-width: 1200px; margin: 0 auto; padding: 0 24px 48px;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;
}

/* 2. 完全复刻 plugin-card 的 UI 与 放大动画 */
.file-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 24px; display: flex; flex-direction: column; gap: 16px;
  transition: border-color .2s ease, transform .3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow .3s ease;
  cursor: pointer; position: relative; overflow: hidden;
  /* 入场放大弹跳动画 */
  animation: cardEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}
/* 核心：Hover 放大效果 (满足您的偏好) */
.file-card:hover {
  border-color: var(--border-hover);
  transform: scale(1.08);
  box-shadow: var(--shadow-lg);
}
.file-card:active { transform: translateY(-2px) scale(1.01); }

.card-icon {
  width: 48px; height: 48px; border-radius: 12px; background: var(--bg-elevated);
  border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
  color: var(--text-secondary); transition: all .3s ease;
}
/* Hover 时图标跟随放大并旋转 */
.file-card:hover .card-icon {
  transform: scale(1.2) rotate(-7deg);
}
.card-icon svg { width: 24px; height: 24px; stroke-width: 1.5; }
.icon-folder { color: #d97706; }
.icon-file { color: #2563eb; }

.card-title { font-size: 16px; font-weight: 600; letter-spacing: -.02em; color: var(--text-primary); word-break: break-all; }
.card-meta { display: flex; flex-direction: column; gap: 4px; margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border); }
.meta-row { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-tertiary); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
.meta-label { font-weight: 500; color: var(--text-secondary); }

/* Footer */
footer {
  padding: 40px 24px; text-align: center; color: var(--text-tertiary);
  font-size: 13px; position: relative; max-width: 1200px; margin: 0 auto;
}
footer::before {
  content: ''; display: block; height: 2px;
  background: linear-gradient(90deg, #0070f3 0%, #00c4ff 20%, #ff00c8 40%, #ffbd00 60%, #0070f3 80%, #00c4ff 100%);
  background-size: 200% 100%; animation: gradientFlow 6s linear infinite;
  margin-bottom: 40px; border-radius: 2px;
}
@keyframes gradientFlow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }

/* 3. 模拟 GSAP 的交错入场放大动画 */
@keyframes cardEnter {
  0% { opacity: 0; transform: translateY(30px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@media (max-width: 768px) {
  .nav-container { padding: 0 16px; }
  .hero { padding: 32px 16px 16px; }
  .plugins-grid { grid-template-columns: 1fr; padding: 0 16px 32px; }
}
</style>
</head>
<body>
<nav>
  <div class="nav-container">
    <div class="logo">${logoSvg}<span>Command+ API</span></div>
    <div class="nav-breadcrumb">
      <span>Server</span><span class="sep">/</span><span class="current">${safePath}</span>
    </div>
  </div>
</nav>

<div class="hero">
  <h1>Directory Index</h1>
  <p class="hero-subtitle">Browsing local workspace files securely.</p>
</div>

<div class="plugins-grid">
`;
             let itemIndex = 0;
             if (safePath !== '/') {
               const pathParts = safePath.split('/').filter(p => p.length > 0);
               pathParts.pop();
               const upHref = pathParts.length > 0 ? '/' + pathParts.join('/') + '/' : '/'; 
               html += `
  <a href="${upHref}" class="file-card" style="animation-delay: ${itemIndex * 0.05}s">
    <div class="card-icon icon-up">${icons.up}</div>
    <div class="card-title">..</div>
    <div class="card-meta">
      <div class="meta-row"><span class="meta-label">Type</span><span>Parent Directory</span></div>
    </div>
  </a>
`;
               itemIndex++;
             }
             for (const item of items) {
               const href = ctx.path.join(safePath, item.name).replace(/\\/g, '/') + (item.isDir ? '/' : '');
               const size = item.isDir ? '-' : (item.size / 1024).toFixed(2) + ' KB';
               const mtime = new Date(item.mtime).toISOString().replace('T', ' ').substring(0, 19);
               const icon = item.isDir ? icons.folder : icons.file;
               const iconClass = item.isDir ? 'icon-folder' : 'icon-file';
               
               html += `
  <a href="${href}" class="file-card" style="animation-delay: ${itemIndex * 0.05}s">
    <div class="card-icon ${iconClass}">${icon}</div>
    <div class="card-title">${item.name}</div>
    <div class="card-meta">
      <div class="meta-row"><span class="meta-label">Size</span><span>${size}</span></div>
      <div class="meta-row"><span class="meta-label">Modified</span><span>${mtime}</span></div>
    </div>
  </a>
`;
               itemIndex++;
             }
             html += `
</div>

<footer>
  <p>Command+ API Static Server · v1.1.0</p>
</footer>
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
  module_icon:"network",
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
  module_v: "1.0.5",
  module_commandapi_v: "1.0.2",
  module_lang: ['en', 'zh', 'es', 'ru'],
  module_writer: "Wanyyq",
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