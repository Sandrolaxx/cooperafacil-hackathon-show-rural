'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle2, AlertCircle, AlertTriangle, ChevronRight, Calendar } from 'lucide-react';
import { useLicense } from '@/app/contexts/LicenseContext';

interface License {
  id: number;
  title: string;
  progress: number;
  status: 'completed' | 'warning' | 'error' | 'pending';
}

interface CompletedLicense {
  id: number;
  title: string;
  expiryDate: string;
  statusType: 'expired' | 'expiring-soon' | 'valid' | 'info';
}

export default function Licenciamento() {
  const router = useRouter();
  const { isProcessCompleted } = useLicense();
  
  // Dados para processo em andamento
  const licenses: License[] = [
    { id: 3, title: 'LICENÇA 3 - AMBIENTAL', progress: 70, status: 'completed' },
    { id: 3, title: 'LICENÇA 3 - AMBIENTAL', progress: 70, status: 'warning' },
    { id: 2, title: 'LICENÇA 2 - AMBIENTAL', progress: 0, status: 'error' },
    { id: 1, title: 'LICENÇA 1 - AMBIENTAL', progress: 30, status: 'pending' },
  ];

  // Dados para licenças finalizadas
  const completedLicenses: CompletedLicense[] = [
    { id: 3, title: 'LICENÇA 3 - AMBIENTAL', expiryDate: '04/10/2024', statusType: 'expired' },
    { id: 3, title: 'LICENÇA 3 - AMBIENTAL', expiryDate: '04/10/2024', statusType: 'info' },
    { id: 2, title: 'LICENÇA 2 - AMBIENTAL', expiryDate: '08/12/2025', statusType: 'valid' },
    { id: 2, title: 'LICENÇA 2 - AMBIENTAL', expiryDate: '08/12/2025', statusType: 'info' },
  ];

  const totalProgress = Math.round(
    licenses.reduce((acc, license) => acc + license.progress, 0) / licenses.length
  );

  const getStatusIcon = (status: License['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-8 h-8 text-white" />;
      case 'warning':
        return <AlertCircle className="w-8 h-8 text-blue-600" />;
      case 'error':
        return <AlertTriangle className="w-8 h-8 text-red-600" />;
      case 'pending':
        return <AlertCircle className="w-8 h-8 text-blue-500" />;
    }
  };

  const getCardStyle = (status: License['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-linear-to-r from-green-500 to-green-400 text-white shadow-lg shadow-green-200';
      case 'warning':
        return 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300';
      case 'error':
        return 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300';
      case 'pending':
        return 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300';
    }
  };

  const getProgressColor = (status: License['status']) => {
    switch (status) {
      case 'completed':
        return 'text-white';
      case 'warning':
      case 'error':
      case 'pending':
        return 'text-gray-500';
    }
  };

  const handleCardClick = (licenseId: number) => {
    router.push(`/cooperado/licenciamento/${licenseId}`);
  };

  // Funções para licenças finalizadas
  const getCompletedCardStyle = (statusType: CompletedLicense['statusType']) => {
    switch (statusType) {
      case 'expired':
        return 'bg-linear-to-r from-yellow-500 to-yellow-400 text-white shadow-lg shadow-yellow-200';
      case 'expiring-soon':
        return 'bg-linear-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-200';
      case 'valid':
        return 'bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-200';
      case 'info':
        return 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300';
    }
  };

  const getCompletedIcon = (statusType: CompletedLicense['statusType']) => {
    switch (statusType) {
      case 'expired':
      case 'expiring-soon':
        return <AlertTriangle className="w-8 h-8 text-white" />;
      case 'valid':
        return <Calendar className="w-8 h-8 text-white" />;
      case 'info':
        return null;
    }
  };

  const getDateColor = (statusType: CompletedLicense['statusType']) => {
    if (statusType === 'info') {
      return 'text-red-600';
    }
    return 'text-white';
  };

  // Renderização condicional baseada no status do processo
  if (isProcessCompleted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 font-sans p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 pt-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">
              MINHAS LICENÇAS
            </h1>
          </div>

          {/* Info Text */}
          <div className="mb-6 text-center">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Ícones e cores indicam status/prazo
            </p>
          </div>

          {/* Completed License Cards */}
          <div className="space-y-4">
            {completedLicenses.map((license, index) => (
              <div
                key={`${license.id}-${index}`}
                onClick={() => handleCardClick(license.id)}
                className={`
                  rounded-2xl p-5 transition-all duration-300 cursor-pointer
                  transform hover:scale-[1.02] hover:shadow-xl
                  ${getCompletedCardStyle(license.statusType)}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    {getCompletedIcon(license.statusType) && (
                      <div className="flex items-center justify-center">
                        {getCompletedIcon(license.statusType)}
                      </div>
                    )}

                    <div>
                      <h3
                        className={`text-lg font-bold mb-1 ${
                          license.statusType === 'info' ? 'text-blue-900' : 'text-white'
                        }`}
                      >
                        {license.title}
                      </h3>
                      <p className={`text-base font-semibold ${getDateColor(license.statusType)}`}>
                        VENCIMENTO: {license.expiryDate}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-6 h-6 ${
                      license.statusType === 'info' ? 'text-gray-400' : 'text-white'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Renderização da tela de progresso (original)
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">
            PROCESSO - LICENÇAS AMBIENTAIS
          </h1>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="h-3 bg-gray-300 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-linear-to-r from-green-500 to-green-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
          <p className="text-lg font-semibold text-green-500 text-center">
            {totalProgress}% Concluído
          </p>
        </div>

        {/* License Cards */}
        <div className="space-y-4">
          {licenses.map((license, index) => (
            <div
              key={`${license.id}-${index}`}
              onClick={() => handleCardClick(license.id)}
              className={`
                rounded-2xl p-5 transition-all duration-300 cursor-pointer
                transform hover:scale-[1.02] hover:shadow-xl
                ${getCardStyle(license.status)}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      license.status === 'completed' ? 'text-white' : 'text-blue-900'
                    }`}
                  >
                    {license.title}
                  </h3>
                  <p
                    className={`text-base font-medium ${getProgressColor(license.status)}`}
                  >
                    {license.progress}% Completo
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`
                      flex items-center justify-center rounded-full
                      ${
                        license.status === 'completed'
                          ? 'bg-white/20'
                          : 'bg-gray-100'
                      }
                      p-2
                    `}
                  >
                    {getStatusIcon(license.status)}
                  </div>
                  <ChevronRight
                    className={`w-6 h-6 ${
                      license.status === 'completed' ? 'text-white' : 'text-gray-400'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Toque em uma licença para ver mais detalhes
          </p>
        </div>
      </div>
    </div>
  );
}