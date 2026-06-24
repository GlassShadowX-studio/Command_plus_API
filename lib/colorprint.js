module.exports = [
  {
    name: 'colorprint',
    description: {
      en: 'Print colored text to the terminal',
      zh: '在终端输出彩色文本',
      es: 'Imprimir texto coloreado en la terminal',
      ru: 'Вывод цветного текста в терминал'
    },
    help: {
      en: `c colorprint "<text>" [fg] [bg]\n\nDESCRIPTION:\n Prints custom text with specified foreground and background colors.\n Uses standard ANSI escape codes, fully compatible with modern terminals (Win10+, Linux, macOS).\n\nARGUMENTS:\n text  The string to print.\n fg    (Optional) Foreground color name. Default: 'default'.\n bg    (Optional) Background color name. Default: 'default'.\n\nAVAILABLE COLORS:\n Standard: black, red, green, yellow, blue, magenta, cyan, white\n Bright:   gray(grey), brightred, brightgreen, brightyellow, brightblue\n           brightmagenta, brightcyan, brightwhite\n Reset:    default\n\nEXAMPLES:\n c colorprint "Hello World" red black\n c colorprint "Warning!" yellow\n c colorprint "Success" brightgreen default`,
      zh: `c colorprint "<文本>" [前景色] [背景色]\n\n功能描述:\n 使用指定的前景色和背景色打印自定义文本。\n 采用标准 ANSI 转义码，完美兼容现代终端 (Win10+, Linux, macOS)。\n\n参数说明:\n 文本      要打印的字符串。\n 前景色    (可选) 前景色名称。默认: 'default'。\n 背景色    (可选) 背景色名称。默认: 'default'。\n\n支持的颜色:\n 标准色: black, red, green, yellow, blue, magenta, cyan, white\n 亮色:   gray(或grey), brightred, brightgreen, brightyellow, brightblue\n         brightmagenta, brightcyan, brightwhite\n 默认:   default\n\n使用示例:\n c colorprint "Hello World" red black\n c colorprint "Warning!" yellow\n c colorprint "Success" brightgreen default`,
      es: `c colorprint "<texto>" [fg] [bg]\n\nDESCRIPCIÓN:\n Imprime texto personalizado con colores de primer plano y fondo.\n Usa códigos de escape ANSI, compatible con terminales modernas (Win10+, Linux, macOS).\n\nARGUMENTOS:\n texto  La cadena a imprimir.\n fg    (Opcional) Color de primer plano. Por defecto: 'default'.\n bg    (Opcional) Color de fondo. Por defecto: 'default'.\n\nCOLORES DISPONIBLES:\n Estándar: black, red, green, yellow, blue, magenta, cyan, white\n Brillo:   gray(grey), brightred, brightgreen, brightyellow, brightblue\n           brightmagenta, brightcyan, brightwhite\n Reset:    default\n\nEJEMPLOS:\n c colorprint "Hello World" red black\n c colorprint "Warning!" yellow\n c colorprint "Success" brightgreen default`,
      ru: `c colorprint "<текст>" [fg] [bg]\n\nОПИСАНИЕ:\n Выводит пользовательский текст с указанным цветом текста и фона.\n Использует стандартные ANSI-коды, совместимо с современными терминалами (Win10+, Linux, macOS).\n\nАРГУМЕНТЫ:\n текст  Строка для вывода.\n fg    (Опц.) Цвет текста. По умолч.: 'default'.\n bg    (Опц.) Цвет фона. По умолч.: 'default'.\n\nДОСТУПНЫЕ ЦВЕТА:\n Стандарт: black, red, green, yellow, blue, magenta, cyan, white\n Яркие:    gray(grey), brightred, brightgreen, brightyellow, brightblue\n           brightmagenta, brightcyan, brightwhite\n Сброс:    default\n\nПРИМЕРЫ:\n c colorprint "Hello World" red black\n c colorprint "Warning!" yellow\n c colorprint "Success" brightgreen default`
    },
    run: async function(args, ctx) {
      if (args.length === 0) {
        console.error('Error: Text is required. Usage: c colorprint "<text>" [fg] [bg]');
        process.exit(1);
      }

      const text = args[0];
      const fgName = (args[1] || 'default').toLowerCase();
      const bgName = (args[2] || 'default').toLowerCase();

      // ANSI 颜色码映射 (前景色 30-37, 90-97 / 背景色 40-47, 100-107)
      const fgColors = {
        black: 30, red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, white: 37,
        gray: 90, grey: 90, brightred: 91, brightgreen: 92, brightyellow: 93, brightblue: 94,
        brightmagenta: 95, brightcyan: 96, brightwhite: 97, default: 39
      };

      const bgColors = {
        black: 40, red: 41, green: 42, yellow: 43, blue: 44, magenta: 45, cyan: 46, white: 47,
        gray: 100, grey: 100, brightred: 101, brightgreen: 102, brightyellow: 103, brightblue: 104,
        brightmagenta: 105, brightcyan: 106, brightwhite: 107, default: 49
      };

      const fgCode = fgColors[fgName];
      const bgCode = bgColors[bgName];

      if (fgCode === undefined) {
        console.error(`Error: Unknown foreground color '${fgName}'.`);
        console.error('Available: ' + Object.keys(fgColors).filter((v, i, a) => a.indexOf(v) === i).join(', '));
        process.exit(1);
      }
      if (bgCode === undefined) {
        console.error(`Error: Unknown background color '${bgName}'.`);
        console.error('Available: ' + Object.keys(bgColors).filter((v, i, a) => a.indexOf(v) === i).join(', '));
        process.exit(1);
      }

      // 拼接 ANSI 转义序列: \x1b[{前景色};{背景色}m + 文本 + \x1b[0m (重置)
      const coloredText = `\x1b[${fgCode};${bgCode}m${text}\x1b[0m`;
      console.log(coloredText);
    }
  }
];


// ==========================================
// 插件市场元数据 (Plugin Market Metadata)
// ==========================================
module.exports.information = {
  module_icon:"terminal",
  module_name: {
    "zh": "终端彩色文本输出",
    "en": "Terminal Color Print",
    "es": "Impresión a Color en Terminal",
    "ru": "Цветной Вывод в Терминал"
  },
  module_other: {
    "zh": "无特殊依赖",
    "en": "No special dependencies",
    "es": "Sin dependencias especiales",
    "ru": "Без специальных зависимостей"
  },
  file_name: "colorprint.js",
  module_v: "1.1.0",
  module_commandapi_v: "1.0.2",
  module_lang: ['en', 'zh', 'es', 'ru'],
  module_writer: "Wanyyq",
  module_tag: ['Tool', 'CLI', 'UI', 'Utility'],
  module_platform: ['linux', 'windows', 'mac', 'other'],
  module_create: "2026-01-05",
  module_update: "2026-06-23",
  module_express: {
    "zh": "轻量级终端彩色文本生成工具，支持自定义前景色与背景色，采用标准 ANSI 转义码，完美兼容现代终端。",
    "en": "Lightweight terminal colored text generator supporting custom foreground and background colors using standard ANSI escape codes, fully compatible with modern terminals.",
    "es": "Generador de texto coloreado para terminal que soporta colores de primer plano y fondo usando códigos ANSI estándar.",
    "ru": "Легковесный генератор цветного текста для терминала с поддержкой стандартных ANSI-кодов."
  }
};