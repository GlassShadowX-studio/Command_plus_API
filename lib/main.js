module.exports = [
  {
    name: 'text',
    description: { en: 'Output repeated placeholder text', zh: '重复输出占位文本', es: 'Generar texto de relleno repetido', ru: 'Вывод повторяющегося текста'  },
    help: {
      en:  `c text [count]\n\nDESCRIPTION:\n Generates repeated lines of "(text)/n" for testing or piping.\n\nARGUMENTS:\n count (Optional) Number of times to repeat. Default is 1.\n\nEXAMPLES:\n c text -> Outputs: (text)/n\n c text 3 -> Outputs: (text)/n(text)/n(text)/n`,
      zh:  `c text [数量]\n\n功能描述:\n 生成重复的 "(text)/n" 文本行，常用于测试或管道占位。\n\n参数说明:\n 数量 (可选) 重复的次数。默认为 1。\n\n使用示例:\n c text -> 输出: (text)/n\n c text 3 -> 输出: (text)/n(text)/n(text)/n`,
      es:  `c text [cantidad]\n\nDESCRIPCIÓN:\n Genera líneas repetidas de "(text)/n" para pruebas o tuberías.\n\nARGUMENTOS:\n cantidad (Opcional) Número de repeticiones. Por defecto 1.\n\nEJEMPLOS:\n c text -> Salida: (text)/n\n c text 3 -> Salida: (text)/n(text)/n(text)/n`,
      ru:  `c text [количество]\n\nОПИСАНИЕ:\n Генерирует повторяющиеся строки "(text)/n" для тестов или конвейеров.\n\nАРГУМЕНТЫ:\n количество (Опционально) Число повторений. По умолчанию 1.\n\nПРИМЕРЫ:\n c text -> Вывод: (text)/n\n c text 3 -> Вывод: (text)/n(text)/n(text)/n`
    },
    run: async function(args, ctx) {
      let count = 1;
      if (args.length > 0) {
        const n = parseInt(args[0], 10);
        if (isNaN(n) || n <= 0) { console.error('Error: count must be a positive integer'); process.exit(1); }
        count = n;
      }
      for (let i = 0; i < count; i++) console.log('(text)/n');
    }
  },
  {
    name: 'time',
    description: { en: 'Output formatted time or timestamp', zh: '输出格式化时间或时间戳', es: 'Mostrar tiempo formateado o timestamp',  ru: 'Вывод форматированного времени или метки' },
    help: {
      en:  `c time [format]\n\nDESCRIPTION:\n Outputs current system time. Useful for scripting and logging.\n\nARGUMENTS:\n format (Optional) "unix" (seconds), "unix-ms" (milliseconds), or custom string. Custom tokens: YYYY, MM, DD, HH, mm, ss, SSS\n\nEXAMPLES:\n c time -> 2026-05-31T10:00:00.000Z\n c time unix -> 1748685600\n c time "YYYY-MM-DD HH:mm" -> 2026-05-31 10:00`,
      zh:  `c time [格式]\n\n功能描述:\n 输出当前系统时间。非常适合脚本编写和日志记录。\n\n参数说明:\n 格式 (可选) "unix" (秒级时间戳), "unix-ms" (毫秒级), 或自定义字符串。 自定义占位符: YYYY, MM, DD, HH, mm, ss, SSS\n\n使用示例:\n c time -> 2026-05-31T10:00:00.000Z\n c time unix -> 1748685600\n c time "YYYY-MM-DD HH:mm" -> 2026-05-31 10:00`,
      es:  `c time [formato]\n\nDESCRIPCIÓN:\n Muestra la hora actual del sistema. Útil para scripts y logs.\n\nARGUMENTOS:\n formato (Opcional) "unix" (segundos), "unix-ms" (milisegundos), o texto personalizado. Tokens: YYYY, MM, DD, HH, mm, ss, SSS\n\nEJEMPLOS:\n c time -> 2026-05-31T10:00:00.000Z\n c time unix -> 1748685600\n c time "YYYY-MM-DD HH:mm" -> 2026-05-31 10:00`,
      ru:  `c time [формат]\n\nОПИСАНИЕ:\n Выводит текущее системное время. Полезно для скриптов и логов.\n\nАРГУМЕНТЫ:\n формат (Опционально) "unix" (секунды), "unix-ms" (миллисекунды) или своя строка. Токены: YYYY, MM, DD, HH, mm, ss, SSS\n\nПРИМЕРЫ:\n c time -> 2026-05-31T10:00:00.000Z\n c time unix -> 1748685600\n c time "YYYY-MM-DD HH:mm" -> 2026-05-31 10:00`
    },
    run: async function(args, ctx) {
      const now = new Date(); const format = args[0];
      if (!format) { console.log(now.toISOString()); return; }
      if (format === 'unix') { console.log(Math.floor(now.getTime() / 1000)); return; }
      if (format === 'unix-ms') { console.log(now.getTime()); return; }
      const pad = (n) => String(n).padStart(2, '0');
      let res = format.replace(/YYYY/g, now.getFullYear()).replace(/MM/g, pad(now.getMonth() + 1)).replace(/DD/g, pad(now.getDate())).replace(/HH/g, pad(now.getHours())).replace(/mm/g, pad(now.getMinutes())).replace(/ss/g, pad(now.getSeconds())).replace(/SSS/g, String(now.getMilliseconds()).padStart(3, '0'));
      console.log(res);
    }
  },
  {
    name: 'uuid',
    description: { en: 'Generate random UUID v4', zh: '生成随机 UUID v4', es: 'Generar UUID v4 aleatorio', ru: 'Генерация случайного UUID v4' },
    help: {
      en:  `c uuid [-short]\n\nDESCRIPTION:\n Generates a cryptographically secure UUID v4.\n\nARGUMENTS:\n -short (Optional) Removes hyphens from the output.\n\nEXAMPLES:\n c uuid -> 550e8400-e29b-41d4-a716-446655440000\n c uuid -short -> 550e8400e29b41d4a716446655440000`,
      zh:  `c uuid [-short]\n\n功能描述:\n 生成加密安全的 UUID v4 标识符。\n\n参数说明:\n -short (可选) 去除输出中的连字符。\n\n使用示例:\n c uuid -> 550e8400-e29b-41d4-a716-446655440000\n c uuid -short -> 550e8400e29b41d4a716446655440000`,
      es:  `c uuid [-short]\n\nDESCRIPCIÓN:\n Genera un UUID v4 criptográficamente seguro.\n\nARGUMENTOS:\n -short (Opcional) Elimina los guiones de la salida.\n\nEJEMPLOS:\n c uuid -> 550e8400-e29b-41d4-a716-446655440000\n c uuid -short -> 550e8400e29b41d4a716446655440000`,
      ru:  `c uuid [-short]\n\nОПИСАНИЕ:\n Генерирует криптографически безопасный UUID v4.\n\nАРГУМЕНТЫ:\n -short (Опционально) Удаляет дефисы из вывода.\n\nПРИМЕРЫ:\n c uuid -> 550e8400-e29b-41d4-a716-446655440000\n c uuid -short -> 550e8400e29b41d4a716446655440000`
    },
    run: async function(args, ctx) {
      let uuid = ctx.crypto.randomUUID();
      if (args.includes('-short')) uuid = uuid.replace(/-/g, '');
      console.log(uuid);
    }
  },
  {
    name: 'hash',
    description: { en: 'Compute MD5/SHA256 hash of file or string', zh: '计算文件或字符串的 MD5/SHA256 哈希', es: 'Calcular hash MD5/SHA256 de archivo o texto', ru: 'Вычисление хэша MD5/SHA256 файла или строки' },
    help: {
      en:  `c hash <input> [-md5|-sha256]\n\nDESCRIPTION:\n Calculates hash digest. Auto-detects if input is a file path or plain string.\n\nARGUMENTS:\n input File path or string text.\n -md5 Use MD5 algorithm.\n -sha256 Use SHA256 algorithm (Default).\n\nEXAMPLES:\n c hash "hello" -> SHA256 of string "hello"\n c hash ./app.js -md5 -> MD5 of file app.js`,
      zh:  `c hash <输入> [-md5|-sha256]\n\n功能描述:\n 计算哈希摘要。自动识别输入是文件路径还是纯字符串。\n\n参数说明:\n 输入 文件路径或字符串文本。\n -md5 使用 MD5 算法。\n -sha256 使用 SHA256 算法 (默认)。\n\n使用示例:\n c hash "hello" -> 字符串 "hello" 的 SHA256\n c hash ./app.js -md5 -> 文件 app.js 的 MD5`,
      es:  `c hash <entrada> [-md5|-sha256]\n\nDESCRIPCIÓN:\n Calcula el resumen hash. Detecta si es ruta de archivo o texto.\n\nARGUMENTOS:\n entrada Ruta de archivo o texto.\n -md5 Usar algoritmo MD5.\n -sha256 Usar algoritmo SHA256 (Por defecto).\n\nEJEMPLOS:\n c hash "hello" -> SHA256 del texto "hello"\n c hash ./app.js -md5 -> MD5 del archivo app.js`,
      ru:  `c hash <ввод> [-md5|-sha256]\n\nОПИСАНИЕ:\n Вычисляет хэш. Авто-определение: путь к файлу или строка.\n\nАРГУМЕНТЫ:\n ввод Путь к файлу или текст.\n -md5 Использовать алгоритм MD5.\n -sha256 Использовать алгоритм SHA256 (По умолчанию).\n\nПРИМЕРЫ:\n c hash "hello" -> SHA256 строки "hello"\n c hash ./app.js -md5 -> MD5 файла app.js`
    },
    run: async function(args, ctx) {
      if (args.length === 0) { console.error('Error: input required'); process.exit(1); }
      let input = args[0]; let algo = args.includes('-md5') ? 'md5' : 'sha256';
      try {
        if (ctx.fs.existsSync(input) && ctx.fs.statSync(input).isFile()) {
          const hash = ctx.crypto.createHash(algo); const stream = ctx.fs.createReadStream(input);
          await new Promise((resolve, reject) => { stream.on('data', d => hash.update(d)); stream.on('end', () => { console.log(hash.digest('hex')); resolve(); }); stream.on('error', reject); });
        } else {
          console.log(ctx.crypto.createHash(algo).update(input).digest('hex'));
        }
      } catch (e) { console.error(`Hash error: ${e.message}`); process.exit(1); }
    }
  },
  {
    name: 'json',
    description: { en: 'Format, minify or prettify JSON files', zh: '格式化、压缩或美化 JSON 文件', es: 'Formatear, minificar o embellecer JSON', ru: 'Форматирование и минификация JSON файлов' },
    help: {
      en:  `c json <input> [output] [mode]\n\nDESCRIPTION:\n Parses and formats JSON files. Validates JSON syntax.\n\nARGUMENTS:\n input Source JSON file.\n output (Optional) Destination file. Use "-" for stdout.\n mode (Optional) "minify" (default) or "pretty".\n\nEXAMPLES:\n c json config.json - pretty -> Print formatted JSON to console\n c json in.json out.json -> Minify and save to out.json`,
      zh:  `c json <输入> [输出] [模式]\n\n功能描述:\n 解析并格式化 JSON 文件。自动校验 JSON 语法。\n\n参数说明:\n 输入 源 JSON 文件。\n 输出 (可选) 目标文件。使用 "-" 输出到控制台。\n 模式 (可选) "minify" (默认，压缩) 或 "pretty" (美化)。\n\n使用示例:\n c json config.json - pretty -> 将美化后的 JSON 打印到控制台\n c json in.json out.json -> 压缩并保存到 out.json`,
      es:  `c json <entrada> [salida] [modo]\n\nDESCRIPCIÓN:\n Analiza y formatea archivos JSON. Valida la sintaxis.\n\nARGUMENTOS:\n entrada Archivo JSON fuente.\n salida (Opcional) Archivo destino. Usa "-" para stdout.\n modo (Opcional) "minify" (defecto) o "pretty".\n\nEJEMPLOS:\n c json config.json - pretty -> Imprimir JSON formateado en consola\n c json in.json out.json -> Minificar y guardar en out.json`,
      ru:  `c json <ввод> [вывод] [режим]\n\nОПИСАНИЕ:\n Парсит и форматирует JSON файлы. Проверяет синтаксис.\n\nАРГУМЕНТЫ:\n ввод Исходный JSON файл.\n вывод (Опционально) Целевой файл. Используйте "-" для stdout.\n режим (Опционально) "minify" (по умолчанию) или "pretty".\n\nПРИМЕРЫ:\n c json config.json - pretty -> Вывести форматированный JSON в консоль\n c json in.json out.json -> Минифицировать и сохранить в out.json`
    },
    run: async function(args, ctx) {
      if (args.length === 0) { console.error('Error: input required'); process.exit(1); }
      const input = args[0], output = args[1], mode = args[2] || 'minify';
      if (!ctx.fs.existsSync(input)) { console.error(`Error: file not found: ${input}`); process.exit(1); }
      try {
        const obj = JSON.parse(ctx.fs.readFileSync(input, 'utf-8'));
        const formatted = JSON.stringify(obj, null, mode === 'pretty' ? 2 : 0);
        if (!output || output === '-') console.log(formatted);
        else ctx.fs.writeFileSync(output, formatted, 'utf-8');
      } catch (e) {
        console.error(e instanceof SyntaxError ? `Error: invalid JSON - ${e.message}` : e.message);
        process.exit(1);
      }
    }
  },
  {
    name: 'config',
    description: { en: 'View or modify software configurations', zh: '查看或修改软件配置', es: 'Ver o modificar configuraciones', ru: 'Просмотр и изменение конфигурации' },
    help: {
      en:  `c config [name] [value]\n\nDESCRIPTION:\n Manages global settings like language preferences.\n\nARGUMENTS:\n name Config key (e.g., "language").\n value Config value (e.g., "en", "zh", "es", "ru").\n\nEXAMPLES:\n c config -> View all current configs\n c config language es -> Set interface language to Spanish`,
      zh:  `c config [名称] [值]\n\n功能描述:\n 管理全局设置，如语言偏好。\n\n参数说明:\n 名称 配置键 (例如: "language")。\n 值 配置值 (例如: "en", "zh", "es", "ru")。\n\n使用示例:\n c config -> 查看所有当前配置\n c config language zh -> 将界面语言设置为中文`,
      es:  `c config [nombre] [valor]\n\nDESCRIPCIÓN:\n Gestiona ajustes globales como el idioma.\n\nARGUMENTOS:\n nombre Clave de config (ej. "language").\n valor Valor de config (ej. "en", "zh", "es", "ru").\n\nEJEMPLOS:\n c config -> Ver todas las configuraciones\n c config language es -> Cambiar idioma a Español`,
      ru:  `c config [имя] [значение]\n\nОПИСАНИЕ:\n Управление глобальными настройками, такими как язык.\n\nАРГУМЕНТЫ:\n имя Ключ конфига (напр. "language").\n значение Значение (напр. "en", "zh", "es", "ru").\n\nПРИМЕРЫ:\n c config -> Посмотреть все текущие настройки\n c config language ru -> Установить русский язык`
    },
    run: async function(args, ctx) {
      if (args.length === 0) { console.log(JSON.stringify(ctx.getConfig(), null, 2)); return; }
      const name = args[0], value = args[1];
      if (!value) { console.error('Error: value required'); process.exit(1); }
      ctx.setConfig(name, value);
      console.log(ctx.coreT('config_updated', { key: name, value }));
    }
  },
  {
    name: 'manage',
    description: { en: 'Manage plugin packages and commands', zh: '管理插件包与命令', es: 'Gestionar paquetes y comandos', ru: 'Управление плагинами и командами' },
    help: {
      en:  `c manage <action> [arguments]\n\nDESCRIPTION:\n Manages installed extension packages, inspects commands, and downloads new plugins.\n\nACTIONS:\n list [-enable|-disable]       List packages (optionally filtered).\n disable <name>                Disable a package.\n enable <name>                 Re-enable a disabled package.\n command <name>                List commands inside a specific package.\n add-web <url>                 Download a plugin from a URL to the lib folder.\n\nEXAMPLES:\n c manage list -disable\n c manage command web\n c manage add-web https://example.com/plugin.js`,
      zh:  `c manage <操作> [参数]\n\n功能描述:\n 管理已安装的扩展包、查看包内命令以及下载新插件。\n\n操作列表:\n list [-enable|-disable]       列出所有包 (可按状态过滤)。\n disable <name>                禁用一个包。\n enable <name>                 重新启用被禁用的包。\n command <name>                列出指定包内的所有命令。\n add-web <url>                 从 URL 下载插件到 lib 文件夹。\n\n使用示例:\n c manage list -disable\n c manage command web\n c manage add-web https://example.com/plugin.js`,
      es:  `c manage <acción> [argumentos]\n\nDESCRIPCIÓN:\n Gestiona paquetes, inspecciona comandos y descarga nuevos plugins.\n\nACCIONES:\n list [-enable|-disable]       Listar paquetes.\n disable <name>                Deshabilitar un paquete.\n enable <name>                 Rehabilitar un paquete.\n command <name>                Listar comandos de un paquete.\n add-web <url>                 Descargar plugin desde URL.\n\nEJEMPLOS:\n c manage list -disable\n c manage command web\n c manage add-web https://example.com/plugin.js`,
      ru:  `c manage <действие> [аргументы]\n\nОПИСАНИЕ:\n Управление плагинами, просмотр команд и загрузка новых.\n\nДЕЙСТВИЯ:\n list [-enable|-disable]       Список пакетов.\n disable <name>                Отключить пакет.\n enable <name>                 Включить пакет.\n command <name>                Список команд в пакете.\n add-web <url>                 Загрузить плагин по URL.\n\nПРИМЕРЫ:\n c manage list -disable\n c manage command web\n c manage add-web https://example.com/plugin.js`
    },
    run: async function(args, ctx) {
      const action = args[0];
      const name = args[1];
      const libDir = ctx.libDir;
      const corePackages = ['main.js'];
      
      if (!action) { console.log(ctx.coreT('help_type_cmd').replace('<command>', 'manage')); return; }

      if (action === 'list') {
        const filter = name; 
        try {
          const files = ctx.fs.readdirSync(libDir);
          const allBases = new Set();
          files.forEach(f => { if (f.endsWith('.js') || f.endsWith('.js.disabled')) allBases.add(f.replace('.disabled', '')); });
          console.log(ctx.coreT('manage_list_title'));
          let count = 0;
          for (const base of Array.from(allBases).sort()) {
            const isActive = files.includes(base);
            if (filter === '-enable' && !isActive) continue;
            if (filter === '-disable' && isActive) continue;
            
            const status = isActive ? ctx.coreT('manage_status_enabled') : ctx.coreT('manage_status_disabled');
            const core = corePackages.includes(base) ? ` ${ctx.coreT('manage_core_tag')}` : '';
            console.log(`  ${ctx.padEnd(base, 15)} ${status}${core}`);
            count++;
          }
          if (count === 0) console.log(ctx.coreT('manage_no_match'));
        } catch (e) { console.error(`Error reading lib dir: ${e.message}`); }
        return;
      }

      if (action === 'disable' || action === 'enable') {
        if (!name) { console.error('Error: package name required'); process.exit(1); }
        const fileName = name.endsWith('.js') ? name : `${name}.js`;
        const disabledName = `${fileName}.disabled`;
        
        if (corePackages.includes(fileName) && action === 'disable') {
          console.error(ctx.coreT('manage_error_core', { name: fileName })); process.exit(1);
        }

        const src = ctx.path.join(libDir, action === 'disable' ? fileName : disabledName);
        const dest = ctx.path.join(libDir, action === 'disable' ? disabledName : fileName);

        if (!ctx.fs.existsSync(src)) {
          console.error(ctx.coreT('manage_error_notfound', { name, action: action === 'disable' ? 'disabled' : 'enabled' })); process.exit(1);
        }

        try {
          ctx.fs.renameSync(src, dest);
          console.log(ctx.coreT('manage_success', { name, action: action === 'disable' ? 'disabled' : 'enabled' }));
        } catch (e) { console.error(`Error modifying package: ${e.message}`); process.exit(1); }
        return;
      }

      if (action === 'command') {
        if (!name) { console.error('Error: package name required'); process.exit(1); }
        let fileName = name.endsWith('.js') ? name : `${name}.js`;
        let filePath = ctx.path.join(libDir, fileName);
        
        if (!ctx.fs.existsSync(filePath)) {
          if (ctx.fs.existsSync(filePath + '.disabled')) {
            filePath += '.disabled';
          } else {
            console.error(ctx.coreT('manage_cmd_notfound', { name: fileName }));
            process.exit(1);
          }
        }
        
        try {
          delete require.cache[require.resolve(filePath)];
          const plugins = require(filePath);
          const list = Array.isArray(plugins) ? plugins : [plugins];
          console.log(ctx.coreT('manage_cmd_title', { name: ctx.path.basename(filePath) }));
          let count = 0;
          for (const p of list) {
            if (p && p.name) {
              const desc = ctx.getLocalizedText(p.description, ctx.state.lang);
              console.log(`  ${ctx.padEnd(p.name, 15)} ${desc}`);
              count++;
            }
          }
          if (count === 0) console.log('  (No valid commands found)');
        } catch (e) {
          console.error(`Error reading package: ${e.message}`);
          process.exit(1);
        }
        return;
      }

      if (action === 'add-web') {
        const urlStr = name;
        if (!urlStr) { console.error('Error: URL is required'); process.exit(1); }
        
        let fileName = '';
        try {
          fileName = ctx.path.basename(new URL(urlStr).pathname);
          if (!fileName.endsWith('.js')) fileName += '.js';
        } catch (e) {
          console.error('Error: Invalid URL format'); process.exit(1);
        }
        
        const destPath = ctx.path.join(libDir, fileName);
        
        const download = (url) => {
          return new Promise((resolve, reject) => {
            const lib = url.startsWith('https') ? ctx.https : ctx.http;
            lib.get(url, (res) => {
              if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                resolve(download(res.headers.location)); 
                return;
              }
              if (res.statusCode !== 200) {
                reject(new Error(`HTTP ${res.statusCode}`));
                return;
              }
              const file = ctx.fs.createWriteStream(destPath);
              res.pipe(file);
              file.on('finish', () => { file.close(); resolve(); });
              file.on('error', reject);
            }).on('error', reject);
          });
        };

        try {
          console.log(`Downloading ${fileName}...`);
          await download(urlStr);
          console.log(ctx.coreT('manage_download_success', { name: fileName }));
        } catch (e) {
          if (ctx.fs.existsSync(destPath)) ctx.fs.unlinkSync(destPath);
          console.error(ctx.coreT('manage_download_error', { msg: e.message }));
          process.exit(1);
        }
        return;
      }

      console.error(ctx.coreT('manage_error_invalid')); process.exit(1);
    }
  },
  {
    name: 'about',
    description: { en: 'Show software info, license, and docs', zh: '显示软件信息、许可证和文档', es: 'Mostrar info del software, licencia y docs', ru: 'Показать информацию о ПО, лицензии и доки' },
    help: {
      en: `c about [topic]\n\nDESCRIPTION:\n Displays software details, license, or opens documentation.\n\nARGUMENTS:\n version   Show version number.\n license   Show license info.\n docs      Open official documentation.\n software  Show system & environment info.\n\nEXAMPLES:\n c about           -> Shows all info\n c about docs      -> Opens wiki in browser`,
      zh: `c about [主题]\n\n功能描述:\n 显示软件详细信息、许可证或打开文档。\n\n参数说明:\n version   显示版本号。\n license   显示许可证信息。\n docs      打开官方文档。\n software  显示系统与环境信息。\n\n使用示例:\n c about           -> 显示所有信息\n c about docs      -> 在浏览器中打开 wiki`,
      es: `c about [tema]\n\nDESCRIPCIÓN:\n Muestra detalles del software, licencia o abre documentación.\n\nARGUMENTOS:\n version   Mostrar versión.\n license   Mostrar licencia.\n docs      Abrir documentación.\n software  Mostrar info del sistema.\n\nEJEMPLOS:\n c about           -> Muestra todo\n c about docs      -> Abre wiki`,
      ru: `c about [тема]\n\nОПИСАНИЕ:\n Показывает информацию о ПО, лицензию или открывает документацию.\n\nАРГУМЕНТЫ:\n version   Показать версию.\n license   Показать лицензию.\n docs      Открыть документацию.\n software  Показать инфо о системе.\n\nПРИМЕРЫ:\n c about           -> Показать всё\n c about docs      -> Открыть wiki`
    },
    run: async function(args, ctx) {
      const topic = args[0] ? args[0].toLowerCase() : 'all';
      const github = 'https://github.com/GlassShadowX-studio/Command_plus_API.git';
      const docsUrl = 'https://wiki.hellowyq.com';
      
      const printVersion = () => {
        console.log(`Command+ API v${ctx.version}`);
      };
      
      const printLicense = () => {
        console.log('License: MIT License\n');
        console.log(`MIT License

Copyright (c) 2026 wanyyq

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`);
      };
      
      const openDocs = () => {
        console.log(`Opening ${ctx.coreT('about_docs')}: ${docsUrl}`);
        const cmd = process.platform === 'win32' ? `start "" "${docsUrl}"` : process.platform === 'darwin' ? `open "${docsUrl}"` : `xdg-open "${docsUrl}"`;
        ctx.child_process.exec(cmd);
      };
      
      const printSoftware = () => {
        console.log(ctx.coreT('about_env_info'));
        console.log(`${ctx.coreT('about_name')}: Command+ API`);
        console.log(`${ctx.coreT('about_version')}: ${ctx.version}`);
        console.log(`${ctx.coreT('about_nodejs')}: ${process.version}`);
        console.log(`${ctx.coreT('about_platform')}: ${ctx.platform} (${ctx.arch})`);
        console.log(`${ctx.coreT('about_base_path')}: ${ctx.basePath}`);
        console.log(`${ctx.coreT('about_executable')}: ${process.execPath}`);
      };

      if (topic === 'version') printVersion();
      else if (topic === 'license') printLicense();
      else if (topic === 'docs') openDocs();
      else if (topic === 'software') printSoftware();
      else {
        printVersion();
        console.log('');
        printSoftware();
        console.log('');
        printLicense();
        console.log('');
        console.log(`${ctx.coreT('about_docs')}: ${docsUrl}`);
        console.log(ctx.coreT('about_open_docs_hint'));
      }
    }
  }
];