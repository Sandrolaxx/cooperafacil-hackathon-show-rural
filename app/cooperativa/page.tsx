'use client';

import { AlertTriangle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CooperadoLicense {
    id: string;
    name: string;
    document: string;
    status: 'pending' | 'expired';
}

type TabType = 'cooperados' | 'em-processo';

export default function Licenciamento() {
    const [activeTab, setActiveTab] = useState<TabType>('cooperados');

    // Dados estáticos - Cooperados
    const statsCooperados = {
        total: 800,
        regular: 650,
        pending: 100,
        expired: 50,
    };

    const licencas: CooperadoLicense[] = [
        { id: '1', name: 'Processo de licenciamento', document: '2024/001-LP', status: 'pending' },
        { id: '2', name: 'Processo de licenciamento', document: '2024/002-LP', status: 'pending' },
        { id: '3', name: 'Processo de licenciamento', document: '2024/003-LP', status: 'pending' },
        { id: '4', name: 'Processo de licenciamento', document: '2024/004-LP', status: 'pending' },
        { id: '5', name: 'Processo de licenciamento', document: '2024/005-LP', status: 'pending' },
    ];

    // Dados estáticos - Em processo
    const statsEmProcesso = {
        total: 45,
        regular: 30,
        pending: 10,
        expired: 5,
    };

    const processos: CooperadoLicense[] = [
        { id: '1', name: 'Processo de licenciamento', document: '2024/001-LP', status: 'pending' },
        { id: '2', name: 'Processo de licenciamento', document: '2024/002-LP', status: 'pending' },
        { id: '3', name: 'Processo de licenciamento', document: '2024/003-LP', status: 'pending' },
        { id: '4', name: 'Processo de licenciamento', document: '2024/004-LP', status: 'pending' },
        { id: '5', name: 'Processo de licenciamento', document: '2024/005-LP', status: 'pending' },
    ];

    const estimates = {
        avgValue: 47630.90,
        valuePercentage: 22,
        avgWeight: 642700,
        weightPercentage: 19,
        totalGeneral: 220240.50,
    };

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const currentStats = activeTab === 'cooperados' ? statsCooperados : statsEmProcesso;
    const currentItems = activeTab === 'cooperados' ? licencas : processos;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatWeight = (value: number) => {
        return new Intl.NumberFormat('pt-BR').format(value);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-gray-50 to-blue-100">
            {/* Header */}
            <header className="bg-white shadow-lg p-4 mb-6 border-b-4 border-blue-200">
                <div className="flex items-center justify-center">
                    <Image
                        src="/logo_completa.svg"
                        alt="CooperaFácil"
                        width={240}
                        height={60}
                        priority
                    />
                </div>
            </header>

            <div className="container mx-auto px-4 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Coluna Esquerda - Tabs */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Tabs */}
                        <div className="bg-white rounded-2xl p-2 shadow-lg flex gap-2">
                            <button
                                onClick={() => {
                                    setActiveTab('cooperados');
                                    setCurrentPage(1);
                                }}
                                className={`flex-1 w-4/5 rounded-xl font-bold text-base transition-all duration-300 transform ${activeTab === 'cooperados'
                                    ? 'bg-linear-to-r from-blue-500 to-blue-300 text-white shadow-lg'
                                    : 'bg-transparent text-blue-400 hover:bg-blue-50 cursor-pointer'
                                    }`}
                            >
                                Cooperados
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('em-processo');
                                    setCurrentPage(1);
                                }}
                                className={`flex-1 py-3 px-4 rounded-xl font-bold text-base transition-all duration-300 transform ${activeTab === 'em-processo'
                                    ? 'bg-linear-to-r from-blue-500 to-blue-300 text-white shadow-lg'
                                    : 'bg-transparent text-blue-400 hover:bg-blue-50 cursor-pointer'
                                    }`}
                            >
                                Em processo
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="bg-white rounded-2xl p-6 shadow-xl gap-4 flex flex-col">
                            <h2 className="text-2xl font-bold text-blue-900 mb-3">
                                {activeTab === 'cooperados' ? 'Cooperados' : 'Em processo'}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-blue-50 rounded-xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                    <p className="text-xs text-blue-700 mb-1 font-semibold">Total</p>
                                    <p className="text-4xl font-bold text-blue-700">{currentStats.total}</p>
                                </div>
                                <div className="bg-green-50 rounded-xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                    <p className="text-xs text-green-800 mb-1 font-semibold">Aprovada</p>
                                    <p className="text-4xl font-bold text-green-800">{currentStats.regular}</p>
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 text-center border-2 border-yellow-400 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                    <p className="text-xs text-yellow-800 mb-1 font-semibold">À Vencer</p>
                                    <p className="text-4xl font-bold text-yellow-700">{currentStats.pending}</p>
                                </div>
                                <div className="bg-red-50 rounded-xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                    <p className="text-xs text-red-700 mb-1 font-semibold">Negados</p>
                                    <p className="text-4xl font-bold text-red-700">{currentStats.expired}</p>
                                </div>
                            </div>
                            {/* Licenças/Processos List */}
                            <div>
                                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                                    {activeTab === 'cooperados' ? 'Licenças' : 'Processos'}
                                </h3>
                                <div className="space-y-3">
                                    {currentItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-linear-to-r from-yellow-50 to-white rounded-xl p-4 flex items-center justify-between hover:from-yellow-200 hover:to-yellow-100 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg transform hover:scale-102 border-l-4 border-yellow-500"
                                        >
                                            <div className="flex justify-center items-center gap-4">
                                                <AlertTriangle className="w-7 h-7 text-yellow-700 animate-pulse" />
                                                <div>
                                                    <p className="font-bold text-sm text-gray-900">{item.name}</p>
                                                    <p className="text-xs text-gray-600">{item.document}</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-7 h-7 text-[#1f4585]" />
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="flex items-center justify-center gap-3 mt-6">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 bg-[#839fce] rounded-lg disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-white" />
                                    </button>
                                    <div className="px-6 py-2 bg-[#839fce] rounded-lg shadow-md">
                                        <span className="font-bold text-base text-white">
                                            {String(currentPage).padStart(2, '0')} - {String(totalPages).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 bg-[#839fce] rounded-lg disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        <ChevronRight className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Coluna Direita - Prejuízo Estimado */}
                    <div className="space-y-6">

                        {/* Prejuízo Estimado */}
                        <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">Prejuízo estimado</h2>

                            {/* Valor médio */}
                            <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-blue-600 mb-2 font-semibold">Valor médio de pendentes:</p>
                                <p className="text-4xl font-bold text-blue-900 mb-3">
                                    {formatCurrency(estimates.avgValue)}
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl font-bold text-yellow-500">
                                        {estimates.valuePercentage}%
                                    </span>
                                    <span className="text-gray-600 font-medium">do total</span>
                                </div>
                                <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden shadow-inner">
                                    <div
                                        className="bg-linear-to-r from-amber-500 via-yellow-400 to-yellow-300 h-full rounded-full shadow-lg transition-all duration-1000"
                                        style={{ width: `${estimates.valuePercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Peso médio */}
                            <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-blue-600 mb-2 font-semibold">Peso pendentes:</p>
                                <p className="text-4xl font-bold text-blue-900 mb-3">
                                    {formatWeight(estimates.avgWeight)} Kg
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl font-bold text-yellow-500">
                                        {estimates.weightPercentage}%
                                    </span>
                                    <span className="text-gray-600 font-medium">do total</span>
                                </div>
                                <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden shadow-inner">
                                    <div
                                        className="bg-linear-to-r from-amber-500 via-yellow-400 to-yellow-300 h-full rounded-full shadow-lg transition-all duration-1000"
                                        style={{ width: `${estimates.weightPercentage}%` }}
                                    />
                                </div>
                            </div>
                            {/* Total Geral */}
                            <div className="pt-6 border-t-2 p-4">
                                <div className="flex items-baseline justify-between">
                                    <span className="text-lg text-[#839fce] font-bold">Total Geral:</span>
                                    <span className="text-3xl font-bold  bg-clip-text text-[#1f4585]">
                                        {formatCurrency(estimates.totalGeneral)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}