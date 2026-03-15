import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

const App = () => {
  const [temaSeleccionado, setTemaSeleccionado] = useState('la célula');
  const [tablero, setTablero] = useState([]);
  const [frase, setFrase] = useState([]);
  const [esModoNeon, setEsModoNeon] = useState(true);

  // 1. ESTILOS DE ANIMACIÓN CSS (Para dar el efecto "movible" profesional)
  const styles = `
    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }
    @keyframes pulse-soft { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .icon-float:hover { animation: float 2s ease-in-out infinite; }
    .icon-pulse { animation: pulse-soft 3s ease-in-out infinite; }
    .icon-spin:hover { animation: spin-slow 8s linear infinite; }
  `;

  // 2. CONFIGURACIÓN DE CATEGORÍAS SAAC
  const categorias = {
    persona: { n: 'PERSONA', c: '#39ff14', i: 'User' },
    verbo: { n: 'ACCIÓN', c: '#0ea5e9', i: 'Play' },
    objeto: { n: 'OBJETO', c: '#fb923c', i: 'FlaskConical' },
    lugar: { n: 'LUGAR', c: '#ef4444', i: 'MapPin' },
    social: { n: 'SOCIAL', c: '#d946ef', i: 'MessageCircle' },
    descr: { n: 'DESCRIP.', c: '#eab308', i: 'Info' }
  };

  // 3. MAPEO PROFESIONAL DE ICONOS (Lógica de Coherencia Total)
  const iconosCCNN = {
    // Personas y Seres
    "YO": "User", "MAESTRO": "GraduationCap", "CIENTÍFICO": "UserSearch", "QUÍMICO": "FlaskRound", "AUXILIAR": "Contact", "EQUIPO": "Users", "ESTUDIANTE": "BookOpen", "SOL": "Sun", "PLANTA": "Leaf", "ANIMAL": "Dog", "ECOLOGISTA": "TreePine", "ASTRONAUTA": "Rocket", "DOCTOR": "Stethoscope", "GEÓLOGO": "Pickaxe", "PACIENTE": "Bed", "METEORÓLOGO": "CloudSun", "PRODUCTOR": "Sprout", "PREDADOR": "Skull", "NUBE": "Cloud", "HONGO": "Shrink", "MADRE": "Heart", "PADRE": "User", "BEBÉ": "Baby", "CONSUMIDOR": "Utensils", "INVESTIGADOR": "Search", "COMPAÑERO": "UserPlus", "FAMILIA": "Home", "EXPLORADOR": "Compass", "GUÍA": "Map", "PRESA": "Target", "INGENIERO": "HardHat", "MÉDICO": "Stethoscope", "HIJO": "Baby", "HOMBRE": "User", "MUJER": "UserRound", "BACTERIA": "Bug", "ALGA": "Waves",
    // Verbos (Acciones con coherencia)
    "OBSERVAR": "Eye", "DIBUJAR": "Pencil", "ENFOCAR": "Scan", "PREPARAR": "Hand", "IDENTIFICAR": "Search", "ANALIZAR": "Zap", "MEDIR": "Ruler", "PROBAR": "Beaker", "MEZCLAR": "Dribbble", "ANOTAR": "ClipboardList", "VERTER": "Droplet", "ESPERAR": "Timer", "SUBIR": "ArrowUp", "BAJAR": "ArrowDown", "CORRER": "Wind", "ENFRIAR": "Snowflake", "CALENTAR": "Flame", "CAMBIAR": "RefreshCw", "RECICLAR": "Recycle", "CUIDAR": "HeartHandshake", "COMER": "Utensils", "VIAJAR": "Plane", "ORBITAR": "Orbit", "DIGERIR": "Activity", "PENSAR": "BrainCircuit", "MOVER": "Move", "SENTIR": "Fingerprint", "CLASIFICAR": "Layers", "RENOVAR": "Zap", "NACER": "Baby", "EXPERIMENTAR": "FlaskConical", "BATIR": "Wind", "FILTRAR": "Filter", "ECHAR": "ArrowDownCircle", "CAVAR": "Shovel", "ROTAR": "RotateCw", "FLOTAR": "Cloud", "ATRAER": "Magnet", "PEGAR": "Link", "SOSTENER": "Hand", "ABSORBER": "ArrowDown", "REDUCIR": "Minimize2", "BRILLAR": "Sun", "MASTICAR": "UtensilsCrossed", "REACCIONAR": "Zap", "CRECER": "TrendingUp", "LLOVER": "CloudRain", "AHORRAR": "PiggyBank", "HEREDAR": "Dna", "DUDAR": "HelpCircle", "VIBRAR": "Activity", "TRANSFORMAR": "Zap", "MIRAR": "Eye", "TRAGAR": "ArrowDown", "EXPULSAR": "LogOut", "VOLAR": "Plane", "SOLEAR": "Sun", "ABRIGAR": "Shield", "MOJAR": "Droplets", "SECAR": "Wind", "CONDENSAR": "CloudRain", "UNIR": "Link", "SEPARAR": "Scissors", "FUNDIR": "Flame", "SOLIDIFICAR": "Box", "CAZAR": "Target",
    // Objetos y Ciencia (Coherencia Visual)
    "NÚCLEO": "Target", "ADN": "Dna", "CITOPLASMA": "Atom", "MITOCONDRIA": "BatteryCharging", "VACUOLA": "CircleDot", "MEMBRANA": "Circle", "ÁCIDO": "TestTube2", "BASE": "GlassWater", "NEUTRO": "Scale", "INDICADOR": "Pipette", "PAPEL PH": "FileText", "TUBO": "TestTube", "VAPOR": "CloudRain", "GOTAS": "Droplets", "MAR": "Waves", "NIEVE": "IceCream", "BASURA": "Trash2", "PLÁSTICO": "Box", "ENERGÍA": "Zap", "ESTRELLA": "Star", "LUNA": "Moon", "GALAXIA": "MilkyWay", "BOCA": "Mic", "ESTÓMAGO": "Pocket", "INTESTINO": "Tally5", "HÍGADO": "Biohazard", "IMÁN": "Magnet", "METAL": "Square", "BRÚJULA": "Compass", "HUESO": "Bone", "CRÁNEO": "Skull", "CEREBRO": "Brain", "NERVIOS": "GitBranch", "HIELO": "Snowflake", "RAÍZ": "ChevronDown", "HOJA": "Leaf", "ELECTRÓN": "Minus", "ENLACE": "Link", "MANTO": "Globe", "MAGMA": "Flame", "PANEL SOLAR": "SunMedium", "HÉLICE": "Fan", "ÓVULO": "Egg", "GENES": "Fingerprint", "HIPÓTESIS": "Lightbulb", "DATOS": "Database", "SOLUTO": "Droplets", "SOLVENTE": "CupSoda", "SAL": "BoxSelect", "HIERRO": "Component", "CORTEZA": "Mountain", "CLOROFILA": "Leaf", "OXÍGENO": "Wind", "FRÍO": "ThermometerSnowflake", "VIENTO": "Wind", "CABLE": "Split", "CROMOSOMA": "Dna", "TEORÍA": "Book", "PLACAS": "Layers", "CADENA": "Link2", "VOLCÁN": "Mountain", "VASO": "GlassWater", "BOTELLA": "CupSoda", "CONTENEDOR": "Trash2", "COHETE": "Rocket", "BOLO": "Circle", "POLO NORTE": "ArrowUp", "POLO SUR": "ArrowDown", "FÉMUR": "Bone", "ARTICULACIÓN": "Link", "MEMORIA": "HardDrive", "AZÚCAR": "Box", "LUCES": "Lightbulb", "INVIERNO": "Snowflake", "VERANO": "Sun", "EMBUDO": "Filter", "GAS": "Cloud", "ESPECIE": "Fingerprint", "SISMOS": "Activity", "CONEJO": "Rabbit", "ÁGUILA": "Bird",
    // Lugares
    "LABORATORIO": "Beaker", "MICROSCOPIO": "Microscope", "AULA": "School", "MESA": "Layout", "ESTACIÓN": "MapPin", "MUESTRA": "FlaskRound", "CIELO": "Cloud", "PLANETA": "Globe2", "BOSQUE": "Trees", "ESPACIO": "Orbit", "CUERPO": "Accessibility", "GUATEMALA": "Map", "CASA": "Home", "INTERIOR": "LogIn", "JARDÍN": "Flower2", "BIBLIOTECA": "Library", "ZOO": "PawPrint", "HOSPITAL": "Hospital", "GIMNASIO": "Dumbbell", "PARQUE": "Trees", "COSTA": "Waves", "SISTEMA SOLAR": "Orbit", "ATMÓSFERA": "Cloud", "NATURALEZA": "Mountain", "CALLE": "MapPin", "MUNDO": "Globe", "COCINA": "ChefHat", "BAÑO": "Droplets", "PISO": "Square", "CLÍNICA": "Hospital", "MAQUETA": "Box", "HUERTO": "Sprout", "PILETA": "Droplet", "FRASCO": "GlassWater",
    // Social / Descriptivos
    "HOLA": "MessageSquare", "AYUDA": "LifeBuoy", "GRACIAS": "Heart", "MIRA": "Eye", "LISTO": "CheckCircle", "SÍ": "ThumbsUp", "NO": "ThumbsDown", "BIEN": "Smile", "MAL": "Frown", "VIVO": "HeartPulse", "PEQUEÑO": "Minimize", "VEGETAL": "Sprout", "RÍGIDO": "Shield", "AZUL": "Palette", "ROJO": "Flame", "VERDE": "Leaf", "LIMPIO": "Sparkles", "SUCIO": "Skull", "GIGANTE": "Maximize", "INVISIBLE": "Ghost", "MAGNÉTICO": "Magnet", "DURO": "Square", "FALSO": "XCircle", "HOMOGÉNEO": "Circle", "HETEROGÉNEO": "Shapes", "TURBIO": "CloudFog", "CALIENTE": "ThermometerSun", "DUELE": "AlertCircle", "TE QUIERO": "Heart", "POR QUÉ": "HelpCircle", "SANO": "ShieldCheck", "PUEBLO": "Home", "AGUA": "Droplets", "LEJOS": "MoveRight", "SORPRESA": "Zap", "OSCURO": "Moon", "HAMBRE": "Utensils", "DULCE": "Candy", "FUERTE": "Dumbbell", "DÉBIL": "Cloud", "BLANCO": "Circle", "NATURAL": "Flower", "HÚMEDO": "Droplets", "NUBLADO": "Cloud", "ESPESO": "Waves", "IGUAL": "Equals", "BARATO": "DollarSign", "JOVEN": "Baby", "LÓGICO": "Brain", "PURO": "Sparkles", "UNIDO": "Link", "MUERTO": "Skull"
  };

  // 4. BIBLIOTECA 6x6 (20 TEMAS COMPLETOS)
  const bibliotecaCCNN = {
    "la célula": {
      persona: ["CIENTÍFICO", "MAESTRO", "AUXILIAR", "EQUIPO", "ESTUDIANTE", "YO"],
      verbo: ["OBSERVAR", "DIBUJAR", "ENFOCAR", "PREPARAR", "IDENTIFICAR", "ANALIZAR"],
      objeto: ["NÚCLEO", "MEMBRANA", "ADN", "CITOPLASMA", "VACUOLA", "MITOCONDRIA"],
      lugar: ["LABORATORIO", "MICROSCOPIO", "MUESTRA", "MESA", "ESTACIÓN", "AULA"],
      social: ["HOLA", "AYUDA", "GRACIAS", "MIRA", "LISTO", "SÍ"],
      descr: ["VIVO", "PEQUEÑO", "VEGETAL", "ANIMAL", "ORGÁNICO", "RÍGIDO"]
    },
    "el ph": {
      persona: ["QUÍMICO", "MAESTRO", "COMPAÑERO", "EQUIPO", "AUXILIAR", "YO"],
      verbo: ["MEDIR", "PROBAR", "MEZCLAR", "ANOTAR", "VERTER", "ESPERAR"],
      objeto: ["ÁCIDO", "BASE", "NEUTRO", "INDICADOR", "PAPEL PH", "TUBO"],
      lugar: ["LABORATORIO", "VASO", "PILETA", "GRIFO", "GRADILLA", "AULA"],
      social: ["DAME", "BIEN", "MAL", "GRACIAS", "SÍ", "NO"],
      descr: ["CORROSIVO", "PELIGROSO", "ROJO", "AZUL", "LÍQUIDO", "TRANSPARENTE"]
    },
    "ciclo del agua": {
      persona: ["SOL", "NUBE", "LLUVIA", "MAESTRO", "ESTUDIANTE", "YO"],
      verbo: ["SUBIR", "BAJAR", "CORRER", "ENFRIAR", "CALENTAR", "CAMBIAR"],
      objeto: ["VAPOR", "GOTAS", "MAR", "NIEVE", "MONTAÑA", "SUELO"],
      lugar: ["CIELO", "PLANETA", "EXTERIOR", "PAISAJE", "MAPA", "AULA"],
      social: ["MIRA", "HOLA", "AGUA", "SÍ", "NO", "BIEN"],
      descr: ["AZUL", "HÚMEDO", "SECO", "RÁPIDO", "LENTO", "INFINITO"]
    },
    "ecología": {
      persona: ["ECOLOGISTA", "MAESTRO", "FAMILIA", "GENTE", "COMUNIDAD", "YO"],
      verbo: ["RECICLAR", "REUSAR", "REDUCIR", "LIMPIAR", "CUIDAR", "PROTEGER"],
      objeto: ["BASURA", "PLÁSTICO", "BOTELLA", "PAPEL", "CONTENEDOR", "PLANETA"],
      lugar: ["CALLE", "PARQUE", "CASA", "ESCUELA", "MUNDO", "SUELO"],
      social: ["AYUDA", "HOLA", "GRACIAS", "SÍ", "NO", "BIEN"],
      descr: ["LIMPIO", "SUCIO", "VERDE", "ECOLÓGICO", "BUENO", "SANO"]
    },
    "el universo": {
      persona: ["ASTRONAUTA", "MAESTRO", "CIENTÍFICO", "EQUIPO", "GENTE", "YO"],
      verbo: ["VIAJAR", "MIRAR", "VOLAR", "BRILLAR", "ESTALLAR", "ORBITAR"],
      objeto: ["ESTRELLA", "GALAXIA", "PLANETA", "SOL", "LUNA", "COHETE"],
      lugar: ["ESPACIO", "CIELO", "SISTEMA SOLAR", "TELESCOPIO", "AFUERA", "NOCHE"],
      social: ["LEJOS", "SORPRESA", "HOLA", "SÍ", "NO", "MIRA"],
      descr: ["GIGANTE", "OSCURO", "NEGRO", "REDONDO", "BRILLANTE", "INFINITO"]
    },
    "sistema digestivo": {
      persona: ["PACIENTE", "DOCTOR", "MAESTRO", "GRUPO", "ESTUDIANTE", "YO"],
      verbo: ["COMER", "MASTICAR", "TRAGAR", "DIGERIR", "ABSORBER", "EXPULSAR"],
      objeto: ["BOCA", "ESTÓMAGO", "INTESTINO", "HÍGADO", "BOLO", "ÁCIDO"],
      lugar: ["INTERIOR", "CUERPO", "COCINA", "MESA", "BAÑO", "AULA"],
      social: ["HAMBRE", "LLENO", "DAME", "SÍ", "NO", "GRACIAS"],
      descr: ["DULCE", "SALADO", "SUAVE", "DURO", "RICO", "FEO"]
    },
    "magnetismo": {
      persona: ["MAESTRO", "ESTUDIANTE", "AYUDANTE", "GRUPO", "COMPAÑERO", "YO"],
      verbo: ["ATRAER", "PEGAR", "EMPUJAR", "SOLTAR", "GIRAR", "ACERCAR"],
      objeto: ["IMÁN", "POLO NORTE", "POLO SUR", "METAL", "HIERRO", "BRÚJULA"],
      lugar: ["MESA", "CAJA", "PISO", "AULA", "CASA", "LABORATORIO"],
      social: ["MIRA", "DAME", "HOLA", "SÍ", "NO", "GRACIAS"],
      descr: ["FUERZA", "FUERTE", "DÉBIL", "MAGNÉTICO", "INVISIBLE", "PEGADO"]
    },
    "el esqueleto": {
      persona: ["MÉDICO", "HOMBRE", "MUJER", "MAESTRO", "GRUPO", "YO"],
      verbo: ["SOSTENER", "PROTEGER", "MOVER", "CAMINAR", "TOCAR", "SENTIR"],
      objeto: ["CRÁNEO", "COSTILLA", "FÉMUR", "CALCIO", "ARTICULACIÓN", "HUESO"],
      lugar: ["CUERPO", "ADENTRO", "GIMNASIO", "AULA", "CLÍNICA", "MAQUETA"],
      social: ["DUELE", "MIRA", "HOLA", "SÍ", "NO", "GRACIAS"],
      descr: ["DURO", "BLANCO", "RÍGIDO", "SANO", "FUERTE", "ALTO"]
    },
    "sistema nervioso": {
      persona: ["PACIENTE", "DOCTOR", "MAESTRO", "EQUIPO", "HUMANO", "YO"],
      verbo: ["PENSAR", "SENTIR", "REACCIONAR", "ORDENAR", "DORMIR", "RECORDAR"],
      objeto: ["CEREBRO", "NERVIOS", "IMPULSO", "SUEÑO", "CONTROL", "MEMORIA"],
      lugar: ["CABEZA", "CUERPO", "INTERIOR", "ESCUELA", "HOSPITAL", "AULA"],
      social: ["ESPERA", "HOLA", "GRACIAS", "SÍ", "NO", "DIME"],
      descr: ["INTELIGENTE", "RÁPIDO", "ELÉCTRICO", "SANO", "CANSADO", "DESPIERTO"]
    },
    "fotosíntesis": {
      persona: ["PLANTA", "SOL", "MAESTRO", "ESTUDIANTE", "EQUIPO", "YO"],
      verbo: ["ABSORBER", "TRANSFORMAR", "CRECER", "ALIMENTAR", "SOLTAR", "VIVIR"],
      objeto: ["CLOROFILA", "RAÍZ", "OXÍGENO", "LUZ", "AZÚCAR", "HOJA"],
      lugar: ["JARDÍN", "PARQUE", "HUERTO", "BOSQUE", "MACETA", "CAMPO"],
      social: ["HOLA", "GRACIAS", "MIRA", "SÍ", "NO", "LISTO"],
      descr: ["VERDE", "NATURAL", "LIMPIO", "VIVO", "GRANDE", "NECESARIO"]
    },
    "clima guatemala": {
      persona: ["MAESTRO", "ESTUDIANTE", "FAMILIA", "METEORÓLOGO", "GENTE", "YO"],
      verbo: ["LLOVER", "SOLEAR", "ABRIGAR", "MOJAR", "SECAR", "SENTIR"],
      objeto: ["FRÍO", "CALOR", "VIENTO", "LLUVIA", "INVIERNO", "VERANO"],
      lugar: ["GUATEMALA", "VOLCÁN", "MONTAÑA", "COSTA", "CASA", "ESCUELA"],
      social: ["MIRA", "HOLA", "GRACIAS", "SÍ", "NO", "BIEN"],
      descr: ["HÚMEDO", "SECO", "CALIENTE", "FRESCO", "HERMOSO", "NUBLADO"]
    },
    "mezclas": {
      persona: ["QUÍMICO", "AUXILIAR", "MAESTRO", "ESTUDIANTE", "COMPAÑERO", "YO"],
      verbo: ["BATIR", "FILTRAR", "ECHAR", "SEPARAR", "DISOLVER", "MEZCLAR"],
      objeto: ["SOLUTO", "SOLVENTE", "SAL", "ARENA", "EMBUDO", "FILTRO"],
      lugar: ["LABORATORIO", "VASO", "MESA", "PILETA", "AULA", "ESTANTE"],
      social: ["DAME", "MIRA", "HOLA", "SÍ", "NO", "GRACIAS"],
      descr: ["HOMOGÉNEO", "HETEROGÉNEO", "TURBIO", "CLARO", "ESPESO", "RÁPIDO"]
    },
    "formación nubes": {
      persona: ["METEORÓLOGO", "OBSERVADOR", "MAESTRO", "EQUIPO", "ESTUDIANTE", "YO"],
      verbo: ["CALENTAR", "EVAPORAR", "ENFRIAR", "CONDENSAR", "TAPAR", "VER"],
      objeto: ["VAPOR", "HUMO", "HIELO", "PRESIÓN", "GAS", "AGUA"],
      lugar: ["FRASCO", "ATMÓSFERA", "CIELO", "AIRE", "LABORATORIO", "AFUERA"],
      social: ["MIRA", "SORPRESA", "LISTO", "HOLA", "GRACIAS", "SÍ"],
      descr: ["BLANCO", "FRÍO", "CALIENTE", "ALTO", "SUAVE", "HÚMEDO"]
    },
    "reinos": {
      persona: ["ANIMAL", "PLANTA", "HONGO", "BACTERIA", "ALGA", "YO"],
      verbo: ["CLASIFICAR", "DIVIDIR", "BUSCAR", "NOMBRAR", "VIVIR", "CRECER"],
      objeto: ["REINO", "ESPECIE", "FAMILIA", "NOMBRE", "GRUPO", "VIDA"],
      lugar: ["NATURALEZA", "PARQUE", "ZOO", "JARDÍN", "BOSQUE", "LIBRO"],
      social: ["MIRA", "DIME", "HOLA", "SÍ", "NO", "LISTO"],
      descr: ["DIFERENTE", "IGUAL", "MUCHOS", "POCOS", "VIVOS", "COLORIDO"]
    },
    "energía": {
      persona: ["INGENIERO", "MAESTRO", "CIENTÍFICO", "EQUIPO", "GENTE", "YO"],
      verbo: ["USAR", "AHORRAR", "ILUMINAR", "MOVER", "RENOVAR", "CUIDAR"],
      objeto: ["PANEL SOLAR", "HÉLICE", "CABLE", "LUZ", "VIENTO", "SOL"],
      lugar: ["TECHO", "CAMPO", "CIUDAD", "CENTRAL", "MUNDO", "CASA"],
      social: ["AYUDA", "SÍ", "NO", "BIEN", "HOLA", "GRACIAS"],
      descr: ["LIMPIO", "SOLAR", "EÓLICO", "BARATO", "BUENO", "VERDE"]
    },
    "reproducción": {
      persona: ["MADRE", "PADRE", "BEBÉ", "DOCTOR", "HIJO", "YO"],
      verbo: ["NACER", "CRECER", "CUIDAR", "HEREDAR", "CAMBIAR", "AMAR"],
      objeto: ["ÓVULO", "ESPERMA", "GENES", "CROMOSOMA", "VIDA", "CUERPO"],
      lugar: ["HOSPITAL", "CUNA", "CASA", "MUNDO", "FAMILIA", "ESCUELA"],
      social: ["TE QUIERO", "HOLA", "GRACIAS", "SÍ", "NO", "BIEN"],
      descr: ["PEQUEÑO", "NUEVO", "IGUAL", "DIFERENTE", "SANO", "JOVEN"]
    },
    "método científico": {
      persona: ["INVESTIGADOR", "MAESTRO", "EQUIPO", "CIENTÍFICO", "ESTUDIANTE", "YO"],
      verbo: ["PENSAR", "DUDAR", "PREGUNTAR", "EXPERIMENTAR", "CONCLUIR", "FALLAR"],
      objeto: ["DATOS", "HIPÓTESIS", "TEORÍA", "RESULTADO", "PRUEBA", "PASOS"],
      lugar: ["LABORATORIO", "BIBLIOTECA", "MESA", "LIBRO", "AULA", "PIZARRA"],
      social: ["DIME", "HOLA", "SÍ", "NO", "POR QUÉ", "SABER"],
      descr: ["FALSO", "VERDADERO", "NUEVO", "LÓGICO", "REPETIBLE", "DIFÍCIL"]
    },
    "átomos": {
      persona: ["QUÍMICO", "CIENTÍFICO", "MAESTRO", "AUXILIAR", "GRUPO", "YO"],
      verbo: ["UNIR", "SEPARAR", "VIBRAR", "REACCIONAR", "FORMAR", "CREAR"],
      objeto: ["ÁTOMO", "NÚCLEO", "ELECTRÓN", "ENLACE", "MATERIA", "GAS"],
      lugar: ["LABORATORIO", "MAQUETA", "ESPACIO", "MESA", "MICRO-MUNDO", "AULA"],
      social: ["MIRA", "DAME", "HOLA", "SÍ", "NO", "LISTO"],
      descr: ["INVISIBLE", "PEQUEÑO", "SÓLIDO", "PURO", "UNIDO", "SUELTO"]
    },
    "capas tierra": {
      persona: ["GEÓLOGO", "EXPLORADOR", "MAESTRO", "GRUPO", "GUÍA", "YO"],
      verbo: ["CAVAR", "ROTAR", "FLOTAR", "FUNDIR", "SOLIDIFICAR", "VIAJAR"],
      objeto: ["NÚCLEO", "MANTO", "CORTEZA", "MAGMA", "PLACAS", "SISMOS"],
      lugar: ["PLANETA", "MAPA", "MAQUETA", "SUPERFICIE", "INTERIOR", "ESPACIO"],
      social: ["HOLA", "MIRA", "BIEN", "GRACIAS", "SÍ", "NO"],
      descr: ["INTERNO", "SÓLIDO", "LÍQUIDO", "CALIENTE", "DURO", "PROFUNDO"]
    },
    "red trófica": {
      persona: ["PRODUCTOR", "CONSUMIDOR", "PREDADOR", "PRESA", "HONGO", "YO"],
      verbo: ["COMER", "CAZAR", "FLUIR", "CRECER", "PASAR", "MORIR"],
      objeto: ["ENERGÍA", "SOL", "PLANTA", "CONEJO", "ÁGUILA", "CADENA"],
      lugar: ["BOSQUE", "SELVA", "RÍO", "ECOSISTEMA", "NATURALEZA", "TIERRA"],
      social: ["MIRA", "HOLA", "GRACIAS", "SÍ", "NO", "DIME"],
      descr: ["VERDE", "VIVO", "MUERTO", "FUERTE", "LENTO", "NECESARIO"]
    }
  };

  useEffect(() => {
    const datosTema = bibliotecaCCNN[temaSeleccionado] || bibliotecaCCNN["la célula"];
    const tipos = ['persona', 'verbo', 'objeto', 'lugar', 'social', 'descr'];
    let nuevoTablero = [];

    // Lógica Estricta 6x6 (36 celdas únicas)
    for (let f = 0; f < 6; f++) {
      tipos.forEach((tipo) => {
        nuevoTablero.push({
          palabra: (datosTema[tipo] && datosTema[tipo][f]) ? datosTema[tipo][f] : "...",
          categoria: tipo
        });
      });
    }
    setTablero(nuevoTablero);
  }, [temaSeleccionado]);

  const hablar = (t) => {
    if (t === "...") return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'es-GT'; // Localizado a Guatemala
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
    setFrase(prev => [...prev, t]);
  };

  const reproducirFrase = () => {
    if (frase.length === 0) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(frase.join(' '));
    u.lang = 'es-GT';
    window.speechSynthesis.speak(u);
  };

  return (
    <div style={{ backgroundColor: esModoNeon ? '#020617' : '#f8fafc', minHeight: '100vh', padding: '10px', fontFamily: 'system-ui, sans-serif' }}>
      <style>{styles}</style>

      {/* HEADER PROFESIONAL */}
     <header style={{ 
  textAlign: 'center', 
  marginBottom: '20px', 
  padding: '10px',
  borderBottom: '1px solid #333' 
}}>
  <h1 style={{ 
    color: '#39ff14', 
    fontSize: '2rem', 
    fontWeight: 'bold', 
    margin: '0',
    textTransform: 'uppercase'
  }}>
    Tablero de comunicación alternativa
  </h1>
  <h2 style={{ 
    color: '#00f3ff', 
    fontSize: '1.5rem', 
    margin: '5px 0' 
  }}>
    Área de Ciencias Naturales
  </h2>
  <p style={{ 
    color: '#fff', 
    fontSize: '1.1rem', 
    opacity: '0.9',
    margin: '0'
  }}>
    Edwin Estuardo Lemus Salazar - 202101385
  </p>
</header>

      {/* ÁREA DE CONSTRUCCIÓN DE FRASE */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 10px', padding: '12px', backgroundColor: esModoNeon ? '#0f172a' : '#fff', borderRadius: '12px', border: `2px solid ${esModoNeon ? '#39ff14' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <button onClick={reproducirFrase} style={{ padding: '8px', borderRadius: '50%', border: 'none', backgroundColor: '#3b82f6', color: 'white', cursor: 'pointer' }}><Icons.Volume2 size={24} /></button>
        <div style={{ flexGrow: 1, fontSize: '18px', fontWeight: 'bold', color: esModoNeon ? '#39ff14' : '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {frase.join(' ➜ ') || "Seleccione términos..."}
        </div>
        <button onClick={() => setFrase([])} style={{ padding: '8px 15px', borderRadius: '8px', backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>BORRAR</button>
      </div>

      {/* CONTROLES */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 10px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setEsModoNeon(!esModoNeon)} style={{ padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#334155', color: 'white', border: 'none' }}>
          {esModoNeon ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />}
        </button>
        <select value={temaSeleccionado} onChange={(e) => setTemaSeleccionado(e.target.value)} style={{ flexGrow: 1, padding: '10px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', backgroundColor: esModoNeon ? '#1e293b' : '#fff', color: esModoNeon ? '#fff' : '#000', border: '1px solid #3b82f6' }}>
          {Object.keys(bibliotecaCCNN).map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
        </select>
      </div>

      {/* TABLERO 6X6 CON ANIMACIONES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', maxWidth: '1400px', margin: '0 auto' }}>
        {tablero.map((item, i) => {
          const catInfo = categorias[item.categoria];
          const nombreIcono = iconosCCNN[item.palabra.toUpperCase()] || catInfo.i;
          const Icono = Icons[nombreIcono] || Icons.HelpCircle;

          // Asignación de clase de animación según tipo de palabra
          let animClass = "icon-float";
          if (item.categoria === 'verbo') animClass = "icon-pulse";
          if (item.palabra === 'SOL' || item.palabra === 'ÁTOMO') animClass = "icon-spin";

          return (
            <button
              key={i}
              onClick={() => hablar(item.palabra)}
              className={item.palabra !== "..." ? animClass : ""}
              style={{
                aspectRatio: '1/1', borderRadius: '10px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                border: esModoNeon ? `2px solid ${catInfo.c}` : `1px solid ${catInfo.c}`,
                backgroundColor: esModoNeon ? 'transparent' : catInfo.c,
                color: esModoNeon ? catInfo.c : '#fff',
                padding: '4px', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative', overflow: 'hidden'
              }}
            >
              <span style={{ fontSize: '7px', fontWeight: 'bold', marginBottom: '2px', opacity: 0.8, textTransform: 'uppercase' }}>{catInfo.n}</span>
              <Icono size={28} strokeWidth={2.5} />
              <span style={{ fontSize: '9px', fontWeight: '900', marginTop: '4px', textAlign: 'center', textTransform: 'uppercase', width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {item.palabra}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;
