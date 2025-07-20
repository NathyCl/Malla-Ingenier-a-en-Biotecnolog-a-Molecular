// Lista de asignaturas con info de semestre, requisitos y créditos
const asignaturas = [
  // Primer año - Semestre I
  { id: "mat1", nombre: "Matemáticas I", semestre: 1, requisitos: [], creditos: 8 },
  { id: "qui1", nombre: "Química General I", semestre: 1, requisitos: [], creditos: 8 },
  { id: "bioCel", nombre: "Biología Celular", semestre: 1, requisitos: [], creditos: 7 },
  { id: "zool", nombre: "Zoología", semestre: 1, requisitos: [], creditos: 7 },

  // Semestre II
  { id: "mat2", nombre: "Matemáticas II", semestre: 2, requisitos: ["mat1"], creditos: 8 },
  { id: "qui2", nombre: "Química General II", semestre: 2, requisitos: ["qui1"], creditos: 8 },
  { id: "mec", nombre: "Introducción a la Mecánica", semestre: 2, requisitos: ["mat1"], creditos: 7 },
  { id: "bioVeg", nombre: "Biología Vegetal", semestre: 2, requisitos: [], creditos: 7 },

  // Tercer semestre (añade más aquí según necesites)...
  { id: "algLin", nombre: "Álgebra Lineal y Cálculo Vectorial", semestre: 3, requisitos: ["mat2"], creditos: 8 },
  { id: "opt", nombre: "Óptica y Electromagnetismo", semestre: 3, requisitos: ["mec"], creditos: 7 },
  { id: "org", nombre: "Química Orgánica", semestre: 3, requisitos: ["qui2"], creditos: 9 },
  { id: "ingGen", nombre: "Intro a la Ingeniería Genética", semestre: 3, requisitos: [], creditos: 3 },
  { id: "acu", nombre: "Acuicultura", semestre: 3, requisitos: [], creditos: 3 },

  // Continúa con las demás asignaturas...
];

// Guardar el contenedor principal
const malla = document.getElementById("malla");

// Recuperar asignaturas aprobadas desde localStorage
let aprobadas = JSON.parse(localStorage.getItem("aprobadas")) || [];

// Agrupar asignaturas por semestre
const agrupadas = asignaturas.reduce((acc, asig) => {
  const sem = asig.semestre;
  if (!acc[sem]) acc[sem] = [];
  acc[sem].push(asig);
  return acc;
}, {});

// Generar la malla completa
function renderMalla() {
  malla.innerHTML = ""; // Limpiar antes de volver a renderizar

  Object.entries(agrupadas).forEach(([semestre, ramos]) => {
    // Crear contenedor del semestre
    const contenedor = document.createElement("div");
    contenedor.className = `semestre sem-${semestre}`;
    
    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${semestre}`;
    contenedor.appendChild(titulo);

    // Contenedor para las asignaturas
    const grid = document.createElement("div");
    grid.className = "asignaturas";

    ramos.forEach(ramo => {
      const div = document.createElement("div");
      div.classList.add("asignatura");

      const requisitosCumplidos = ramo.requisitos.every(r => aprobadas.includes(r));
      const estaAprobada = aprobadas.includes(ramo.id);

      if (estaAprobada) {
        div.classList.add("aprobada");
      } else if (requisitosCumplidos) {
        div.classList.add("disponible");
        div.addEventListener("click", () => aprobarRamo(ramo.id));
      } else {
        div.classList.add("bloqueada");
        div.title = `Requiere: ${ramo.requisitos.map(id => {
          const r = asignaturas.find(a => a.id === id);
          return r ? r.nombre : id;
        }).join(", ")}`;
      }

      div.innerHTML = `<strong>${ramo.nombre}</strong><br><small>${ramo.creditos} SCT</small>`;
      grid.appendChild(div);
    });

    contenedor.appendChild(grid);
    malla.appendChild(contenedor);
  });
}

// Marcar un ramo como aprobado
function aprobarRamo(id) {
  if (!aprobadas.includes(id)) {
    aprobadas.push(id);
    localStorage.setItem("aprobadas", JSON.stringify(aprobadas));
    renderMalla();
  }
}

// Inicializar
renderMalla();
// Botón para reiniciar progreso
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  if (confirm("¿Seguro que quieres reiniciar todo el progreso?")) {
    aprobadas = [];
    localStorage.removeItem("aprobadas");
    renderMalla();
  }
});
function mostrarProgreso() {
  const total = asignaturas.length;
  const aprob = aprobadas.length;
  const porcentaje = ((aprob / total) * 100).toFixed(1);

  // Progreso general
  const progresoDiv = document.getElementById("progreso");
  progresoDiv.textContent = `Avance total: ${aprob} / ${total} asignaturas (${porcentaje}%)`;

  // Progreso por semestre (opcional)
  // Si quieres también mostrar por semestre, puedes implementarlo aquí
}

// Llama esta función desde renderMalla
function renderMalla() {
  malla.innerHTML = "";

  //... tu código para crear semestres y asignaturas

  mostrarProgreso();  // <-- Actualiza progreso cada vez que renderizas
}

