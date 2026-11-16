# ZADÁNÍ PROJEKTU: Interaktivní webová aplikace „Cesta k Ironman Emilia-Romagna 2027“

Jsi seniorní full-stack vývojář a zároveň expertní triatlonový trenér (specializace na dlouhý triatlon a věkovou kategorii Masters 50+). Vytvoř kompletní, produkčně připravenou, vizuálně špičkovou a plně funkční interaktivní webovou aplikaci pro řízení 48týdenního tréninkového plánu od **16. 11. 2026 do 17. 10. 2027** s hlavním vrcholem **IRONMAN Italy Emilia-Romagna (Cervia) dne 18. 9. 2027**.

---

## 1. TECHNICKÁ ARCHITEKTURA A DESIGN
- **Forma dodání:** Samostatná offline-first klientská webová aplikace (index.html + oddělený datový modul `plan-data.js` a aplikační logika `app.js` + `styles.css`, případně možnost exportu do jednoho standalone HTML souboru). Aplikace musí běžet okamžitě v prohlížeči bez nutnosti backendového serveru.
- **Oddělení dat od UI:** Veškerá data makrocyklu, týdenních rozpisů, zón a závodů musí být uložena v čisté, čitelné a komentované JSON/JS struktuře (`PLAN_DATA`), aby šlo klouzavé tréninkové bloky každé 2–4 týdny snadno aktualizovat prostou výměnou datového bloku nebo importem JSON souboru.
- **Persistence stavu:** Automatické ukládání do `localStorage` (odškrtnuté tréninky, poznámky, RPE, ranní HRV, bolest zad, upravené prahy FTP/LTHR/CSS, naimportované aktivity z Garminu) + tlačítka **Export JSON zálohy** a **Import JSON aktualizace**.
- **Vizuální styl:** Moderní sportovní analytický dashboard (tmavý i světlý režim s přepínačem, výchozí tmavý „endurance cockpit“ styl inspirovaný Garmin/Intervals.icu, čistá typografie Inter/JetBrains Mono pro čísla, barevné kódování disciplín: Plavání = azurová, Kolo = jantarová/oranžová, Běh = smaragdová, Síla/Core = fialová, Závody = červená/zlatá dle priority A/B/C, Regenerace/Dovolená = břidlicově šedá). Plně responzivní pro mobil i desktop.

---

## 2. PROFIL SPORTOVCE A VÝCHOZÍ DATA (OVĚŘENO Z GARMIN CONNECT)
Zabuď tato data přímo jako výchozí stav aplikace (s možností editace v nastavení zón):

### Biometrie a fyziologické prahy
- **Věk / Výška / Váha:** 54 let / 176 cm / 84 kg
- **Tepová frekvence:** Klidová TF = 49 bpm | Max TF = 178 bpm | Běžecký LTHR = 154 bpm
- **Cyklistika:** FTP = 217 W (2,58 W/kg) | Vybavení: silniční kolo + TT speciál (wattmetr na TT kole + chytrý trenažér na zimu)
- **Plavání:** Aktuální test 1000 m = 25:00 (tempo 2:30 / 100 m, CSS výchozí ~2:28 / 100 m) | Bazén 25 m
- **Garmin metriky:** VO2max = 45 | Obvyklé noční HRV = ~40 ms | Průměrný spánek = 6 h 44 min
- **Zdravotní limit (KRITICKÉ PRAVIDLO):** Občasná bolest v bedrech při dlouhém tréninku -> plán musí obsahovat postupnou adaptaci na aero pozici na TT speciálu (začít krátkými úseky 3–5 min v aero na trenažéru a postupně prodlužovat), povinnou mobilizaci kyčelních flexorů po kole a šetření beder před dlouhými běhy.

### Analytický baseline z historie Garmin (říjen 2025 – říjen 2026, 280 aktivit)
Zobraz v sekci „Výchozí analýza“ shrnutí dosavadní historie a hlavní páky posunu:
- **Běh (silná stránka):** 95 aktivit, 98,8 hod, 838,5 km. Dokončené 2 maratony v tempu ~7:11/km (Praha 3. 5. 2026 za 5:05:35 s prům. TF 132 bpm; trail Lednice 10. 10. 2026 za 5:07:32 s prům. TF 146 bpm), půlmaraton za 2:05, pohodlné dlouhé běhy 15–23 km v tempu 6:40–6:46/km na TF 129–130 bpm.
- **Triatlonová zkušenost:** Hradec Králové Multisport (70.3) dne 16. 8. 2026 dokončen v čase 7:42:09.
- **Kolo (velký potenciál):** 11 venkovních jízd (32,2 hod, 458 km, převážně letní cykloturistika bez zimní trenažérové struktury). Pravidelný chytrý trenažér a TT adaptace posunou cyklistický split o desítky minut.
- **Plavání (hlavní priorita č. 1):** Pouze 11 plaveckých záznamů za celý rok (3,14 hod, 4,96 km celkem). Cíl: vybudovat uvolněný kraul na 3,8 km v moři bez vyčerpání před kolem.
- **Síla a chůze:** Výborná konzistence v silovém/HIIT tréninku (49 jednotek, 36,9 hod) a vysoká obecná odolnost z vícedenních treků (126,9 hod chůze).

### Tréninkové zóny (automaticky přepočítávané v kalkulačce zón při změně LTHR / FTP / CSS)
1. **Běh – Tep (dle LTHR 154 bpm) & orientační tempo:**
   - Z1 Regenerační: < 126 bpm (> 7:05 /km)
   - Z2 Aerobní vytrvalost / IM běh: 126–138 bpm (6:30–7:00 /km)
   - Z3 Tempová / Maraton & 70.3: 139–145 bpm (5:55–6:25 /km; cílové maratonské tempo 4:30 = 6:24 /km)
   - Z4 Prahová / Půlmaraton: 146–154 bpm (5:30–5:50 /km; cílové tempo HM 2:00 = 5:41 /km)
   - Z5 VO2max: > 154 bpm (< 5:25 /km)
2. **Kolo – Výkon (dle FTP 217 W, Coggan):**
   - Z1 Aktivní regenerace (< 55 %): < 119 W
   - Z2 Vytrvalost / IM závodní zóna (56–75 %): 122–163 W *(cílový výkon pro IM Cervia 180 km: 141–156 W, tj. 65–72 % FTP)*
   - Z3 Tempo / Sweet Spot / 70.3 zóna (76–90 %): 165–195 W *(cílový výkon pro 70.3 HK 90 km: 163–178 W, tj. 75–82 % FTP)*
   - Z4 Laktátový práh (91–105 %): 197–228 W
   - Z5 VO2max (106–120 %): 230–260 W
3. **Plavání (dle CSS ~2:28 / 100 m v 25m bazénu):**
   - Z1 Technika / vyplavání: > 2:40 /100 m
   - Z2 Aerobní vytrvalost / IM tempo: 2:28–2:38 /100 m
   - Z3 CSS / Prahové úseky: 2:20–2:27 /100 m
   - Z4 Rychlostní stovky / 50m úseky: < 2:18 /100 m

---

## 3. ČASOVÝ ROZPOČET A LOGISTIKA TÝDNE (PEVNÁ OMEZENÍ)
Generátor a rozpis týdnů musí striktně respektovat tato pravidla:
- **Zima / Jaro objem:** běžný týden **5–6,5 hod**, špičkový týden **max 8 hod**.
- **Léto / IM Build objem:** běžný týden **6,5–8 hod**, špičkový týden **max 10 hod** (výjimečně 10,5 hod v nejdelším IM simulačním víkendu).
- **Periodizace zátěže:** Rytmus **3:1** (nebo 2:1 u věku 54 let v těžkých blocích) – každý 4. týden je regenerační (pokles objemu o 30–35 %) pro ochranu beder, šlach a nervového systému.
- **Všední dny (Po–Pá):** Trénink večer, **maximální délka jednotky 1:30 hod** (běžně 45–75 min). Pondělí preferovaně volno nebo lehká mobilita/regenerace po víkendu.
- **Čtvrtek (FIXNÍ SLOT):** Kruhový trénink – posilování zaměřené na střed těla (core), kompenzaci beder a HIIT (~50–60 min). V týdnech před A/B závody stáhnout HIIT složku a nechat čistě core + mobilitu.
- **Plavání (dostupné dny):** Úterý, Pátek, Neděle (25m bazén); v létě o víkendu otevřená voda (nácvik orientace, neoprenu a souvislého plavání). Plánuj stabilně **2 plavecké jednotky týdně** (Út + Pá, případně Ne).
- **Víkendy (So + Ne):** Ranní trénink, **max 4:00 hod na den** (výjimka pouze 2–3 klíčové dlouhé jízdy 4,5–5,5 hod v srpnu před IM).

---

## 4. TERMÍNOVKA ZÁVODŮ, DOVOLENÝCH A 48TÝDENNÍ MAKROCYKLUS
Start plánu je **pondělí 16. 11. 2026 (Týden 1)**, konec **neděle 17. 10. 2027 (Týden 48)**.

### Závody a plánované výpadky (zobraz na časové ose i v kartách týdnů)
1. **20. 1. – 2. 2. 2027 (Týden 10–12): Dovolená Thajsko** – udržovací režim bez stresu (plavání v moři/bazénu, lehké ranní klusy do 40 min v teple, mobilita).
2. **3. 4. 2027 (Sobota, Týden 20) – Generali Půlmaraton Praha [Priorita C]** | Silnice | Cíl: **2:00 hod** (5:41/km). Kvalitní tempový test z tréninku (pouze 2 dny lehkého odpočinku předem).
3. **10. 4. 2027 (Sobota, Týden 21) – Běhej lesy Karlštejn [Priorita C]** | Trail | Zvolená distance: **18 km** (STRIKTNĚ 18 km, ne 30 km – šetření nohou a beder 3 týdny před maratonem, běžet čistě v Z2 jako kopcovitý vytrvalostní běh).
4. **2. 5. 2027 (Neděle, Týden 24) – Vodafone Maraton Praha [Priorita B]** | Silnice, převýšení 147 m | Cíl: **4:30 hod** (6:24/km). Krátký 7–10denní taper, kontrolované tempo od startu (negativní nebo vyrovnaný split), aby regenerace trvala dny, nikoliv měsíc.
5. **10. 7. 2027 (Sobota, Týden 34) – Běhej lesy Klínovec 23 km [Priorita C]** | Trail | Cíl: souvislý aerobní běh v Z2 v rámci triatlonové přípravy (bez závodění z kopců).
6. **17. 7. – 24. 7. 2027 (Týden 35–36): Dovolená Morava** – aktivní cyklo/běžecký týden (ideální pro vytrvalostní jízdy na kole a otevřenou vodu, bez intenzity).
7. **15. 8. 2027 (Neděle, Týden 39) – IRONMAN 70.3 Hradec Králové [Priorita B – hlavní generálka]** | Řeka Labe 1,9 km + zvlněné kolo 90 km + rovinatý běh 21,1 km | Cíl: **6:30 hod** (orientační rozpad: plavání 0:46 + depa 0:12 + kolo 3:15 na 165–175 W + běh 2:17 v tempu ~6:30/km). Kompletní test výživy (70–90 g sacharidů/hod na kole), dresu a TT pozice.
8. **28. 8. 2027 (Sobota, Týden 41) – Běhej lesy Jizerská 23 km [Priorita C]** | Trail | Poslední dlouhý běh 3 týdny před Ironmanem – striktní strop TF v Z2 (max 138 bpm), do prudkých kopců přejít do svižné chůze, nulové riziko podvrtnutí v sebězích.
9. **18. 9. 2027 (Sobota, Týden 44) – IRONMAN Emilia-Romagna, Cervia [Priorita A – HLAVNÍ VRCHOL SEZÓNY]** | Plavání moře 3,8 km + rovinaté kolo 180 km + rovinatý běh 42,2 km | Cíl: **14:00 hod s dobrým pocitem** (modelový rozpad: plavání 1:35 + depa 0:20 + kolo 6:30 při 142–155 W v aero + maraton 5:35 strategií run/walk např. 9 min běh / 1 min chůze na občerstvovačkách).
10. **9. 10. 2027 (Sobota, Týden 47) – Běhej lesy Lednice 42 km [Priorita C – bonus na závěr]** | Rovinatý trail | Pouze pohodový společenský běh/indiánský běh za podmínky plné regenerace po IM (normální HRV, klidová TF a nulová bolest pohybového aparátu; jinak zkrácení na kratší trasu).

### Rozdělení 48 týdnů do 6 fází makrocyklu
Vytvoř kompletní data pro všech **48 týdnů** (každý týden má: číslo T01–T48, datum Po–Ne, fázi, typ týdne [Build / Regenerační / Taper / Závodní / Dovolená], cílové hodiny celkem a rozpad hodin na Plavání / Kolo / Běh / Síla, klíčové zaměření týdne):
- **Fáze 1 (T01–T12 | 16. 11. 2026 – 7. 2. 2027):** Zimní aerobní báze, technika kraulu (2x týdně bazén) & TT aero adaptace na trenažéru (5–6,5 h/týd, vč. Thajska T10–T12).
- **Fáze 2 (T13–T24 | 8. 2. – 2. 5. 2027):** Jarní maratonský build (postupné prodloužení dlouhého běhu do 30–32 km, maratonské tempo) při udržení 2x plavání a 1–2x kola týdně (6–8 h/týd), zakončeno Maratonem Praha.
- **Fáze 3 (T25–T28 | 3. 5. – 30. 5. 2027):** Pomaratonová regenerace nohou a přechod na triatlonový objem (první 2 týdny minimum běhu, důraz na plavání a kolo venku, první přechody Kolo->Běh „brick“).
- **Fáze 4 (T29–T39 | 31. 5. – 15. 8. 2027):** Specifický triatlonový Build 1 – otevřená voda, prodlužování víkendového TT kola z 2,5 h na 4 h, brick běhy, Klínovec, Morava a generálka **IM 70.3 Hradec Králové** (6,5–9,5 h/týd).
- **Fáze 5 (T40–T44 | 16. 8. – 19. 9. 2027):** Ironman Peak & Taper – regenerace po HK (T40), 2 vrcholné Ironman týdny (T41–T42, až 10 h/týd vč. nejdelší jízdy ~140–150 km v aero a Jizerské 23 km), poté dvoutýdenní Taper (T43–T44) a závod **IM Emilia-Romagna**.
- **Fáze 6 (T45–T48 | 20. 9. – 17. 10. 2027):** Aktivní regenerace po Ironmanu (plavání, procházky, lehké vytočení nohou) a podmíněná rozlučka v Lednici (T47).

---

## 5. KLÍČOVÉ FUNKCE APLIKACE (CO MUSÍ UMĚT UI)

### A. Hlavní přehled (Executive Dashboard)
- Odpočty dnů a týdnů do dalšího závodu a do hlavního cíle (IM Emilia-Romagna 18. 9. 2027).
- Aktuální týden dle systémového data (s možností ručně přepnout na libovolný týden T01–T48 pro testování a prohlížení).
- Interaktivní sloupcový/plošný graf celoročního objemu (T01–T48) rozdělený barevně podle disciplín (Plavání, Kolo, Běh, Síla) s vyznačenými vlaječkami závodů A/B/C a porovnáním **Plán vs. Skutečnost**.
- Rychlý „Semafor regenerace a zad“: uživatel zadá dnešní noční HRV (vůči baseline 40 ms), spánek a stav beder (1–5), a aplikace mu okamžitě doporučí, zda jet trénink na 100 %, stáhnout intenzitu do Z1/Z2, nebo zařadit volno a mobilitu.

### B. Detailní týdenní plánovač & Klouzavý rozpis dnů (Po–Ne)
- Pro **prvních 12 týdnů (T01–T12, tj. celé zimní období vč. Thajska)** vytvoř plně rozepsané konkrétní denní tréninky (Po–Ne) na minuty, watty, tepy i plavecké drilly.
- Pro **týdny T13–T48** vygeneruj realistické strukturované šablony denních tréninků odpovídající dané fázi, objemu a závodům (aby žádný týden v aplikaci nebyl prázdný!), s jasným označením, zda jde o „Detailní aktivní blok“ nebo „Rámcový blok k upřesnění dle kondice“.
- U každého jednotlivého tréninku umožni:
  - Odškrtnout splnění (Splněno / Částečně / Vynecháno), zadat skutečný čas, RPE (1–10) a krátkou poznámku.
  - Zobrazit metodický účel tréninku (např. *proč dnes držíme kadenci 88–92 rpm a 4x5 min v aero pozici*).

### C. Integrace s Intervals.icu (Generátor strukturovaných tréninků)
- U každého tréninku (plavání, trenažér/kolo, běh) přidej tlačítko **„Kopírovat pro Intervals.icu“**.
- Po kliknutí zkopíruj do schránky validní textový zápis pro Intervals.icu Workout Builder, který se po vložení do kalendáře Intervals.icu automaticky přenese do hodinek Garmin!
- Příklad syntaxe pro Intervals.icu (kolo):
  ```text
  Warmup
  - 10m 50-60%
  
  Main Set 4x
  - 6m 78-85% 88-92rpm
  - 3m 55%
  
  Cooldown
  - 10m 50%

  - Přidej také tlačítko „Exportovat celý týden pro Intervals.icu“ a stručný návod v modálním okně, jak zápis vložit do Intervals.ic

### D. Importér Activities.csv z Garmin Connect & Generator reportu pro AI trenéra
Vytvoř drag-and-drop nahrávání souboru Activities.csv přímo z českého Garmin Connectu.

POZOR na specifika českého Garmin CSV (ošetři v parseru!):
- Hlavičky sloupců: Typ aktivity, Datum, Název, Vzdálenost, Čas, Průměrný ST, Maximální ST, Průměrné tempo, Průměrný výkon, Normalized Power® (NP®), Celkový výstup.

- Formát čísel: U běhu a kola je desetinná čárka (např. 23,22 = 23,22 km), ale u plavání (Plav. v bazénu, Plavání ve volné vodě) a veslování je vzdálenost v metrech s tečkou jako oddělovačem tisíců (např. 1.075 = 1075 m = 1,075 km; 100 = 100 m)! Hodnota -- znamená prázdné pole. Čas může obsahovat desetiny vteřin (např. 00:08:34,7).

- Aktivitu Chůze započítej zvlášť mimo hlavní triatlonový objem (nebo s přepínačem), aby vícedenní treky nezkreslovaly splněné hodiny SBR (Swim-Bike-Run).

Po nahrání CSV aplikace automaticky spáruje aktivity s týdny T01–T48 (a pro aktivity před 16. 11. 2026 ukáže historické statistiky) a porovná plánované vs. odtrénované hodiny.

Přidej tlačítko „Vygenerovat podklad pro úpravu plánu (AI Prompt)“, které jedním kliknutím vytvoří strukturovaný souhrn posledních 2–4 týdnů (plán vs. skutečnost, průměrné tepy, RPE, stav beder, HRV), který uživatel jen zkopíruje do chatu s AI pro vygenerování aktualizovaného bloku PLAN_DATA.

### E. Kalkulačka závodní strategie a výživy (Race Pacing & Fueling)
Samostatná záložka pro 4 klíčové závody (Půlmaraton Praha, Maraton Praha, 70.3 Hradec Králové, IM Emilia-Romagna) s interaktivními posuvníky tempa/wattů a automatickým propočtem mezičasů a nutričního plánu (g sacharidů/hod, ml tekutin, sodík).

## 6. KVALITA KÓDU A VÝSTUPU
Žádné placeholdery typu // TODO: doplnit zbylé týdny – všech 48 týdnů makrocyklu a kompletních 12 detailních týdnů zimního bloku musí být plně datově osazeno.

Použij čistý modulární JavaScript (ES6+), bez těžkých build-step závislostí, které by bránily přímému otevření lokálního souboru, případně lehké CDN knihovny (např. Chart.js / Lucide ikony) s graceful fallbackem pro plně offline režim.

Otestuj parsování českého CSV, přepočet zón při změně FTP/LTHR/CSS a kopírování Intervals.icu syntaxe do schránky.