// Lista de asignaturas con info de semestre, requisitos y créditos
const asignaturas = [
  // Primer Año - Semestre I
  { id: "mat1", nombre: "Matemáticas I", semestre: 1, requisitos: [], creditos: 8 },
  { id: "qui1", nombre: "Química General I", semestre: 1, requisitos: [], creditos: 8 },
  { id: "bioCel", nombre: "Biología Celular", semestre: 1, requisitos: [], creditos: 7 },
  { id: "zool", nombre: "Zoología", semestre: 1, requisitos: [], creditos: 7 },

  // Primer Año - Semestre II
  { id: "mat2", nombre: "Matemáticas II", semestre: 2, requisitos: ["mat1"], creditos: 8 },
  { id: "qui2", nombre: "Química General II", semestre: 2, requisitos: ["qui1"], creditos: 8 },
  { id: "mec", nombre: "Introducción a la Mecánica", semestre: 2, requisitos: ["mat1"], creditos: 7 },
  { id: "bioVeg", nombre: "Biología Vegetal", semestre: 2, requisitos: [], creditos: 7 },

  // Segundo Año - Semestre III
  { id: "algLin", nombre: "Álgebra Lineal y Cálculo Vectorial", semestre: 3, requisitos: ["mat2"], creditos: 8 },
  { id: "opt", nombre: "Óptica y Electromagnetismo", semestre: 3, requisitos: ["mec"], creditos: 7 },
  { id: "org", nombre: "Química Orgánica", semestre: 3, requisitos: ["qui2"], creditos: 9 },
  { id: "ingGen", nombre: "Introducción a la Ingeniería Genética", semestre: 3, requisitos: [], creditos: 3 },
  { id: "acu", nombre: "Acuicultura", semestre: 3, requisitos: [], creditos: 3 },

  // Segundo Año - Semestre IV
  { id: "ecuDif", nombre: "Métodos y Aplicaciones de las Ecuaciones Diferenciales", semestre: 4, requisitos: ["algLin"], creditos: 8 },
  { id: "bioq", nombre: "Bioquímica", semestre: 4, requisitos: ["org", "bioCel"], creditos: 9 },
  { id: "termo", nombre: "Termodinámica", semestre: 4, requisitos: ["mat2", "qui2"], creditos: 8 },
  { id: "ingIngl1", nombre: "Inglés Científico I", semestre: 4, requisitos: [], creditos: 3 },
  { id: "cursoGen1", nombre: "Curso de Formación General I", semestre: 4, requisitos: [], creditos: 2 },

  // Tercer Año - Semestre V
  { id: "gen", nombre: "Genética", semestre: 5, requisitos: ["bioq"], creditos: 8 },
  { id: "micro", nombre: "Microbiología", semestre: 5, requisitos: ["bioq"], creditos: 8 },
  { id: "bioes", nombre: "Bioestadística", semestre: 5, requisitos: ["mat1"], creditos: 6 },
  { id: "cinElec", nombre: "Cinética y Electroquímica", semestre: 5, requisitos: ["termo", "ecuDif"], creditos: 8 },

  // Tercer Año - Semestre VI
  { id: "bioMol", nombre: "Biología Molecular", semestre: 6, requisitos: ["gen", "micro"], creditos: 7 },
  { id: "fisMac", nombre: "Fisicoquímica Macromolecular", semestre: 6, requisitos: ["cinElec", "bioq"], creditos: 7 },
  { id: "tallIngGen", nombre: "Taller de Ingeniería Genética", semestre: 6, requisitos: ["gen"], creditos: 8 },
  { id: "electEspecialidad", nombre: "Electivo Especialidad o Unidad de Investigación Electiva", semestre: 6, requisitos: [], creditos: 6 },
  { id: "cursoGen2", nombre: "Curso de Formación General II", semestre: 6, requisitos: [], creditos: 2 },

  // Cuarto Año - Semestre VII
  { id: "biotec", nombre: "Biotecnología", semestre: 7, requisitos: ["bioMol"], creditos: 6 },
  { id: "instrum", nombre: "Instrumentación", semestre: 7, requisitos: ["fisMac"], creditos: 7 },
  { id: "fisGen", nombre: "Fisiología General", semestre: 7, requisitos: ["bioq"], creditos: 8 },
  { id: "ecolMicro", nombre: "Ecología Microbiana y Biotecnología Ambiental", semestre: 7, requisitos: ["gen"], creditos: 6 },
  { id: "ingIngl2", nombre: "Inglés Científico II", semestre: 7, requisitos: ["ingIngl1"], creditos: 3 },

  // Cuarto Año - Semestre VIII
  { id: "inmun", nombre: "Inmunología", semestre: 8, requisitos: ["bioMol"], creditos: 6 },
  { id: "microeco", nombre: "Microeconomía", semestre: 8, requisitos: ["mat2"], creditos: 5 },
  { id: "fisVeg", nombre: "Fisiología Vegetal", semestre: 8, requisitos: ["bioMol"], creditos: 7 },
  { id: "optim", nombre: "Optimización", semestre: 8, requisitos: ["ecuDif"], creditos: 6 },
  { id: "bioet", nombre: "Bioética", semestre: 8, requisitos: ["gen"], creditos: 3 },
  { id: "patLeg", nombre: "Patentes y Legislación", semestre: 8, requisitos: ["tallIngGen"], creditos: 3 },

  // Quinto Año - Semestre IX
  { id: "microInd", nombre: "Microbiología Industrial", semestre: 9, requisitos: ["micro"], creditos: 5 },
  { id: "biotecMed", nombre: "Biotecnología Médica", semestre: 9, requisitos: ["bioMol"], creditos: 5 },
  { id: "opUnit", nombre: "Operaciones Unitarias", semestre: 9, requisitos: ["optim"], creditos: 8 },
  { id: "tallBiotec", nombre: "Taller de Biotecnología", semestre: 9, requisitos: ["fisVeg"], creditos: 5 },
  { id: "uniInvSem", nombre: "Unidad de Investigación de Seminario de Título", semestre: 9, requisitos: [], creditos: 7 },

  // Quinto Año - Semestre X
  { id: "evalProy", nombre: "Evaluación de Proyectos", semestre: 10, requisitos: ["microeco"], creditos: 4 },
  { id: "semTitulo", nombre: "Seminario de Título", semestre: 10, requisitos: [], creditos: 26 }
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
