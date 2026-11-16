/**
 * APP.JS – Hlavní aplikační logika "Cesta k Ironman Emilia-Romagna 2027"
 * Řídí stav v localStorage, vykreslování všech 5 sekcí, kalkulačku zón,
 * Intervals.icu exportér, Race Pacing kalkulačku a propojení s GarminCSVParser.
 */

(function () {
  const STORAGE_KEY = "im2027_cockpit_state_v1";

  const defaultState = {
    theme: "dark",
    selectedWeek: 1,
    includeWalkInTotals: false,
    thresholds: {
      lthr: window.PLAN_DATA.athlete.lthr, // 154 bpm
      ftp: window.PLAN_DATA.athlete.ftp, // 217 W
      cssSecPer100m: window.PLAN_DATA.athlete.cssSecPer100m, // 148 s (2:28/100m)
      weightKg: window.PLAN_DATA.athlete.weightKg // 84 kg
    },
    semafor: {
      hrv: 41,
      sleep: 6.75,
      back: 1
    },
    workoutLogs: {}, // { "T01-D2": { status: "done", actualMin: 45, rpe: 6, note: "..." } }
    selectedRaceCalc: "im-cervia",
    racePacingCustom: {},
    intervalsApi: {
      apiKey: "",
      athleteId: "0",
      includeStrengthAndNotes: true,
      connectedName: ""
    }
  };

  let state = loadState();
  let parsedCsvData = { activities: [], summary: null, byWeek: {}, errors: [] };

  // ==========================================================================
  // POMOCNÉ FORMÁTOVACÍ FUNKCE
  // ==========================================================================
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone ? structuredClone(defaultState) : JSON.parse(JSON.stringify(defaultState));
      const parsed = JSON.parse(raw);
      return {
        ...defaultState,
        ...parsed,
        thresholds: { ...defaultState.thresholds, ...(parsed.thresholds || {}) },
        semafor: { ...defaultState.semafor, ...(parsed.semafor || {}) },
        workoutLogs: parsed.workoutLogs || {},
        racePacingCustom: parsed.racePacingCustom || {},
        intervalsApi: { ...defaultState.intervalsApi, ...(parsed.intervalsApi || {}) }
      };
    } catch (e) {
      console.warn("Nelze načíst stav z localStorage, použit výchozí stav:", e);
      return JSON.parse(JSON.stringify(defaultState));
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Nelze uložit stav do localStorage:", e);
    }
  }

  function showToast(msg) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 3200);
  }

  function formatHoursCz(h) {
    const num = Number(h) || 0;
    return num.toFixed(2).replace(".", ",").replace(/,00$/, ",0") + " h";
  }

  function formatSecToMMSS(secTotal) {
    const s = Math.max(0, Math.round(Number(secTotal) || 0));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${String(rem).padStart(2, "0")}`;
  }

  function formatSecToHHMMSS(secTotal) {
    const s = Math.max(0, Math.round(Number(secTotal) || 0));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const rem = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
  }

  function formatDateCz(isoStr) {
    if (!isoStr) return "";
    const parts = isoStr.slice(0, 10).split("-");
    if (parts.length !== 3) return isoStr;
    return `${Number(parts[2])}. ${Number(parts[1])}. ${parts[0]}`;
  }

  function copyToClipboard(text, label = "Zkopírováno do schránky") {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => showToast(`✅ ${label}`))
        .catch(() => fallbackCopy(text, label));
    } else {
      fallbackCopy(text, label);
    }
  }

  function fallbackCopy(text, label) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast(`✅ ${label}`);
    } catch (e) {
      showToast("⚠️ Nelze zkopírovat automaticky – zkopíruj text z okna.");
    }
    ta.remove();
  }

  function getDisciplineMeta(disc) {
    const map = {
      swim: { label: "Plavání", badge: "badge-swim", icon: "🏊" },
      bike: { label: "Kolo / TT", badge: "badge-bike", icon: "🚴" },
      run: { label: "Běh", badge: "badge-run", icon: "🏃" },
      strength: { label: "Síla & Core", badge: "badge-strength", icon: "🏋️" },
      race: { label: "ZÁVOD", badge: "badge-race-a", icon: "🏆" },
      multisport: { label: "Triatlon", badge: "badge-race-b", icon: "🔥" },
      rest: { label: "Regenerace / Volno", badge: "badge-rest", icon: "🧘" },
      walk: { label: "Chůze / Trek", badge: "badge-rest", icon: "🥾" },
      other: { label: "Ostatní sport", badge: "badge-rest", icon: "⚡" }
    };
    return map[disc] || map.other;
  }

  // ==========================================================================
  // VÝPOČET SKUTEČNĚ ODTRÉNOVANÝCH HODIN V TÝDNU (Den. logy + CSV)
  // ==========================================================================
  function getWeekActualStats(weekObj) {
    let loggedMin = 0;
    let doneCount = 0;
    let totalWorkouts = 0;

    weekObj.days.forEach((d) => {
      if (d.discipline !== "rest" && d.durationMin > 0) {
        totalWorkouts++;
      }
      const log = state.workoutLogs[d.id];
      if (log) {
        if (log.status === "done" || log.status === "partial") {
          doneCount++;
          const m = log.actualMin !== null && log.actualMin !== "" && Number.isFinite(Number(log.actualMin))
            ? Number(log.actualMin)
            : d.durationMin;
          loggedMin += m;
        }
      }
    });

    const loggedHours = loggedMin / 60;
    let csvHours = 0;
    if (parsedCsvData && parsedCsvData.byWeek && parsedCsvData.byWeek[weekObj.week]) {
      const bw = parsedCsvData.byWeek[weekObj.week];
      csvHours = state.includeWalkInTotals ? bw.actualHoursInclWalk : bw.actualHoursExclWalk;
    }

    // Použijeme vyšší z hodnot (ručně odškrtnuté tréninky vs. spárované CSV aktivity v daném týdnu)
    const effectiveActualHours = Math.max(loggedHours, csvHours);
    const compliancePct = weekObj.hours.total > 0
      ? Math.round((effectiveActualHours / weekObj.hours.total) * 100)
      : 100;

    return {
      loggedHours,
      csvHours,
      effectiveActualHours,
      doneCount,
      totalWorkouts,
      compliancePct
    };
  }

  // ==========================================================================
  // ODPOČTY DO DALŠÍHO ZÁVODU A DO IM EMILIA-ROMAGNA
  // ==========================================================================
  function renderHeaderCountdowns() {
    const now = new Date();
    const todayIso = now.toISOString().slice(0, 10);

    const mainRaceDate = new Date(window.PLAN_DATA.meta.mainRaceDate + "T07:30:00");
    const diffMainMs = mainRaceDate - now;
    const diffMainDays = Math.max(0, Math.ceil(diffMainMs / (1000 * 60 * 60 * 24)));
    const diffMainWeeks = (diffMainDays / 7).toFixed(1).replace(".", ",");

    const mainEl = document.getElementById("main-race-countdown");
    if (mainEl) {
      mainEl.textContent = `${diffMainDays} dnů (${diffMainWeeks} týdnů)`;
    }

    // Najít nejbližší budoucí závod nebo událost
    const upcoming = window.PLAN_DATA.events.find((e) => e.date >= todayIso) || window.PLAN_DATA.events[0];
    const nextLabelEl = document.getElementById("next-event-label");
    const nextValEl = document.getElementById("next-event-countdown");
    if (upcoming && nextLabelEl && nextValEl) {
      const evDate = new Date(upcoming.date + "T08:00:00");
      const dDays = Math.max(0, Math.ceil((evDate - now) / (1000 * 60 * 60 * 24)));
      nextLabelEl.textContent = `Další milník: ${upcoming.name}`;
      nextValEl.textContent = `${dDays} dnů (T${String(upcoming.week).padStart(2, "0")})`;
    }
  }

  // ==========================================================================
  // VÝBĚR TÝDNE & SEMAFOR REGENERACE A ZAD
  // ==========================================================================
  function populateWeekSelectors() {
    const dashSel = document.getElementById("dash-week-select");
    const planSel = document.getElementById("planner-week-select");
    if (!dashSel || !planSel) return;

    const optionsHtml = window.PLAN_DATA.weeks
      .map((w) => {
        const ev = window.PLAN_DATA.events.find((e) => e.week === w.week);
        const tag = ev ? ` ★ ${ev.name.slice(0, 24)}` : ` (${w.type})`;
        return `<option value="${w.week}">${w.code}: ${formatDateCz(w.startDate)} – ${formatDateCz(w.endDate)}${tag}</option>`;
      })
      .join("");

    dashSel.innerHTML = optionsHtml;
    planSel.innerHTML = optionsHtml;
    dashSel.value = String(state.selectedWeek);
    planSel.value = String(state.selectedWeek);
  }

  function setSelectedWeek(weekNum, switchToPlanner = false) {
    const n = Math.min(48, Math.max(1, Number(weekNum) || 1));
    state.selectedWeek = n;
    saveState();

    const dashSel = document.getElementById("dash-week-select");
    const planSel = document.getElementById("planner-week-select");
    if (dashSel) dashSel.value = String(n);
    if (planSel) planSel.value = String(n);

    renderDashboardWeekCard();
    renderMacroChart();
    renderPlannerWeek();

    if (switchToPlanner) {
      activateTab("tab-planner");
    }
  }

  function renderDashboardWeekCard() {
    const w = window.PLAN_DATA.weeks.find((x) => x.week === state.selectedWeek) || window.PLAN_DATA.weeks[0];
    const actual = getWeekActualStats(w);

    const badgeEl = document.getElementById("dash-week-block-badge");
    if (badgeEl) {
      badgeEl.textContent = w.week <= 12 ? "Detailní aktivní blok (T01–T12)" : "Rámcový blok (T13–T48)";
      badgeEl.className = w.week <= 12 ? "badge badge-swim" : "badge badge-race-c";
    }

    document.getElementById("dash-week-dates").textContent =
      `${w.code} • ${formatDateCz(w.startDate)} – ${formatDateCz(w.endDate)} • ${w.phaseName}`;
    document.getElementById("dash-kpi-plan").textContent = formatHoursCz(w.hours.total);
    document.getElementById("dash-kpi-type").textContent = `Režim: ${w.type}`;
    document.getElementById("dash-kpi-actual").textContent = formatHoursCz(actual.effectiveActualHours);
    document.getElementById("dash-kpi-compliance").textContent =
      `Splněno: ${actual.compliancePct} % (${actual.doneCount}/${actual.totalWorkouts} jednotek)`;
    document.getElementById("dash-kpi-split").textContent =
      `${w.hours.swim} / ${w.hours.bike} / ${w.hours.run} / ${w.hours.strength} h`;
    document.getElementById("dash-kpi-phase").textContent = `Fáze ${w.phaseId}`;
    document.getElementById("dash-kpi-recovery").textContent = w.isRecovery
      ? "♻️ Regenerační / Odlehčený týden"
      : "🔥 Rozvojový / Závodní týden";

    document.getElementById("dash-week-focus").innerHTML =
      `<strong>Zaměření týdne ${w.code}:</strong> ${w.focus}`;
  }

  function renderSemafor() {
    const hrvInput = document.getElementById("sem-hrv");
    const sleepInput = document.getElementById("sem-sleep");
    const backSelect = document.getElementById("sem-back");
    if (!hrvInput || !sleepInput || !backSelect) return;

    hrvInput.value = state.semafor.hrv;
    sleepInput.value = state.semafor.sleep;
    backSelect.value = String(state.semafor.back);

    const hrv = Number(state.semafor.hrv) || 40;
    const sleep = Number(state.semafor.sleep) || 6.75;
    const back = Number(state.semafor.back) || 1;
    const baseline = window.PLAN_DATA.athlete.hrvBaselineMs; // 40 ms

    const box = document.getElementById("semafor-output");
    const title = document.getElementById("sem-status-title");
    const desc = document.getElementById("sem-status-desc");

    if (back >= 4 || hrv <= baseline - 7 || sleep < 5.0) {
      box.className = "semafor-result red";
      title.textContent = "🔴 ČERVENÁ: Stop intenzitě a aero pozici – zařaď volno nebo čistou mobilitu!";
      desc.textContent =
        back >= 4
          ? `Stav beder (${back}/5) signalizuje přetížení. Vynech dnes běh i TT aero pozici! Zařaď 20 min uvolnění psoasu, brániční dýchání vleže nebo lehké vyplavání s piškotem.`
          : `Noční HRV (${hrv} ms vs. baseline 40 ms) nebo spánek (${sleep} h) ukazují na vysokou systémovou únavu. Dnes dej volno nebo max 30 min regenerační Z1.`;
    } else if (back === 3 || hrv <= baseline - 4 || sleep < 6.0) {
      box.className = "semafor-result yellow";
      title.textContent = "🟡 ORANŽOVÁ: Stáhni intenzitu do čisté Z1/Z2 a zkrať pobyt v TT hrazdě";
      desc.textContent =
        `Mírné varování (HRV ${hrv} ms, spánek ${sleep} h, bedra ${back}/5). Trénink odjeď, ale vynech intervaly v Z3/Z4, na kole jeď vyšší kadencí (~90 rpm) převážně v horním úchopu a po tréninku přidej 10 min mobilizace kyčlí.`;
    } else {
      box.className = "semafor-result";
      title.textContent = "🟢 ZELENÁ: Trénink na 100 % dle plánu";
      desc.textContent =
        `Skvělá připravenost (HRV ${hrv} ms vůči baseline 40 ms, spánek ${sleep} h, bedra ${back}/5). Můžeš plně odjet předepsanou kvalitu včetně adaptace v TT aero pozici.`;
    }
  }

  // ==========================================================================
  // ROČNÍ GRAF MAKROCYKLU T01–T48 (Plán vs. Skutečnost)
  // ==========================================================================
  function renderMacroChart() {
    const container = document.getElementById("macro-chart-bars");
    if (!container) return;

    const maxHours = 11.0; // měřítko pro běžné týdny (závodní týden IM 15.5h se ořízne na 100% výšky)

    const html = window.PLAN_DATA.weeks
      .map((w) => {
        const actual = getWeekActualStats(w);
        const ev = window.PLAN_DATA.events.find((e) => e.week === w.week);

        const hSwim = Math.min(100, (w.hours.swim / maxHours) * 100);
        const hBike = Math.min(100, (w.hours.bike / maxHours) * 100);
        const hRun = Math.min(100, (w.hours.run / maxHours) * 100);
        const hStr = Math.min(100, (w.hours.strength / maxHours) * 100);
        const hAct = Math.min(100, (actual.effectiveActualHours / maxHours) * 100);

        const isSel = w.week === state.selectedWeek ? "selected-week" : "";
        const flagHtml = ev
          ? `<span class="macro-flag prio-${ev.priority}" title="${ev.name} (${ev.priority})">${ev.priority === "DOVOLENÁ" ? "🏝️" : ev.priority}</span>`
          : "";

        return `
          <div class="macro-col ${isSel}" data-week="${w.week}" title="${w.code} (${formatDateCz(w.startDate)}): Plán ${w.hours.total} h | Skutečnost ${actual.effectiveActualHours.toFixed(1)} h | ${w.type}">
            ${flagHtml}
            <div class="macro-bar-pair">
              <div class="macro-stack" style="height: 100%;">
                <div class="macro-seg-swim" style="height:${hSwim}%"></div>
                <div class="macro-seg-bike" style="height:${hBike}%"></div>
                <div class="macro-seg-run" style="height:${hRun}%"></div>
                <div class="macro-seg-strength" style="height:${hStr}%"></div>
              </div>
              <div class="macro-actual-bar" style="height:${hAct}%" title="Skutečnost: ${actual.effectiveActualHours.toFixed(2)} h"></div>
            </div>
            <span class="macro-wcode mono">${w.code}</span>
          </div>
        `;
      })
      .join("");

    container.innerHTML = html;

    container.querySelectorAll(".macro-col").forEach((col) => {
      col.addEventListener("click", () => {
        const wk = Number(col.getAttribute("data-week"));
        setSelectedWeek(wk, false);
      });
      col.addEventListener("dblclick", () => {
        const wk = Number(col.getAttribute("data-week"));
        setSelectedWeek(wk, true);
      });
    });
  }

  function renderPhasesAndEventsLists() {
    const phasesEl = document.getElementById("phases-list-container");
    if (phasesEl) {
      phasesEl.innerHTML = window.PLAN_DATA.phases
        .map(
          (p) => `
          <div style="padding:11px 14px; border-radius:8px; background:var(--bg-secondary); border-left:4px solid ${p.color};">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
              <strong>${p.code}: ${p.name}</strong>
              <span class="mono badge badge-rest">${p.weeks} • ${p.targetHours}</span>
            </div>
            <div style="font-size:0.78rem; color:var(--text-muted); margin:2px 0 4px;">${p.dateRange}</div>
            <div style="font-size:0.82rem; color:var(--text-secondary);">${p.focus}</div>
          </div>
        `
        )
        .join("");
    }

    const eventsEl = document.getElementById("events-list-container");
    if (eventsEl) {
      eventsEl.innerHTML = window.PLAN_DATA.events
        .map((e) => {
          const badgeClass =
            e.priority === "A"
              ? "badge-race-a"
              : e.priority === "B"
              ? "badge-race-b"
              : e.priority === "C"
              ? "badge-race-c"
              : "badge-rest";
          return `
            <div style="padding:10px 14px; border-radius:8px; background:var(--bg-secondary); border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
              <div style="flex:1; min-width:240px;">
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <span class="badge ${badgeClass}">Priorita ${e.priority}</span>
                  <strong>${e.name}</strong>
                  <span class="mono" style="font-size:0.78rem; color:var(--text-muted);">(${formatDateCz(e.date)} • T${String(e.week).padStart(2, "0")})</span>
                </div>
                <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:3px;">
                  <strong>Cíl: ${e.targetTime}</strong> (${e.targetPaceOrPower}) — ${e.strategy}
                </div>
              </div>
              <button class="btn btn-sm btn-jump-week" data-week="${e.week}">T${String(e.week).padStart(2, "0")} →</button>
            </div>
          `;
        })
        .join("");

      eventsEl.querySelectorAll(".btn-jump-week").forEach((btn) => {
        btn.addEventListener("click", () => {
          setSelectedWeek(Number(btn.getAttribute("data-week")), true);
        });
      });
    }
  }

  // ==========================================================================
  // SEKCE B: TÝDENNÍ PLÁNOVAČ & DENNÍ KARTY (Po–Ne)
  // ==========================================================================
  function renderPlannerWeek() {
    const w = window.PLAN_DATA.weeks.find((x) => x.week === state.selectedWeek) || window.PLAN_DATA.weeks[0];
    const actual = getWeekActualStats(w);

    const badge = document.getElementById("planner-block-badge");
    if (badge) {
      badge.textContent = w.blockStatus;
      badge.className = w.week <= 12 ? "badge badge-swim" : "badge badge-race-c";
    }

    const summaryCard = document.getElementById("planner-week-summary-card");
    if (summaryCard) {
      summaryCard.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap;">
          <div style="flex:1; min-width:280px;">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:6px;">
              <h2 style="font-size:1.25rem;">${w.code}: ${formatDateCz(w.startDate)} – ${formatDateCz(w.endDate)}</h2>
              <span class="badge ${w.isRecovery ? "badge-rest" : "badge-run"}">${w.type}</span>
              <span style="font-size:0.85rem; color:var(--text-muted);">${w.phaseName}</span>
            </div>
            <p style="font-size:0.9rem; color:var(--text-secondary);">${w.focus}</p>
          </div>
          <div style="display:flex; gap:14px; flex-wrap:wrap;" class="mono">
            <div class="kpi-box" style="min-width:120px;">
              <span class="kpi-label">Plán celkem</span>
              <div class="kpi-val">${formatHoursCz(w.hours.total)}</div>
            </div>
            <div class="kpi-box" style="min-width:120px;">
              <span class="kpi-label">Skutečnost</span>
              <div class="kpi-val" style="color:var(--status-green);">${formatHoursCz(actual.effectiveActualHours)}</div>
            </div>
            <div class="kpi-box" style="min-width:210px;">
              <span class="kpi-label">Plavání / Kolo / Běh / Síla</span>
              <div class="kpi-val" style="font-size:1rem;">${w.hours.swim}h / ${w.hours.bike}h / ${w.hours.run}h / ${w.hours.strength}h</div>
            </div>
          </div>
        </div>
      `;
    }

    const grid = document.getElementById("planner-days-grid");
    if (!grid) return;

    grid.innerHTML = w.days
      .map((d) => {
        const meta = getDisciplineMeta(d.discipline);
        const log = state.workoutLogs[d.id] || {
          status: "planned",
          actualMin: "",
          rpe: "",
          note: ""
        };
        const doneClass = log.status === "done" ? "status-done" : "";
        const hasIcu = Boolean(d.intervalsIcu && d.intervalsIcu.trim().length > 0);

        return `
          <article class="day-card disc-${d.discipline} ${doneClass}" data-day-id="${d.id}">
            <div>
              <div class="day-header">
                <div>
                  <span class="day-date-label">${d.dayName} • ${formatDateCz(d.date)}</span>
                  <h3 class="day-title">${meta.icon} ${d.title}</h3>
                </div>
                <span class="badge ${meta.badge}">${meta.label}</span>
              </div>

              <div style="display:flex; gap:8px; align-items:center; margin:6px 0 10px; flex-wrap:wrap;">
                <span class="badge badge-rest mono">⏱️ ${d.durationMin} min</span>
                <span class="badge badge-rest">${d.intensityZone}</span>
                ${
                  hasIcu
                    ? `<button class="btn btn-sm btn-copy-icu" data-day-id="${d.id}" title="Zkopírovat strukturovaný předpis pro Intervals.icu Workout Builder">📋 Kopírovat pro Intervals.icu</button>
                       <button class="btn btn-sm btn-api-push-day" data-day-id="${d.id}" title="Přímo nahrát tento den do kalendáře Intervals.icu přes API klíč">🚀 Nahrát přes API</button>`
                    : d.discipline === "strength" && d.durationMin > 0
                    ? `<button class="btn btn-sm btn-api-push-day" data-day-id="${d.id}" title="Přímo nahrát silový/core trénink do kalendáře Intervals.icu přes API klíč">🚀 Nahrát přes API</button>`
                    : ""
                }
              </div>

              <div class="day-prescription">${d.prescription}</div>
              <div class="day-purpose" style="margin-top:10px;">
                <strong>Metodický účel:</strong> ${d.purpose}
              </div>
            </div>

            <div class="day-log-form">
              <div>
                <label style="font-size:0.7rem; color:var(--text-muted); display:block;">Stav splnění</label>
                <select class="log-status" data-day-id="${d.id}">
                  <option value="planned" ${log.status === "planned" ? "selected" : ""}>⏳ Plánováno</option>
                  <option value="done" ${log.status === "done" ? "selected" : ""}>✅ Splněno</option>
                  <option value="partial" ${log.status === "partial" ? "selected" : ""}>⚠️ Částečně</option>
                  <option value="skipped" ${log.status === "skipped" ? "selected" : ""}>❌ Vynecháno</option>
                </select>
              </div>
              <div>
                <label style="font-size:0.7rem; color:var(--text-muted); display:block;">Skutečný čas (min)</label>
                <input type="number" class="log-actual-min mono" data-day-id="${d.id}" placeholder="${d.durationMin}" value="${log.actualMin !== undefined && log.actualMin !== null ? log.actualMin : ""}" min="0" max="999" />
              </div>
              <div>
                <label style="font-size:0.7rem; color:var(--text-muted); display:block;">RPE (1–10)</label>
                <input type="number" class="log-rpe mono" data-day-id="${d.id}" placeholder="1-10" value="${log.rpe !== undefined && log.rpe !== null ? log.rpe : ""}" min="1" max="10" />
              </div>
              <div class="day-note-input">
                <input type="text" class="log-note" data-day-id="${d.id}" placeholder="Poznámka k tréninku (pocity, tepy, stav beder...)" value="${(log.note || "").replace(/"/g, "&quot;")}" />
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    // Event listenery pro tlačítka Intervals.icu
    grid.querySelectorAll(".btn-copy-icu").forEach((btn) => {
      btn.addEventListener("click", () => {
        const dayId = btn.getAttribute("data-day-id");
        const dayObj = w.days.find((x) => x.id === dayId);
        if (dayObj && dayObj.intervalsIcu) {
          copyToClipboard(normalizeIntervalsIcu(dayObj.intervalsIcu, dayObj.discipline), `Předpis "${dayObj.title}" zkopírován pro Intervals.icu`);
        }
      });
    });

    grid.querySelectorAll(".btn-api-push-day").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const dayId = btn.getAttribute("data-day-id");
        const dayObj = w.days.find((x) => x.id === dayId);
        if (!dayObj) return;
        if (!state.intervalsApi || !state.intervalsApi.apiKey || !state.intervalsApi.apiKey.trim()) {
          showToast("🔑 Nejprve zadej svůj Intervals.icu API klíč v okně nastavení");
          openWeekIntervalsModal(true);
          return;
        }
        const ev = buildIntervalsEventForDay(dayObj, true);
        if (!ev) return;
        const origText = btn.textContent;
        btn.textContent = "⏳ Nahrávám...";
        btn.disabled = true;
        try {
          await pushEventsToIntervalsIcu([ev]);
          showToast(`✅ Trénink "${dayObj.title}" (${dayObj.date}) nahrán do Intervals.icu!`);
          btn.textContent = "✅ Nahráno";
          setTimeout(() => {
            btn.textContent = origText;
            btn.disabled = false;
          }, 2200);
        } catch (err) {
          showToast(`❌ Chyba API: ${err.message}`);
          btn.textContent = origText;
          btn.disabled = false;
        }
      });
    });

    // Event listenery pro logování tréninků
    const updateLogField = (dayId, field, value) => {
      if (!state.workoutLogs[dayId]) {
        const dayObj = w.days.find((x) => x.id === dayId);
        state.workoutLogs[dayId] = {
          status: "planned",
          actualMin: dayObj ? dayObj.durationMin : 0,
          rpe: "",
          note: ""
        };
      }
      state.workoutLogs[dayId][field] = value;
      if (field === "status" && value === "done" && !state.workoutLogs[dayId].actualMin) {
        const dayObj = w.days.find((x) => x.id === dayId);
        if (dayObj) state.workoutLogs[dayId].actualMin = dayObj.durationMin;
      }
      saveState();
      renderDashboardWeekCard();
      renderMacroChart();
    };

    grid.querySelectorAll(".log-status").forEach((el) => {
      el.addEventListener("change", () => {
        updateLogField(el.getAttribute("data-day-id"), "status", el.value);
        renderPlannerWeek();
      });
    });
    grid.querySelectorAll(".log-actual-min").forEach((el) => {
      el.addEventListener("change", () => {
        updateLogField(el.getAttribute("data-day-id"), "actualMin", el.value ? Number(el.value) : "");
      });
    });
    grid.querySelectorAll(".log-rpe").forEach((el) => {
      el.addEventListener("change", () => {
        updateLogField(el.getAttribute("data-day-id"), "rpe", el.value ? Number(el.value) : "");
      });
    });
    grid.querySelectorAll(".log-note").forEach((el) => {
      el.addEventListener("change", () => {
        updateLogField(el.getAttribute("data-day-id"), "note", el.value);
      });
    });
  }

  // ==========================================================================
  // SEKCE C: INTERVALS.ICU REST API INTEGRACE, TÝDENNÍ EXPORT & NÁVOD V MODÁLU
  // ==========================================================================
  function normalizeIntervalsIcu(rawScript, discipline) {
    if (!rawScript) return "";
    let s = String(rawScript).trim();
    if (discipline === "swim") {
      // V Intervals.icu znamená "200m" 200 minut! Pro metry v plavání musí být "200mtr".
      // Převedeme proto všechny vzdálenosti v metrech (např. - 25m, - 50m, - 100m, - 200m) na "mtr",
      // ale zachováme minuty u odpočinku (např. "- 6m Rest").
      s = s.replace(/^(\s*-\s*\d+)m\b(?!\s*Rest\b)(?!tr\b)/gim, "$1mtr");
    }
    return s;
  }

  function getIntervalsSportType(dayObj) {
    if (dayObj.discipline === "swim") return "Swim";
    if (dayObj.discipline === "bike") return "Ride";
    if (dayObj.discipline === "run") return "Run";
    if (dayObj.discipline === "strength") return "WeightTraining";
    if (dayObj.discipline === "race") {
      const t = (dayObj.title || "").toLowerCase();
      if (t.includes("l'etape") || t.includes("kolo")) return "Ride";
      return "Run";
    }
    return "Workout";
  }

  function buildIntervalsEventForDay(dayObj, forceIncludeStrengthOrRest = false) {
    const includeExtra = forceIncludeStrengthOrRest || Boolean(state.intervalsApi && state.intervalsApi.includeStrengthAndNotes);
    const hasIcu = Boolean(dayObj.intervalsIcu && dayObj.intervalsIcu.trim().length > 0);

    if (hasIcu) {
      // DŮLEŽITÉ: Pole description u WORKOUT v Intervals.icu nesmí obsahovat volný český text s čísly
      // (např. "200 m", "4×50 m"), protože parser Intervals.icu z textu automaticky počítá minuty a vzdálenost!
      // Proto posíláme výhradně čistý strukturovaný předpis s jednotkou "mtr" u plavání.
      const cleanScript = normalizeIntervalsIcu(dayObj.intervalsIcu, dayObj.discipline);
      return {
        category: "WORKOUT",
        start_date_local: `${dayObj.date}T00:00:00`,
        type: getIntervalsSportType(dayObj),
        name: dayObj.title,
        description: cleanScript,
        external_id: `im2027_${dayObj.id}`
      };
    }

    if (includeExtra && dayObj.discipline === "strength" && dayObj.durationMin > 0) {
      const totalMin = Number(dayObj.durationMin) || 45;
      const mainMin = Math.max(15, totalMin - 20);
      return {
        category: "WORKOUT",
        start_date_local: `${dayObj.date}T00:00:00`,
        type: "WeightTraining",
        name: dayObj.title,
        description: `Warmup\n- 10m Z1 HR\n\nMain Set\n- ${mainMin}m Z2 HR\n\nCooldown\n- 10m Z1 HR`,
        external_id: `im2027_${dayObj.id}`
      };
    }

    if (includeExtra && dayObj.discipline === "rest") {
      return {
        category: "NOTE",
        start_date_local: `${dayObj.date}T00:00:00`,
        name: `🧘 ${dayObj.title}`,
        description: `${dayObj.prescription}\n\n🎯 Účel: ${dayObj.purpose}`,
        external_id: `im2027_${dayObj.id}`
      };
    }

    return null;
  }

  function buildIntervalsEventsForWeek(weekObj) {
    return weekObj.days
      .map((d) => buildIntervalsEventForDay(d, false))
      .filter(Boolean);
  }

  function getIntervalsAuthHeader() {
    const key = (state.intervalsApi && state.intervalsApi.apiKey ? state.intervalsApi.apiKey : "").trim();
    if (!key) throw new Error("Není zadán API klíč pro Intervals.icu.");
    return "Basic " + btoa("API_KEY:" + key);
  }

  function getIntervalsAthleteId() {
    const id = (state.intervalsApi && state.intervalsApi.athleteId ? state.intervalsApi.athleteId : "0").trim();
    return id || "0";
  }

  async function testIntervalsApiConnection() {
    const auth = getIntervalsAuthHeader();
    const athleteId = getIntervalsAthleteId();
    const res = await fetch(`https://intervals.icu/api/v1/athlete/${encodeURIComponent(athleteId)}`, {
      method: "GET",
      headers: {
        Authorization: auth,
        Accept: "application/json"
      }
    });
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        throw new Error("Neplatný API klíč nebo Athlete ID (HTTP " + res.status + "). Zkontroluj klíč v Intervals.icu -> Settings -> Developer Settings.");
      }
      throw new Error(`Chyba serveru Intervals.icu (HTTP ${res.status})`);
    }
    const data = await res.json();
    state.intervalsApi.connectedName = data.name || data.firstname || data.id || "Připojeno";
    if (data.id && (!state.intervalsApi.athleteId || state.intervalsApi.athleteId === "0")) {
      state.intervalsApi.athleteId = String(data.id);
    }
    saveState();
    return data;
  }

  async function pushEventsToIntervalsIcu(eventsArray) {
    if (!eventsArray || eventsArray.length === 0) {
      throw new Error("Žádné tréninky k nahrání.");
    }
    const auth = getIntervalsAuthHeader();
    const athleteId = getIntervalsAthleteId();
    const url = `https://intervals.icu/api/v1/athlete/${encodeURIComponent(athleteId)}/events/bulk?upsert=true`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(eventsArray)
    });

    if (!res.ok) {
      let detail = "";
      try {
        detail = await res.text();
      } catch (_) {}
      if (res.status === 401 || res.status === 403) {
        throw new Error("Neautorizováno (HTTP " + res.status + "). Zkontroluj svůj osobní API klíč v Intervals.icu -> Settings -> Developer Settings.");
      }
      throw new Error(`HTTP ${res.status}: ${detail || res.statusText}`);
    }

    return await res.json();
  }

  async function quickPushSelectedWeekFromToolbar() {
    const w = window.PLAN_DATA.weeks.find((x) => x.week === state.selectedWeek) || window.PLAN_DATA.weeks[0];
    if (!state.intervalsApi || !state.intervalsApi.apiKey || !state.intervalsApi.apiKey.trim()) {
      showToast("🔑 Pro přímé nahrávání zadej svůj Intervals.icu API klíč");
      openWeekIntervalsModal(true);
      return;
    }
    const btn = document.getElementById("btn-api-push-week");
    const orig = btn ? btn.textContent : "";
    if (btn) {
      btn.textContent = `⏳ Nahrávám ${w.code}...`;
      btn.disabled = true;
    }
    try {
      const events = buildIntervalsEventsForWeek(w);
      await pushEventsToIntervalsIcu(events);
      showToast(`🚀 Týden ${w.code} (${events.length} položek) byl úspěšně nahrán do kalendáře Intervals.icu!`);
    } catch (err) {
      showToast(`❌ Chyba nahrávání: ${err.message}`);
      openWeekIntervalsModal(true);
    } finally {
      if (btn) {
        btn.textContent = orig;
        btn.disabled = false;
      }
    }
  }

  function openWeekIntervalsModal(showGuideOnly = false) {
    const w = window.PLAN_DATA.weeks.find((x) => x.week === state.selectedWeek) || window.PLAN_DATA.weeks[0];
    const modal = document.getElementById("modal-icu");
    const content = document.getElementById("modal-icu-content");
    if (!modal || !content) return;

    const weekScript = w.days
      .filter((d) => d.intervalsIcu && d.intervalsIcu.trim().length > 0)
      .map((d) => `=== ${d.dayName.toUpperCase()} (${d.date}) | ${d.title} ===\n${normalizeIntervalsIcu(d.intervalsIcu, d.discipline)}`)
      .join("\n\n");

    const apiKeyVal = (state.intervalsApi && state.intervalsApi.apiKey ? state.intervalsApi.apiKey : "").replace(/"/g, "&quot;");
    const athleteIdVal = (state.intervalsApi && state.intervalsApi.athleteId ? state.intervalsApi.athleteId : "0").replace(/"/g, "&quot;");
    const inclExtra = Boolean(state.intervalsApi && state.intervalsApi.includeStrengthAndNotes);
    const connectedBadge = state.intervalsApi && state.intervalsApi.connectedName
      ? `<span class="badge badge-run">✅ Připojen účet: ${state.intervalsApi.connectedName} (${state.intervalsApi.athleteId})</span>`
      : `<span class="badge badge-rest">API klíč zatím neotestován</span>`;

    content.innerHTML = `
      <!-- 1. PŘÍMÉ NAHRÁVÁNÍ PŘES INTERVALS.ICU API KLÍČ -->
      <div style="background:var(--bg-secondary); padding:16px; border-radius:10px; border:1px solid var(--border-color); margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:10px;">
          <h3 style="font-size:1.02rem; margin:0;">🚀 Automatické nahrávání do kalendáře Intervals.icu (přes API klíč)</h3>
          <div id="icu-connection-badge-wrap">${connectedBadge}</div>
        </div>

        <div style="display:grid; grid-template-columns: 2fr 1fr; gap:10px; margin-bottom:10px;">
          <div class="control-group">
            <label for="icu-api-key-input">Osobní Intervals.icu API Key (uloží se bezpečně v tvém prohlížeči)</label>
            <div style="display:flex; gap:6px;">
              <input type="password" id="icu-api-key-input" class="mono" style="flex:1;" placeholder="Vlož svůj API Key z Intervals.icu -> Settings -> Developer Settings" value="${apiKeyVal}" />
              <button type="button" class="btn btn-sm" id="btn-toggle-api-key-vis" title="Zobrazit / skrýt API klíč">👁️</button>
            </div>
          </div>
          <div class="control-group">
            <label for="icu-athlete-id-input">Athlete ID (ponech <code class="mono">0</code> = automaticky)</label>
            <input type="text" id="icu-athlete-id-input" class="mono" placeholder="0 nebo např. i123456" value="${athleteIdVal}" />
          </div>
        </div>

        <label style="display:flex; align-items:center; gap:8px; font-size:0.83rem; cursor:pointer; margin-bottom:12px;">
          <input type="checkbox" id="icu-include-extra" ${inclExtra ? "checked" : ""} />
          <span>Nahrávat do kalendáře i <strong>čtvrteční Sílu/Core</strong> (WeightTraining) a <strong>pondělní volno/regeneraci</strong> (Note)</span>
        </label>

        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <button type="button" class="btn btn-sm" id="btn-icu-test-api">🔌 Uložit &amp; Otestovat spojení</button>
          <button type="button" class="btn btn-primary btn-sm" id="btn-icu-push-current-week">🚀 Nahrát celý týden ${w.code} do Intervals.icu (1 klikem)</button>
          <button type="button" class="btn btn-sm" id="btn-icu-push-active-block" title="Nahraje nebo aktualizuje všech 12 detailních týdnů T01–T12 najednou">📦 Nahrát celý blok T01–T12 (12 týdnů)</button>
          <button type="button" class="btn btn-sm" id="btn-icu-push-all-48" title="Nahraje nebo aktualizuje kompletní sezónu T01–T48">🌍 Nahrát celou sezónu T01–T48</button>
        </div>

        <div id="icu-api-status-box" style="margin-top:10px; font-size:0.83rem; display:none; padding:10px 12px; border-radius:8px;"></div>
      </div>

      <!-- 2. NÁVOD: KDE ZÍSKAT API KLÍČ A CO NASTAVIT V INTERVALS.ICU -->
      <div style="background:var(--bg-secondary); padding:14px 16px; border-radius:10px; border:1px solid var(--border-subtle); margin-bottom:16px; font-size:0.84rem; color:var(--text-secondary);">
        <p style="margin-bottom:8px; color:var(--text-primary);"><strong>🔑 Kde v Intervals.icu získáš API klíč a co je potřeba nastavit (zabere 1 minutu):</strong></p>
        <ol style="padding-left:20px; display:flex; flex-direction:column; gap:5px; margin:0;">
          <li>Přihlas se na <a href="https://intervals.icu" target="_blank" rel="noopener" style="color:var(--accent);">intervals.icu</a> a v levém menu klikni na <strong>Settings</strong> (ozubené kolečko).</li>
          <li>Sjeď úplně dolů do sekce <strong>Developer Settings</strong> -> u položky <strong>API Key</strong> klikni na <strong>View</strong> (případně <em>Generate</em>), zkopíruj zobrazený řetězec a vlož ho do pole výše.</li>
          <li>Ve stejných <strong>Settings</strong> v sekci <strong>Garmin Connect</strong> zaškrtni <strong>Upload planned workouts</strong> (tím se tréninky nahrané do Intervals.icu automaticky přenesou do tvých hodinek Garmin).</li>
          <li>Zkontroluj v <strong>Settings</strong> své prahy: Kolo <strong>FTP = ${state.thresholds.ftp} W</strong>, Běh <strong>LTHR = ${state.thresholds.lthr} bpm</strong>, Plavání <strong>Threshold Pace = ${formatSecToMMSS(state.thresholds.cssSecPer100m)} /100m</strong>.</li>
          <li><em>Bezpečnost proti duplicitám:</em> Každý den má unikátní identifikátor (<code class="mono">im2027_T01-D2</code> atd.) s parametrem <code class="mono">upsert=true</code> – když klikneš na nahrání týdne opakovaně, tréninky se v kalendáři <strong>nezdvojí</strong>, ale čistě zaktualizují!</li>
        </ol>
      </div>

      <!-- 3. JEDNOTLIVÉ DNY TÝDNE (RYCHLÉ KOPÍROVÁNÍ NEBO NAHRÁNÍ 1 DNE) -->
      <div style="margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
          <strong>Rozpis dnů týdne ${w.code} (${formatDateCz(w.startDate)} – ${formatDateCz(w.endDate)}):</strong>
          <button class="btn btn-sm" id="btn-modal-copy-week">📋 Zkopírovat text celého týdne ${w.code}</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${w.days
            .map((d) => {
              const hasIcu = Boolean(d.intervalsIcu && d.intervalsIcu.trim().length > 0);
              const meta = getDisciplineMeta(d.discipline);
              return `
                <div style="padding:10px 12px; border-radius:8px; background:var(--bg-secondary); border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">
                  <div style="flex:1; min-width:220px;">
                    <span class="mono" style="font-size:0.78rem; color:var(--text-muted);">${d.dayName} ${formatDateCz(d.date)}</span>
                    <div><strong>${meta.icon} ${d.title}</strong> <span class="badge badge-rest mono">${d.durationMin} min</span></div>
                  </div>
                  <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    ${
                      hasIcu
                        ? `<button type="button" class="btn btn-sm btn-modal-copy-day" data-day-id="${d.id}">📋 Kopírovat den</button>`
                        : ""
                    }
                    <button type="button" class="btn btn-primary btn-sm btn-modal-push-day" data-day-id="${d.id}">🚀 Nahrát den (API)</button>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>

      <details style="margin-top:10px;">
        <summary style="cursor:pointer; font-size:0.84rem; color:var(--text-muted); font-weight:600;">Zobrazit surový textový skript Workout Builderu pro týden ${w.code}</summary>
        <pre class="code-block" style="margin-top:8px;">${weekScript}</pre>
      </details>
    `;

    modal.classList.add("open");

    const statusBox = document.getElementById("icu-api-status-box");
    const showStatus = (msg, isError = false) => {
      if (!statusBox) return;
      statusBox.style.display = "block";
      statusBox.style.background = isError ? "rgba(239,68,68,0.14)" : "rgba(16,185,129,0.14)";
      statusBox.style.border = `1px solid ${isError ? "var(--status-red)" : "var(--status-green)"}`;
      statusBox.style.color = "var(--text-primary)";
      statusBox.innerHTML = msg;
    };

    const syncInputsToState = () => {
      const kEl = document.getElementById("icu-api-key-input");
      const aEl = document.getElementById("icu-athlete-id-input");
      const exEl = document.getElementById("icu-include-extra");
      if (!state.intervalsApi) state.intervalsApi = { apiKey: "", athleteId: "0", includeStrengthAndNotes: true, connectedName: "" };
      if (kEl) state.intervalsApi.apiKey = kEl.value.trim();
      if (aEl) state.intervalsApi.athleteId = aEl.value.trim() || "0";
      if (exEl) state.intervalsApi.includeStrengthAndNotes = exEl.checked;
      saveState();
    };

    const visBtn = document.getElementById("btn-toggle-api-key-vis");
    if (visBtn) {
      visBtn.addEventListener("click", () => {
        const kEl = document.getElementById("icu-api-key-input");
        if (kEl) kEl.type = kEl.type === "password" ? "text" : "password";
      });
    }

    const testBtn = document.getElementById("btn-icu-test-api");
    if (testBtn) {
      testBtn.addEventListener("click", async () => {
        syncInputsToState();
        showStatus("⏳ Ověřuji spojení s Intervals.icu API...", false);
        try {
          const athlete = await testIntervalsApiConnection();
          const aIdEl = document.getElementById("icu-athlete-id-input");
          if (aIdEl && state.intervalsApi.athleteId) aIdEl.value = state.intervalsApi.athleteId;
          const badgeWrap = document.getElementById("icu-connection-badge-wrap");
          if (badgeWrap) {
            badgeWrap.innerHTML = `<span class="badge badge-run">✅ Připojen účet: ${state.intervalsApi.connectedName} (${state.intervalsApi.athleteId})</span>`;
          }
          showStatus(`✅ Spojení funguje! Připojen sportovec: <strong>${athlete.name || athlete.id}</strong> (ID: <code class="mono">${athlete.id}</code>). Nyní můžeš nahrávat tréninky jedním klikem.`, false);
          showToast("✅ Intervals.icu API klíč ověřen a uložen");
        } catch (err) {
          showStatus(`❌ ${err.message}`, true);
        }
      });
    }

    const pushWeekBtn = document.getElementById("btn-icu-push-current-week");
    if (pushWeekBtn) {
      pushWeekBtn.addEventListener("click", async () => {
        syncInputsToState();
        const events = buildIntervalsEventsForWeek(w);
        showStatus(`⏳ Nahrávám týden <strong>${w.code}</strong> (${events.length} položek) do kalendáře Intervals.icu...`, false);
        try {
          await pushEventsToIntervalsIcu(events);
          showStatus(`✅ Týden <strong>${w.code}</strong> (${formatDateCz(w.startDate)} – ${formatDateCz(w.endDate)}, ${events.length} položek) byl úspěšně nahrán do tvého kalendáře Intervals.icu!`, false);
          showToast(`🚀 Týden ${w.code} nahrán do Intervals.icu`);
        } catch (err) {
          showStatus(`❌ Chyba při nahrávání: ${err.message}`, true);
        }
      });
    }

    const pushBlockBtn = document.getElementById("btn-icu-push-active-block");
    if (pushBlockBtn) {
      pushBlockBtn.addEventListener("click", async () => {
        syncInputsToState();
        const blockWeeks = window.PLAN_DATA.weeks.filter((wk) => wk.week >= 1 && wk.week <= 12);
        const events = blockWeeks.flatMap((wk) => buildIntervalsEventsForWeek(wk));
        showStatus(`⏳ Nahrávám detailní blok <strong>T01–T12</strong> (${events.length} položek) do Intervals.icu...`, false);
        try {
          await pushEventsToIntervalsIcu(events);
          showStatus(`✅ Celý detailní blok <strong>T01–T12</strong> (${events.length} tréninků a poznámek) byl úspěšně nahrán do kalendáře Intervals.icu!`, false);
          showToast("🚀 Blok T01–T12 nahrán do Intervals.icu");
        } catch (err) {
          showStatus(`❌ Chyba při nahrávání bloku: ${err.message}`, true);
        }
      });
    }

    const pushAllBtn = document.getElementById("btn-icu-push-all-48");
    if (pushAllBtn) {
      pushAllBtn.addEventListener("click", async () => {
        syncInputsToState();
        const events = window.PLAN_DATA.weeks.flatMap((wk) => buildIntervalsEventsForWeek(wk));
        showStatus(`⏳ Nahrávám kompletní sezónu <strong>T01–T48</strong> (${events.length} položek) do Intervals.icu...`, false);
        try {
          await pushEventsToIntervalsIcu(events);
          showStatus(`✅ Kompletní 48týdenní sezóna <strong>T01–T48</strong> (${events.length} položek) byla nahrána do kalendáře Intervals.icu!`, false);
          showToast("🌍 Celá sezóna T01–T48 nahrána do Intervals.icu");
        } catch (err) {
          showStatus(`❌ Chyba při nahrávání sezóny: ${err.message}`, true);
        }
      });
    }

    const copyBtn = document.getElementById("btn-modal-copy-week");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        copyToClipboard(weekScript, `Týden ${w.code} zkopírován do schránky`);
      });
    }

    content.querySelectorAll(".btn-modal-copy-day").forEach((btn) => {
      btn.addEventListener("click", () => {
        const dayId = btn.getAttribute("data-day-id");
        const dayObj = w.days.find((x) => x.id === dayId);
        if (dayObj && dayObj.intervalsIcu) {
          copyToClipboard(normalizeIntervalsIcu(dayObj.intervalsIcu, dayObj.discipline), `Předpis "${dayObj.title}" (${dayObj.dayName}) zkopírován`);
        }
      });
    });

    content.querySelectorAll(".btn-modal-push-day").forEach((btn) => {
      btn.addEventListener("click", async () => {
        syncInputsToState();
        const dayId = btn.getAttribute("data-day-id");
        const dayObj = w.days.find((x) => x.id === dayId);
        if (!dayObj) return;
        const ev = buildIntervalsEventForDay(dayObj, true);
        if (!ev) return;
        showStatus(`⏳ Nahrávám <strong>${dayObj.dayName} (${formatDateCz(dayObj.date)}): ${dayObj.title}</strong>...`, false);
        try {
          await pushEventsToIntervalsIcu([ev]);
          showStatus(`✅ Den <strong>${dayObj.dayName} (${formatDateCz(dayObj.date)}): ${dayObj.title}</strong> byl nahrán do kalendáře Intervals.icu!`, false);
          showToast(`✅ ${dayObj.dayName} nahrán do Intervals.icu`);
        } catch (err) {
          showStatus(`❌ Chyba při nahrávání dne: ${err.message}`, true);
        }
      });
    });
  }

  // ==========================================================================
  // SEKCE D: GARMIN CSV IMPORTÉR & GENERÁTOR AI PROMPTU
  // ==========================================================================
  function loadAndParseCsvText(csvText, sourceLabel = "Activities.csv") {
    parsedCsvData = window.GarminCSVParser.parseCSV(csvText, window.PLAN_DATA.weeks);
    renderGarminTab(sourceLabel);
    renderDashboardWeekCard();
    renderMacroChart();
  }

  function renderGarminTab(sourceLabel = "Activities.csv") {
    const sub = document.getElementById("csv-stats-subtitle");
    const kpiBox = document.getElementById("csv-summary-kpis");
    const tbody = document.getElementById("csv-activities-tbody");
    const filterEl = document.getElementById("csv-filter-discipline");
    if (!kpiBox || !tbody || !parsedCsvData.summary) return;

    const s = parsedCsvData.summary;
    const swim = s.byDiscipline.swim;
    const bike = s.byDiscipline.bike;
    const run = s.byDiscipline.run;
    const walk = s.byDiscipline.walk;

    if (sub) {
      sub.textContent = `Zdroj: ${sourceLabel} • Načteno ${s.allCount} záznamů (${formatDateCz(s.dateMin)} – ${formatDateCz(s.dateMax)}) • Mimo chůzi: ${s.triTotalHoursExclWalk.toFixed(1).replace(".", ",")} hod`;
    }

    kpiBox.innerHTML = `
      <div class="kpi-box">
        <span class="kpi-label">🏃 Běh (venku + pás)</span>
        <div class="kpi-val mono" style="color:var(--col-run);">${run.count} aktivit • ${run.km.toFixed(1).replace(".", ",")} km</div>
        <div class="kpi-sub">Celkem ${run.hours.toFixed(1).replace(".", ",")} hod | Prům. TF ${run.avgHrCount ? Math.round(run.avgHrSum / run.avgHrCount) : "--"} bpm</div>
      </div>
      <div class="kpi-box">
        <span class="kpi-label">🚴 Cyklistika + Multisport</span>
        <div class="kpi-val mono" style="color:var(--col-bike);">${bike.count + s.byDiscipline.multisport.count} jízd • ${(bike.km + s.byDiscipline.multisport.km).toFixed(1).replace(".", ",")} km</div>
        <div class="kpi-sub">Kolo: ${bike.hours.toFixed(1).replace(".", ",")} h + 70.3 HK: ${s.byDiscipline.multisport.hours.toFixed(1).replace(".", ",")} h</div>
      </div>
      <div class="kpi-box">
        <span class="kpi-label">🏊 Plavání (bazén + volná voda)</span>
        <div class="kpi-val mono" style="color:var(--col-swim);">${swim.count} plavání • ${swim.meters} m (${swim.km.toFixed(2).replace(".", ",")} km)</div>
        <div class="kpi-sub">Celkem ${swim.hours.toFixed(2).replace(".", ",")} hod (přepočteno z metrů)</div>
      </div>
      <div class="kpi-box">
        <span class="kpi-label">🥾 Chůze &amp; Treky (${state.includeWalkInTotals ? "Započteno" : "Odděleno mimo SBR"})</span>
        <div class="kpi-val mono">${walk.count} chůzí • ${walk.hours.toFixed(1).replace(".", ",")} hod</div>
        <div class="kpi-sub">Vzdálenost chůze: ${walk.km.toFixed(1).replace(".", ",")} km</div>
      </div>
    `;

    const filterVal = filterEl ? filterEl.value : "all";
    const filtered = parsedCsvData.activities.filter((a) => {
      if (filterVal === "all") return true;
      return a.discipline === filterVal;
    });

    tbody.innerHTML = filtered
      .slice(0, 150)
      .map((a) => {
        const meta = getDisciplineMeta(a.discipline);
        const distDisplay =
          a.discipline === "swim" || a.rawType.toLowerCase().includes("vesl")
            ? `${a.distanceMeters} m (${a.distanceKm.toFixed(3).replace(".", ",")} km)`
            : `${a.distanceKm.toFixed(2).replace(".", ",")} km`;
        const weekTag = a.week ? `<span class="badge badge-swim mono">T${String(a.week).padStart(2, "0")}</span>` : `<span style="color:var(--text-muted); font-size:0.75rem;">Baseline</span>`;

        return `
          <tr>
            <td class="mono">${a.date}</td>
            <td>${a.rawType}</td>
            <td><span class="badge ${meta.badge}">${meta.label}</span></td>
            <td><strong>${a.title}</strong></td>
            <td class="mono">${distDisplay}</td>
            <td class="mono">${formatSecToHHMMSS(a.durationSec)}</td>
            <td class="mono">${a.avgPace || "--"}</td>
            <td class="mono">${a.avgHr ? a.avgHr + " bpm" : "--"}</td>
            <td class="mono">${a.avgPower ? a.avgPower + " W" : "--"}</td>
            <td>${weekTag}</td>
          </tr>
        `;
      })
      .join("");
  }

  function generateAiCoachPrompt() {
    const countEl = document.getElementById("ai-prompt-weeks-count");
    const numWeeks = countEl ? Number(countEl.value) || 4 : 4;
    const endW = state.selectedWeek;
    const startW = Math.max(1, endW - numWeeks + 1);

    const lines = [];
    lines.push(`# PODKLAD PRO AKTUALIZACI PLÁNU (Cesta k Ironman Emilia-Romagna 2027)`);
    lines.push(`Aktuální týden: T${String(endW).padStart(2, "0")} | Hodnocené období: T${String(startW).padStart(2, "0")}–T${String(endW).padStart(2, "0")}`);
    lines.push(`Fyziologické prahy: FTP = ${state.thresholds.ftp} W | Běh LTHR = ${state.thresholds.lthr} bpm | Plavání CSS = ${formatSecToMMSS(state.thresholds.cssSecPer100m)} /100m`);
    lines.push(`Ranní Semafor: Noční HRV = ${state.semafor.hrv} ms (baseline 40 ms) | Spánek = ${state.semafor.sleep} h | Stav beder = ${state.semafor.back}/5`);
    lines.push(``);
    lines.push(`## Přehled odtrénovaných týdnů (Plán vs. Skutečnost):`);

    for (let wNum = startW; wNum <= endW; wNum++) {
      const w = window.PLAN_DATA.weeks.find((x) => x.week === wNum);
      if (!w) continue;
      const act = getWeekActualStats(w);
      lines.push(`- **${w.code} (${w.startDate} až ${w.endDate} | ${w.type})**: Plán ${w.hours.total} h -> Skutečnost **${act.effectiveActualHours.toFixed(2)} h** (${act.compliancePct} %)`);
      w.days.forEach((d) => {
        const l = state.workoutLogs[d.id];
        if (l && (l.status !== "planned" || l.note)) {
          lines.push(`  - ${d.dayName} (${d.title}): stav=${l.status}, čas=${l.actualMin || d.durationMin}m, RPE=${l.rpe || "-"}, poznámka="${l.note || ""}"`);
        }
      });
    }

    lines.push(``);
    lines.push(`## Úkol pro AI trenéra:`);
    lines.push(`Na základě výše uvedeného plnění, odezvy HRV a stavu beder aktualizuj denní rozpis pro následující 2–4 týdny ve formátu kompatibilním s objektem PLAN_DATA.weeks (při zachování čtvrtečního Core slotu, 2× plavání týdně a šetření beder v TT aero pozici).`);

    const promptText = lines.join("\n");
    const ta = document.getElementById("ai-prompt-textarea");
    if (ta) ta.value = promptText;
    copyToClipboard(promptText, "AI Prompt byl vygenerován a zkopírován do schránky");
  }

  // ==========================================================================
  // SEKCE E: KALKULAČKA ZÁVODNÍ STRATEGIE A VÝŽIVY (RACE PACING & FUELING)
  // ==========================================================================
  function renderRaceCalculator() {
    const raceKey = state.selectedRaceCalc || "im-cervia";
    const rc = window.PLAN_DATA.raceCalculators[raceKey];
    const container = document.getElementById("race-calculator-body");
    if (!rc || !container) return;

    document.querySelectorAll("#race-calc-selector button").forEach((btn) => {
      const active = btn.getAttribute("data-race") === raceKey;
      btn.classList.toggle("active", active);
      btn.classList.toggle("btn-primary", active);
    });

    const custom = state.racePacingCustom[raceKey] || {};

    if (rc.type === "run") {
      const paceSec = custom.paceSec !== undefined ? custom.paceSec : rc.defaultPaceSec;
      const carbsH = custom.carbsPerHour !== undefined ? custom.carbsPerHour : rc.defaultCarbsPerHour;
      const fluidH = custom.fluidMlPerHour !== undefined ? custom.fluidMlPerHour : rc.defaultFluidMlPerHour;
      const sodiumH = custom.sodiumMgPerHour !== undefined ? custom.sodiumMgPerHour : rc.defaultSodiumMgPerHour;

      const totalSec = rc.distanceKm * paceSec;
      const totalHours = totalSec / 3600;
      const totalCarbs = Math.round(totalHours * carbsH);
      const totalGels = Math.ceil(totalCarbs / 25);

      container.innerHTML = `
        <div class="grid-2" style="margin-top:10px;">
          <div style="background:var(--bg-secondary); padding:16px; border-radius:10px; border:1px solid var(--border-subtle);">
            <h3 style="margin-bottom:12px;">${rc.name} (${rc.distanceKm.toFixed(1).replace(".", ",")} km)</h3>
            <div class="control-group" style="margin-bottom:14px;">
              <label>Cílové tempo běhu: <strong class="mono" style="color:var(--col-run);">${formatSecToMMSS(paceSec)} /km</strong></label>
              <input type="range" id="rc-run-pace" min="${rc.minPaceSec}" max="${rc.maxPaceSec}" step="1" value="${paceSec}" />
            </div>
            <div class="control-group" style="margin-bottom:14px;">
              <label>Příjem sacharidů: <strong class="mono">${carbsH} g / hod</strong> (~${Math.round(carbsH / 25 * 10) / 10} gelu/h)</label>
              <input type="range" id="rc-carbs" min="30" max="95" step="5" value="${carbsH}" />
            </div>
            <div class="control-group">
              <label>Tekutiny &amp; Sodík: <strong class="mono">${fluidH} ml/h • ${sodiumH} mg Na+/h</strong></label>
              <input type="range" id="rc-fluid" min="400" max="1000" step="50" value="${fluidH}" />
            </div>
            <div class="day-purpose" style="margin-top:14px;">${rc.notes}</div>
          </div>

          <div style="background:var(--bg-secondary); padding:16px; border-radius:10px; border:1px solid var(--border-subtle);">
            <h3 style="margin-bottom:12px;">Propočtené mezičasy a nutriční plán</h3>
            <div class="kpi-grid" style="grid-template-columns:repeat(2,1fr);">
              <div class="kpi-box">
                <span class="kpi-label">Cílový výsledný čas</span>
                <div class="kpi-val mono" style="color:var(--col-run); font-size:1.45rem;">${formatSecToHHMMSS(totalSec)}</div>
                <div class="kpi-sub">Průměrné tempo ${formatSecToMMSS(paceSec)} /km</div>
              </div>
              <div class="kpi-box">
                <span class="kpi-label">Celkem sacharidů &amp; gelů</span>
                <div class="kpi-val mono">${totalCarbs} g CHO</div>
                <div class="kpi-sub">Ekvivalent ~${totalGels}× 25g gelů</div>
              </div>
              <div class="kpi-box">
                <span class="kpi-label">Mezičas 10 km / Půlka</span>
                <div class="kpi-val mono" style="font-size:1.05rem;">${formatSecToHHMMSS(10 * paceSec)} / ${formatSecToHHMMSS((rc.distanceKm / 2) * paceSec)}</div>
                <div class="kpi-sub">Kontrola rovnoměrného splitu</div>
              </div>
              <div class="kpi-box">
                <span class="kpi-label">Celkem tekutin &amp; sodíku</span>
                <div class="kpi-val mono" style="font-size:1.05rem;">${(totalHours * fluidH / 1000).toFixed(1).replace(".", ",")} L • ${Math.round(totalHours * sodiumH)} mg Na+</div>
                <div class="kpi-sub">Pít pravidelně každých 15 min</div>
              </div>
            </div>
          </div>
        </div>
      `;

      const bindSlider = (id, key) => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener("input", () => {
            if (!state.racePacingCustom[raceKey]) state.racePacingCustom[raceKey] = {};
            state.racePacingCustom[raceKey][key] = Number(el.value);
            saveState();
            renderRaceCalculator();
          });
        }
      };
      bindSlider("rc-run-pace", "paceSec");
      bindSlider("rc-carbs", "carbsPerHour");
      bindSlider("rc-fluid", "fluidMlPerHour");
      return;
    }

    // Silniční cyklistický závod (L'Etape Czech Republic – 100 km / 1 200 m)
    if (rc.type === "bike") {
      const speedKmh = custom.speedKmh !== undefined ? custom.speedKmh : rc.defaultSpeedKmh;
      const climbHr = custom.climbHr !== undefined ? custom.climbHr : rc.defaultClimbHrBpm;
      const climbWatts = custom.climbWatts !== undefined ? custom.climbWatts : rc.defaultClimbWatts;
      const carbsH = custom.carbsPerHour !== undefined ? custom.carbsPerHour : rc.defaultCarbsPerHour;
      const fluidH = custom.fluidMlPerHour !== undefined ? custom.fluidMlPerHour : rc.defaultFluidMlPerHour;
      const sodiumH = rc.defaultSodiumMgPerHour;

      const totalHours = rc.distanceKm / Math.max(12, speedKmh);
      const totalSec = Math.round(totalHours * 3600);
      const totalCarbs = Math.round(totalHours * carbsH);
      const totalGels = Math.ceil(totalCarbs / 25);
      const pctFtpClimb = Math.round((climbWatts / state.thresholds.ftp) * 100);
      const wKgClimb = (climbWatts / (state.thresholds.weightKg || 84)).toFixed(2).replace(".", ",");
      const inTargetWindow = speedKmh >= 21.5 && speedKmh <= 23.5;

      container.innerHTML = `
        <div class="grid-2" style="margin-top:10px;">
          <div style="background:var(--bg-secondary); padding:16px; border-radius:10px; border:1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:10px;">
              <h3>🚴 ${rc.name}</h3>
              <span class="badge badge-race-b">Priorita ${rc.priority} • Povinně SILNIČNÍ KOLO</span>
            </div>

            <div class="control-group" style="margin-bottom:12px;">
              <label>Cílová průměrná rychlost (100 km / ${rc.elevationM} m převýšení): <strong class="mono" style="color:var(--col-bike);">${speedKmh.toFixed(1).replace(".", ",")} km/h</strong> <span style="font-size:0.76rem; color:var(--text-muted);">(Cílové okno: 21,5–23,5 km/h = 4:15–4:40 h)</span></label>
              <input type="range" id="rc-bike-speed" min="${rc.minSpeedKmh}" max="${rc.maxSpeedKmh}" step="0.1" value="${speedKmh}" />
            </div>

            <div class="control-group" style="margin-bottom:12px;">
              <label>❤️ Primární řízení dle TF v kopcích (Z3): <strong class="mono" style="color:var(--col-run);">${climbHr} bpm</strong> <span style="font-size:0.76rem; color:var(--text-muted);">(Roviny ve skupině Z2: 123–132 bpm | Strop ve stojkách: 150 bpm)</span></label>
              <input type="range" id="rc-bike-climb-hr" min="130" max="146" step="1" value="${climbHr}" />
            </div>

            <div class="control-group" style="margin-bottom:12px;">
              <label>⚡ Alternativní výkon v kopcích (při přehození wattmetru z TT kola): <strong class="mono" style="color:var(--col-bike);">${climbWatts} W (${pctFtpClimb} % FTP • ${wKgClimb} W/kg)</strong> <span style="font-size:0.76rem; color:var(--text-muted);">(Doporučeno 175–190 W, kadence 75–85 rpm)</span></label>
              <input type="range" id="rc-bike-climb-watts" min="155" max="205" step="1" value="${climbWatts}" />
            </div>

            <div class="control-group" style="margin-bottom:12px;">
              <label>🍌 Test závodní výživy (sacharidy): <strong class="mono">${carbsH} g / hod</strong> (~${(carbsH / 25).toFixed(1).replace(".", ",")} gelu/bidonu za hodinu; cíl 70–80 g/h)</label>
              <input type="range" id="rc-bike-carbs" min="50" max="95" step="5" value="${carbsH}" />
            </div>

            <div class="control-group">
              <label>💧 Tekutiny &amp; Sodík: <strong class="mono">${fluidH} ml/h • ${sodiumH} mg Na+/h</strong></label>
              <input type="range" id="rc-bike-fluid" min="450" max="1000" step="50" value="${fluidH}" />
            </div>

            <div class="day-purpose" style="margin-top:14px;">${rc.notes}</div>
          </div>

          <div style="background:var(--bg-secondary); padding:16px; border-radius:10px; border:1px solid var(--border-subtle);">
            <h3 style="margin-bottom:12px;">Propočtený čas, mezičasy a taktika pro L'Etape (100 km)</h3>
            <div class="kpi-grid" style="grid-template-columns:repeat(2,1fr);">
              <div class="kpi-box" style="grid-column: 1 / -1; border-color:var(--col-bike);">
                <span class="kpi-label">ODHADOVANÝ VÝSLEDNÝ ČAS V CÍLI (100 KM / 1 200 M)</span>
                <div class="kpi-val mono" style="font-size:1.6rem; color:var(--col-bike);">${formatSecToHHMMSS(totalSec)}</div>
                <div class="kpi-sub">${inTargetWindow ? "✅ V optimálním cílovém okně 4:15–4:40 hod (21,5–23,5 km/h)" : "ℹ️ Mimo primární cílové okno 4:15–4:40 hod (21,5–23,5 km/h)"}</div>
              </div>
              <div class="kpi-box">
                <span class="kpi-label">Mezičasy 25 km / 50 km / 75 km</span>
                <div class="kpi-val mono" style="font-size:0.98rem;">${formatSecToHHMMSS(totalSec * 0.25)} / ${formatSecToHHMMSS(totalSec * 0.5)} / ${formatSecToHHMMSS(totalSec * 0.75)}</div>
                <div class="kpi-sub">Roviny jet v háku (Z2: 123–132 bpm), šetřit síly do kopců</div>
              </div>
              <div class="kpi-box">
                <span class="kpi-label">Režim v kopcích &amp; Ochrana beder</span>
                <div class="kpi-val mono" style="font-size:0.98rem;">TF ${climbHr} bpm (max 150) | ~${climbWatts} W</div>
                <div class="kpi-sub">Kadence 75–85 rpm • Pravidelně ze sedla ulevit bedrům</div>
              </div>
              <div class="kpi-box">
                <span class="kpi-label">Celkem sacharidů (${carbsH} g/h)</span>
                <div class="kpi-val mono">${totalCarbs} g CHO</div>
                <div class="kpi-sub">Ekvivalent ~${totalGels}× 25g porcí (bidony + gely + tyčinky)</div>
              </div>
              <div class="kpi-box">
                <span class="kpi-label">Celkem tekutin &amp; sodíku</span>
                <div class="kpi-val mono" style="font-size:1.02rem;">${((totalHours * fluidH) / 1000).toFixed(1).replace(".", ",")} L • ${Math.round(totalHours * sodiumH)} mg Na+</div>
                <div class="kpi-sub">Doplnit bidony na občerstvovačce v polovině trasy</div>
              </div>
            </div>
          </div>
        </div>
      `;

      const bindBike = (id, key) => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener("input", () => {
            if (!state.racePacingCustom[raceKey]) state.racePacingCustom[raceKey] = {};
            state.racePacingCustom[raceKey][key] = Number(el.value);
            saveState();
            renderRaceCalculator();
          });
        }
      };
      bindBike("rc-bike-speed", "speedKmh");
      bindBike("rc-bike-climb-hr", "climbHr");
      bindBike("rc-bike-climb-watts", "climbWatts");
      bindBike("rc-bike-carbs", "carbsPerHour");
      bindBike("rc-bike-fluid", "fluidMlPerHour");
      return;
    }

    // Triatlon 70.3 nebo 140.6
    const swimPace = custom.swimPace !== undefined ? custom.swimPace : rc.defaultSwimPaceSec100m;
    const bikeWatts = custom.bikeWatts !== undefined ? custom.bikeWatts : rc.defaultBikeWatts;
    const runPace = custom.runPace !== undefined ? custom.runPace : rc.defaultRunPaceSec;
    const carbsBike = custom.carbsBike !== undefined ? custom.carbsBike : rc.defaultCarbsBikeG;
    const carbsRun = custom.carbsRun !== undefined ? custom.carbsRun : rc.defaultCarbsRunG;

    const swimSec = (rc.swimDistM / 100) * swimPace;
    const transSec = rc.defaultTransitionsMin * 60;
    // Rychlost v TT aero pozici na rovinaté/zvlněné trati (kalibrováno: 148W -> 27.7 km/h -> 6:30 na 180 km; 170W -> 27.7 km/h na zvlněných 90 km v HK -> 3:15)
    const baseWatts = rc.defaultBikeWatts;
    const baseBikeHours = rc.type === "tri1406" ? 6.5 : 3.25;
    const bikeHours = baseBikeHours * Math.pow(baseWatts / Math.max(100, bikeWatts), 0.38);
    const bikeSec = bikeHours * 3600;
    const bikeSpeedKmh = rc.bikeDistKm / bikeHours;
    const pctFtp = Math.round((bikeWatts / state.thresholds.ftp) * 100);

    const runSec = rc.runDistKm * runPace;
    const runHours = runSec / 3600;
    const totalSec = swimSec + transSec + bikeSec + runSec;

    const totalBikeCarbs = Math.round(bikeHours * carbsBike);
    const totalRunCarbs = Math.round(runHours * carbsRun);

    container.innerHTML = `
      <div class="grid-2" style="margin-top:10px;">
        <div style="background:var(--bg-secondary); padding:16px; border-radius:10px; border:1px solid var(--border-subtle);">
          <h3 style="margin-bottom:12px;">${rc.name}</h3>
          <div class="control-group" style="margin-bottom:12px;">
            <label>🏊 Tempo plavání (${rc.swimDistM} m): <strong class="mono" style="color:var(--col-swim);">${formatSecToMMSS(swimPace)} /100m</strong></label>
            <input type="range" id="rc-tri-swim" min="120" max="185" step="1" value="${swimPace}" />
          </div>
          <div class="control-group" style="margin-bottom:12px;">
            <label>🚴 Cílový výkon na TT kole (${rc.bikeDistKm} km): <strong class="mono" style="color:var(--col-bike);">${bikeWatts} W (${pctFtp} % FTP • ${(bikeWatts / state.thresholds.weightKg).toFixed(2).replace(".", ",")} W/kg)</strong></label>
            <input type="range" id="rc-tri-bike" min="125" max="200" step="1" value="${bikeWatts}" />
          </div>
          <div class="control-group" style="margin-bottom:12px;">
            <label>🏃 Tempo běhu (${rc.runDistKm} km vč. občerstvovaček): <strong class="mono" style="color:var(--col-run);">${formatSecToMMSS(runPace)} /km</strong></label>
            <input type="range" id="rc-tri-run" min="340" max="540" step="2" value="${runPace}" />
          </div>
          <div class="control-group">
            <label>🍌 Sacharidy na kole: <strong class="mono">${carbsBike} g/hod</strong> (Běh: ${carbsRun} g/hod)</label>
            <input type="range" id="rc-tri-carbs" min="50" max="100" step="5" value="${carbsBike}" />
          </div>
          <div class="day-purpose" style="margin-top:14px;">${rc.notes}</div>
        </div>

        <div style="background:var(--bg-secondary); padding:16px; border-radius:10px; border:1px solid var(--border-subtle);">
          <h3 style="margin-bottom:12px;">Modelový rozpad závodního času a výživy</h3>
          <div class="kpi-grid" style="grid-template-columns:repeat(2,1fr);">
            <div class="kpi-box" style="grid-column: 1 / -1; border-color:var(--col-race-a);">
              <span class="kpi-label">CELKOVÝ CÍLOVÝ ČAS V CÍLI</span>
              <div class="kpi-val mono" style="font-size:1.65rem; color:var(--accent);">${formatSecToHHMMSS(totalSec)}</div>
              <div class="kpi-sub">Včetně dep T1+T2 (${rc.defaultTransitionsMin} min)</div>
            </div>
            <div class="kpi-box">
              <span class="kpi-label">🏊 Plavání (${rc.swimDistM} m)</span>
              <div class="kpi-val mono" style="color:var(--col-swim);">${formatSecToHHMMSS(swimSec)}</div>
              <div class="kpi-sub">Tempo ${formatSecToMMSS(swimPace)} /100m</div>
            </div>
            <div class="kpi-box">
              <span class="kpi-label">🚴 Kolo (${rc.bikeDistKm} km @ ${bikeWatts} W)</span>
              <div class="kpi-val mono" style="color:var(--col-bike);">${formatSecToHHMMSS(bikeSec)}</div>
              <div class="kpi-sub">Ø rychlost ~${bikeSpeedKmh.toFixed(1).replace(".", ",")} km/h (${pctFtp} % FTP)</div>
            </div>
            <div class="kpi-box">
              <span class="kpi-label">🏃 Běh (${rc.runDistKm} km)</span>
              <div class="kpi-val mono" style="color:var(--col-run);">${formatSecToHHMMSS(runSec)}</div>
              <div class="kpi-sub">Tempo ${formatSecToMMSS(runPace)} /km</div>
            </div>
            <div class="kpi-box">
              <span class="kpi-label">⚡ Nutriční bilance závodu</span>
              <div class="kpi-val mono" style="font-size:1rem;">Kolo: ${totalBikeCarbs} g | Běh: ${totalRunCarbs} g</div>
              <div class="kpi-sub">Tekutiny: ~${rc.defaultFluidMlPerHour} ml/h • Sodík: ${rc.defaultSodiumMgPerHour} mg/h</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const bindTri = (id, key) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => {
          if (!state.racePacingCustom[raceKey]) state.racePacingCustom[raceKey] = {};
          state.racePacingCustom[raceKey][key] = Number(el.value);
          saveState();
          renderRaceCalculator();
        });
      }
    };
    bindTri("rc-tri-swim", "swimPace");
    bindTri("rc-tri-bike", "bikeWatts");
    bindTri("rc-tri-run", "runPace");
    bindTri("rc-tri-carbs", "carbsBike");
  }

  // ==========================================================================
  // SEKCE: TRÉNINKOVÉ ZÓNY (AUTOMATICKÝ PŘEPOČET DLE LTHR / FTP / CSS) & PROFIL
  // ==========================================================================
  function renderZonesAndProfile() {
    const lthr = Number(state.thresholds.lthr) || 154;
    const ftp = Number(state.thresholds.ftp) || 217;
    const css = Number(state.thresholds.cssSecPer100m) || 148;
    const wKg = (ftp / (state.thresholds.weightKg || 84)).toFixed(2).replace(".", ",");

    document.getElementById("input-lthr").value = lthr;
    document.getElementById("input-ftp").value = ftp;
    document.getElementById("input-css").value = css;
    document.getElementById("css-formatted-hint").textContent = `${css} s = ${formatSecToMMSS(css)} / 100 m`;

    // Přepočet tepových zón běhu dle LTHR (výchozí LTHR 154 -> Z1 <126, Z2 126-138, Z3 139-145, Z4 146-154, Z5 >154)
    const rZ1Max = Math.round(lthr * 0.818); // 126
    const rZ2Max = Math.round(lthr * 0.896); // 138
    const rZ3Max = Math.round(lthr * 0.942); // 145

    // Přepočet výkonových zón kola dle Coggana (FTP 217 W)
    const bZ1Max = Math.round(ftp * 0.55);
    const bZ2Min = Math.round(ftp * 0.56);
    const bZ2Max = Math.round(ftp * 0.75);
    const bImMin = Math.round(ftp * 0.65);
    const bImMax = Math.round(ftp * 0.72);
    const bZ3Min = Math.round(ftp * 0.76);
    const bZ3Max = Math.round(ftp * 0.90);
    const b703Min = Math.round(ftp * 0.75);
    const b703Max = Math.round(ftp * 0.82);
    const bZ4Min = Math.round(ftp * 0.91);
    const bZ4Max = Math.round(ftp * 1.05);
    const bZ5Min = Math.round(ftp * 1.06);
    const bZ5Max = Math.round(ftp * 1.20);

    // Přepočet plaveckých zón dle CSS (výchozí 148 s = 2:28/100m)
    const sZ1 = css + 12; // > 2:40
    const sZ2Min = css; // 2:28
    const sZ2Max = css + 10; // 2:38
    const sZ3Min = css - 8; // 2:20
    const sZ3Max = css - 1; // 2:27
    const sZ4 = css - 10; // < 2:18

    const zonesBox = document.getElementById("zones-tables-container");
    if (zonesBox) {
      zonesBox.innerHTML = `
        <div style="background:var(--bg-secondary); padding:14px; border-radius:8px; border-left:4px solid var(--col-run);">
          <h4 style="margin-bottom:8px;">🏃 1. Běh – Tepové zóny (dle LTHR ${lthr} bpm) &amp; Orientační tempo</h4>
          <table class="data-table">
            <thead><tr><th>Zóna</th><th>Tepová frekvence</th><th>Orientační tempo / Specifika</th></tr></thead>
            <tbody>
              <tr><td><strong>Z1 Regenerační</strong></td><td class="mono">&lt; ${rZ1Max} bpm</td><td>&gt; 7:05 /km (regenerační klus)</td></tr>
              <tr><td><strong>Z2 Aerobní / IM běh</strong></td><td class="mono">${rZ1Max}–${rZ2Max} bpm</td><td>6:30–7:00 /km (dlouhé běhy &amp; Ironman maraton)</td></tr>
              <tr><td><strong>Z3 Tempová (Maraton &amp; 70.3)</strong></td><td class="mono">${rZ2Max + 1}–${rZ3Max} bpm</td><td>5:55–6:25 /km (cílové tempo Maraton Praha 4:30 = <strong>6:24 /km</strong>)</td></tr>
              <tr><td><strong>Z4 Prahová (Půlmaraton)</strong></td><td class="mono">${rZ3Max + 1}–${lthr} bpm</td><td>5:30–5:50 /km (cílové tempo HM Praha 2:00 = <strong>5:41 /km</strong>)</td></tr>
              <tr><td><strong>Z5 VO2max</strong></td><td class="mono">&gt; ${lthr} bpm</td><td>&lt; 5:25 /km (krátké rovinky a kopce)</td></tr>
            </tbody>
          </table>
        </div>

        <div style="background:var(--bg-secondary); padding:14px; border-radius:8px; border-left:4px solid var(--col-bike);">
          <h4 style="margin-bottom:8px;">🚴 2. Kolo – Výkonové zóny Coggan (dle FTP ${ftp} W = ${wKg} W/kg)</h4>
          <table class="data-table">
            <thead><tr><th>Zóna</th><th>Výkon (Watty)</th><th>Závodní určení</th></tr></thead>
            <tbody>
              <tr><td><strong>Z1 Aktivní regenerace (&lt;55 %)</strong></td><td class="mono">&lt; ${bZ1Max} W</td><td>Vytočení nohou po závodě</td></tr>
              <tr><td><strong>Z2 Vytrvalost / IM zóna (56–75 %)</strong></td><td class="mono">${bZ2Min}–${bZ2Max} W</td><td>🎯 <strong>Cíl IM Cervia (180 km): ${bImMin}–${bImMax} W</strong> | L'Etape roviny v háku: <strong>TF 123–132 bpm</strong></td></tr>
              <tr><td><strong>Z3 Tempo / Sweet Spot (76–90 %)</strong></td><td class="mono">${bZ3Min}–${bZ3Max} W</td><td>🎯 <strong>Cíl 70.3 HK (90 km): ${b703Min}–${b703Max} W</strong> | L'Etape kopce: <strong>TF 133–141 bpm</strong> (alt. <strong>175–190 W</strong>, strop 150 bpm)</td></tr>
              <tr><td><strong>Z4 Laktátový práh (91–105 %)</strong></td><td class="mono">${bZ4Min}–${bZ4Max} W</td><td>Rozvoj FTP na trenažéru</td></tr>
              <tr><td><strong>Z5 VO2max (106–120 %)</strong></td><td class="mono">${bZ5Min}–${bZ5Max} W</td><td>Krátké maximální úseky</td></tr>
            </tbody>
          </table>
        </div>

        <div style="background:var(--bg-secondary); padding:14px; border-radius:8px; border-left:4px solid var(--col-swim);">
          <h4 style="margin-bottom:8px;">🏊 3. Plavání – Zóny dle CSS (${formatSecToMMSS(css)} / 100 m v 25m bazénu)</h4>
          <table class="data-table">
            <thead><tr><th>Zóna</th><th>Tempo / 100 m</th><th>Využití v tréninku</th></tr></thead>
            <tbody>
              <tr><td><strong>Z1 Technika / Vyplavání</strong></td><td class="mono">&gt; ${formatSecToMMSS(sZ1)} /100m</td><td>Rozplavání, technická cvičení, znak</td></tr>
              <tr><td><strong>Z2 Aerobní / IM tempo</strong></td><td class="mono">${formatSecToMMSS(sZ2Min)}–${formatSecToMMSS(sZ2Max)} /100m</td><td>Dlouhé úseky, otevřená voda &amp; Ironman 3,8 km</td></tr>
              <tr><td><strong>Z3 CSS / Prahové úseky</strong></td><td class="mono">${formatSecToMMSS(sZ3Min)}–${formatSecToMMSS(sZ3Max)} /100m</td><td>Stovky a dvoustovky na prahu CSS</td></tr>
              <tr><td><strong>Z4 Rychlostní úseky</strong></td><td class="mono">&lt; ${formatSecToMMSS(sZ4)} /100m</td><td>Krátké 25m a 50m aktivace</td></tr>
            </tbody>
          </table>
        </div>
      `;
    }

    const a = window.PLAN_DATA.athlete;
    const profileBox = document.getElementById("athlete-profile-box");
    if (profileBox) {
      profileBox.innerHTML = `
        <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);">
          <div class="kpi-box"><span class="kpi-label">Věk / Výška / Váha</span><div class="kpi-val mono" style="font-size:1rem;">${a.age} let / ${a.heightCm} cm / ${a.weightKg} kg</div></div>
          <div class="kpi-box"><span class="kpi-label">TF (Klid / LTHR / Max)</span><div class="kpi-val mono" style="font-size:1rem;">${a.restingHr} / ${lthr} / ${a.maxHr} bpm</div></div>
          <div class="kpi-box"><span class="kpi-label">VO2max / HRV / Spánek</span><div class="kpi-val mono" style="font-size:1rem;">${a.vo2max} / ~${a.hrvBaselineMs} ms / 6h 44m</div></div>
        </div>
        <div style="padding:12px 14px; border-radius:8px; background:rgba(239,68,68,0.12); border-left:4px solid var(--col-race-a); font-size:0.85rem; margin-bottom:12px;">
          <strong>⚠️ ${a.healthRule}</strong>
        </div>
        <div style="font-size:0.82rem; color:var(--text-secondary);">
          <strong>Logistická pravidla týdne:</strong>
          <ul style="padding-left:18px; margin-top:4px;">
            ${window.PLAN_DATA.logisticsRules.map((r) => `<li><strong>${r.label}:</strong> ${r.value}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    const baseBox = document.getElementById("baseline-analysis-box");
    if (baseBox) {
      baseBox.innerHTML = window.PLAN_DATA.baselineAnalysis.disciplines
        .map(
          (d) => `
          <div style="padding:10px 14px; border-radius:8px; background:var(--bg-secondary); border:1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px;">
              <strong>${d.title}</strong>
              <span class="mono badge badge-rest">${d.stats}</span>
            </div>
            <ul style="padding-left:18px; font-size:0.81rem; color:var(--text-secondary); margin-top:4px;">
              ${d.highlights.map((h) => `<li>${h}</li>`).join("")}
            </ul>
          </div>
        `
        )
        .join("");
    }
  }

  // ==========================================================================
  // PŘEPÍNÁNÍ ZÁLOŽEK, TÉMATU A JSON ZÁLOHA / IMPORT
  // ==========================================================================
  function activateTab(tabId) {
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === tabId);
    });
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme || "dark");
  }

  function exportJsonBackup() {
    const payload = {
      exportedAt: new Date().toISOString(),
      appVersion: window.PLAN_DATA.meta.version,
      state,
      planData: window.PLAN_DATA
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `IM2027_Zaloha_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("💾 JSON záloha byla stažena");
  }

  function importJsonBackup(file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.state) {
          state = { ...defaultState, ...data.state };
          saveState();
        }
        if (data.planData && Array.isArray(data.planData.weeks)) {
          window.PLAN_DATA = data.planData;
        } else if (Array.isArray(data.weeks)) {
          window.PLAN_DATA.weeks = data.weeks;
        }
        applyTheme();
        populateWeekSelectors();
        renderAll();
        showToast("✅ JSON aktualizace byla úspěšně nahrána");
      } catch (err) {
        showToast("❌ Chyba při čtení JSON souboru: " + err.message);
      }
    };
    reader.readAsText(file, "UTF-8");
  }

  function renderAll() {
    renderHeaderCountdowns();
    renderDashboardWeekCard();
    renderSemafor();
    renderMacroChart();
    renderPhasesAndEventsLists();
    renderPlannerWeek();
    renderRaceCalculator();
    renderZonesAndProfile();
  }

  // ==========================================================================
  // INICIALIZACE APLIKACE PO NAČTENÍ DOM
  // ==========================================================================
  function init() {
    applyTheme();
    populateWeekSelectors();

    // Načtení výchozího Activities.csv (přes přibalený DEFAULT_ACTIVITIES_CSV nebo fetch)
    if (window.DEFAULT_ACTIVITIES_CSV) {
      loadAndParseCsvText(window.DEFAULT_ACTIVITIES_CSV, "Activities.csv (přiložený baseline 280 aktivit)");
    } else {
      fetch("./Activities.csv")
        .then((r) => r.text())
        .then((txt) => loadAndParseCsvText(txt, "Activities.csv"))
        .catch(() => {});
    }

    renderAll();

    // Navigace mezi záložkami
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        activateTab(btn.getAttribute("data-tab"));
      });
    });

    // Téma Dark / Light
    document.getElementById("btn-theme-toggle").addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      saveState();
      applyTheme();
    });

    // Export / Import JSON
    document.getElementById("btn-export-json").addEventListener("click", exportJsonBackup);
    document.getElementById("input-import-json").addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        importJsonBackup(e.target.files[0]);
      }
    });

    // Přepínače týdnů
    document.getElementById("dash-week-select").addEventListener("change", (e) => {
      setSelectedWeek(Number(e.target.value), false);
    });
    document.getElementById("btn-open-week-detail").addEventListener("click", () => {
      activateTab("tab-planner");
    });
    document.getElementById("planner-week-select").addEventListener("change", (e) => {
      setSelectedWeek(Number(e.target.value), false);
    });
    document.getElementById("btn-prev-week").addEventListener("click", () => {
      setSelectedWeek(Math.max(1, state.selectedWeek - 1), false);
    });
    document.getElementById("btn-next-week").addEventListener("click", () => {
      setSelectedWeek(Math.min(48, state.selectedWeek + 1), false);
    });

    // Intervals.icu API nahrávání, týdenní export a návod
    const apiPushWeekBtn = document.getElementById("btn-api-push-week");
    if (apiPushWeekBtn) {
      apiPushWeekBtn.addEventListener("click", quickPushSelectedWeekFromToolbar);
    }
    document.getElementById("btn-export-week-icu").addEventListener("click", () => openWeekIntervalsModal(false));
    document.getElementById("btn-open-icu-guide").addEventListener("click", () => openWeekIntervalsModal(true));
    document.getElementById("btn-close-modal").addEventListener("click", () => {
      document.getElementById("modal-icu").classList.remove("open");
    });
    document.getElementById("modal-icu").addEventListener("click", (e) => {
      if (e.target.id === "modal-icu") {
        document.getElementById("modal-icu").classList.remove("open");
      }
    });

    // Semafor regenerace a zad
    ["sem-hrv", "sem-sleep", "sem-back"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => {
          state.semafor.hrv = Number(document.getElementById("sem-hrv").value) || 40;
          state.semafor.sleep = Number(document.getElementById("sem-sleep").value) || 6.75;
          state.semafor.back = Number(document.getElementById("sem-back").value) || 1;
          saveState();
          renderSemafor();
        });
      }
    });

    // Drag & Drop CSV nahrávání
    const dropzone = document.getElementById("csv-dropzone");
    const csvInput = document.getElementById("input-csv-file");
    if (dropzone && csvInput) {
      dropzone.addEventListener("click", () => csvInput.click());
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
      });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          const file = e.dataTransfer.files[0];
          const reader = new FileReader();
          reader.onload = (ev) => {
            loadAndParseCsvText(ev.target.result, file.name);
            showToast(`✅ Soubor ${file.name} byl úspěšně rozparsován`);
          };
          reader.readAsText(file, "UTF-8");
        }
      });
      csvInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (ev) => {
            loadAndParseCsvText(ev.target.result, file.name);
            showToast(`✅ Soubor ${file.name} byl úspěšně rozparsován`);
          };
          reader.readAsText(file, "UTF-8");
        }
      });
    }

    const chkWalk = document.getElementById("chk-include-walk");
    if (chkWalk) {
      chkWalk.checked = Boolean(state.includeWalkInTotals);
      chkWalk.addEventListener("change", () => {
        state.includeWalkInTotals = chkWalk.checked;
        saveState();
        renderGarminTab();
        renderDashboardWeekCard();
        renderMacroChart();
      });
    }

    document.getElementById("btn-reload-default-csv").addEventListener("click", () => {
      if (window.DEFAULT_ACTIVITIES_CSV) {
        loadAndParseCsvText(window.DEFAULT_ACTIVITIES_CSV, "Activities.csv (výchozí)");
        showToast("🔄 Obnoveno 280 aktivit z Activities.csv");
      }
    });

    document.getElementById("csv-filter-discipline").addEventListener("change", () => {
      renderGarminTab();
    });

    document.getElementById("btn-generate-ai-prompt").addEventListener("click", generateAiCoachPrompt);

    // Kalkulačka závodní strategie – přepínač závodů
    document.querySelectorAll("#race-calc-selector button").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedRaceCalc = btn.getAttribute("data-race");
        saveState();
        renderRaceCalculator();
      });
    });

    // Kalkulačka tréninkových zón – vstupy LTHR, FTP, CSS
    ["input-lthr", "input-ftp", "input-css"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => {
          state.thresholds.lthr = Number(document.getElementById("input-lthr").value) || 154;
          state.thresholds.ftp = Number(document.getElementById("input-ftp").value) || 217;
          state.thresholds.cssSecPer100m = Number(document.getElementById("input-css").value) || 148;
          saveState();
          renderZonesAndProfile();
          renderRaceCalculator();
        });
      }
    });

    document.getElementById("btn-reset-thresholds").addEventListener("click", () => {
      state.thresholds = {
        lthr: window.PLAN_DATA.athlete.lthr,
        ftp: window.PLAN_DATA.athlete.ftp,
        cssSecPer100m: window.PLAN_DATA.athlete.cssSecPer100m,
        weightKg: window.PLAN_DATA.athlete.weightKg
      };
      saveState();
      renderZonesAndProfile();
      renderRaceCalculator();
      showToast("⚙️ Fyziologické prahy obnoveny na výchozí hodnoty");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
