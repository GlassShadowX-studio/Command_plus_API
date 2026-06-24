module.exports = [
  {
    name: 'find',
    description: { en: 'Recursively search files by pattern', zh: '按模式递归搜索文件', es: 'Buscar archivos recursivamente por patrón', ru: 'Рекурсивный поиск файлов по маске' },
    help: {
        en:  `c find <pattern>\n\nDESCRIPTION:\n Recursively searches for files matching a wildcard pattern.\n Note: Matches against the file name only, not the full path.\n\nARGUMENTS:\n pattern Wildcard pattern (* matches any, ? matches single).\n\nEXAMPLES:\n c find "*.js" -> Finds all JavaScript files`,
        zh:  `c find <模式>\n\n功能描述:\n 递归搜索匹配通配符模式的文件。\n 注意：仅匹配文件名，不支持路径匹配（如 src/*.js）。\n\n参数说明:\n 模式 通配符模式 (* 匹配任意，? 匹配单个)。\n\n使用示例:\n c find "*.js" -> 查找所有 JavaScript 文件`,
        es:  `c find <patrón>\n\nDESCRIPCIÓN:\n Busca recursivamente archivos que coincidan con comodines.\n Nota: Solo coincide con el nombre del archivo, no con la ruta.\n\nARGUMENTOS:\n patrón Patrón con comodines (* para todo, ? para uno).\n\nEJEMPLOS:\n c find "*.js" -> Encuentra todos los archivos JS`,
        ru:  `c find <шаблон>\n\nОПИСАНИЕ:\n Рекурсивный поиск файлов по маске.\n Примечание: Поиск только по имени файла, без учета пути.\n\nАРГУМЕНТЫ:\n шаблон Маска (* для любых, ? для одного символа).\n\nПРИМЕРЫ:\n c find "*.js" -> Найти все JavaScript файлы`
    },
    run: async function(args, ctx) {
      if (args.length === 0) { console.error('Error: pattern is required'); process.exit(1); }
      
      // 修复：先转义所有正则特殊字符（包括 * 和 ?），再替换为正则通配符
      const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      let regexStr = escapeRegex(args[0]);
      regexStr = regexStr.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
      
      const regex = new RegExp(`^${regexStr}$`, process.platform === 'win32' ? 'i' : '');
      
      const search = (dir) => { 
        try { 
          ctx.fs.readdirSync(dir).forEach(f => { 
            if(f==='node_modules')return; 
            const p=ctx.path.join(dir,f); 
            try {
              const s=ctx.fs.statSync(p); 
              if(s.isDirectory())search(p); 
              else if(regex.test(f))console.log(p); 
            } catch(e){}
          }); 
        } catch(e){} 
      };
      search(process.cwd());
    }
  },
  {
    name: 'tree',
    description: { en: 'Display directory tree structure', zh: '显示目录树结构', es: 'Mostrar estructura de árbol de directorios', ru: 'Отображение структуры дерева каталогов' },
    help: {
      en: `c tree [-json]\n\nDESCRIPTION:\n  Visualizes the folder structure in a tree format.\n\nARGUMENTS:\n  -json  (Optional) Outputs the tree as a structured JSON object.\n\nEXAMPLES:\n  c tree         -> Prints ASCII tree to console`,
      zh: `c tree [-json]\n\n功能描述:\n  以树状格式可视化文件夹结构。\n\n参数说明:\n  -json  (可选) 将树结构作为结构化 JSON 对象输出。\n\n使用示例:\n  c tree         -> 将 ASCII 树打印到控制台`,
      es: `c tree [-json]\n\nDESCRIPCIÓN:\n  Visualiza la estructura de carpetas en formato de árbol.\n\nARGUMENTOS:\n  -json  (Opcional) Devuelve el árbol como objeto JSON.\n\nEJEMPLOS:\n  c tree         -> Imprime árbol ASCII en consola`,
      ru: `c tree [-json]\n\nОПИСАНИЕ:\n  Визуализирует структуру папок в виде дерева.\n\nАРГУМЕНТЫ:\n  -json  (Опционально) Выводит дерево как JSON объект.\n\nПРИМЕРЫ:\n  c tree         -> Печатает ASCII дерево в консоль`
    },
    run: async function(args, ctx) {
      const isJson = args.includes('-json'); const cwd = process.cwd();
      const build = (dir, d) => { 
        const n={name:ctx.path.basename(dir),type:'directory',children:[]}; 
        if(d>=5)return n; 
        try{
          ctx.fs.readdirSync(dir).filter(f=>!['node_modules','.git'].includes(f)).forEach(f=>{
            const p=ctx.path.join(dir,f);
            try {
              const s=ctx.fs.statSync(p);
              if(s.isDirectory())n.children.push(build(p,d+1));
              else n.children.push({name:f,type:'file'});
            } catch(e){}
          });
        }catch(e){} 
        return n; 
      };
      const tree = build(cwd, 0);
      if (isJson) { console.log(JSON.stringify(tree, null, 2)); return; }
      const print = (n, p='', l=true) => { console.log(p+(l?'└── ':'├── ')+n.name); const np=p+(l?'    ':'│   '); if(n.children)n.children.forEach((c,i)=>print(c,np,i===n.children.length-1)); };
      console.log(tree.name); tree.children.forEach((c,i)=>print(c,'',i===tree.children.length-1));
    }
  },
  {
    name: 'zip',
    description: { en: 'Compress or extract ZIP archives', zh: '压缩或解压 ZIP 归档文件', es: 'Comprimir o extraer archivos ZIP', ru: 'Сжатие или распаковка ZIP архивов' },
    help: {
      en: `c zip <source> <destination> <mode> [forced]\n\nDESCRIPTION:\n  Cross-platform ZIP utility.\n\nARGUMENTS:\n  source       Path to file/directory.\n  destination  Output path.\n  mode         "zip" or "unzip".\n  forced       (Optional) "true" to skip prompts.\n\nEXAMPLES:\n  c zip ./src ./backup.zip zip`,
      zh: `c zip <源路径> <目标路径> <模式> [强制覆盖]\n\n功能描述:\n  跨平台 ZIP 工具。\n\n参数说明:\n  源路径       文件/目录的路径。\n  目标路径     输出路径。\n  模式         "zip" 或 "unzip"。\n  强制覆盖     (可选) "true" 以跳过提示。\n\n使用示例:\n  c zip ./src ./backup.zip zip`,
      es: `c zip <origen> <destino> <modo> [forzar]\n\nDESCRIPCIÓN:\n  Utilidad ZIP multiplataforma.\n\nARGUMENTOS:\n  origen       Ruta al archivo/directorio.\n  destino      Ruta de salida.\n  modo         "zip" o "unzip".\n  forzar       (Opcional) "true" para saltar avisos.\n\nEJEMPLOS:\n  c zip ./src ./backup.zip zip`,
      ru: `c zip <источник> <цель> <режим> [принудительно]\n\nОПИСАНИЕ:\n  Кроссплатформенная утилита ZIP.\n\nАРГУМЕНТЫ:\n  источник       Путь к файлу/папке.\n  цель           Путь вывода.\n  режим          "zip" или "unzip".\n  принудительно  (Опционально) "true" чтобы пропустить запросы.\n\nПРИМЕРЫ:\n  c zip ./src ./backup.zip zip`
    },
    run: async function(args, ctx) {
      if (!ctx.compressing) { console.error('Error: compressing module missing.'); process.exit(1); }
      if (args.length < 3) { console.error('Error: Usage: c zip <src> <dest> <mode> [forced]'); process.exit(1); }
      let src = ctx.path.resolve(args[0]); let dest = ctx.path.resolve(args[1]);
      const mode = args[2].toLowerCase(); const forced = ['true', '1'].includes((args[3] || '').toLowerCase());
      if (mode === 'zip' && !dest.toLowerCase().endsWith('.zip')) dest += '.zip';
      if (!ctx.fs.existsSync(src)) { console.error(`Error: file not found: ${src}`); process.exit(1); }

      if (ctx.fs.existsSync(dest)) {
        if (forced) { ctx.fs.rmSync(dest, { recursive: true, force: true }); } 
        else {
          if (!process.stdin.isTTY) { console.error('Error: Target exists. Use forced=true in non-TTY.'); process.exit(1); }
          const rl = ctx.readline.createInterface({ input: process.stdin, output: process.stdout });
          const ans = await new Promise(r => rl.question(`Target exists. Overwrite? (y/N) `, r)); rl.close();
          if (ans.toLowerCase() !== 'y') { console.log('Cancelled.'); process.exit(0); }
          ctx.fs.rmSync(dest, { recursive: true, force: true });
        }
      }
      try {
        if (mode === 'zip') await ctx.compressing.zip.compressDir(src, dest);
        else if (mode === 'unzip') { if (!ctx.fs.existsSync(dest)) ctx.fs.mkdirSync(dest, { recursive: true }); await ctx.compressing.zip.uncompress(src, dest); }
        else { console.error('Error: Mode must be zip or unzip'); process.exit(1); }
        console.log('Success.');
      } catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
    }
  }
];


// ==========================================
// 插件市场元数据 (Plugin Market Metadata)
// ==========================================
module.exports.information = {
  module_icon:"Computer",
  module_name: {
    "zh": "系统与文件",
    "en": "System & File Tools",
    "es": "System & File Tools",
    "ru": "System & File Tools"
  },
  module_other: {
    "zh": "提供基于通配符的文件递归搜索、目录树可视化生成以及跨平台的 ZIP 压缩与解压功能。",
    "en": "Requires 'compressing' dependency for ZIP features.",
    "es": "Requires 'compressing' dependency for ZIP features.",
    "ru": "Requires 'compressing' dependency for ZIP features."
  },
  file_name: "system.js",
  module_v: "1.0.5",
  module_commandapi_v: "1.0.3",
  module_lang: ['en', 'zh', 'es', 'ru'],
  module_writer: "Wanyyq",
  module_tag: ['System', 'File', 'ZIP', 'Search', 'Tree'],
  module_platform: ['linux', 'windows', 'mac', 'other'],
  module_create: "2026-01-05",
  module_update: "2026-06-23",
  module_express: {
    "zh": "系统与文件操作扩展，提供基于通配符的文件递归搜索、目录树可视化生成以及跨平台的 ZIP 压缩与解压功能。",
    "en": "System and file operation extension providing recursive wildcard file search, directory tree visualization, and cross-platform ZIP compression/extraction.",
    "es": "Extensión de operaciones de sistema y archivos que proporciona búsqueda recursiva de archivos, visualización de árboles de directorios y compresión/extracción ZIP multiplataforma.",
    "ru": "Расширение для работы с системой и файлами, обеспечивающее рекурсивный поиск файлов, визуализацию дерева каталогов и кроссплатформенное сжатие/распаковку ZIP."
  }
};