"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  IconChalkboard,
  IconSparkles,
  IconUsers,
  IconBookOpen,
  IconShieldCheck,
  IconList,
  IconChevronRight,
  IconClipboardList,
  IconCalendar
} from "../components/icons";

const DIAS_SEMANA = [
  { id: "segunda", label: "Segunda" },
  { id: "terca", label: "Terça" },
  { id: "quarta", label: "Quarta" },
  { id: "quinta", label: "Quinta" },
  { id: "sexta", label: "Sexta" },
];

export default function CadProfessor() {
  const [nome, setNome] = useState("");
  const [nif, setNif] = useState("");
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [aulasPorDia, setAulasPorDia] = useState("");
  const [idDisciplina, setIdDisciplina] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [loadingDisc, setLoadingDisc] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nomeDisciplinaSelecionada, setNomeDisciplinaSelecionada] = useState("");

  // Total de aulas calculado automaticamente
  const totalAulas = diasSelecionados.length * (Number(aulasPorDia) || 0);

  // Buscar disciplinas ao carregar a página
  useEffect(() => {
    async function buscarDisciplinas() {
      try {
        const res = await fetch("/api/disciplinas");
        const dados = await res.json();
        setDisciplinas(Array.isArray(dados) ? dados : []);
      } catch {
        setDisciplinas([]);
      } finally {
        setLoadingDisc(false);
      }
    }
    buscarDisciplinas();
  }, []);

  const handleDiaChange = (diaId) => {
    setDiasSelecionados((prev) =>
      prev.includes(diaId) ? prev.filter((d) => d !== diaId) : [...prev, diaId]
    );
  };

  const handleDisciplinaChange = (e) => {
    setIdDisciplina(e.target.value);
    const disc = disciplinas.find((d) => String(d.id_disciplina) === e.target.value);
    setNomeDisciplinaSelecionada(disc ? disc.nome : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !nif || diasSelecionados.length === 0 || !aulasPorDia || !idDisciplina) {
      alert("Por favor, preencha todos os campos obrigatórios e selecione ao menos um dia!");
      return;
    }
    if (Number(aulasPorDia) < 1) {
      alert("O número de aulas por dia deve ser ao menos 1.");
      return;
    }

    const diasFormatados = diasSelecionados
      .map((id) => DIAS_SEMANA.find((d) => d.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    try {
      setLoading(true);
      const resposta = await fetch("/api/professores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          nif: nif.trim(),
          dias_aula: diasFormatados,
          id_disciplina: Number(idDisciplina),
          total_aulas_semana: totalAulas,
        }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setSubmitted(true);
      } else {
        alert(dados.message || dados.erro || "Erro ao cadastrar professor");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNome("");
    setNif("");
    setDiasSelecionados([]);
    setAulasPorDia("");
    setIdDisciplina("");
    setNomeDisciplinaSelecionada("");
    setSubmitted(false);
  };

  const diasFormatadosResumo = diasSelecionados
    .map((id) => DIAS_SEMANA.find((d) => d.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* HERO */}
        <section className="hero-sesi-white" style={{ padding: "40px 24px 30px" }}>
          <div className="hero-container">
            <div className="hero-badge">
              <IconSparkles width={16} height={16} />
              <span>Módulo de Corpo Docente &amp; Gestão</span>
            </div>

            <h1 className="hero-title" style={{ fontSize: "2.4rem", marginBottom: "10px" }}>
              Cadastro de <span className="text-sesi-red">Novo Professor</span>
            </h1>

            <p className="hero-subtitle" style={{ fontSize: "1rem", marginBottom: "0", maxWidth: "680px" }}>
              Registre os professores do quadro docente do Centro Educacional SESI Mirandópolis, associando cada professor à sua disciplina e horários de aula.
            </p>
          </div>
        </section>

        {/* FORM CONTAINER */}
        <div className="form-page-container">

          {submitted ? (
            <div className="form-card" style={{ animation: "fadeIn 0.3s ease-in-out" }}>
              <div className="form-card-header">
                <div className="form-header-title">
                  <div className="form-header-icon" style={{ background: "rgba(22, 101, 52, 0.2)", borderColor: "rgba(34, 197, 94, 0.4)", color: "#4ade80" }}>
                    <IconShieldCheck width={24} height={24} />
                  </div>
                  <div className="form-header-text">
                    <h3>Professor Registrado com Sucesso!</h3>
                    <p>O professor foi adicionado ao quadro docente da escola.</p>
                  </div>
                </div>
                <span className="form-step-badge" style={{ background: "rgba(34, 197, 94, 0.2)", borderColor: "rgba(34, 197, 94, 0.4)", color: "#86efac" }}>
                  Status: Ativo
                </span>
              </div>

              <div className="form-card-body">
                <div className="success-banner">
                  <div className="success-banner-icon">
                    <IconShieldCheck width={22} height={22} />
                  </div>
                  <div>
                    <strong>Cadastro Confirmado!</strong>
                    <p style={{ margin: "2px 0 0", fontSize: "0.85rem" }}>
                      Os dados do professor foram processados com sucesso no sistema SESI Mirandópolis.
                    </p>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "20px", marginBottom: "28px" }}>
                  <h4 style={{ color: "var(--sesi-navy)", marginBottom: "14px", fontSize: "1rem" }}>Resumo do Cadastro:</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", fontSize: "0.9rem" }}>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>NOME DO PROFESSOR</span>
                      <strong style={{ color: "var(--text-main)" }}>{nome}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>NIF (MATRÍCULA)</span>
                      <strong style={{ color: "var(--sesi-red)" }}>{nif}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>DISCIPLINA</span>
                      <strong style={{ color: "var(--text-main)" }}>{nomeDisciplinaSelecionada}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>DIAS DE AULA</span>
                      <strong style={{ color: "var(--text-main)" }}>{diasFormatadosResumo}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>TOTAL DE AULAS/SEMANA</span>
                      <strong style={{ color: "var(--sesi-red)" }}>{totalAulas} aulas</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <button onClick={handleReset} className="btn-sesi-red" style={{ border: "none", cursor: "pointer" }}>
                    <IconChalkboard width={18} height={18} />
                    <span>Cadastrar Novo Professor</span>
                  </button>

                  <Link href="/" className="btn-sesi-navy">
                    <IconList width={18} height={18} />
                    <span>Voltar ao Início</span>
                  </Link>

                  <Link href="/caddisciplina" className="btn-sesi-outline">
                    <span>Cadastrar Disciplina</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="form-card">
              {/* CARD HEADER */}
              <div className="form-card-header">
                <div className="form-header-title">
                  <div className="form-header-icon">
                    <IconChalkboard width={24} height={24} />
                  </div>
                  <div className="form-header-text">
                    <h3>Ficha de Cadastro do Professor</h3>
                    <p>Insira os dados pessoais, horários e disciplina responsável</p>
                  </div>
                </div>
                <span className="form-step-badge">Fase 1 • Dados Principais</span>
              </div>

              {/* CARD BODY */}
              <div className="form-card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">

                    {/* NOME COMPLETO */}
                    <div className="form-group full-width">
                      <label htmlFor="nome" className="form-label">
                        Nome Completo do Professor <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <IconUsers width={18} height={18} className="input-icon" />
                        <input
                          id="nome"
                          type="text"
                          className="form-input"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Ex: Carlos Eduardo Mendes"
                          required
                        />
                      </div>
                      <span className="form-help-text">Insira o nome conforme documento oficial.</span>
                    </div>

                    {/* NIF */}
                    <div className="form-group">
                      <label htmlFor="nif" className="form-label">
                        NIF (Matrícula) <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <span className="input-icon" style={{ fontWeight: "700", fontSize: "0.85rem" }}>#</span>
                        <input
                          id="nif"
                          type="text"
                          className="form-input"
                          value={nif}
                          onChange={(e) => setNif(e.target.value)}
                          placeholder="Ex: NIF-20268841"
                          required
                        />
                      </div>
                      <span className="form-help-text">Número de identificação funcional único do professor.</span>
                    </div>

                    {/* DISCIPLINA */}
                    <div className="form-group">
                      <label htmlFor="disciplina" className="form-label">
                        Disciplina Responsável <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <IconBookOpen width={18} height={18} className="input-icon" />
                        <select
                          id="disciplina"
                          className="form-input"
                          value={idDisciplina}
                          onChange={handleDisciplinaChange}
                          required
                          style={{ cursor: "pointer" }}
                        >
                          <option value="">
                            {loadingDisc ? "Carregando disciplinas..." : disciplinas.length === 0 ? "Nenhuma disciplina cadastrada" : "Selecione a disciplina..."}
                          </option>
                          {disciplinas.map((d) => (
                            <option key={d.id_disciplina} value={d.id_disciplina}>
                              {d.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                      <span className="form-help-text">
                        {disciplinas.length === 0 && !loadingDisc
                          ? <span style={{ color: "#dc2626" }}>⚠ Cadastre uma disciplina primeiro antes de registrar o professor.</span>
                          : "Disciplina pela qual o professor é responsável."
                        }
                      </span>
                    </div>

                    {/* DIAS DE AULA */}
                    <div className="form-group full-width">
                      <label className="form-label">
                        Dias que Ministra Aula <span className="required">*</span>
                      </label>
                      <div style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        padding: "16px",
                        background: "#f8fafc",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0"
                      }}>
                        {DIAS_SEMANA.map((dia) => {
                          const marcado = diasSelecionados.includes(dia.id);
                          return (
                            <label
                              key={dia.id}
                              htmlFor={`dia-${dia.id}`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                border: `2px solid ${marcado ? "var(--sesi-red)" : "#e2e8f0"}`,
                                background: marcado ? "rgba(220, 38, 38, 0.08)" : "#fff",
                                color: marcado ? "var(--sesi-red)" : "var(--text-main)",
                                fontWeight: marcado ? "700" : "500",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                fontSize: "0.9rem",
                                userSelect: "none",
                              }}
                            >
                              <input
                                id={`dia-${dia.id}`}
                                type="checkbox"
                                checked={marcado}
                                onChange={() => handleDiaChange(dia.id)}
                                style={{ accentColor: "var(--sesi-red)", width: "16px", height: "16px" }}
                              />
                              {dia.label}
                            </label>
                          );
                        })}
                      </div>
                      <span className="form-help-text">Selecione todos os dias em que o professor leciona.</span>
                    </div>

                    {/* AULAS POR DIA + TOTAL CALCULADO */}
                    <div className="form-group">
                      <label htmlFor="aulasPorDia" className="form-label">
                        Aulas por Dia <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <IconCalendar width={18} height={18} className="input-icon" />
                        <input
                          id="aulasPorDia"
                          type="number"
                          className="form-input"
                          value={aulasPorDia}
                          onChange={(e) => setAulasPorDia(e.target.value)}
                          placeholder="Ex: 2"
                          min="1"
                          max="20"
                          required
                        />
                      </div>
                      <span className="form-help-text">Quantas aulas o professor ministra por dia letivo.</span>
                    </div>

                    {/* TOTAL DE AULAS (somente leitura) */}
                    <div className="form-group">
                      <label className="form-label">
                        Total de Aulas na Semana
                      </label>
                      <div className="input-wrapper">
                        <IconClipboardList width={18} height={18} className="input-icon" />
                        <input
                          type="text"
                          className="form-input"
                          value={totalAulas > 0 ? `${totalAulas} aulas` : "Preencha os campos acima"}
                          readOnly
                          style={{
                            background: "rgba(220, 38, 38, 0.06)",
                            color: totalAulas > 0 ? "var(--sesi-red)" : "#94a3b8",
                            fontWeight: totalAulas > 0 ? "700" : "400",
                            cursor: "not-allowed",
                            border: "1px dashed #e2e8f0"
                          }}
                        />
                      </div>
                      <span className="form-help-text">
                        Calculado automaticamente: {diasSelecionados.length} dia(s) × {Number(aulasPorDia) || 0} aula(s) = <strong>{totalAulas} aulas</strong>
                      </span>
                    </div>

                  </div>

                  {/* FORM ACTIONS */}
                  <div className="form-actions-bar">
                    <Link href="/" className="btn-sesi-outline" style={{ padding: "12px 20px" }}>
                      <span>Cancelar</span>
                    </Link>

                    <button
                      type="submit"
                      disabled={loading || disciplinas.length === 0}
                      className="btn-sesi-red"
                      style={{ border: "none", cursor: (loading || disciplinas.length === 0) ? "not-allowed" : "pointer", fontSize: "0.95rem" }}
                    >
                      <IconChalkboard width={18} height={18} />
                      <span>{loading ? "Cadastrando..." : "Concluir Cadastro"}</span>
                      <IconChevronRight width={16} height={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
