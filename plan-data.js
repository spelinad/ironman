/**
 * PLAN_DATA – Kompletní datový modul pro aplikaci "Cesta k Ironman Emilia-Romagna 2027"
 * Období: 16. 11. 2026 (T01) – 17. 10. 2027 (T48) | Hlavní vrchol: 18. 9. 2027 (T44)
 * Architektura: Čistá datová vrstva oddělená od UI, připravená pro klouzavé aktualizace po 2–4 týdnech.
 */

window.PLAN_DATA = {
  meta: {
    version: "2027.1.0",
    title: "Cesta k Ironman Emilia-Romagna 2027",
    startDate: "2026-11-16",
    endDate: "2027-10-17",
    mainRaceDate: "2027-09-18",
    mainRaceName: "IRONMAN Italy Emilia-Romagna (Cervia)",
    totalWeeks: 48,
    detailedWeeksRange: [1, 12]
  },

  athlete: {
    name: "Dušan",
    category: "Masters 50+ (M55-59 v sezóně 2027)",
    age: 54,
    heightCm: 176,
    weightKg: 84,
    restingHr: 49,
    maxHr: 178,
    lthr: 154,
    ftp: 217,
    cssSecPer100m: 148, // 2:28 / 100m (aktuální test 1000m = 25:00 -> 2:30/100m, cílové CSS ~2:28/100m)
    swimTest1000mSec: 1500, // 25:00
    poolLengthM: 25,
    vo2max: 45,
    hrvBaselineMs: 40,
    avgSleepHours: 6.73, // 6 h 44 min
    equipment: "Silniční kolo + TT speciál (wattmetr na TT kole + chytrý trenažér na zimu)",
    healthRule: "KRITICKÉ PRAVIDLO – Bedra: Občasná bolest v bedrech při dlouhém tréninku. Postupná adaptace na aero pozici na TT speciálu (začít 3–5 min úseky v aero na trenažéru a prodlužovat), povinná mobilizace kyčelních flexorů (psoas) ihned po kole a šetření beder před dlouhými běhy."
  },

  baselineAnalysis: {
    period: "Říjen 2025 – Říjen 2026 (280 záznamů v Garmin Connect)",
    summary: "Silný vytrvalostní základ v běhu, chůzi a silové přípravě. Největší časová rezerva pro Ironman leží v plavecké ekonomice (pouze 4,96 km za rok) a strukturovaném zimním tréninku na chytrém trenažéru s adaptací na TT speciál.",
    disciplines: [
      {
        id: "run",
        title: "Běh (Silná stránka)",
        stats: "95 aktivit | 98,8 hod | 838,5 km",
        highlights: [
          "2 dokončené maratony v tempu ~7:11/km: Praha (3. 5. 2026) za 5:05:35 s prům. TF 132 bpm; trail Lednice (10. 10. 2026) za 5:07:32 s prům. TF 146 bpm.",
          "Půlmaraton za 2:05 hod, pravidelné dlouhé běhy 15–25 km v tempu 6:40–6:46/km na velmi úsporné TF 129–130 bpm.",
          "Páka posunu: Udržet aerobní ekonomiku a zapracovat na tempové odolnosti (Z3 = 5:55–6:24/km) pro jarní Maraton Praha za 4:30."
        ]
      },
      {
        id: "tri",
        title: "Triatlonová zkušenost",
        stats: "Hradec Králové Multisport (70.3) | 16. 8. 2026 | 7:42:09",
        highlights: [
          "Úspěšně dokončený střední triatlon (113,6 km celkem) potvrzuje schopnost zvládnout kombinovanou zátěž.",
          "Páka posunu: Zrychlit plavání, zvýšit průměrnou rychlost na TT kole díky aero pozici a nepřepálit první polovinu kola, což umožní běžet půlmaraton v HK 2027 pod 2:17 (celkem 6:30)."
        ]
      },
      {
        id: "bike",
        title: "Cyklistika (Velký potenciál)",
        stats: "11 venkovních jízd | 32,2 hod | 458 km",
        highlights: [
          "Dosud převážně letní cykloturistika bez zimní trenažérové struktury (nejdelší jízdy 54–82 km v září 2026).",
          "Páka posunu: Pravidelný chytrý trenažér (2× týdně v zimě podle wattů FTP 217 W) + postupná adaptace beder na TT aero pozici posunou cyklistický split na 180 km o desítky minut."
        ]
      },
      {
        id: "swim",
        title: "Plavání (Hlavní priorita č. 1)",
        stats: "11 plaveckých záznamů | 3,14 hod | 4,96 km za rok",
        highlights: [
          "4× bazén (nejdelší souvisle 1075 m) a 7× krátké otevřené vody. Aktuální test 1000 m za 25:00 (2:30/100 m).",
          "Páka posunu: Stabilní frekvence 2× týdně (Út + Pá) po celý rok. Cíl není lámat rychlostní rekordy, ale vyplavat z 3,8 km moře v Cervii za ~1:35 hod naprosto uvolněný a s nízkým tepem."
        ]
      },
      {
        id: "strength",
        title: "Síla, Core & Obecná odolnost",
        stats: "49 jednotek síla/HIIT (36,9 hod) + 68 chůzí/treků (126,9 hod) + 20× jóga",
        highlights: [
          "Vynikající disciplína v silovém tréninku a mimořádná odolnost pohybového aparátu z vícedenních treků (Portugalsko, Šumava, Krkonoše).",
          "Páka posunu: Čtvrteční fixní slot přesměrovat na hluboký stabilizační systém (core), gluteální aktivaci a excentrickou sílu lýtek/hamstringů pro ochranu beder na TT kole."
        ]
      }
    ]
  },

  logisticsRules: [
    { label: "Zima / Jaro objem", value: "Běžný týden 5,0–6,5 hod | Špičkový týden max 8,0 hod" },
    { label: "Léto / IM Build objem", value: "Běžný týden 6,5–8,0 hod | Špičkový týden max 10,0 hod" },
    { label: "Periodizace (54 let)", value: "Rytmus 3:1 (v těžkém IM bloku 2:1) – každý 4. týden pokles objemu o 30–35 % pro ochranu beder a šlach" },
    { label: "Všední dny (Po–Pá)", value: "Večerní trénink max 1:30 hod (běžně 45–75 min); Pondělí volno nebo mobilita po víkendu" },
    { label: "Čtvrtek (FIXNÍ SLOT)", value: "Kruhový trénink: Core, kompenzace beder a HIIT (50–60 min); před A/B závody bez HIIT složky" },
    { label: "Plavání (2× týdně)", value: "Úterý + Pátek (případně Neděle) v 25m bazénu; v létě o víkendu otevřená voda" },
    { label: "Víkendy (So + Ne)", value: "Ranní trénink max 4:00 hod/den (výjimka pouze 2–3 klíčové jízdy 4,5–5,0 hod v srpnu před IM)" }
  ],

  phases: [
    {
      id: 1,
      code: "FÁZE 1",
      name: "Zimní aerobní báze, technika kraulu & TT aero adaptace",
      weeks: "T01–T12",
      dateRange: "16. 11. 2026 – 7. 2. 2027",
      targetHours: "5,0–6,5 h/týd",
      color: "#06b6d4",
      focus: "Zafixovat 2 plavecké jednotky týdně (dýchání, poloha těla, záběr), vybudovat wattovou efektivitu v Z2/Sweet Spot na trenažéru a postupně adaptovat bedra na TT aero pozici (od 3 min k 12 min úsekům). Zahrnuje udržovací blok v Thajsku (T10–T12)."
    },
    {
      id: 2,
      code: "FÁZE 2",
      name: "Jarní maratonský build (Cíl: Maraton Praha 4:30)",
      weeks: "T13–T24",
      dateRange: "8. 2. 2027 – 2. 5. 2027",
      targetHours: "6,0–8,0 h/týd",
      color: "#10b981",
      focus: "Postupné prodloužení nedělního dlouhého běhu z 16 km na 30–32 km, zapracování maratonského tempa (6:24/km) při zachování 2× plavání a 2× kola týdně. Test v půlmaratonu Praha (T20, cíl 2:00), kontrolovaný trail Karlštejn 18 km (T21) a vrchol jara Vodafone Maraton Praha (T24)."
    },
    {
      id: 3,
      code: "FÁZE 3",
      name: "Pomaratonová regenerace, silniční vrchařská příprava & TT kompenzace",
      weeks: "T25–T28",
      dateRange: "3. 5. 2027 – 30. 5. 2027",
      targetHours: "4,0–6,75 h/týd",
      color: "#8b5cf6",
      focus: "První 2 týdny po maratonu minimální běžecký dopad (ochrana šlach a beder). O víkendech přechod na silniční kolo ve zvlněném/kopcovitém terénu jako příprava na L'Etape Czech Republic, zatímco kratší středeční jízdy zůstávají na TT speciálu/trenažéru pro udržení aero adaptace."
    },
    {
      id: 4,
      code: "FÁZE 4",
      name: "L'Etape vrchol (100 km), přechod plně na TT speciál & IM 70.3 Hradec Králové",
      weeks: "T29–T39",
      dateRange: "31. 5. 2027 – 15. 8. 2027",
      targetHours: "6,5–9,5 h/týd",
      color: "#f59e0b",
      focus: "V T29–T30 vrcholí kopcovitá progrese na silničním kole (85–95 km / ~1 000 m převýšení) zakončená závodem L'Etape Czech Republic (T31, 100 km / 1 200 m). Od druhé poloviny T32 přepnutí víkendových jízd plně na TT speciál v aero pozici (rovinatější/zvlněný profil + brick běhy) směrem k IM 70.3 Hradec Králové (T39) a IM Emilia-Romagna."
    },
    {
      id: 5,
      code: "FÁZE 5",
      name: "Ironman Peak, Taper & IRONMAN Emilia-Romagna",
      weeks: "T40–T44",
      dateRange: "16. 8. 2027 – 19. 9. 2027",
      targetHours: "4,5–10,0 h/týd",
      color: "#ef4444",
      focus: "Regenerace po Hradci (T40), následně 2 vrcholné Ironman týdny (T41–T42, až 10,0 hod/týd vč. Jizerské 23 km striktně v Z2 a nejdelší 5hodinové jízdy ~145 km v aero s brickem). Poté 2týdenní progresivní Taper (T43–T44) a životní závod v Cervii (18. 9. 2027)."
    },
    {
      id: 6,
      code: "FÁZE 6",
      name: "Aktivní regenerace po Ironmanu & Rozlučka v Lednici",
      weeks: "T45–T48",
      dateRange: "20. 9. 2027 – 17. 10. 2027",
      targetHours: "2,5–5,5 h/týd",
      color: "#64748b",
      focus: "Hluboká fyzická i mentální regenerace po Ironmanu (plavání, procházky, lehké vytočení nohou, spánek). V T47 podmíněná společenská účast na Běhej lesy Lednice (pouze při plné obnově HRV, klidové TF a nulové bolesti pohybového aparátu)."
    }
  ],

  events: [
    {
      id: "evt-thajsko",
      week: 10,
      endWeek: 12,
      date: "2027-01-20",
      endDate: "2027-02-02",
      name: "Dovolená Thajsko (Udržovací teplo & moře)",
      priority: "DOVOLENÁ",
      type: "camp",
      surface: "Moře / Bazén / Pláž",
      distance: "Udržovací režim 14 dní",
      targetTime: "Bez stresu",
      targetPaceOrPower: "Plavání v moři/bazénu + ranní klusy Z1/Z2 do 40 min + mobilita beder",
      strategy: "Využít teplo k prohřátí zad, plavat bez stresu v otevřené vodě/bazénu a běhat brzy ráno před horkem s důrazem na hydrataci."
    },
    {
      id: "evt-hm-praha",
      week: 20,
      date: "2027-04-03",
      name: "Generali Půlmaraton Praha",
      priority: "C",
      type: "race-run",
      surface: "Silnice (rovina)",
      distance: "21,1 km",
      targetTime: "2:00:00",
      targetPaceOrPower: "5:41 /km (TF 146–152 bpm, Z4)",
      strategy: "Kvalitní tempový test z plného tréninku (pouze 2 dny odlehčení předem). Prvních 5 km kontrolovaně po 5:45/km, od 10. km držet 5:38–5:40/km."
    },
    {
      id: "evt-karlstejn",
      week: 21,
      date: "2027-04-10",
      name: "Běhej lesy Karlštejn (STRIKTNĚ 18 km)",
      priority: "C",
      type: "race-trail",
      surface: "Trail / Kopce",
      distance: "18,0 km",
      targetTime: "2:05:00",
      targetPaceOrPower: "Čistá Z2 (TF 128–138 bpm, ~6:50–7:00/km)",
      strategy: "KRITICKÉ: Běžet striktně trasu 18 km (nikoliv 30 km!) kvůli šetření beder a nohou 3 týdny před Maratonem Praha. Do prudkých výběhů mezichůze, seběhy měkce přes střed chodidla."
    },
    {
      id: "evt-maraton-praha",
      week: 24,
      date: "2027-05-02",
      name: "Vodafone Maraton Praha",
      priority: "B",
      type: "race-run",
      surface: "Silnice (převýšení 147 m)",
      distance: "42,2 km",
      targetTime: "4:30:00",
      targetPaceOrPower: "6:24 /km (TF 138–144 bpm, Z3)",
      strategy: "Hlavní jarní běžecký vrchol. Krátký 8denní taper. Od startu železná disciplína na 6:24/km (půlmaraton za 2:15:00), gel každých 30 min (60 g sacharidů/h). Cíl: posunout osobák o 35 min a zregenerovat do 10 dnů."
    },
    {
      id: "evt-letape",
      week: 31,
      date: "2027-06-19",
      name: "L'Etape Czech Republic (100 km / 1 200 m)",
      priority: "B",
      type: "race-bike",
      surface: "Silnice (kopcovitý profil, převýšení 1 200 m)",
      distance: "100,0 km",
      targetTime: "4:15–4:40 hod",
      targetPaceOrPower: "Ø 21,5–23,5 km/h | Roviny ve skupině Z2: 123–132 bpm, stoupání Z3: 133–141 bpm (strop 150 bpm; alt. s wattmetrem kopce 175–190 W)",
      strategy: "Povinně SILNIČNÍ KOLO (pravidla L'Etape zakazují TT speciál). Primární řízení podle tepu (wattmetr je standardně na TT kole; při přehození kopce 175–190 W). V kopcích držet kadenci 75–85 rpm, pravidelně chodit ze sedla kvůli ochraně beder a testovat závodní výživu 70–80 g sacharidů/hod."
    },
    {
      id: "evt-klinovec",
      week: 34,
      date: "2027-07-10",
      name: "Běhej lesy Klínovec 23 km",
      priority: "C",
      type: "race-trail",
      surface: "Horský trail",
      distance: "23,0 km",
      targetTime: "2:45:00",
      targetPaceOrPower: "Souvislý aerobní běh v Z2 (TF < 138 bpm)",
      strategy: "Kvalitní vytrvalostní trénink v rámci triatlonového buildu. Zákaz závodění z kopců (ochrana kvadricepsů a beder pro nedělní kompenzační plavání)."
    },
    {
      id: "evt-morava",
      week: 35,
      endWeek: 36,
      date: "2027-07-17",
      endDate: "2027-07-24",
      name: "Dovolená Morava (Cyklo & Open Water blok)",
      priority: "DOVOLENÁ",
      type: "camp",
      surface: "Silnice / Otevřená voda",
      distance: "Aktivní 8denní blok",
      targetTime: "Objem v Z2",
      targetPaceOrPower: "Vytrvalostní TT/silniční jízdy 2,5–3,5 hod v Z2 + plavání ve volné vodě",
      strategy: "Využít známé rovinaté a zvlněné trasy na jižní Moravě (Bulhary/Lednice/Pálava) pro souvislé držení TT aero pozice a nácvik výživy na kole."
    },
    {
      id: "evt-703-hk",
      week: 39,
      date: "2027-08-15",
      name: "IRONMAN 70.3 Hradec Králové (Hlavní generálka)",
      priority: "B",
      type: "race-tri",
      surface: "1,9 km Labe + 90 km TT kolo + 21,1 km běh",
      distance: "113,0 km (70.3)",
      targetTime: "6:30:00",
      targetPaceOrPower: "Plavání 0:46 + Depa 0:12 + Kolo 3:15 (165–175 W) + Běh 2:17 (6:30/km)",
      strategy: "Kompletní generálka na Itálii (posun z loňských 7:42 o více než hodinu!). Otestovat závodní kombinézu, neopren, aero pozici a příjem 75–85 g sacharidů/hod na kole."
    },
    {
      id: "evt-jizerska",
      week: 41,
      date: "2027-08-28",
      name: "Běhej lesy Jizerská 23 km",
      priority: "C",
      type: "race-trail",
      surface: "Lesní cesty / šotolina",
      distance: "23,0 km",
      targetTime: "2:40:00",
      targetPaceOrPower: "STRIKTNÍ STROP Z2 (max 138 bpm, ~6:50/km)",
      strategy: "Poslední dlouhý běh přesně 3 týdny před Ironmanem! Do prudkých kopců okamžitě přejít do svižné chůze, nulové riziko podvrtnutí kotníku v sebězích."
    },
    {
      id: "evt-im-cervia",
      week: 44,
      date: "2027-09-18",
      name: "IRONMAN Emilia-Romagna, Cervia (HLAVNÍ VRCHOL)",
      priority: "A",
      type: "race-tri",
      surface: "3,8 km moře + 180 km rovinaté kolo + 42,2 km běh",
      distance: "226,0 km (140.6)",
      targetTime: "14:00:00",
      targetPaceOrPower: "Plavání 1:35 + Depa 0:20 + Kolo 6:30 (142–155 W) + Maraton 5:35 (run/walk 9:1)",
      strategy: "Hlavní cíl sezóny! Plavat uvolněně s dlouhým záběrem, na kole striktně držet strop 160 W v prvních 90 km, pít a jíst od 15. minuty (80 g sacharidů/h) a maraton od první občerstvovačky jít metodou 9 min běh v Z2 / 1 min chůze."
    },
    {
      id: "evt-lednice",
      week: 47,
      date: "2027-10-09",
      name: "Běhej lesy Lednice 42 km (Bonus na závěr)",
      priority: "C",
      type: "race-trail",
      surface: "Rovinatý zámecký park / trail",
      distance: "42,2 km (nebo kratší trasa)",
      targetTime: "5:15:00 (pohodově)",
      targetPaceOrPower: "Společenský indiánský běh v Z1/Z2 bez sledování tempa",
      strategy: "PODMÍNĚNÝ START: Pouze pokud je 3 týdny po Ironmanu noční HRV na baseline (~40 ms), klidová TF ~49 bpm a bedra/achilovky 100% bez bolesti. Jinak přeregistrace na kratší trasu!"
    }
  ],

  raceCalculators: {
    "hm-praha": {
      id: "hm-praha",
      name: "Generali Půlmaraton Praha (3. 4. 2027)",
      priority: "C",
      type: "run",
      distanceKm: 21.0975,
      defaultPaceSec: 341, // 5:41/km -> 1:59:54
      minPaceSec: 315,
      maxPaceSec: 390,
      defaultCarbsPerHour: 50,
      defaultFluidMlPerHour: 550,
      defaultSodiumMgPerHour: 450,
      notes: "Rovinatá trať. Rozběhnout prvních 3 km na 5:45/km (TF do 146 bpm), poté ustálit tempo na 5:40/km. Gel na 7. a 14. km."
    },
    "maraton-praha": {
      id: "maraton-praha",
      name: "Vodafone Maraton Praha (2. 5. 2027)",
      priority: "B",
      type: "run",
      distanceKm: 42.195,
      defaultPaceSec: 384, // 6:24/km -> 4:30:04
      minPaceSec: 350,
      maxPaceSec: 440,
      defaultCarbsPerHour: 65,
      defaultFluidMlPerHour: 650,
      defaultSodiumMgPerHour: 600,
      notes: "Cíl 4:30:00 vyžaduje vyrovnaný split (1. půlmaraton za 2:15:00 v Z2/spodní Z3 na TF ~138–141 bpm). Každých 25–30 min 1 gel (nebo ionťák) + sůl od 2. hodiny."
    },
    "letape-cz": {
      id: "letape-cz",
      name: "L'Etape Czech Republic (19. 6. 2027 – 100 km / 1 200 m)",
      priority: "B",
      type: "bike",
      distanceKm: 100.0,
      elevationM: 1200,
      defaultSpeedKmh: 22.5, // ~4:26:40 (cílové okno 4:15–4:40 hod = 21,5–23,5 km/h)
      minSpeedKmh: 19.0,
      maxSpeedKmh: 27.0,
      defaultFlatHrBpm: 128, // Z2 roviny ve skupině: 123–132 bpm
      defaultClimbHrBpm: 137, // Z3 stoupání plynule: 133–141 bpm (strop 150 bpm)
      defaultClimbWatts: 182, // 175–190 W při přehození wattmetru
      defaultCadenceRpm: 80, // 75–85 rpm v kopcích
      defaultCarbsPerHour: 75, // 70–80 g sacharidů/hod
      defaultFluidMlPerHour: 700,
      defaultSodiumMgPerHour: 650,
      notes: "Povinně SILNIČNÍ KOLO (pravidla L'Etape zakazují TT speciál). Primární řízení podle tepu: roviny ve skupině Z2 (123–132 bpm), stoupání plynule Z3 (133–141 bpm, strop v prudkých pasážích 150 bpm; alternativně při přehození wattmetru kopce 175–190 W). Důraz na kadenci 75–85 rpm v kopcích a pravidelnou jízdu ze sedla kvůli ochraně beder."
    },
    "703-hk": {
      id: "703-hk",
      name: "IRONMAN 70.3 Hradec Králové (15. 8. 2027)",
      priority: "B",
      type: "tri703",
      swimDistM: 1900,
      bikeDistKm: 90,
      runDistKm: 21.1,
      defaultSwimPaceSec100m: 145, // 2:25/100m -> 45:55
      defaultTransitionsMin: 12,
      defaultBikeWatts: 170, // ~78% FTP -> ~27.7 km/h -> 3:15
      defaultRunPaceSec: 390, // 6:30/km -> 2:17:09
      defaultCarbsBikeG: 80,
      defaultCarbsRunG: 55,
      defaultFluidMlPerHour: 750,
      defaultSodiumMgPerHour: 750,
      notes: "Generálka na IM Cervia. Na kole držet 165–175 W (76–80 % FTP), ve výjezdech nepřekračovat 215 W. Posledních 5 km kola zvýšit kadenci na 92 rpm a protáhnout bedra."
    },
    "im-cervia": {
      id: "im-cervia",
      name: "IRONMAN Emilia-Romagna, Cervia (18. 9. 2027)",
      priority: "A",
      type: "tri1406",
      swimDistM: 3800,
      bikeDistKm: 180,
      runDistKm: 42.195,
      defaultSwimPaceSec100m: 150, // 2:30/100m -> 1:35:00
      defaultTransitionsMin: 20,
      defaultBikeWatts: 148, // ~68% FTP -> ~27.7 km/h na rovině v aero -> 6:30:00
      defaultRunPaceSec: 476, // 7:56/km vč. chůze (9 min běh @ 7:15 + 1 min chůze) -> 5:34:47
      defaultCarbsBikeG: 85,
      defaultCarbsRunG: 60,
      defaultFluidMlPerHour: 800,
      defaultSodiumMgPerHour: 850,
      notes: "HLAVNÍ VRCHOL: Rovinatá trať v Cervii (pouze 1x výjezd na Bertinoro v každém ze 2 okruhů). Na kole železný strop 155 W, pravidelně každých 20 min se na 30 s narovnat ze sedla a ulevit bedrům. Maraton běžet strategií 9 min Z2 klus / 1 min chůze na občerstvovačce."
    }
  }
};

// ============================================================================
// KOMPLETNÍ 48TÝDENNÍ MAKROCYKLUS (T01–T48)
// T01–T12: Plně detailní denní rozpis zimního bloku (vč. Thajska)
// T13–T48: Strukturovaný denní rozpis jarního maratonského a letního IM bloku
// ============================================================================

window.PLAN_DATA.weeks = [
  // --------------------------------------------------------------------------
  // T01 (16. 11. – 22. 11. 2026) | Fáze 1 – Úvodní týden zimní báze
  // --------------------------------------------------------------------------
  {
    week: 1,
    code: "T01",
    startDate: "2026-11-16",
    endDate: "2026-11-22",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Build",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: false,
    hours: { total: 5.25, swim: 1.5, bike: 1.75, run: 1.0, strength: 1.0 },
    focus: "Start makrocyklu: nastavení 2 plaveckých jednotek týdně (dýchání do vody, splývání), první osahání TT aero pozice na trenažéru (úseky 3 min) a uvolněný nedělní běh v Z2.",
    days: [
      {
        id: "T01-D1",
        dayName: "Pondělí",
        date: "2026-11-16",
        discipline: "rest",
        title: "Volno & Dechová mobilizace beder",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Volný den na startu plánu. Večer 15 min mobilita kyčelních flexorů (výpady v kleku s podsazenou pánví), kočičí hřbety a brániční dýchání vleže.",
        purpose: "Příprava bederní páteře a psoasu na první týden kombinující TT trenažér, plavání a běh.",
        intervalsIcu: ""
      },
      {
        id: "T01-D2",
        dayName: "Úterý",
        date: "2026-11-17",
        discipline: "swim",
        title: "Bazén 25m: Klidný výdech do vody & poloha těla (1100 m)",
        durationMin: 45,
        intensityZone: "Z1–Z2",
        prescription: "Rozplavání 200 m libovolně (střídat kraul/prsa) -> Technika 4×50 m (25 m kopání na boku s předpaženou rukou + 25 m kraul s důrazem na plynulý výdech nosem pod vodou, pauza 20 s) -> Hlavní série 6×100 m kraul v Z2 (tempo ~2:32–2:36/100m, pauza 25 s) -> Vyplavání 100 m znak/prsa.",
        purpose: "Odstranění zadržování dechu pod vodou – hlavní příčiny zadýchání a padání nohou u triatlonistů.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 6x\n- 100mtr Z2 Pace\n- 25s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T01-D3",
        dayName: "Středa",
        date: "2026-11-18",
        discipline: "bike",
        title: "Trenažér: Aero adaptace 5×3 min + kadence",
        durationMin: 45,
        intensityZone: "Z1–Z2 (125–155 W)",
        prescription: "10 min rozjetí 110–130 W (50–60 % FTP) -> 5× (3 min v TT aero pozici na 148 W / 68 % FTP při kadenci 88–90 rpm + 2 min v horním úchopu 125 W / 58 % FTP, uvolnit ramena a záda) -> 10 min vyjetí 115 W. Po slezení 5 min protažení kyčelních flexorů.",
        purpose: "Bezpečné zahájení adaptace beder a krční páteře na TT speciál krátkými 3minutovými intervaly v cílových Ironman wattech.",
        intervalsIcu: "Warmup\n- 10m 50-60% 85rpm\n\nMain Set 5x\n- 3m 68% 88-90rpm\n- 2m 58% 85rpm\n\nCooldown\n- 10m 53% 85rpm"
      },
      {
        id: "T01-D4",
        dayName: "Čtvrtek",
        date: "2026-11-19",
        discipline: "strength",
        title: "Fixní slot: Kruhový trénink – Core, kompenzace beder & HIIT",
        durationMin: 60,
        intensityZone: "Core + Z3/Z4",
        prescription: "10 min dynamická rozcvička kyčlí a hrudní páteře -> 35 min kruhový trénink (3 série: Dead Bug, Bird-Dog, boční plank, bulharské dřepy s vlastní vahou, glute bridge na jedné noze, veslování na TRX, farmářská chůze) -> 15 min závěrečné protažení hamstringů a hýždí.",
        purpose: "Posílení hlubokého stabilizačního systému (střed těla) a hýžďových svalů, které přebírají zátěž z bederní páteře při běhu i v aero pozici.",
        intervalsIcu: ""
      },
      {
        id: "T01-D5",
        dayName: "Pátek",
        date: "2026-11-20",
        discipline: "swim",
        title: "Bazén 25m: Dlouhý záběr Catch-Up & piškot (1200 m)",
        durationMin: 45,
        intensityZone: "Z1–Z2",
        prescription: "Rozplavání 200 m Z1 -> Drilly 4×50 m (25 m doháněčka 'Catch-Up' + 25 m celý kraul, pauza 20 s) -> Hlavní série s piškotem (pullbuoy mezi stehny): 4×150 m v Z2 (tempo ~2:30/100m, pauza 25 s, soustředit se na vysoký loket a rotaci trupu) -> 4×50 m kraul bez piškotu svižněji v Z2/Z3 (pauza 20 s).",
        purpose: "Plavání s piškotem nadlehčí pánev, uleví bedrům a umožní plně se soustředit na dýchání do stran a dlouhý záběr pod tělem.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 4x\n- 150mtr Z2 Pace\n- 25s Rest\n\nMain Set 4x\n- 50mtr Z3 Pace\n- 20s Rest"
      },
      {
        id: "T01-D6",
        dayName: "Sobota",
        date: "2026-11-21",
        discipline: "bike",
        title: "Trenažér: Základní aerobní vytrvalost Z2",
        durationMin: 60,
        intensityZone: "Z2 (135–155 W)",
        prescription: "10 min rozjetí 115–130 W -> 40 min plynulá jízda v Z2 (140–155 W / 65–71 % FTP, kadence 86–90 rpm; každých 10 min zařadit 3 min v aero pozici a 30 s jízdu ze sedla pro prokrvení) -> 10 min vyjetí 115 W.",
        purpose: "Budování aerobní kapacity a tukového metabolismu v přesně řízeném wattovém pásmu bez zbytečných výkyvů.",
        intervalsIcu: "Warmup\n- 10m 53-60% 85rpm\n\nMain Set\n- 40m 65-71% 88rpm\n\nCooldown\n- 10m 53% 85rpm"
      },
      {
        id: "T01-D7",
        dayName: "Neděle",
        date: "2026-11-22",
        discipline: "run",
        title: "Nedělní vytrvalostní běh v Z2 (~9 km)",
        durationMin: 60,
        intensityZone: "Z2 (126–136 bpm)",
        prescription: "Souvislý měkký běh 60 min v čisté Z2 (TF 126–136 bpm, orientační tempo 6:40–6:50/km). Na závěr 4×20 s lehké rovinky s důrazem na kadenci >164 spm (meziklus 40 s).",
        purpose: "Udržení běžecké ekonomiky z podzimu při naprostém šetření pohybového aparátu a beder.",
        intervalsIcu: "Warmup\n- 10m 75-82% LTHR\n\nMain Set\n- 46m 82-88% LTHR\n\nMain Set 4x\n- 20s 95% LTHR\n- 40s 78% LTHR"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // T02 (23. 11. – 29. 11. 2026) | Fáze 1 – Rozvoj kadence a plavecké plynulosti
  // --------------------------------------------------------------------------
  {
    week: 2,
    code: "T02",
    startDate: "2026-11-23",
    endDate: "2026-11-29",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Build",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: false,
    hours: { total: 5.75, swim: 1.5, bike: 2.0, run: 1.25, strength: 1.0 },
    focus: "Prodloužení aero úseků na trenažéru na 4 minuty, zařazení prvních Sweet Spot intervalů (Z3) na kole a prodloužení nedělního běhu na 75 min.",
    days: [
      {
        id: "T02-D1",
        dayName: "Pondělí",
        date: "2026-11-23",
        discipline: "rest",
        title: "Volno & Pěnový válec (Foam Rolling)",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Volný den. Večer 15 min uvolnění stehen, IT bandu a hýždí na pěnovém válci + protažení psoasu.",
        purpose: "Regenerace po víkendovém dvojbloku kolo + běh.",
        intervalsIcu: ""
      },
      {
        id: "T02-D2",
        dayName: "Úterý",
        date: "2026-11-24",
        discipline: "swim",
        title: "Bazén 25m: Rytmus dýchání na 3 záběry (1250 m)",
        durationMin: 45,
        intensityZone: "Z1–Z2",
        prescription: "Rozplavání 200 m Z1 -> Technika 6×50 m (střídat 25 m kraul dýchání na 3 záběry + 25 m dýchání na 2 záběry, pauza 20 s) -> Hlavní série 5×150 m v Z2 (tempo ~2:30/100m, pauza 25 s).",
        purpose: "Symetrická rotace trupu při oboustranném dýchání šetří krční i hrudní páteř a zlepšuje přímý směr plavání pro otevřenou vodu.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 6x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 5x\n- 150mtr Z2 Pace\n- 25s Rest"
      },
      {
        id: "T02-D3",
        dayName: "Středa",
        date: "2026-11-25",
        discipline: "bike",
        title: "Trenažér: Aero adaptace 5×4 min + kadence 90 rpm",
        durationMin: 50,
        intensityZone: "Z2 (140–160 W)",
        prescription: "10 min rozjetí 115–130 W -> 5× (4 min v TT aero pozici na 152 W / 70 % FTP, kadence 90 rpm + 2 min v horním úchopu na 125 W / 58 % FTP) -> 10 min vyjetí 115 W. Ihned po slezení 5 min mobilita kyčlí.",
        purpose: "Navýšení celkového času v aero pozici z 15 na 20 minut při vyšší kadenci, která snižuje tah na bederní úpony.",
        intervalsIcu: "Warmup\n- 10m 53-60% 85rpm\n\nMain Set 5x\n- 4m 70% 90rpm\n- 2m 58% 85rpm\n\nCooldown\n- 10m 53% 85rpm"
      },
      {
        id: "T02-D4",
        dayName: "Čtvrtek",
        date: "2026-11-26",
        discipline: "strength",
        title: "Fixní slot: Kruhový trénink – Core, stabilita pánve & HIIT",
        durationMin: 60,
        intensityZone: "Core + Z3/Z4",
        prescription: "10 min mobilizace -> 35 min kruhový trénink (3×8 stanovišť: 40 s práce / 20 s pauza – plank se zvedáním končetin, rumunský mrtvý tah s jednoručkami, výstupy na bednu, přítahy v předklonu, Pallof press s gumou, angličáky bez prohnutí v bedrech) -> 15 min strečink.",
        purpose: "Budování antirotační síly středu těla (Pallof press) a excentrické síly zadního řetězce.",
        intervalsIcu: ""
      },
      {
        id: "T02-D5",
        dayName: "Pátek",
        date: "2026-11-27",
        discipline: "swim",
        title: "Bazén 25m: Pyramida v Z2/Z3 (1300 m)",
        durationMin: 45,
        intensityZone: "Z2–Z3",
        prescription: "Rozplavání 200 m Z1 -> 4×50 m technika (vysoký loket 'prsty po hladině', pauza 15 s) -> Pyramida kraul: 100 m – 150 m – 200 m – 150 m – 100 m v Z2 (tempo ~2:28–2:32/100m, pauzy 20–30 s) -> 4×25 m svižně Z3 (pauza 20 s) -> 100 m vyplavání.",
        purpose: "První souvislá 200m pasáž v kontrolovaném tempu bez rozpadu techniky.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 15s Rest\n\nMain Set\n- 100mtr Z2 Pace\n- 20s Rest\n- 150mtr Z2 Pace\n- 25s Rest\n- 200mtr Z2 Pace\n- 30s Rest\n- 150mtr Z2 Pace\n- 25s Rest\n- 100mtr Z2 Pace\n- 20s Rest\n\nMain Set 4x\n- 25mtr Z3 Pace\n- 20s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T02-D6",
        dayName: "Sobota",
        date: "2026-11-28",
        discipline: "bike",
        title: "Trenažér: Vytrvalost Z2 + 3×6 min Tempo (Z3)",
        durationMin: 70,
        intensityZone: "Z2–Z3 (140–178 W)",
        prescription: "15 min rozjetí 115–140 W -> Hlavní série 3× (6 min Tempo Z3 na 170–178 W / 78–82 % FTP v horním úchopu nebo částečně v aero + 4 min lehce Z1/Z2 na 125 W) -> 15 min Z2 na 145 W -> 10 min vyjetí 115 W.",
        purpose: "Zvýšení svalové vytrvalosti v pásmu 70.3 Hradec Králové (78–82 % FTP) při bezpečném objemu.",
        intervalsIcu: "Warmup\n- 15m 53-65% 86rpm\n\nMain Set 3x\n- 6m 78-82% 88-92rpm\n- 4m 58% 85rpm\n\nMain Set\n- 15m 67% 88rpm\n\nCooldown\n- 10m 53% 85rpm"
      },
      {
        id: "T02-D7",
        dayName: "Neděle",
        date: "2026-11-29",
        discipline: "run",
        title: "Nedělní vytrvalostní běh v Z2 (~11 km)",
        durationMin: 75,
        intensityZone: "Z2 (128–137 bpm)",
        prescription: "Plynulý běh 75 min na měkčím povrchu (lesní cesta/park) v Z2 (TF 128–137 bpm, tempo ~6:40–6:45/km). Hlídat uvolněná ramena a krátký frekvenční krok do mírných stoupání.",
        purpose: "Rozvoj kapilarizace a mitochondriální hustoty v pomalých svalových vláknech.",
        intervalsIcu: "Warmup\n- 10m 75-82% LTHR\n\nMain Set\n- 60m 83-89% LTHR\n\nCooldown\n- 5m 75-80% LTHR"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // T03 (30. 11. – 6. 12. 2026) | Fáze 1 – Vrchol prvního 3týdenního bloku
  // --------------------------------------------------------------------------
  {
    week: 3,
    code: "T03",
    startDate: "2026-11-30",
    endDate: "2026-12-06",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Build",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: false,
    hours: { total: 6.25, swim: 1.5, bike: 2.25, run: 1.5, strength: 1.0 },
    focus: "Nejvyšší objem prvního mezocyklu (6,25 h): aero úseky 5×5 min, sobotní trenažér 80 min se Sweet Spotem a nedělní běh 90 min (~13,5 km).",
    days: [
      {
        id: "T03-D1",
        dayName: "Pondělí",
        date: "2026-11-30",
        discipline: "rest",
        title: "Volno & Mobilita hrudníku a kyčlí",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Volný den. 15 min protažení prsních svalů, rotace hrudní páteře a uvolnění psoasu.",
        purpose: "Otevření hrudníku usnadňuje dýchání v aero pozici i vysoký loket při kraulu.",
        intervalsIcu: ""
      },
      {
        id: "T03-D2",
        dayName: "Úterý",
        date: "2026-12-01",
        discipline: "swim",
        title: "Bazén 25m: Prahové stovky na CSS tempu (1400 m)",
        durationMin: 45,
        intensityZone: "Z2–Z3",
        prescription: "Rozplavání 200 m Z1 -> Technika 4×50 m (plavání s pěstmi 25 m + 25 m otevřená dlaň pro cit na vodu, pauza 20 s) -> Hlavní série 8×100 m kraul na pomezí Z2/Z3 (cílové tempo 2:25–2:28/100m, pevná pauza 20 s) -> Vyplavání 200 m s piškotem volně.",
        purpose: "První specifický podnět na úrovni CSS (Critical Swim Speed) s kontrolovanou krátkou pauzou.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 8x\n- 100mtr Z3 Pace\n- 20s Rest\n\nCooldown\n- 200mtr Z1 Pace"
      },
      {
        id: "T03-D3",
        dayName: "Středa",
        date: "2026-12-02",
        discipline: "bike",
        title: "Trenažér: Aero adaptace 5×5 min (25 min v hrazdě)",
        durationMin: 55,
        intensityZone: "Z2 (145–160 W)",
        prescription: "10 min rozjetí 115–135 W -> 5× (5 min v TT aero pozici na 152–158 W / 70–73 % FTP při kadenci 88–92 rpm + 2 min v horním úchopu 125 W) -> 10 min vyjetí 115 W.",
        purpose: "Dosažení milníku 5×5 min v aero pozici bez tuhnutí beder.",
        intervalsIcu: "Warmup\n- 10m 53-62% 85rpm\n\nMain Set 5x\n- 5m 70-73% 90rpm\n- 2m 58% 85rpm\n\nCooldown\n- 10m 53% 85rpm"
      },
      {
        id: "T03-D4",
        dayName: "Čtvrtek",
        date: "2026-12-03",
        discipline: "strength",
        title: "Fixní slot: Kruhový trénink – Core, kompenzace beder & HIIT",
        durationMin: 60,
        intensityZone: "Core + Z3/Z4",
        prescription: "10 min rozcvička -> 35 min kruhový trénink se zaměřením na stabilitu pánve, jednostranné cviky (výpady vzad, jednonožní mrtvý tah) a střed těla -> 15 min mobilita.",
        purpose: "Vyrovnání svalových dysbalancí mezi pravou a levou stranou pánve před víkendovou zátěží.",
        intervalsIcu: ""
      },
      {
        id: "T03-D5",
        dayName: "Pátek",
        date: "2026-12-04",
        discipline: "swim",
        title: "Bazén 25m: Vytrvalostní dvoustovky (1400 m)",
        durationMin: 45,
        intensityZone: "Z2",
        prescription: "Rozplavání 200 m Z1 -> 4×50 m technika (plavání na boku s výdechem do vody) -> Hlavní série 4×200 m v Z2 (2× bez pomůcek, 2× s piškotem, tempo ~2:30/100m, pauza 30 s) -> 200 m vyplavání.",
        purpose: "Budování klidného rytmu na delších úsecích (4×200 m).",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 4x\n- 200mtr Z2 Pace\n- 30s Rest\n\nCooldown\n- 200mtr Z1 Pace"
      },
      {
        id: "T03-D6",
        dayName: "Sobota",
        date: "2026-12-05",
        discipline: "bike",
        title: "Trenažér: Sweet Spot 4×6 min + Z2 vytrvalost",
        durationMin: 80,
        intensityZone: "Z2–Z3 (145–184 W)",
        prescription: "15 min rozjetí 115–140 W -> Hlavní série 4× (6 min Sweet Spot 170–184 W / 78–85 % FTP při 88–92 rpm + 3 min lehce 120 W / 55 % FTP) -> 20 min plynule v Z2 (148 W, z toho 2×4 min v aero) -> 9 min vyjetí 115 W.",
        purpose: "Klíčový trénink pro posun funkčního prahu (FTP) a efektivitu šlapání.",
        intervalsIcu: "Warmup\n- 15m 53-65% 86rpm\n\nMain Set 4x\n- 6m 78-85% 88-92rpm\n- 3m 55% 85rpm\n\nMain Set\n- 20m 68% 88rpm\n\nCooldown\n- 9m 53% 85rpm"
      },
      {
        id: "T03-D7",
        dayName: "Neděle",
        date: "2026-12-06",
        discipline: "run",
        title: "Nedělní dlouhý běh v Z2 (~13,5 km)",
        durationMin: 90,
        intensityZone: "Z2 (128–137 bpm)",
        prescription: "Souvislý běh 90 min v čisté Z2 (TF 128–137 bpm, tempo ~6:40/km). Posledních 15 min se soustředit na vzpřímenou pánev a nepropadat se v kyčlích.",
        purpose: "Zakončení 3týdenního bloku kvalitním 90minutovým aerobním během před regeneračním týdnem.",
        intervalsIcu: "Warmup\n- 10m 75-82% LTHR\n\nMain Set\n- 75m 83-89% LTHR\n\nCooldown\n- 5m 75-80% LTHR"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // T04 (7. 12. – 13. 12. 2026) | Fáze 1 – 1. Regenerační týden (cyklus 3:1)
  // --------------------------------------------------------------------------
  {
    week: 4,
    code: "T04",
    startDate: "2026-12-07",
    endDate: "2026-12-13",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Regenerační",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: true,
    hours: { total: 4.0, swim: 1.25, bike: 1.0, run: 1.0, strength: 0.75 },
    focus: "Regenerační týden (-35 % objemu): superkompenzace po prvním bloku, uvolnění beder, lehké technické plavání a klidné Z1/Z2 tempo.",
    days: [
      {
        id: "T04-D1",
        dayName: "Pondělí",
        date: "2026-12-07",
        discipline: "rest",
        title: "Volno & Hluboká regenerace",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Úplné volno, dřívější spánek (+30 min), teplá sprcha/sauna a lehké protažení zad.",
        purpose: "Obnova parasympatiku (noční HRV) po třech týdnech tréninku.",
        intervalsIcu: ""
      },
      {
        id: "T04-D2",
        dayName: "Úterý",
        date: "2026-12-08",
        discipline: "swim",
        title: "Bazén 25m: Technika a uvolněné splývání (1000 m)",
        durationMin: 40,
        intensityZone: "Z1–Z2",
        prescription: "Rozplavání 200 m -> 6×50 m technická cvičení (počítání záběrů SWOLF – snažit se přeplavat 25m bazén na méně než 21 záběrů s klidným výdechem, pauza 20 s) -> 4×100 m kraul Z2 (pauza 25 s) -> 100 m znak.",
        purpose: "Zlepšení efektivity záběru (SWOLF) bez metabolické únavy.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 6x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 4x\n- 100mtr Z2 Pace\n- 25s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T04-D3",
        dayName: "Středa",
        date: "2026-12-09",
        discipline: "rest",
        title: "Volný večer (Místo středečního trenažéru 20 min jóga)",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Žádný trenažér. 20 min večerní kompenzační jóga zaměřená na bedra, hruškový sval (piriformis) a kyčle.",
        purpose: "Odlehčení sedacím partiím a bedrům v regeneračním týdnu.",
        intervalsIcu: ""
      },
      {
        id: "T04-D4",
        dayName: "Čtvrtek",
        date: "2026-12-10",
        discipline: "strength",
        title: "Fixní slot (Odlehčený): Čisté Core & Mobilita bez HIIT",
        durationMin: 45,
        intensityZone: "Z1 Core",
        prescription: "45 min kontrolované cvičení hlubokého stabilizačního systému, dechová aktivace bránice, balanční cviky pro kotníky a kolena, bez výskoků a bez vysokých tepů.",
        purpose: "Udržení neuromuskulárního tonu core bez centrální únavy CNS.",
        intervalsIcu: ""
      },
      {
        id: "T04-D5",
        dayName: "Pátek",
        date: "2026-12-11",
        discipline: "swim",
        title: "Bazén 25m: Souvislá pětistovka s piškotem (1000 m)",
        durationMin: 35,
        intensityZone: "Z1–Z2",
        prescription: "Rozplavání 200 m -> 500 m souvisle kraul s piškotem v naprostém klidu (Z2, tempo ~2:32/100m, soustředit se na rytmický výdech) -> 4×50 m celý kraul (pauza 20 s) -> 100 m vyplavání.",
        purpose: "Mentální pohoda při souvislém plavání bez zastavování.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nMain Set\n- 500mtr Z2 Pace\n\nMain Set 4x\n- 50mtr Z2 Pace\n- 20s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T04-D6",
        dayName: "Sobota",
        date: "2026-12-12",
        discipline: "bike",
        title: "Trenažér: Lehké protočení nohou Z1/Z2 + 3×4 min aero",
        durationMin: 60,
        intensityZone: "Z1–Z2 (125–145 W)",
        prescription: "10 min 115 W -> 40 min lehká jízda 130–145 W (60–67 % FTP, vysoká kadence 90 rpm, v tom pouze 3×4 min v aero pozici bez tlaku do pedálů) -> 10 min 110 W.",
        purpose: "Aktivní prokrvení svalů dolních končetin a udržení návyku na hrazdu.",
        intervalsIcu: "Warmup\n- 10m 53% 88rpm\n\nMain Set\n- 40m 60-67% 90rpm\n\nCooldown\n- 10m 50% 85rpm"
      },
      {
        id: "T04-D7",
        dayName: "Neděle",
        date: "2026-12-13",
        discipline: "run",
        title: "Lehký regenerační běh Z1/Z2 (~9 km)",
        durationMin: 60,
        intensityZone: "Z1–Z2 (122–133 bpm)",
        prescription: "Velmi klidný nedělní běh 60 min se stropem TF 133 bpm (tempo ~6:45–6:55/km). Pocitově skončit s rezervou na další hodinu.",
        purpose: "Plné dobití baterií před druhým zimním tréninkovým blokem.",
        intervalsIcu: "Warmup\n- 10m 75-80% LTHR\n\nMain Set\n- 50m 80-86% LTHR"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // T05 (14. 12. – 20. 12. 2026) | Fáze 1 – Start 2. bloku (Aero 6 min)
  // --------------------------------------------------------------------------
  {
    week: 5,
    code: "T05",
    startDate: "2026-12-14",
    endDate: "2026-12-20",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Build",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: false,
    hours: { total: 5.75, swim: 1.5, bike: 2.0, run: 1.25, strength: 1.0 },
    focus: "Start druhého mezocyklu: prodloužení úseků v TT hrazdě na 5×6 min (30 min celkem), plavecké třístovky v Z2 a nedělní běh 75 min se závěrečnými rovinkami.",
    days: [
      {
        id: "T05-D1",
        dayName: "Pondělí",
        date: "2026-12-14",
        discipline: "rest",
        title: "Volno & Mobilita",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Volný den, 10 min protažení beder a kyčlí.",
        purpose: "Udržení rozsahu v kyčlích před pracovním týdnem.",
        intervalsIcu: ""
      },
      {
        id: "T05-D2",
        dayName: "Úterý",
        date: "2026-12-15",
        discipline: "swim",
        title: "Bazén 25m: Záběrová fáze pod tělem + 6×150 m (1400 m)",
        durationMin: 45,
        intensityZone: "Z2",
        prescription: "Rozplavání 200 m -> 4×50 m cvičení (jednoruč kraul s druhou rukou v připažení, dýchání na stranu záběrové ruky, pauza 20 s) -> Hlavní série 6×150 m kraul v Z2 (tempo ~2:28–2:32/100m, pauza 25 s) -> 100 m vyplavání.",
        purpose: "Jednoruční kraul učí zapojit rotaci boků a nekrčit ruku předčasně u hlavy.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 6x\n- 150mtr Z2 Pace\n- 25s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T05-D3",
        dayName: "Středa",
        date: "2026-12-16",
        discipline: "bike",
        title: "Trenažér: Aero adaptace 5×6 min (30 min v hrazdě)",
        durationMin: 55,
        intensityZone: "Z2 (145–160 W)",
        prescription: "10 min rozjetí 115–135 W -> 5× (6 min v TT aero pozici na 152–158 W / 70–73 % FTP, kadence 88–90 rpm + 2 min v horním úchopu 125 W) -> 5 min vyjetí 115 W. Po tréninku 5 min psoas streč.",
        purpose: "První trénink s kumulovanými 30 minutami v aero pozici v cílovém IM výkonu.",
        intervalsIcu: "Warmup\n- 10m 53-62% 85rpm\n\nMain Set 5x\n- 6m 70-73% 89rpm\n- 2m 58% 85rpm\n\nCooldown\n- 5m 53% 85rpm"
      },
      {
        id: "T05-D4",
        dayName: "Čtvrtek",
        date: "2026-12-17",
        discipline: "strength",
        title: "Fixní slot: Kruhový trénink – Core, kompenzace beder & HIIT",
        durationMin: 60,
        intensityZone: "Core + Z3/Z4",
        prescription: "60 min kruhový trénink: důraz na šikmé břišní svaly, excentrické výpony na schodu (ochrana achilovek pro jarní maratonský build), goblet dřepy a stabilizaci lopatek.",
        purpose: "Příprava lýtek a achilovek na rostoucí běžeckou kilometráž v roce 2027.",
        intervalsIcu: ""
      },
      {
        id: "T05-D5",
        dayName: "Pátek",
        date: "2026-12-18",
        discipline: "swim",
        title: "Bazén 25m: Vytrvalostní třístovky 3×300 m (1400 m)",
        durationMin: 45,
        intensityZone: "Z2",
        prescription: "Rozplavání 200 m -> 4×50 m technika (25 m prsa kraulové nohy + 25 m kraul) -> Hlavní série 3×300 m v Z2 (1. čistý kraul, 2. s piškotem, 3. čistý kraul, tempo ~2:30/100m, pauza 35 s) -> 100 m vyplavání.",
        purpose: "Prodloužení souvislých úseků v hlavní sérii na 300 m bez ztráty skluzu.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 3x\n- 300mtr Z2 Pace\n- 35s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T05-D6",
        dayName: "Sobota",
        date: "2026-12-19",
        discipline: "bike",
        title: "Trenažér: Sweet Spot 3×8 min v sedle",
        durationMin: 65,
        intensityZone: "Z2–Z3 (145–185 W)",
        prescription: "12 min rozjetí 115–140 W -> 3× (8 min Sweet Spot 175–185 W / 80–85 % FTP při 88–90 rpm + 4 min lehce 120 W) -> 10 min Z2 na 148 W -> 7 min vyjetí 115 W.",
        purpose: "Prodloužení prahových/Sweet Spot intervalů ze 6 na 8 minut.",
        intervalsIcu: "Warmup\n- 12m 53-65% 86rpm\n\nMain Set 3x\n- 8m 80-85% 89rpm\n- 4m 55% 85rpm\n\nMain Set\n- 10m 68% 88rpm\n\nCooldown\n- 7m 53% 85rpm"
      },
      {
        id: "T05-D7",
        dayName: "Neděle",
        date: "2026-12-20",
        discipline: "run",
        title: "Nedělní běh Z2 + 5×30 s živé úseky (~11,5 km)",
        durationMin: 75,
        intensityZone: "Z2 + Z3/Z4 rovinky",
        prescription: "65 min běh v Z2 (TF 128–137 bpm, ~6:38–6:45/km) -> v závěru 5× (30 s svižně v tempu ~5:30/km + 90 s klus Z1).",
        purpose: "Zapojení rychlejších motorických jednotek na konci vytrvalostního běhu bez zakyselení.",
        intervalsIcu: "Warmup\n- 10m 75-82% LTHR\n\nMain Set\n- 55m 83-89% LTHR\n\nMain Set 5x\n- 30s 96% LTHR\n- 90s 78% LTHR"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // T06 (21. 12. – 27. 12. 2026) | Fáze 1 – Vánoční vytrvalostní týden
  // --------------------------------------------------------------------------
  {
    week: 6,
    code: "T06",
    startDate: "2026-12-21",
    endDate: "2026-12-27",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Build",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: false,
    hours: { total: 6.25, swim: 1.5, bike: 2.25, run: 1.5, strength: 1.0 },
    focus: "Vánoční týden: využití volnějších svátečních dnů k rannímu tréninku bez stresu. Aero úseky 4×8 min, sobotní trenažér 85 min a nedělní běh 90 min.",
    days: [
      {
        id: "T06-D1",
        dayName: "Pondělí",
        date: "2026-12-21",
        discipline: "rest",
        title: "Volno & Předvánoční regenerace",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Volný den, 15 min večerní strečink kyčlí a hrudní páteře.",
        purpose: "Kompenzace po víkendu.",
        intervalsIcu: ""
      },
      {
        id: "T06-D2",
        dayName: "Úterý",
        date: "2026-12-22",
        discipline: "swim",
        title: "Bazén 25m: Stupňované stovky (1450 m)",
        durationMin: 45,
        intensityZone: "Z2–Z3",
        prescription: "Rozplavání 250 m Z1 -> 4×50 m technika (doháněčka + dýchání na 3) -> Hlavní série 3× (3×100 m stupňovaně: 1. stovka volně Z2 2:34, 2. stovka středně 2:28, 3. stovka svižně Z3 2:22; pauza mezi stovkami 20 s, mezi sériemi 45 s) -> 100 m vyplavání.",
        purpose: "Rozvoj citu pro změnu tempa ve vodě bez rvání silou.",
        intervalsIcu: "Warmup\n- 250mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 9x\n- 100mtr Z2-Z3 Pace\n- 25s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T06-D3",
        dayName: "Středa",
        date: "2026-12-23",
        discipline: "bike",
        title: "Trenažér: Aero adaptace 4×8 min (32 min v hrazdě)",
        durationMin: 50,
        intensityZone: "Z2 (145–160 W)",
        prescription: "8 min rozjetí 115–135 W -> 4× (8 min v TT aero pozici na 152 W / 70 % FTP, kadence 88–90 rpm + 2 min v horním úchopu 125 W) -> 2 min vyjetí 110 W.",
        purpose: "Prodloužení jednotlivého aero intervalu na 8 minut v kuse.",
        intervalsIcu: "Warmup\n- 8m 53-62% 85rpm\n\nMain Set 4x\n- 8m 70% 89rpm\n- 2m 58% 85rpm\n\nCooldown\n- 2m 50% 85rpm"
      },
      {
        id: "T06-D4",
        dayName: "Čtvrtek",
        date: "2026-12-24",
        discipline: "strength",
        title: "Štědrý den (Ráno): Domácí Core & Mobilita + procházka",
        durationMin: 60,
        intensityZone: "Core + Z2",
        prescription: "Dopolední domácí kruhový trénink 60 min (vlastní váha, odporové gumy, core stabilizace, mobilita beder a kyčlí).",
        purpose: "Udržení čtvrtečního silového rituálu i o Štědrém dnu v domácích podmínkách.",
        intervalsIcu: ""
      },
      {
        id: "T06-D5",
        dayName: "Pátek",
        date: "2026-12-25",
        discipline: "swim",
        title: "Bazén 25m (nebo přesun na So/Ne dle otevírací doby): 1500 m v Z2",
        durationMin: 45,
        intensityZone: "Z2",
        prescription: "Rozplavání 200 m -> 4×50 m technika -> Hlavní série 3×400 m v Z2 (1. kraul, 2. s piškotem, 3. kraul; tempo ~2:30/100m, pauza 40 s) -> 100 m vyplavání.",
        purpose: "Poprvé 3×400 m v hlavní sérii – budování specifické vytrvalosti směrem k 1,9 a 3,8 km.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 3x\n- 400mtr Z2 Pace\n- 40s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T06-D6",
        dayName: "Sobota",
        date: "2026-12-26",
        discipline: "bike",
        title: "Trenažér: Sváteční vytrvalost Z2 + 3×10 min Tempo (75 % FTP)",
        durationMin: 85,
        intensityZone: "Z2–Z3 (140–165 W)",
        prescription: "15 min rozjetí 115–140 W -> 3× (10 min na pomezí Z2/Z3 160–165 W / 74–76 % FTP, z toho 6 min v aero + 5 min Z2 135 W v horním úchopu) -> 15 min Z2 145 W -> 10 min vyjetí 115 W.",
        purpose: "Specifická jízda na horní hranici IM výkonu / spodní hranici 70.3 výkonu.",
        intervalsIcu: "Warmup\n- 15m 53-65% 86rpm\n\nMain Set 3x\n- 10m 74-76% 88-90rpm\n- 5m 62% 85rpm\n\nMain Set\n- 15m 67% 88rpm\n\nCooldown\n- 10m 53% 85rpm"
      },
      {
        id: "T06-D7",
        dayName: "Neděle",
        date: "2026-12-27",
        discipline: "run",
        title: "Nedělní dlouhý běh v Z2 (~13,5 km)",
        durationMin: 90,
        intensityZone: "Z2 (128–137 bpm)",
        prescription: "90 min souvislý běh v Z2 (TF 128–137 bpm, tempo ~6:38–6:45/km). Zaměřit se na klidný dech a lehký dopad.",
        purpose: "Stabilizace 90minutového běhu bez bolesti beder.",
        intervalsIcu: "Warmup\n- 10m 75-82% LTHR\n\nMain Set\n- 75m 83-89% LTHR\n\nCooldown\n- 5m 75-80% LTHR"
      }
    ]
  }
];

// ============================================================================
// T07–T12: Druhá polovina Fáze 1 (Silvestr, CSS test a Dovolená Thajsko)
// ============================================================================
window.PLAN_DATA.weeks.push(
  // --------------------------------------------------------------------------
  // T07 (28. 12. 2026 – 3. 1. 2027) | Fáze 1 – Vrchol 2. bloku (Přelom roku)
  // --------------------------------------------------------------------------
  {
    week: 7,
    code: "T07",
    startDate: "2026-12-28",
    endDate: "2027-01-03",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Build",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: false,
    hours: { total: 6.5, swim: 1.5, bike: 2.25, run: 1.75, strength: 1.0 },
    focus: "Vrchol druhého zimního bloku na přelomu roku: 4×9 min v TT aero pozici, 90 min sobotní trenažér a nedělní běh 105 min (~15,5 km) jako vstupenka do roku 2027.",
    days: [
      {
        id: "T07-D1",
        dayName: "Pondělí",
        date: "2026-12-28",
        discipline: "rest",
        title: "Volno & Povánoční mobilita beder",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Volný den, 15 min uvolnění kyčlí a hrudní páteře.",
        purpose: "Příprava na nejobjemnější týden prosince.",
        intervalsIcu: ""
      },
      {
        id: "T07-D2",
        dayName: "Úterý",
        date: "2026-12-29",
        discipline: "swim",
        title: "Bazén 25m: CSS úseky 10×100 m (1500 m)",
        durationMin: 45,
        intensityZone: "Z2–Z3",
        prescription: "Rozplavání 200 m -> 4×50 m technika (vysoký loket + skluz, pauza 15 s) -> Hlavní série 10×100 m kraul na CSS tempu (2:24–2:28/100m, pevná pauza 20 s) -> 100 m vyplavání.",
        purpose: "Zvýšení objemu prahového plavání na 1000 m v hlavní sérii při zachování uvolněných ramen.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 15s Rest\n\nMain Set 10x\n- 100mtr Z3 Pace\n- 20s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T07-D3",
        dayName: "Středa",
        date: "2026-12-30",
        discipline: "bike",
        title: "Trenažér: Aero adaptace 4×9 min (36 min v hrazdě)",
        durationMin: 55,
        intensityZone: "Z2 (148–162 W)",
        prescription: "9 min rozjetí 115–135 W -> 4× (9 min v TT aero pozici na 152–158 W / 70–73 % FTP, kadence 88–90 rpm + 2 min v horním úchopu 125 W) -> 2 min vyjetí 110 W.",
        purpose: "Plynulý přechod k téměř 10minutovým souvislým blokům v aero pozici.",
        intervalsIcu: "Warmup\n- 9m 53-62% 85rpm\n\nMain Set 4x\n- 9m 70-73% 89rpm\n- 2m 58% 85rpm\n\nCooldown\n- 2m 50% 85rpm"
      },
      {
        id: "T07-D4",
        dayName: "Čtvrtek",
        date: "2026-12-31",
        discipline: "strength",
        title: "Silvestr (Dopoledne): Kruhový trénink Core & Silová vytrvalost",
        durationMin: 60,
        intensityZone: "Core + Z3",
        prescription: "Dopolední 60min kruhový trénink: 4 kola (plank variace, bulharské dřepy, rumunský mrtvý tah, kliky s rotací, mosty na jedné noze, farmářská chůze).",
        purpose: "Poslední trénink roku 2026 – silný střed těla pro sezónu 2027.",
        intervalsIcu: ""
      },
      {
        id: "T07-D5",
        dayName: "Pátek",
        date: "2027-01-01",
        discipline: "swim",
        title: "Novoroční bazén (nebo přesun na So ráno): Souvislých 800 m + technika (1400 m)",
        durationMin: 45,
        intensityZone: "Z2",
        prescription: "Rozplavání 200 m -> 4×50 m technika -> Hlavní úsek: 800 m souvisle kraul v Z2 (možno s piškotem v 2. polovině, tempo ~2:30/100m, celkem ~20 min v kuse) -> 4×50 m svižně Z2/Z3 -> 100 m vyplavání.",
        purpose: "Psychologický milník: 800 m souvisle v klidném aerobním rytmu.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set\n- 800mtr Z2 Pace\n\nMain Set 4x\n- 50mtr Z3 Pace\n- 20s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T07-D6",
        dayName: "Sobota",
        date: "2027-01-02",
        discipline: "bike",
        title: "Trenažér: Novoroční Sweet Spot 3×10 min + Z2 (90 min)",
        durationMin: 80,
        intensityZone: "Z2–Z3 (145–185 W)",
        prescription: "15 min rozjetí 115–140 W -> 3× (10 min Sweet Spot 175–185 W / 80–85 % FTP při 88–90 rpm + 4 min lehce 120 W) -> 15 min Z2 na 148 W (z toho 2×5 min v aero) -> 8 min vyjetí 115 W.",
        purpose: "30 minut práce v pásmu Sweet Spot (80–85 % FTP) pro růst prahového výkonu.",
        intervalsIcu: "Warmup\n- 15m 53-65% 86rpm\n\nMain Set 3x\n- 10m 80-85% 89rpm\n- 4m 55% 85rpm\n\nMain Set\n- 15m 68% 88rpm\n\nCooldown\n- 8m 53% 85rpm"
      },
      {
        id: "T07-D7",
        dayName: "Neděle",
        date: "2027-01-03",
        discipline: "run",
        title: "Nedělní dlouhý běh v Z2 (~15,5 km)",
        durationMin: 105,
        intensityZone: "Z2 (128–137 bpm)",
        prescription: "Souvislý běh 1:45 hod v Z2 (TF 128–137 bpm, tempo ~6:40–6:45/km). Vzít s sebou 1 energetický gel v 50. minutě pro trénink střev.",
        purpose: "První běh přes 15 km v novém roce + trénink příjmu sacharidů za běhu.",
        intervalsIcu: "Warmup\n- 10m 75-82% LTHR\n\nMain Set\n- 90m 83-89% LTHR\n\nCooldown\n- 5m 75-80% LTHR"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // T08 (4. 1. – 10. 1. 2027) | Fáze 1 – 2. Regenerační týden
  // --------------------------------------------------------------------------
  {
    week: 8,
    code: "T08",
    startDate: "2027-01-04",
    endDate: "2027-01-10",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Regenerační",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: true,
    hours: { total: 4.25, swim: 1.25, bike: 1.25, run: 1.0, strength: 0.75 },
    focus: "Druhý regenerační týden: vstřebání vánočního/novoročního bloku, uvolnění zad a příprava na testovací týden T09 před Thajskem.",
    days: [
      {
        id: "T08-D1",
        dayName: "Pondělí",
        date: "2027-01-04",
        discipline: "rest",
        title: "Volno & Regenerace",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Úplné volno, pěnový válec a protažení psoasu.",
        purpose: "Odpočinek po 105min nedělním běhu.",
        intervalsIcu: ""
      },
      {
        id: "T08-D2",
        dayName: "Úterý",
        date: "2027-01-05",
        discipline: "swim",
        title: "Bazén 25m: Technika záběru a obraty (1100 m)",
        durationMin: 40,
        intensityZone: "Z1–Z2",
        prescription: "Rozplavání 200 m -> 6×50 m technická cvičení (sculling – vlnění dlaněmi před hlavou + kraul, pauza 20 s) -> 5×100 m Z2 volně (tempo 2:32/100m, pauza 25 s) -> 100 m znak.",
        purpose: "Rozvoj citu pro oporu o vodu v první fázi záběru (sculling).",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 6x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 5x\n- 100mtr Z2 Pace\n- 25s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T08-D3",
        dayName: "Středa",
        date: "2027-01-06",
        discipline: "bike",
        title: "Trenažér: Lehká kadence Z1/Z2 (30 min)",
        durationMin: 30,
        intensityZone: "Z1–Z2 (120–140 W)",
        prescription: "30 min velmi lehká kompenzační jízda 120–140 W (55–65 % FTP, kadence 90 rpm, 3×3 min v aero) + 15 min strečink kyčlí.",
        purpose: "Aktivní regenerace bez svalového napětí.",
        intervalsIcu: "Warmup\n- 5m 52% 85rpm\n\nMain Set\n- 20m 60% 90rpm\n\nCooldown\n- 5m 50% 85rpm"
      },
      {
        id: "T08-D4",
        dayName: "Čtvrtek",
        date: "2027-01-07",
        discipline: "strength",
        title: "Fixní slot (Odlehčený): Core, dech a mobilita páteře",
        durationMin: 45,
        intensityZone: "Z1 Core",
        prescription: "45 min kompenzační cvičení středu těla, aktivace gluteus medius s minibandem a uvolnění bederní fascie.",
        purpose: "Prevence přetížení beder před dalším blokem.",
        intervalsIcu: ""
      },
      {
        id: "T08-D5",
        dayName: "Pátek",
        date: "2027-01-08",
        discipline: "swim",
        title: "Bazén 25m: Uvolněné dvoustovky + krátké sprinty (1050 m)",
        durationMin: 35,
        intensityZone: "Z2 + Z4 aktivace",
        prescription: "Rozplavání 200 m -> 3×200 m v Z2 (pauza 30 s) -> 6×25 m rychle v Z4 (aktivace pro příští týdenní CSS test, pauza 30 s) -> 100 m vyplavání.",
        purpose: "Krátké 25m úseky probudí nervosvalovou koordinaci před testem v T09.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nMain Set 3x\n- 200mtr Z2 Pace\n- 30s Rest\n\nMain Set 6x\n- 25mtr Z4 Pace\n- 30s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T08-D6",
        dayName: "Sobota",
        date: "2027-01-09",
        discipline: "bike",
        title: "Trenažér: Plynulá Z2 vytrvalost (45 min)",
        durationMin: 45,
        intensityZone: "Z2 (135–150 W)",
        prescription: "10 min 115 W -> 30 min Z2 na 142–150 W (kadence 88 rpm, z toho 2×5 min v aero) -> 5 min 115 W.",
        purpose: "Udržení kontaktu s kolem při nízké únavě.",
        intervalsIcu: "Warmup\n- 10m 53% 85rpm\n\nMain Set\n- 30m 65-69% 88rpm\n\nCooldown\n- 5m 53% 85rpm"
      },
      {
        id: "T08-D7",
        dayName: "Neděle",
        date: "2027-01-10",
        discipline: "run",
        title: "Lehký nedělní běh v Z2 (~9 km)",
        durationMin: 60,
        intensityZone: "Z2 (126–135 bpm)",
        prescription: "60 min lehký běh v Z2 (TF 126–135 bpm) zakončený 4×20 s rovinkou.",
        purpose: "Čerstvé nohy do týdne T09.",
        intervalsIcu: "Warmup\n- 10m 75-80% LTHR\n\nMain Set\n- 46m 82-88% LTHR\n\nMain Set 4x\n- 20s 95% LTHR\n- 40s 78% LTHR"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // T09 (11. 1. – 17. 1. 2027) | Fáze 1 – Předodjezdový blok + CSS test
  // --------------------------------------------------------------------------
  {
    week: 9,
    code: "T09",
    startDate: "2027-01-11",
    endDate: "2027-01-17",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Build",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: false,
    hours: { total: 6.25, swim: 1.5, bike: 2.25, run: 1.5, strength: 1.0 },
    focus: "Kvalitní týden před odletem do Thajska: v pátek kontrolní CSS plavecký test (400 m + 200 m), ve středu 4×10 min v TT aero pozici a o víkendu silný dvojblok.",
    days: [
      {
        id: "T09-D1",
        dayName: "Pondělí",
        date: "2027-01-11",
        discipline: "rest",
        title: "Volno & Mobilita",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Volný den.",
        purpose: "Plná připravenost na kvalitní týden T09.",
        intervalsIcu: ""
      },
      {
        id: "T09-D2",
        dayName: "Úterý",
        date: "2027-01-12",
        discipline: "swim",
        title: "Bazén 25m: Příprava tempa na CSS test (1350 m)",
        durationMin: 45,
        intensityZone: "Z2–Z3",
        prescription: "Rozplavání 250 m Z1 -> 4×50 m technika -> Hlavní série 6×150 m v Z2/Z3 (první 100 m v Z2, posledních 50 m zrychlit do Z3 ~2:22/100m, pauza 25 s) -> 100 m vyplavání.",
        purpose: "Nácvik udržení tempa v druhé polovině úseku.",
        intervalsIcu: "Warmup\n- 250mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 6x\n- 150mtr Z2-Z3 Pace\n- 25s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T09-D3",
        dayName: "Středa",
        date: "2027-01-13",
        discipline: "bike",
        title: "Trenažér: Milník Aero adaptace 4×10 min (40 min v hrazdě!)",
        durationMin: 55,
        intensityZone: "Z2 (150–160 W)",
        prescription: "8 min rozjetí 115–135 W -> 4× (10 min souvisle v TT aero pozici na 152–158 W / 70–73 % FTP při kadenci 88–90 rpm + 1,5 min v horním úchopu 125 W) -> 1 min vyjetí 110 W.",
        purpose: "Splnění zimního cíle aero adaptace: 4×10 minut v kuse v hrazdě v cílových IM wattech.",
        intervalsIcu: "Warmup\n- 8m 53-62% 85rpm\n\nMain Set 4x\n- 10m 70-73% 89rpm\n- 90s 58% 85rpm\n\nCooldown\n- 1m 50% 85rpm"
      },
      {
        id: "T09-D4",
        dayName: "Čtvrtek",
        date: "2027-01-14",
        discipline: "strength",
        title: "Fixní slot: Kruhový trénink – Core, kompenzace beder & HIIT",
        durationMin: 60,
        intensityZone: "Core + Z3/Z4",
        prescription: "Plnohodnotný 60min kruhový trénink (důraz na antirotační cviky, hýždě, zadní stehna a mobilitu hrudníku).",
        purpose: "Poslední těžký kruhový trénink před odletem do Thajska.",
        intervalsIcu: ""
      },
      {
        id: "T09-D5",
        dayName: "Pátek",
        date: "2027-01-15",
        discipline: "swim",
        title: "Bazén 25m: KONTROLNÍ CSS TEST (400 m + 200 m na čas)",
        durationMin: 45,
        intensityZone: "Z1–Z4 (Test)",
        prescription: "Rozplavání 300 m Z1 + 4×25 m stupňovaně s pauzou 30 s -> HLAVNÍ TEST: 1) 400 m kraul rovnoměrným maximálním úsilím (zapsat přesný čas T400) -> 5–8 min velmi lehké vyplavání/odpočinek do plného uklidnění -> 2) 200 m kraul maximálním úsilím (zapsat přesný čas T200) -> 200 m vyplavání. Výpočet CSS = (T400 - T200) / 2 na 100 m (zadej do kalkulačky zón!).",
        purpose: "Objektivní změření posunu plavecké rychlosti po 9 týdnech pravidelného bazénu.",
        intervalsIcu: "Warmup\n- 300mtr Z1 Pace\n\nWarmup 4x\n- 25mtr Z3 Pace\n- 30s Rest\n\nMain Set\n- 400mtr Z4 Pace\n- 6m Rest\n- 200mtr Z4 Pace\n\nCooldown\n- 200mtr Z1 Pace"
      },
      {
        id: "T09-D6",
        dayName: "Sobota",
        date: "2027-01-16",
        discipline: "bike",
        title: "Trenažér: Sweet Spot 4×8 min + Z2 (80 min)",
        durationMin: 80,
        intensityZone: "Z2–Z3 (145–185 W)",
        prescription: "14 min rozjetí 115–140 W -> 4× (8 min Sweet Spot 175–185 W / 80–85 % FTP + 3 min lehce 120 W) -> 14 min Z2 na 148 W -> 8 min vyjetí 115 W.",
        purpose: "Silný cyklistický impuls (32 min ve Sweet Spotu) před dvoutýdenní pauzou od trenažéru v Thajsku.",
        intervalsIcu: "Warmup\n- 14m 53-65% 86rpm\n\nMain Set 4x\n- 8m 80-85% 89rpm\n- 3m 55% 85rpm\n\nMain Set\n- 14m 68% 88rpm\n\nCooldown\n- 8m 53% 85rpm"
      },
      {
        id: "T09-D7",
        dayName: "Neděle",
        date: "2027-01-17",
        discipline: "run",
        title: "Nedělní běh Z2 se závěrem v maratonském tempu (~14 km)",
        durationMin: 90,
        intensityZone: "Z2 -> Z3 (128–143 bpm)",
        prescription: "70 min v Z2 (TF 128–136 bpm, ~6:42/km) -> posledních 15 min plynule zrychlit do cílového maratonského tempa Z3 (6:20–6:24/km, TF ~140–143 bpm) -> 5 min výklus.",
        purpose: "První ochutnávka maratonského tempa (6:24/km) na unavenějších nohách.",
        intervalsIcu: "Warmup\n- 10m 75-82% LTHR\n\nMain Set\n- 60m 83-88% LTHR\n- 15m 90-93% LTHR\n\nCooldown\n- 5m 75-80% LTHR"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // T10 (18. 1. – 24. 1. 2027) | Fáze 1 – Odlet do Thajska (20. 1.) & Aklimatizace
  // --------------------------------------------------------------------------
  {
    week: 10,
    code: "T10",
    startDate: "2027-01-18",
    endDate: "2027-01-24",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Dovolená",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: true,
    hours: { total: 4.25, swim: 1.5, bike: 0.75, run: 1.25, strength: 0.75 },
    focus: "DOVOLENÁ THAJSKO (od 20. 1.): V úterý poslední trénink doma, poté přesun do tepla. Po dlouhém letu opatrně rozhýbat bedra a kyčle, o víkendu plavání v moři/bazénu a ranní klusy do 40 min.",
    days: [
      {
        id: "T10-D1",
        dayName: "Pondělí",
        date: "2027-01-18",
        discipline: "swim",
        title: "Bazén 25m (Před odletem): Uvolněných 1300 m v Z2",
        durationMin: 45,
        intensityZone: "Z2",
        prescription: "Rozplavání 200 m -> 4×50 m technika -> 5×200 m kraul v Z2 podle nových CSS zón (pauza 25 s) -> 100 m vyplavání.",
        purpose: "Otestování nově nastaveného CSS tempa na 200m úsecích před cestou.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 5x\n- 200mtr Z2 Pace\n- 25s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T10-D2",
        dayName: "Úterý",
        date: "2027-01-19",
        discipline: "bike",
        title: "Trenažér (Před odletem): 45 min Z2/Z3 v aero pozici",
        durationMin: 45,
        intensityZone: "Z2–Z3 (145–170 W)",
        prescription: "8 min rozjetí -> 3× (8 min v aero na 158–168 W / 73–77 % FTP + 2 min horní úchop 125 W) -> 7 min vyjetí.",
        purpose: "Poslední wattový trénink před dovolenou.",
        intervalsIcu: "Warmup\n- 8m 55-62% 85rpm\n\nMain Set 3x\n- 8m 73-77% 89rpm\n- 2m 58% 85rpm\n\nCooldown\n- 7m 53% 85rpm"
      },
      {
        id: "T10-D3",
        dayName: "Středa",
        date: "2027-01-20",
        discipline: "rest",
        title: "ODLET DO THAJSKA (Kompresní podkolenky & hydratace)",
        durationMin: 0,
        intensityZone: "Cestování",
        prescription: "Den přesunu. V letadle každou 1,5–2 hod vstát, projít se a protáhnout lýtka a kyčelní flexory (prevence ztuhnutí psoasu z dlouhého sezení).",
        purpose: "Ochrana bederní páteře a žilního návratu při dálkovém letu.",
        intervalsIcu: ""
      },
      {
        id: "T10-D4",
        dayName: "Čtvrtek",
        date: "2027-01-21",
        discipline: "strength",
        title: "Thajsko: Poletová mobilizace beder, kyčlí & lehké Core",
        durationMin: 45,
        intensityZone: "Z1 Mobilita",
        prescription: "Žádné těžké posilování po letu! 45 min plážová/hotelová mobilita: otevření kyčlí (90/90 streč, výpady s rotací hrudníku), kočičí hřbety, lehké břicho (Dead Bug) a procházka naboso v písku.",
        purpose: "Uvolnění zkráceného bedrokyčelního svalu po 12+ hodinách v sedadle letadla.",
        intervalsIcu: ""
      },
      {
        id: "T10-D5",
        dayName: "Pátek",
        date: "2027-01-22",
        discipline: "run",
        title: "Thajsko (Brzy ráno): Aklimatizační klus v teple (35 min)",
        durationMin: 35,
        intensityZone: "Z1–Z2 (řídit výhradně tepem < 134 bpm!)",
        prescription: "Běžet ráno mezi 6:30–7:30 před horkem. 35 min velmi lehký klus podle tepu (TF max 134 bpm – v tropické vlhkosti bude tempo o 20–30 s/km pomalejší, to je naprosto v pořádku!).",
        purpose: "Spuštění tepelné aklimatizace (zvýšení objemu krevní plazmy) bez přehřátí.",
        intervalsIcu: "Warmup\n- 10m 75-80% LTHR\n\nMain Set\n- 25m 80-86% LTHR"
      },
      {
        id: "T10-D6",
        dayName: "Sobota",
        date: "2027-01-23",
        discipline: "swim",
        title: "Thajsko: Plavání v moři / bazénu + nácvik orientace (45 min)",
        durationMin: 45,
        intensityZone: "Z1–Z2",
        prescription: "45 min pohodové plavání v moři nebo hotelovém bazénu (cca 1200–1500 m rozdělených na úseky po 200–300 m). V moři každých 8–10 záběrů nacvičovat 'sighting' – " +
          "krátký pohled vpřed nad hladinu pro orientaci na bójku spojený s výdechem do strany (nezvedat celou hruď, aby nepadaly nohy a nebolela bedra!).",
        purpose: "Zlatá příležitost trénovat orientaci v moři přímo pro zářijový Ironman v Cervii!",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nMain Set 5x\n- 250mtr Z2 Pace\n- 30s Rest"
      },
      {
        id: "T10-D7",
        dayName: "Neděle",
        date: "2027-01-24",
        discipline: "run",
        title: "Thajsko (Ráno): Pobřežní klus do 40 min v Z2",
        durationMin: 40,
        intensityZone: "Z2 (TF < 135 bpm)",
        prescription: "40 min ranní klus po rovině (nikoliv v hlubokém nakloněném písku, aby netrpěly achilovky a bedra!). Po doběhu 10 min koupání v moři.",
        purpose: "Udržení běžecké frekvence s nulovým stresem na pohybový aparát.",
        intervalsIcu: "Warmup\n- 10m 75-80% LTHR\n\nMain Set\n- 30m 82-87% LTHR"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // T11 (25. 1. – 31. 1. 2027) | Fáze 1 – Dovolená Thajsko (Plný týden v teple)
  // --------------------------------------------------------------------------
  {
    week: 11,
    code: "T11",
    startDate: "2027-01-25",
    endDate: "2027-01-31",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Dovolená",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: true,
    hours: { total: 4.5, swim: 1.75, bike: 0.0, run: 2.0, strength: 0.75 },
    focus: "DOVOLENÁ THAJSKO (plný týden): Udržovací režim bez stresu – 3× plavání v moři/bazénu (celkem ~3,5–4 km), 3× ranní klus 40 min a prohřátí/mobilizace zad.",
    days: [
      {
        id: "T11-D1",
        dayName: "Pondělí",
        date: "2027-01-25",
        discipline: "swim",
        title: "Thajsko: Ranní moře / bazén – uvolněný kraul (35 min)",
        durationMin: 35,
        intensityZone: "Z1–Z2",
        prescription: "35 min klidné plavání (cca 1100–1200 m). Soustředit se na uvolněnou krční páteř, dlouhý skluz a v moři na splývání se slanou vodou.",
        purpose: "Slaná voda nadnáší podobně jako neopren – ideální pro zafixování vysoké polohy pánve.",
        intervalsIcu: "Main Set 4x\n- 300mtr Z2 Pace\n- 30s Rest"
      },
      {
        id: "T11-D2",
        dayName: "Úterý",
        date: "2027-01-26",
        discipline: "run",
        title: "Thajsko (Ráno): Lehký klus 40 min + 4×20 s rovinky",
        durationMin: 40,
        intensityZone: "Z2 (TF < 136 bpm)",
        prescription: "35 min lehký ranní běh v Z2 + 4×20 s svižné rovinky s vysokou kadencí.",
        purpose: "Udržení neuromuskulární pružnosti v teplém klimatu.",
        intervalsIcu: "Warmup\n- 10m 75-80% LTHR\n\nMain Set\n- 25m 82-88% LTHR\n\nMain Set 4x\n- 20s 94% LTHR\n- 40s 78% LTHR"
      },
      {
        id: "T11-D3",
        dayName: "Středa",
        date: "2027-01-27",
        discipline: "swim",
        title: "Thajsko: Souvislé plavání v moři / bazénu (35 min)",
        durationMin: 35,
        intensityZone: "Z2",
        prescription: "Rozplavání 200 m -> 2×500 m souvisle kraul v Z2 s nácvikem orientace (pauza 1 min mezi pětistovkami) -> 100 m vyplavání.",
        purpose: "Dvě souvislé pětistovky v otevřené vodě dodají obrovské sebevědomí pro triatlonovou sezónu.",
        intervalsIcu: "Warmup\n- 200mtr Z1 Pace\n\nMain Set 2x\n- 500mtr Z2 Pace\n- 60s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T11-D4",
        dayName: "Čtvrtek",
        date: "2027-01-28",
        discipline: "strength",
        title: "Thajsko: Plážové Core, stabilita kyčlí & Thajská masáž",
        durationMin: 45,
        intensityZone: "Z1 Core & Mobilita",
        prescription: "45 min cvičení s vlastní vahou ve stínu (plank, boční plank, mosty, výpady, mobilita hrudníku). Doporučeno doplnit jemnou thajskou masáží (upozornit masérku na šetření bederní páteře – netlačit koleny do prohnutí v bedrech!).",
        purpose: "Hluboká regenerace měkkých tkání v teple.",
        intervalsIcu: ""
      },
      {
        id: "T11-D5",
        dayName: "Pátek",
        date: "2027-01-29",
        discipline: "run",
        title: "Thajsko (Ráno): Klidný ranní běh 40 min",
        durationMin: 40,
        intensityZone: "Z2 (TF < 136 bpm)",
        prescription: "40 min pohodový ranní běh v Z2 před snídaní. Důkladně doplnit tekutiny a elektrolyty.",
        purpose: "Konzistence běžeckého návyku bez únavy.",
        intervalsIcu: "Warmup\n- 10m 75-80% LTHR\n\nMain Set\n- 30m 82-88% LTHR"
      },
      {
        id: "T11-D6",
        dayName: "Sobota",
        date: "2027-01-30",
        discipline: "swim",
        title: "Thajsko: Delší plavání v moři ~1400 m (35 min)",
        durationMin: 35,
        intensityZone: "Z2",
        prescription: "35 min plynulé plavání v moři nebo bazénu (např. 1000 m v kuse v naprosté pohodě + 4×100 m).",
        purpose: "Vyplavat v klidu kilometr v kuse bez zadýchání.",
        intervalsIcu: "Main Set\n- 1000mtr Z2 Pace\n- 60s Rest\n\nMain Set 4x\n- 100mtr Z2 Pace\n- 20s Rest"
      },
      {
        id: "T11-D7",
        dayName: "Neděle",
        date: "2027-01-31",
        discipline: "run",
        title: "Thajsko (Ráno): Rozlučkový tropický klus 40 min",
        durationMin: 40,
        intensityZone: "Z2 (TF < 136 bpm)",
        prescription: "40 min lehký ranní klus v Z2 + protažení na pláži.",
        purpose: "Příjemné zakončení plného týdne v Thajsku před návratem do Evropy.",
        intervalsIcu: "Warmup\n- 10m 75-80% LTHR\n\nMain Set\n- 30m 82-88% LTHR"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // T12 (1. 2. – 7. 2. 2027) | Fáze 1 – Návrat z Thajska (2. 2.) & Přechod do Fáze 2
  // --------------------------------------------------------------------------
  {
    week: 12,
    code: "T12",
    startDate: "2027-02-01",
    endDate: "2027-02-07",
    phaseId: 1,
    phaseName: "Fáze 1: Zimní aerobní báze & TT adaptace",
    type: "Regenerační",
    blockStatus: "Detailní aktivní blok (T01–T12)",
    isRecovery: true,
    hours: { total: 4.5, swim: 1.25, bike: 1.25, run: 1.25, strength: 0.75 },
    focus: "Návrat z Thajska (2. 2. 2027), srovnání časového posunu (jet-lag) a teplotního skoku (+30 °C -> 0 °C). Pozvolný návrat do bazénu, na trenažér a k nedělnímu běhu před startem maratonské Fáze 2.",
    days: [
      {
        id: "T12-D1",
        dayName: "Pondělí",
        date: "2027-02-01",
        discipline: "swim",
        title: "Thajsko (Před odletem): Poslední vykoupání a vyplavání 30 min",
        durationMin: 30,
        intensityZone: "Z1–Z2",
        prescription: "30 min lehké plavání v moři/bazénu (~1000 m) a protažení před cestou na letiště.",
        purpose: "Uvolnění zad před zpátečním letem.",
        intervalsIcu: "Main Set\n- 1000mtr Z1-Z2 Pace"
      },
      {
        id: "T12-D2",
        dayName: "Úterý",
        date: "2027-02-02",
        discipline: "rest",
        title: "NÁVRAT Z THAJSKA DO ČR (Aklimatizace & spánek)",
        durationMin: 0,
        intensityZone: "Cestování",
        prescription: "Přílet do ČR, lehká procházka na čerstvém vzduchu, 15 min uvolnění kyčlí a dřívější ulehnutí ke spánku.",
        purpose: "Rychlá resynchronizace cirkadiánního rytmu a ochrana imunity při přechodu do chladu.",
        intervalsIcu: ""
      },
      {
        id: "T12-D3",
        dayName: "Středa",
        date: "2027-02-03",
        discipline: "rest",
        title: "Volno po cestě (Sledování HRV a klidové TF)",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Volný den na srovnání spánku. Večer 15 min pěnový válec a mobilita.",
        purpose: "Zamezit onemocnění dýchacích cest v prvních 48 hodinách po návratu z tropů.",
        intervalsIcu: ""
      },
      {
        id: "T12-D4",
        dayName: "Čtvrtek",
        date: "2027-02-04",
        discipline: "strength",
        title: "Fixní slot: Návratový Core & Mobilita beder (45 min)",
        durationMin: 45,
        intensityZone: "Core + Z2",
        prescription: "45 min kontrolovaný kruhový trénink se střední intenzitou (core, aktivace hýždí, výpady, mobilita páteře).",
        purpose: "Znovuzapojení silového stereotypu po dovolené.",
        intervalsIcu: ""
      },
      {
        id: "T12-D5",
        dayName: "Pátek",
        date: "2027-02-05",
        discipline: "swim",
        title: "Bazén 25m: Návrat do 25m bazénu – technika a Z2 (1350 m)",
        durationMin: 45,
        intensityZone: "Z2",
        prescription: "Rozplavání 250 m -> 4×50 m technika -> 5×200 m kraul v Z2 (pauza 25 s) -> 100 m vyplavání.",
        purpose: "Přenos uvolněného záběru z moře zpět do 25m bazénu.",
        intervalsIcu: "Warmup\n- 250mtr Z1 Pace\n\nDrill Set 4x\n- 50mtr Z1 Pace\n- 20s Rest\n\nMain Set 5x\n- 200mtr Z2 Pace\n- 25s Rest\n\nCooldown\n- 100mtr Z1 Pace"
      },
      {
        id: "T12-D6",
        dayName: "Sobota",
        date: "2027-02-06",
        discipline: "bike",
        title: "Trenažér: Znovuzapojení wattů Z2 + 4×6 min aero (75 min)",
        durationMin: 75,
        intensityZone: "Z2 (140–160 W)",
        prescription: "15 min rozjetí 115–135 W -> 50 min Z2 na 145–158 W (67–73 % FTP, v tom 4×6 min v TT aero pozici s kadencí 88–90 rpm) -> 10 min vyjetí 115 W.",
        purpose: "Oživení aero pozice a wattové odezvy po dvoutýdenní pauze od kola.",
        intervalsIcu: "Warmup\n- 15m 53-62% 85rpm\n\nMain Set\n- 50m 67-73% 89rpm\n\nCooldown\n- 10m 53% 85rpm"
      },
      {
        id: "T12-D7",
        dayName: "Neděle",
        date: "2027-02-07",
        discipline: "run",
        title: "Nedělní aklimatizační běh v chladu (~11 km)",
        durationMin: 75,
        intensityZone: "Z2 (126–136 bpm)",
        prescription: "75 min plynulý běh v Z2 (TF 126–136 bpm, teplé oblečení v oblasti beder, dýchání přes nákrčník při mrazu).",
        purpose: "Bezpečné uzavření Fáze 1 a příprava na start jarního maratonského buildu od pondělí 8. 2. 2027.",
        intervalsIcu: "Warmup\n- 10m 75-82% LTHR\n\nMain Set\n- 60m 83-88% LTHR\n\nCooldown\n- 5m 75-80% LTHR"
      }
    ]
  }
);

// ============================================================================
// T13–T48: Kompletní rozpis týdnů a denních tréninků (Fáze 2 až Fáze 6)
// ============================================================================
(function appendRemainingWeeks() {
  const specs = [
    // --- FÁZE 2: Jarní maratonský build (T13–T24 | 8. 2. – 2. 5. 2027) ---
    {
      week: 13, startDate: "2027-02-08", endDate: "2027-02-14", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Build", isRecovery: false,
      hours: { total: 6.25, swim: 1.5, bike: 1.75, run: 2.0, strength: 1.0 },
      focus: "Start maratonské přípravy: 2× běh v týdnu (úterní/středeční tempový běh 45 min + nedělní dlouhý běh 105 min / 16 km), 2× plavání (Út+Pá) a sobotní TT trenažér.",
      wedRunMin: 45, wedRunTitle: "Běh: Maratonské tempo 3×8 min v Z3 (6:20–6:24/km)",
      wedRunDesc: "10 min rozklus Z1/Z2 -> 3× (8 min v cílovém maratonském tempu 6:20–6:24/km, TF 139–144 bpm + 2 min meziklus) -> 5 min výklus.",
      thuStrengthMin: 60, thuStrengthDesc: "Kruhový trénink: Core, kompenzace beder, excentrická síla lýtek a hýždí + HIIT.",
      swim1Min: 45, swim1Dist: 1450, swim1Focus: "Technika + 6×150 m v Z2 (tempo ~2:28/100m)",
      swim2Min: 45, swim2Dist: 1500, swim2Focus: "Vytrvalost 3×300 m s piškotem + 4×50 m Z3",
      satBikeMin: 105, satBikeTitle: "Trenažér / Silnice: Vytrvalost Z2 + 4×8 min v TT aero pozici",
      satBikeDesc: "15 min rozjetí -> 75 min Z2 (145–160 W, v tom 4×8 min v TT hrazdě při 90 rpm) -> 15 min vyjetí + mobilita psoasu.",
      sunRunMin: 75, sunRunDistKm: 16, sunRunTitle: "Nedělní dlouhý běh 16 km v čisté Z2",
      sunRunDesc: "Plynulý dlouhý běh (75 min + příp. prodloužení dle tempa na 16 km) v Z2 (TF 128–137 bpm, ~6:40/km)."
    },
    {
      week: 14, startDate: "2027-02-15", endDate: "2027-02-21", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Build", isRecovery: false,
      hours: { total: 6.75, swim: 1.5, bike: 1.75, run: 2.5, strength: 1.0 },
      focus: "Prodloužení nedělního dlouhého běhu na 18–19 km (105 min), ve středu tempové intervaly 3×10 min v maratonském tempu.",
      wedRunMin: 45, wedRunTitle: "Běh: Maratonské tempo 3×10 min v Z3 (6:20/km)",
      wedRunDesc: "10 min rozklus -> 3× (10 min v Z3 tempu 6:18–6:24/km, TF 140–145 bpm + 2 min klus) -> 3 min výklus.",
      thuStrengthMin: 60, thuStrengthDesc: "Kruhový trénink: Core, stabilita kyčlí pro dlouhé běhy a kompenzace beder.",
      swim1Min: 45, swim1Dist: 1500, swim1Focus: "CSS stovky 8×100 m (pauza 20 s) + technika",
      swim2Min: 45, swim2Dist: 1550, swim2Focus: "Pyramida 100–200–300–200–100 m v Z2",
      satBikeMin: 105, satBikeTitle: "Trenažér: Sweet Spot 3×10 min + Aero adaptace",
      satBikeDesc: "15 min rozjetí -> 3× (10 min Sweet Spot 175–185 W + 4 min Z1) -> 30 min Z2 v aero pozici -> 18 min vyjetí.",
      sunRunMin: 105, sunRunDistKm: 18.5, sunRunTitle: "Nedělní dlouhý běh 18,5 km v Z2",
      sunRunDesc: "105 min souvislý běh v Z2 (TF 128–137 bpm, ~6:40/km), gel na 45. a 80. minutě."
    },
    {
      week: 15, startDate: "2027-02-22", endDate: "2027-02-28", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Build", isRecovery: false,
      hours: { total: 7.25, swim: 1.5, bike: 1.75, run: 3.0, strength: 1.0 },
      focus: "Vrchol prvního jarního bloku: nedělní běh 21 km (125 min) se závěrem v maratonském tempu, středeční prahový běh 55 min.",
      wedRunMin: 55, wedRunTitle: "Běh: Půlmaratonské/maratonské úseky 4×8 min (6:00–6:15/km)",
      wedRunDesc: "12 min rozklus -> 4× (8 min živé tempo Z3/Z4 6:00–6:15/km + 2 min klus) -> 5 min výklus.",
      thuStrengthMin: 60, thuStrengthDesc: "Kruhový trénink: Core, kompenzace beder & HIIT.",
      swim1Min: 45, swim1Dist: 1550, swim1Focus: "10×100 m na CSS tempu + 200 m piškot",
      swim2Min: 45, swim2Dist: 1600, swim2Focus: "Souvisle 1000 m v Z2 + 4×50 m technika",
      satBikeMin: 105, satBikeTitle: "Kolo (Trenažér / Venku): Kompenzační Z2 kadence 90 rpm",
      satBikeDesc: "105 min plynulá jízda v Z2 (145–158 W) s vysokou kadencí pro ušetření nohou na nedělní 21km běh.",
      sunRunMin: 125, sunRunDistKm: 21, sunRunTitle: "Nedělní dlouhý běh 21 km (poslední 3 km v 6:20/km)",
      sunRunDesc: "105 min v čisté Z2 (~6:42/km) + posledních 20 min v cílovém maratonském tempu Z3 (6:20–6:24/km)."
    },
    {
      week: 16, startDate: "2027-03-01", endDate: "2027-03-07", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Regenerační", isRecovery: true,
      hours: { total: 5.0, swim: 1.5, bike: 1.25, run: 1.5, strength: 0.75 },
      focus: "Regenerační týden (cyklus 3:1): odlehčení šlach a beder po prvním půlmaratonském dlouhém běhu.",
      wedRunMin: 30, wedRunTitle: "Lehký regenerační klus Z1/Z2 + 4×20 s rovinky",
      wedRunDesc: "30 min velmi lehký klus v Z1/Z2 (TF < 132 bpm) + 4×20 s uvolněné rovinky.",
      thuStrengthMin: 45, thuStrengthDesc: "Odlehčený čtvrtek: čisté Core, dech a mobilita kyčlí (bez HIIT).",
      swim1Min: 45, swim1Dist: 1350, swim1Focus: "Technika dýchání a skluzu + 5×150 m Z2",
      swim2Min: 45, swim2Dist: 1400, swim2Focus: "3×300 m s piškotem v Z2",
      satBikeMin: 75, satBikeTitle: "Trenažér: Lehké vytočení v Z2 + 3×6 min aero",
      satBikeDesc: "75 min lehká jízda 135–150 W, kadence 90 rpm, po jízdě 10 min strečink.",
      sunRunMin: 60, sunRunDistKm: 9.5, sunRunTitle: "Lehký nedělní běh 60 min v Z2",
      sunRunDesc: "60 min klidný běh v Z2 (TF 126–134 bpm) s pocitem lehkých nohou."
    },
    {
      week: 17, startDate: "2027-03-08", endDate: "2027-03-14", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Build", isRecovery: false,
      hours: { total: 7.25, swim: 1.5, bike: 1.75, run: 3.0, strength: 1.0 },
      focus: "Druhá vlna maratonského buildu: nedělní dlouhý běh 24 km (145 min) a středeční souvislé maratonské tempo.",
      wedRunMin: 55, wedRunTitle: "Běh: Souvislých 30 min v maratonském tempu (6:20/km)",
      wedRunDesc: "15 min rozklus Z2 -> 30 min souvisle v cílovém maratonském tempu 6:18–6:24/km (TF 139–144 bpm) -> 10 min výklus.",
      thuStrengthMin: 60, thuStrengthDesc: "Kruhový trénink: Core, kompenzace beder & HIIT.",
      swim1Min: 45, swim1Dist: 1550, swim1Focus: "6×200 m na pomezí Z2/Z3 (pauza 25 s)",
      swim2Min: 45, swim2Dist: 1600, swim2Focus: "Technika + 2×600 m v Z2",
      satBikeMin: 105, satBikeTitle: "Kolo: Vytrvalost Z2 + 3×10 min v TT aero pozici",
      satBikeDesc: "105 min jízda v Z2 (148–160 W), z toho 3×10 min v TT hrazdě.",
      sunRunMin: 125, sunRunDistKm: 24, sunRunTitle: "Nedělní dlouhý běh 24 km v Z2 (výživa 60 g sacharidů/h)",
      sunRunDesc: "Souvislý vytrvalostní běh 24 km v Z2 (TF 128–137 bpm). Otestovat přesný maratonský nutriční protokol (gel každých 30 min)."
    },
    {
      week: 18, startDate: "2027-03-15", endDate: "2027-03-21", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Build", isRecovery: false,
      hours: { total: 7.75, swim: 1.5, bike: 1.75, run: 3.5, strength: 1.0 },
      focus: "Těžký maratonský týden: nedělní dlouhý běh 27 km (160 min) a středeční intervaly v půlmaratonském tempu (5:40/km) jako příprava na Generali Půlmaraton Praha.",
      wedRunMin: 50, wedRunTitle: "Běh: Půlmaratonské úseky 5×6 min (5:38–5:42/km)",
      wedRunDesc: "10 min rozklus -> 5× (6 min v cílovém tempu Půlmaratonu Praha 5:40/km, TF 146–152 bpm + 2 min meziklus) -> 5 min výklus.",
      thuStrengthMin: 60, thuStrengthDesc: "Kruhový trénink: Core & excentrická síla zadního řetězce.",
      swim1Min: 45, swim1Dist: 1600, swim1Focus: "12×100 m CSS tempo (pauza 20 s)",
      swim2Min: 45, swim2Dist: 1600, swim2Focus: "4×300 m v Z2 (střídat kraul a piškot)",
      satBikeMin: 105, satBikeTitle: "Kolo: Lehká kompenzační jízda Z2 před 27km během",
      satBikeDesc: "105 min v Z2 (140–152 W, kadence 90 rpm) bez svalového zakyselení.",
      sunRunMin: 160, sunRunDistKm: 27, sunRunTitle: "Nedělní dlouhý běh 27 km v Z2 (2:40 hod)",
      sunRunDesc: "Klíčový vytrvalostní běh 27 km v Z2 (TF 128–138 bpm, ~6:40–6:45/km). Hlídat držení pánve v poslední půlhodině."
    },
    {
      week: 19, startDate: "2027-03-22", endDate: "2027-03-28", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Regenerační", isRecovery: true,
      hours: { total: 5.25, swim: 1.5, bike: 1.25, run: 1.75, strength: 0.75 },
      focus: "Regenerační týden před dvojvíkendem Půlmaraton Praha + Karlštejn: vylehčení nohou a uvolnění beder.",
      wedRunMin: 35, wedRunTitle: "Běh: Lehký klus 35 min + 5×100 m v tempu půlmaratonu",
      wedRunDesc: "25 min Z2 + 5×100 m v tempu 5:40/km s meziklusem.",
      thuStrengthMin: 45, thuStrengthDesc: "Odlehčené Core & Mobilita beder před závodním týdnem.",
      swim1Min: 45, swim1Dist: 1450, swim1Focus: "Technika + 6×150 m Z2",
      swim2Min: 45, swim2Dist: 1500, swim2Focus: "Souvisle 800 m s piškotem + 4×50 m",
      satBikeMin: 75, satBikeTitle: "Kolo: 75 min Z2 na vysoké kadenci",
      satBikeDesc: "75 min plynule v Z2 (145 W, 90 rpm).",
      sunRunMin: 70, sunRunDistKm: 11, sunRunTitle: "Nedělní svěží běh 11 km (v tom 2×10 min po 5:41/km)",
      sunRunDesc: "30 min Z2 -> 2× (10 min v tempu půlmaratonu 5:41/km + 3 min klus) -> 14 min výklus."
    },
    {
      week: 20, startDate: "2027-03-29", endDate: "2027-04-04", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Závodní", isRecovery: false,
      eventId: "evt-hm-praha",
      hours: { total: 6.25, swim: 1.5, bike: 1.25, run: 2.75, strength: 0.75 },
      focus: "ZÁVOD (Priorita C): Sobota 3. 4. 2027 – Generali Půlmaraton Praha (cíl 2:00:00, tempo 5:41/km). Pouze 2 dny lehkého odpočinku předem, v neděli lehká kompenzační jízda na kole.",
      wedRunMin: 35, wedRunTitle: "Předzávodní rozběhání 35 min (3×2 min v tempu 5:40/km)",
      wedRunDesc: "20 min Z1/Z2 -> 3× (2 min v 5:40/km + 2 min klus) -> 3 min výklus.",
      thuStrengthMin: 45, thuStrengthDesc: "Předzávodní čtvrtek: Pouze Core a mobilita kyčlí (BEZ HIIT a bez dřepů!).",
      swim1Min: 45, swim1Dist: 1500, swim1Focus: "Plynulé plavání v Z2 (šetřit nohy)",
      swim2Min: 45, swim2Dist: 1200, swim2Focus: "Páteční uvolnění ve vodě s piškotem (bez kopání nohama)",
      satBikeMin: 130, satBikeDiscipline: "race", satBikeTitle: "ZÁVOD: Generali Půlmaraton Praha 21,1 km (Cíl 2:00:00)",
      satBikeDesc: "10 min rozklus -> ZÁVOD 21,1 km (cíl 2:00:00, tempo 5:41/km, TF Z4 146–152 bpm; prvních 5 km nepřepálit pod 5:40/km, gel na 7. a 14. km).",
      sunRunMin: 75, sunRunDiscipline: "bike", sunRunDistKm: 30, sunRunTitle: "Nedělní kompenzační vyjetí na kole Z1 (75 min)",
      sunRunDesc: "Místo nedělního běhu 75 min velmi lehká regenerační jízda na kole v Z1 (115–130 W, kadence 90 rpm) pro vyplavení metabolitů po půlmaratonu."
    },
    {
      week: 21, startDate: "2027-04-05", endDate: "2027-04-11", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Závodní", isRecovery: false,
      eventId: "evt-karlstejn",
      hours: { total: 6.75, swim: 1.5, bike: 2.0, run: 2.5, strength: 0.75 },
      focus: "ZÁVOD (Priorita C): Sobota 10. 4. 2027 – Běhej lesy Karlštejn STRIKTNĚ 18 km v čisté Z2 (šetření nohou a beder 3 týdny před Maratonem Praha!).",
      wedRunMin: 30, wedRunTitle: "Regenerační klus po půlmaratonu (30 min v Z1/Z2)",
      wedRunDesc: "30 min velmi měkký klus po trávě/lesní cestě (TF < 130 bpm).",
      thuStrengthMin: 45, thuStrengthDesc: "Core, stabilita kotníků a kompenzace beder.",
      swim1Min: 45, swim1Dist: 1500, swim1Focus: "Regenerační plavání po půlmaratonu v Z2",
      swim2Min: 45, swim2Dist: 1400, swim2Focus: "Uvolněných 4×250 m kraul v Z2",
      satBikeMin: 120, satBikeDiscipline: "race", satBikeTitle: "ZÁVOD (Tréninkově v Z2): Běhej lesy Karlštejn 18 km",
      satBikeDesc: "STRIKTNĚ trasa 18 km (ne 30 km!). Běžet jako kvalitní kopcovitý vytrvalostní běh v Z2 (TF 128–138 bpm). Do prudkých kopců mezichůze, v sebězích šetřit stehna a bedra.",
      sunRunMin: 120, sunRunDiscipline: "bike", sunRunDistKm: 52, sunRunTitle: "Nedělní venkovní švih na kole v Z2 (2:00 hod)",
      sunRunDesc: "2:00 hod plynulá venkovní jízda v Z2 (140–158 W) po sobotním Karlštejnu."
    },
    {
      week: 22, startDate: "2027-04-12", endDate: "2027-04-18", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Build", isRecovery: false,
      hours: { total: 8.0, swim: 1.5, bike: 1.75, run: 3.75, strength: 1.0 },
      focus: "VRCHOL JARNÍHO MARATONSKÉHO OBJEMU (8,0 hod): Nedělní generálkový dlouhý běh 31 km (3:05 hod) přesně 14 dní před Maratonem Praha!",
      wedRunMin: 40, wedRunTitle: "Běh: Maratonské tempo 2×10 min (6:20/km)",
      wedRunDesc: "10 min rozklus -> 2× (10 min v tempu 6:20–6:24/km + 3 min klus) -> 4 min výklus.",
      thuStrengthMin: 60, thuStrengthDesc: "Poslední plný kruhový trénink před maratonem (Core & bedra).",
      swim1Min: 45, swim1Dist: 1550, swim1Focus: "8×150 m v Z2/Z3 + technika",
      swim2Min: 45, swim2Dist: 1600, swim2Focus: "Souvisle 1000 m v Z2 + 4×50 m",
      satBikeMin: 105, satBikeTitle: "Kolo: Lehkých 105 min Z1/Z2 před královským během",
      satBikeDesc: "105 min lehká jízda v Z1/Z2 (135–150 W, vysoká kadence) – šetřit glykogen na nedělních 31 km.",
      sunRunMin: 185, sunRunDistKm: 31, sunRunTitle: "KRÁLOVSKÝ DLOUHÝ BĚH: 31 km (posledních 5 km v 6:24/km)",
      sunRunDesc: "26 km v klidné Z2 (~6:42/km, TF 130–136 bpm) + posledních 5 km zrychlit na cílové maratonské tempo 6:24/km. Kompletní test maratonských bot, ponožek a 4 gelů."
    },
    {
      week: 23, startDate: "2027-04-19", endDate: "2027-04-25", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Taper", isRecovery: true,
      hours: { total: 5.5, swim: 1.5, bike: 1.5, run: 1.75, strength: 0.75 },
      focus: "Taper 1 (7–10 dní před Maratonem Praha): pokles běžeckého objemu o 45 %, zachování krátkých úseků v tempu 6:24/km.",
      wedRunMin: 35, wedRunTitle: "Běh: Ladění tempa 3×6 min po 6:24/km",
      wedRunDesc: "10 min rozklus -> 3× (6 min přesně v maratonském tempu 6:24/km + 2 min klus) -> 3 min výklus.",
      thuStrengthMin: 45, thuStrengthDesc: "Taper čtvrtek: Lehké Core a mobilita kyčlí bez svalové únavy.",
      swim1Min: 45, swim1Dist: 1500, swim1Focus: "Plynulé plavání v Z2",
      swim2Min: 45, swim2Dist: 1400, swim2Focus: "Technika + 5×150 m Z2",
      satBikeMin: 90, satBikeTitle: "Kolo: Svěží vyjížďka 90 min v Z2",
      satBikeDesc: "90 min venku nebo na trenažéru v Z2 (145 W, 90 rpm).",
      sunRunMin: 70, sunRunDistKm: 11, sunRunTitle: "Poslední střední běh 11 km (1 týden před maratonem)",
      sunRunDesc: "70 min lehký běh v Z2, v závěru 15 min v maratonském tempu 6:24/km."
    },
    {
      week: 24, startDate: "2027-04-26", endDate: "2027-05-02", phaseId: 2,
      phaseName: "Fáze 2: Jarní maratonský build (Praha 4:30)", type: "Závodní", isRecovery: false,
      eventId: "evt-maraton-praha",
      hours: { total: 6.5, swim: 0.75, bike: 0.5, run: 5.0, strength: 0.25 },
      focus: "HLAVNÍ JARNÍ VRCHOL (Priorita B): Neděle 2. 5. 2027 – Vodafone Maraton Praha (Cíl 4:30:00, tempo 6:24/km). Celý týden maximální šetření nohou, spánek a sacharidová superkompenzace od pátku.",
      wedRunMin: 30, wedRunTitle: "Předmaratonské proběhnutí 30 min (2×1 km po 6:24/km)",
      wedRunDesc: "30 min lehký běh, uprostřed 2×1 km v závodním tempu 6:24/km pro zafixování rytmu.",
      thuStrengthMin: 15, thuStrengthDesc: "Pouze 15 min lehká dechová mobilita beder a kyčlí (žádné posilování!).",
      swim1Min: 45, swim1Dist: 1300, swim1Focus: "Úterní uvolněné plavání s piškotem (1300 m)",
      swim2Min: 0, swim2Dist: 0, swim2Focus: "Pátek VOLNO (vyzvednutí čísla na Expo, nechodit dlouho po městě!)",
      satBikeMin: 30, satBikeTitle: "Sobota: 15 min rozkluš + 15 min mobilita (nebo 30 min lehké protočení)",
      satBikeDesc: "Velmi krátké 15min probuzení nohou s 3×20 s rovinkou, příprava výživy (8 gelů, solné tablety).",
      sunRunMin: 270, sunRunDiscipline: "race", sunRunDistKm: 42.2, sunRunTitle: "ZÁVOD: Vodafone Maraton Praha 42,2 km (Cíl 4:30:00!)",
      sunRunDesc: "HLAVNÍ JARNÍ ZÁVOD! Od 1. kilometru železná kázeň na 6:24/km (TF 138–143 bpm). Půlmaraton za 2:15:00, gel každých 28–30 min, pít na každé občerstvovačce."
    },

    // --- FÁZE 3: Pomaratonová regenerace & Přechod na triatlon (T25–T28 | 3. 5. – 30. 5. 2027) ---
    {
      week: 25, startDate: "2027-05-03", endDate: "2027-05-09", phaseId: 3,
      phaseName: "Fáze 3: Pomaratonová regenerace & Přechod na Tri", type: "Regenerační", isRecovery: true,
      hours: { total: 4.0, swim: 1.5, bike: 2.0, run: 0.0, strength: 0.5 },
      focus: "1. týden po Maratonu Praha: NULOVÝ BĚH (ochrana mikrotraumat ve svalech, šlachách a bedrech). Pouze uvolněné plavání a lehké vytočení nohou na kole v Z1.",
      wedRunMin: 0, wedRunTitle: "Volno od běhu (Procházka & sauna/vířivka)",
      wedRunDesc: "Žádný běh! Regenerace svalových vláken po maratonu.",
      thuStrengthMin: 30, thuStrengthDesc: "30 min jemná mobilita kyčlí, psoasu a pěnový válec.",
      swim1Min: 45, swim1Dist: 1300, swim1Focus: "Regenerační vyplavání s piškotem v Z1/Z2",
      swim2Min: 45, swim2Dist: 1400, swim2Focus: "Uvolněný kraul a znak v Z1/Z2",
      satBikeMin: 60, satBikeTitle: "Kolo venku: 60 min rovina v Z1 (115–135 W, kadence 90 rpm)",
      satBikeDesc: "Velmi lehká vyjížďka na silničním kole na čerstvém vzduchu.",
      sunRunMin: 60, sunRunDiscipline: "bike", sunRunDistKm: 25, sunRunTitle: "Nedělní kompenzační vyjížďka na kole 60 min Z1/Z2",
      sunRunDesc: "60 min lehká cyklistika místo běhu."
    },
    {
      week: 26, startDate: "2027-05-10", endDate: "2027-05-16", phaseId: 3,
      phaseName: "Fáze 3: Pomaratonová regenerace & Příprava na L'Etape", type: "Regenerační", isRecovery: true,
      hours: { total: 5.5, swim: 1.5, bike: 2.5, run: 0.75, strength: 0.75 },
      focus: "2. týden po maratonu: středeční kolo na TT speciálu/trenažéru pro udržení aero adaptace, sobotní vyjížďka na SILNIČNÍM KOLE ve zvlněném terénu (~45 km / 450 m převýšení) a nedělní návrat k měkkému 45min klusu.",
      wedRunMin: 45, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT speciál / Trenažér: Udržení aero adaptace (45 min)",
      wedRunDesc: "45 min na TT speciálu nebo trenažéru v Z2 (145–160 W, v tom 4×6 min v aero hrazdě při 88–90 rpm), aby nezmizela adaptace beder na TT posed.",
      thuStrengthMin: 45, thuStrengthDesc: "Kruhový trénink: Návrat ke Core, stabilizaci pánve a mobilitě beder.",
      swim1Min: 45, swim1Dist: 1500, swim1Focus: "Technika orientace (sighting) + 6×150 m Z2",
      swim2Min: 45, swim2Dist: 1550, swim2Focus: "4×300 m v Z2 (tempo ~2:28/100m)",
      satBikeMin: 105, satBikeTitle: "Silniční kolo (Zvlněný terén): 1:45 hod (~45 km / 450 m převýšení)",
      satBikeDesc: "105 min na SILNIČNÍM KOLE ve zvlněném terénu. Řízení dle tepu: roviny Z2 (123–132 bpm), v kopcích plynule do 138 bpm s kadencí 80–85 rpm a občasnou jízdou ze sedla pro uvolnění beder.",
      sunRunMin: 45, sunRunDistKm: 6.5, sunRunTitle: "První pomaratonový běh: 45 min měkký klus v Z1/Z2",
      sunRunDesc: "45 min velmi lehký klus po měkkém lesním povrchu (TF < 133 bpm). Kontrola odezvy achilovek a beder."
    },
    {
      week: 27, startDate: "2027-05-17", endDate: "2027-05-23", phaseId: 3,
      phaseName: "Fáze 3: Pomaratonová regenerace & Příprava na L'Etape", type: "Build", isRecovery: false,
      hours: { total: 7.0, swim: 1.5, bike: 3.25, run: 1.25, strength: 1.0 },
      focus: "Progrese ke kopcovité L'Etape: středeční aero trénink na TT speciálu (60 min) a sobotní kopcovitější švih na SILNIČNÍM KOLE (~60–65 km / 650 m převýšení) + 15 min přechodový Brick běh.",
      wedRunMin: 60, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT speciál / Trenažér: 4×8 min v aero pozici (60 min)",
      wedRunDesc: "60 min jízda na TT speciálu/trenažéru s wattmetrem: 4×8 min v aero hrazdě na 160–170 W (74–78 % FTP, kadence 88–90 rpm) pro udržení triatlonového posedu.",
      thuStrengthMin: 60, thuStrengthDesc: "Plný čtvrteční kruhový trénink: Core, kompenzace beder & HIIT.",
      swim1Min: 45, swim1Dist: 1600, swim1Focus: "CSS stovky 10×100 m + orientace",
      swim2Min: 45, swim2Dist: 1650, swim2Focus: "3×400 m kraul v Z2 (pauza 30 s)",
      satBikeMin: 135, satBikeTitle: "Silniční kolo (Kopce ~62 km / 650 m): 2:15 hod + 15 min Brick běh",
      satBikeDesc: "2:15 hod na SILNIČNÍM KOLE v kopcovitém terénu (~62 km, převýšení ~650 m). Řízení dle tepu: roviny Z2 (123–132 bpm), stoupání plynule Z3 (133–141 bpm, kadence 75–85 rpm, pravidelně ze sedla kvůli ochraně beder) + ihned 15 min přechodový běh!",
      sunRunMin: 75, sunRunDistKm: 11, sunRunTitle: "Nedělní běh 60 min Z2 (+ 15 min sobotní Brick běh)",
      sunRunDesc: "Sobotní 15min Brick běh po silničním kole + v neděli 60 min samostatný aerobní běh v Z2."
    },
    {
      week: 28, startDate: "2027-05-24", endDate: "2027-05-30", phaseId: 3,
      phaseName: "Fáze 3: Pomaratonová regenerace & Příprava na L'Etape", type: "Regenerační", isRecovery: true,
      hours: { total: 5.5, swim: 1.5, bike: 2.25, run: 1.0, strength: 0.75 },
      focus: "Regenerační týden před červnovým blokem vrcholícím závodem L'Etape Czech Republic: středeční lehký TT aero trénink a sobotní zvlněná vyjížďka na silničním kole.",
      wedRunMin: 45, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT speciál / Trenažér: Lehká aero adaptace 45 min v Z1/Z2",
      wedRunDesc: "45 min uvolněná jízda na TT kole (135–150 W, kadence 90 rpm, 3×6 min v hrazdě).",
      thuStrengthMin: 45, thuStrengthDesc: "Odlehčené Core & Mobilita kyčlí a hrudníku.",
      swim1Min: 45, swim1Dist: 1450, swim1Focus: "Technika + 5×200 m Z2",
      swim2Min: 45, swim2Dist: 1500, swim2Focus: "Plavání v neoprenu (bazén nebo první otevřená voda)",
      satBikeMin: 90, satBikeTitle: "Silniční kolo (Zvlněný profil): 90 min (~38 km / 400 m) v Z2",
      satBikeDesc: "90 min klidná vyjížďka na silničním kole podle tepu (120–132 bpm), nácvik lehkých převodů v kopcích (80–85 rpm) a jízdy ze sedla.",
      sunRunMin: 60, sunRunDistKm: 9, sunRunTitle: "Nedělní lehký běh 60 min v Z2",
      sunRunDesc: "60 min klidný běh v Z2 (TF 126–135 bpm)."
    },

    // --- FÁZE 4: L'Etape vrchol, přechod plně na TT speciál & 70.3 HK (T29–T39 | 31. 5. – 15. 8. 2027) ---
    {
      week: 29, startDate: "2027-05-31", endDate: "2027-06-06", phaseId: 4,
      phaseName: "Fáze 4: L'Etape vrchol, TT Build & Generálka 70.3 HK", type: "Build", isRecovery: false,
      hours: { total: 8.25, swim: 1.75, bike: 4.5, run: 1.0, strength: 1.0 },
      focus: "Specifická vrchařská příprava na L'Etape (1. část): středeční aero trénink na TT speciálu (60 min) a sobotní dlouhá kopcovitá jízda na SILNIČNÍM KOLE (3:30 hod, ~85 km a ~950 m převýšení).",
      wedRunMin: 60, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT speciál / Trenažér: 3×10 min v aero pozici (165–175 W)",
      wedRunDesc: "15 min rozjetí -> 3× (10 min v TT aero pozici na 165–175 W / 76–81 % FTP při 88–90 rpm + 3 min Z1) -> 6 min vyjetí. Udržení specifické triatlonové adaptace.",
      thuStrengthMin: 60, thuStrengthDesc: "Kruhový trénink: Core, stabilita beder & silová vytrvalost.",
      swim1Min: 45, swim1Dist: 1650, swim1Focus: "Bazén: 8×200 m v Z2/Z3 (pauza 20 s)",
      swim2Min: 60, swim2Dist: 1800, swim2Focus: "Otevřená voda v neoprenu: 3×600 m s orientací na bójku",
      satBikeMin: 210, satBikeTitle: "Silniční kolo (Kopcovitý profil L'Etape): 3:30 hod (~85 km / ~950 m převýšení)",
      satBikeDesc: "3:30 hod na SILNIČNÍM KOLE v kopcovitém terénu (~85 km, ~950 m převýšení). Primární řízení podle tepu: roviny Z2 (123–132 bpm), stoupání plynule Z3 (133–141 bpm, strop v prudkých pasážích 150 bpm; alt. s wattmetrem 175–190 W). Kadence v kopcích 75–85 rpm, pravidelná jízda ze sedla pro ochranu beder, výživa 75 g sacharidů/hod.",
      sunRunMin: 60, sunRunDistKm: 9, sunRunTitle: "Nedělní kompenzační běh 60 min v čisté Z2",
      sunRunDesc: "60 min uvolněný aerobní běh v Z2 (TF 126–135 bpm) po sobotní kopcovité jízdě."
    },
    {
      week: 30, startDate: "2027-06-07", endDate: "2027-06-13", phaseId: 4,
      phaseName: "Fáze 4: L'Etape vrchol, TT Build & Generálka 70.3 HK", type: "Build", isRecovery: false,
      hours: { total: 8.75, swim: 1.75, bike: 4.75, run: 1.25, strength: 1.0 },
      focus: "Generálkový týden 7 dní před L'Etape Czech Republic: ve středu 60 min TT speciál v hrazdě, v sobotu klíčová vrchařská prověrka na SILNIČNÍM KOLE (~90–95 km a ~1 050 m převýšení, 3:45 hod).",
      wedRunMin: 60, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT speciál / Trenažér: 4×8 min Sweet Spot v hrazdě (172–182 W)",
      wedRunDesc: "60 min na TT speciálu: 4×8 min v aero pozici na 172–182 W při kadenci 90 rpm, aby aero adaptace plynule pokračovala.",
      thuStrengthMin: 60, thuStrengthDesc: "Kruhový trénink: Core, kompenzace beder & aktivace hýždí.",
      swim1Min: 45, swim1Dist: 1700, swim1Focus: "Bazén: Pyramida 200–400–600–400–200 m",
      swim2Min: 60, swim2Dist: 2000, swim2Focus: "Otevřená voda: Souvislých 2000 m v neoprenu (vzdálenost 70.3!)",
      satBikeMin: 225, satBikeTitle: "Silniční kolo – Generálka na L'Etape: 3:45 hod (~92 km / ~1 050 m převýšení)",
      satBikeDesc: "3:45 hod na SILNIČNÍM KOLE v kopcovitém profilu (~90–95 km, ~1 050 m převýšení). Řízení dle tepu: roviny Z2 (123–132 bpm), delší stoupání plynule Z3 (133–141 bpm, strop 150 bpm; alt. při přehození wattmetru 175–190 W). V kopcích držet kadenci 75–85 rpm, pravidelně chodit ze sedla kvůli šetření beder a otestovat příjem 75–80 g sacharidů/hod.",
      sunRunMin: 75, sunRunDistKm: 11, sunRunTitle: "Nedělní vytrvalostní běh 75 min v Z2",
      sunRunDesc: "75 min klidný nedělní běh v Z2 (TF 128–136 bpm) s kontrolou uvolněných beder."
    },
    {
      week: 31, startDate: "2027-06-14", endDate: "2027-06-20", phaseId: 4,
      phaseName: "Fáze 4: L'Etape vrchol, TT Build & Generálka 70.3 HK", type: "Závodní", isRecovery: false,
      eventId: "evt-letape",
      hours: { total: 7.25, swim: 1.5, bike: 5.15, run: 0.0, strength: 0.6 },
      focus: "ZÁVODNÍ TÝDEN (Priorita B): Sobota 19. 6. 2027 – L'Etape Czech Republic (100 km / 1 200 m převýšení, silniční kolo). Mini-taper od středy do pátku, čtvrteční Core bez HIIT složky, v sobotu závod v cílovém okně 4:15–4:40 hod a v neděli volno nebo 20 min vyplavání.",
      wedRunMin: 40, wedRunDiscipline: "bike", wedRunTitle: "Středa (Mini-taper): Krátká lehká aktivace na silničním kole (40 min)",
      wedRunDesc: "40 min lehká projížďka na SILNIČNÍM KOLE v Z1/Z2 (120–130 bpm) s 3×2 min v kopcovitém tempu Z3 (135–140 bpm, kadence 85 rpm). Kontrola brzd, plášťů a řazení před L'Etape.",
      thuStrengthMin: 35, thuStrengthDesc: "Předzávodní čtvrtek BEZ HIIT složky (35 min): čistě aktivace Core, dechová stabilizace bránice a mobilita beder a kyčelních flexorů.",
      swim1Min: 45, swim1Dist: 1500, swim1Focus: "Úterý bazén: Plynulé aerobní plavání 1500 m v Z2 (šetřit nohy)",
      swim2Min: 25, swim2Dist: 800, swim2Focus: "Pátek (Mini-taper): 25 min lehké vyplavání s piškotem (800 m) + příprava výživy (70–80 g CHO/h)",
      satBikeMin: 265, satBikeDiscipline: "race", satBikeTitle: "ZÁVOD (Priorita B): L'Etape Czech Republic – 100 km / 1 200 m (Cíl 4:15–4:40 hod)",
      satBikeDesc: "START L'ETAPE CZECH REPUBLIC (100 km, převýšení 1 200 m)! Povinně SILNIČNÍ KOLO (pravidla zakazují TT speciál). Taktika dle tepu: roviny bezpečně ve skupině v Z2 (123–132 bpm), stoupání jet vlastním plynulým tempem v Z3 (133–141 bpm, nepřekračovat strop 150 bpm v prudkých stojkách; alternativně při přehození wattmetru kopce 175–190 W). V kopcích držet kadenci 75–85 rpm a pravidelně jezdit ze sedla pro uvolnění beder. Výživa: 70–80 g sacharidů/hod od první půlhodiny!",
      sunRunMin: 25, sunRunDiscipline: "swim", sunRunDistKm: 0.7, sunRunTitle: "Neděle po L'Etape: Volno nebo 20–25 min regenerační vyplavání",
      sunRunDesc: "Zasloužené volno po 100 km v kopcích, případně 20–25 min velmi lehké vyplavání a protažení v bazénu/vodě (splývání, znak, uvolnění bederní páteře, žádný běh)."
    },
    {
      week: 32, startDate: "2027-06-21", endDate: "2027-06-27", phaseId: 4,
      phaseName: "Fáze 4: L'Etape vrchol, TT Build & Generálka 70.3 HK", type: "Regenerační", isRecovery: true,
      hours: { total: 5.75, swim: 1.5, bike: 2.5, run: 1.0, strength: 0.75 },
      focus: "Regenerace po L'Etape v první polovině týdne. OD DRUHÉ POLOVINY T32 přepnutí hlavních víkendových cyklistických tréninků plně na TT SPECIÁL a rovinatější/zvlněný profil v aero pozici směrem k IM 70.3 Hradec Králové a IM Emilia-Romagna!",
      wedRunMin: 30, wedRunDiscipline: "bike", wedRunTitle: "Středa: Lehké kompenzační vytočení nohou po L'Etape (30 min Z1)",
      wedRunDesc: "30 min velmi lehká jízda v Z1 (115–130 W, kadence 90 rpm) + 15 min mobilita psoasu a beder.",
      thuStrengthMin: 45, thuStrengthDesc: "Odlehčené Core & hluboká mobilita kyčlí a hrudníku.",
      swim1Min: 45, swim1Dist: 1500, swim1Focus: "Úterý bazén: Regenerační technika a skluz v Z1/Z2",
      swim2Min: 45, swim2Dist: 1600, swim2Focus: "Pátek otevřená voda: 1600 m pohodově v Z2",
      satBikeMin: 120, satBikeTitle: "Sobota (Přechod plně na TT speciál): 2:00 hod TT kolo v aero + 15 min Brick",
      satBikeDesc: "Start specifické TT přípravy na 70.3 HK a IM Cervia! 2:00 hod na TT SPECIÁLU na rovinatějším/zvlněném profilu v Z2 (145–158 W, v tom 4×10 min souvisle v aero hrazdě při 88–90 rpm) + 15 min přechodový Brick běh.",
      sunRunMin: 60, sunRunDistKm: 9, sunRunTitle: "Nedělní lehký běh 45 min Z2 (+ 15 min sobotní Brick)",
      sunRunDesc: "15 min sobotní Brick běh + v neděli 45 min měkký běh v Z2."
    },
    {
      week: 33, startDate: "2027-06-28", endDate: "2027-07-04", phaseId: 4,
      phaseName: "Fáze 4: L'Etape vrchol, TT Build & Generálka 70.3 HK", type: "Build", isRecovery: false,
      hours: { total: 8.5, swim: 2.0, bike: 3.75, run: 1.75, strength: 1.0 },
      focus: "Červencový specifický TT Build: veškeré víkendové jízdy již výhradně na TT speciálu v aero pozici na rovinatějším/zvlněném profilu (sobota 3:30 hod TT + 20 min Brick běh) a 2 500 m v otevřené vodě.",
      wedRunMin: 45, wedRunTitle: "Středeční běh Z2/Z3 (45 min) jako příprava na Klínovec",
      wedRunDesc: "45 min zvlněný běh v Z2 se 3×5 min v Z3.",
      thuStrengthMin: 60, thuStrengthDesc: "Kruhový trénink: Core, stabilita beder v aero pozici a kotníků do terénu.",
      swim1Min: 50, swim1Dist: 1800, swim1Focus: "Bazén: 6×250 m v Z2/Z3",
      swim2Min: 70, swim2Dist: 2500, swim2Focus: "Otevřená voda: 2500 m v neoprenu (tempo ~2:28/100m)",
      satBikeMin: 225, satBikeTitle: "Sobota BRICK: 3:30 hod TT speciál (~98 km v aero) + 15 min Brick běh",
      satBikeDesc: "3:30 hod výhradně na TT SPECIÁLU na rovinatém/zvlněném profilu v aero pozici (148–162 W, v tom 3×20 min v 70.3 wattech 168 W, každých 20 min krátce ze sedla ulevit bedrům, 75 g sacharidů/h) + ihned 15 min Brick běh.",
      sunRunMin: 60, sunRunDistKm: 9, sunRunTitle: "Nedělní kompenzační běh 60 min v Z2 po dlouhém TT kole",
      sunRunDesc: "60 min klidný běh v Z2 na unavených nohách ze soboty."
    },
    {
      week: 34, startDate: "2027-07-05", endDate: "2027-07-11", phaseId: 4,
      phaseName: "Fáze 4: L'Etape vrchol, TT Build & Generálka 70.3 HK", type: "Závodní", isRecovery: false,
      eventId: "evt-klinovec",
      hours: { total: 8.0, swim: 1.75, bike: 2.75, run: 2.75, strength: 0.75 },
      focus: "ZÁVOD (Priorita C): Sobota 10. 7. 2027 – Běhej lesy Klínovec 23 km (souvislý aerobní běh v Z2 bez závodění z kopců!). V neděli kompenzační jízda na TT speciálu a vyplavání.",
      wedRunMin: 45, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT speciál: 45 min Z2/Z3 v aero",
      wedRunDesc: "45 min svižnější protočení na TT kole (3×8 min na 165 W).",
      thuStrengthMin: 45, thuStrengthDesc: "Předzávodní čtvrtek: Core a mobilita kyčlí (šetřit nohy na Klínovec).",
      swim1Min: 45, swim1Dist: 1650, swim1Focus: "Bazén: 1650 m plynule v Z2",
      swim2Min: 60, swim2Dist: 2000, swim2Focus: "Pátek nebo Neděle: Otevřená voda 2000 m kompenzačně",
      satBikeMin: 165, satBikeDiscipline: "race", satBikeTitle: "ZÁVOD (V Z2): Běhej lesy Klínovec 23 km (~2:45 hod)",
      satBikeDesc: "Běžet přísně jako vytrvalostní trénink v Z2 (TF < 138 bpm). Zákaz brzdění přes paty v prudkých sebězích – chránit kvadricepsy a bedra na nadcházející týden na Moravě!",
      sunRunMin: 120, sunRunDiscipline: "bike", sunRunDistKm: 55, sunRunTitle: "Neděle po Klínovci: 2:00 hod TT speciál v Z1/Z2 (rovinatý profil)",
      sunRunDesc: "120 min plynulá jízda na TT speciálu v aero pozici na nízkých wattech (135–148 W, vysoká kadence 90 rpm)."
    },
    {
      week: 35, startDate: "2027-07-12", endDate: "2027-07-18", phaseId: 4,
      phaseName: "Fáze 4: L'Etape vrchol, TT Build & Generálka 70.3 HK", type: "Dovolená", isRecovery: false,
      eventId: "evt-morava",
      hours: { total: 8.5, swim: 2.0, bike: 4.5, run: 1.25, strength: 0.75 },
      focus: "START DOVOLENÉ MORAVA (od 17. 7.): Ideální rovinaté/zvlněné trasy kolem Pálavy a Lednice pro dlouhé jízdy na TT speciálu v aero pozici a plavání ve volné vodě.",
      wedRunMin: 75, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT speciál: 75 min Z2/Z3 v aero pozici",
      wedRunDesc: "75 min na TT kole (4×10 min v aero na 158–168 W).",
      thuStrengthMin: 45, thuStrengthDesc: "Čtvrteční Core & mobilita beder před odjezdem na Moravu.",
      swim1Min: 50, swim1Dist: 1800, swim1Focus: "Bazén: 1800 m CSS úseky 6×200 m",
      swim2Min: 70, swim2Dist: 2400, swim2Focus: "Morava (Otevřená voda): 2400 m souvisle v Z2",
      satBikeMin: 195, satBikeTitle: "Morava Sobota: 3:15 hod TT speciál v aero (~92 km, rovinatý/zvlněný profil)",
      satBikeDesc: "3:15 hod plynulá vytrvalostní jízda na TT speciálu v aero pozici na jižní Moravě v Z2 (145–160 W).",
      sunRunMin: 75, sunRunDistKm: 11.5, sunRunTitle: "Morava Neděle: Ranní běh 75 min v Z2",
      sunRunDesc: "75 min ranní běh v Z2 po rovinatých stezkách."
    },
    {
      week: 36, startDate: "2027-07-19", endDate: "2027-07-25", phaseId: 4,
      phaseName: "Fáze 4: Specifický Tri Build & Generálka 70.3 HK", type: "Dovolená", isRecovery: true,
      eventId: "evt-morava",
      hours: { total: 7.5, swim: 2.0, bike: 3.75, run: 1.0, strength: 0.75 },
      focus: "DOVOLENÁ MORAVA (do 24. 7.): Aktivní cyklo a open-water týden v Z2 bez vysoké intenzity (slouží zároveň jako odlehčení před závěrečným blokem na 70.3 Hradec Králové).",
      wedRunMin: 90, wedRunDiscipline: "bike", wedRunTitle: "Morava Středa: 90 min pohodová vyjížďka v Z2",
      wedRunDesc: "90 min Z2 jízda (140–155 W) spojená s protažením zad.",
      thuStrengthMin: 45, thuStrengthDesc: "Morava Čtvrtek: 45 min venkovní Core & mobilita kyčlí.",
      swim1Min: 60, swim1Dist: 2000, swim1Focus: "Morava (Otevřená voda): 2000 m s nácvikem orientace",
      swim2Min: 60, swim2Dist: 2200, swim2Focus: "Morava (Otevřená voda): 2200 m v Z2",
      satBikeMin: 135, satBikeTitle: "Sobota: 2:15 hod Z2 švih před návratem z Moravy",
      satBikeDesc: "2:15 hod plynulá jízda v Z2.",
      sunRunMin: 60, sunRunDistKm: 9, sunRunTitle: "Nedělní běh 60 min v Z2",
      sunRunDesc: "60 min lehký běh v Z2."
    },
    {
      week: 37, startDate: "2027-07-26", endDate: "2027-08-01", phaseId: 4,
      phaseName: "Fáze 4: Specifický Tri Build & Generálka 70.3 HK", type: "Build", isRecovery: false,
      hours: { total: 9.25, swim: 2.0, bike: 4.5, run: 1.75, strength: 1.0 },
      focus: "Klíčový specifický týden 2 týdny před 70.3 Hradec Králové (9,25 hod): sobotní 4hodinové TT kolo (~112 km) + 30 min Brick běh v tempu 6:30/km!",
      wedRunMin: 60, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT speciál: 3×12 min v závodních wattech 70.3 (170 W)",
      wedRunDesc: "60 min TT kolo: 3×12 min v aero na 168–175 W (77–81 % FTP).",
      thuStrengthMin: 60, thuStrengthDesc: "Kruhový trénink: Core, stabilita beder a kyčlí.",
      swim1Min: 55, swim1Dist: 2000, swim1Focus: "Bazén: 10×200 m na CSS tempu (pauza 20 s)",
      swim2Min: 65, swim2Dist: 2600, swim2Focus: "Otevřená voda: 2600 m v neoprenu v Z2",
      satBikeMin: 210, satBikeTitle: "Sobota VELKÝ BRICK: 3:30 hod TT kolo (~100 km) + 30 min běh",
      satBikeDesc: "3:30 hod v TT aero pozici (z toho 3×20 min na 165–172 W, výživa 80 g sacharidů/h) + ihned 30 min Brick běh v cílovém tempu HK 6:30/km!",
      sunRunMin: 105, sunRunDistKm: 16, sunRunTitle: "Nedělní běh 75 min Z2 (+ 30 min sobotní Brick)",
      sunRunDesc: "30 min sobotní Brick běh + v neděli 75 min klidný aerobní běh v Z2."
    },
    {
      week: 38, startDate: "2027-08-02", endDate: "2027-08-08", phaseId: 4,
      phaseName: "Fáze 4: Specifický Tri Build & Generálka 70.3 HK", type: "Taper", isRecovery: true,
      hours: { total: 6.5, swim: 1.75, bike: 2.75, run: 1.25, strength: 0.75 },
      focus: "Taper před 70.3 Hradec Králové: stažení objemu o 30 %, udržení závodního napětí krátkými úseky v tempu 70.3.",
      wedRunMin: 45, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT ladění: 3×6 min na 170 W v aero (45 min)",
      wedRunDesc: "45 min lehká jízda se 3×6 min v závodním výkonu 170 W.",
      thuStrengthMin: 45, thuStrengthDesc: "Odlehčené Core & mobilita kyčlí a beder.",
      swim1Min: 50, swim1Dist: 1800, swim1Focus: "Bazén: 6×150 m v závodním tempu 70.3 + technika",
      swim2Min: 55, swim2Dist: 2000, swim2Focus: "Otevřená voda: 2000 m v neoprenu s nácvikem startu",
      satBikeMin: 120, satBikeTitle: "Sobota (8 dní před HK): 2:00 hod TT kolo + 15 min Brick běh",
      satBikeDesc: "2:00 hod TT kolo v Z2 (v tom 2×10 min na 170 W) + 15 min svěží Brick běh v tempu 6:25/km.",
      sunRunMin: 75, sunRunDistKm: 11.5, sunRunTitle: "Nedělní běh 60 min Z2 (+ 15 min sobotní Brick)",
      sunRunDesc: "15 min sobotní Brick + 60 min lehký nedělní běh v Z2."
    },
    {
      week: 39, startDate: "2027-08-09", endDate: "2027-08-15", phaseId: 4,
      phaseName: "Fáze 4: Specifický Tri Build & Generálka 70.3 HK", type: "Závodní", isRecovery: false,
      eventId: "evt-703-hk",
      hours: { total: 8.25, swim: 0.75, bike: 0.75, run: 6.5, strength: 0.25 },
      focus: "HLAVNÍ GENERÁLKA (Priorita B): Neděle 15. 8. 2027 – IRONMAN 70.3 Hradec Králové (Cíl 6:30:00: plavání 0:46 + depa 0:12 + kolo 3:15 @ 165–175 W + běh 2:17 @ 6:30/km).",
      wedRunMin: 30, wedRunTitle: "Středeční předzávodní běh 30 min (3×2 min po 6:25/km)",
      wedRunDesc: "30 min lehký běh se 3×2 min v závodním tempu běhu 70.3.",
      thuStrengthMin: 15, thuStrengthDesc: "15 min dechová mobilita beder a kyčlí (žádné posilování!).",
      swim1Min: 45, swim1Dist: 1400, swim1Focus: "Úterý: 1400 m uvolněně s 4×50 m v závodním tempu",
      swim2Min: 0, swim2Dist: 0, swim2Focus: "Pátek VOLNO (příprava TT kola, kombinézy a výživy)",
      satBikeMin: 45, satBikeTitle: "Sobota v Hradci Králové: 20 min protočení kola + 10 min rozplavání v Labi (Check-in)",
      satBikeDesc: "Krátké otestování řazení a brzd na TT kole (20 min), odevzdání kola do depa a večerní klid.",
      sunRunMin: 390, sunRunDiscipline: "race", sunRunDistKm: 113.0, sunRunTitle: "ZÁVOD: IRONMAN 70.3 Hradec Králové (Cíl 6:30:00!)",
      sunRunDesc: "GENERÁLKA NA ITÁLII! 1,9 km Labe (0:46, klidný dech od 1. bójky) -> T1 -> 90 km TT kolo (3:15, držet 165–175 W v aero, 80 g sacharidů/h) -> T2 -> 21,1 km běh (2:17, rovnoměrné tempo 6:30/km)."
    },

    // --- FÁZE 5: Ironman Peak, Taper & IM Emilia-Romagna (T40–T44 | 16. 8. – 19. 9. 2027) ---
    {
      week: 40, startDate: "2027-08-16", endDate: "2027-08-22", phaseId: 5,
      phaseName: "Fáze 5: Ironman Peak, Taper & IM Cervia", type: "Regenerační", isRecovery: true,
      hours: { total: 4.75, swim: 1.75, bike: 2.0, run: 0.5, strength: 0.5 },
      focus: "Regenerační týden po 70.3 Hradec Králové: rychlá obnova před posledními 2 vrcholnými Ironman týdny (T41–T42).",
      wedRunMin: 0, wedRunTitle: "Středa Volno od běhu (Masáž / pěnový válec)",
      wedRunDesc: "Volno pro plnou regeneraci šlach po půlmaratonu v HK.",
      thuStrengthMin: 30, thuStrengthDesc: "30 min jemná mobilizace beder a kyčlí.",
      swim1Min: 45, swim1Dist: 1500, swim1Focus: "Úterý: Regenerační vyplavání s piškotem 1500 m",
      swim2Min: 60, swim2Dist: 2000, swim2Focus: "Pátek: Otevřená voda / bazén 2000 m v Z1/Z2",
      satBikeMin: 120, satBikeTitle: "Sobota: 2:00 hod lehká vyjížďka v Z1/Z2 (135–150 W)",
      satBikeDesc: "120 min uvolněná jízda bez tlaku do pedálů.",
      sunRunMin: 30, sunRunDistKm: 4.5, sunRunTitle: "Neděle: První lehký klus 30 min po Hradci Králové",
      sunRunDesc: "30 min kontrolní měkký klus v Z1/Z2."
    },
    {
      week: 41, startDate: "2027-08-23", endDate: "2027-08-29", phaseId: 5,
      phaseName: "Fáze 5: Ironman Peak, Taper & IM Cervia", type: "Závodní", isRecovery: false,
      eventId: "evt-jizerska",
      hours: { total: 9.5, swim: 2.25, bike: 3.75, run: 2.75, strength: 0.75 },
      focus: "IM PEAK 1 (3 týdny před Ironmanem, 9,5 hod): V pátek plavání 3000 m v kuse, v sobotu POSLEDNÍ DLOUHÝ BĚH (Běhej lesy Jizerská 23 km striktně v Z2!) a v neděli 3:45 hod TT kolo v IM wattech.",
      wedRunMin: 45, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT speciál: 45 min v IM wattech (148–155 W)",
      wedRunDesc: "45 min v aero pozici na přesných wattech pro Cervii.",
      thuStrengthMin: 45, thuStrengthDesc: "Čtvrteční Core & stabilita beder (bez HIIT před víkendovým blokem).",
      swim1Min: 55, swim1Dist: 2000, swim1Focus: "Úterý bazén: 4×500 m v Z2 (pauza 30 s)",
      swim2Min: 80, swim2Dist: 3000, swim2Focus: "Pátek otevřená voda / bazén: Souvislých 3000 m v IM tempu!",
      satBikeMin: 165, satBikeDiscipline: "race", satBikeTitle: "POSLEDNÍ DLOUHÝ BĚH (Závod v Z2): Běhej lesy Jizerská 23 km",
      satBikeDesc: "KRITICKÉ PRAVIDLO (21 dní před IM): Striktní strop TF v Z2 (max 138 bpm)! Do prudkých kopců jít svižnou chůzí, v sebězích nulové riziko podvrtnutí kotníku.",
      sunRunMin: 225, sunRunDiscipline: "bike", sunRunDistKm: 102, sunRunTitle: "Neděle (IM simulace na unavených nohách): 3:45 hod TT kolo v aero",
      sunRunDesc: "3:45 hod rovinaté TT kolo na 142–155 W (65–71 % FTP) den po Jizerské 23 km – dokonalá adaptace na únavu."
    },
    {
      week: 42, startDate: "2027-08-30", endDate: "2027-09-05", phaseId: 5,
      phaseName: "Fáze 5: Ironman Peak, Taper & IM Cervia", type: "Build", isRecovery: false,
      hours: { total: 10.0, swim: 2.25, bike: 5.75, run: 1.25, strength: 0.75 },
      focus: "IM PEAK 2 – KRÁLOVSKÝ IRONMAN TÝDEN (10,0 hod, 2 týdny před Cervií): V pátek generálka plavání 3400 m, v sobotu NEJDELŠÍ TT JÍZDA 5:00 hod (~140–145 km v aero na 145–155 W) + 30 min Brick běh!",
      wedRunMin: 45, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT speciál: 45 min Z2 v aero pozici",
      wedRunDesc: "45 min plynule v aero pozici (148 W, 88 rpm).",
      thuStrengthMin: 45, thuStrengthDesc: "Poslední čtvrteční Core trénink před Ironman Taperem.",
      swim1Min: 50, swim1Dist: 1900, swim1Focus: "Úterý bazén: 1900 m technika a IM tempo",
      swim2Min: 85, swim2Dist: 3400, swim2Focus: "Pátek PLAVECKÁ GENERÁLKA: 3400 m souvisle v Z2 (neopren / bazén)",
      satBikeMin: 300, satBikeTitle: "KRÁLOVSKÁ IM JÍZDA: 5:00 hod TT kolo (~145 km v aero) + 30 min Brick",
      satBikeDesc: "5:00 hod na rovinaté trase v TT aero pozici na cílových IM wattech 142–155 W (každých 20 min na 30 s ze sedla ulevit bedrům, 85 g sacharidů/h) + ihned 30 min Brick běh metodou 9 min běh / 1 min chůze!",
      sunRunMin: 75, sunRunDistKm: 11, sunRunTitle: "Nedělní lehký běh 45 min Z2 (+ 30 min sobotní Brick)",
      sunRunDesc: "30 min sobotní Brick + v neděli 45 min velmi lehký klus v Z1/Z2. Od tohoto okamžiku začíná dvoutýdenní IRONMAN TAPER!"
    },
    {
      week: 43, startDate: "2027-09-06", endDate: "2027-09-12", phaseId: 5,
      phaseName: "Fáze 5: Ironman Peak, Taper & IM Cervia", type: "Taper", isRecovery: true,
      hours: { total: 6.25, swim: 1.75, bike: 2.75, run: 1.25, strength: 0.5 },
      focus: "IRONMAN TAPER 1 (Týden před závodem, -38 % objemu): Vstřebání královského bloku, servis TT speciálu, dolaďování spánku a mobilita beder.",
      wedRunMin: 45, wedRunDiscipline: "bike", wedRunTitle: "Středeční TT speciál: 45 min v IM wattech (3×8 min @ 150 W)",
      wedRunDesc: "45 min lehká jízda se 3×8 min v závodní aero pozici na 150 W.",
      thuStrengthMin: 30, thuStrengthDesc: "30 min lehká aktivace Core a dechová mobilita beder.",
      swim1Min: 50, swim1Dist: 1800, swim1Focus: "Úterý: 1800 m v IM tempu (3×500 m Z2 + 300 m vyplavání)",
      swim2Min: 55, swim2Dist: 2000, swim2Focus: "Pátek: Poslední souvislá dvoutisícovka (2000 m) v naprosté pohodě",
      satBikeMin: 120, satBikeTitle: "Sobota (7 dní před IM): 2:00 hod TT kolo (148 W) + 15 min Brick",
      satBikeDesc: "Poslední dvohodinová jízda na zkontrolovaném TT speciálu (145–152 W) + 15 min Brick běh.",
      sunRunMin: 75, sunRunDistKm: 11, sunRunTitle: "Nedělní běh 60 min Z2 (+ 15 min sobotní Brick)",
      sunRunDesc: "15 min sobotní Brick + 60 min lehký nedělní běh v Z2 (strategií 9 min klus / 1 min chůze)."
    },
    {
      week: 44, startDate: "2027-09-13", endDate: "2027-09-19", phaseId: 5,
      phaseName: "Fáze 5: Ironman Peak, Taper & IM Cervia", type: "Závodní", isRecovery: false,
      eventId: "evt-im-cervia",
      hours: { total: 15.5, swim: 0.75, bike: 0.5, run: 14.25, strength: 0.0 },
      focus: "ZÁVODNÍ TÝDEN – HLAVNÍ VRCHOL SEZÓNY (Priorita A): Sobota 18. 9. 2027 – IRONMAN Italy Emilia-Romagna (Cervia). Cíl: 14:00:00 s úsměvem a zdravými zády!",
      wedRunMin: 25, wedRunTitle: "Středa (Cervia): 25 min lehký klus po pobřeží",
      wedRunDesc: "25 min klus v Z1/Z2 po příjezdu do Itálie pro prokrvení nohou z cesty autem.",
      thuStrengthMin: 0, thuStrengthDesc: "Čtvrtek: Ráno 20 min rozplavání v Jaderském moři v Cervii + Race Briefing (žádné posilování, 2denní sacharidový carbloading!).",
      swim1Min: 30, swim1Dist: 1000, swim1Focus: "Úterý (doma před odjezdem): 1000 m lehké vyplavání",
      swim2Min: 15, swim2Dist: 500, swim2Focus: "Čtvrtek/Pátek (Cervia moře): 15 min rozplavání s orientací na plážové bójky",
      satBikeMin: 30, satBikeTitle: "Pátek (Den před IM): 20 min protočení TT kola + Check-in v Cervii",
      satBikeDesc: "V pátek ráno 20 min protočení nohou a kontrola řazení na TT kole, odevzdání kola a tašek (Blue/Red bag) do depa, celé odpoledne nohy nahoře.",
      sunRunMin: 840, sunRunDiscipline: "race", sunRunDistKm: 226.0, sunRunTitle: "HLAVNÍ ZÁVOD: IRONMAN Emilia-Romagna, Cervia (Sobota 18. 9. 2027 – Cíl 14:00:00!)",
      sunRunDesc: "DEN D (Sobota 18. 9. 2027)! 1) Plavání 3,8 km v moři (1:35:00, uvolněný dlouhý záběr) -> T1 (0:10) -> 2) Kolo 180 km (6:30:00, železná disciplína 142–155 W v aero, 85 g sacharidů/h, každých 20 min protáhnout bedra) -> T2 (0:10) -> 3) Maraton 42,2 km (5:35:00, od 1. km 9 min běh v Z2 / 1 min chůze na občerstvovačce). YOU ARE AN IRONMAN!"
    },

    // --- FÁZE 6: Aktivní regenerace po Ironmanu & Lednice (T45–T48 | 20. 9. – 17. 10. 2027) ---
    {
      week: 45, startDate: "2027-09-20", endDate: "2027-09-26", phaseId: 6,
      phaseName: "Fáze 6: Aktivní regenerace po IM & Lednice", type: "Regenerační", isRecovery: true,
      hours: { total: 2.0, swim: 1.0, bike: 0.75, run: 0.0, strength: 0.25 },
      focus: "1. týden po Ironmanu: Hluboká fyzická i endokrinní regenerace. Nulový běh, dlouhý spánek, pouze 2× vyplavání a lehká nedělní vyjížďka.",
      wedRunMin: 0, wedRunTitle: "Úplné volno, spánek a procházky",
      wedRunDesc: "Tělo opravuje svalová vlákna a doplňuje glykogen po 14 hodinách závodu.",
      thuStrengthMin: 15, thuStrengthDesc: "15 min jemné dýchání a mobilita kyčlí.",
      swim1Min: 30, swim1Dist: 900, swim1Focus: "Středa/Pátek: 30 min koupání a lehké splývání v bazénu",
      swim2Min: 30, swim2Dist: 1000, swim2Focus: "Víkendové vyplavání 1000 m znak/kraul s piškotem",
      satBikeMin: 45, satBikeTitle: "Sobota/Neděle: 45 min velmi lehká projížďka na kole v Z1",
      satBikeDesc: "45 min bez sledování wattů na čerstvém vzduchu.",
      sunRunMin: 0, sunRunDistKm: 0, sunRunTitle: "Neděle: Volno od běhu (Rodinná procházka)",
      sunRunDesc: "Žádný běh v prvním týdnu po Ironmanu."
    },
    {
      week: 46, startDate: "2027-09-27", endDate: "2027-10-03", phaseId: 6,
      phaseName: "Fáze 6: Aktivní regenerace po IM & Lednice", type: "Regenerační", isRecovery: true,
      hours: { total: 3.75, swim: 1.25, bike: 1.25, run: 0.75, strength: 0.5 },
      focus: "2. týden po Ironmanu: Kontrola nočního HRV a klidové TF. Lehké plavání, vyjížďka na kole a první testovací 45min klus před rozhodnutím o Lednici.",
      wedRunMin: 0, wedRunTitle: "Volný večer",
      wedRunDesc: "Pokračující regenerace.",
      thuStrengthMin: 30, thuStrengthDesc: "30 min lehké Core & mobilita páteře.",
      swim1Min: 35, swim1Dist: 1100, swim1Focus: "Bazén: 1100 m uvolněně v Z1/Z2",
      swim2Min: 40, swim2Dist: 1300, swim2Focus: "Bazén: 1300 m kraul/znak",
      satBikeMin: 75, satBikeTitle: "Sobota: 75 min podzimní vyjížďka na kole v Z1/Z2",
      satBikeDesc: "75 min pohodová cyklistika.",
      sunRunMin: 45, sunRunDistKm: 6.5, sunRunTitle: "Neděle: Testovací 45min klus po Ironmanu",
      sunRunDesc: "45 min měkký klus v Z1/Z2. Vyhodnotit v Semaforu regenerace: pokud je HRV >= 38 ms, klidová TF ~49 bpm a bedra/achilovky = 1/5, je možné příští sobotu běžet Lednici pohodově!"
    },
    {
      week: 47, startDate: "2027-10-04", endDate: "2027-10-10", phaseId: 6,
      phaseName: "Fáze 6: Aktivní regenerace po IM & Lednice", type: "Závodní", isRecovery: true,
      eventId: "evt-lednice",
      hours: { total: 6.5, swim: 0.75, bike: 0.5, run: 5.0, strength: 0.25 },
      focus: "BONUS NA ZÁVĚR SEZÓNY (Priorita C): Sobota 9. 10. 2027 – Běhej lesy Lednice 42 km (PODMÍNĚNÝ START: pouze jako společenský indiánský běh při 100% regeneraci po IM; jinak zkrácení na kratší trasu!).",
      wedRunMin: 25, wedRunTitle: "Středeční lehké proběhnutí 25 min v Z1/Z2",
      wedRunDesc: "25 min kontrolní klus.",
      thuStrengthMin: 15, thuStrengthDesc: "15 min mobilita kyčlí a zad.",
      swim1Min: 45, swim1Dist: 1400, swim1Focus: "Úterní bazén 1400 m v Z1/Z2",
      swim2Min: 0, swim2Dist: 0, swim2Focus: "Pátek Volno (přesun na jižní Moravu)",
      satBikeMin: 300, satBikeDiscipline: "race", satBikeTitle: "ZÁVOD (Společenský bonus): Běhej lesy Lednice 42 km (nebo kratší trasa)",
      satBikeDesc: "PODMÍNĚNÝ START: Pouze při plné obnově HRV a nulové bolesti pohybového aparátu! Běžet indiánským během (Z1/Z2) s přáteli pro radost na oslavu sezóny.",
      sunRunMin: 30, sunRunDiscipline: "bike", sunRunDistKm: 12, sunRunTitle: "Neděle: 30 min lehké vytočení nohou / procházka",
      sunRunDesc: "Aktivní uvolnění po Lednici."
    },
    {
      week: 48, startDate: "2027-10-11", endDate: "2027-10-17", phaseId: 6,
      phaseName: "Fáze 6: Aktivní regenerace po IM & Lednice", type: "Regenerační", isRecovery: true,
      hours: { total: 3.0, swim: 1.0, bike: 1.0, run: 0.5, strength: 0.5 },
      focus: "Poslední 48. týden makrocyklu: slavnostní uzavření sezóny 2027, zhodnocení celoročního posunu a přechod do podzimního odpočinku.",
      wedRunMin: 0, wedRunTitle: "Volný večer & wellness",
      wedRunDesc: "Sauna a odpočinek.",
      thuStrengthMin: 30, thuStrengthDesc: "30 min kompenzační cvičení a mobilita.",
      swim1Min: 30, swim1Dist: 1000, swim1Focus: "Úterý: 1000 m pohodové plavání",
      swim2Min: 30, swim2Dist: 1000, swim2Focus: "Pátek: 1000 m plavání pro radost",
      satBikeMin: 60, satBikeTitle: "Sobota: 60 min podzimní vyjížďka na kole",
      satBikeDesc: "60 min jízda na podzimním slunci bez měření wattů.",
      sunRunMin: 30, sunRunDistKm: 4.5, sunRunTitle: "Neděle 17. 10. 2027: Rozlučkový 30min klus & Konec makrocyklu 2027",
      sunRunDesc: "30 min lehký běh na uzavření 48týdenní cesty k Ironmanu Emilia-Romagna 2027!"
    }
  ];

  function addDaysIso(isoDateStr, addDays) {
    const [y, m, d] = isoDateStr.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + addDays));
    return dt.toISOString().slice(0, 10);
  }

  function makeIntervalsIcu(discipline, durationMin, spec) {
    if (!durationMin || durationMin <= 0 || discipline === "rest" || discipline === "strength") return "";
    if (discipline === "swim") {
      return `Warmup\n- 200mtr Z1 Pace\n\nMain Set\n- ${Math.max(400, (spec.swimDist || 1200) - 300)}mtr Z2 Pace\n\nCooldown\n- 100mtr Z1 Pace`;
    }
    if (discipline === "bike") {
      const mainMin = Math.max(15, durationMin - 20);
      return `Warmup\n- 10m 55-62% 86rpm\n\nMain Set\n- ${mainMin}m 66-75% 88-90rpm\n\nCooldown\n- 10m 53% 85rpm`;
    }
    if (discipline === "run" || discipline === "race") {
      const mainMin = Math.max(15, durationMin - 15);
      return `Warmup\n- 10m 75-82% LTHR\n\nMain Set\n- ${mainMin}m 83-90% LTHR\n\nCooldown\n- 5m 75-80% LTHR`;
    }
    return "";
  }

  specs.forEach((s) => {
    const wCode = `T${String(s.week).padStart(2, "0")}`;
    const wedDisc = s.wedRunDiscipline || (s.wedRunMin > 0 ? "run" : "rest");
    const satDisc = s.satBikeDiscipline || (s.satBikeMin > 0 ? "bike" : "rest");
    const sunDisc = s.sunRunDiscipline || (s.sunRunMin > 0 ? "run" : "rest");

    // Adjust Sunday workout duration so sum of 7 days matches s.hours.total * 60
    const Days = [
      {
        id: `${wCode}-D1`,
        dayName: "Pondělí",
        date: addDaysIso(s.startDate, 0),
        discipline: "rest",
        title: "Volno & Kompenzace beder po víkendu",
        durationMin: 0,
        intensityZone: "Regenerace",
        prescription: "Volný den na začátku týdne. Večer 15 min mobilita kyčelních flexorů (psoas), hrudní páteře a pěnový válec.",
        purpose: "Ochrana bederní páteře a obnova CNS po víkendovém bloku.",
        intervalsIcu: ""
      },
      {
        id: `${wCode}-D2`,
        dayName: "Úterý",
        date: addDaysIso(s.startDate, 1),
        discipline: s.swim1Min > 0 ? "swim" : "rest",
        title: s.swim1Min > 0 ? `Bazén 25m: ${s.swim1Focus} (${s.swim1Dist} m)` : "Volno",
        durationMin: s.swim1Min,
        intensityZone: "Z2–Z3",
        prescription: s.swim1Min > 0
          ? `Rozplavání 200 m Z1 -> 4×50 m technická cvičení (vysoký loket, dýchání do vody) -> Hlavní série: ${s.swim1Focus} -> 100 m vyplavání.`
          : "Volný den.",
        purpose: "Udržení vodního citu, uvolnění páteře v horizontální poloze a rozvoj CSS rychlosti.",
        intervalsIcu: makeIntervalsIcu("swim", s.swim1Min, { swimDist: s.swim1Dist })
      },
      {
        id: `${wCode}-D3`,
        dayName: "Středa",
        date: addDaysIso(s.startDate, 2),
        discipline: wedDisc,
        title: s.wedRunTitle,
        durationMin: s.wedRunMin,
        intensityZone: wedDisc === "rest" ? "Regenerace" : "Z2–Z3",
        prescription: s.wedRunDesc,
        purpose: wedDisc === "bike"
          ? "Specifická adaptace na TT aero pozici a závodní watty ve všední den."
          : "Rozvoj tempové vytrvalosti a ekonomiky pohybu do 60 minut.",
        intervalsIcu: makeIntervalsIcu(wedDisc, s.wedRunMin, {})
      },
      {
        id: `${wCode}-D4`,
        dayName: "Čtvrtek",
        date: addDaysIso(s.startDate, 3),
        discipline: s.thuStrengthMin > 0 ? "strength" : "rest",
        title: s.thuStrengthMin > 0 ? `Fixní čtvrteční slot: Core & Kompenzace (${s.thuStrengthMin} min)` : "Předzávodní mobilita & Check-in",
        durationMin: s.thuStrengthMin,
        intensityZone: s.isRecovery || s.type === "Závodní" ? "Z1 Core & Mobilita (bez HIIT)" : "Core + Z3",
        prescription: s.thuStrengthDesc,
        purpose: "Pevný střed těla (core) a aktivní hýždě chrání bedra při dlouhém TT kole i maratonském běhu.",
        intervalsIcu: ""
      },
      {
        id: `${wCode}-D5`,
        dayName: "Pátek",
        date: addDaysIso(s.startDate, 4),
        discipline: s.swim2Min > 0 ? "swim" : "rest",
        title: s.swim2Min > 0 ? `Plavání: ${s.swim2Focus} (${s.swim2Dist} m)` : "Předzávodní volno & příprava výbavy",
        durationMin: s.swim2Min,
        intensityZone: s.swim2Min > 0 ? "Z2" : "Regenerace",
        prescription: s.swim2Min > 0
          ? `Rozplavání 200 m -> Hlavní vytrvalostní série: ${s.swim2Focus} (důraz na uvolněný skluz a orientaci) -> 100 m vyplavání.`
          : s.swim2Focus,
        purpose: "Budování plavecké vytrvalosti na 1,9 km a 3,8 km bez vyčerpání před víkendem.",
        intervalsIcu: makeIntervalsIcu("swim", s.swim2Min, { swimDist: s.swim2Dist })
      },
      {
        id: `${wCode}-D6`,
        dayName: "Sobota",
        date: addDaysIso(s.startDate, 5),
        discipline: satDisc,
        title: s.satBikeTitle,
        durationMin: s.satBikeMin,
        intensityZone: satDisc === "race"
          ? "Závodní režim"
          : (s.week >= 26 && s.week <= 30 ? "Z2 roviny / Z3 kopce (Silniční kolo)" : "Z2 (Aero & Vytrvalost)"),
        prescription: s.satBikeDesc,
        purpose: satDisc === "race"
          ? "Kontrolovaný výkon dle závodní strategie s důrazem na rovnoměrný pacing a výživu."
          : (s.week >= 26 && s.week <= 30
            ? "Specifická příprava na kopcovitý profil L'Etape Czech Republic na silničním kole (řízení dle TF, kadence 75–85 rpm v kopcích, jízda ze sedla pro ochranu beder a výživa 70–80 g sacharidů/hod)."
            : "Klíčová víkendová cyklistická vytrvalost v aero pozici a nácvik příjmu sacharidů (70–85 g/hod)."),
        intervalsIcu: makeIntervalsIcu(satDisc, s.satBikeMin, {})
      },
      {
        id: `${wCode}-D7`,
        dayName: "Neděle",
        date: addDaysIso(s.startDate, 6),
        discipline: sunDisc,
        title: s.sunRunTitle,
        durationMin: s.sunRunMin,
        intensityZone: sunDisc === "race" ? "Závodní režim" : "Z2 (126–138 bpm)",
        prescription: s.sunRunDesc,
        purpose: sunDisc === "race"
          ? "Realizace hlavního závodního cíle s plnou kontrolou tepu, wattů a občerstvování."
          : "Rozvoj vytrvalosti na únavovém pozadí se šetřením beder a klenby chodidla.",
        intervalsIcu: makeIntervalsIcu(sunDisc, s.sunRunMin, {})
      }
    ];

    window.PLAN_DATA.weeks.push({
      week: s.week,
      code: wCode,
      startDate: s.startDate,
      endDate: s.endDate,
      phaseId: s.phaseId,
      phaseName: s.phaseName,
      type: s.type,
      blockStatus: "Rámcový blok k upřesnění dle kondice (T13–T48)",
      isRecovery: s.isRecovery,
      eventId: s.eventId || null,
      hours: s.hours,
      focus: s.focus,
      days: Days
    });
  });
})();
