(() => {
  "use strict";

  const PROJECTS = {
    workshop: {
      id: "workshop",
      no: "01",
      cat: "AI 产品",
      year: "2026",
      title: "AI 产品合伙人工坊",
      en: "AI PRODUCT WORKSHOP",
      lede: "输入一个硬件命题，五类 AI Agent 协作产出可追溯的产品定义包。",
      role: "产品负责人",
      period: "2026.06 — 2026.07",
      org: "ANKER SOLIX × 飞书未来人才",
      tags: ["Multi-Agent", "产品定义", "证据分级"],
      caseCover: "assets/img/workshop-flow.webp",
      coverAlt: "AI 产品合伙人工坊的五阶段工作流界面",
      meta: [
        ["角色", "产品负责人"],
        ["周期", "2026.06 — 07"],
        ["场景", "ANKER SOLIX × 飞书未来人才"],
        ["产出", "工作流 / 产品定义包 / 功能样品"]
      ],
      problem: [
        "产品定义长期依赖资深 PM 的经验，判断对错很难复盘。",
        "直接让大模型生成 PRD，速度快，但结论不可信、不可追溯。",
        "市面上的多 Agent 框架解决了“怎么编排”，没解决“谁对结论负责”。"
      ],
      insights: [
        ["五类 Agent，五个专业视角", "市场洞察、用户假设、工程约束、商业评估各管一段；对抗评审独立于生产角色，避免自己写、自己夸。"],
        ["每个结论都带证据链", "输出附置信度与来源标注，低置信内容自动高亮；3 个专家评审节点卡住关键决策。"],
        ["做工厂，不做一次性项目", "把一次产品定义沉淀成可复用流程：换一个硬件命题，核心流程复用率仍 ≥ 60%，30 分钟内产出定义包。"]
      ],
      metrics: [
        ["5 类", "协作 Agent"],
        ["3 个", "专家评审节点"],
        ["≥60%", "跨品类复用率"],
        ["<30 分钟", "命题到定义包"]
      ],
      result: "从机会发现、用户假设、工程约束、商业评估到对抗评审，输出结构化的产品定义包；以「欧洲家庭露营户外电源」命题产出 CampSmart C1500 与用电沙盘样品，流程跨品类复用率 ≥ 60%。",
      reflection: "多 Agent 的难点从来不是“让它们说话”，而是“让结论有人负责”。",
      demo: "demos/workshop/workshop/index.html",
      demoType: "desktop",
      demoLabel: "workshop/index.html · 多 Agent 产品定义工作流"
    },

    butler: {
      id: "butler",
      no: "02",
      cat: "AI 产品",
      year: "2026",
      title: "小组作业 AI 管家",
      en: "AI GROUPWORK BUTLER",
      lede: "把“谁做什么、什么时候交”从群聊里捞出来。",
      role: "产品负责人",
      period: "2026.04 — 2026.05",
      org: "腾讯 PCG 校园 AI 产品创意大赛",
      tags: ["小程序", "LLM 工作流", "0→1"],
      caseCover: "assets/img/butler-projects.webp",
      coverAlt: "小组作业 AI 管家的项目列表界面",
      contain: true,
      meta: [
        ["角色", "产品负责人"],
        ["周期", "2026.04 — 05"],
        ["场景", "腾讯 PCG 校园 AI 产品创意大赛"],
        ["产出", "PRD / 原型 / 技术架构"]
      ],
      problem: [
        "分工靠群里喊，谁做了什么、做到哪一步，没人真的清楚。",
        "进度靠 DDL 倒逼，前期安静，最后一天全员熬夜。",
        "沟通散在聊天记录里，任务、文件、反馈永远对不上号。"
      ],
      insights: [
        ["不做另一个群聊", "把群聊里的承诺，变成有负责人、有截止时间的任务。"],
        ["模板优先，模型兜底", "先 OCR 识别作业要求，再按模板拆解；只在必要处调用模型，API 成本降了 60%+。"],
        ["AI 管流程，人做内容", "AI 不替学生写作业，只替他们管理协作、提醒和复盘。"]
      ],
      metrics: [
        ["60%", "API 调用成本下降"],
        ["6 步", "任务闭环"],
        ["3 个", "核心痛点"]
      ],
      result: "完成 MVP、完整 PRD、交互原型与技术架构；设计免费增值模式，并规划了从 MVP 到 3.0 的迭代节奏。",
      reflection: "AI 助手最容易犯的错，是替用户把事做了。更好的方式是替用户把事理顺。",
      demo: "demos/ai-butler.html",
      demoType: "phone",
      demoLabel: "ai-butler.html · 小程序交互原型"
    },

    comic: {
      id: "comic",
      no: "03",
      cat: "视觉实验",
      year: "2026",
      title: 'AI 漫剧<span class="nw">《林间除妖》</span>',
      en: "AI COMIC DRAMA",
      lede: "一个人，把一段小说做成能看的剧。",
      role: "编剧 / 导演 / 全流程制作",
      period: "2026",
      org: "个人项目",
      tags: ["AIGC", "叙事", "视觉一致性"],
      caseCover: "assets/img/comic-cover.webp",
      coverAlt: "《林间除妖》主角凌珩战斗姿态",
      meta: [
        ["角色", "编剧 / 导演 / 制作"],
        ["周期", "2026"],
        ["类型", "个人项目"],
        ["产出", "45 镜分镜 / 角色设定 / 成片"]
      ],
      problem: [
        "单张画面好看不难，难的是 20 个镜头里，角色还是同一个人。",
        "生成工具会改掉你想要的细节：表情、光线、构图，每次都要重新沟通。",
        "漫剧的核心是节奏，不是画质；镜头之间需要有呼吸。"
      ],
      insights: [
        ["先定镜头，再生成画面", "把 19 个镜头拆成 45 个细致分镜，景别、情绪、光源先写进镜头表，避免边生成边改故事。"],
        ["用设定卡守住一致性", "角色参考图、固定提示词结构、服装与场景锚点，一个都不能省。"],
        ["完成度来自剪辑和配音", "观众记住的是节奏和情绪，不是分辨率。"]
      ],
      designs: [
        { src: "assets/img/comic-design-01.webp", alt: "凌珩正脸半身定稿", cap: "正脸半身 · 基准定稿" },
        { src: "assets/img/comic-design-02.webp", alt: "凌珩战斗姿态定稿", cap: "战斗姿态 · 动态延展" },
        { src: "assets/img/comic-design-03.webp", alt: "凌珩背影全身定稿", cap: "背影全身 · 气质锚点" }
      ],
      galleryTitle: "关键帧",
      galleryPortrait: true,
      gallery: [
        { src: "assets/img/comic-frame-01.webp", alt: "凌珩察觉异动", cap: "察觉异动" },
        { src: "assets/img/comic-frame-02.webp", alt: "凌珩按剑蓄势", cap: "按剑蓄势" },
        { src: "assets/img/comic-frame-03.webp", alt: "凌珩侧身闪避", cap: "侧身闪避" },
        { src: "assets/img/comic-frame-04.webp", alt: "凌珩足尖点树腾空", cap: "足尖腾空" }
      ],
      video: {
        src: "assets/video/comic-fight.mp4",
        poster: "assets/img/comic-video-poster.webp",
        title: "片段",
        label: "《林间除妖》· 打斗片段",
        note: "10 秒片段，网页内静音循环播放；素材为 AI 生成，左上角保留平台水印。"
      },
      metrics: [
        ["45", "分镜镜头"],
        ["36 段", "生成视频"],
        ["5-15 秒", "单段时长"],
        ["1 人", "全流程"]
      ],
      result: "把 19 个镜头扩写成 45 镜分镜表，产出角色定稿与多段生成视频；用固定提示词结构 + 设定卡解决角色一致性，再靠剪辑把碎片镜头连成叙事。",
      reflection: "AI 能帮你生成画面，但没法替你决定：这个镜头要不要停两秒。"
    },

    exam: {
      id: "exam",
      no: "04",
      cat: "自建工具",
      year: "2026",
      title: "行测练习系统",
      en: "CIVIL SERVICE EXAM PRACTICE",
      lede: "给自己搭一个会记错、也会提醒你别再错的练习系统。",
      role: "独立开发 / 产品",
      period: "2026",
      org: "个人工具",
      tags: ["独立开发", "数据", "自学工具"],
      caseCover: "assets/img/exam-home.webp",
      coverAlt: "行测练习系统首页",
      meta: [
        ["角色", "独立开发 / 产品"],
        ["周期", "2026"],
        ["类型", "个人工具"],
        ["产出", "题库 / 练习 / 错题本 / 解析"]
      ],
      problem: [
        "题库只判对错，不告诉你为什么错。",
        "刷题量很容易制造“我很努力”的错觉。",
        "错题不归类，下一次还会错在同一类。"
      ],
      insights: [
        ["错题要结构化", "题型 × 错误原因 × 耗时，三个维度一起记，才知道问题出在哪。"],
        ["复盘替代刷题量", "每天只看三类反复错的题，比盲刷一百道更有用。"],
        ["自己当第一个用户", "哪里难用就当场改；没有需求评审，只有明天的自己。"]
      ],
      metrics: [
        ["500", "题库总量"],
        ["5", "行测模块"],
        ["64%", "累计正确率"],
        ["8", "错题本"]
      ],
      galleryTitle: "真实界面",
      gallery: [
        { src: "assets/img/exam-home.webp", alt: "行测练习系统首页：总题量 500，已练习 28，正确率 64%", cap: "首页 · 数据总览" },
        { src: "assets/img/exam-modules.webp", alt: "五大模块专项练习：言语、数量、判断、资料、常识", cap: "五大模块 · 顺序 / 随机练习" },
        { src: "assets/img/exam-quiz.webp", alt: "做题界面：单题作答，难度标注与进度条", cap: "做题 · 难度 + 进度" },
        { src: "assets/img/exam-answer.webp", alt: "答案解析：正确答案、解题思路与知识点标签", cap: "解析 · 知识点标签" },
        { src: "assets/img/exam-wrong.webp", alt: "错题本：总错题数、未掌握与已掌握分类", cap: "错题本 · 掌握状态追踪" }
      ],
      result: "五大模块各 100 题，共 500 题；支持顺序与随机两种练习模式；作答后即时给出解析与知识点标签；错题自动收纳，按“未掌握 / 已掌握”分类，可反复练习巩固。",
      reflection: "做工具最大的回报，是你自己会真的用它。错题本里那个“已掌握”的勾，比正确率数字更让人踏实。",
      live: {
        url: "https://dcniaqwtmoca.doubao.link/app/app_17g2nj4bmrd",
        label: "打开行测练习系统",
        note: "部署在豆包妙答上的在线版本，打开后可真实做题。首次访问需要用豆包账号登录。"
      }
    }
  };

  const ORDER = ["workshop", "butler", "comic", "exam"];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Reveal ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealEls = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => {
      if (el.closest(".hero")) return;
      io.observe(el);
    });

    $$(".hero .reveal").forEach((el) => {
      const delay = Number(el.dataset.delay || 0) * 90;
      el.style.transitionDelay = `${delay}ms`;
      requestAnimationFrame(() => setTimeout(() => el.classList.add("in"), 120));
    });
  }

  /* ---------- Count up ---------- */
  const counters = $$("[data-count]");
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    if (!target) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    counters.forEach((el) => (el.textContent = el.dataset.count));
  } else {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- Nav ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Sky ---------- */
  const sky = $("#sky");
  if (sky) {
    const layers = $$(".sky-layer", sky);
    const sun = $("#skySun");
    const moon = $("#skyMoon");
    const stars = $("#skyStars");
    const cloudWrap = $("#skyCloudsWrap");
    const warm = $("#skyWarm");

    /* WebGL 程序化天空（若可用，覆盖在 CSS 天空之上） */
    let skyGL = null;
    if (window.SkyGL) {
      try { skyGL = window.SkyGL.create($("#skyCanvas")); }
      catch (e) { skyGL = null; console.warn("SkyGL disabled:", e.message); }
    }
    const useGL = !!skyGL;

    let anchors = [];
    let rafId = 0;

    const measure = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const at = (id) => {
        const el = document.getElementById(id);
        return el ? Math.min(max, el.getBoundingClientRect().top + window.scrollY) : null;
      };
      const points = ["work", "proof", "about", "life", "contact"].map(at);
      anchors = [0].concat(points.map((p) => (p == null ? max : p)));
      /* 场景依次对应：首屏 / 作品 / 经历 / 关于 / 生活 / 联系 */
    };

    const render = () => {
      rafId = 0;
      const y = window.scrollY;
      const last = anchors.length - 1;
      let sp = last;
      if (y <= anchors[0]) sp = 0;
      else if (y < anchors[last]) {
        for (let i = 0; i < last; i++) {
          if (y >= anchors[i] && y < anchors[i + 1]) {
            const span = anchors[i + 1] - anchors[i] || 1;
            let t = (y - anchors[i]) / span;
            t = t * t * (3 - 2 * t);
            sp = i + t;
            break;
          }
        }
      }

      if (useGL) {
        /* 程序化天空由 uTime 统一驱动昼夜、日月、星空、云层 */
        skyGL.setProgress(sp);
      } else {
        /* ---- CSS 降级方案 ---- */
        layers.forEach((layer, i) => {
          layer.style.opacity = String(Math.max(0, 1 - Math.abs(sp - i)));
        });
        if (sun) {
          sun.style.setProperty("--sun-x", `${88 - sp * 15}%`);
          sun.style.setProperty("--sun-y", `${8 + sp * 13}vh`);
          sun.style.setProperty("--sun-o", String(0.9 * Math.max(0, 1 - Math.max(0, (sp - 4.1) / 0.9))));
        }
        if (cloudWrap) {
          cloudWrap.style.setProperty("--cloud-y", `${-sp * 5}vh`);
          sky.style.setProperty("--cloud-o", String(0.9 - sp * 0.06));
        }
        if (moon) {
          const mOp = Math.max(Math.max(0, 1 - sp * 0.9), Math.max(0, (sp - 4.2) / 0.8));
          moon.style.setProperty("--moon-o", String(mOp));
          moon.style.setProperty("--moon-x", `${62 + sp * 5.6}%`);
          moon.style.setProperty("--moon-y", `${16 + sp * 3}vh`);
        }
        if (stars) {
          const sOp = Math.max(Math.max(0, 1 - sp * 0.85), Math.max(0, (sp - 4.0) / 0.9));
          stars.style.setProperty("--star-o", String(sOp));
        }
      }

      /* 黄金时刻的暖色调叠加保留为 CSS 叠层 */
      if (warm) warm.style.setProperty("--warm-o", String(Math.min(0.62, Math.max(0, (sp - 2.7) / 2.3))));
    };

    const queue = () => {
      if (!rafId) rafId = window.requestAnimationFrame(render);
    };
    const refresh = () => {
      measure();
      render();
    };

    refresh();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
  }

  const navLinks = $$(".nav-links a");
  const sectionIds = ["work", "proof", "about", "life", "contact"];
  if ("IntersectionObserver" in window) {
    const sio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((a) => a.classList.toggle("is-active", a.dataset.nav === id));
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sio.observe(el);
    });
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = $("#navMenu");
  const mobileMenu = $("#mobileMenu");
  const toggleMenu = (open) => {
    menuBtn.setAttribute("aria-expanded", String(open));
    mobileMenu.classList.toggle("open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
  };
  menuBtn.addEventListener("click", () => toggleMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  $$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* ---------- Filters ---------- */
  const chips = $$(".chip");
  const cards = $$(".card");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.toggle("is-active", c === chip));
      const filter = chip.dataset.filter;
      cards.forEach((card) => {
        card.classList.toggle("is-hidden", filter !== "all" && card.dataset.cat !== filter);
      });
    });
  });

  /* ---------- Case overlay ---------- */
  const caseEl = $("#case");
  const caseContent = $("#caseContent");
  const caseScroll = $("#caseScroll");
  const caseCount = $("#caseCount");
  const caseProgress = $("#caseProgress");
  let lastFocus = null;
  let currentCase = null;

  const updateProgress = () => {
    const max = caseScroll.scrollHeight - caseScroll.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, caseScroll.scrollTop / max)) : 0;
    caseProgress.style.transform = `scaleX(${p})`;
  };
  caseScroll.addEventListener("scroll", updateProgress, { passive: true });

  const coverHTML = (p) => {
    if (p.art) {
      const art = $(`[data-project="${p.id}"] .card-art`);
      return `<div class="case-cover">${art ? art.innerHTML : ""}</div>`;
    }
    return `<figure class="case-cover ${p.contain ? "is-contain" : ""}"><img src="${p.caseCover}" alt="${p.coverAlt}" loading="lazy"></figure>`;
  };

  const demoHTML = (p) => {
    if (!p.demo) return "";
    const frame =
      p.demoType === "phone"
        ? `<div class="phone-shell"><iframe data-src="${p.demo}" title="${p.title} 可交互原型" loading="lazy"></iframe></div>`
        : `<div class="browser-frame"><div class="browser-bar"><i></i><i></i><i></i><span>${p.demoLabel}</span></div><iframe data-src="${p.demo}" title="${p.title} 可交互原型" loading="lazy"></iframe></div>`;
    return `
      <div class="demo-wrap ${p.demoType === "phone" ? "is-phone" : ""}">
        ${frame}
        <div class="demo-foot">
          <span>真实原型 · 部分数据为演示</span>
          <a class="btn-ghost" href="${p.demo}" target="_blank" rel="noopener">全屏体验 ↗</a>
        </div>
      </div>`;
  };

  const pipelineHTML = (p) =>
    p.pipeline
      ? `<div class="pipeline">${p.pipeline
          .map(([k, t]) => `<div class="p-step"><span class="p-k">${k}</span><span class="p-t">${t}</span></div>`)
          .join("")}</div>`
      : "";

  const galleryHTML = (p) =>
    p.gallery
      ? `<div class="gallery${p.galleryPortrait ? " is-portrait" : ""}">${p.gallery
          .map((g, i) => `<figure class="g-item"><img src="${g.src}" alt="${g.alt}" loading="lazy"><figcaption><span class="g-idx">0${i + 1}</span>${g.cap}</figcaption></figure>`)
          .join("")}</div>`
      : "";

  const designsHTML = (p) =>
    p.designs
      ? `<div class="designs">${p.designs
          .map((d, i) => `<figure class="design"><img src="${d.src}" alt="${d.alt}" loading="lazy"><figcaption><span>0${i + 1}</span>${d.cap}</figcaption></figure>`)
          .join("")}</div>`
      : "";

  const videoHTML = (p) =>
    p.video
      ? `<div class="film">
          <div class="film-frame">
            <video src="${p.video.src}" poster="${p.video.poster}" controls autoplay muted loop playsinline preload="metadata"></video>
          </div>
          <div class="film-side">
            <p class="film-k">${p.video.label}</p>
            <p class="film-t">${p.video.note}</p>
            <dl class="film-dl">
              <div><dt>分镜</dt><dd>45 镜（由 19 镜扩写）</dd></div>
              <div><dt>单段时长</dt><dd>5–10 秒</dd></div>
              <div><dt>工具</dt><dd>Kimi 写提示词 / AI 生成画面</dd></div>
            </dl>
          </div>
        </div>`
      : "";

  const liveHTML = (p) =>
    p.live
      ? `<div class="live-card">
          <div>
            <p class="live-t">${p.live.note}</p>
          </div>
          <a class="live-btn" href="${p.live.url}" target="_blank" rel="noopener">${p.live.label}<span>↗</span></a>
        </div>`
      : "";

  const metricsHTML = (p) =>
    p.metrics
      ? `<div class="case-metrics">${p.metrics
          .map(([v, label]) => `<div class="case-metric"><strong>${v}</strong><span>${label}</span></div>`)
          .join("")}</div>`
      : "";

  const renderCase = (p) => {
    const idx = ORDER.indexOf(p.id);
    const nextId = ORDER[(idx + 1) % ORDER.length];
    const next = PROJECTS[nextId];

    const blocks = [
      {
        title: "问题",
        html: `<ul class="problem">
              ${p.problem.map((t, i) => `<li><b>0${i + 1}</b><span>${t}</span></li>`).join("")}
            </ul>`
      },
      {
        title: "我的判断",
        html: `<div class="insight-grid">
              ${p.insights.map(([h, t]) => `<div class="insight"><h3>${h}</h3><p>${t}</p></div>`).join("")}
            </div>`
      }
    ];

    if (p.demo) {
      blocks.push({
        title: "可以直接玩",
        wide: true,
        note: "这是真实产品原型，不是视频。部分数据为演示数据。",
        html: demoHTML(p)
      });
    }
    if (p.live) {
      blocks.push({
        title: "在线体验",
        wide: true,
        html: liveHTML(p)
      });
    }
    if (p.designs) blocks.push({ title: "角色设定", html: designsHTML(p) });
    if (p.gallery) {
      blocks.push({ title: p.galleryTitle || "关键帧", html: galleryHTML(p), wide: true });
    }
    if (p.video) {
      blocks.push({
        title: p.video.title || "成片",
        wide: true,
        note: "网页内静音循环预览，可手动开启声音。",
        html: videoHTML(p)
      });
    }
    if (!p.demo && !p.gallery && !p.designs && !p.video) {
      blocks.push({ title: "制作流程", html: pipelineHTML(p) });
    }

    blocks.push({ title: "结果", html: `<p class="c-text">${p.result}</p>${metricsHTML(p)}` });
    blocks.push({ title: "如果再来一次", html: `<blockquote class="reflection">${p.reflection}</blockquote>` });

    const sections = blocks
      .map(
        (b, i) => `<section class="c-block${b.wide ? " is-demo" : ""}">
            <h2><span>${String(i + 1).padStart(2, "0")}</span>${b.title}</h2>
            ${b.note ? `<p class="c-note">${b.note}</p>` : ""}
            ${b.html}
          </section>`
      )
      .join("");

    caseCount.textContent = `CASE ${p.no} / 04`;
    caseContent.innerHTML = `
      <p class="case-kicker">${p.no} — ${p.cat.toUpperCase()} · ${p.year}</p>
      <h1 class="case-title" id="caseTitle">${p.title}</h1>
      <p class="case-lede">${p.lede}</p>
      <div class="case-meta-row">
        <span>${p.role}</span><span>${p.period}</span><span>${p.org}</span>
      </div>
      ${coverHTML(p)}

      <div class="case-body">
        <aside class="case-aside">
          <dl>
            ${p.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
          </dl>
          <div class="tag-list">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
        </aside>

        <div class="case-main">
          ${sections}

          <div class="case-end">
            <p>下一个 / NEXT CASE</p>
            <button class="next-case" data-next="${nextId}">${next.title} →</button>
          </div>
        </div>
      </div>`;
  };

  const focusables = () =>
    $$('a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])', caseEl).filter(
      (el) => el.offsetParent !== null
    );

  const openCase = (id, push = true) => {
    const p = PROJECTS[id];
    if (!p) return;

    if (!caseEl.classList.contains("open")) lastFocus = document.activeElement;
    currentCase = id;
    renderCase(p);
    caseScroll.scrollTop = 0;
    caseProgress.style.transform = "scaleX(0)";
    caseEl.classList.add("open");
    caseEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("case-open");

    if (push) history.pushState({ case: id }, "", `#work/${id}`);

    window.setTimeout(() => {
      const iframe = $("iframe[data-src]", caseContent);
      if (iframe && !iframe.src) iframe.src = iframe.dataset.src;
      caseEl.focus({ preventScroll: true });
    }, 260);
  };

  const closeCase = (restoreHash = true) => {
    if (!caseEl.classList.contains("open")) return;
    $$("iframe", caseContent).forEach((f) => (f.src = "about:blank"));
    caseEl.classList.remove("open");
    caseEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("case-open");
    currentCase = null;
    if (restoreHash) history.replaceState({}, "", location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  };

  cards.forEach((card) => {
    const activate = () => openCase(card.dataset.project);
    card.addEventListener("click", activate);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  });

  $("#caseBack").addEventListener("click", () => closeCase());
  $("#caseClose").addEventListener("click", () => closeCase());

  caseContent.addEventListener("click", (e) => {
    const btn = e.target.closest(".next-case");
    if (btn) openCase(btn.dataset.next);
  });

  document.addEventListener("keydown", (e) => {
    if (!caseEl.classList.contains("open")) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeCase();
      return;
    }

    if (e.key === "Tab") {
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  const routeFromHash = () => {
    const match = location.hash.match(/^#work\/([a-z]+)$/);
    const id = match && match[1];
    if (id && PROJECTS[id]) openCase(id, false);
    else if (caseEl.classList.contains("open")) closeCase(false);
  };

  window.addEventListener("popstate", routeFromHash);
  window.addEventListener("hashchange", () => {
    const match = location.hash.match(/^#work\/([a-z]+)$/);
    if (match && PROJECTS[match[1]]) openCase(match[1], false);
    else if (caseEl.classList.contains("open") && location.hash !== "") closeCase(false);
  });

  if (location.hash.startsWith("#work/")) routeFromHash();
})();
