import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, AlertTriangle, XCircle, Download } from 'lucide-react';

interface AnalysisResult {
  score: number;
  issues: Issue[];
  suggestions: string[];
  summary: string;
}

interface Issue {
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  location: string;
}

const RevisionDocumentos: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    // Simular análisis de IA
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        score: 78,
        issues: [
          {
            type: 'error',
            title: 'Cláusula de Fuerza Mayor Incompleta',
            description: 'La cláusula de fuerza mayor no incluye eventos de pandemia o crisis sanitarias, lo que podría generar disputas futuras.',
            location: 'Sección 12.3'
          },
          {
            type: 'warning',
            title: 'Jurisdicción Ambigua',
            description: 'La cláusula de jurisdicción podría interpretarse de manera ambigua. Se recomienda especificar claramente el tribunal competente.',
            location: 'Sección 15.1'
          },
          {
            type: 'warning',
            title: 'Plazo de Prescripción',
            description: 'No se especifica el plazo de prescripción para reclamos, lo que podría generar incertidumbre legal.',
            location: 'Sección 8.4'
          },
          {
            type: 'info',
            title: 'Actualización de Normativa',
            description: 'Considerar actualizar las referencias normativas a las versiones más recientes de las leyes citadas.',
            location: 'Anexo A'
          }
        ],
        suggestions: [
          'Incluir cláusula específica sobre eventos de pandemia en fuerza mayor',
          'Definir claramente la jurisdicción y tribunal competente',
          'Agregar cláusula de prescripción con plazos específicos',
          'Actualizar referencias normativas a versiones vigentes',
          'Considerar agregar cláusula de mediación previa a litigio'
        ],
        summary: 'El documento presenta una estructura legal sólida con un puntaje de 78/100. Se identificaron 4 áreas de mejora, incluyendo 1 error crítico que requiere atención inmediata y 2 advertencias importantes. Las sugerencias de mejora se enfocan en fortalecer las cláusulas de fuerza mayor, jurisdicción y prescripción para reducir riesgos legales futuros.'
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 4000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'info':
        return <CheckCircle className="h-5 w-5 text-blue-400" />;
      default:
        return <CheckCircle className="h-5 w-5 text-blue-400" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="bg-green-600 p-2 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Revisión de Documentos</h2>
            <p className="text-blue-200">Análisis automático de documentos legales con IA</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Upload Section */}
        <div className="mb-8">
          <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Subir Documento Legal</h3>
            <p className="text-blue-200 mb-4">
              Soporta PDF, DOC, DOCX hasta 10MB
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200 inline-block"
            >
              Seleccionar Archivo
            </label>
            
            {selectedFile && (
              <div className="mt-4 p-4 bg-white/10 rounded-lg">
                <p className="text-white">
                  <strong>Archivo seleccionado:</strong> {selectedFile.name}
                </p>
                <p className="text-blue-200 text-sm">
                  Tamaño: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        {selectedFile && !analysisResult && (
          <div className="mb-8 text-center">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analizando documento con IA...</span>
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  <span>Iniciar Análisis Legal</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Puntuación General</h3>
                <div className={`text-3xl font-bold ${getScoreColor(analysisResult.score)}`}>
                  {analysisResult.score}/100
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    analysisResult.score >= 80 ? 'bg-green-500' :
                    analysisResult.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analysisResult.score}%` }}
                ></div>
              </div>
            </div>

            {/* Issues */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Problemas Identificados</h3>
              <div className="space-y-4">
                {analysisResult.issues.map((issue, index) => (
                  <div key={index} className="flex space-x-3 p-4 bg-white/5 rounded-lg">
                    {getIssueIcon(issue.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{issue.title}</h4>
                      <p className="text-blue-200 text-sm mt-1">{issue.description}</p>
                      <p className="text-blue-300 text-xs mt-2">📍 {issue.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Sugerencias de Mejora</h3>
              <ul className="space-y-2">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2 text-blue-200">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Resumen Ejecutivo</h3>
              <p className="text-blue-200 leading-relaxed">{analysisResult.summary}</p>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Descargar Reporte</span>
              </button>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setAnalysisResult(null);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Analizar Otro Documento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevisionDocumentos;