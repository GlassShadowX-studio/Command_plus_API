const I18N = {
  en: {
    port_in_use: 'Port {port} is in use', port_free: 'free', error_port_range: 'Error: port must be between 1 and 65535',
    server_started: 'Server started at http://localhost:{port}/.\nServing directory: {cwd}', server_stopped: 'Server stopped.',
    http_error_url: 'Error: URL is required.',
    http_error_headers: 'Error: Invalid JSON format for headers.',
    http_saving: 'Saved to ./output',
    http_timeout: 'Request timed out'
  },
  zh: {
    port_in_use: '端口 {port} 已被占用', port_free: '空闲', error_port_range: '错误：端口必须在 1 到 65535 之间',
    server_started: '服务器已启动于 http://localhost:{port}/。\n服务目录：{cwd}', server_stopped: '服务器已停止。',
    http_error_url: '错误：缺少 URL 参数。',
    http_error_headers: '错误：headers 的 JSON 格式无效。',
    http_saving: '已保存到 ./output',
    http_timeout: '请求超时'
  },
  es: {
    port_in_use: 'El puerto {port} está en uso', port_free: 'libre', error_port_range: 'Error: el puerto debe ser entre 1 y 65535',
    server_started: 'Servidor iniciado en http://localhost:{port}/.\nDirectorio: {cwd}', server_stopped: 'Servidor detenido.',
    http_error_url: 'Error: Se requiere URL.',
    http_error_headers: 'Error: Formato JSON inválido para headers.',
    http_saving: 'Guardado en ./output',
    http_timeout: 'Tiempo de espera agotado'
  },
  ru: {
    port_in_use: 'Порт {port} используется', port_free: 'свободен', error_port_range: 'Ошибка: порт должен быть от 1 до 65535',
    server_started: 'Сервер запущен на http://localhost:{port}/.\nДиректория: {cwd}', server_stopped: 'Сервер остановлен.',
    http_error_url: 'Ошибка: Требуется URL.',
    http_error_headers: 'Ошибка: Неверный JSON формат для headers.',
    http_saving: 'Сохранено в ./output',
    http_timeout: 'Время ожидания истекло'
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
      en: `c http <subcommand> [arguments]\n\nDESCRIPTION:\n  Starts a local static file server or sends HTTP GET requests.\n\nSUBCOMMANDS:\n  server [port]                 Start a minimalist HTTP static file server.\n  get <url> [timeout] [headers] [mode]\n                                Send an HTTP GET request.\n\nARGUMENTS (for get):\n  url       Target URL (http/https).\n  timeout   (Optional) Max wait time in ms. Default: 10000.\n  headers   (Optional) JSON string of headers.\n  mode      (Optional) "print" (default, stdout) or "output" (save to ./output).\n\nEXAMPLES:\n  c http server 8080\n  c http get https://api.github.com\n  c http get http://example.com 5000 "{'Accept':'application/json'}" output`,
      zh: `c http <子命令> [参数]\n\n功能描述:\n  启动本地静态文件服务器或发送 HTTP GET 请求。\n\n子命令列表:\n  server [端口]                 启动极简 HTTP 静态文件服务器。\n  get <url> [超时] [表头] [模式]\n                                发送 HTTP GET 请求。\n\n参数说明 (get):\n  url       目标 URL (支持 http/https)。\n  超时      (可选) 最长等待时间(毫秒)。默认: 10000。\n  表头      (可选) JSON 格式的 Headers 字符串。\n  模式      (可选) "print" (默认，输出到控制台) 或 "output" (保存到 ./output 文件)。\n\n使用示例:\n  c http server 8080\n  c http get https://api.github.com\n  c http get http://example.com 5000 "{'Accept':'application/json'}" output`,
      es: `c http <subcomando> [argumentos]\n\nDESCRIPCIÓN:\n  Inicia un servidor de archivos estáticos o envía peticiones HTTP GET.\n\nSUBCOMANDOS:\n  server [puerto]               Iniciar servidor HTTP estático.\n  get <url> [timeout] [headers] [modo]\n                                Enviar petición HTTP GET.\n\nARGUMENTOS (para get):\n  url       URL objetivo.\n  timeout   (Opcional) Tiempo máximo en ms. Default: 10000.\n  headers   (Opcional) Cadena JSON de cabeceras.\n  modo      (Opcional) "print" (stdout) o "output" (guardar en ./output).\n\nEJEMPLOS:\n  c http server 8080\n  c http get https://api.github.com`,
      ru: `c http <подкоманда> [аргументы]\n\nОПИСАНИЕ:\n  Запускает локальный сервер или отправляет HTTP GET запросы.\n\nПОДКОМАНДЫ:\n  server [порт]                 Запустить HTTP-сервер.\n  get <url> [таймаут] [заголовки] [режим]\n                                Отправить HTTP GET запрос.\n\nАРГУМЕНТЫ (для get):\n  url       Целевой URL.\n  таймаут   (Опц.) Макс. время ожидания в мс. По умолч: 10000.\n  заголовки (Опц.) JSON строка заголовков.\n  режим     (Опц.) "print" (stdout) или "output" (сохранить в ./output).\n\nПРИМЕРЫ:\n  c http server 8080\n  c http get https://api.github.com`
    },
    run: async function(args, ctx) {
      const subCmd = args[0];
      
      // ==========================================
      // 子命令: server (原 http.server)
      // ==========================================
      if (subCmd === 'server') {
        let port = 80;
        if (args.length > 1) { 
          const p = parseInt(args[1], 10); 
          if (!isNaN(p) && p > 0 && p <= 65535) port = p; 
          else { console.error(t('error_port_range', {}, ctx.state.lang)); process.exit(1); }
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
                const items = files.map(f => { const st = ctx.fs.statSync(ctx.path.join(resolvedPath, f)); return { name: f, isDir: st.isDirectory(), size: st.size, mtime: st.mtime }; }).sort((a, b) => (a.isDir === b.isDir ? a.name.localeCompare(b.name) : a.isDir ? -1 : 1));
                const safePath = resolvedPath.substring(cwd.length).replace(/\\/g, '/') || '/';
                let html = `<html><head><meta charset="utf-8"><title>Index of ${safePath}</title></head><body><h1>Index of ${safePath}</h1><table><tr><th>Name</th><th>Size</th><th>Modified</th></tr>`;
                if (safePath !== '/') html += `<tr><td>⬆️ <a href="..">..</a></td><td></td><td></td></tr>`;
                for (const item of items) {
                  const href = ctx.path.join(safePath, item.name).replace(/\\/g, '/') + (item.isDir ? '/' : '');
                  const size = item.isDir ? '-' : (item.size / 1024).toFixed(2) + ' KB';
                  const mtime = new Date(item.mtime).toISOString().replace('T', ' ').substring(0, 19);
                  html += `<tr><td>${item.isDir ? '📁' : '📄'} <a href="${href}">${item.name}</a></td><td>${size}</td><td>${mtime}</td></tr>`;
                }
                html += `</table></body></html>`;
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
        return;
      }

      // ==========================================
      // 子命令: get
      // ==========================================
      if (subCmd === 'get') {
        let url = args[1];
        if (!url) { console.error(t('http_error_url', {}, ctx.state.lang)); process.exit(1); }
        
        // 自动补全协议头
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'http://' + url;
        }

        const timeout = args[2] ? (parseInt(args[2], 10) || 10000) : 10000;
        
        let headers = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36' };
        if (args[3]) {
          let hStr = args[3];
          
          // 1. 兼容 Mac/Linux 终端：去除首尾可能残留的单引号
          if (hStr.startsWith("'") && hStr.endsWith("'")) {
            hStr = hStr.slice(1, -1);
          }
          // 2. 兼容 Windows CMD/用户习惯：将单引号替换为双引号 (如 {'Accept':'application/json'} -> {"Accept":"application/json"})
          hStr = hStr.replace(/'/g, '"');
          
          try { 
            headers = JSON.parse(hStr); 
          } catch (e) { 
            console.error(t('http_error_headers', {}, ctx.state.lang));
            console.error(`[Debug] Raw input received by Node: ${args[3]}`);
            process.exit(1); 
          }
        }
        
        const mode = args[4] || 'print';
        const lib = url.startsWith('https') ? require('https') : ctx.http;

        try {
          const result = await new Promise((resolve) => {
            const req = lib.get(url, { headers, timeout }, (res) => {
              let data = '';
              res.setEncoding('utf8');
              res.on('data', (chunk) => data += chunk);
              res.on('end', () => resolve({ return: String(res.statusCode), text: data }));
            });
            
            req.setTimeout(timeout, () => {
              req.destroy();
              resolve({ return: 'TIMEOUT', text: t('http_timeout', {}, ctx.state.lang) });
            });
            
            req.on('error', (e) => {
              resolve({ return: 'ERROR', text: e.message });
            });
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

      // 无子命令或子命令错误，输出帮助提示
      console.log(ctx.coreT('help_type_cmd').replace('<command>', 'http'));
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
              pid = ctx.child_process.execSync(`lsof -t -i:${port} || ss -lptn 'sport = :${port}' | grep -oP 'pid=\\K\\d+'`).toString().trim().split('\n')[0];
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