import React, { useState } from 'react';
import { AlertTriangle, Upload, Search, TrendingDown, TrendingUp, Shield } from 'lucide-react';

interface RiskClause {
  id: string;
  clause: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskType: string;
  description: string;
  impact: string;
  mitigation: string;
  location: string;
}

const AnalisisRiesgos: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [riskClauses, setRiskClauses] = useState<RiskClause[]>([]);
  const [filterRisk, setFilterRisk] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setRiskClauses([]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    // Simular análisis de IA
    setTimeout(() => {
      const mockRisks: RiskClause[] = [
        {
          id: '1',
          clause: 'El contratista asume toda responsabilidad por daños directos, indirectos, consecuenciales y punitivos sin limitación alguna.',
          riskLevel: 'high',
          riskType: 'Responsabilidad Ilimitada',
          description: 'Esta cláusula establece una responsabilidad ilimitada que puede exponer a la empresa a riesgos financieros desproporcionados.',
          impact: 'Exposición financiera ilimitada, posibles demandas millonarias, riesgo de quiebra en casos extremos.',
          mitigation: 'Limitar la responsabilidad a un monto específico (ej: valor del contrato) y excluir daños indirectos y consecuenciales.',
          location: 'Sección 8.2'
        },
        {
          id: '2',
          clause: 'En caso de incumplimiento, el cliente podrá retener todos los pagos pendientes indefinidamente.',
          riskLevel: 'high',
          riskType: 'Retención de Pagos',
          description: 'Permite la retención indefinida de pagos sin procedimiento claro, afectando el flujo de caja.',
          impact: 'Problemas de liquidez, imposibilidad de cobrar por servicios prestados, disputas prolongadas.',
          mitigation: 'Establecer procedimientos claros para retenciones, límites temporales y montos máximos de retención.',
          location: 'Sección 5.4'
        },
        {
          id: '3',
          clause: 'Las modificaciones al contrato podrán realizarse verbalmente por cualquier representante del cliente.',
          riskLevel: 'medium',
          riskType: 'Modificaciones Informales',
          description: 'Permite modificaciones sin formalidades, generando incertidumbre sobre los términos vigentes.',
          impact: 'Disputas sobre alcance del trabajo, cambios no documentados, dificultades probatorias.',
          mitigation: 'Requerir modificaciones por escrito, firmadas por representantes autorizados específicamente designados.',
          location: 'Sección 12.1'
        },
        {
          id: '4',
          clause: 'La confidencialidad incluye toda información que el cliente considere confidencial.',
          riskLevel: 'medium',
          riskType: 'Confidencialidad Ambigua',
          description: 'Definición subjetiva de información confidencial que puede ser interpretada ampliamente.',
          impact: 'Restricciones excesivas, dificultades para usar conocimientos generales, posibles demandas.',
          mitigation: 'Definir específicamente qué constituye información confidencial y establecer excepciones claras.',
          location: 'Sección 9.3'
        },
        {
          id: '5',
          clause: 'El contrato se regirá por las leyes que el cliente determine apropiadas.',
          riskLevel: 'medium',
          riskType: 'Jurisdicción Incierta',
          description: 'No especifica claramente la jurisdicción aplicable, dejando la decisión al cliente.',
          impact: 'Incertidumbre legal, posibles litigios en jurisdicciones desfavorables, costos legales elevados.',
          mitigation: 'Especificar claramente la jurisdicción y las leyes aplicables, preferiblemente en territorio conocido.',
          location: 'Sección 15.2'
        },
        {
          id: '6',
          clause: 'Los plazos de entrega podrán ser modificados unilateralmente por el cliente con 24 horas de aviso.',
          riskLevel: 'low',
          riskType: 'Flexibilidad de Plazos',
          description: 'Permite cambios de cronograma con poco aviso, pero el impacto es manejable.',
          impact: 'Dificultades de planificación, posibles costos adicionales, necesidad de flexibilidad operativa.',
          mitigation: 'Establecer límites a las modificaciones de plazos y compensación por cambios de último momento.',
          location: 'Sección 4.3'
        }
      ];
      
      setRiskClauses(mockRisks);
      setIsAnalyzing(false);
    }, 4000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'border-red-500 bg-red-500/10 text-red-100';
      case 'medium':
        return 'border-yellow-500 bg-yellow-500/10 text-yellow-100';
      case 'low':
        return 'border-green-500 bg-green-500/10 text-green-100';
      default:
        return 'border-gray-500 bg-gray-500/10 text-gray-100';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high':
        return <TrendingUp className="h-5 w-5 text-red-400" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'low':
        return <TrendingDown className="h-5 w-5 text-green-400" />;
      default:
        return <Shield className="h-5 w-5 text-gray-400" />;
    }
  };

  const filteredRisks = filterRisk === 'all' 
    ? riskClauses 
    : riskClauses.filter(risk => risk.riskLevel === filterRisk);

  const riskStats = {
    high: riskClauses.filter(r => r.riskLevel === 'high').length,
    medium: riskClauses.filter(r => r.riskLevel === 'medium').length,
    low: riskClauses.filter(r => r.riskLevel === 'low').length,
    total: riskClauses.length
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="bg-red-600 p-2 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Análisis de Cláusulas Riesgosas</h2>
            <p className="text-blue-200">Detección automática de riesgos contractuales</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Upload Section */}
        <div className="mb-8">
          <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Subir Contrato para Análisis de Riesgos</h3>
            <p className="text-blue-200 mb-4">
              Soporta PDF, DOC, DOCX hasta 10MB
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="risk-upload"
            />
            <label
              htmlFor="risk-upload"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200 inline-block"
            >
              Seleccionar Contrato
            </label>
            
            {selectedFile && (
              <div className="mt-4 p-4 bg-white/10 rounded-lg">
                <p className="text-white">
                  <strong>Contrato seleccionado:</strong> {selectedFile.name}
                </p>
                <p className="text-blue-200 text-sm">
                  Tamaño: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        {selectedFile && riskClauses.length === 0 && (
          <div className="mb-8 text-center">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analizando riesgos con IA...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Iniciar Análisis de Riesgos</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Risk Analysis Results */}
        {riskClauses.length > 0 && (
          <div className="space-y-6">
            {/* Risk Summary */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Resumen de Riesgos Identificados</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">{riskStats.high}</div>
                  <div className="text-sm text-red-300">Riesgo Alto</div>
                </div>
                <div className="text-center p-4 bg-yellow-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{riskStats.medium}</div>
                  <div className="text-sm text-yellow-300">Riesgo Medio</div>
                </div>
                <div className="text-center p-4 bg-green-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{riskStats.low}</div>
                  <div className="text-sm text-green-300">Riesgo Bajo</div>
                </div>
                <div className="text-center p-4 bg-blue-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{riskStats.total}</div>
                  <div className="text-sm text-blue-300">Total</div>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterRisk('all')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  filterRisk === 'all' ? 'bg-blue-600 text-white' : 'bg-white/20 text-blue-200 hover:bg-white/30'
                }`}
              >
                Todos ({riskStats.total})
              </button>
              <button
                onClick={() => setFilterRisk('high')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  filterRisk === 'high' ? 'bg-red-600 text-white' : 'bg-white/20 text-blue-200 hover:bg-white/30'
                }`}
              >
                Alto ({riskStats.high})
              </button>
              <button
                onClick={() => setFilterRisk('medium')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  filterRisk === 'medium' ? 'bg-yellow-600 text-white' : 'bg-white/20 text-blue-200 hover:bg-white/30'
                }`}
              >
                Medio ({riskStats.medium})
              </button>
              <button
                onClick={() => setFilterRisk('low')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  filterRisk === 'low' ? 'bg-green-600 text-white' : 'bg-white/20 text-blue-200 hover:bg-white/30'
                }`}
              >
                Bajo ({riskStats.low})
              </button>
            </div>

            {/* Risk Clauses */}
            <div className="space-y-4">
              {filteredRisks.map((risk) => (
                <div
                  key={risk.id}
                  className={`border-l-4 rounded-lg p-6 ${getRiskColor(risk.riskLevel)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getRiskIcon(risk.riskLevel)}
                      <div>
                        <h4 className="font-semibold text-white">{risk.riskType}</h4>
                        <p className="text-sm opacity-75">📍 {risk.location}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      risk.riskLevel === 'high' ? 'bg-red-600 text-white' :
                      risk.riskLevel === 'medium' ? 'bg-yellow-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {risk.riskLevel === 'high' ? 'ALTO' :
                       risk.riskLevel === 'medium' ? 'MEDIO' : 'BAJO'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2">Cláusula Identificada:</h5>
                      <p className="bg-white/10 p-3 rounded italic">
                        "{risk.clause}"
                      </p>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Descripción del Riesgo:</h5>
                      <p className="opacity-90">{risk.description}</p>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Impacto Potencial:</h5>
                      <p className="opacity-90">{risk.impact}</p>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Estrategia de Mitigación:</h5>
                      <p className="opacity-90">{risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRisks.length === 0 && (
              <div className="text-center py-8">
                <p className="text-blue-200">No se encontraron riesgos del nivel seleccionado.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalisisRiesgos;