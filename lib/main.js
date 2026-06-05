module.exports = [
  {
    name: 'text',
    description: { en: 'Output repeated placeholder text', zh: '重复输出占位文本', es: 'Generar texto de relleno repetido', ru: 'Вывод повторяющегося текста' },
    help: {
      en: `c text [count]\n\nDESCRIPTION:\n  Generates repeated lines of "(text)/n" for testing or piping.\n\nARGUMENTS:\n  count  (Optional) Number of times to repeat. Default is 1.\n\nEXAMPLES:\n  c text       -> Outputs: (text)/n\n  c text 3     -> Outputs: (text)/n(text)/n(text)/n`,
      zh: `c text [数量]\n\n功能描述:\n  生成重复的 "(text)/n" 文本行，常用于测试或管道占位。\n\n参数说明:\n  数量  (可选) 重复的次数。默认为 1。\n\n使用示例:\n  c text       -> 输出: (text)/n\n  c text 3     -> 输出: (text)/n(text)/n(text)/n`,
      es: `c text [cantidad]\n\nDESCRIPCIÓN:\n  Genera líneas repetidas de "(text)/n" para pruebas o tuberías.\n\nARGUMENTOS:\n  cantidad  (Opcional) Número de repeticiones. Por defecto 1.\n\nEJEMPLOS:\n  c text       -> Salida: (text)/n\n  c text 3     -> Salida: (text)/n(text)/n(text)/n`,
      ru: `c text [количество]\n\nОПИСАНИЕ:\n  Генерирует повторяющиеся строки "(text)/n" для тестов или конвейеров.\n\nАРГУМЕНТЫ:\n  количество  (Опционально) Число повторений. По умолчанию 1.\n\nПРИМЕРЫ:\n  c text       -> Вывод: (text)/n\n  c text 3     -> Вывод: (text)/n(text)/n(text)/n`
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
    description: { en: 'Output formatted time or timestamp', zh: '输出格式化时间或时间戳', es: 'Mostrar tiempo formateado o timestamp', ru: 'Вывод форматированного времени или метки' },
    help: {
      en: `c time [format]\n\nDESCRIPTION:\n  Outputs current system time. Useful for scripting and logging.\n\nARGUMENTS:\n  format  (Optional) "unix" (seconds), "unix-ms" (milliseconds), or custom string.\n          Custom tokens: YYYY, MM, DD, HH, mm, ss, SSS\n\nEXAMPLES:\n  c time                     -> 2026-05-31T10:00:00.000Z\n  c time unix                -> 1748685600\n  c time "YYYY-MM-DD HH:mm"  -> 2026-05-31 10:00`,
      zh: `c time [格式]\n\n功能描述:\n  输出当前系统时间。非常适合脚本编写和日志记录。\n\n参数说明:\n  格式  (可选) "unix" (秒级时间戳), "unix-ms" (毫秒级), 或自定义字符串。\n        自定义占位符: YYYY, MM, DD, HH, mm, ss, SSS\n\n使用示例:\n  c time                     -> 2026-05-31T10:00:00.000Z\n  c time unix                -> 1748685600\n  c time "YYYY-MM-DD HH:mm"  -> 2026-05-31 10:00`,
      es: `c time [formato]\n\nDESCRIPCIÓN:\n  Muestra la hora actual del sistema. Útil para scripts y logs.\n\nARGUMENTOS:\n  formato  (Opcional) "unix" (segundos), "unix-ms" (milisegundos), o texto personalizado.\n           Tokens: YYYY, MM, DD, HH, mm, ss, SSS\n\nEJEMPLOS:\n  c time                     -> 2026-05-31T10:00:00.000Z\n  c time unix                -> 1748685600\n  c time "YYYY-MM-DD HH:mm"  -> 2026-05-31 10:00`,
      ru: `c time [формат]\n\nОПИСАНИЕ:\n  Выводит текущее системное время. Полезно для скриптов и логов.\n\nАРГУМЕНТЫ:\n  формат  (Опционально) "unix" (секунды), "unix-ms" (миллисекунды) или своя строка.\n          Токены: YYYY, MM, DD, HH, mm, ss, SSS\n\nПРИМЕРЫ:\n  c time                     -> 2026-05-31T10:00:00.000Z\n  c time unix                -> 1748685600\n  c time "YYYY-MM-DD HH:mm"  -> 2026-05-31 10:00`
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
      en: `c uuid [-short]\n\nDESCRIPTION:\n  Generates a cryptographically secure UUID v4.\n\nARGUMENTS:\n  -short  (Optional) Removes hyphens from the output.\n\nEXAMPLES:\n  c uuid         -> 550e8400-e29b-41d4-a716-446655440000\n  c uuid -short  -> 550e8400e29b41d4a716446655440000`,
      zh: `c uuid [-short]\n\n功能描述:\n  生成加密安全的 UUID v4 标识符。\n\n参数说明:\n  -short  (可选) 去除输出中的连字符。\n\n使用示例:\n  c uuid         -> 550e8400-e29b-41d4-a716-446655440000\n  c uuid -short  -> 550e8400e29b41d4a716446655440000`,
      es: `c uuid [-short]\n\nDESCRIPCIÓN:\n  Genera un UUID v4 criptográficamente seguro.\n\nARGUMENTOS:\n  -short  (Opcional) Elimina los guiones de la salida.\n\nEJEMPLOS:\n  c uuid         -> 550e8400-e29b-41d4-a716-446655440000\n  c uuid -short  -> 550e8400e29b41d4a716446655440000`,
      ru: `c uuid [-short]\n\nОПИСАНИЕ:\n  Генерирует криптографически безопасный UUID v4.\n\nАРГУМЕНТЫ:\n  -short  (Опционально) Удаляет дефисы из вывода.\n\nПРИМЕРЫ:\n  c uuid         -> 550e8400-e29b-41d4-a716-446655440000\n  c uuid -short  -> 550e8400e29b41d4a716446655440000`
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
      en: `c hash <input> [-md5|-sha256]\n\nDESCRIPTION:\n  Calculates hash digest. Auto-detects if input is a file path or plain string.\n\nARGUMENTS:\n  input     File path or string text.\n  -md5      Use MD5 algorithm.\n  -sha256   Use SHA256 algorithm (Default).\n\nEXAMPLES:\n  c hash "hello"             -> SHA256 of string "hello"\n  c hash ./app.js -md5       -> MD5 of file app.js`,
      zh: `c hash <输入> [-md5|-sha256]\n\n功能描述:\n  计算哈希摘要。自动识别输入是文件路径还是纯字符串。\n\n参数说明:\n  输入      文件路径或字符串文本。\n  -md5      使用 MD5 算法。\n  -sha256   使用 SHA256 算法 (默认)。\n\n使用示例:\n  c hash "hello"             -> 字符串 "hello" 的 SHA256\n  c hash ./app.js -md5       -> 文件 app.js 的 MD5`,
      es: `c hash <entrada> [-md5|-sha256]\n\nDESCRIPCIÓN:\n  Calcula el resumen hash. Detecta si es ruta de archivo o texto.\n\nARGUMENTOS:\n  entrada   Ruta de archivo o texto.\n  -md5      Usar algoritmo MD5.\n  -sha256   Usar algoritmo SHA256 (Por defecto).\n\nEJEMPLOS:\n  c hash "hello"             -> SHA256 del texto "hello"\n  c hash ./app.js -md5       -> MD5 del archivo app.js`,
      ru: `c hash <ввод> [-md5|-sha256]\n\nОПИСАНИЕ:\n  Вычисляет хэш. Авто-определение: путь к файлу или строка.\n\nАРГУМЕНТЫ:\n  ввод      Путь к файлу или текст.\n  -md5      Использовать алгоритм MD5.\n  -sha256   Использовать алгоритм SHA256 (По умолчанию).\n\nПРИМЕРЫ:\n  c hash "hello"             -> SHA256 строки "hello"\n  c hash ./app.js -md5       -> MD5 файла app.js`
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
      en: `c json <input> [output] [mode]\n\nDESCRIPTION:\n  Parses and formats JSON files. Validates JSON syntax.\n\nARGUMENTS:\n  input   Source JSON file.\n  output  (Optional) Destination file. Use "-" for stdout.\n  mode    (Optional) "minify" (default) or "pretty".\n\nEXAMPLES:\n  c json config.json - pretty   -> Print formatted JSON to console\n  c json in.json out.json       -> Minify and save to out.json`,
      zh: `c json <输入> [输出] [模式]\n\n功能描述:\n  解析并格式化 JSON 文件。自动校验 JSON 语法。\n\n参数说明:\n  输入    源 JSON 文件。\n  输出    (可选) 目标文件。使用 "-" 输出到控制台。\n  模式    (可选) "minify" (默认，压缩) 或 "pretty" (美化)。\n\n使用示例:\n  c json config.json - pretty   -> 将美化后的 JSON 打印到控制台\n  c json in.json out.json       -> 压缩并保存到 out.json`,
      es: `c json <entrada> [salida] [modo]\n\nDESCRIPCIÓN:\n  Analiza y formatea archivos JSON. Valida la sintaxis.\n\nARGUMENTOS:\n  entrada  Archivo JSON fuente.\n  salida   (Opcional) Archivo destino. Usa "-" para stdout.\n  modo     (Opcional) "minify" (defecto) o "pretty".\n\nEJEMPLOS:\n  c json config.json - pretty   -> Imprimir JSON formateado en consola\n  c json in.json out.json       -> Minificar y guardar en out.json`,
      ru: `c json <ввод> [вывод] [режим]\n\nОПИСАНИЕ:\n  Парсит и форматирует JSON файлы. Проверяет синтаксис.\n\nАРГУМЕНТЫ:\n  ввод    Исходный JSON файл.\n  вывод   (Опционально) Целевой файл. Используйте "-" для stdout.\n  режим   (Опционально) "minify" (по умолчанию) или "pretty".\n\nПРИМЕРЫ:\n  c json config.json - pretty   -> Вывести форматированный JSON в консоль\n  c json in.json out.json       -> Минифицировать и сохранить в out.json`
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
      en: `c config [name] [value]\n\nDESCRIPTION:\n  Manages global settings like language preferences.\n\nARGUMENTS:\n  name   Config key (e.g., "language").\n  value  Config value (e.g., "en", "zh", "es", "ru").\n\nEXAMPLES:\n  c config                 -> View all current configs\n  c config language es     -> Set interface language to Spanish`,
      zh: `c config [名称] [值]\n\n功能描述:\n  管理全局设置，如语言偏好。\n\n参数说明:\n  名称   配置键 (例如: "language")。\n  值     配置值 (例如: "en", "zh", "es", "ru")。\n\n使用示例:\n  c config                 -> 查看所有当前配置\n  c config language zh     -> 将界面语言设置为中文`,
      es: `c config [nombre] [valor]\n\nDESCRIPCIÓN:\n  Gestiona ajustes globales como el idioma.\n\nARGUMENTOS:\n  nombre  Clave de config (ej. "language").\n  valor   Valor de config (ej. "en", "zh", "es", "ru").\n\nEJEMPLOS:\n  c config                 -> Ver todas las configuraciones\n  c config language es     -> Cambiar idioma a Español`,
      ru: `c config [имя] [значение]\n\nОПИСАНИЕ:\n  Управление глобальными настройками, такими как язык.\n\nАРГУМЕНТЫ:\n  имя       Ключ конфига (напр. "language").\n  значение  Значение (напр. "en", "zh", "es", "ru").\n\nПРИМЕРЫ:\n  c config                 -> Посмотреть все текущие настройки\n  c config language ru     -> Установить русский язык`
    },
    run: async function(args, ctx) {
      if (args.length === 0) { console.log(JSON.stringify(ctx.getConfig(), null, 2)); return; }
      const name = args[0], value = args[1]; 
      if (!value) { console.error('Error: value required'); process.exit(1); }
      // 移除白名单限制，支持任意语言代码
      ctx.setConfig(name, value); 
      console.log(ctx.coreT('config_updated', { key: name, value }));
    }
  },
  {
    name: 'manage',
    description: { en: 'Enable or disable plugin packages', zh: '启用或禁用插件包', es: 'Habilitar o deshabilitar paquetes', ru: 'Включение или отключение плагинов' },
    help: {
      en: `c manage <action> [package_name]\n\nDESCRIPTION:\n  Manages installed extension packages.\n\nACTIONS:\n  list           List all packages and their status.\n  disable <name> Disable a package.\n  enable <name>  Re-enable a disabled package.\n\nEXAMPLES:\n  c manage list\n  c manage disable web`,
      zh: `c manage <操作> [包名]\n\n功能描述:\n  管理已安装的扩展包。\n\n操作列表:\n  list           列出所有包及其状态。\n  disable <name> 禁用一个包。\n  enable <name>  重新启用被禁用的包。\n\n使用示例:\n  c manage list\n  c manage disable web`,
      es: `c manage <acción> [paquete]\n\nDESCRIPCIÓN:\n  Gestiona paquetes de extensiones instalados.\n\nACCIONES:\n  list           Listar todos los paquetes y su estado.\n  disable <name> Deshabilitar un paquete.\n  enable <name>  Rehabilitar un paquete.\n\nEJEMPLOS:\n  c manage list\n  c manage disable web`,
      ru: `c manage <действие> [пакет]\n\nОПИСАНИЕ:\n  Управление установленными плагинами.\n\nДЕЙСТВИЯ:\n  list           Список всех пакетов и их статус.\n  disable <name> Отключить пакет.\n  enable <name>  Включить пакет обратно.\n\nПРИМЕРЫ:\n  c manage list\n  c manage disable web`
    },
    run: async function(args, ctx) {
      const action = args[0];
      const name = args[1];
      const libDir = ctx.libDir;
      const corePackages = ['main.js'];

      if (!action) { console.log(ctx.coreT('help_type_cmd').replace('<command>', 'manage')); return; }

      if (action === 'list') {
        try {
          const files = ctx.fs.readdirSync(libDir);
          const allBases = new Set();
          files.forEach(f => { if (f.endsWith('.js') || f.endsWith('.js.disabled')) allBases.add(f.replace('.disabled', '')); });
          console.log(ctx.coreT('manage_list_title'));
          for (const base of Array.from(allBases).sort()) {
            const isActive = files.includes(base);
            const status = isActive ? ctx.coreT('manage_status_enabled') : ctx.coreT('manage_status_disabled');
            const core = corePackages.includes(base) ? ` ${ctx.coreT('manage_core_tag')}` : '';
            console.log(`  ${ctx.padEnd(base, 15)} ${status}${core}`);
          }
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
      console.error(ctx.coreT('manage_error_invalid')); process.exit(1);
    }
  }
];