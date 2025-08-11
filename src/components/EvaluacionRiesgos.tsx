import React, { useState } from 'react';
import { Shield, TrendingUp, TrendingDown, AlertTriangle, DollarSign, Calendar } from 'lucide-react';

interface RiskAssessment {
  companyName: string;
  overallRisk: 'low' | 'medium' | 'high';
  riskScore: number;
  categories: {
    financial: RiskCategory;
    legal: RiskCategory;
    operational: RiskCategory;
    market: RiskCategory;
    regulatory: RiskCategory;
  };
  keyRisks: KeyRisk[];
  investmentRecommendation: InvestmentRecommendation;
}

interface RiskCategory {
  score: number;
  level: 'low' | 'medium' | 'high';
  factors: string[];
}

interface KeyRisk {
  title: string;
  description: string;
  probability: number;
  impact: number;
  mitigation: string;
  timeframe: string;
}

interface InvestmentRecommendation {
  recommendation: 'invest' | 'caution' | 'avoid';
  confidence: number;
  reasoning: string;
  conditions: string[];
  maxInvestment: number;
}

const EvaluacionRiesgos: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);

  const handleAnalyze = async () => {
    if (!companyName.trim() || !investmentAmount.trim() || !timeHorizon.trim()) return;

    setIsAnalyzing(true);
    
    // Simular análisis de riesgos
    setTimeout(() => {
      const mockAssessment: RiskAssessment = {
        companyName: companyName,
        overallRisk: 'medium',
        riskScore: 68,
        categories: {
          financial: {
            score: 72,
            level: 'medium',
            factors: [
              'Ratio de endeudamiento elevado (78%)',
              'Flujo de caja positivo pero variable',
              'Dependencia de pocos clientes grandes',
              'Márgenes de rentabilidad en declive'
            ]
          },
          legal: {
            score: 85,
            level: 'low',
            factors: [
              'Estructura legal sólida',
              'Cumplimiento regulatorio adecuado',
              'Pocos litigios pendientes',
              'Contratos bien estructurados'
            ]
          },
          operational: {
            score: 65,
            level: 'medium',
            factors: [
              'Dependencia de personal clave',
              'Sistemas tecnológicos obsoletos',
              'Procesos operativos eficientes',
              'Cadena de suministro vulnerable'
            ]
          },
          market: {
            score: 58,
            level: 'high',
            factors: [
              'Mercado altamente competitivo',
              'Cambios tecnológicos disruptivos',
              'Concentración de clientes',
              'Presión sobre precios'
            ]
          },
          regulatory: {
            score: 78,
            level: 'low',
            factors: [
              'Cumplimiento normativo actualizado',
              'Licencias y permisos vigentes',
              'Políticas de compliance implementadas',
              'Riesgo regulatorio bajo'
            ]
          }
        },
        keyRisks: [
          {
            title: 'Concentración de Clientes',
            description: 'El 65% de los ingresos proviene de solo 3 clientes principales, creando vulnerabilidad ante la pérdida de alguno de ellos.',
            probability: 35,
            impact: 85,
            mitigation: 'Diversificar base de clientes, desarrollar nuevos mercados, fortalecer relaciones con clientes existentes.',
            timeframe: '6-12 meses'
          },
          {
            title: 'Obsolescencia Tecnológica',
            description: 'Los sistemas tecnológicos actuales tienen más de 8 años y requieren actualización para mantener competitividad.',
            probability: 70,
            impact: 60,
            mitigation: 'Plan de modernización tecnológica, inversión en I+D, capacitación del personal técnico.',
            timeframe: '12-24 meses'
          },
          {
            title: 'Dependencia de Personal Clave',
            description: 'La salida del CEO o CTO podría impactar significativamente las operaciones y la estrategia de la empresa.',
            probability: 25,
            impact: 75,
            mitigation: 'Planes de sucesión, documentación de procesos críticos, retención de talento clave.',
            timeframe: '3-6 meses'
          },
          {
            title: 'Presión Competitiva',
            description: 'Nuevos competidores con tecnología superior están ganando participación de mercado.',
            probability: 80,
            impact: 55,
            mitigation: 'Diferenciación de productos, mejora de la propuesta de valor, alianzas estratégicas.',
            timeframe: '6-18 meses'
          }
        ],
        investmentRecommendation: {
          recommendation: 'caution',
          confidence: 75,
          reasoning: 'La empresa presenta fundamentos sólidos pero enfrenta riesgos significativos en el mercado y operaciones. Se recomienda proceder con cautela y condiciones específicas.',
          conditions: [
            'Implementar plan de diversificación de clientes',
            'Establecer cronograma de modernización tecnológica',
            'Definir planes de sucesión para posiciones clave',
            'Monitoreo trimestral de indicadores financieros',
            'Cláusulas de protección en caso de pérdida de clientes principales'
          ],
          maxInvestment: parseInt(investmentAmount) * 0.6
        }
      };
      
      setAssessment(mockAssessment);
      setIsAnalyzing(false);
    }, 5000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-500/20 border-green-500';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500';
      case 'high':
        return 'bg-red-500/20 border-red-500';
      default:
        return 'bg-gray-500/20 border-gray-500';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'invest':
        return 'text-green-400';
      case 'caution':
        return 'text-yellow-400';
      case 'avoid':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'invest':
        return <TrendingUp className="h-6 w-6 text-green-400" />;
      case 'caution':
        return <AlertTriangle className="h-6 w-6 text-yellow-400" />;
      case 'avoid':
        return <TrendingDown className="h-6 w-6 text-red-400" />;
      default:
        return <Shield className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Evaluación de Riesgos para Inversionistas</h2>
            <p className="text-blue-200">Análisis integral de riesgos de inversión</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Input Form */}
        {!assessment && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 border border-white/20 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Parámetros de Evaluación</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Empresa a Evaluar
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Nombre de la empresa"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Monto de Inversión (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-blue-300" />
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="1000000"
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Horizonte de Inversión
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-blue-300" />
                    <select
                      value={timeHorizon}
                      onChange={(e) => setTimeHorizon(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar horizonte</option>
                      <option value="1-2">1-2 años</option>
                      <option value="3-5">3-5 años</option>
                      <option value="5+">Más de 5 años</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={!companyName.trim() || !investmentAmount.trim() || !timeHorizon.trim() || isAnalyzing}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analizando riesgos de inversión...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5" />
                      <span>Evaluar Riesgos de Inversión</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Risk Assessment Results */}
        {assessment && (
          <div className="space-y-6">
            {/* Overall Assessment */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{assessment.companyName}</h3>
                  <p className="text-blue-200">Evaluación de Riesgos de Inversión</p>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${getRiskColor(assessment.overallRisk)}`}>
                    {assessment.riskScore}/100
                  </div>
                  <p className="text-blue-200">Puntuación de Riesgo</p>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${getRiskBg(assessment.overallRisk)}`}>
                <div className="flex items-center space-x-3">
                  {assessment.overallRisk === 'low' && <TrendingDown className="h-6 w-6 text-green-400" />}
                  {assessment.overallRisk === 'medium' && <AlertTriangle className="h-6 w-6 text-yellow-400" />}
                  {assessment.overallRisk === 'high' && <TrendingUp className="h-6 w-6 text-red-400" />}
                  <span className={`font-semibold ${getRiskColor(assessment.overallRisk)}`}>
                    Riesgo {assessment.overallRisk === 'low' ? 'Bajo' : assessment.overallRisk === 'medium' ? 'Medio' : 'Alto'}
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(assessment.categories).map(([key, category]) => (
                <div key={key} className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white capitalize">
                      {key === 'financial' ? 'Financiero' :
                       key === 'legal' ? 'Legal' :
                       key === 'operational' ? 'Operacional' :
                       key === 'market' ? 'Mercado' :
                       'Regulatorio'}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      category.level === 'low' ? 'bg-green-600 text-white' :
                      category.level === 'medium' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {category.level === 'low' ? 'Bajo' : category.level === 'medium' ? 'Medio' : 'Alto'}
                    </span>
                  </div>
                  <div className={`text-2xl font-bold ${getRiskColor(category.level)} mb-3`}>
                    {category.score}/100
                  </div>
                  <ul className="text-sm text-blue-200 space-y-1">
                    {category.factors.slice(0, 2).map((factor, index) => (
                      <li key={index}>• {factor}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Key Risks */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Riesgos Principales</h3>
              <div className="space-y-4">
                {assessment.keyRisks.map((risk, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-white">{risk.title}</h4>
                      <div className="flex space-x-2">
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          P: {risk.probability}%
                        </span>
                        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                          I: {risk.impact}%
                        </span>
                      </div>
                    </div>
                    <p className="text-blue-200 text-sm mb-3">{risk.description}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-green-300">Mitigación: </span>
                        <span className="text-blue-200 text-sm">{risk.mitigation}</span>
                      </div>
                      <div>
                        <span className="font-medium text-yellow-300">Plazo: </span>
                        <span className="text-blue-200 text-sm">{risk.timeframe}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Recommendation */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recomendación de Inversión</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                {getRecommendationIcon(assessment.investmentRecommendation.recommendation)}
                <div>
                  <div className={`text-xl font-bold ${getRecommendationColor(assessment.investmentRecommendation.recommendation)}`}>
                    {assessment.investmentRecommendation.recommendation === 'invest' ? 'INVERTIR' :
                     assessment.investmentRecommendation.recommendation === 'caution' ? 'PROCEDER CON CAUTELA' :
                     'EVITAR INVERSIÓN'}
                  </div>
                  <div className="text-blue-200">
                    Confianza: {assessment.investmentRecommendation.confidence}%
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-white mb-2">Razonamiento:</h5>
                  <p className="text-blue-200">{assessment.investmentRecommendation.reasoning}</p>
                </div>

                <div>
                  <h5 className="font-medium text-white mb-2">Monto Máximo Recomendado:</h5>
                  <p className="text-green-400 font-bold text-xl">
                    ${assessment.investmentRecommendation.maxInvestment.toLocaleString()} USD
                  </p>
                </div>

                <div>
                  <h5 className="font-medium text-white mb-2">Condiciones Recomendadas:</h5>
                  <ul className="space-y-2">
                    {assessment.investmentRecommendation.conditions.map((condition, index) => (
                      <li key={index} className="flex items-start space-x-2 text-blue-200">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Descargar Reporte de Riesgos</span>
              </button>
              <button
                onClick={() => {
                  setAssessment(null);
                  setCompanyName('');
                  setInvestmentAmount('');
                  setTimeHorizon('');
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Nueva Evaluación
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluacionRiesgos;