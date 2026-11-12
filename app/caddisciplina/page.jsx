"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  IconClipboardList,
  IconSparkles,
  IconBookOpen,
  IconShieldCheck,
  IconList,
  IconChevronRight,
  IconStar
} from "../components/icons";

export default function CadDisciplina() {
  const [nome, setNome] = useState("");
  const [pontuacaoMinima, setPontuacaoMinima] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || pontuacaoMinima === "") {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }
    const pMin = Number(pontuacaoMinima);
    if (isNaN(pMin) || pMin < 0 || pMin > 10) {
      alert("A pontuação mínima deve ser um valor entre 0 e 10.");
      return;
    }

    try {
      setLoading(true);
      const resposta = await fetch("/api/disciplinas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim(), pontuacao_minima: pMin }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setSubmitted(true);
      } else {
        alert(dados.message || dados.erro || "Erro ao cadastrar disciplina");
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
    setPontuacaoMinima("");
    setSubmitted(false);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* HERO */}
        <section className="hero-sesi-white" style={{ padding: "40px 24px 30px" }}>
          <div className="hero-container">
            <div className="hero-badge">
              <IconSparkles width={16} height={16} />
              <span>Módulo Acadêmico &amp; Grade Curricular</span>
            </div>

            <h1 className="hero-title" style={{ fontSize: "2.4rem", marginBottom: "10px" }}>
              Cadastro de <span className="text-sesi-red">Nova Disciplina</span>
            </h1>

            <p className="hero-subtitle" style={{ fontSize: "1rem", marginBottom: "0", maxWidth: "680px" }}>
              Registre as disciplinas que compõem a grade curricular do Centro Educacional SESI Mirandópolis, definindo o nome e a pontuação mínima exigida para aprovação.
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
                    <h3>Disciplina Registrada com Sucesso!</h3>
                    <p>A disciplina foi adicionada à grade curricular.</p>
                  </div>
                </div>
                <span className="form-step-badge" style={{ background: "rgba(34, 197, 94, 0.2)", borderColor: "rgba(34, 197, 94, 0.4)", color: "#86efac" }}>
                  Status: Ativa
                </span>
              </div>

              <div className="form-card-body">
                <div className="success-banner">
                  <div className="success-banner-icon">
                    <IconShieldCheck width={22} height={22} />
                  </div>
                  <div>
                    <strong>Disciplina Confirmada!</strong>
                    <p style={{ margin: "2px 0 0", fontSize: "0.85rem" }}>
                      Os dados foram processados com sucesso no sistema SESI Mirandópolis.
                    </p>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "20px", marginBottom: "28px" }}>
                  <h4 style={{ color: "var(--sesi-navy)", marginBottom: "14px", fontSize: "1rem" }}>Resumo da Disciplina:</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", fontSize: "0.9rem" }}>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>NOME DA DISCIPLINA</span>
                      <strong style={{ color: "var(--text-main)" }}>{nome}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#64748b", display: "block", fontSize: "0.78rem" }}>PONTUAÇÃO MÍNIMA</span>
                      <strong style={{ color: "var(--sesi-red)" }}>{pontuacaoMinima} pts</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <button onClick={handleReset} className="btn-sesi-red" style={{ border: "none", cursor: "pointer" }}>
                    <IconClipboardList width={18} height={18} />
                    <span>Cadastrar Nova Disciplina</span>
                  </button>

                  <Link href="/cadprofessor" className="btn-sesi-navy">
                    <IconChevronRight width={18} height={18} />
                    <span>Cadastrar Professor</span>
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
                    <IconClipboardList width={24} height={24} />
                  </div>
                  <div className="form-header-text">
                    <h3>Ficha de Cadastro da Disciplina</h3>
                    <p>Insira os dados da disciplina e a pontuação mínima para aprovação</p>
                  </div>
                </div>
                <span className="form-step-badge">Fase 1 • Dados da Disciplina</span>
              </div>

              {/* CARD BODY */}
              <div className="form-card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    {/* NOME DA DISCIPLINA */}
                    <div className="form-group full-width">
                      <label htmlFor="nome" className="form-label">
                        Nome da Disciplina <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <IconBookOpen width={18} height={18} className="input-icon" />
                        <input
                          id="nome"
                          type="text"
                          className="form-input"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Ex: Matemática, Português, Física..."
                          required
                        />
                      </div>
                      <span className="form-help-text">Nome oficial da disciplina conforme a grade curricular.</span>
                    </div>

                    {/* PONTUAÇÃO MÍNIMA */}
                    <div className="form-group full-width">
                      <label htmlFor="pontuacao" className="form-label">
                        Pontuação Mínima para Aprovação <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <IconStar width={18} height={18} className="input-icon" />
                        <input
                          id="pontuacao"
                          type="number"
                          className="form-input"
                          value={pontuacaoMinima}
                          onChange={(e) => setPontuacaoMinima(e.target.value)}
                          placeholder="Ex: 5.0"
                          min="0"
                          max="10"
                          step="0.1"
                          required
                        />
                      </div>
                      <span className="form-help-text">Nota mínima (de 0 a 10) exigida para o aluno ser aprovado nesta disciplina.</span>
                    </div>
                  </div>

                  {/* FORM ACTIONS */}
                  <div className="form-actions-bar">
                    <Link href="/" className="btn-sesi-outline" style={{ padding: "12px 20px" }}>
                      <span>Cancelar</span>
                    </Link>

                    <button type="submit" disabled={loading} className="btn-sesi-red" style={{ border: "none", cursor: loading ? "wait" : "pointer", fontSize: "0.95rem" }}>
                      <IconClipboardList width={18} height={18} />
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
