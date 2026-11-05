// Para cambiar textos de los vídeos o añadir uno nuevo, edita esta lista.
// Los que llevan "yt" se reproducen desde YouTube; los demás, desde la carpeta media.
// cats: th = Talking head, ads = Anuncios, anim = Animación, dep = Deporte
const TRABAJOS = [
  { id: "09", tipo: "Talking head", titulo: "4 estilos diferentes", detalle: "A cámara con gráficos", cats: ["th"] },
  { id: "10", tipo: "Talking head", titulo: "Calidad que se nota", detalle: "A cámara con 3D", cats: ["th"] },
  { id: "01", tipo: "Anuncio", titulo: "Yo estaba sentado", detalle: "Tipografía cinética", cats: ["th", "ads"] },
  { id: "17", tipo: "Animación", titulo: "Señales de tu colchón", detalle: "Personaje animado", cats: ["anim", "ads"] },
  { id: "18", tipo: "Anuncio", titulo: "Burning Man 2026", detalle: "Montaje y títulos", cats: ["ads"] },
  { id: "07", tipo: "Reel", titulo: "Reel con hook", detalle: "Text hook y montaje", cats: ["th"] },
  { id: "21", tipo: "Animación", titulo: "Controls everything", detalle: "Animación 3D y a cámara", cats: ["anim", "th"] },
  { id: "20", tipo: "Anuncio", titulo: "El primer mordisco", detalle: "Collage animado", cats: ["ads", "anim"] },
  { yt: "VgaUxR6lGHQ", tipo: "Deporte", titulo: "Jordan 11 Gratitude", detalle: "Storytelling", cats: ["dep"] },
  { id: "11", tipo: "Deporte", titulo: "Ritmo de pádel", detalle: "A cámara con gráficos", cats: ["th", "dep"] },
  { yt: "PrGmYKJFMik", tipo: "Talking head", titulo: "Mentalidad ganadora", detalle: "A cámara", cats: ["th"] },
  { id: "22", tipo: "Deporte", titulo: "Pelayo y Elena", detalle: "Marcador y montaje", cats: ["dep"] },
  { id: "19", tipo: "Anuncio", titulo: "Casi nadie lo conoce", detalle: "Text hook y montaje", cats: ["ads"] },
  { id: "04", tipo: "Anuncio", titulo: "La diferencia", detalle: "Motion graphics", cats: ["ads", "anim"] },
  { id: "02", tipo: "Anuncio", titulo: "Los mercados cambian", detalle: "Tipografía cinética", cats: ["th", "ads"] },
  { id: "06", tipo: "Anuncio", titulo: "+22.500 seguidores", detalle: "Gráficos sobre video", cats: ["th", "ads"] },
  { id: "03", tipo: "Anuncio", titulo: "Cada negocio", detalle: "Animación y montaje", cats: ["th", "ads"] },
  { yt: "0KcvBOLok7c", tipo: "Anuncio", titulo: "BBQ Colombian Experience", detalle: "Montaje gastronómico", cats: ["ads"] },
  { yt: "JwKmzDaNWvM", tipo: "Talking head", titulo: "AION", detalle: "A cámara", cats: ["th"] },
  { yt: "oPI1i7f3RVE", tipo: "Deporte", titulo: "KOBE Colombia", detalle: "Storytelling", cats: ["dep"] },
  { id: "15", tipo: "Deporte", titulo: "Top 10 de pádel", detalle: "A cámara con textos", cats: ["th", "dep"] },
  { id: "14", tipo: "Deporte", titulo: "Consejo de pádel", detalle: "A cámara con gráficos", cats: ["th", "dep"] },
  { id: "16", tipo: "Deporte", titulo: "Globo alto y profundo", detalle: "Gráficos sobre video", cats: ["dep"] },
  { id: "12", tipo: "Deporte", titulo: "Cruzados de pádel", detalle: "Textos sobre video", cats: ["dep"] },
  { id: "13", tipo: "Deporte", titulo: "Zonas de la pista", detalle: "Gráficos en 3D", cats: ["dep"] },
];
const SHOWREEL = "kAD_KtENM9o";
const FILTROS = [["todos", "Todos"], ["th", "Talking head"], ["ads", "Anuncios"], ["anim", "Animación"], ["dep", "Deporte"]];
const AL_ENTRAR = 12;

// Datos de contacto: añade aquí los que quieras mostrar. Vacío = no se muestra nada.
// Ejemplo: { texto: "Instagram", enlace: "https://instagram.com/..." }
const CONTACTO = [];

const embed = (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;

const grilla = document.getElementById("grilla");
const fichas = TRABAJOS.map((t, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "ficha aparece";
  b.setAttribute("aria-label", `Ver ${t.titulo}`);
  const imagen = t.yt
    ? `<img src="media/y${t.yt}.jpg" alt="" loading="lazy">`
    : `<video data-src="media/t${t.id}.mp4" poster="media/p${t.id}.jpg" muted loop playsinline preload="none"></video>`;
  b.innerHTML = `${imagen}<div class="info"><span></span><h3>${t.titulo}</h3></div>`;
  b.addEventListener("click", () => abrir(i));
  grilla.append(b);
  return b;
});

// Filtros y "Ver todos"
const filtros = document.getElementById("filtros");
const verTodos = document.getElementById("ver-todos");
let filtro = "todos";
let desplegado = false;
let lista = [];
function pintar() {
  const coinciden = TRABAJOS.map((_, i) => i).filter((i) => filtro === "todos" || TRABAJOS[i].cats.includes(filtro));
  lista = filtro === "todos" && !desplegado ? coinciden.slice(0, AL_ENTRAR) : coinciden;
  fichas.forEach((f, i) => { f.hidden = !lista.includes(i); });
  lista.forEach((i, n) => {
    fichas[i].querySelector("span").textContent = `${String(n + 1).padStart(2, "0")} — ${TRABAJOS[i].tipo}`;
  });
  verTodos.hidden = lista.length === coinciden.length;
  verTodos.textContent = `Ver todos (${coinciden.length})`;
  filtros.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.f === filtro));
}
FILTROS.forEach(([clave, texto]) => {
  const b = document.createElement("button");
  b.type = "button";
  b.dataset.f = clave;
  b.textContent = texto;
  b.addEventListener("click", () => { filtro = clave; pintar(); });
  filtros.append(b);
});
verTodos.addEventListener("click", () => { desplegado = true; pintar(); });
pintar();

// Show reel: YouTube solo se carga al pulsar
const reel = document.getElementById("reel");
reel.addEventListener("click", () => {
  const f = document.createElement("iframe");
  f.src = embed(SHOWREEL);
  f.title = "Show reel";
  f.allow = "autoplay; encrypted-media; fullscreen";
  f.allowFullscreen = true;
  f.referrerPolicy = "strict-origin-when-cross-origin";
  f.className = "reel-marco";
  reel.replaceWith(f);
});

const contacto = document.getElementById("contacto");
CONTACTO.forEach((c) => {
  const a = document.createElement("a");
  a.className = "btn";
  a.href = c.enlace;
  a.textContent = c.texto;
  contacto.append(a);
});

// Los clips de la cuadrícula solo se cargan y reproducen cuando están en pantalla
const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clips = new IntersectionObserver((entradas) => {
  entradas.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting) {
      if (!v.src) v.src = v.dataset.src;
      if (!quieto) v.play().catch(() => {});
    } else {
      v.pause();
    }
  });
}, { threshold: 0.25 });
document.querySelectorAll(".ficha video").forEach((v) => clips.observe(v));

const apariciones = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visto");
      apariciones.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".aparece").forEach((el) => apariciones.observe(el));

// El scroll funciona como una línea de tiempo: 1 página = 01:30:00 a 24 fps
const tc = document.getElementById("tc");
const cabezal = document.getElementById("cabezal");
const DURACION = 90;
const dos = (n) => String(n).padStart(2, "0");
function timecode() {
  const alto = document.documentElement.scrollHeight - innerHeight;
  const p = alto > 0 ? Math.min(scrollY / alto, 1) : 0;
  const s = p * DURACION;
  tc.textContent = `00:${dos(Math.floor(s / 60))}:${dos(Math.floor(s % 60))}:${dos(Math.floor((s % 1) * 24))}`;
  cabezal.style.top = `${p * 100}%`;
}
addEventListener("scroll", () => requestAnimationFrame(timecode), { passive: true });
addEventListener("resize", timecode);
timecode();

// Visor con sonido
const visor = document.getElementById("visor");
const reproductor = document.getElementById("reproductor");
const marcoYt = document.getElementById("yt");
const pie = document.getElementById("pie-video");
let actual = 0;
function parar() {
  reproductor.pause();
  reproductor.removeAttribute("src");
  reproductor.load();
  marcoYt.removeAttribute("src");
}
function cargar(i) {
  actual = i;
  const t = TRABAJOS[i];
  parar();
  reproductor.hidden = !!t.yt;
  marcoYt.hidden = !t.yt;
  pie.textContent = `${t.tipo} — ${t.titulo} — ${t.detalle}`;
  if (t.yt) {
    marcoYt.src = embed(t.yt);
  } else {
    reproductor.src = `media/v${t.id}.mp4`;
    reproductor.poster = `media/p${t.id}.jpg`;
    reproductor.play().catch(() => {});
  }
}
function mover(paso) {
  const n = lista.indexOf(actual);
  cargar(lista[(n + paso + lista.length) % lista.length]);
}
function abrir(i) {
  visor.showModal();
  cargar(i);
}
document.getElementById("cerrar").addEventListener("click", () => visor.close());
document.getElementById("ant").addEventListener("click", () => mover(-1));
document.getElementById("sig").addEventListener("click", () => mover(1));
visor.addEventListener("close", parar);
visor.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") mover(-1);
  if (e.key === "ArrowRight") mover(1);
});

document.getElementById("imprimir").addEventListener("click", () => print());
