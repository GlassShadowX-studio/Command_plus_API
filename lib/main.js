const ManageI18N = {
  en: {
    all_cmds_title: 'All Available Commands:',
    add_nopath: 'Error: Local file path is required.',
    add_notfound: 'Error: File not found: {path}',
    add_invalid_ext: 'Error: Plugin file must have a .js extension.',
    add_success: 'Success: Installed \'{name}\' to lib folder. Restart terminal.',
    add_error: 'Error: Failed to install: {msg}',
    down_hint: 'Opening Plugin Market: {url}'
  },
  zh: {
    all_cmds_title: '所有可用命令:',
    add_nopath: '错误：需要提供本地文件路径。',
    add_notfound: '错误：未找到文件: {path}',
    add_invalid_ext: '错误：插件文件必须是 .js 后缀。',
    add_success: '成功: 已安装 \'{name}\' 到 lib 文件夹。重启终端以生效。',
    add_error: '错误: 安装失败: {msg}',
    down_hint: '正在打开插件市场: {url}'
  },
  es: {
    all_cmds_title: 'Todos los comandos disponibles:',
    add_nopath: 'Error: Se requiere ruta de archivo local.',
    add_notfound: 'Error: Archivo no encontrado: {path}',
    add_invalid_ext: 'Error: El plugin debe tener extensión .js.',
    add_success: 'Éxito: \'{name}\' instalado en lib. Reinicia la terminal.',
    add_error: 'Error: Fallo al instalar: {msg}',
    down_hint: 'Abriendo mercado de plugins: {url}'
  },
  ru: {
    all_cmds_title: 'Все доступные команды:',
    add_nopath: 'Ошибка: Требуется путь к локальному файлу.',
    add_notfound: 'Ошибка: Файл не найден: {path}',
    add_invalid_ext: 'Ошибка: Плагин должен иметь расширение .js.',
    add_success: 'Успех: \'{name}\' установлен в lib. Перезапустите терминал.',
    add_error: 'Ошибка: Не удалось установить: {msg}',
    down_hint: 'Открытие маркета плагинов: {url}'
  }
};

function localT(key, args = {}, lang = 'en') {
  let str = ManageI18N[lang] && ManageI18N[lang][key] ? ManageI18N[lang][key] : (ManageI18N.en[key] || key);
  for (const k in args) str = str.replace(`{${k}}`, args[k]);
  return str;
}

module.exports = [
{
name: 'text',
description: { en: 'Output repeated placeholder text', zh: '重复输出占位文本', es: 'Generar texto de relleno repetido', ru: 'Вывод повторяющегося текста'   },
help: {
en:   `c text [count]\n\nDESCRIPTION:\n Generates repeated lines of "(text)/n" for testing or piping.\n\nARGUMENTS:\n count (Optional) Number of times to repeat. Default is 1.\n\nEXAMPLES:\n c text -> Outputs: (text)/n\n c text 3 -> Outputs: (text)/n(text)/n(text)/n` ,
zh:   `c text [数量]\n\n功能描述:\n 生成重复的 "(text)/n" 文本行，常用于测试或管道占位。\n\n参数说明:\n 数量 (可选) 重复的次数。默认为 1。\n\n使用示例:\n c text -> 输出: (text)/n\n c text 3 -> 输出: (text)/n(text)/n(text)/n` ,
es:   `c text [cantidad]\n\nDESCRIPCIÓN:\n Genera líneas repetidas de "(text)/n" para pruebas o tuberías.\n\nARGUMENTOS:\n cantidad (Opcional) Número de repeticiones. Por defecto 1.\n\nEJEMPLOS:\n c text -> Salida: (text)/n\n c text 3 -> Salida: (text)/n(text)/n(text)/n` ,
ru:   `c text [количество]\n\nОПИСАНИЕ:\n Генерирует повторяющиеся строки "(text)/n" для тестов или конвейеров.\n\nАРГУМЕНТЫ:\n количество (Опционально) Число повторений. По умолчанию 1.\n\nПРИМЕРЫ:\n c text -> Вывод: (text)/n\n c text 3 -> Вывод: (text)/n(text)/n(text)/n` 
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
description: { en: 'Output formatted time or timestamp', zh: '输出格式化时间或时间戳', es: 'Mostrar tiempo formateado o timestamp',   ru: 'Вывод форматированного времени или метки' },
help: {
en:   `c time [format]\n\nDESCRIPTION:\n Outputs current system time. Useful for scripting and logging.\n\nARGUMENTS:\n format (Optional) "unix" (seconds), "unix-ms" (milliseconds), or custom string. Custom tokens: YYYY, MM, DD, HH, mm, ss, SSS\n\nEXAMPLES:\n c time -> 2026-05-31T10:00:00.000Z\n c time unix -> 1748685600\n c time "YYYY-MM-DD HH:mm" -> 2026-05-31 10:00` ,
zh:   `c time [格式]\n\n功能描述:\n 输出当前系统时间。非常适合脚本编写和日志记录。\n\n参数说明:\n 格式 (可选) "unix" (秒级时间戳), "unix-ms" (毫秒级), 或自定义字符串。 自定义占位符: YYYY, MM, DD, HH, mm, ss, SSS\n\n使用示例:\n c time -> 2026-05-31T10:00:00.000Z\n c time unix -> 1748685600\n c time "YYYY-MM-DD HH:mm" -> 2026-05-31 10:00` ,
es:   `c time [formato]\n\nDESCRIPCIÓN:\n Muestra la hora actual del sistema. Útil para scripts y logs.\n\nARGUMENTOS:\n formato (Opcional) "unix" (segundos), "unix-ms" (milisegundos), o texto personalizado. Tokens: YYYY, MM, DD, HH, mm, ss, SSS\n\nEJEMPLOS:\n c time -> 2026-05-31T10:00:00.000Z\n c time unix -> 1748685600\n c time "YYYY-MM-DD HH:mm" -> 2026-05-31 10:00` ,
ru:   `c time [формат]\n\nОПИСАНИЕ:\n Выводит текущее системное время. Полезно для скриптов и логов.\n\nАРГУМЕНТЫ:\n формат (Опционально) "unix" (секунды), "unix-ms" (миллисекунды) или своя строка. Токены: YYYY, MM, DD, HH, mm, ss, SSS\n\nПРИМЕРЫ:\n c time -> 2026-05-31T10:00:00.000Z\n c time unix -> 1748685600\n c time "YYYY-MM-DD HH:mm" -> 2026-05-31 10:00` 
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
en:   `c uuid [-short]\n\nDESCRIPTION:\n Generates a cryptographically secure UUID v4.\n\nARGUMENTS:\n -short (Optional) Removes hyphens from the output.\n\nEXAMPLES:\n c uuid -> 550e8400-e29b-41d4-a716-446655440000\n c uuid -short -> 550e8400e29b41d4a716446655440000` ,
zh:   `c uuid [-short]\n\n功能描述:\n 生成加密安全的 UUID v4 标识符。\n\n参数说明:\n -short (可选) 去除输出中的连字符。\n\n使用示例:\n c uuid -> 550e8400-e29b-41d4-a716-446655440000\n c uuid -short -> 550e8400e29b41d4a716446655440000` ,
es:   `c uuid [-short]\n\nDESCRIPCIÓN:\n Genera un UUID v4 criptográficamente seguro.\n\nARGUMENTOS:\n -short (Opcional) Elimina los guiones de la salida.\n\nEJEMPLOS:\n c uuid -> 550e8400-e29b-41d4-a716-446655440000\n c uuid -short -> 550e8400e29b41d4a716446655440000` ,
ru:   `c uuid [-short]\n\nОПИСАНИЕ:\n Генерирует криптографически безопасный UUID v4.\n\nАРГУМЕНТЫ:\n -short (Опционально) Удаляет дефисы из вывода.\n\nПРИМЕРЫ:\n c uuid -> 550e8400-e29b-41d4-a716-446655440000\n c uuid -short -> 550e8400e29b41d4a716446655440000` 
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
en:   `c hash <input> [-md5|-sha256]\n\nDESCRIPTION:\n Calculates hash digest. Auto-detects if input is a file path or plain string.\n\nARGUMENTS:\n input File path or string text.\n -md5 Use MD5 algorithm.\n -sha256 Use SHA256 algorithm (Default).\n\nEXAMPLES:\n c hash "hello" -> SHA256 of string "hello"\n c hash ./app.js -md5 -> MD5 of file app.js` ,
zh:   `c hash <输入> [-md5|-sha256]\n\n功能描述:\n 计算哈希摘要。自动识别输入是文件路径还是纯字符串。\n\n参数说明:\n 输入 文件路径或字符串文本。\n -md5 使用 MD5 算法。\n -sha256 使用 SHA256 算法 (默认)。\n\n使用示例:\n c hash "hello" -> 字符串 "hello" 的 SHA256\n c hash ./app.js -md5 -> 文件 app.js 的 MD5` ,
es:   `c hash <entrada> [-md5|-sha256]\n\nDESCRIPCIÓN:\n Calcula el resumen hash. Detecta si es ruta de archivo o texto.\n\nARGUMENTOS:\n entrada Ruta de archivo o texto.\n -md5 Usar algoritmo MD5.\n -sha256 Usar algoritmo SHA256 (Por defecto).\n\nEJEMPLOS:\n c hash "hello" -> SHA256 del texto "hello"\n c hash ./app.js -md5 -> MD5 del archivo app.js` ,
ru:   `c hash <ввод> [-md5|-sha256]\n\nОПИСАНИЕ:\n Вычисляет хэш. Авто-определение: путь к файлу или строка.\n\nАРГУМЕНТЫ:\n ввод Путь к файлу или текст.\n -md5 Использовать алгоритм MD5.\n -sha256 Использовать алгоритм SHA256 (По умолчанию).\n\nПРИМЕРЫ:\n c hash "hello" -> SHA256 строки "hello"\n c hash ./app.js -md5 -> MD5 файла app.js` 
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
en:   `c json <input> [output] [mode]\n\nDESCRIPTION:\n Parses and formats JSON files. Validates JSON syntax.\n\nARGUMENTS:\n input Source JSON file.\n output (Optional) Destination file. Use "-" for stdout.\n mode (Optional) "minify" (default) or "pretty".\n\nEXAMPLES:\n c json config.json - pretty -> Print formatted JSON to console\n c json in.json out.json -> Minify and save to out.json` ,
zh:   `c json <输入> [输出] [模式]\n\n功能描述:\n 解析并格式化 JSON 文件。自动校验 JSON 语法。\n\n参数说明:\n 输入 源 JSON 文件。\n 输出 (可选) 目标文件。使用 "-" 输出到控制台。\n 模式 (可选) "minify" (默认，压缩) 或 "pretty" (美化)。\n\n使用示例:\n c json config.json - pretty -> 将美化后的 JSON 打印到控制台\n c json in.json out.json -> 压缩并保存到 out.json` ,
es:   `c json <entrada> [salida] [modo]\n\nDESCRIPCIÓN:\n Analiza y formatea archivos JSON. Valida la sintaxis.\n\nARGUMENTOS:\n entrada Archivo JSON fuente.\n salida (Opcional) Archivo destino. Usa "-" para stdout.\n modo (Opcional) "minify" (defecto) o "pretty".\n\nEJEMPLOS:\n c json config.json - pretty -> Imprimir JSON formateado en consola\n c json in.json out.json -> Minificar y guardar en out.json` ,
ru:   `c json <ввод> [вывод] [режим]\n\nОПИСАНИЕ:\n Парсит и форматирует JSON файлы. Проверяет синтаксис.\n\nАРГУМЕНТЫ:\n ввод Исходный JSON файл.\n вывод (Опционально) Целевой файл. Используйте "-" для stdout.\n режим (Опционально) "minify" (по умолчанию) или "pretty".\n\nПРИМЕРЫ:\n c json config.json - pretty -> Вывести форматированный JSON в консоль\n c json in.json out.json -> Минифицировать и сохранить в out.json` 
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
en:   `c config [name] [value]\n\nDESCRIPTION:\n Manages global settings like language preferences.\n\nARGUMENTS:\n name Config key (e.g., "language").\n value Config value (e.g., "en", "zh", "es", "ru").\n\nEXAMPLES:\n c config -> View all current configs\n c config language es -> Set interface language to Spanish` ,
zh:   `c config [名称] [值]\n\n功能描述:\n 管理全局设置，如语言偏好。\n\n参数说明:\n 名称 配置键 (例如: "language")。\n 值 配置值 (例如: "en", "zh", "es", "ru")。\n\n使用示例:\n c config -> 查看所有当前配置\n c config language zh -> 将界面语言设置为中文` ,
es:   `c config [nombre] [valor]\n\nDESCRIPCIÓN:\n Gestiona ajustes globales como el idioma.\n\nARGUMENTOS:\n nombre Clave de config (ej. "language").\n valor Valor de config (ej. "en", "zh", "es", "ru").\n\nEJEMPLOS:\n c config -> Ver todas las configuraciones\n c config language es -> Cambiar idioma a Español` ,
ru:   `c config [имя] [значение]\n\nОПИСАНИЕ:\n Управление глобальными настройками, такими как язык.\n\nАРГУМЕНТЫ:\n имя Ключ конфига (напр. "language").\n значение Значение (напр. "en", "zh", "es", "ru").\n\nПРИМЕРЫ:\n c config -> Посмотреть все текущие настройки\n c config language ru -> Установить русский язык` 
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
en:   `c manage <action> [arguments]\n\nDESCRIPTION:\n Manages installed extension packages, inspects commands, and installs local plugins.\n\nACTIONS:\n list [-enable|-disable] List packages filtered by status.\n list -c List all available commands across all enabled packages.\n list -all Show detailed package list (Name - Commands - Time - Size).\n list <file1.js> [file2.js]... List commands inside specific package file(s).\n disable <name> Disable a package.\n enable <name> Re-enable a disabled package.\n add <local_path> Install a local .js plugin file to the lib folder.\n down Open the official plugin market in your browser.\n\nEXAMPLES:\n c manage list -disable\n c manage list -c\n c manage list -all\n c manage list web.js main.js\n c manage add ./my-plugin.js\n c manage down` ,
zh:   `c manage <操作> [参数]\n\n功能描述:\n 管理已安装的扩展包、查看命令以及安装本地插件。\n\n操作列表:\n list [-enable|-disable] 列出所有包 (可按状态过滤)。\n list -c 列举所有已启用包中的全部命令。\n list -all 显示详细包列表 (包名 - 命令 - 时间 - 大小)。\n list <文件1.js> [文件2.js]... 查看指定包文件内的命令列表。\n disable <name> 禁用一个包。\n enable <name> 重新启用被禁用的包。\n add <本地路径> 安装本地的 .js 插件文件到 lib 文件夹。\n down 在浏览器中打开官方插件市场。\n\n使用示例:\n c manage list -disable\n c manage list -c\n c manage list -all\n c manage list web.js main.js\n c manage add ./my-plugin.js\n c manage down` ,
es:   `c manage <acción> [argumentos]\n\nDESCRIPCIÓN:\n Gestiona paquetes, inspecciona comandos e instala plugins locales.\n\nACCIONES:\n list [-enable|-disable] Listar paquetes por estado.\n list -c Listar todos los comandos de paquetes habilitados.\n list -all Mostrar lista detallada (Nombre - Comandos - Tiempo - Tamaño).\n list <archivo1.js> [...] Listar comandos de archivos específicos.\n disable <name> Deshabilitar un paquete.\n enable <name> Rehabilitar un paquete.\n add <ruta_local> Instalar plugin local .js en lib.\n down Abrir mercado de plugins en el navegador.\n\nEJEMPLOS:\n c manage list -disable\n c manage list -c\n c manage list -all\n c manage list web.js main.js\n c manage add ./my-plugin.js\n c manage down` ,
ru:   `c manage <действие> [аргументы]\n\nОПИСАНИЕ:\n Управление плагинами, просмотр команд и установка локальных плагинов.\n\nДЕЙСТВИЯ:\n list [-enable|-disable] Список пакетов по статусу.\n list -c Список всех команд из включенных пакетов.\n list -all Детальный список (Имя - Команды - Время - Размер).\n list <файл1.js> [...] Список команд в конкретных файлах.\n disable <name> Отключить пакет.\n enable <name> Включить пакет.\n add <локальный_путь> Установить локальный .js плагин в lib.\n down Открыть маркет плагинов в браузере.\n\nПРИМЕРЫ:\n c manage list -disable\n c manage list -c\n c manage list -all\n c manage list web.js main.js\n c manage add ./my-plugin.js\n c manage down` 
},
run: async function(args, ctx) {
const action = args[0];
const libDir = ctx.libDir;
const corePackages = ['main.js'];

if (!action) { console.log(ctx.coreT('help_type_cmd').replace('<command>', 'manage')); return; }

if (action === 'list') {
  const listArgs = args.slice(1);
  try {
    if (!ctx.fs.existsSync(libDir)) ctx.fs.mkdirSync(libDir, { recursive: true });
    const files = ctx.fs.readdirSync(libDir);
    const allBases = new Set();
    files.forEach(f => { if (f.endsWith('.js') || f.endsWith('.js.disabled')) allBases.add(f.replace('.disabled', '')); });
    const sortedBases = Array.from(allBases).sort();

    // 1. list -c (All Commands)
    if (listArgs.includes('-c')) {
      console.log(localT('all_cmds_title', {}, ctx.state.lang));
      let count = 0;
      for (const base of sortedBases) {
        if (!files.includes(base)) continue;
        const filePath = ctx.path.join(libDir, base);
        try {
          delete require.cache[require.resolve(filePath)];
          const plugins = require(filePath);
          const list = Array.isArray(plugins) ? plugins : [plugins];
          for (const p of list) {
            if (p && p.name) {
              const desc = ctx.getLocalizedText(p.description, ctx.state.lang);
              console.log(`  ${ctx.padEnd(p.name, 18)} ${desc}`);
              count++;
            }
          }
        } catch (e) {}
      }
      if (count === 0) console.log('  (No commands found)');
      return;
    }

    // 2. list -all (Detailed List)
    if (listArgs.includes('-all')) {
      for (const base of sortedBases) {
        const isActive = files.includes(base);
        const filePath = ctx.path.join(libDir, base);
        let cmds = [];
        let mtime = '-';
        let size = '-';
        
        const targetPath = isActive ? filePath : filePath + '.disabled';
        if (ctx.fs.existsSync(targetPath)) {
           const stat = ctx.fs.statSync(targetPath);
           mtime = new Date(stat.mtime).toISOString().replace('T', ' ').substring(0, 19);
           size = (stat.size / 1024).toFixed(2) + ' KB';
        }

        if (isActive) {
           try {
              delete require.cache[require.resolve(filePath)];
              const plugins = require(filePath);
              const list = Array.isArray(plugins) ? plugins : [plugins];
              cmds = list.filter(p => p && p.name).map(p => p.name);
           } catch(e) {}
        }
        
        const statusTag = isActive ? '' : ` (${ctx.coreT('manage_status_disabled')})`;
        const cmdStr = cmds.length > 0 ? cmds.join(', ') : '-';
        console.log(`${base}${statusTag} - ${cmdStr} - ${mtime} - ${size}`);
      }
      return;
    }

    // 3. list xxx.js yyy.js (Specific Files)
    const specificFiles = listArgs.filter(a => !a.startsWith('-'));
    if (specificFiles.length > 0) {
      for (const file of specificFiles) {
         const fileName = file.endsWith('.js') ? file : `${file}.js`;
         let filePath = ctx.path.join(libDir, fileName);
         if (!ctx.fs.existsSync(filePath)) {
            if (ctx.fs.existsSync(filePath + '.disabled')) filePath += '.disabled';
            else {
               console.log(ctx.coreT('manage_cmd_notfound', { name: fileName }));
               continue;
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
                console.log(`  ${ctx.padEnd(p.name, 18)} ${desc}`);
                count++;
              }
            }
            if (count === 0) console.log('  (No valid commands found)');
         } catch (e) {
            console.error(`Error reading ${fileName}: ${e.message}`);
         }
      }
      return;
    }

    // 4. list [-enable|-disable] (Default Filter)
    const filter = listArgs.find(a => a.startsWith('-')); 
    console.log(ctx.coreT('manage_list_title'));
    let count = 0;
    for (const base of sortedBases) {
      const isActive = files.includes(base);
      if (filter === '-enable' && !isActive) continue;
      if (filter === '-disable' && isActive) continue;
      
      const status = isActive ? ctx.coreT('manage_status_enabled') : ctx.coreT('manage_status_disabled');
      const core = corePackages.includes(base) ? ` ${ctx.coreT('manage_core_tag')}` : '';
      console.log(`  ${ctx.padEnd(base, 20)} ${status}${core}`);
      count++;
    }
    if (count === 0) console.log(ctx.coreT('manage_no_match'));
    return;
  } catch (e) { console.error(`Error reading lib dir: ${e.message}`); }
  return;
}

if (action === 'disable' || action === 'enable') {
  const name = args[1];
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

if (action === 'add') {
  const localPath = args[1];
  if (!localPath) { console.error(localT('add_nopath', {}, ctx.state.lang)); process.exit(1); }
  const absPath = ctx.path.resolve(localPath);
  if (!ctx.fs.existsSync(absPath)) {
     console.error(localT('add_notfound', { path: absPath }, ctx.state.lang)); process.exit(1);
  }
  if (!absPath.toLowerCase().endsWith('.js')) {
     console.error(localT('add_invalid_ext', {}, ctx.state.lang)); process.exit(1);
  }
  
  if (!ctx.fs.existsSync(libDir)) ctx.fs.mkdirSync(libDir, { recursive: true });
  const fileName = ctx.path.basename(absPath);
  const destPath = ctx.path.join(libDir, fileName);
  
  try {
     ctx.fs.copyFileSync(absPath, destPath);
     console.log(localT('add_success', { name: fileName }, ctx.state.lang));
  } catch(e) {
     console.error(localT('add_error', { msg: e.message }, ctx.state.lang)); process.exit(1);
  }
  return;
}

if (action === 'down') {
  const marketUrl = 'https://c-api-plugins.hellowyq.com/';
  console.log(localT('down_hint', { url: marketUrl }, ctx.state.lang));
  const cmd = process.platform === 'win32' ? `start "" "${marketUrl}"` : process.platform === 'darwin' ? `open "${marketUrl}"` : `xdg-open "${marketUrl}"`;
  ctx.child_process.exec(cmd);
  return;
}

console.error(ctx.coreT('manage_error_invalid')); 
process.exit(1);
}
},
{
name: 'about',
description: { en: 'Show software info, license, and docs', zh: '显示软件信息、许可证和文档', es: 'Mostrar info del software, licencia y docs', ru: 'Показать информацию о ПО, лицензии и доки' },
help: {
en:  `c about [topic]\n\nDESCRIPTION:\n Displays software details, license, or opens documentation.\n\nARGUMENTS:\n version Show version number.\n license Show license info.\n docs Open official documentation.\n software Show system & environment info.\n\nEXAMPLES:\n c about -> Shows all info\n c about docs -> Opens wiki in browser` ,
zh:  `c about [主题]\n\n功能描述:\n 显示软件详细信息、许可证或打开文档。\n\n参数说明:\n version 显示版本号。\n license 显示许可证信息。\n docs 打开官方文档。\n software 显示系统与环境信息。\n\n使用示例:\n c about -> 显示所有信息\n c about docs -> 在浏览器中打开 wiki` ,
es:  `c about [tema]\n\nDESCRIPCIÓN:\n Muestra detalles del software, licencia o abre documentación.\n\nARGUMENTOS:\n version Mostrar versión.\n license Mostrar licencia.\n docs Abrir documentación.\n software Mostrar info del sistema.\n\nEJEMPLOS:\n c about -> Muestra todo\n c about docs -> Abre wiki` ,
ru:  `c about [тема]\n\nОПИСАНИЕ:\n Показывает информацию о ПО, лицензию или открывает документацию.\n\nАРГУМЕНТЫ:\n version Показать версию.\n license Показать лицензию.\n docs Открыть документацию.\n software Показать инфо о системе.\n\nПРИМЕРЫ:\n c about -> Показать всё\n c about docs -> Открыть wiki` 
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

// ==========================================
// 插件市场元数据 (Plugin Market Metadata)
// ==========================================
module.exports.information = {
  module_name: {
    "zh": "官方核心工具包",
    "en": "Core Utilities",
    "es": "Core Utilities",
    "ru": "Core Utilities"
  },
  module_other: {
    "zh": "本包禁止禁用",
    "en": "Built-in core plugin. Cannot be disabled.",
    "es": "Built-in core plugin. Cannot be disabled.",
    "ru": "Built-in core plugin. Cannot be disabled."
  },
  file_name: "main.js",
  module_v: "1.0.4",
  module_commandapi_v: "1.0.4",
  module_lang: ['en', 'zh', 'es', 'ru'],
  module_writer: "Wanyyq",
  module_tag: ['Core', 'Tool', 'System', 'Manager'],
  module_platform: ['linux', 'windows', 'mac', 'other'],
  module_create: "2026-01-05",
  module_update: "2026-06-23",
  module_express: {
    "zh": "Command+ API 官方核心工具包，包含文本生成、时间戳、哈希计算、JSON处理、配置管理以及强大的插件包管理器。",
    "en": "Official core utilities for Command+ API, including text generation, timestamps, hashing, JSON processing, config management, and the powerful plugin package manager.",
    "es": "Utilidades oficiales principales para Command+ API, que incluyen generación de texto, marcas de tiempo, hash, procesamiento JSON, gestión de configuraciones y el potente gestor de paquetes.",
    "ru": "Официальные основные утилиты для Command+ API, включая генерацию текста, метки времени, хэширование, обработку JSON, управление конфигурацией и мощный менеджер плагинов."
  }
};