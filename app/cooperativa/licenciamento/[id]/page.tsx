'use client';

import { use, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, CheckSquare, Square, FileText } from 'lucide-react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [license, setLicense] = useState<LicenseDetails | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && currentDocumentId) {
      // Aqui você implementará a lógica de upload dos arquivos
      console.log('Upload do documento:', currentDocumentId);
      console.log('Arquivos selecionados:', files);
      alert(`${files.length} arquivo(s) selecionado(s) para upload no documento ${currentDocumentId}`);
      // TODO: Implementar lógica de upload HTTP aqui
      // Exemplo: uploadDocument(currentDocumentId, files)
    }
    // Limpa o input para permitir selecionar o mesmo arquivo novamente
    event.target.value = '';
  };

  const handleUpload = (documentId: string) => {
    setCurrentDocumentId(documentId);
    // Abre o seletor de arquivos
    fileInputRef.current?.click();
  };

  const handleDownload = (documentId: string) => {
    // Mock de download - Aqui você fará o HTTP request para buscar o arquivo
    console.log('Download do documento:', documentId);
    alert(`Baixando arquivo do documento ${documentId}`);
    // TODO: Implementar lógica de download HTTP aqui
    // Exemplo: downloadDocument(documentId)
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
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
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

                {/* Action Icon - Upload or File */}
                {doc.completed ? (
                  <button
                    onClick={() => handleDownload(doc.id)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Baixar arquivo"
                  >
                    <FileText className="w-8 h-8 text-blue-600" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpload(doc.id)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Enviar arquivo"
                  >
                    <Upload className="w-8 h-8 text-gray-400 hover:text-blue-600" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="*/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Clique no ícone <Upload className="inline w-4 h-4" /> para enviar ou <FileText className="inline w-4 h-4" /> para baixar documentos
          </p>
        </div>
      </div>
    </div>
  );
}
