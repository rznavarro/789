import React, { useState } from 'react';
import { Shield, Upload, Wand2, Download, CheckCircle, AlertTriangle } from 'lucide-react';

interface Correction {
  id: string;
  type: 'grammar' | 'legal' | 'structure' | 'risk';
  original: string;
  corrected: string;
  explanation: string;
  severity: 'high' | 'medium' | 'low';
  location: string;
}

const CorreccionContratos: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [appliedCorrections, setAppliedCorrections] = useState<Set<string>>(new Set());

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCorrections([]);
      setAppliedCorrections(new Set());
    }
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    
    // Simular procesamiento de IA
    setTimeout(() => {
      const mockCorrections: Correction[] = [
        {
          id: '1',
          type: 'legal',
          original: 'El contratista será responsable de todos los daños',
          corrected: 'El contratista será responsable de todos los daños directos y previsibles, excluyendo daños indirectos, lucro cesante y daño emergente no previsible',
          explanation: 'La responsabilidad ilimitada puede generar riesgos excesivos. Se recomienda limitar la responsabilidad a daños directos y previsibles.',
          severity: 'high',
          location: 'Cláusula 8.2'
        },
        {
          id: '2',
          type: 'risk',
          original: 'En caso de fuerza mayor, las partes quedarán liberadas de sus obligaciones',
          corrected: 'En caso de fuerza mayor, incluyendo pero no limitado a pandemias, desastres naturales, actos de gobierno, las partes quedarán temporalmente liberadas de sus obligaciones, debiendo notificar dentro de 48 horas',
          explanation: 'La definición de fuerza mayor debe ser específica e incluir eventos recientes como pandemias. Además, debe establecer procedimientos de notificación.',
          severity: 'high',
          location: 'Cláusula 12.1'
        },
        {
          id: '3',
          type: 'structure',
          original: 'Las disputas se resolverán en tribunales competentes',
          corrected: 'Las disputas se resolverán mediante arbitraje en el Centro de Arbitraje y Mediación de Santiago, aplicando las reglas de arbitraje comercial internacional, con sede en Santiago, Chile',
          explanation: 'La jurisdicción debe ser específica para evitar conflictos. El arbitraje suele ser más eficiente para disputas comerciales.',
          severity: 'medium',
          location: 'Cláusula 15.3'
        },
        {
          id: '4',
          type: 'grammar',
          original: 'El plazo para la entrega de los productos sera de 30 días',
          corrected: 'El plazo para la entrega de los productos será de treinta (30) días calendario',
          explanation: 'Corrección ortográfica (será) y especificación del tipo de días (calendario vs hábiles). Los números importantes deben escribirse en letras y números.',
          severity: 'low',
          location: 'Cláusula 4.1'
        },
        {
          id: '5',
          type: 'legal',
          original: 'La confidencialidad se mantendrá por tiempo indefinido',
          corrected: 'La confidencialidad se mantendrá por un período de cinco (5) años posterior a la terminación del contrato, excepto para información que por su naturaleza deba permanecer confidencial indefinidamente',
          explanation: 'Los períodos indefinidos pueden ser problemáticos. Se recomienda establecer plazos específicos con excepciones claras.',
          severity: 'medium',
          location: 'Cláusula 9.4'
        }
      ];
      
      setCorrections(mockCorrections);
      setIsProcessing(false);
    }, 3500);
  };

  const toggleCorrection = (correctionId: string) => {
    const newApplied = new Set(appliedCorrections);
    if (newApplied.has(correctionId)) {
      newApplied.delete(correctionId);
    } else {
      newApplied.add(correctionId);
    }
    setAppliedCorrections(newApplied);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-500 bg-red-500/10';
      case 'medium':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'low':
        return 'border-blue-500 bg-blue-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'legal':
        return '⚖️';
      case 'risk':
        return '⚠️';
      case 'structure':
        return '🏗️';
      case 'grammar':
        return '✏️';
      default:
        return '📝';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-600 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Corrección de Contratos</h2>
            <p className="text-blue-200">Automatización inteligente de correcciones contractuales</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Upload Section */}
        <div className="mb-8">
          <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Subir Contrato para Corrección</h3>
            <p className="text-blue-200 mb-4">
              Soporta PDF, DOC, DOCX hasta 10MB
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="contract-upload"
            />
            <label
              htmlFor="contract-upload"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200 inline-block"
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

        {/* Process Button */}
        {selectedFile && corrections.length === 0 && (
          <div className="mb-8 text-center">
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Procesando correcciones con IA...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  <span>Generar Correcciones Automáticas</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Corrections Results */}
        {corrections.length > 0 && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Resumen de Correcciones</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {corrections.filter(c => c.severity === 'high').length}
                  </div>
                  <div className="text-sm text-blue-200">Críticas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {corrections.filter(c => c.severity === 'medium').length}
                  </div>
                  <div className="text-sm text-blue-200">Importantes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {corrections.filter(c => c.severity === 'low').length}
                  </div>
                  <div className="text-sm text-blue-200">Menores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {appliedCorrections.size}
                  </div>
                  <div className="text-sm text-blue-200">Aplicadas</div>
                </div>
              </div>
            </div>

            {/* Corrections List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Correcciones Sugeridas</h3>
              {corrections.map((correction) => (
                <div
                  key={correction.id}
                  className={`border-l-4 rounded-lg p-6 ${getSeverityColor(correction.severity)} ${
                    appliedCorrections.has(correction.id) ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTypeIcon(correction.type)}</span>
                      <div>
                        <h4 className="font-semibold text-white capitalize">
                          {correction.type === 'grammar' ? 'Gramática y Estilo' :
                           correction.type === 'legal' ? 'Legal' :
                           correction.type === 'risk' ? 'Gestión de Riesgos' :
                           'Estructura'}
                        </h4>
                        <p className="text-sm text-blue-300">📍 {correction.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCorrection(correction.id)}
                      className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                        appliedCorrections.has(correction.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-white/20 text-blue-200 hover:bg-white/30'
                      }`}
                    >
                      {appliedCorrections.has(correction.id) ? (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>Aplicada</span>
                        </div>
                      ) : (
                        'Aplicar'
                      )}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-red-300 mb-2">Texto Original:</h5>
                      <p className="bg-red-900/20 p-3 rounded text-red-100 italic">
                        "{correction.original}"
                      </p>
                    </div>

                    <div>
                      <h5 className="font-medium text-green-300 mb-2">Texto Corregido:</h5>
                      <p className="bg-green-900/20 p-3 rounded text-green-100">
                        "{correction.corrected}"
                      </p>
                    </div>

                    <div>
                      <h5 className="font-medium text-blue-300 mb-2">Explicación:</h5>
                      <p className="text-blue-200">{correction.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-6 border-t border-white/20">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Descargar Contrato Corregido</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Descargar Reporte de Cambios</span>
              </button>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setCorrections([]);
                  setAppliedCorrections(new Set());
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Procesar Otro Contrato
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorreccionContratos;