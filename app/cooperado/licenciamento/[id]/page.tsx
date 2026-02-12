'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Folder, CheckSquare, Square } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  completed: boolean;
}

interface LicenseDetails {
  id: string;
  title: string;
  progress: number;
  documents: Document[];
}

export default function LicenciamentoDetalhes({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [license, setLicense] = useState<LicenseDetails | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    // Mock data - Aqui você fará o HTTP request futuramente
    const mockLicenses: Record<string, LicenseDetails> = {
      '1': {
        id: '1',
        title: 'LICENÇA 1 - DOCUMENTS',
        progress: 30,
        documents: [
          { id: '1-1', title: 'DADOS PESSOAIS', completed: true },
          { id: '1-2', title: 'RECIOS PROPRIEDADE', completed: false },
          { id: '1-3', title: 'RECIBO DO CAR', completed: false },
          { id: '1-4', title: 'CERTIDÃO DA PREFEITURA', completed: false },
          { id: '1-5', title: 'CADASTRO EMPREEN. RURAL', completed: false },
        ],
      },
      '2': {
        id: '2',
        title: 'LICENÇA 2 - DOCUMENTS',
        progress: 0,
        documents: [
          { id: '2-1', title: 'DADOS PESSOAIS', completed: false },
          { id: '2-2', title: 'RECIOS PROPRIEDADE', completed: false },
          { id: '2-3', title: 'RECIBO DO CAR', completed: false },
          { id: '2-4', title: 'CERTIDÃO DA PREFEITURA', completed: false },
          { id: '2-5', title: 'CADASTRO EMPREEN. RURAL', completed: false },
        ],
      },
      '3': {
        id: '3',
        title: 'LICENÇA 3 - DOCUMENTS',
        progress: 70,
        documents: [
          { id: '3-1', title: 'DADOS PESSOAIS', completed: true },
          { id: '3-2', title: 'RECIOS PROPRIEDADE', completed: true },
          { id: '3-3', title: 'RECIBO DO CAR', completed: true },
          { id: '3-4', title: 'CERTIDÃO DA PREFEITURA', completed: false },
          { id: '3-5', title: 'CADASTRO EMPREEN. RURAL', completed: false },
        ],
      },
    };

    const licenseData = mockLicenses[id];
    if (licenseData) {
      setLicense(licenseData);
      setDocuments(licenseData.documents);
    }
  }, [id]);

  const toggleDocument = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId ? { ...doc, completed: !doc.completed } : doc
      )
    );
  };

  const handleSubmit = () => {
    // Aqui você implementará a lógica de envio dos documentos
    alert('Documentos enviados com sucesso!');
  };

  if (!license) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header com botão de voltar */}
        <div className="mb-6 pt-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-900 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
            {license.title}
          </h1>
        </div>

        {/* Progress Info */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-sm">
          <p className="text-lg font-semibold text-gray-600">
            DADOS LICENÇA {license.id} - {license.progress}%
          </p>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => toggleDocument(doc.id)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Checkbox */}
                  <div
                    className={`
                      flex items-center justify-center w-8 h-8 rounded-lg transition-all
                      ${
                        doc.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-white border-2 border-gray-300 text-gray-300'
                      }
                    `}
                  >
                    {doc.completed ? (
                      <CheckSquare className="w-6 h-6" strokeWidth={3} />
                    ) : (
                      <Square className="w-6 h-6" />
                    )}
                  </div>

                  {/* Document Title */}
                  <span
                    className={`
                      text-base font-semibold
                      ${doc.completed ? 'text-gray-700' : 'text-gray-500'}
                    `}
                  >
                    {doc.title}
                  </span>
                </div>

                {/* Folder Icon */}
                <Folder
                  className={`
                    w-8 h-8 transition-colors
                    ${doc.completed ? 'text-gray-400' : 'text-gray-300'}
                    group-hover:text-blue-500
                  `}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
        >
          ENVIAR DOCUMENTOS
        </button>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Marque os documentos para indicar seu status
          </p>
        </div>
      </div>
    </div>
  );
}
