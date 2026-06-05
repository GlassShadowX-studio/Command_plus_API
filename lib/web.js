const I18N = {
  en: {
    port_in_use: 'Port {port} is in use', port_free: 'free', error_port_range: 'Error: port must be between 1 and 65535',
    server_started: 'Server started at http://localhost:{port}/.\nServing directory: {cwd}', server_stopped: 'Server stopped.'
  },
  zh: {
    port_in_use: '端口 {port} 已被占用', port_free: '空闲', error_port_range: '错误：端口必须在 1 到 65535 之间',
    server_started: '服务器已启动于 http://localhost:{port}/。\n服务目录：{cwd}', server_stopped: '服务器已停止。'
  },
  es: {
    port_in_use: 'El puerto {port} está en uso', port_free: 'libre', error_port_range: 'Error: el puerto debe ser entre 1 y 65535',
    server_started: 'Servidor iniciado en http://localhost:{port}/.\nDirectorio: {cwd}', server_stopped: 'Servidor detenido.'
  },
  ru: {
    port_in_use: 'Порт {port} используется', port_free: 'свободен', error_port_range: 'Ошибка: порт должен быть от 1 до 65535',
    server_started: 'Сервер запущен на http://localhost:{port}/.\nДиректория: {cwd}', server_stopped: 'Сервер остановлен.'
  }
};

function t(key, args = {}, lang = 'en') {
  let str = I18N[lang] && I18N[lang][key] ? I18N[lang][key] : (I18N.en[key] || key);
  for (const k in args) str = str.replace(`{${k}}`, args[k]);
  return str;
}

module.exports = [
  {
    name: 'http.server',
    description: { en: 'Start a minimalist HTTP static file server', zh: '启动极简 HTTP 静态文件服务器', es: 'Iniciar servidor HTTP estático minimalista', ru: 'Запуск минималистичного HTTP-сервера' },
    help: {
      en: `c http.server [port]\n\nDESCRIPTION:\n  Starts a local web server with a beautiful grid UI for directory browsing.\n\nARGUMENTS:\n  port  (Optional) Port number to bind. Default is 80.\n\nEXAMPLES:\n  c http.server         -> Starts on http://localhost:80\n  c http.server 3000    -> Starts on http://localhost:3000`,
      zh: `c http.server [端口]\n\n功能描述:\n  启动带有极简网格 UI 的本地 Web 服务器，方便浏览目录。\n\n参数说明:\n  端口  (可选) 绑定的端口号。默认为 80。\n\n使用示例:\n  c http.server         -> 在 http://localhost:80 启动\n  c http.server 3000    -> 在 http://localhost:3000 启动`,
      es: `c http.server [puerto]\n\nDESCRIPCIÓN:\n  Inicia un servidor web local con una UI de cuadrícula hermosa.\n\nARGUMENTOS:\n  puerto  (Opcional) Número de puerto. Por defecto 80.\n\nEJEMPLOS:\n  c http.server         -> Inicia en http://localhost:80\n  c http.server 3000    -> Inicia en http://localhost:3000`,
      ru: `c http.server [порт]\n\nОПИСАНИЕ:\n  Запускает локальный веб-сервер с красивым сетчатым UI.\n\nАРГУМЕНТЫ:\n  порт  (Опционально) Номер порта. По умолчанию 80.\n\nПРИМЕРЫ:\n  c http.server         -> Запуск на http://localhost:80\n  c http.server 3000    -> Запуск на http://localhost:3000`
    },
    run: async function(args, ctx) {
      let port = 80;
      if (args.length > 0) { const p = parseInt(args[0], 10); if (!isNaN(p) && p > 0 && p <= 65535) port = p; }
      const cwd = process.cwd();
      const server = ctx.http.createServer((req, res) => {
        const parsedUrl = ctx.url.parse(req.url, true);
        let pathname = decodeURIComponent(parsedUrl.pathname);
        const resolvedPath = ctx.path.resolve(cwd, '.' + pathname);
        
        // 修复：使用 path.relative 进行严格的路径穿越校验
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
              const items = files.map(f => { const st = ctx.fs.statSync(ctx.path.join(resolvedPath, f)); return { name: f, isDir: st.isDirectory(), size: st.size, mtime: st.mtime }; }).sort((a, b) => (a.isDir === b.isDir ? a.name.localeCompare(b.name) : a.isDir ? -1 : 1));
              const safePath = resolvedPath.substring(cwd.length).replace(/\\/g, '/') || '/';
              let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Index of ${safePath}</title><style>body{background-color:#f5f5f5;background-image:linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px);background-size:24px 24px;color:#333;font-family:sans-serif;margin:0;padding:40px 20px}.container{max-width:960px;margin:0 auto;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border:1px solid #eaeaea;overflow:hidden}header{padding:24px 32px;border-bottom:1px solid #f0f0f0}h1{margin:0;font-size:1.1rem;font-weight:600;color:#666}h1 span{color:#0066cc}table{width:100%;border-collapse:collapse}th{text-align:left;padding:14px 32px;color:#999;font-size:0.8rem;text-transform:uppercase;border-bottom:2px solid #f5f5f5}td{padding:14px 32px;border-bottom:1px solid #fafafa;font-size:0.95rem}tr:hover{background-color:#fcfcfc}a{color:#333;text-decoration:none;display:flex;align-items:center;gap:12px}a:hover{color:#0066cc}.icon{width:20px;text-align:center;opacity:0.7}.dir .icon{color:#f5a623;opacity:1}.size,.date{color:#888;font-family:monospace;font-size:0.85rem}</style></head><body><div class="container"><header><h1>Index of <span>${safePath}</span></h1></header><table><thead><tr><th>Name</th><th>Size</th><th>Modified</th></tr></thead><tbody>`;
              if (safePath !== '/') html += `<tr class="dir"><td><a href=".."><span class="icon">⬆️</span> ..</a></td><td></td><td></td></tr>`;
              for (const item of items) {
                const href = ctx.path.join(safePath, item.name).replace(/\\/g, '/') + (item.isDir ? '/' : '');
                const size = item.isDir ? '-' : (item.size / 1024).toFixed(2) + ' KB';
                const mtime = new Date(item.mtime).toISOString().replace('T', ' ').substring(0, 19);
                html += `<tr class="${item.isDir ? 'dir' : 'file'}"><td><a href="${href}"><span class="icon">${item.isDir ? '📁' : '📄'}</span> ${item.name}</a></td><td class="size">${size}</td><td class="date">${mtime}</td></tr>`;
              }
              html += `</tbody></table></div></body></html>`;
              res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(html);
            }
          } else {
            const stream = ctx.fs.createReadStream(resolvedPath);
            res.writeHead(200); stream.pipe(res);
          }
        });
      });
      server.on('error', (err) => { if (err.code === 'EADDRINUSE') console.error(t('port_in_use', { port }, ctx.state.lang)); process.exit(1); });
      server.listen(port, () => console.log(t('server_started', { port, cwd }, ctx.state.lang)));
      process.on('SIGINT', () => { console.log('\n' + t('server_stopped', {}, ctx.state.lang)); server.close(() => process.exit(0)); });
    }
  },
  {
    name: 'ip',
    description: { en: 'Show network IP information', zh: '显示网络 IP 信息', es: 'Mostrar información de IP de red', ru: 'Показать сетевую IP информацию' },
    help: {
      en: `c ip [-list]\n\nDESCRIPTION:\n  Displays local network interfaces and IP addresses (IPv4 & IPv6).\n\nARGUMENTS:\n  -list  (Optional) Outputs IPv4 addresses as a pure JSON array.\n\nEXAMPLES:\n  c ip         -> Shows detailed Hostname and IPv4/IPv6 info\n  c ip -list   -> ["192.168.1.100", "10.0.0.5"]`,
      zh: `c ip [-list]\n\n功能描述:\n  显示本地网络接口和 IP 地址 (包含 IPv4 与 IPv6)。\n\n参数说明:\n  -list  (可选) 以纯 JSON 数组形式输出 IPv4 地址。\n\n使用示例:\n  c ip         -> 显示详细的主机名和 IPv4/IPv6 信息\n  c ip -list   -> ["192.168.1.100", "10.0.0.5"]`,
      es: `c ip [-list]\n\nDESCRIPCIÓN:\n  Muestra interfaces de red locales y direcciones IP (IPv4 y IPv6).\n\nARGUMENTOS:\n  -list  (Opcional) Devuelve direcciones IPv4 como array JSON.\n\nEJEMPLOS:\n  c ip         -> Muestra Hostname e info IPv4/IPv6\n  c ip -list   -> ["192.168.1.100", "10.0.0.5"]`,
      ru: `c ip [-list]\n\nОПИСАНИЕ:\n  Отображает локальные сетевые интерфейсы и IP-адреса (IPv4 и IPv6).\n\nАРГУМЕНТЫ:\n  -list  (Опционально) Выводит IPv4 адреса как JSON массив.\n\nПРИМЕРЫ:\n  c ip         -> Показывает имя хоста и IPv4/IPv6\n  c ip -list   -> ["192.168.1.100", "10.0.0.5"]`
    },
    run: async function(args, ctx) {
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
      if (args.includes('-list')) { console.log(JSON.stringify(ipv4.map(i => i.ip))); return; }
      
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
      en: `c port <number>\n\nDESCRIPTION:\n  Checks if a specific TCP port is currently occupied.\n\nARGUMENTS:\n  number  Port number to check (1-65535).\n\nEXAMPLES:\n  c port 80      -> Checks if port 80 is free or in use`,
      zh: `c port <数字>\n\n功能描述:\n  检查特定 TCP 端口当前是否被占用。\n\n参数说明:\n  数字  要检查的端口号 (1-65535)。\n\n使用示例:\n  c port 80      -> 检查 80 端口是否空闲或被占用`,
      es: `c port <número>\n\nDESCRIPCIÓN:\n  Verifica si un puerto TCP específico está ocupado.\n\nARGUMENTOS:\n  número  Número de puerto a verificar (1-65535).\n\nEJEMPLOS:\n  c port 80      -> Verifica si el puerto 80 está libre`,
      ru: `c port <число>\n\nОПИСАНИЕ:\n  Проверяет, занят ли конкретный TCP-порт.\n\nАРГУМЕНТЫ:\n  число  Номер порта для проверки (1-65535).\n\nПРИМЕРЫ:\n  c port 80      -> Проверяет, свободен ли порт 80`
    },
    run: async function(args, ctx) {
      const port = parseInt(args[0], 10); 
      if (isNaN(port) || port < 1 || port > 65535) { console.error(t('error_port_range', {}, ctx.state.lang)); process.exit(1); }
      
      const server = ctx.net.createServer();
      server.once('error', (err) => { 
        if (err.code === 'EADDRINUSE') {
          try {
            let pid = '';
            if (process.platform === 'win32') {
              const out = ctx.child_process.execSync(`netstat -ano | findstr LISTENING | findstr :${port}`).toString();
              pid = out.trim().split(/\s+/).pop();
            } else {
              pid = ctx.child_process.execSync(`lsof -t -i:${port} || ss -lptn 'sport = :${port}' | grep -oP 'pid=\K\d+'`).toString().trim().split('\n')[0];
            }
            if(pid) console.log(`${t('port_in_use', { port }, ctx.state.lang)} (PID: ${pid})`);
            else console.log(t('port_in_use', { port }, ctx.state.lang));
          } catch(e) { console.log(t('port_in_use', { port }, ctx.state.lang)); }
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