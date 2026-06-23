#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

// ==========================================
// 全局统一版本号 (修改此处即可更新全软件版本)
// ==========================================
const VERSION = '1.0.4';

const state = { lang: 'en' };
const CONFIG_DIR = path.join(os.homedir(), '.cmdplus');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

// ==========================================
// 核心多语言配置 (Core I18N)
// ==========================================
const CoreI18N = {
  en: {
    help_title: 'Command+ API v{version}', help_usage: 'Usage: c <command> [arguments]',
    help_available: 'Available commands:', help_type_help: "Type 'c help' for this message.",
    help_type_cmd: "Type 'c <command> --help' for command details.",
    help_namespace_hint: "Tip: Use 'c <package>.<command>' to specify a package's command (e.g., c main.text).",
    error_unknown_cmd: 'Unknown command: {cmd}', 
    error_plugin_load: '[Core] Failed to load plugin {file}: {msg}',
    error_plugin_invalid: '[Core] Invalid plugin structure in {file}. Auto-disabled.',
    error_plugin_run: '[Runtime Error] in "{cmd}": {msg}', error_core_crash: '[Fatal] Unexpected error: {msg}',
    config_updated: 'Config updated: {key} = {value}',
    manage_list_title: 'Installed Packages:', manage_status_enabled: '[+] Enabled', manage_status_disabled: '[-] Disabled',
    manage_core_tag: '[CORE]', manage_success: 'Success: \'{name}\' has been {action}. Restart terminal.',
    manage_error_core: 'Error: Core package \'{name}\' cannot be disabled.',
    manage_error_notfound: 'Error: Package \'{name}\' is already {action} or not found.',
    manage_error_invalid: 'Error: Invalid action. Use list, disable, enable, command, or add-web.',
    manage_no_match: '  (No packages found matching the filter)',
    manage_cmd_notfound: 'Error: Package \'{name}\' not found in lib folder.',
    manage_cmd_title: 'Commands in {name}:',
    manage_download_success: 'Success: Downloaded \'{name}\' to lib folder. Restart terminal.',
    manage_download_error: 'Error: Failed to download: {msg}',
    about_env_info: '--- Software & Environment Info ---',
    about_name: 'Name', about_version: 'Version', about_nodejs: 'Node.js',
    about_platform: 'Platform', about_base_path: 'Base Path', about_executable: 'Executable',
    about_docs: 'Documentation', about_open_docs_hint: '(Use "c about docs" to open in browser)'
  },
  zh: {
    help_title: 'Command+ API v{version}', help_usage: '用法：c <command> [arguments]',
    help_available: '可用命令：', help_type_help: "输入 'c help' 查看此帮助信息。",
    help_type_cmd: "输入 'c <command> --help' 查看命令详情。",
    help_namespace_hint: "提示：使用 'c <包名>.<命令>' 可指定运行特定包的命令 (例如 c main.text)。",
    error_unknown_cmd: '未知命令: {cmd}', 
    error_plugin_load: '[核心] 加载插件 {file} 失败: {msg}',
    error_plugin_invalid: '[核心] {file} 插件结构无效，已自动禁用。',
    error_plugin_run: '[运行错误] 在 "{cmd}" 中: {msg}', error_core_crash: '[致命] 发生未预期的错误: {msg}',
    config_updated: '配置已更新: {key} = {value}',
    manage_list_title: '已安装的包:', manage_status_enabled: '[+] 已启用', manage_status_disabled: '[-] 已禁用',
    manage_core_tag: '[核心]', manage_success: '成功: \'{name}\' 已被 {action}。重启终端以生效。',
    manage_error_core: '错误: 核心包 \'{name}\' 无法被禁用。',
    manage_error_notfound: '错误: 包 \'{name}\' 已经 {action} 或未找到。',
    manage_error_invalid: '错误: 无效的操作。请使用 list, disable, enable, command 或 add-web。',
    manage_no_match: '  (未找到匹配过滤条件的包)',
    manage_cmd_notfound: '错误: 在 lib 文件夹中未找到包 \'{name}\'。',
    manage_cmd_title: '{name} 中的命令列表:',
    manage_download_success: '成功: 已下载 \'{name}\' 到 lib 文件夹。重启终端以生效。',
    manage_download_error: '错误: 下载失败: {msg}',
    about_env_info: '--- 软件与环境信息 ---',
    about_name: '名称', about_version: '版本', about_nodejs: 'Node.js',
    about_platform: '平台', about_base_path: '基础路径', about_executable: '可执行文件',
    about_docs: '官方文档', about_open_docs_hint: '(使用 "c about docs" 在浏览器中打开)'
  },
  es: {
    help_title: 'Command+ API v{version}', help_usage: 'Uso: c <comando> [argumentos]',
    help_available: 'Comandos disponibles:', help_type_help: "Escribe 'c help' para este mensaje.",
    help_type_cmd: "Escribe 'c <comando> --help' para detalles.",
    help_namespace_hint: "Consejo: Usa 'c <paquete>.<comando>' para especificar un paquete (ej. c main.text).",
    error_unknown_cmd: 'Comando desconocido: {cmd}', 
    error_plugin_load: '[Core] Error al cargar plugin {file}: {msg}',
    error_plugin_invalid: '[Core] Estructura inválida en {file}. Deshabilitado auto.',
    error_plugin_run: '[Error] en "{cmd}": {msg}', error_core_crash: '[Fatal] Error inesperado: {msg}',
    config_updated: 'Configuración actualizada: {key} = {value}',
    manage_list_title: 'Paquetes instalados:', manage_status_enabled: '[+] Habilitado', manage_status_disabled: '[-] Deshabilitado',
    manage_core_tag: '[CORE]', manage_success: 'Éxito: \'{name}\' ha sido {action}. Reinicia la terminal.',
    manage_error_core: 'Error: El paquete core \'{name}\' no se puede deshabilitar.',
    manage_error_notfound: 'Error: Paquete \'{name}\' ya está {action} o no encontrado.',
    manage_error_invalid: 'Error: Acción inválida. Usa list, disable, enable, command o add-web.',
    manage_no_match: '  (No se encontraron paquetes que coincidan con el filtro)',
    manage_cmd_notfound: 'Error: Paquete \'{name}\' no encontrado en lib.',
    manage_cmd_title: 'Comandos en {name}:',
    manage_download_success: 'Éxito: Descargado \'{name}\' en lib. Reinicia la terminal.',
    manage_download_error: 'Error: Fallo al descargar: {msg}',
    about_env_info: '--- Información del Software y Entorno ---',
    about_name: 'Nombre', about_version: 'Versión', about_nodejs: 'Node.js',
    about_platform: 'Plataforma', about_base_path: 'Ruta Base', about_executable: 'Ejecutable',
    about_docs: 'Documentación', about_open_docs_hint: '(Usa "c about docs" para abrir en el navegador)'
  },
  ru: {
    help_title: 'Command+ API v{version}', help_usage: 'Использование: c <команда> [аргументы]',
    help_available: 'Доступные команды:', help_type_help: "Введите 'c help' для этого сообщения.",
    help_type_cmd: "Введите 'c <команда> --help' для деталей.",
    help_namespace_hint: "Совет: Используйте 'c <пакет>.<команда>' для выбора пакета (напр. c main.text).",
    error_unknown_cmd: 'Неизвестная команда: {cmd}', 
    error_plugin_load: '[Ядро] Ошибка загрузки плагина {file}: {msg}',
    error_plugin_invalid: '[Ядро] Неверная структура {file}. Авто-отключение.',
    error_plugin_run: '[Ошибка] в "{cmd}": {msg}', error_core_crash: '[Фатально] Непредвиденная ошибка: {msg}',
    config_updated: 'Конфигурация обновлена: {key} = {value}',
    manage_list_title: 'Установленные пакеты:', manage_status_enabled: '[+] Включен', manage_status_disabled: '[-] Отключен',
    manage_core_tag: '[ЯДРО]', manage_success: 'Успех: \'{name}\' был {action}. Перезапустите терминал.',
    manage_error_core: 'Ошибка: Базовый пакет \'{name}\' нельзя отключить.',
    manage_error_notfound: 'Ошибка: Пакет \'{name}\' уже {action} или не найден.',
    manage_error_invalid: 'Ошибка: Неверное действие. Используйте list, disable, enable, command или add-web.',
    manage_no_match: '  (Пакеты, соответствующие фильтру, не найдены)',
    manage_cmd_notfound: 'Ошибка: Пакет \'{name}\' не найден в lib.',
    manage_cmd_title: 'Команды в {name}:',
    manage_download_success: 'Успех: \'{name}\' загружен в lib. Перезапустите терминал.',
    manage_download_error: 'Ошибка: Не удалось загрузить: {msg}',
    about_env_info: '--- Информация о ПО и среде ---',
    about_name: 'Имя', about_version: 'Версия', about_nodejs: 'Node.js',
    about_platform: 'Платформа', about_base_path: 'Базовый путь', about_executable: 'Исполняемый файл',
    about_docs: 'Документация', about_open_docs_hint: '(Используйте "c about docs", чтобы открыть в браузере)'
  }
};

function coreT(key, args = {}) {
  let str = CoreI18N[state.lang] && CoreI18N[state.lang][key] ? CoreI18N[state.lang][key] : (CoreI18N.en[key] || key);
  for (const k in args) str = str.replace(`{${k}}`, args[k]);
  return str;
}

function getLocalizedText(obj, lang) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'object') return obj[lang] || obj['en'] || Object.values(obj)[0] || '';
  return String(obj);
}

function getConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  } catch (e) {}
  return { language: 'en' };
}

function setConfig(key, value) {
  const config = getConfig();
  config[key] = value;
  try {
    if (!fs.existsSync(CONFIG_DIR)) fs.mkdirSync(CONFIG_DIR, { recursive: true });
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (e) {
    console.error(`[Config Error] Failed to save: ${e.message}`);
  }
}

function padEnd(str, len) {
  let width = 0;
  for (let char of str) width += char.match(/[\u4e00-\u9fa5\u3040-\u309f\u30a0-\u30ff]/) ? 2 : 1;
  return str + ' '.repeat(Math.max(0, len - width));
}

// ==========================================
// 主类与沙箱隔离加载器
// ==========================================
class CommandPlus {
  constructor() {
    this.commands = {};
    this.loadPlugins();
  }

  loadPlugins() {
    const basePath = process.pkg ? path.dirname(process.execPath) : __dirname;
    const libDir = path.join(basePath, 'lib');
    let compressing = null;
    try { compressing = require('compressing'); } catch (e) {}
    
    this.ctx = {
      coreT, getLocalizedText, state, getConfig, setConfig, libDir, basePath, padEnd,
      fs, path, os, crypto: require('crypto'),
      child_process: require('child_process'),
      http: require('http'), https: require('https'), url: require('url'),
      net: require('net'), readline: require('readline'),
      compressing,
      version: VERSION,
      platform: process.platform,
      arch: os.arch()
    };

    Object.defineProperty(this.ctx, 'language', {
      get: function() { return state.lang; },
      enumerable: true
    });

    if (!fs.existsSync(libDir)) return;
    const files = fs.readdirSync(libDir);
    
    for (const file of files) {
      if (file.endsWith('.js')) {
        try {
          const pluginModule = require(path.join(libDir, file));
          const plugins = Array.isArray(pluginModule) ? pluginModule : [pluginModule];
          let hasValidPlugin = false;
          
          const baseName = path.basename(file, '.js'); 
          
          for (const plugin of plugins) {
            if (plugin && plugin.name && typeof plugin.run === 'function') {
              plugin._sourceFile = file;
              plugin._baseName = baseName;
              hasValidPlugin = true;
              
              this.commands[plugin.name] = plugin;
              
              const nsName = `${baseName}.${plugin.name}`;
              const nsPlugin = { ...plugin, name: nsName, _isNamespaced: true };
              this.commands[nsName] = nsPlugin;
            }
          }
          
          if (!hasValidPlugin) throw new Error('Missing required exports (name/run)');
        } catch (e) {
          console.error(coreT('error_plugin_load', { file, msg: e.message }));
          try {
            const src = path.join(libDir, file);
            const dest = path.join(libDir, file + '.disabled');
            if (fs.existsSync(src)) {
              fs.renameSync(src, dest);
              console.error(coreT('error_plugin_invalid', { file }));
            }
          } catch (renameErr) { /* ignore */ }
        }
      }
    }
  }

  async run(cmdArgs) {
    const config = getConfig();
    let lang = config.language || 'en';
    if (lang === 'ch') lang = 'zh';
    state.lang = lang;

    if (!cmdArgs || cmdArgs.length === 0 || cmdArgs[0] === 'help' || cmdArgs[0] === '--help' || cmdArgs[0] === '-h') {
      this.showHelp(); return;
    }

    const cmdName = cmdArgs[0];
    const args = cmdArgs.slice(1);

    if (args.length > 0 && (args[args.length - 1] === '--help' || args[args.length - 1] === '-h')) {
      if (this.commands[cmdName]) {
        const helpText = getLocalizedText(this.commands[cmdName].help, state.lang);
        console.log(helpText || 'No help documentation available for this command.');
      } else {
        console.error(coreT('error_unknown_cmd', { cmd: cmdName }));
      }
      return;
    }

    const plugin = this.commands[cmdName];
    if (plugin) {
      try {
        await plugin.run(args, this.ctx);
      } catch (e) {
        console.error(coreT('error_plugin_run', { cmd: cmdName, msg: e.message || e }));
        process.exit(1);
      }
    } else {
      console.error(coreT('error_unknown_cmd', { cmd: cmdName }));
      this.showHelp();
      process.exit(1);
    }
  }

  showHelp() {
    console.log(coreT('help_title', { version: VERSION }));
    console.log('─────────────────────────────────────');
    console.log(coreT('help_usage'));
    console.log('\n' + coreT('help_available') + '\n');
    
    const cmdList = Object.values(this.commands)
      .filter(c => !c._isNamespaced)
      .sort((a, b) => a.name.localeCompare(b.name));
      
    for (const c of cmdList) {
      const desc = getLocalizedText(c.description, state.lang);
      console.log(`  ${padEnd(c.name, 14)}${desc}`);
    }
    console.log(`\n${coreT('help_type_help')}\n${coreT('help_type_cmd')}`);
    console.log(`\n${coreT('help_namespace_hint')}`);
  }
}

// ==========================================
// 全局防崩溃兜底 (Global Error Handlers)
// ==========================================
process.on('uncaughtException', (err) => {
  console.error(coreT('error_core_crash', { msg: err.message }));
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error(coreT('error_core_crash', { msg: reason }));
  process.exit(1);
});

if (require.main === module) {
  const cmd = new CommandPlus();
  cmd.run(process.argv.slice(2)).catch(e => { console.error(e); process.exit(1); });
}