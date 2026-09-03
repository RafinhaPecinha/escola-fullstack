"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import {
    IconList,
    IconUserPlus,
    IconSearch,
    IconSparkles,
    IconX
} from "../components/icons";

export default function ListAluno() {
    // Lista inicial de alunos cadastrados
    const [alunos, setAlunos] = useState([
        { id: 1, nome: "Rafael Lima", idade: 17, serie: "3º Ano Ensino Médio", ra: "676767" },
        { id: 2, nome: "Kelvin Destaque", idade: 18, serie: "3º Ano Ensino Médio", ra: "123123123" },

    ]);

    // Estado para busca/filtro
    const [busca, setBusca] = useState("");

    // Estado para modal de edição
    const [alunoEditando, setAlunoEditando] = useState(null);

    // Função para abrir o modal de edição
    const editarAluno = (aluno) => {
        setAlunoEditando({ ...aluno });
    };

    // Salvar alterações da edição
    const salvarEdicao = (e) => {
        e.preventDefault();
        setAlunos(alunos.map(a => a.id === alunoEditando.id ? alunoEditando : a));
        setAlunoEditando(null);
    };

    // Função para excluir aluno
    const excluirAluno = (id) => {
        const aluno = alunos.find(a => a.id === id);
        if (confirm(`Tem certeza que deseja excluir o(a) aluno(a) ${aluno?.nome}?`)) {
            setAlunos(alunos.filter(a => a.id !== id));
        }
    };

    // Alunos filtrados pela busca
    const alunosFiltrados = alunos.filter(a =>
        a.nome.toLowerCase().includes(busca.toLowerCase()) ||
        a.ra.includes(busca) ||
        a.serie.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="page-wrapper">
            <Header />

            <main className="main-content">
                {/* BANNER / HERO */}
                <section className="hero-sesi-white" style={{ padding: "40px 24px 30px" }}>
                    <div className="hero-container">
                        <div className="hero-badge">
                            <IconSparkles width={16} height={16} />
                            <span>Gestão de Estudantes SESI</span>
                        </div>

                        <h1 className="hero-title" style={{ fontSize: "2.4rem", marginBottom: "10px" }}>
                            Lista de <span className="text-sesi-red">Alunos Cadastrados</span>
                        </h1>

                        <p className="hero-subtitle" style={{ fontSize: "1rem", marginBottom: "0", maxWidth: "680px" }}>
                            Consulte, pesquise, edite ou remova registros de estudantes do Centro Educacional SESI Mirandópolis.
                        </p>
                    </div>
                </section>

                {/* CONTENT CONTAINER */}
                <div className="form-page-container" style={{ padding: "30px 24px 80px" }}>

                    {/* CONTROL BAR */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
                        {/* CAMPO DE BUSCA */}
                        <div className="search-pill" style={{ width: "320px", padding: "10px 16px" }}>
                            <IconSearch width={18} height={18} />
                            <input
                                type="text"
                                placeholder="Buscar por nome, RA ou série..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                style={{ width: "100%", fontSize: "0.9rem" }}
                            />
                        </div>

                        {/* BOTÃO NOVO ALUNO */}
                        <Link href="/cadaluno" className="btn-sesi-red">
                            <IconUserPlus width={18} height={18} />
                            <span>Cadastrar Novo Aluno</span>
                        </Link>
                    </div>

                    {/* TABELA DE ALUNOS */}
                    <div className="table-card">
                        <div className="table-responsive">
                            <table className="table-sesi">
                                <thead>
                                    <tr>
                                        <th style={{ width: "60px" }}>ID</th>
                                        <th>NOME DO ALUNO</th>
                                        <th style={{ width: "90px" }}>IDADE</th>
                                        <th>SÉRIE / TURMA</th>
                                        <th style={{ width: "130px" }}>RA</th>
                                        <th style={{ width: "170px", textCenter: "center" }}>AÇÕES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alunosFiltrados.length > 0 ? (
                                        alunosFiltrados.map((aluno) => (
                                            <tr key={aluno.id}>
                                                <td><strong>#{aluno.id}</strong></td>
                                                <td>
                                                    <strong style={{ color: "var(--sesi-navy)", fontSize: "0.95rem" }}>{aluno.nome}</strong>
                                                </td>
                                                <td>{aluno.idade} anos</td>
                                                <td>
                                                    <span className="badge-serie">{aluno.serie}</span>
                                                </td>
                                                <td>
                                                    <span className="badge-ra">RA-{aluno.ra}</span>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            onClick={() => editarAluno(aluno)}
                                                            className="btn-action-edit"
                                                            title="Editar Aluno"
                                                        >
                                                            ✏️ Editar
                                                        </button>
                                                        <button
                                                            onClick={() => excluirAluno(aluno.id)}
                                                            className="btn-action-delete"
                                                            title="Excluir Aluno"
                                                        >
                                                            🗑️ Excluir
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                                                Nenhum aluno encontrado para a busca "{busca}".
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ padding: "16px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", fontSize: "0.85rem", color: "#64748b" }}>
                            Total de alunos cadastrados: <strong>{alunos.length}</strong>
                        </div>
                    </div>
                </div>
            </main>

            {/* MODAL DE EDIÇÃO */}
            {alunoEditando && (
                <div className="modal-overlay" onClick={() => setAlunoEditando(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="form-card-header">
                            <div className="form-header-title">
                                <div className="form-header-icon">
                                    <IconList width={22} height={22} />
                                </div>
                                <div className="form-header-text">
                                    <h3>Editar Aluno</h3>
                                    <p>Atualize as informações do estudante</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setAlunoEditando(null)}
                                style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}
                            >
                                <IconX width={24} height={24} />
                            </button>
                        </div>

                        <div className="form-card-body">
                            <form onSubmit={salvarEdicao}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    <div className="form-group">
                                        <label className="form-label">Nome Completo</label>
                                        <input
                                            type="text"
                                            className="form-input form-input-no-icon"
                                            value={alunoEditando.nome}
                                            onChange={(e) => setAlunoEditando({ ...alunoEditando, nome: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                        <div className="form-group">
                                            <label className="form-label">Idade</label>
                                            <input
                                                type="number"
                                                className="form-input form-input-no-icon"
                                                value={alunoEditando.idade}
                                                onChange={(e) => setAlunoEditando({ ...alunoEditando, idade: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">RA</label>
                                            <input
                                                type="number"
                                                className="form-input form-input-no-icon"
                                                value={alunoEditando.ra}
                                                onChange={(e) => setAlunoEditando({ ...alunoEditando, ra: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Série / Turma</label>
                                        <input
                                            type="text"
                                            className="form-input form-input-no-icon"
                                            value={alunoEditando.serie}
                                            onChange={(e) => setAlunoEditando({ ...alunoEditando, serie: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-actions-bar">
                                    <button
                                        type="button"
                                        className="btn-sesi-outline"
                                        onClick={() => setAlunoEditando(null)}
                                        style={{ padding: "10px 18px" }}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn-sesi-red"
                                        style={{ border: "none", cursor: "pointer", padding: "10px 20px" }}
                                    >
                                        Salvar Alterações
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
