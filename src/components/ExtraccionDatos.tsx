import React, { useState } from 'react';
import { BarChart3, Upload, Download, Filter, Table } from 'lucide-react';

interface ExtractedData {
  fileName: string;
  totalDocuments: number;
  extractedFields: ExtractedField[];
  summary: DataSummary;
}

interface ExtractedField {
  fieldName: string;
  value: string;
  confidence: number;
  source: string;
  page?: number;
}

interface DataSummary {
  contractTypes: { [key: string]: number };
  dateRange: { from: string; to: string };
  totalValue: number;
  parties: string[];
}

const ExtraccionDatos: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [filterField, setFilterField] = useState<string>('all');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      setExtractedData(null);
    }
  };

  const handleExtraction = async () => {
    if (!selectedFiles) return;

    setIsProcessing(true);
    
    // Simular extracción de datos
    setTimeout(() => {
      const mockData: ExtractedData = {
        fileName: selectedFiles.length > 1 ? `${selectedFiles.length} documentos` : selectedFiles[0].name,
        totalDocuments: selectedFiles.length,
        extractedFields: [
          {
            fieldName: 'Nombre del Contrato',
            value: 'Contrato de Prestación de Servicios Profesionales',
            confidence: 98,
            source: 'contrato_servicios.pdf',
            page: 1
          },
          {
            fieldName: 'Contratante',
            value: 'EMPRESA TECNOLÓGICA CHILE S.A.',
            confidence: 95,
            source: 'contrato_servicios.pdf',
            page: 1
          },
          {
            fieldName: 'Contratista',
            value: 'CONSULTORA LEGAL ASOCIADOS LTDA.',
            confidence: 97,
            source: 'contrato_servicios.pdf',
            page: 1
          },
          {
            fieldName: 'Fecha de Inicio',
            value: '01/03/2024',
            confidence: 99,
            source: 'contrato_servicios.pdf',
            page: 2
          },
          {
            fieldName: 'Fecha de Término',
            value: '31/12/2024',
            confidence: 99,
            source: 'contrato_servicios.pdf',
            page: 2
          },
          {
            fieldName: 'Valor del Contrato',
            value: '$45.000.000 CLP',
            confidence: 96,
            source: 'contrato_servicios.pdf',
            page: 3
          },
          {
            fieldName: 'Forma de Pago',
            value: 'Mensual, dentro de los primeros 5 días de cada mes',
            confidence: 92,
            source: 'contrato_servicios.pdf',
            page: 3
          },
          {
            fieldName: 'Jurisdicción',
            value: 'Tribunales de Santiago, Chile',
            confidence: 94,
            source: 'contrato_servicios.pdf',
            page: 8
          },
          {
            fieldName: 'Cláusula de Confidencialidad',
            value: 'Vigente por 3 años posterior al término del contrato',
            confidence: 89,
            source: 'contrato_servicios.pdf',
            page: 6
          },
          {
            fieldName: 'Penalidades',
            value: '2% del valor mensual por cada día de atraso',
            confidence: 91,
            source: 'contrato_servicios.pdf',
            page: 4
          },
          {
            fieldName: 'Garantías',
            value: 'Boleta de Garantía por $4.500.000 CLP',
            confidence: 93,
            source: 'contrato_servicios.pdf',
            page: 5
          },
          {
            fieldName: 'Renovación Automática',
            value: 'Sí, por períodos de 1 año salvo aviso contrario con 60 días de anticipación',
            confidence: 87,
            source: 'contrato_servicios.pdf',
            page: 7
          }
        ],
        summary: {
          contractTypes: {
            'Servicios Profesionales': 3,
            'Compraventa': 2,
            'Arrendamiento': 1,
            'Confidencialidad': 2
          },
          dateRange: {
            from: '01/01/2024',
            to: '31/12/2025'
          },
          totalValue: 125000000,
          parties: [
            'EMPRESA TECNOLÓGICA CHILE S.A.',
            'CONSULTORA LEGAL ASOCIADOS LTDA.',
            'INMOBILIARIA DEL CENTRO S.A.',
            'SERVICIOS INTEGRALES LTDA.'
          ]
        }
      };
      
      setExtractedData(mockData);
      setIsProcessing(false);
    }, 4500);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-400';
    if (confidence >= 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 95) return 'bg-green-600';
    if (confidence >= 85) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const uniqueFieldNames = extractedData 
    ? [...new Set(extractedData.extractedFields.map(field => field.fieldName))]
    : [];

  const filteredFields = extractedData
    ? filterField === 'all' 
      ? extractedData.extractedFields
      : extractedData.extractedFields.filter(field => field.fieldName === filterField)
    : [];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-600 p-2 rounded-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Extracción Masiva de Datos</h2>
            <p className="text-blue-200">Extracción automática de información de documentos legales</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Upload Section */}
        <div className="mb-8">
          <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Subir Documentos para Extracción</h3>
            <p className="text-blue-200 mb-4">
              Soporta múltiples archivos PDF, DOC, DOCX hasta 50MB total
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="extraction-upload"
            />
            <label
              htmlFor="extraction-upload"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200 inline-block"
            >
              Seleccionar Documentos
            </label>
            
            {selectedFiles && (
              <div className="mt-4 p-4 bg-white/10 rounded-lg">
                <p className="text-white mb-2">
                  <strong>Documentos seleccionados:</strong> {selectedFiles.length}
                </p>
                <div className="text-sm text-blue-200 space-y-1">
                  {Array.from(selectedFiles).slice(0, 5).map((file, index) => (
                    <div key={index}>• {file.name}</div>
                  ))}
                  {selectedFiles.length > 5 && (
                    <div>... y {selectedFiles.length - 5} más</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Process Button */}
        {selectedFiles && !extractedData && (
          <div className="mb-8 text-center">
            <button
              onClick={handleExtraction}
              disabled={isProcessing}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Extrayendo datos con IA...</span>
                </>
              ) : (
                <>
                  <BarChart3 className="h-5 w-5" />
                  <span>Iniciar Extracción de Datos</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Extraction Results */}
        {extractedData && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Resumen de Extracción</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-cyan-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400">{extractedData.totalDocuments}</div>
                  <div className="text-sm text-cyan-300">Documentos</div>
                </div>
                <div className="text-center p-4 bg-blue-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{extractedData.extractedFields.length}</div>
                  <div className="text-sm text-blue-300">Campos Extraídos</div>
                </div>
                <div className="text-center p-4 bg-green-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">
                    {Math.round(extractedData.extractedFields.reduce((acc, field) => acc + field.confidence, 0) / extractedData.extractedFields.length)}%
                  </div>
                  <div className="text-sm text-green-300">Confianza Promedio</div>
                </div>
                <div className="text-center p-4 bg-purple-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">
                    ${(extractedData.summary.totalValue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-purple-300">Valor Total</div>
                </div>
              </div>
            </div>

            {/* Contract Types */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Tipos de Contratos Identificados</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(extractedData.summary.contractTypes).map(([type, count]) => (
                  <div key={type} className="bg-white/5 p-3 rounded-lg">
                    <div className="font-semibold text-white">{type}</div>
                    <div className="text-blue-200">{count} contrato{count !== 1 ? 's' : ''}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-white" />
              <select
                value={filterField}
                onChange={(e) => setFilterField(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">Todos los campos</option>
                {uniqueFieldNames.map(fieldName => (
                  <option key={fieldName} value={fieldName}>{fieldName}</option>
                ))}
              </select>
            </div>

            {/* Extracted Data Table */}
            <div className="bg-white/10 border border-white/20 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-white/20 flex items-center space-x-3">
                <Table className="h-5 w-5 text-white" />
                <h3 className="text-lg font-semibold text-white">Datos Extraídos</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-white font-medium">Campo</th>
                      <th className="px-4 py-3 text-left text-white font-medium">Valor</th>
                      <th className="px-4 py-3 text-left text-white font-medium">Confianza</th>
                      <th className="px-4 py-3 text-left text-white font-medium">Fuente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFields.map((field, index) => (
                      <tr key={index} className="border-t border-white/10 hover:bg-white/5">
                        <td className="px-4 py-3 text-blue-200 font-medium">{field.fieldName}</td>
                        <td className="px-4 py-3 text-white">{field.value}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${getConfidenceColor(field.confidence)}`}>
                              {field.confidence}%
                            </span>
                            <span className={`px-2 py-1 rounded text-xs text-white ${getConfidenceBadge(field.confidence)}`}>
                              {field.confidence >= 95 ? 'Alta' : field.confidence >= 85 ? 'Media' : 'Baja'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-blue-300 text-sm">
                          {field.source}
                          {field.page && ` (p.${field.page})`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Descargar Excel</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Descargar CSV</span>
              </button>
              <button
                onClick={() => {
                  setSelectedFiles(null);
                  setExtractedData(null);
                  setFilterField('all');
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Nueva Extracción
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtraccionDatos;