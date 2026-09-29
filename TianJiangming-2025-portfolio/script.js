(function () {
  "use strict";

  var root = document.querySelector("#portfolio-preview");
  if (!root) return;

  var languages = { "zh-hans": true, ja: true, en: true };
  var themes = { white: true, gray: true, black: true };
  var currentLanguage = "zh-hans";
  var currentTheme = "white";
  var settings;
  var settingsToggle;

  var copy = {
    heroBody: {
      "zh-hans": "2025—2026，我开始从视觉设计走向 AI 驱动设计。我把视觉、品牌与交互设计经验转化为 Agent、Skill 和工作流，让 AI 参与设计生产，在提高效率的同时保持质量可控。",
      ja: "2025—2026年、私はビジュアルデザインからAI駆動型デザインへと領域を広げました。ビジュアル、ブランド、インタラクションの経験をAgent、Skill、ワークフローへ変換し、品質を管理しながら制作効率を高めています。",
      en: "In 2025—2026, I moved from visual design toward AI-driven design. I translate experience in visual, brand, and interaction design into Agents, Skills, and workflows—using AI to increase production efficiency while keeping quality under control."
    },
    gatewaySelected: { "zh-hans": "作品项目", ja: "作品プロジェクト", en: "Selected Projects" },
    gatewayFour: { "zh-hans": "AI × 设计实践", ja: "AI × デザイン実践", en: "AI × Design Practice" },
    timelineVisual: { "zh-hans": "信息可视化 · 书籍 · 图形 · 视觉系统", ja: "情報可視化 · エディトリアル · グラフィック · ビジュアルシステム", en: "Data visualization · Editorial · Graphics · Visual systems" },
    timelineInteraction: { "zh-hans": "Web · 动态图表 · 交互信息 · 数字体验", ja: "Web · 動的チャート · インタラクティブ情報 · デジタル体験", en: "Web · Dynamic charts · Interactive information · Digital experiences" },
    timelineAi: { "zh-hans": "生成式视觉 · 自动化流程 · Web Tool · AI Workflow", ja: "生成ビジュアル · 自動化 · Web Tool · AI Workflow", en: "Generative visuals · Automation · Web tools · AI workflows" },
    transitionCopy: {
      "zh-hans": "我将视觉规则、品牌标准与设计流程转化为 AI 可以执行的 Skill 和工作流，让设计生产更高效、更稳定，也更容易复用。",
      ja: "ビジュアルルール、ブランド基準、デザイン工程をAIが実行できるSkillとワークフローへ変換し、制作をより高速で安定し、再利用しやすいものにしています。",
      en: "I translate visual rules, brand standards, and design processes into AI-executable Skills and workflows, making design production faster, more consistent, and easier to reuse."
    },
    yanshiSubhead: {
      "zh-hans": "一句话生成高质量广告短视频，让生产效率提升 20 倍。",
      ja: "一文から高品質な広告動画を生成し、制作効率を20倍に。",
      en: "Generate high-quality advertising videos from one sentence—with 20× production efficiency."
    },
    yanshiBody: {
      "zh-hans": "VIDEO AGENT 是我对 AI 视频生产流程的一次系统化设计。我将广告创意、脚本、人物、关键帧、视频生成与质量检查整合为一条可视化工作流，把原本约 4 小时完成 1 条视频的流程，提升至约 1 小时完成 5 条视频。它通过人工确认、局部重跑与版本记录保持质量可控，体现了我将视觉判断、广告制作经验与 AI Agent 工程结合的能力。",
      ja: "VIDEO AGENTは、AI動画制作工程を体系化したプロジェクトです。広告企画、脚本、人物、キーフレーム、動画生成、品質確認を一つの可視化ワークフローに統合し、約4時間で1本だった制作を約1時間で5本まで高効率化しました。人による確認、部分的な再生成、バージョン管理により品質を制御し、視覚判断、広告制作、AI Agent開発を統合しています。",
      en: "VIDEO AGENT systematizes AI video production. I integrated creative direction, scripts, characters, keyframes, generation, and quality checks into one visual workflow—improving output from roughly one video in four hours to five videos in one hour. Human approval, local reruns, and version records keep quality controllable, combining visual judgment, advertising production, and AI Agent engineering."
    },
    bookSubhead: {
      "zh-hans": "将专业编辑设计转化为人人可用的 AI 自动排版工具。",
      ja: "プロのエディトリアルデザインを、誰もが使えるAI自動レイアウトツールへ。",
      en: "Turning professional editorial design into an accessible AI layout tool."
    },
    bookBody: {
      "zh-hans": "ONE-CLICK BOOK 是我对编辑设计流程的一次自动化重构。我将素材分析、内容排序、版式生成、页面调整与印刷导出整合为一套 Web 工作流，把依赖专业软件和大量人工操作的排版过程压缩为分钟级首次成稿。这个项目体现了我将版式设计规则转化为程序逻辑的能力：降低专业门槛，减少素材整理和逐页调整的重复劳动，同时保留设计质量与编辑自由。",
      ja: "ONE-CLICK BOOKは、エディトリアルデザイン工程を自動化したプロジェクトです。素材分析、内容整理、レイアウト生成、ページ調整、印刷出力をWebワークフローに統合し、専門ソフトと多くの手作業を要した工程を数分で初稿化します。レイアウト規則をプログラムへ変換することで、専門性の壁と反復作業を減らしながら、デザイン品質と編集の自由を保ちます。",
      en: "ONE-CLICK BOOK automates the editorial design process. I integrated asset analysis, content sequencing, layout generation, page adjustment, and print export into a Web workflow that reduces a software-heavy, manual process to a first draft in minutes. It demonstrates my ability to translate layout rules into program logic—lowering professional barriers, reducing repetitive work, and preserving design quality and editorial freedom."
    },
    sharedLogic: {
      "zh-hans": "<span class=\"strong\">把复杂的信息与生产流程，转化为清楚的体验、可控的系统和稳定的高质量输出。</span>",
      ja: "<span class=\"strong\">複雑な情報と制作工程を、明快な体験、制御可能なシステム、安定した高品質の成果へ変換する。</span>",
      en: "<span class=\"strong\">Turning complex information and production processes into clear experiences, controllable systems, and consistently high-quality outputs.</span>"
    },
    styleSubhead: {
      "zh-hans": "把设计师的风格判断，转化为稳定、可控的 AI 视觉生成系统。",
      ja: "デザイナーのスタイル判断を、安定して制御できるAIビジュアル生成システムへ。",
      en: "Turning a designer’s style judgment into a stable, controllable AI visual system."
    },
    styleBody: {
      "zh-hans": "AI STYLE STUDIO 是我对 AI 图像质量与风格控制的一次系统化探索。我将模型、提示词、视觉参数与审美判断整理为 100+ 可调用风格，把不可控、依赖反复抽卡的生成过程，转化为可以直接选择、比较和复用的视觉系统。它减少了模型测试与提示词调整的时间，提高了不同批次图像的质量与风格一致性，体现了我在视觉风格研究、生成控制、设计系统与 Web 产品构建方面的综合能力。",
      ja: "AI STYLE STUDIOは、AI画像の品質とスタイル制御を体系化したプロジェクトです。モデル、プロンプト、視覚パラメータ、審美判断を100以上の呼び出し可能なスタイルに整理し、予測しにくく再生成に頼る工程を、選択・比較・再利用できるビジュアルシステムへ変換しました。テストと調整時間を減らし、複数回の生成でも品質とスタイルの一貫性を高めています。",
      en: "AI STYLE STUDIO systematizes AI image quality and style control. I organized models, prompts, visual parameters, and aesthetic judgment into 100+ callable styles, replacing unpredictable, repeated rerolling with a visual system that can be selected, compared, and reused. It reduces testing time, improves quality and consistency across batches, and demonstrates my capabilities in visual research, generative control, design systems, and Web product building."
    },
    celestialSubhead: {
      "zh-hans": "将复杂科学数据转化为可探索、可比较的交互视觉系统。",
      ja: "複雑な科学データを、探索・比較できるインタラクティブなビジュアルシステムへ。",
      en: "Turning complex scientific data into an explorable, comparable visual system."
    },
    celestialBody: {
      "zh-hans": "NEW CELESTIAL ARCHIVE 是我将传统信息设计扩展为交互数据体验的一次实践。我对分散的天文文本、表格与科学记录进行清洗、量化和重新组织，并通过代码建立宇宙、地球与物质三个连续尺度，将复杂信息转化为可缩放、可比较、可持续更新的数字档案。项目提高了复杂信息的理解效率，也体现了我在数据分析、信息架构、视觉叙事与交互可视化方面的综合能力。",
      ja: "NEW CELESTIAL ARCHIVEは、従来の情報デザインをインタラクティブなデータ体験へ拡張したプロジェクトです。分散した天文テキスト、表、科学記録を整理・数値化・再構成し、コードによって宇宙、地球、物質の三つの連続スケールを構築しました。複雑な情報を拡大縮小・比較・継続更新できるデジタルアーカイブに変換し、データ分析、情報設計、視覚的物語、インタラクティブ可視化の力を示しています。",
      en: "NEW CELESTIAL ARCHIVE extends traditional information design into an interactive data experience. I cleaned, quantified, and reorganized dispersed astronomical texts, tables, and scientific records, then used code to connect cosmic, terrestrial, and material scales in a scalable, comparable, and continuously updateable archive. It improves how complex information is understood and demonstrates my capabilities in data analysis, information architecture, visual storytelling, and interactive visualization."
    },
    howTitle: {
      "zh-hans": "AI 降低了技术门槛，也提高了对设计判断的要求。",
      ja: "AIは技術の壁を下げる一方、デザイン判断の重要性を高めます。",
      en: "AI lowers technical barriers—and raises the value of design judgment."
    },
    capVisual: { "zh-hans": "视觉语言 · 信息层级 · 品牌一致性｜为 AI 输出定义方向与质量标准", ja: "視覚言語 · 情報階層 · ブランド一貫性｜AI出力の方向と品質基準を定義", en: "Visual language · Information hierarchy · Brand consistency | Defining direction and quality standards for AI output" },
    capInteraction: { "zh-hans": "任务拆解 · 关键节点 · 人工确认 · 质量检查｜把复杂生产转化为可控工作流", ja: "タスク分解 · 重要工程 · 人による確認 · 品質検査｜複雑な制作を制御可能なワークフローへ", en: "Task breakdown · Checkpoints · Human approval · QA | Turning complex production into controllable workflows" },
    capAi: { "zh-hans": "Agent · Skill · 生成式视觉 · AI Video｜减少随机抽卡，让结果稳定复用", ja: "Agent · Skill · 生成ビジュアル · AI Video｜ランダムな再生成を減らし、成果を安定して再利用", en: "Agents · Skills · Generative visuals · AI Video | Reducing random rerolls for stable, reusable results" },
    capTools: { "zh-hans": "Web · Python · 自动化 · 数据可视化｜把设计方法转化为可运行的产品", ja: "Web · Python · 自動化 · データ可視化｜デザイン手法を動作するプロダクトへ", en: "Web · Python · Automation · Data visualization | Turning design methods into working products" },
    callout: {
      "zh-hans": "从视觉判断到流程设计，再到 AI 控制与工具构建：提高生产效率，同时稳定设计质量。",
      ja: "視覚判断、ワークフロー設計、AI制御、ツール構築を通じて、制作効率とデザイン品質を両立します。",
      en: "From visual judgment and workflow design to AI control and tool building: increasing production efficiency while stabilizing design quality."
    },
    fourSystems: {
      "zh-hans": "四个项目分别回应 AI 视觉生产中的四类问题：视频制作效率低、专业排版门槛高、图像生成不可控且依赖反复抽卡，以及复杂数据难以理解。我通过视觉判断、流程设计、AI 控制与工具构建，将这些问题转化为可以实际运行的设计系统。",
      ja: "四つのプロジェクトは、AIビジュアル制作における四つの課題——動画制作の低効率、専門レイアウトの高い壁、制御しにくく再生成に頼る画像生成、理解しにくい複雑データ——に向き合います。視覚判断、ワークフロー設計、AI制御、ツール構築によって、課題を実際に動作するデザインシステムへ変換しました。",
      en: "The four projects address four problems in AI visual production: slow video workflows, high barriers to professional layout, unpredictable image generation that depends on repeated rerolling, and complex data that is difficult to understand. Through visual judgment, workflow design, AI control, and tool building, I turn these problems into working design systems."
    },
    practiceYanshi: { "zh-hans": "广告视频生产 Agent", ja: "広告動画制作Agent", en: "Advertising Video Agent" },
    practiceBook: { "zh-hans": "AI 编辑排版系统", ja: "AIエディトリアルシステム", en: "AI Editorial Layout System" },
    practiceStyle: { "zh-hans": "可控风格生成系统", ja: "制御可能なスタイル生成", en: "Controllable Style System" },
    practiceCelestial: { "zh-hans": "交互数据可视化系统", ja: "インタラクティブデータ可視化", en: "Interactive Data System" },
    aboutBody: {
      "zh-hans": "我拥有视觉传达与品牌设计背景，实践涵盖 UI/UX、信息可视化与数字体验。现在，我进一步将设计经验转化为 AI 工作流和 Web 工具，连接视觉判断、生产效率与技术实现。",
      ja: "ビジュアルコミュニケーションとブランドデザインを背景に、UI/UX、情報可視化、デジタル体験まで実践しています。現在はデザイン経験をAIワークフローとWebツールへ変換し、視覚判断、制作効率、技術実装をつないでいます。",
      en: "I have a background in visual communication and brand design, with work spanning UI/UX, information visualization, and digital experiences. I now translate that design experience into AI workflows and Web tools—connecting visual judgment, production efficiency, and technical implementation."
    },
    lookingFor: { "zh-hans": "视觉设计 / UI·UX / AI 创意 / 智能设计工具", ja: "ビジュアルデザイン / UI·UX / AIクリエイティブ / インテリジェントデザインツール", en: "Visual Design / UI·UX / AI Creative / Intelligent Design Tools" }
  };

  var settingCopy = {
    "zh-hans": { language: "语言 / LANGUAGE", theme: "页面配色 / THEME", white: "白", gray: "灰", black: "黑", open: "展开右上角设置", close: "收起右上角设置" },
    ja: { language: "言語 / LANGUAGE", theme: "配色 / THEME", white: "白", gray: "グレー", black: "黒", open: "設定を開く", close: "設定を閉じる" },
    en: { language: "LANGUAGE", theme: "THEME", white: "White", gray: "Gray", black: "Black", open: "Expand settings", close: "Collapse settings" }
  };

  var pageTitles = {
    "zh-hans": "天将明 — 2025–2026 精选作品",
    ja: "天将明 — 2025–2026 選抜作品",
    en: "Tian Jiangming — Selected AI & Interactive Works"
  };

  function readPreference(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (error) { return fallback; }
  }

  function writePreference(key, value) {
    try { localStorage.setItem(key, value); } catch (error) { /* Storage can be unavailable for local files. */ }
  }

  function queryPreference(key) {
    try { return new URLSearchParams(location.search).get(key); } catch (error) { return null; }
  }

  function updateSettingsCopy() {
    if (!settings || !settingsToggle) return;
    var labels = settingCopy[currentLanguage];
    var languageLabel = settings.querySelector("[data-settings-language-label]");
    var themeLabel = settings.querySelector("[data-settings-theme-label]");
    if (languageLabel) languageLabel.textContent = labels.language;
    if (themeLabel) themeLabel.textContent = labels.theme;
    settings.querySelectorAll("[data-theme-name]").forEach(function (label) {
      var themeName = labels[label.dataset.themeName];
      var themeButton = label.closest("[data-theme-choice]");
      label.textContent = themeName;
      if (themeButton) {
        themeButton.setAttribute("aria-label", labels.theme + ": " + themeName);
        themeButton.setAttribute("title", labels.theme + ": " + themeName);
      }
    });
    var collapsed = settings.classList.contains("settings-collapsed");
    var toggleLabel = collapsed ? labels.open : labels.close;
    settingsToggle.setAttribute("aria-label", toggleLabel);
    settingsToggle.querySelector(".visually-hidden").textContent = toggleLabel;
  }

  function applyLanguage(language) {
    if (language === "zh-hant") language = "ja";
    currentLanguage = languages[language] ? language : "zh-hans";
    document.documentElement.lang = currentLanguage === "en" ? "en" : (currentLanguage === "ja" ? "ja" : "zh-CN");
    document.body.dataset.language = currentLanguage;
    root.querySelectorAll("[data-copy]").forEach(function (element) {
      var entry = copy[element.dataset.copy];
      if (entry && entry[currentLanguage]) element.innerHTML = entry[currentLanguage];
    });
    document.title = pageTitles[currentLanguage];
    document.querySelectorAll("[data-language-choice]").forEach(function (button) {
      var active = button.dataset.languageChoice === currentLanguage;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    updateSettingsCopy();
    writePreference("tjm-language-v2", currentLanguage);
    document.dispatchEvent(new CustomEvent("tjm:languagechange", { detail: { language: currentLanguage } }));
  }

  function applyTheme(theme) {
    currentTheme = themes[theme] ? theme : "white";
    document.body.dataset.theme = currentTheme;
    document.querySelectorAll("[data-theme-choice]").forEach(function (button) {
      var active = button.dataset.themeChoice === currentTheme;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    writePreference("tjm-theme", currentTheme);
    document.dispatchEvent(new CustomEvent("tjm:themechange", { detail: { theme: currentTheme } }));
  }

  function setSettingsCollapsed(collapsed) {
    settings.classList.toggle("settings-collapsed", collapsed);
    settingsToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
    settingsToggle.querySelector("[aria-hidden]").textContent = collapsed ? "<" : ">";
    writePreference("tjm-settings-dock", collapsed ? "collapsed" : "open");
    updateSettingsCopy();
  }

  function setupSettings() {
    settings = document.createElement("div");
    settings.className = "settings-dock";
    settings.innerHTML =
      '<button class="settings-toggle" type="button" data-settings-toggle aria-expanded="true"><span aria-hidden="true">&gt;</span><span class="visually-hidden">收起右上角设置</span></button>' +
      '<div class="settings-content">' +
        '<div class="language-control"><span class="settings-label" data-settings-language-label>语言 / LANGUAGE</span><div class="language-options">' +
          '<button type="button" data-language-choice="zh-hans">简体</button>' +
          '<button type="button" data-language-choice="ja">日本語</button>' +
          '<button type="button" data-language-choice="en">English</button>' +
        '</div></div>' +
        '<div class="theme-control"><span class="settings-label" data-settings-theme-label>页面配色 / THEME</span><div class="theme-options">' +
          '<button type="button" data-theme-choice="white"><i></i><span data-theme-name="white">白</span></button>' +
          '<button type="button" data-theme-choice="gray"><i></i><span data-theme-name="gray">灰</span></button>' +
          '<button type="button" data-theme-choice="black"><i></i><span data-theme-name="black">黑</span></button>' +
        '</div></div>' +
      '</div>';
    document.body.appendChild(settings);
    settingsToggle = settings.querySelector("[data-settings-toggle]");

    settings.addEventListener("click", function (event) {
      var toggle = event.target.closest("[data-settings-toggle]");
      var language = event.target.closest("[data-language-choice]");
      var theme = event.target.closest("[data-theme-choice]");
      if (toggle) setSettingsCollapsed(!settings.classList.contains("settings-collapsed"));
      if (language) applyLanguage(language.dataset.languageChoice);
      if (theme) applyTheme(theme.dataset.themeChoice);
    });

    var savedLanguage = queryPreference("lang") || readPreference("tjm-language-v2", "zh-hans");
    var savedTheme = queryPreference("theme") || readPreference("tjm-theme", "white");
    var savedDock = readPreference("tjm-settings-dock", "");
    var collapsed = savedDock ? savedDock === "collapsed" : window.matchMedia("(max-width: 600px)").matches;
    applyTheme(savedTheme);
    applyLanguage(savedLanguage);
    setSettingsCollapsed(collapsed);
  }

  function setupPreferenceLinks() {
    document.addEventListener("click", function (event) {
      var anchor = event.target.closest("a[data-preserve-preferences]");
      if (!anchor || !anchor.href) return;
      try {
        var url = new URL(anchor.href, location.href);
        url.searchParams.set("lang", currentLanguage);
        url.searchParams.set("theme", currentTheme);
        anchor.href = url.href;
      } catch (error) { /* Ignore malformed external URLs. */ }
    }, true);
  }

  root.querySelectorAll("[data-scroll]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      var target = document.getElementById(button.dataset.scroll);
      if (!target) return;
      var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      if (history && history.replaceState) history.replaceState(null, "", "#" + target.id);
    });
  });

  var reveals = root.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("in");
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (element) { observer.observe(element); });
  } else {
    reveals.forEach(function (element) { element.classList.add("in"); });
  }

  setupSettings();
  setupPreferenceLinks();

  window.tjmLanguage = { apply: applyLanguage, current: function () { return currentLanguage; } };
  window.tjmTheme = { apply: applyTheme, current: function () { return currentTheme; } };
}());

(function () {
  "use strict";

  var root = document.querySelector("[data-archive-carousel]");
  if (!root) return;
  var cards = Array.prototype.slice.call(root.querySelectorAll(".archive-card"));
  var currentLabel = document.querySelector("[data-archive-current]");
  var detailButton = document.querySelector("[data-archive-detail]");
  var summary = document.querySelector("[data-archive-summary]");
  var summaries = [
    "将不可见的偏头痛体验，转化为可以被阅读和理解的视觉语言。",
    "结合物联网与 UX 设计，探索智能设备如何自然进入日常陪伴关系。",
    "以 AI 辅助视觉探索，为传统陶器上的祥兽建立当代 IP 形象。",
    "以信息可视化梳理不同历史时期的陶瓷发展与工艺变化。",
    "从陨石的来源、轨迹、坠落记录与物质构成出发，建立跨尺度的信息可视化系统。",
    "将动物信息转译为形态、材质、声音与语言，为视障儿童建立多感官认知路径。",
    "将梦境中的人物、场景、行为与事件编码为可重复、可组合的视觉系统。",
    "结合《蔷薇刑》写真集与三岛由纪夫生平，重新组织图像、文字与阅读节奏。",
    "把广告需求拆分为脚本、人物、关键帧、生成片段与质检节点的 AI 视频工作流。"
  ];
  var current = 0;
  var position = 0;
  var target = 0;
  var dragging = false;
  var moved = false;
  var startX = 0;
  var startPosition = 0;
  var pressedCardIndex = -1;
  var suppressNextClick = false;
  var animationFrame = 0;
  var autoplayTimer = 0;
  var slowMove = false;
  var carouselVisible = false;
  var selectedIndex = -1;
  var summaryTimer = 0;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function modulo(value) { return (value % cards.length + cards.length) % cards.length; }

  // Return the nearest copy of a card around the closed ring.
  function wrappedOffset(index, centre) {
    var offset = index - modulo(centre);
    if (offset > cards.length / 2) offset -= cards.length;
    if (offset < -cards.length / 2) offset += cards.length;
    return offset;
  }

  function render() {
    // Equal physical spacing across three planes: three works on the rear
    // wall, one complete work on each side wall, plus half of the next work
    // at both viewport edges. Perspective alone controls their apparent size.
    var viewportWidth = root.clientWidth;
    var compact = viewportWidth < 780;
    var width = compact
      ? Math.min(172, Math.max(118, viewportWidth * 0.31))
      : Math.min(248, Math.max(168, viewportWidth * 0.12));
    var equalStep = compact ? viewportWidth * 0.31 : viewportWidth * 0.18;
    var wallAngle = compact ? 55 : 63;
    var wallRadians = wallAngle * Math.PI / 180;
    // A wall corner lies exactly halfway between the last rear-wall card and
    // the first side-wall card. This keeps centre-to-centre spacing equal.
    var cornerAt = 1.5;

    cards.forEach(function (card, index) {
      var offset = wrappedOffset(index, position);
      var absOffset = Math.abs(offset);
      var direction = offset < 0 ? -1 : 1;
      var sideAmount = Math.max(0, absOffset - cornerAt);
      var rearX = Math.min(absOffset, cornerAt) * equalStep;
      var sideX = sideAmount * equalStep * Math.cos(wallRadians);
      var x = direction * (rearX + sideX);
      var z = sideAmount * equalStep * Math.sin(wallRadians);
      // Rotate while the card centre passes through the architectural corner.
      var turn = Math.max(0, Math.min(1, (absOffset - 1.25) / 0.5));
      var rotateY = direction * -wallAngle * turn;
      var opacity = Math.max(0, Math.min(1, 1 - Math.max(0, absOffset - 3.05) * 8));
      var focused = Math.abs(offset) < 0.5;
      card.style.width = width + "px";
      card.style.height = width * 1.45 + "px";
      card.style.marginLeft = (-width / 2) + "px";
      card.style.marginTop = (-width * 1.45 / 2) + "px";
      card.style.transform = "translate3d(" + x.toFixed(2) + "px,0," + z.toFixed(2) + "px) rotateY(" + rotateY.toFixed(2) + "deg)";
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = String(Math.round(30000 + z));
      card.classList.toggle("is-focused", focused);
      card.classList.toggle("is-selected", index === selectedIndex);
      card.setAttribute("aria-hidden", Math.abs(offset) > 3.1 ? "true" : "false");
      card.tabIndex = focused ? 0 : -1;
    });
    current = modulo(Math.round(position));
    if (currentLabel) currentLabel.textContent = String(current + 1).padStart(2, "0");
    if (summary && summary.dataset.current !== String(current)) {
      summary.dataset.current = String(current);
      summary.classList.remove("is-visible");
      clearTimeout(summaryTimer);
      summaryTimer = window.setTimeout(function () {
        summary.textContent = summaries[current] || "";
        summary.classList.add("is-visible");
      }, reduced ? 0 : 150);
    }
  }

  function clearSelection() {
    selectedIndex = -1;
    root.classList.remove("has-selection");
    cards.forEach(function (card) { card.classList.remove("is-selected"); });
    if (detailButton) detailButton.setAttribute("aria-hidden", "true");
  }

  function selectCard(index) {
    selectedIndex = index;
    root.classList.add("has-selection");
    cards.forEach(function (card, cardIndex) { card.classList.toggle("is-selected", cardIndex === index); });
    if (detailButton) {
      detailButton.href = cards[index].href;
      detailButton.setAttribute("aria-label", "访问" + cards[index].getAttribute("aria-label") + "详情页");
      detailButton.setAttribute("aria-hidden", "false");
    }
  }

  function animate() {
    var difference = target - position;
    position = reduced ? target : position + difference * (slowMove ? 0.035 : 0.105);
    render();
    if (Math.abs(difference) > 0.001) animationFrame = requestAnimationFrame(animate);
    else { position = target; slowMove = false; render(); animationFrame = 0; }
  }

  function goTo(index, slowly) {
    target = index;
    slowMove = !!slowly;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animate();
  }

  function goToCard(index, slowly) {
    goTo(position + wrappedOffset(index, position), slowly);
  }

  function scheduleAutoplay(delay) {
    clearTimeout(autoplayTimer);
    if (reduced || !carouselVisible || document.hidden || dragging || selectedIndex >= 0) return;
    autoplayTimer = window.setTimeout(function () {
      clearSelection();
      // Always advance around the same closed ring; there are no end cards.
      goTo(Math.round(position) + 1, true);
      scheduleAutoplay(5600);
    }, delay || 5200);
  }

  function registerInteraction() { scheduleAutoplay(6200); }

  function endDrag(event) {
    if (!dragging) return;
    dragging = false;
    root.classList.remove("is-dragging");
    try { root.releasePointerCapture(event.pointerId); } catch (error) { /* no-op */ }
    if (!moved && pressedCardIndex >= 0) {
      // Pointer capture can retarget the browser's synthetic click to the
      // carousel. Select here so one ordinary tap always works.
      goToCard(pressedCardIndex);
      selectCard(pressedCardIndex);
      suppressNextClick = true;
    } else {
      goTo(Math.round(target));
      registerInteraction();
    }
    pressedCardIndex = -1;
  }

  root.addEventListener("pointerdown", function (event) {
    if (event.target.closest("button")) return;
    clearTimeout(autoplayTimer);
    dragging = true;
    moved = false;
    startX = event.clientX;
    startPosition = target;
    pressedCardIndex = cards.indexOf(event.target.closest(".archive-card"));
    root.classList.add("is-dragging");
    root.setPointerCapture(event.pointerId);
  });
  root.addEventListener("pointermove", function (event) {
    if (!dragging) return;
    var delta = event.clientX - startX;
    if (Math.abs(delta) > 12) moved = true;
    target = startPosition - delta / Math.max(120, root.clientWidth * 0.14);
    position = target;
    render();
  });
  root.addEventListener("pointerup", endDrag);
  root.addEventListener("pointercancel", endDrag);
  root.addEventListener("click", function (event) {
    if ((moved || suppressNextClick) && event.target.closest("a")) {
      event.preventDefault();
      event.stopPropagation();
    }
    moved = false;
    suppressNextClick = false;
  }, true);
  root.addEventListener("keydown", function (event) {
    registerInteraction();
    if (event.key === "ArrowRight") { event.preventDefault(); goTo(Math.round(position) + 1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); goTo(Math.round(position) - 1); }
    if (event.key === "Home") { event.preventDefault(); goToCard(0); }
    if (event.key === "End") { event.preventDefault(); goToCard(cards.length - 1); }
  });
  root.querySelector(".archive-carousel-prev").addEventListener("click", function () { registerInteraction(); goTo(Math.round(position) - 1); });
  root.querySelector(".archive-carousel-next").addEventListener("click", function () { registerInteraction(); goTo(Math.round(position) + 1); });
  cards.forEach(function (card, index) {
    card.addEventListener("click", function (event) {
      event.preventDefault();
      if (moved || suppressNextClick) return;
      registerInteraction();
      goToCard(index);
      selectCard(index);
    });
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      carouselVisible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.45;
      if (carouselVisible) scheduleAutoplay(2800);
      else clearTimeout(autoplayTimer);
    }, { threshold:[0, .45, .8] }).observe(root);
  } else {
    carouselVisible = true;
  }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) clearTimeout(autoplayTimer);
    else scheduleAutoplay(3000);
  });
  window.addEventListener("resize", render, { passive:true });
  render();
  scheduleAutoplay(3200);
}());

(function () {
  "use strict";

  var root = document.querySelector("#portfolio-preview");
  if (!root) return;

  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var scenes = Array.prototype.slice.call(root.querySelectorAll(".hero, .page-shell > .section"));
  var currentScene = 0;
  var ticking = false;
  var nav = root.querySelector(".nav");
  var lastScrollY = Math.max(0, window.scrollY);
  var navScrollDelta = 0;
  var wheelLocked = false;
  var wheelUnlockTimer = 0;
  var wheelGestureTotal = 0;
  var wheelGestureStartedAt = 0;
  var wheelLastEventAt = 0;

  function setNavHidden(hidden) {
    if (!nav) return;
    document.body.classList.toggle("nav-hidden", hidden);
    nav.setAttribute("aria-hidden", hidden ? "true" : "false");
  }

  function updateAutoHidingNav() {
    if (!nav) return;
    var scrollY = Math.max(0, window.scrollY);
    var delta = scrollY - lastScrollY;

    if (scrollY < 72) {
      navScrollDelta = 0;
      setNavHidden(false);
    } else if (Math.abs(delta) > 1) {
      if ((delta > 0) !== (navScrollDelta > 0)) navScrollDelta = 0;
      navScrollDelta += delta;

      // A small accumulated threshold prevents trackpad jitter from flashing the header.
      if (navScrollDelta > 18) {
        setNavHidden(true);
        navScrollDelta = 0;
      } else if (navScrollDelta < -12) {
        setNavHidden(false);
        navScrollDelta = 0;
      }
    }
    lastScrollY = scrollY;
  }

  var orb = document.createElement("div");
  orb.className = "ambient-orb";
  orb.setAttribute("aria-hidden", "true");
  document.body.appendChild(orb);

  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  progress.innerHTML = '<div class="scroll-progress-track"><div class="scroll-progress-fill"></div></div><div class="scroll-progress-index"><strong data-scene-current>01</strong><span>/</span><span>' + String(scenes.length).padStart(2, "0") + '</span></div>';
  document.body.appendChild(progress);

  scenes.forEach(function (scene, index) {
    scene.classList.add("scene");
    scene.dataset.sceneIndex = String(index + 1).padStart(2, "0");
  });

  function updateSceneState() {
    var pageMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var pageProgress = Math.min(1, Math.max(0, window.scrollY / pageMax));
    document.body.style.setProperty("--scene-progress", pageProgress.toFixed(4));

    scenes.forEach(function (scene) {
      var rect = scene.getBoundingClientRect();
      var distance = Math.abs((rect.top + rect.height / 2) - window.innerHeight / 2);
      var visibility = Math.max(0, 1 - distance / Math.max(window.innerHeight, rect.height));
      scene.style.setProperty("--scene-visibility", visibility.toFixed(3));
      scene.style.setProperty("--parallax-y", ((window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.035).toFixed(2) + "px");
      var visual = scene.querySelector(".visual");
      if (visual && !reducedMotion) {
        visual.style.setProperty("--visual-y", ((rect.top - window.innerHeight / 2) * -0.018).toFixed(2) + "px");
      }
    });
    ticking = false;
  }

  function requestSceneUpdate() {
    updateAutoHidingNav();
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateSceneState);
    }
  }

  function closestSceneIndex() {
    var viewportCentre = window.innerHeight / 2;
    var closestIndex = 0;
    var closestDistance = Infinity;
    scenes.forEach(function (scene, index) {
      var rect = scene.getBoundingClientRect();
      var distance = Math.abs(rect.top + rect.height / 2 - viewportCentre);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    return closestIndex;
  }

  function scheduleWheelGestureEnd() {
    clearTimeout(wheelUnlockTimer);
    wheelUnlockTimer = window.setTimeout(function finishGesture() {
      var quietFor = performance.now() - wheelLastEventAt;
      var lockedFor = performance.now() - wheelGestureStartedAt;
      var minimumLock = reducedMotion ? 220 : 760;
      if (quietFor < 180 || (wheelLocked && lockedFor < minimumLock)) {
        wheelUnlockTimer = window.setTimeout(finishGesture, Math.max(40, Math.min(180 - quietFor, minimumLock - lockedFor)));
        return;
      }
      wheelLocked = false;
      wheelGestureTotal = 0;
      wheelGestureStartedAt = 0;
    }, 190);
  }

  function lockWheelToScene(event) {
    if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    // A Mac trackpad emits a long stream of wheel events, including tiny inertia
    // tail events. Consume the entire stream so native scrolling and CSS snap
    // cannot move the page to a second scene after the scripted step.
    event.preventDefault();
    wheelLastEventAt = performance.now();
    scheduleWheelGestureEnd();
    if (wheelLocked) return;

    wheelGestureTotal += event.deltaY;
    if (Math.abs(wheelGestureTotal) < 12) return;

    var direction = wheelGestureTotal > 0 ? 1 : -1;
    var from = closestSceneIndex();
    var next = Math.max(0, Math.min(scenes.length - 1, from + direction));
    wheelGestureTotal = 0;
    wheelLocked = true;
    wheelGestureStartedAt = performance.now();
    scheduleWheelGestureEnd();
    if (next === from) return;

    currentScene = next;
    scenes[next].scrollIntoView({ behavior:reducedMotion ? "auto" : "smooth", block:"start" });
  }

  if ("IntersectionObserver" in window) {
    var currentObserver = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) { return entry.isIntersecting; });
      if (!visible.length) return;
      visible.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      currentScene = scenes.indexOf(visible[0].target);
      scenes.forEach(function (scene, index) { scene.classList.toggle("is-current", index === currentScene); });
      var label = progress.querySelector("[data-scene-current]");
      if (label) label.textContent = String(currentScene + 1).padStart(2, "0");
    }, { threshold: [0.25, 0.5, 0.7] });
    scenes.forEach(function (scene) { currentObserver.observe(scene); });
  }

  if (!reducedMotion) {
    document.body.classList.add("motion-ready");
    window.addEventListener("pointermove", function (event) {
      document.body.style.setProperty("--pointer-x", event.clientX + "px");
      document.body.style.setProperty("--pointer-y", event.clientY + "px");
    }, { passive:true });

    root.querySelectorAll(".visual").forEach(function (visual) {
      visual.addEventListener("pointermove", function (event) {
        if (window.innerWidth < 901) return;
        var rect = visual.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        visual.style.setProperty("--tilt-x", (-y * 4.5).toFixed(2) + "deg");
        visual.style.setProperty("--tilt-y", (x * 5.5).toFixed(2) + "deg");
      });
      visual.addEventListener("pointerleave", function () {
        visual.style.setProperty("--tilt-x", "0deg");
        visual.style.setProperty("--tilt-y", "0deg");
      });
    });

    root.querySelectorAll("button, .project-cta").forEach(function (control) {
      control.classList.add("magnetic");
      control.addEventListener("pointermove", function (event) {
        var rect = control.getBoundingClientRect();
        control.style.setProperty("--magnetic-x", ((event.clientX - rect.left - rect.width / 2) * 0.12).toFixed(2) + "px");
        control.style.setProperty("--magnetic-y", ((event.clientY - rect.top - rect.height / 2) * 0.16).toFixed(2) + "px");
      });
      control.addEventListener("pointerleave", function () {
        control.style.setProperty("--magnetic-x", "0px");
        control.style.setProperty("--magnetic-y", "0px");
      });
    });
  }

  if (nav) {
    // Keyboard users should always regain the navigation when tabbing into it.
    nav.addEventListener("focusin", function () { setNavHidden(false); });
    document.addEventListener("pointermove", function (event) {
      if (event.clientY < 18 && window.scrollY > 72) setNavHidden(false);
    }, { passive:true });
  }

  window.addEventListener("scroll", requestSceneUpdate, { passive:true });
  window.addEventListener("resize", requestSceneUpdate, { passive:true });
  window.addEventListener("wheel", lockWheelToScene, { passive:false });
  updateSceneState();
}());

(function(){"use strict";var root=document.querySelector("[data-ai-style-waterfall]");if(!root)return;var files=["001-005.webp","002-009.webp","003-01_lipstick.webp","004-01_lipstick_v2.webp","005-01_phone.webp","006-022.webp","007-02_laptop.webp","008-02_serum.webp","009-02_serum_v2.webp","010-030.webp","011-031.webp","012-035.webp","013-036.webp","014-03_cushion.webp","015-03_cushion_v2.webp","016-03_headphones.webp","017-044.webp","018-049.webp","019-04_perfume.webp","020-04_perfume_v2.webp","021-04_watch.webp","022-051.webp","023-053.webp","024-05_collection.webp","025-05_collection2.webp","026-05_collection_v2.webp","027-070.webp","028-092.webp","029-098.webp","030-c-s5c-bot.webp","031-c-s5c-top.webp","032-c-s5n-bot.webp","033-c1.webp","034-c2.webp","035-c3.webp","036-c4.webp","037-end-1-1.webp","038-ins-d1-2.webp","039-ins-d2-2.webp","040-ins-d3-1.webp","041-s10.webp","042-s11.webp","043-s3.webp","044-s4.webp","045-s4b-kf.webp","046-s5-1.webp","047-s5.webp","048-s7-1.webp","049-s7.webp","050-s8-1.webp","051-s8-2.webp","052-s8.webp","053-s9.webp"],count=matchMedia("(max-width:560px)").matches?3:matchMedia("(max-width:900px)").matches?4:6,columns=Array.from({length:count},function(){return[]});files.forEach(function(file,index){columns[index%count].push(file)});function group(items,duplicate){var el=document.createElement("div");el.className="ai-style-waterfall-group";items.forEach(function(file,index){var image=document.createElement("img");image.src="assets/ai-style-waterfall/"+file;image.alt="";image.decoding="async";if(duplicate||index>2)image.loading="lazy";el.appendChild(image)});return el}columns.forEach(function(items,index){var column=document.createElement("div"),track=document.createElement("div");column.className="ai-style-waterfall-column";track.className="ai-style-waterfall-track";track.style.setProperty("--waterfall-duration",46+index*5+"s");track.style.setProperty("--waterfall-delay",-index*6.5+"s");track.appendChild(group(items,false));track.appendChild(group(items,true));column.appendChild(track);root.appendChild(column)})}());
