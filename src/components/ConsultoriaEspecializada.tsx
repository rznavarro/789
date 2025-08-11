import React, { useState } from 'react';
import { Users, Briefcase, Building, Gavel, Shield, TrendingUp } from 'lucide-react';

interface Especialidad {
  id: string;
  nombre: string;
  icon: React.ComponentType<any>;
  descripcion: string;
  areas: string[];
  color: string;
}

const ConsultoriaEspecializada: React.FC = () => {
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<string | null>(null);
  const [consulta, setConsulta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const especialidades: Especialidad[] = [
    {
      id: 'laboral',
      nombre: 'Derecho Laboral',
      icon: Users,
      descripcion: 'Especialización en relaciones laborales, contratos de trabajo y derechos del trabajador',
      areas: ['Contratos de trabajo', 'Despidos', 'Acoso laboral', 'Negociación colectiva', 'Seguridad social'],
      color: 'bg-blue-600'
    },
    {
      id: 'corporativo',
      nombre: 'Derecho Corporativo',
      icon: Building,
      descripcion: 'Asesoramiento en estructuras societarias, fusiones y adquisiciones',
      areas: ['Constitución de sociedades', 'Fusiones y adquisiciones', 'Gobierno corporativo', 'Compliance', 'Contratos comerciales'],
      color: 'bg-purple-600'
    },
    {
      id: 'penal',
      nombre: 'Derecho Penal',
      icon: Gavel,
      descripcion: 'Defensa penal y asesoramiento en materia criminal',
      areas: ['Delitos económicos', 'Defensa penal', 'Procedimientos penales', 'Medidas cautelares', 'Recursos'],
      color: 'bg-red-600'
    },
    {
      id: 'civil',
      nombre: 'Derecho Civil',
      icon: Briefcase,
      descripcion: 'Resolución de conflictos civiles y responsabilidad civil',
      areas: ['Responsabilidad civil', 'Contratos civiles', 'Daños y perjuicios', 'Familia', 'Sucesiones'],
      color: 'bg-green-600'
    },
    {
      id: 'regulatorio',
      nombre: 'Derecho Regulatorio',
      icon: Shield,
      descripcion: 'Cumplimiento normativo y regulaciones sectoriales',
      areas: ['Compliance', 'Regulaciones financieras', 'Protección de datos', 'Competencia', 'Regulaciones ambientales'],
      color: 'bg-orange-600'
    },
    {
      id: 'financiero',
      nombre: 'Derecho Financiero',
      icon: TrendingUp,
      descripcion: 'Asesoramiento en operaciones financieras y mercado de capitales',
      areas: ['Mercado de capitales', 'Banca', 'Seguros', 'Fondos de inversión', 'Fintech'],
      color: 'bg-indigo-600'
    }
  ];

  const handleConsulta = async () => {
    if (!especialidadSeleccionada || !consulta.trim()) return;

    setIsLoading(true);
    
    // Simular procesamiento de IA especializada
    setTimeout(() => {
      const especialidad = especialidades.find(e => e.id === especialidadSeleccionada);
      const respuestaGenerada = generarRespuestaEspecializada(especialidad!, consulta);
      setRespuesta(respuestaGenerada);
      setIsLoading(false);
    }, 3000);
  };

  const generarRespuestaEspecializada = (especialidad: Especialidad, consulta: string): string => {
    const consultaLower = consulta.toLowerCase();
    
    switch (especialidad.id) {
      case 'laboral':
        if (consultaLower.includes('despido') || consultaLower.includes('terminación')) {
          return `**ANÁLISIS ESPECIALIZADO - DERECHO LABORAL**

**Situación:** Terminación de contrato laboral

**Marco Legal Aplicable:**
• Código del Trabajo, artículos 159-177
• Ley de Protección al Empleo
• Jurisprudencia de la Dirección del Trabajo

**Análisis:**
1. **Causales de Despido:** Verificar si existe causal justificada según Art. 160 del Código del Trabajo
2. **Procedimiento:** El despido debe seguir el debido proceso establecido
3. **Indemnizaciones:** Calcular indemnizaciones por años de servicio y sustitutiva del aviso previo

**Recomendaciones:**
• Documentar adecuadamente la causal de despido
• Respetar los plazos legales de investigación
• Considerar alternativas como finiquito consensuado
• Evaluar riesgos de demanda laboral

**Próximos Pasos:**
1. Revisar documentación laboral completa
2. Evaluar fortaleza de la causal
3. Calcular costos de indemnizaciones
4. Preparar carta de despido si procede`;
        }
        break;
        
      case 'corporativo':
        if (consultaLower.includes('fusión') || consultaLower.includes('adquisición')) {
          return `**ANÁLISIS ESPECIALIZADO - DERECHO CORPORATIVO**

**Operación:** Fusión/Adquisición Empresarial

**Estructura Legal Recomendada:**
• Due Diligence integral
• Valoración de activos y pasivos
• Estructura de la transacción

**Aspectos Regulatorios:**
1. **Libre Competencia:** Evaluación ante FNE si supera umbrales
2. **Aspectos Tributarios:** Optimización fiscal de la operación
3. **Aspectos Laborales:** Continuidad de contratos de trabajo

**Documentación Requerida:**
• Carta de intención (LOI)
• Acuerdo de confidencialidad (NDA)
• Contrato de compraventa de acciones/activos
• Garantías y declaraciones

**Timeline Estimado:**
• Due Diligence: 4-6 semanas
• Negociación de términos: 2-3 semanas
• Cierre de la operación: 1-2 semanas

**Riesgos Identificados:**
• Pasivos contingentes no identificados
• Cambios regulatorios
• Integración post-cierre`;
        }
        break;
        
      case 'penal':
        return `**ANÁLISIS ESPECIALIZADO - DERECHO PENAL**

**Evaluación Preliminar del Caso**

**Tipificación Penal:**
• Análisis de los elementos del tipo penal
• Evaluación de circunstancias agravantes/atenuantes
• Posibles defensas aplicables

**Estrategia de Defensa:**
1. **Fase de Investigación:** Colaboración con Ministerio Público
2. **Medidas Cautelares:** Solicitud de medidas alternativas
3. **Preparación del Juicio:** Estrategia probatoria

**Derechos del Imputado:**
• Derecho a guardar silencio
• Derecho a defensa técnica
• Presunción de inocencia
• Derecho a ser informado de los cargos

**Recomendaciones Inmediatas:**
• No declarar sin presencia de abogado
• Preservar evidencia favorable
• Contactar testigos relevantes
• Evaluar salidas alternativas`;
        
      default:
        return `**ANÁLISIS ESPECIALIZADO - ${especialidad.nombre.toUpperCase()}**

Basado en tu consulta y mi especialización en ${especialidad.nombre.toLowerCase()}, he realizado un análisis preliminar considerando:

**Marco Legal Aplicable:**
• Normativa específica del área
• Jurisprudencia relevante
• Regulaciones sectoriales

**Análisis de la Situación:**
Tu consulta requiere una evaluación detallada de los aspectos legales involucrados. He identificado varios puntos clave que requieren atención especializada.

**Recomendaciones:**
1. Profundizar en el análisis de la documentación
2. Evaluar riesgos legales específicos
3. Considerar alternativas de solución
4. Preparar estrategia legal apropiada

**Próximos Pasos:**
• Revisión detallada de antecedentes
• Análisis de precedentes jurisprudenciales
• Evaluación de opciones estratégicas
• Preparación de documentación legal

Para un análisis más específico, por favor proporciona más detalles sobre tu situación particular.`;
    }
    
    return respuestaGenerada || `Análisis especializado en ${especialidad.nombre} para tu consulta específica.`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-600 p-2 rounded-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Consultoría Especializada</h2>
            <p className="text-blue-200">Asesoramiento legal por expertos en cada área</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Especialidades */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Selecciona tu área de especialización:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {especialidades.map((especialidad) => {
              const Icon = especialidad.icon;
              return (
                <button
                  key={especialidad.id}
                  onClick={() => setEspecialidadSeleccionada(especialidad.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    especialidadSeleccionada === especialidad.id
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/20 bg-white/10 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`${especialidad.color} p-2 rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-white">{especialidad.nombre}</h4>
                  </div>
                  <p className="text-sm text-blue-200 mb-3">{especialidad.descripcion}</p>
                  <div className="flex flex-wrap gap-1">
                    {especialidad.areas.slice(0, 3).map((area, index) => (
                      <span key={index} className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                        {area}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Consulta */}
        {especialidadSeleccionada && (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">
                Describe tu consulta especializada:
              </label>
              <textarea
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Describe detalladamente tu situación legal, incluyendo todos los antecedentes relevantes..."
                className="w-full h-32 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={handleConsulta}
              disabled={!consulta.trim() || isLoading}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Analizando con IA especializada...</span>
                </>
              ) : (
                <>
                  <Users className="h-4 w-4" />
                  <span>Obtener Consultoría Especializada</span>
                </>
              )}
            </button>

            {/* Respuesta */}
            {respuesta && (
              <div className="bg-white/10 border border-white/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Análisis Especializado</h4>
                <div className="text-blue-100 whitespace-pre-line">{respuesta}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultoriaEspecializada;