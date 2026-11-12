"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  IconAward,
  IconFileEdit,
  IconSearch,
  IconSparkles,
  IconX,
  IconShieldCheck,
  IconGraduation
} from "../components/icons";

export default function ListaNota() {
  const [notas, setNotas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [notaEditando, setNotaEditando] = useState(null);
  const [salvando, setSalvando] = useState(false);

  // Carrega lista de notas da API
  const carregarNotas = async () => {
    try {
      setCarregando(true);
      const res = await fetch("/api/notas");
      if (res.ok) {
        const dados = await res.json();
        setNotas(dados);
      } else {
        console.error("Erro ao buscar notas");
      }
    } catch (error) {
      console.error("Erro ao conectar com servidor:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarNotas();
  }, []);

  // Excluir nota da API
  const excluirNota = async (id, nomeAluno) => {
    if (confirm(`Tem certeza que deseja excluir o registro de notas do(a) aluno(a) ${nomeAluno || ""}?`)) {
      try {
        const res = await fetch("/api/notas", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_nota: id })
        });

        if (res.ok) {
          carregarNotas();
        } else {
          const err = await res.json();
          alert(err.message || err.erro || "Erro ao excluir nota.");
        }
      } catch (error) {
        console.error("Erro ao excluir nota:", error);
        alert("Erro ao conectar com o servidor.");
      }
    }
  };

  // Salvar edição de nota via PUT
  const salvarEdicao = async (e) => {
    e.preventDefault();
    if (!notaEditando) return;

    try {
      setSalvando(true);
      const res = await fetch("/api/notas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_nota: notaEditando.id_nota,
          id_aluno: notaEditando.id_aluno,
          t1: parseFloat(notaEditando.t1) || 0,
          t2: parseFloat(notaEditando.t2) || 0,
          n1: parseFloat(notaEditando.n1) || 0,
          n2: parseFloat(notaEditando.n2) || 0,
          n3: parseFloat(notaEditando.n3) || 0
        })
      });

      if (res.ok) {
        setNotaEditando(null);
        carregarNotas();
      } else {
        const dados = await res.json();
        alert(dados.mensagem || dados.erro || dados.message || "Erro ao atualizar notas.");
      }
    } catch (error) {
      console.error("Erro na atualização:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setSalvando(false);
    }
  };

  // Cálculo da média ponderada / simples (T1, T2, N1, N2, N3)
  const calcularMedia = (n) => {
    const t1 = parseFloat(n.t1) || 0;
    const t2 = parseFloat(n.t2) || 0;
    const n1 = parseFloat(n.n1) || 0;
    const n2 = parseFloat(n.n2) || 0;
    const n3 = parseFloat(n.n3) || 0;
    const media = (t1 + t2 + n1 + n2 + n3) / 5;
    return media.toFixed(1);
  };

  // Filtro de busca (nome, RA, id ou série)
  const termoBusca = busca.trim().toLowerCase();
  const buscaAtiva = termoBusca.length >= 2;

  const notasFiltradas = notas.filter((n) => {
    if (!buscaAtiva) return true;
    const nome = (n.nome || "").toLowerCase();
    const ra = String(n.ra || "");
    const id = String(n.id_nota || "");
    const serie = (n.serie || "").toLowerCase();
    return (
      nome.includes(termoBusca) ||
      ra.includes(termoBusca) ||
      id.includes(termoBusca) ||
      serie.includes(termoBusca)
    );
  });

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* BANNER / HERO SESI */}
        <section className="hero-sesi-white" style={{ padding: "40px 24px 30px" }}>
          <div className="hero-container">
            <div className="hero-badge">
              <IconSparkles width={16} height={16} />
              <span>Módulo de Avaliações & Rendimento SESI</span>
            </div>

            <h1 className="hero-title" style={{ fontSize: "2.4rem", marginBottom: "10px" }}>
              Lista de <span className="text-sesi-red">Notas dos Alunos</span>
            </h1>

            <p className="hero-subtitle" style={{ fontSize: "1rem", marginBottom: "0", maxWidth: "680px" }}>
              Consulte os boletins acadêmicos, notas de trabalhos (T1, T2), avaliações (N1, N2, N3) e médias finais da unidade SESI Mirandópolis.
            </p>
          </div>
        </section>

        {/* CONTAINER PRINCIPAL */}
        <div className="form-page-container" style={{ padding: "30px 24px 80px" }}>
          {/* BARRA DE CONTROLE */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "20px"
            }}
          >
            {/* CAMPO DE BUSCA */}
            <div className="search-pill" style={{ width: "320px", padding: "10px 16px" }}>
              <IconSearch width={18} height={18} />
              <input
                type="text"
                placeholder="Pesquisar por aluno, RA ou série..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={{ width: "100%", fontSize: "0.9rem" }}
              />
            </div>

            {/* BOTÃO LANÇAR NOTAS */}
            <Link href="/notaluno" className="btn-sesi-red">
              <IconFileEdit width={18} height={18} />
              <span>Lançar Nova Nota</span>
            </Link>
          </div>

          {/* TABELA DE NOTAS */}
          <div className="table-card">
            <div className="table-responsive">
              <table className="table-sesi">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>ID</th>
                    <th>NOME DO ALUNO</th>
                    <th style={{ width: "120px" }}>RA</th>
                    <th style={{ width: "60px", textAlign: "center" }}>T1</th>
                    <th style={{ width: "60px", textAlign: "center" }}>T2</th>
                    <th style={{ width: "60px", textAlign: "center" }}>N1</th>
                    <th style={{ width: "60px", textAlign: "center" }}>N2</th>
                    <th style={{ width: "60px", textAlign: "center" }}>N3</th>
                    <th style={{ width: "90px", textAlign: "center" }}>MÉDIA</th>
                    <th style={{ width: "110px", textAlign: "center" }}>SITUAÇÃO</th>
                    <th style={{ width: "170px", textAlign: "center" }}>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {carregando ? (
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                        Carregando notas dos alunos...
                      </td>
                    </tr>
                  ) : notasFiltradas.length > 0 ? (
                    notasFiltradas.map((n) => {
                      const idNota = n.id_nota || n.id;
                      const media = parseFloat(calcularMedia(n));
                      const isAprovado = media >= 7.0;
                      const isRecuperacao = media >= 5.0 && media < 7.0;

                      return (
                        <tr key={idNota}>
                          <td><strong>#{idNota}</strong></td>
                          <td>
                            <strong style={{ color: "var(--sesi-navy)", fontSize: "0.95rem" }}>
                              {n.nome}
                            </strong>
                            {n.serie && (
                              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                                {n.serie}
                              </div>
                            )}
                          </td>
                          <td>
                            <span className="badge-ra">RA-{n.ra}</span>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <strong>{n.t1}</strong>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <strong>{n.t2}</strong>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <strong>{n.n1}</strong>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <strong>{n.n2}</strong>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <strong>{n.n3}</strong>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <span
                              style={{
                                display: "inline-block",
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontWeight: "700",
                                fontSize: "0.9rem",
                                background: isAprovado
                                  ? "rgba(34, 197, 94, 0.15)"
                                  : isRecuperacao
                                  ? "rgba(234, 179, 8, 0.15)"
                                  : "rgba(239, 68, 68, 0.15)",
                                color: isAprovado ? "#15803d" : isRecuperacao ? "#a16207" : "#b91c1c",
                                border: `1px solid ${
                                  isAprovado
                                    ? "rgba(34, 197, 94, 0.3)"
                                    : isRecuperacao
                                    ? "rgba(234, 179, 8, 0.3)"
                                    : "rgba(239, 68, 68, 0.3)"
                                }`
                              }}
                            >
                              {media.toFixed(1)}
                            </span>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <span
                              style={{
                                display: "inline-block",
                                padding: "3px 8px",
                                borderRadius: "6px",
                                fontSize: "0.75rem",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                background: isAprovado ? "#dcfce7" : isRecuperacao ? "#fef9c3" : "#fee2e2",
                                color: isAprovado ? "#166534" : isRecuperacao ? "#854d0e" : "#991b1b"
                              }}
                            >
                              {isAprovado ? "Aprovado" : isRecuperacao ? "Recuperação" : "Reprovado"}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons" style={{ justifyContent: "center" }}>
                              <button
                                onClick={() => setNotaEditando({ ...n })}
                                className="btn-action-edit"
                                title="Editar Notas"
                              >
                                ✏️ Editar
                              </button>
                              <button
                                onClick={() => excluirNota(idNota, n.nome)}
                                className="btn-action-delete"
                                title="Excluir Notas"
                              >
                                🗑️ Excluir
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                        {buscaAtiva
                          ? `Nenhum registro de notas encontrado para "${busca}".`
                          : "Nenhuma nota lançada no sistema ainda."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* RODAPÉ DA TABELA COM ESTATÍSTICAS */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                padding: "16px 24px",
                background: "#f8fafc",
                borderTop: "1px solid #e2e8f0",
                fontSize: "0.85rem",
                color: "#64748b"
              }}
            >
              <div>
                Total de boletins lançados: <strong>{notas.length}</strong>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <span>
                  🟢 Aprovados:{" "}
                  <strong>
                    {notas.filter((n) => parseFloat(calcularMedia(n)) >= 7.0).length}
                  </strong>
                </span>
                <span>
                  🟡 Recuperação:{" "}
                  <strong>
                    {
                      notas.filter((n) => {
                        const m = parseFloat(calcularMedia(n));
                        return m >= 5.0 && m < 7.0;
                      }).length
                    }
                  </strong>
                </span>
                <span>
                  🔴 Reprovados:{" "}
                  <strong>
                    {notas.filter((n) => parseFloat(calcularMedia(n)) < 5.0).length}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE EDIÇÃO DE NOTAS COM ESTILO SESI */}
      {notaEditando && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px"
          }}
          onClick={() => setNotaEditando(null)}
        >
          <div
            className="form-card"
            style={{
              maxWidth: "520px",
              width: "100%",
              margin: "0",
              animation: "fadeIn 0.2s ease-in-out"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="form-card-header">
              <div className="form-header-title">
                <div className="form-header-icon">
                  <IconAward width={24} height={24} />
                </div>
                <div className="form-header-text">
                  <h3>Editar Notas de {notaEditando.nome}</h3>
                  <p>RA: {notaEditando.ra} {notaEditando.serie ? `• ${notaEditando.serie}` : ""}</p>
                </div>
              </div>
              <button
                onClick={() => setNotaEditando(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  padding: "4px"
                }}
              >
                <IconX width={20} height={20} />
              </button>
            </div>

            <div className="form-card-body">
              <form onSubmit={salvarEdicao}>
                <div className="form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  <div className="form-group">
                    <label className="form-label">Trabalho 1 (T1) *</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      className="form-input form-input-no-icon"
                      value={notaEditando.t1}
                      onChange={(e) => setNotaEditando({ ...notaEditando, t1: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Trabalho 2 (T2) *</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      className="form-input form-input-no-icon"
                      value={notaEditando.t2}
                      onChange={(e) => setNotaEditando({ ...notaEditando, t2: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Avaliação 1 (N1) *</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      className="form-input form-input-no-icon"
                      value={notaEditando.n1}
                      onChange={(e) => setNotaEditando({ ...notaEditando, n1: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Avaliação 2 (N2) *</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      className="form-input form-input-no-icon"
                      value={notaEditando.n2}
                      onChange={(e) => setNotaEditando({ ...notaEditando, n2: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ gridColumn: "span 2" }}>
                    <label className="form-label">Avaliação 3 (N3) *</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      className="form-input form-input-no-icon"
                      value={notaEditando.n3}
                      onChange={(e) => setNotaEditando({ ...notaEditando, n3: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-actions-bar" style={{ marginTop: "24px" }}>
                  <button
                    type="button"
                    onClick={() => setNotaEditando(null)}
                    className="btn-sesi-outline"
                    style={{ padding: "10px 18px" }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={salvando}
                    className="btn-sesi-red"
                    style={{ border: "none", cursor: salvando ? "wait" : "pointer" }}
                  >
                    <IconShieldCheck width={18} height={18} />
                    <span>{salvando ? "Salvando..." : "Salvar Notas"}</span>
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
