import React, { useMemo, useState } from "react";

/**
 * Paralympic Champion — LA 2028 (Vite + Tailwind)
 * - Logo-themed UI (blue gradient + gold accent feel)
 * - Main page opens first; profile drawer opens on click
 * - Full-width cards for Bio, Training, Goals
 * - Full-width tables for 100m/800m
 * - Camps 1–12 included (added 8–12)
 */

/* ---------- Brand helpers ---------- */
const brand = {
  grad: "bg-gradient-to-r from-blue-700 to-blue-400",
  blueText: "text-blue-800",
  chip: "bg-blue-50 text-blue-800 border-blue-200",
  accentBtn: "bg-blue-700 hover:bg-blue-800 text-white",
};

/* ---------- Types ---------- */
export type SportKey =
  | "para_athletics"
  | "para_powerlifting"
  | "shooting_para_sport"
  | "para_cycling"
  | "para_badminton"
  | "boccia"
  | "para_fencing"
  | "para_triathlon"
  | "para_climbing"
  | "para_taekwondo"
  | "para_equestrian";

type CompetitionRow = {
  event: "100m" | "800m";
  name: string;
  place?: string;
  dates?: string;
  target?: string;
  goal?: string;
  achievable?: "Achievable" | "—";
  achieved?: string;
  rank?: string;
};

type CampRow = {
  No: Number;
  dates: string;
  days?: string | number;
  place: string;
  label: string;
  remarks?: string;
};

type Player = {
  id: string;
  name: string;
  classification?: string;
  disability?: string;
  photo?: string;
  dob?: string;
  education?: string;
  maritalStatus?: string;
  club?: string;
  sport: SportKey;
  events?: string[];
  coach?: string;
  goals?: string[];
  trainingYears?: string;
  trainingRate?: string;
  supportLevel?: string;
  highlights?: string[];
  training?: { period?: string; annualPlan?: string };
  comps100m?: CompetitionRow[];
  comps800m?: CompetitionRow[];
  camps?: CampRow[];
};

/* ---------- Sports & data ---------- */
const SPORTS: { key: SportKey; label: string; status: "targeted" | "new_targeted" }[] = [
  { key: "para_powerlifting", label: "Para Powerlifting", status: "targeted" },
  { key: "para_athletics", label: "Para Athletics", status: "targeted" },
  { key: "shooting_para_sport", label: "Shooting Para Sport", status: "targeted" },
  { key: "para_cycling", label: "Para Cycling", status: "targeted" },
  { key: "para_badminton", label: "Para Badminton", status: "targeted" },
  { key: "boccia", label: "Boccia", status: "targeted" },
  { key: "para_fencing", label: "Para Fencing", status: "new_targeted" },
  { key: "para_triathlon", label: "Para Triathlon", status: "new_targeted" },
  { key: "para_climbing", label: "Para Climbing", status: "new_targeted" },
  { key: "para_taekwondo", label: "Para Taekwondo", status: "new_targeted" },
  { key: "para_equestrian", label: "Para Equestrian", status: "new_targeted" },
];

const PLAYERS: Player[] = [
  {
    id: "ath-001",
    name: "Mohammad Youssef Mohammad Othman",
    sport: "para_athletics",
    photo: "/mohammad-youssef.png",
    classification: "T34",
    disability: "Cerebral palsy / spastic diplegic (walking with spastic gait)",
    dob: "16/01/2004",
    education: "High school graduate",
    maritalStatus: "Single",
    club: "Dubai Club for People of Determination",
    events: ["100m", "800m"],
    coach: "(to be assigned)",
    goals: [
      "Achieve a medal at Los Angeles 2028",
      "Top-three in 100m & 800m for 2025 pathway",
    ],
    trainingYears: "10 Years",
    trainingRate: "5 days/week, ~2 hours per session",
    supportLevel: "Great support from family and friends",
    highlights: [
      "Swiss National Open — 100m 14.94 (2nd)",
      "Grand Prix Switzerland — 100m 14.84 (3rd)",
      "Sharjah Intl. — 800m 1:40.46 (2nd)",
    ],
    training: {
      period: "Nov 2024 – Jul 2028",
      annualPlan: "Macrocycle with quarterly evaluations and camps",
    },
    comps100m: [
      { event: "100m", name: "Sharjah International Meeting", place: "Sharjah (UAE)", dates: "02–04 Feb 2025", target: "0:15.40", goal: "Prep for Fazza / achieve MS", achievable: "Achievable", achieved: "0:15.21", rank: "1st" },
      { event: "100m", name: "Fazza Grand Prix", place: "Dubai (UAE)", dates: "06–13 Feb 2025", target: "0:15.20", goal: "Get one of three medals", achievable: "Achievable", achieved: "0:15.61", rank: "1st" },
      { event: "100m", name: "Grand Prix Switzerland", place: "Switzerland", dates: "22–30 May 2025", target: "0:15.20", goal: "Get one of three medals", achievable: "Achievable", achieved: "0:14.84", rank: "3rd" },
      { event: "100m", name: "Daniela/Jutzeler Championship", place: "Switzerland", dates: "30 May 2025", target: "0:15.15", goal: "Get one of three medals", achievable: "Achievable", achieved: "0:15.18", rank: "2nd" },
      { event: "100m", name: "Swiss National Open", place: "Switzerland", dates: "31 May–01 Jun 2025", target: "0:15.00", goal: "Get one of three medals", achievable: "Achievable", achieved: "0:14.94", rank: "2nd" },
      { event: "100m", name: "Polish International Championship", place: "Poland", dates: "05 Aug–15 Sep 2025", target: "0:15.00–0:14.60", goal: "Preparing for World Championship", achievable: "Achievable" },
      { event: "100m", name: "World Championship", place: "India", dates: "23 Sep–06 Oct 2025", target: "0:15.00–0:14.60", goal: "Get one of three medals", achievable: "Achievable" },
    ],
    comps800m: [
      { event: "800m", name: "Sharjah International Meeting", place: "Sharjah (UAE)", dates: "02–04 Feb 2025", target: "1:45.00", goal: "Prep for Fazza / achieve MS", achievable: "Achievable", achieved: "1:40.46", rank: "2nd" },
      { event: "800m", name: "Fazza Grand Prix", place: "Dubai (UAE)", dates: "06–13 Feb 2025", target: "1:44.00", goal: "Participation & experience", achievable: "Achievable", achieved: "1:42.33", rank: "3rd" },
      { event: "800m", name: "Grand Prix Switzerland", place: "Switzerland", dates: "22–30 May 2025", target: "1:42.00", goal: "Personal number + world ranking", achievable: "Achievable", achieved: "01:42:08", rank: "3rd" },
      { event: "800m", name: "Daniel Championship Switzerland", place: "Switzerland", dates: "30 May 2025", target: "-", goal: "-", achievable: "—" },
      { event: "800m", name: "Swiss National Open", place: "Switzerland", dates: "31 May–01 Jun 2025", target: "01:42:00", goal: "Personal number + world ranking", achievable: "Achievable", achieved: "1:36.70", rank: "3rd" },
      { event: "800m", name: "Polish International Championship", place: "Poland", dates: "05 Aug–15 Sep 2025", target: "01:36:00–01:36:50", goal: "Personal number + world ranking", achievable: "Achievable" },
      { event: "800m", name: "World Championship", place: "India", dates: "23 Sep–06 Oct 2025", target: "01:36:00–01:36:50", goal: "Personal number + world ranking", achievable: "Achievable" },
    ],
    /* ---- Camps & Competitions Plan (1–12) ---- */
    camps: [
      { No: 1, dates: "30 Nov 2024 – 10 Jan 2025", days: 41, place: "Tunisia", label: "International training camp" },
      { No: 1, dates: "11 Jan – 01 Feb 2025", days: 21, place: "Dubai", label: "Local training camp", remarks: "Shared with Tunisian team (3 players + coach)" },
      { No: 1, dates: "02 – 04 Feb 2025", days: 3, place: "Sharjah", label: "Sharjah International Meeting" },
      { No: 1, dates: "06 – 13 Feb 2025", days: 7, place: "Dubai", label: "16th Fazza Grand Prix" },
      { No: 1, dates: "26 Feb – 03 Apr 2025", days: 36, place: "Tunisia", label: "International training camp" },
      { No: 1, dates: "05 – 24 Apr 2025", days: 20, place: "Dubai", label: "Shared with Tunisian team (3 players + coach)" },
      { No: 1, dates: "24 Apr – 16 May 2025", days: 23, place: "Tunisia", label: "International training camp / hosting" },
      // NEW: 8–12
      { No: 1, dates: "18 May – 02 Jun 2025", days: 12, place: "Switzerland", label: "Swiss Grand Prix / Daniela Swiss / Jutzeler Memorial Nationals" },
      { No: 1, dates: "07 Jun – 15 Jul 2025", days: 38, place: "Tunisia", label: "Outdoor Camp" },
      { No: 1, dates: "15 Jul – 14 Aug 2025", days: 30, place: "Poland", label: "Outdoor Camp" },
      { No: 1, dates: "14 Aug – 18 Sep 2025", days: 35, place: "Tunisia", label: "Outdoor Camp" },
      { No: 1, dates: "22 Sep – 06 Oct 2025", days: 13, place: "India", label: "World Championship" },
    ],
  },
];

/* ---------- Helpers ---------- */
const useRosterBySport = (players: Player[]) =>
  useMemo(() => {
    const map: Record<SportKey, Player[]> = {
      para_athletics: [],
      para_powerlifting: [],
      shooting_para_sport: [],
      para_cycling: [],
      para_badminton: [],
      boccia: [],
      para_fencing: [],
      para_triathlon: [],
      para_climbing: [],
      para_taekwondo: [],
      para_equestrian: [],
    };
    players.forEach((p) => map[p.sport].push(p));
    return map;
  }, [players]);

const Pill: React.FC<{ children: React.ReactNode; tone?: "brand" | "new" | "neutral" }> = ({
  children,
  tone = "brand",
}) => {
  const cls = tone === "new" ? "bg-amber-50 text-amber-800 border-amber-200" : brand.chip;
  return <span className={`px-2 py-1 rounded-full text-xs border ${cls}`}>{children}</span>;
};

const Card: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="rounded-2xl border border-slate-200 shadow-sm bg-white p-4">
    {title && <h4 className="text-sm font-semibold text-slate-700 mb-2">{title}</h4>}
    {children}
  </div>
);

const KeyVal: React.FC<{ k: string; v?: string }> = ({ k, v }) => {
  if (!v) return null;
  return (
    <div className="flex items-baseline gap-2 text-sm">
      <span className="w-48 text-slate-500">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
};

function MiniTable<T extends Record<string, unknown>>({
  cols,
  rows,
  dense,
}: {
  cols: { key: keyof T; label: string }[];
  rows: T[];
  dense?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full text-sm ${dense ? "text-[12px]" : ""}`}>
        <thead>
          <tr className="bg-blue-50 text-blue-900">
            {cols.map((c) => (
              <th key={String(c.key)} className="px-3 py-2 text-left font-semibold">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="odd:bg-white even:bg-slate-50">
              {cols.map((c) => (
                <td key={String(c.key)} className="px-3 py-2 whitespace-nowrap">
                  {(r as any)[c.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Featured banner ---------- */
const FeaturedAthlete: React.FC<{ p: Player; onOpenProfile: () => void }> = ({
  p,
  onOpenProfile,
}) => (
  <section className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <div className={`h-10 ${brand.grad}`} />
    <div className="p-6 grid md:grid-cols-3 gap-6 items-center">
      <div className="flex items-center gap-4 md:col-span-1">
        {p.photo ? (
          <img
            src={p.photo}
            alt={p.name}
            className="w-24 h-24 rounded-2xl object-cover border-4 border-blue-100"
          />
        ) : (
          <div className="w-24 h-24 rounded-2xl bg-blue-50 grid place-items-center text-blue-700 text-2xl font-bold">
            {p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </div>
        )}
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">Featured Athlete</div>
          <h2 className={`text-xl font-bold ${brand.blueText}`}>{p.name}</h2>
          <p className="text-blue-800">Wheelchair Racing — 100m & 800m ({p.classification})</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Pill>Best 100m: 14.84</Pill>
            <Pill>Best 800m: 1:40.46</Pill>
            <Pill tone="new">Road to LA 2028</Pill>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-blue-800 mb-2">2025 Highlights</h3>
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
          {(p.highlights || []).map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Road to LA 2028</h3>
        <p className="text-sm text-slate-700">{p.training?.annualPlan}</p>
        <button
          className={`mt-3 inline-flex items-center px-3 py-1.5 rounded-lg text-sm ${brand.accentBtn}`}
          onClick={onOpenProfile}
        >
          View full profile
        </button>
      </div>
    </div>
  </section>
);

/* ---------- Player Drawer ---------- */
const PlayerDrawer: React.FC<{ player: Player | null; onClose: () => void }> = ({
  player,
  onClose,
}) => {
  if (!player) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-4xl bg-white shadow-2xl p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {player.photo ? (
              <img
                src={player.photo}
                alt={`${player.name} photo`}
                className="h-16 w-16 rounded-xl object-cover border border-slate-200"
              />
            ) : (
              <div className="h-16 w-16 rounded-xl bg-slate-100 grid place-items-center text-slate-500 text-xl">
                {player.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold">{player.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                <Pill>Para Athletics</Pill>
                {player.classification && <Pill>{player.classification}</Pill>}
                <Pill tone="new">Target: LA 2028</Pill>
              </div>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-lg border text-sm" onClick={onClose}>
            Close
          </button>
        </div>

        {/* INDIVIDUAL FULL-WIDTH CARDS */}
        <div className="mt-6 space-y-4">
          <Card title="Bio & Classification">
            <KeyVal k="Date of Birth" v={player.dob} />
            <KeyVal k="Disability" v={player.disability} />
            <KeyVal k="Class" v={player.classification} />
            <KeyVal k="Education" v={player.education} />
            <KeyVal k="Marital Status" v={player.maritalStatus} />
            <KeyVal k="Club" v={player.club} />
            <KeyVal k="Events" v={player.events?.join(", ")} />
            <KeyVal k="Coach" v={player.coach} />
          </Card>

          <Card title="Training & Support">
            <KeyVal k="Training Years" v={player.trainingYears} />
            <KeyVal k="Training Rate" v={player.trainingRate} />
            <KeyVal k="Support" v={player.supportLevel} />
            <KeyVal k="Preparation Period" v={player.training?.period} />
            <KeyVal k="Annual Plan" v={player.training?.annualPlan} />
          </Card>

          <Card title="Athlete Goals">
            <ul className="list-disc pl-5 text-sm">
              {(player.goals || []).map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Performance tables */}
        <div className="mt-6 space-y-4">
          <Card title="100m T34 — Targets & Results (2025)">
            <MiniTable<CompetitionRow>
              dense
              cols={[
                { key: "name", label: "Competition" },
                { key: "dates", label: "Dates" },
                { key: "target", label: "Target" },
                { key: "achieved", label: "Achieved" },
                { key: "rank", label: "Rank" },
              ]}
              rows={player.comps100m || []}
            />
          </Card>

          <Card title="800m T34 — Targets & Results (2025)">
            <MiniTable<CompetitionRow>
              dense
              cols={[
                { key: "name", label: "Competition" },
                { key: "dates", label: "Dates" },
                { key: "target", label: "Target" },
                { key: "achieved", label: "Achieved" },
                { key: "rank", label: "Rank" },
              ]}
              rows={player.comps800m || []}
            />
          </Card>
        </div>

        {/* Camps plan */}
        <div className="mt-6">
          <Card title="Camps & Competitions Plan">
            <MiniTable<CampRow>
              cols={[
                { key: "dates", label: "Dates" },
                { key: "days", label: "Days" },
                { key: "place", label: "Place" },
                { key: "label", label: "Camp / Competition" },
                { key: "remarks", label: "Remarks" },
              ]}
              rows={player.camps || []}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

function labelForSport(key: SportKey) {
  return SPORTS.find((s) => s.key === key)?.label ?? key;
}

/* ---------- Main App ---------- */
export default function App() {
  const rosterBySport = useRosterBySport(PLAYERS);
  const [active, setActive] = useState<SportKey>("para_athletics");
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState<Player | null>(null); // MAIN page first

  const filtered = (rosterBySport[active] || []).filter((p) =>
    [p.name, p.events?.join(" ")].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  const longListCount = 19;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Club Logo" className="h-10 w-auto object-contain" />
            <div>
              <h1 className={`text-lg font-bold ${brand.blueText}`}>Paralympic Champion Project</h1>
              <p className="text-xs text-slate-500">Los Angeles 2028 — Dubai Club for People of Determination</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Prep Period</div>
            <div className="text-sm font-medium">Nov 2024 – Jul 2028</div>
          </div>
        </div>
        <div className={`h-1 ${brand.grad}`} />
      </header>

      {/* Featured banner */}
      <div className="max-w-7xl mx-auto px-4">
        <FeaturedAthlete p={PLAYERS[0]} onOpenProfile={() => setFocus(PLAYERS[0])} />
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <div className="flex flex-wrap gap-2">
          {SPORTS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                active === s.key
                  ? `bg-blue-700 text-white border-blue-700 shadow`
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
              title={s.status === "new_targeted" ? "New targeted sport" : "Targeted sport"}
            >
              {s.label}
              {s.status === "new_targeted" && (
                <span className="ml-2">
                  <Pill tone="new">NEW</Pill>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Pill>Long List: {longListCount} athletes</Pill>
            <Pill>Short List: (by Oct 2027)</Pill>
            <Pill>LA 2028 Participants: (by Mar 2028)</Pill>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search athlete by name or event…"
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm min-w-[260px]"
            />
            <button
              className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white hover:bg-slate-50"
              onClick={() => setQuery("")}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Roster */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 && (
            <Card>
              <div className="text-center py-10 text-slate-500">
                No athletes yet in {labelForSport(active)}. Add them in the data section.
              </div>
            </Card>
          )}

          {filtered.map((p) => (
            <Card key={p.id}>
              <div className="flex items-start gap-4">
                {p.photo ? (
                  <img
                    src={p.photo}
                    alt={`${p.name} photo`}
                    className="h-16 w-16 rounded-xl object-cover border border-slate-200"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-xl bg-slate-100 grid place-items-center text-slate-500 text-xl">
                    {p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{p.name}</h3>
                    {p.classification && <Pill>{p.classification}</Pill>}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">{p.events?.join(", ") || "—"}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      className={`px-3 py-1.5 rounded-lg text-sm ${brand.accentBtn}`}
                      onClick={() => setFocus(p)}
                    >
                      View Profile
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-sm border border-slate-200 bg-white">
                      Add to Short List
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Program Snapshot */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Medical Monitoring">
            <ul className="list-disc pl-5 text-sm">
              <li>Complete medical checkups every 6 months</li>
              <li>Injury screenings as needed</li>
            </ul>
          </Card>
          <Card title="Technical Evaluation">
            <ul className="list-disc pl-5 text-sm">
              <li>Pre & post physical + anthropometric tests every 3 months</li>
              <li>Assess strengths/weaknesses, determine dietary needs</li>
            </ul>
          </Card>
          <Card title="Monitoring & Evaluation">
            <ul className="list-disc pl-5 text-sm">
              <li>Quarterly evaluation before camps</li>
              <li>Performance DB: biometrics, physiological, biomechanical, motor</li>
              <li>Specialized software to support elite performance</li>
            </ul>
          </Card>
        </div>

        {/* Footer */}
        <footer className="py-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Paralympic Champion — LA 2028 Preparation
        </footer>
      </div>

      {/* Drawer */}
      <PlayerDrawer player={focus} onClose={() => setFocus(null)} />
    </div>
  );
}
