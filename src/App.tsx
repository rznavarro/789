import React, { useState } from 'react';
import { Scale, MessageCircle, FileText, Search, Shield, AlertTriangle, Users, BarChart3 } from 'lucide-react';
import ChatLegal from './components/ChatLegal';
import ConsultoriaEspecializada from './components/ConsultoriaEspecializada';
import RevisionDocumentos from './components/RevisionDocumentos';
import CorreccionContratos from './components/CorreccionContratos';
import AnalisisRiesgos from './components/AnalisisRiesgos';
import DueDiligence from './components/DueDiligence';
import ExtraccionDatos from './components/ExtraccionDatos';
import EvaluacionRiesgos from './components/EvaluacionRiesgos';

type ActiveModule = 'chat' | 'consultoria' | 'revision' | 'correccion' | 'analisis' | 'due-diligence' | 'extraccion' | 'evaluacion';

function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('chat');

  const modules = [
    { id: 'chat' as const, name: 'Chat Legal 24/7', icon: MessageCircle, description: 'Asistente legal inteligente disponible las 24 horas' },
    { id: 'consultoria' as const, name: 'Consultoría Especializada', icon: Users, description: 'Asesoramiento legal especializado por áreas' },
    { id: 'revision' as const, name: 'Revisión de Documentos', icon: FileText, description: 'Análisis automático de documentos legales' },
    { id: 'correccion' as const, name: 'Corrección de Contratos', icon: Shield, description: 'Automatización de correcciones contractuales' },
    { id: 'analisis' as const, name: 'Análisis de Riesgos', icon: AlertTriangle, description: 'Detección de cláusulas riesgosas' },
    { id: 'due-diligence' as const, name: 'Due Diligence', icon: Search, description: 'Due diligence automatizado con IA' },
    { id: 'extraccion' as const, name: 'Extracción de Datos', icon: BarChart3, description: 'Extracción masiva de datos legales' },
    { id: 'evaluacion' as const, name: 'Evaluación de Riesgos', icon: Shield, description: 'Evaluación de riesgos para inversionistas' }
  ];

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'chat':
        return <ChatLegal />;
      case 'consultoria':
        return <ConsultoriaEspecializada />;
      case 'revision':
        return <RevisionDocumentos />;
      case 'correccion':
        return <CorreccionContratos />;
      case 'analisis':
        return <AnalisisRiesgos />;
      case 'due-diligence':
        return <DueDiligence />;
      case 'extraccion':
        return <ExtraccionDatos />;
      case 'evaluacion':
        return <EvaluacionRiesgos />;
      default:
        return <ChatLegal />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">UMBRA</h1>
                <p className="text-sm text-blue-200">Legal Intelligence System</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">Sistema de IA Legal Avanzado</p>
              <p className="text-blue-200 text-sm">8 Módulos Especializados</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6">Módulos Disponibles</h2>
              <nav className="space-y-2">
                {modules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeModule === module.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-blue-100 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium text-sm">{module.name}</div>
                        <div className="text-xs opacity-75">{module.description}</div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 min-h-[600px]">
              {renderActiveModule()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;