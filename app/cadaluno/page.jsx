"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  IconUserPlus,
  IconSparkles,
  IconUsers,
  IconBookOpen,
  IconShieldCheck,
  IconGraduation,
  IconList,
  IconChevronRight
} from "../components/icons";

export default function CadAluno() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [serie, setSerie] = useState("");
  const [ra, setRa] = useState("");
  const [turno, setTurno] = useState("Manhã");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !idade || !serie || !ra) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setNome("");
    setIdade("");
    setSerie("");
    setRa("");
    setTurno("Manhã");
    setSubmitted(false);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* TOP BANNER / HERO */}
        <section className="hero-sesi-white" style={{ padding: "40px 24px 30px" }}>
          <div className="hero-container">
            <div className="hero-badge">
              <IconSparkles width={16} height={16} />
              <span>Módulo de Admissão & Matrículas</span>
            </div>

            <h1 className="hero-title" style={{ fontSize: "2.4rem", marginBottom: "10px" }}>
              Cadastro de <span className="text-sesi-red">Novo Aluno</span>
            </h1>

            <p className="hero-subtitle" style={{ fontSize: "1rem", marginBottom: "0", maxWidth: "680px" }}>
              Preencha os dados do estudante abaixo para registrar a matrícula no sistema acadêmico do Centro Educacional SESI Mirandópolis.
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
                    <h3>Cadastro Realizado com Sucesso!</h3>
                    <p>O aluno foi registrado na base de dados escolar.</p>
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
                    <strong>Matrícula Confirmada!</strong>
                    <p style={{ margin: "2px 0 0", fontSize: "0.85rem" }}>
                      Os dados acadêmicos foram processados com sucesso no sistema SESI Mirandópolis.
                    </p>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "20px", marginBottom: "28px" }}>
                  <h4 style={{ color: "var(--sesi-navy)", marginBottom: "14px", fontSize: "1rem" }}>Resumo da Matrícula:</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", fontSize: "0.9rem" }}>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>NOME DO ALUNO</span>
                      <strong style={{ color: "var(--text-main)" }}>{nome}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>RA (REGISTRO ALUNO)</span>
                      <strong style={{ color: "var(--sesi-red)" }}>{ra}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>SÉRIE / TURMA</span>
                      <strong style={{ color: "var(--text-main)" }}>{serie}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>IDADE</span>
                      <strong style={{ color: "var(--text-main)" }}>{idade} anos</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>TURNO</span>
                      <strong style={{ color: "var(--sesi-navy)" }}>{turno}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <button onClick={handleReset} className="btn-sesi-red" style={{ border: "none", cursor: "pointer" }}>
                    <IconUserPlus width={18} height={18} />
                    <span>Cadastrar Novo Aluno</span>
                  </button>

                  <Link href="/listaluno" className="btn-sesi-navy">
                    <IconList width={18} height={18} />
                    <span>Ver Lista de Alunos</span>
                  </Link>

                  <Link href="/" className="btn-sesi-outline">
                    <span>Voltar ao Início</span>
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
                    <IconUserPlus width={24} height={24} />
                  </div>
                  <div className="form-header-text">
                    <h3>Ficha de Cadastro do Estudante</h3>
                    <p>Insira os dados pessoais e escolares completos</p>
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
                        Nome Completo do Aluno <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <IconUsers width={18} height={18} className="input-icon" />
                        <input
                          id="nome"
                          type="text"
                          className="form-input"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Ex: Gabriel Silva Santos"
                          required
                        />
                      </div>
                      <span className="form-help-text">Insira o nome conforme certidão de nascimento ou documento oficial.</span>
                    </div>

                    {/* RA */}
                    <div className="form-group">
                      <label htmlFor="ra" className="form-label">
                        RA (Registro do Aluno) <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <IconGraduation width={18} height={18} className="input-icon" />
                        <input
                          id="ra"
                          type="number"
                          className="form-input"
                          value={ra}
                          onChange={(e) => setRa(e.target.value)}
                          placeholder="Ex: 20268841"
                          required
                        />
                      </div>
                      <span className="form-help-text">Número de identificação escolar único.</span>
                    </div>

                    {/* IDADE */}
                    <div className="form-group">
                      <label htmlFor="idade" className="form-label">
                        Idade <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <span className="input-icon" style={{ fontWeight: "700", fontSize: "0.85rem" }}>#</span>
                        <input
                          id="idade"
                          type="number"
                          className="form-input"
                          value={idade}
                          onChange={(e) => setIdade(e.target.value)}
                          placeholder="Ex: 15"
                          min="3"
                          max="25"
                          required
                        />
                      </div>
                      <span className="form-help-text">Idade atual do estudante.</span>
                    </div>

                    {/* SÉRIE / TURMA */}
                    <div className="form-group">
                      <label htmlFor="serie" className="form-label">
                        Série / Ano Letivo <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <IconBookOpen width={18} height={18} className="input-icon" />
                        <input
                          id="serie"
                          type="text"
                          className="form-input"
                          value={serie}
                          onChange={(e) => setSerie(e.target.value)}
                          placeholder="Ex: 1º Ano Ensino Médio A"
                          required
                        />
                      </div>
                      <span className="form-help-text">Informe a série e a turma correspondente.</span>
                    </div>

                    {/* TURNO SELECTION */}
                    <div className="form-group">
                      <label className="form-label">Turno Escolar</label>
                      <div className="radio-pills">
                        <label>
                          <input
                            type="radio"
                            name="turno"
                            value="Manhã"
                            checked={turno === "Manhã"}
                            onChange={(e) => setTurno(e.target.value)}
                            className="radio-pill-input"
                          />
                          <div className="radio-pill-label">☀️ Manhã</div>
                        </label>

                        <label>
                          <input
                            type="radio"
                            name="turno"
                            value="Tarde"
                            checked={turno === "Tarde"}
                            onChange={(e) => setTurno(e.target.value)}
                            className="radio-pill-input"
                          />
                          <div className="radio-pill-label">🌤️ Tarde</div>
                        </label>

                        <label>
                          <input
                            type="radio"
                            name="turno"
                            value="Integral"
                            checked={turno === "Integral"}
                            onChange={(e) => setTurno(e.target.value)}
                            className="radio-pill-input"
                          />
                          <div className="radio-pill-label">⚡ Integral</div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* FORM ACTIONS */}
                  <div className="form-actions-bar">
                    <Link href="/" className="btn-sesi-outline" style={{ padding: "12px 20px" }}>
                      <span>Cancelar</span>
                    </Link>

                    <button type="submit" className="btn-sesi-red" style={{ border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
                      <IconUserPlus width={18} height={18} />
                      <span>Concluir Cadastro</span>
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
