// @ts-nocheck
import { useState, useEffect } from "react";

const C = {
  bg: "#0d0d12",
  surface: "#16161e",
  card: "#1e1e28",
  border: "rgba(139,92,246,0.2)",
  purple: "#8b5cf6",
  gold: "#f59e0b",
  text: "#f1f0f5",
  muted: "#7c7c8f",
  light: "#c4c3d0",
};

const NAV = [
  { label: "Про студію", id: "about" },
  { label: "Напрямки", id: "styles" },
  { label: "Викладач", id: "teacher" },
  { label: "Галерея", id: "gallery" },
  { label: "Ціни", id: "prices" },
  { label: "Запис", id: "register" },
  { label: "Контакти", id: "contacts" },
];

const STYLES = [
  { name: "Бальні танці", icon: "🩰", desc: "Вальс, танго, фокстрот і квікстеп. Розвиває поставу, відчуття ритму та елегантність руху.", col: C.purple },
  { name: "Хіп-хоп", icon: "🎤", desc: "Енергійний вуличний стиль. Розвиває пластику, впевненість та творче самовираження.", col: C.gold },
  { name: "Контемп", icon: "🌊", desc: "Сучасна хореографія на основі імпровізації та вираження емоцій через пластику тіла.", col: "#06b6d4" },
];

const PRICES = [
  { title: "Пробне заняття", price: "150 грн", per: "", desc: "Одне заняття для знайомства зі студією", features: ["1 заняття", "Будь-який напрямок", "Без зобов'язань"], hot: false },
  { title: "Абонемент", price: "800 грн", per: "/місяць", desc: "8 занять — найпопулярніший вибір", features: ["8 занять на місяць", "Один напрямок", "Знижка 20%", "Гнучкий розклад"], hot: true },
  { title: "Необмежений", price: "1200 грн", per: "/місяць", desc: "Для справжніх танцюристів", features: ["Необмежені заняття", "Всі напрямки", "Пріоритетний запис", "Безкоштовні майстер-класи"], hot: false },
];

const GALLERIES = [
  {
    id: 1,
    name: "Фото студії",
    cover: "studio_cover.jpg",
    images: [
      "studio_1.jpg",
      "studio_2.jpg",
      "studio_3.jpg",
      "studio_4.jpg",
      "studio_5.jpg",
    ],
  },
  {
    id: 2,
    name: "Фото учнів",
    cover: "students_cover.jpg",
    images: [
      "students_1.jpg",
      "students_2.jpg",
      "students_3.jpg",
      "students_4.jpg",
      "students_5.jpg",
      "students_6.jpg",
      "students_7.jpg",
      "students_8.jpg",
      "students_9.jpg",
      "students_10.jpg",
    ],
  },
  {
    id: 3,
    name: "Фото тренерів",
    cover: "teachers_cover.jpg",
    images: [
      "teachers_1.jpg",
      "teachers_2.jpg",
      "teachers_3.jpg",
      "teachers_4.jpg",
    ],
  },
  {
    id: 4,
    name: "Змагання та виступи",
    cover: "events_cover.jpg",
    images: [
      "events_1.jpg",
      "events_2.jpg",
      "events_3.jpg",
      "events_4.jpg",
      "events_5.jpg",
      "events_6.jpg",
      "events_7.jpg",
      "events_8.jpg",
      "events_9.jpg",
      "events_10.jpg",
    ],
  },
];

const GALLERY_EMOJIS = ["🩰", "🎵", "💃", "🕺", "⭐", "🎭", "🏆", "🌟", "🎭", "✨"];
const PLACEHOLDER_COLORS = ["#2d1b4e","#1a2d1a","#2d1a1a","#1a1a2d"];
const GALLERY_COLORS = [["#2d1b4e","#1a0d2e"],["#1a2d1a","#0d1f0d"],["#2d1a1a","#1f0d0d"],["#1a1a2d","#0d0d1f"]];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", age: "", style: "" });
  const [status, setStatus] = useState("idle");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [lightbox, setLightbox] = useState(null); // { galleryId, index }

  const [showCfg, setShowCfg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const send = async () => {
    if (!form.name || !form.phone || !form.age || !form.style) return;
    setStatus("loading");
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
          mode: "no-cors",
        });
      } catch {}
    }
    setTimeout(() => setStatus("done"), 900);
  };

  const inp = {
    width: "100%", padding: "12px 14px", background: "#0d0d12",
    border: `1px solid ${C.border}`, borderRadius: 10, color: C.text,
    fontSize: 15, boxSizing: "border-box", outline: "none",
  };

  return (
    <div style={{ fontFamily: "'Inter',system-ui,sans-serif", background: C.bg, color: C.text, minHeight: "100vh" }}>
      <style>{`
        @keyframes fl { from{transform:translateY(0)} to{transform:translateY(-12px)} }
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(139,92,246,0.4)} 70%{box-shadow:0 0 0 16px transparent} 100%{box-shadow:0 0 0 0 transparent} }
        ::placeholder{color:#555}
        select option{background:#16161e}
        *{scroll-behavior:smooth;box-sizing:border-box}
        .nav-link:hover{color:#fff !important}
        .btn-ghost:hover{background:rgba(139,92,246,0.12) !important}
        .price-card:hover{transform:translateY(-4px);transition:transform 0.2s}
        .gallery-item:hover{transform:scale(1.03);transition:transform 0.2s}
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: scrolled ? "rgba(13,13,18,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.3s",
      }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: C.purple, letterSpacing: -0.5 }}>
          Dance <span style={{ color: C.gold }}>Prostir</span>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
          {NAV.map(n => (
            <button key={n.id} className="nav-link" onClick={() => go(n.id)}
              style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 13, padding: "6px 10px", borderRadius: 6, transition: "color 0.2s" }}>
              {n.label}
            </button>
          ))}
          <button onClick={() => go("register")}
            style={{ background: C.purple, border: "none", color: "#fff", padding: "8px 18px", borderRadius: 30, fontSize: 13, fontWeight: 600, cursor: "pointer", marginLeft: 8 }}>
            Записатись
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "120px 24px 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,92,246,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        {GALLERY_EMOJIS.map((e, i) => (
          <div key={i} style={{
            position: "absolute", fontSize: 28 + i * 6, opacity: 0.07,
            top: `${15 + i * 13}%`, left: i % 2 === 0 ? `${4 + i * 4}%` : `${72 + i * 3}%`,
            animation: `fl ${2.5 + i * 0.4}s ease-in-out infinite alternate`,
          }}>{e}</div>
        ))}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: C.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>
            Танцювальна студія · Київ
          </div>
          <h1 style={{ fontSize: "clamp(52px,12vw,110px)", fontWeight: 900, margin: "0 0 8px", lineHeight: 0.9, letterSpacing: -3 }}>
            <span style={{ color: C.text }}>Dance</span>
          </h1>
          <h1 style={{ fontSize: "clamp(52px,12vw,110px)", fontWeight: 900, margin: "0 0 24px", lineHeight: 0.9, letterSpacing: -3, color: C.purple }}>
            Prostir
          </h1>
          <p style={{ fontSize: 18, color: C.light, maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.7 }}>
            Місце, де рух стає мистецтвом. Бальні танці, хіп-хоп та контемп для дітей 6–14 років.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("register")} style={{
              background: C.purple, border: "none", color: "#fff",
              padding: "15px 36px", borderRadius: 50, fontSize: 16, fontWeight: 700,
              cursor: "pointer", animation: "pulse-ring 2.5s infinite",
            }}>Записатись на заняття</button>
            <button onClick={() => go("about")} className="btn-ghost" style={{
              background: "transparent", border: `1.5px solid ${C.border}`,
              color: C.light, padding: "15px 36px", borderRadius: 50,
              fontSize: 16, cursor: "pointer",
            }}>Дізнатись більше</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "90px 24px", maxWidth: 860, margin: "0 auto" }}>
        <STitle>Про студію</STitle>
        <p style={{ textAlign: "center", color: C.light, fontSize: 17, lineHeight: 1.8, maxWidth: 650, margin: "0 auto 52px" }}>
          <b style={{ color: C.text }}>Dance Prostir</b> — це простір для творчості, руху та розвитку дитини. Ми створили студію, де кожна дитина відкриває свій талант, знаходить друзів і вчиться виражати себе через танець.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16 }}>
          {[["🏆","5+ років","досвіду"],["👧","200+","учнів"],["🎭","3 напрямки","танців"],["⭐","98%","задоволення"]].map(([ic,v,l]) => (
            <div key={l} style={{ textAlign: "center", background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 16px" }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{ic}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: C.purple }}>{v}</div>
              <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DANCE STYLES */}
      <section id="styles" style={{ padding: "90px 24px", background: C.surface }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <STitle>Напрямки</STitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 20 }}>
            {STYLES.map(s => (
              <div key={s.name} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderTop: `3px solid ${s.col}`, borderRadius: 16, padding: 28,
              }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, color: s.col }}>{s.name}</h3>
                <p style={{ color: C.light, lineHeight: 1.7, fontSize: 14, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHER */}
      <section id="teacher" style={{ padding: "90px 24px", maxWidth: 860, margin: "0 auto" }}>
        <STitle>Наш викладач</STitle>
        <div style={{ display: "flex", gap: 44, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{
            width: 180, height: 180, borderRadius: "50%", flexShrink: 0,
            background: C.card, border: `3px solid ${C.purple}`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72,
          }}>💃</div>
          <div style={{ maxWidth: 480 }}>
            <h3 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px" }}>Ім'я Прізвище</h3>
            <div style={{ color: C.purple, fontWeight: 600, marginBottom: 18 }}>Сертифікований хореограф</div>
            <p style={{ color: C.light, lineHeight: 1.8, marginBottom: 14, fontSize: 15 }}>
              Понад 10 років досвіду у викладанні танців для дітей та молоді. Спеціалізується на бальних танцях, хіп-хопі та контемпорарі. Переможець регіональних та всеукраїнських змагань.
            </p>
            <p style={{ color: C.light, lineHeight: 1.8, fontSize: 15, margin: 0 }}>
              Індивідуальний підхід до кожного учня, позитивна атмосфера та любов до танцю — це основа нашої студії.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
              {["Бальні","Хіп-хоп","Контемп","Дитяча хореографія"].map(t => (
                <span key={t} style={{ fontSize: 12, padding: "5px 12px", background: "rgba(139,92,246,0.15)", border: `1px solid ${C.border}`, borderRadius: 20, color: C.light }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: "90px 24px", background: C.surface }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <STitle>Галерея</STitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
            {GALLERY_COLORS.map(([c1,c2], i) => (
              <div key={i} className="gallery-item" onClick={() => setLightbox(i)} style={{
                background: `linear-gradient(135deg, ${c1}, ${c2})`,
                borderRadius: 12, aspectRatio: "4/3", border: `1px solid ${C.border}`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 10, cursor: "pointer", position: "relative", overflow: "hidden",
              }}>
                <div style={{ fontSize: 44 }}>{GALLERY_EMOJIS[i]}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>Фото зі студії</div>
                <div style={{
                  position: "absolute", inset: 0, background: "rgba(139,92,246,0.0)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s", fontSize: 28,
                }} className="gallery-overlay">🔍</div>
              </div>
            ))}
          </div>

          {/* LIGHTBOX */}
          {lightbox !== null && (
            <div onClick={() => setLightbox(null)} style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 24,
            }}>
              <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: 860, width: "100%" }}>
                {/* Закрити */}
                <button onClick={() => setLightbox(null)} style={{
                  position: "absolute", top: -44, right: 0,
                  background: "rgba(255,255,255,0.1)", border: "none",
                  color: "#fff", width: 36, height: 36, borderRadius: "50%",
                  cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
                }}>✕</button>

                {/* Фото */}
                <div style={{
                  background: `linear-gradient(135deg, ${GALLERY_COLORS[lightbox][0]}, ${GALLERY_COLORS[lightbox][1]})`,
                  borderRadius: 16, aspectRatio: "16/9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 80, border: `1px solid ${C.border}`,
                }}>
                  {GALLERY_EMOJIS[lightbox]}
                </div>

                {/* Стрілки */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
                  <button onClick={() => setLightbox((lightbox - 1 + GALLERY_COLORS.length) % GALLERY_COLORS.length)}
                    style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 30, cursor: "pointer", fontSize: 16 }}>
                    ← Попереднє
                  </button>
                  <span style={{ color: C.muted, alignSelf: "center", fontSize: 13 }}>
                    {lightbox + 1} / {GALLERY_COLORS.length}
                  </span>
                  <button onClick={() => setLightbox((lightbox + 1) % GALLERY_COLORS.length)}
                    style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 30, cursor: "pointer", fontSize: 16 }}>
                    Наступне →
                  </button>
                </div>
              </div>
            </div>
          )}
          <p style={{ textAlign: "center", color: "#444", marginTop: 18, fontSize: 13 }}>
            * Замініть placeholder-зображення на реальні фото вашої студії
          </p>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" style={{ padding: "90px 24px", maxWidth: 920, margin: "0 auto" }}>
        <STitle>Ціни</STitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22 }}>
          {PRICES.map(p => (
            <div key={p.title} className="price-card" style={{
              background: p.hot ? `linear-gradient(160deg, rgba(139,92,246,0.18), rgba(139,92,246,0.08))` : C.card,
              border: p.hot ? `2px solid ${C.purple}` : `1px solid ${C.border}`,
              borderRadius: 20, padding: "32px 28px", position: "relative",
            }}>
              {p.hot && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: C.purple, padding: "4px 16px", borderRadius: 20, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>Найпопулярніший</div>}
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>{p.title}</h3>
              <div style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 34, fontWeight: 900, color: p.hot ? C.purple : C.text }}>{p.price}</span>
                <span style={{ color: C.muted, fontSize: 14 }}>{p.per}</span>
              </div>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 22 }}>{p.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px" }}>
                {p.features.map(f => (
                  <li key={f} style={{ padding: "7px 0", borderBottom: `1px solid rgba(255,255,255,0.05)`, color: C.light, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: C.purple, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => go("register")} style={{
                width: "100%", padding: "12px", borderRadius: 50, fontWeight: 700, fontSize: 14, cursor: "pointer",
                background: p.hot ? C.purple : "transparent",
                border: p.hot ? "none" : `1.5px solid ${C.border}`,
                color: "#fff",
              }}>Обрати план</button>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTER */}
      <section id="register" style={{ padding: "90px 24px", background: C.surface }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <STitle>Записатись на заняття</STitle>

          {/* Config button */}
          <div style={{ textAlign: "right", marginBottom: 12 }}>
            <button onClick={() => setShowCfg(!showCfg)} style={{
              background: "none", border: `1px solid ${C.border}`, color: C.muted,
              padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12,
            }}>
              ⚙️ Налаштування Notion
            </button>
          </div>

          {showCfg && (
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 20, fontSize: 13 }}>
              <p style={{ color: C.light, margin: "0 0 12px", fontWeight: 600 }}>🔗 Підключення до Notion через Make.com / Zapier</p>
              <ol style={{ color: C.muted, lineHeight: 2, paddingLeft: 20, margin: "0 0 14px" }}>
                <li>Зареєструйтесь на <b style={{ color: C.light }}>make.com</b></li>
                <li>Створіть сценарій: <b style={{ color: C.light }}>Webhook → Notion (Create Page)</b></li>
                <li>Скопіюйте URL вебхука та вставте нижче</li>
              </ol>
              <label style={{ display: "block", marginBottom: 6, color: C.muted, fontSize: 12 }}>URL вебхука (Make.com / Zapier)</label>
              <input
                type="url" placeholder="https://hook.eu1.make.com/..." value={webhookUrl}
                onChange={e => setWebhookUrl(e.target.value)}
                style={{ ...inp, fontSize: 13 }}
              />
              <p style={{ color: "#555", fontSize: 11, marginTop: 8 }}>Поля, що передаються: name, phone, age, style, timestamp</p>
            </div>
          )}

          {status === "done" ? (
            <div style={{ textAlign: "center", padding: "56px 24px", background: C.card, borderRadius: 20, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 60, marginBottom: 18 }}>🎉</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Заявку прийнято!</h3>
              <p style={{ color: C.light, lineHeight: 1.7 }}>Дякуємо! Ми зв'яжемося з вами найближчим часом для підтвердження запису.</p>
              <button onClick={() => { setStatus("idle"); setForm({ name:"",phone:"",age:"",style:"" }); }}
                style={{ marginTop: 24, background: "none", border: `1px solid ${C.border}`, color: C.muted, padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontSize: 14 }}>
                Новий запис
              </button>
            </div>
          ) : (
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 36 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { k:"name", label:"Ім'я дитини", ph:"Введіть ім'я", type:"text" },
                  { k:"phone", label:"Номер телефону батьків", ph:"+380 XX XXX XX XX", type:"tel" },
                  { k:"age", label:"Вік дитини (6–14 років)", ph:"Наприклад: 9", type:"number" },
                ].map(f => (
                  <div key={f.k}>
                    <label style={{ display: "block", marginBottom: 7, color: C.muted, fontSize: 13 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} value={form[f.k]}
                      onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                      style={inp} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", marginBottom: 7, color: C.muted, fontSize: 13 }}>Напрямок танців</label>
                  <select value={form.style} onChange={e => setForm({ ...form, style: e.target.value })} style={{ ...inp, color: form.style ? C.text : "#555" }}>
                    <option value="">Оберіть напрямок</option>
                    <option>Бальні танці</option>
                    <option>Хіп-хоп</option>
                    <option>Контемп</option>
                  </select>
                </div>
                <button onClick={send} disabled={status === "loading" || !form.name || !form.phone || !form.age || !form.style}
                  style={{
                    background: C.purple, border: "none", color: "#fff", padding: "15px",
                    borderRadius: 50, fontSize: 16, fontWeight: 700, cursor: "pointer",
                    opacity: (!form.name || !form.phone || !form.age || !form.style) ? 0.5 : 1,
                    marginTop: 4,
                  }}>
                  {status === "loading" ? "Відправляємо..." : "Надіслати заявку →"}
                </button>
                <p style={{ textAlign: "center", color: "#444", fontSize: 12, margin: 0 }}>
                  Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "90px 24px", maxWidth: 860, margin: "0 auto" }}>
        <STitle>Контакти та розташування</STitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 20, marginBottom: 40 }}>
          {[
            { icon:"📍", label:"Адреса", val:"Печерський узвіз, 3, Київ 02000" },
            { icon:"📞", label:"Телефон", val:"+380 XX XXX XX XX" },
            { icon:"📧", label:"Email", val:"info@danceprostir.ua" },
            { icon:"🕐", label:"Графік", val:"Пн–Сб: 10:00–20:00" },
          ].map(c => (
            <div key={c.label} style={{ textAlign: "center", background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 16px" }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ color: C.purple, fontWeight: 600, fontSize: 12, marginBottom: 6 }}>{c.label}</div>
              <div style={{ color: C.light, fontSize: 14 }}>{c.val}</div>
            </div>
          ))}
        </div>
        <div style={{
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, height: 240,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          <div style={{ fontSize: 40 }}>🗺️</div>
          <div style={{ color: C.muted, fontSize: 14 }}>Вставте iframe з Google Maps</div>
          <code style={{ fontSize: 12, color: "#444", background: "#0d0d0d", padding: "4px 12px", borderRadius: 6 }}>
            {'<iframe src="https://maps.google.com/..." />'}
          </code>
        </div>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
          {[
            ["Instagram","📸","https://www.instagram.com/dance_prostir/"],
            ["Facebook","👥","https://www.facebook.com/people/Dance-Prostir/100086073223400/"],
          ].map(([n,ic,url]) => (
            <a key={n} href={url} target="_blank" rel="noopener noreferrer" style={{
              background: "transparent", border: `1px solid ${C.border}`,
              color: C.light, padding: "10px 22px", borderRadius: 30, fontSize: 14,
              cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
            }}>{ic} {n}</a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#080810", borderTop: `1px solid ${C.border}`, padding: "36px 24px", textAlign: "center" }}>
        <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 10 }}>
          <span style={{ color: C.purple }}>Dance</span> <span style={{ color: C.gold }}>Prostir</span>
        </div>
        <div style={{ color: C.muted, fontSize: 13, marginBottom: 6 }}>📍 Печерський узвіз, 3, Київ 02000</div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 14 }}>
          <a href="https://www.instagram.com/dance_prostir/" target="_blank" rel="noopener noreferrer" style={{ color: C.muted, fontSize: 13, textDecoration: "none" }}>📸 Instagram</a>
          <a href="https://www.facebook.com/people/Dance-Prostir/100086073223400/" target="_blank" rel="noopener noreferrer" style={{ color: C.muted, fontSize: 13, textDecoration: "none" }}>👥 Facebook</a>
          <a href="https://maps.app.goo.gl/qysdY3HJLLfoa53P9" target="_blank" rel="noopener noreferrer" style={{ color: C.muted, fontSize: 13, textDecoration: "none" }}>📍 Google Maps</a>
        </div>
        <div style={{ color: "#444", fontSize: 12 }}>© 2025 Dance Prostir. Всі права захищені.</div>
      </footer>
    </div>
  );
}

function STitle({ children }) {
  return (
    <h2 style={{ textAlign: "center", fontSize: "clamp(26px,5vw,38px)", fontWeight: 800, marginBottom: 40, color: "#f1f0f5" }}>
      {children}
    </h2>
  );
}
