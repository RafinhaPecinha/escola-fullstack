"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  IconFileEdit,
  IconSparkles,
  IconUsers,
  IconShieldCheck,
  IconList,
  IconChevronRight
} from "../components/icons";

export default function NotAluno() {
  const router = useRouter();
  const [alunos, setAlunos] = useState([]);
  const [id_aluno, setIdAluno] = useState("");
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [n3, setN3] = useState("");

  const [carregandoAlunos, setCarregandoAlunos] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // Carregar lista de alunos para o select
  useEffect(() => {
    async function carregarListaAlunos() {
      try {
        setCarregandoAlunos(true);
        const res = await fetch("/api/alunos");
        if (res.ok) {
          const dados = await res.json();
          setAlunos(dados);
          if (dados.length > 0) {
            setIdAluno(dados[0].id_aluno);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar alunos:", err);
      } finally {
        setCarregandoAlunos(false);
      }
    }

    carregarListaAlunos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id_aluno) {
      alert("Por favor, selecione um aluno!");
      return;
    }

    try {
      setSalvando(true);
      const res = await fetch("/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_aluno: Number(id_aluno),
          t1: parseFloat(t1) || 0,
          t2: parseFloat(t2) || 0,
          n1: parseFloat(n1) || 0,
          n2: parseFloat(n2) || 0,
          n3: parseFloat(n3) || 0
        })
      });

      const dados = await res.json();

      if (res.ok) {
        setSucesso(true);
        setTimeout(() => {
          router.push("/listanota");
        }, 1200);
      } else {
        alert(dados.erro || dados.message || "Erro ao cadastrar notas");
      }
    } catch (error) {
      console.error("Erro ao cadastrar notas:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setSalvando(false);
    }
  };

  const alunoSelecionado = alunos.find((a) => String(a.id_aluno) === String(id_aluno));

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* BANNER / HERO SESI */}
        <section className="hero-sesi-white" style={{ padding: "40px 24px 30px" }}>
          <div className="hero-container">
            <div className="hero-badge">
              <IconSparkles width={16} height={16} />
              <span>Módulo de Avaliações & Rendimento</span>
            </div>

            <h1 className="hero-title" style={{ fontSize: "2.4rem", marginBottom: "10px" }}>
              Lançar <span className="text-sesi-red">Notas de Aluno</span>
            </h1>

            <p className="hero-subtitle" style={{ fontSize: "1rem", marginBottom: "0", maxWidth: "680px" }}>
              Selecione o estudante e informe as notas dos trabalhos (T1, T2) e das avaliações bimestrais (N1, N2, N3).
            </p>
          </div>
        </section>

        {/* FORM CONTAINER */}
        <div className="form-page-container">
          {sucesso ? (
            <div className="form-card" style={{ animation: "fadeIn 0.3s ease-in-out" }}>
              <div className="form-card-header">
                <div className="form-header-title">
                  <div
                    className="form-header-icon"
                    style={{
                      background: "rgba(22, 101, 52, 0.2)",
                      borderColor: "rgba(34, 197, 94, 0.4)",
                      color: "#4ade80",
                    }}
                  >
                    <IconShieldCheck width={24} height={24} />
                  </div>
                  <div className="form-header-text">
                    <h3>Notas Lançadas com Sucesso!</h3>
                    <p>Redirecionando para a lista de notas...</p>
                  </div>
                </div>
              </div>

              <div className="form-card-body">
                <div className="success-banner">
                  <div className="success-banner-icon">
                    <IconShieldCheck width={22} height={22} />
                  </div>
                  <div>
                    <strong>Boletim Atualizado!</strong>
                    <p style={{ margin: "2px 0 0", fontSize: "0.85rem" }}>
                      As notas do aluno foram registradas com sucesso no sistema.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "20px" }}>
                  <Link href="/listanota" className="btn-sesi-red">
                    <IconList width={18} height={18} />
                    <span>Ver Lista de Notas</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-header-title">
                  <div className="form-header-icon">
                    <IconFileEdit width={24} height={24} />
                  </div>
                  <div className="form-header-text">
                    <h3>Ficha de Lançamento de Notas</h3>
                    <p>Preencha as pontuações do estudante (valores de 0 a 10)</p>
                  </div>
                </div>
              </div>

              <div className="form-card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    {/* SELEÇÃO DO ALUNO */}
                    <div className="form-group full-width">
                      <label htmlFor="id_aluno" className="form-label">
                        Selecionar Estudante <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <IconUsers width={18} height={18} className="input-icon" />
                        <select
                          id="id_aluno"
                          className="form-input"
                          value={id_aluno}
                          onChange={(e) => setIdAluno(e.target.value)}
                          required
                          disabled={carregandoAlunos}
                        >
                          {carregandoAlunos ? (
                            <option value="">Carregando lista de alunos...</option>
                          ) : alunos.length === 0 ? (
                            <option value="">Nenhum aluno cadastrado no sistema</option>
                          ) : (
                            alunos.map((a) => (
                              <option key={a.id_aluno} value={a.id_aluno}>
                                {a.nome} — RA: {a.ra} ({a.serie})
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                      <span className="form-help-text">
                        {alunoSelecionado
                          ? `Aluno selecionado: ${alunoSelecionado.nome} (RA-${alunoSelecionado.ra})`
                          : "Escolha o aluno para vincular o boletim."}
                      </span>
                    </div>

                    {/* T1 */}
                    <div className="form-group">
                      <label htmlFor="t1" className="form-label">
                        Trabalho 1 (T1) <span className="required">*</span>
                      </label>
                      <input
                        id="t1"
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        className="form-input form-input-no-icon"
                        value={t1}
                        onChange={(e) => setT1(e.target.value)}
                        placeholder="Ex: 8.5"
                        required
                      />
                      <span className="form-help-text">Primeiro trabalho prático.</span>
                    </div>

                    {/* T2 */}
                    <div className="form-group">
                      <label htmlFor="t2" className="form-label">
                        Trabalho 2 (T2) <span className="required">*</span>
                      </label>
                      <input
                        id="t2"
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        className="form-input form-input-no-icon"
                        value={t2}
                        onChange={(e) => setT2(e.target.value)}
                        placeholder="Ex: 9.0"
                        required
                      />
                      <span className="form-help-text">Segundo trabalho prático.</span>
                    </div>

                    {/* N1 */}
                    <div className="form-group">
                      <label htmlFor="n1" className="form-label">
                        Avaliação 1 (N1) <span className="required">*</span>
                      </label>
                      <input
                        id="n1"
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        className="form-input form-input-no-icon"
                        value={n1}
                        onChange={(e) => setN1(e.target.value)}
                        placeholder="Ex: 7.5"
                        required
                      />
                      <span className="form-help-text">Primeira prova teórica.</span>
                    </div>

                    {/* N2 */}
                    <div className="form-group">
                      <label htmlFor="n2" className="form-label">
                        Avaliação 2 (N2) <span className="required">*</span>
                      </label>
                      <input
                        id="n2"
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        className="form-input form-input-no-icon"
                        value={n2}
                        onChange={(e) => setN2(e.target.value)}
                        placeholder="Ex: 8.0"
                        required
                      />
                      <span className="form-help-text">Segunda prova teórica.</span>
                    </div>

                    {/* N3 */}
                    <div className="form-group full-width">
                      <label htmlFor="n3" className="form-label">
                        Avaliação 3 (N3) <span className="required">*</span>
                      </label>
                      <input
                        id="n3"
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        className="form-input form-input-no-icon"
                        value={n3}
                        onChange={(e) => setN3(e.target.value)}
                        placeholder="Ex: 9.5"
                        required
                      />
                      <span className="form-help-text">Avaliação integradora / final.</span>
                    </div>
                  </div>

                  <div className="form-actions-bar">
                    <Link href="/listanota" className="btn-sesi-outline" style={{ padding: "12px 20px" }}>
                      <span>Ver Lista de Notas</span>
                    </Link>

                    <button
                      type="submit"
                      disabled={salvando}
                      className="btn-sesi-red"
                      style={{ border: "none", cursor: salvando ? "wait" : "pointer", fontSize: "0.95rem" }}
                    >
                      <IconFileEdit width={18} height={18} />
                      <span>{salvando ? "Salvando..." : "Concluir Lançamento"}</span>
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
