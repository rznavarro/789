import React, { useState } from 'react';
import { Search, Building, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface DueDiligenceReport {
  companyName: string;
  riskScore: number;
  status: 'completed' | 'in-progress' | 'pending';
  categories: {
    legal: CategoryResult;
    financial: CategoryResult;
    operational: CategoryResult;
    regulatory: CategoryResult;
  };
  keyFindings: Finding[];
  recommendations: string[];
}

interface CategoryResult {
  score: number;
  status: 'pass' | 'warning' | 'fail';
  issues: number;
}

interface Finding {
  type: 'positive' | 'negative' | 'neutral';
  category: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

const DueDiligence: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState<DueDiligenceReport | null>(null);

  const handleStartDueDiligence = async () => {
    if (!companyName.trim()) return;

    setIsProcessing(true);
    
    // Simular procesamiento de due diligence
    setTimeout(() => {
      const mockReport: DueDiligenceReport = {
        companyName: companyName,
        riskScore: 72,
        status: 'completed',
        categories: {
          legal: { score: 85, status: 'pass', issues: 2 },
          financial: { score: 68, status: 'warning', issues: 4 },
          operational: { score: 78, status: 'pass', issues: 3 },
          regulatory: { score: 58, status: 'warning', issues: 6 }
        },
        keyFindings: [
          {
            type: 'positive',
            category: 'Legal',
            title: 'Estructura Societaria Sólida',
            description: 'La empresa mantiene una estructura societaria clara y bien documentada, con registros actualizados en el Registro de Comercio.',
            impact: 'medium'
          },
          {
            type: 'negative',
            category: 'Financial',
            title: 'Endeudamiento Elevado',
            description: 'La empresa presenta un ratio de endeudamiento del 78%, superior al promedio de la industria (45%). Esto podría indicar dificultades financieras futuras.',
            impact: 'high'
          },
          {
            type: 'negative',
            category: 'Regulatory',
            title: 'Multas Ambientales Recientes',
            description: 'Se identificaron 3 multas ambientales en los últimos 24 meses por un total de $2.5M, indicando posibles deficiencias en cumplimiento ambiental.',
            impact: 'high'
          },
          {
            type: 'neutral',
            category: 'Operational',
            title: 'Certificaciones de Calidad',
            description: 'La empresa cuenta con certificaciones ISO 9001 y ISO 14001 vigentes, demostrando compromiso con calidad y medio ambiente.',
            impact: 'medium'
          },
          {
            type: 'negative',
            category: 'Legal',
            title: 'Litigios Pendientes',
            description: 'Existen 2 litigios laborales pendientes por un monto total estimado de $800K, relacionados con despidos del año anterior.',
            impact: 'medium'
          },
          {
            type: 'positive',
            category: 'Financial',
            title: 'Crecimiento de Ingresos Sostenido',
            description: 'Los ingresos han crecido consistentemente un 12% anual en los últimos 3 años, mostrando una tendencia positiva del negocio.',
            impact: 'high'
          }
        ],
        recommendations: [
          'Solicitar plan de reducción de endeudamiento con cronograma específico',
          'Requerir garantías adicionales debido al alto nivel de endeudamiento',
          'Evaluar el impacto de las multas ambientales en la valoración',
          'Solicitar póliza de seguro que cubra los litigios laborales pendientes',
          'Considerar cláusulas de ajuste de precio basadas en resolución de litigios',
          'Implementar monitoreo trimestral de indicadores financieros clave'
        ]
      };
      
      setReport(mockReport);
      setIsProcessing(false);
    }, 5000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'fail':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-blue-400" />;
    }
  };

  const getFindingIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return '✅';
      case 'negative':
        return '❌';
      case 'neutral':
        return 'ℹ️';
      default:
        return '📋';
    }
  };

  const getFindingColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'border-green-500 bg-green-500/10';
      case 'negative':
        return 'border-red-500 bg-red-500/10';
      case 'neutral':
        return 'border-blue-500 bg-blue-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Search className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Due Diligence Automatizado</h2>
            <p className="text-blue-200">Análisis integral de empresas con IA avanzada</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Input Section */}
        {!report && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 border border-white/20 rounded-lg p-8 text-center">
              <Building className="h-16 w-16 text-indigo-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Iniciar Due Diligence</h3>
              <p className="text-blue-200 mb-6">
                Ingresa el nombre de la empresa para comenzar un análisis integral automatizado
              </p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Nombre de la empresa (ej: Empresa ABC S.A.)"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                
                <button
                  onClick={handleStartDueDiligence}
                  disabled={!companyName.trim() || isProcessing}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Procesando due diligence...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span>Iniciar Due Diligence</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-6 text-sm text-blue-300">
                <p>El análisis incluye:</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>• Análisis legal</div>
                  <div>• Evaluación financiera</div>
                  <div>• Revisión operacional</div>
                  <div>• Cumplimiento regulatorio</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Due Diligence Report */}
        {report && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{report.companyName}</h3>
                  <p className="text-blue-200">Reporte de Due Diligence Completado</p>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${getScoreColor(report.riskScore)}`}>
                    {report.riskScore}/100
                  </div>
                  <p className="text-blue-200">Puntuación de Riesgo</p>
                </div>
              </div>
            </div>

            {/* Categories Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(report.categories).map(([key, category]) => (
                <div key={key} className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white capitalize">
                      {key === 'legal' ? 'Legal' :
                       key === 'financial' ? 'Financiero' :
                       key === 'operational' ? 'Operacional' :
                       'Regulatorio'}
                    </h4>
                    {getStatusIcon(category.status)}
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(category.score)} mb-2`}>
                    {category.score}/100
                  </div>
                  <p className="text-sm text-blue-200">
                    {category.issues} problema{category.issues !== 1 ? 's' : ''} identificado{category.issues !== 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Findings */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Hallazgos Principales</h3>
              <div className="space-y-4">
                {report.keyFindings.map((finding, index) => (
                  <div
                    key={index}
                    className={`border-l-4 rounded-lg p-4 ${getFindingColor(finding.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getFindingIcon(finding.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{finding.title}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                              {finding.category}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              finding.impact === 'high' ? 'bg-red-600 text-white' :
                              finding.impact === 'medium' ? 'bg-yellow-600 text-white' :
                              'bg-green-600 text-white'
                            }`}>
                              {finding.impact === 'high' ? 'Alto' :
                               finding.impact === 'medium' ? 'Medio' : 'Bajo'}
                            </span>
                          </div>
                        </div>
                        <p className="text-blue-200">{finding.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recomendaciones</h3>
              <ul className="space-y-3">
                {report.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-3 text-blue-200">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Descargar Reporte Completo</span>
              </button>
              <button
                onClick={() => {
                  setReport(null);
                  setCompanyName('');
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Nuevo Análisis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DueDiligence;