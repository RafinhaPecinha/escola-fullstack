"use client";

import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ListaNota() {
  const [notas, setNotas] = useState([
    { id: 1, aluno: "Rafael Lima", t1: 8.5, t2: 9.0, n1: 7.5, n2: 8.0, n3: 9.5 },
    { id: 2, aluno: "Kelvin Destaque", t1: 9.0, t2: 9.5, n1: 8.5, n2: 9.0, n3: 10.0 }
  ]);

  const [notaEditando, setNotaEditando] = useState(null);

  const excluirNota = (id) => {
    if (confirm("Tem certeza que deseja excluir esta nota?")) {
      setNotas(notas.filter(n => n.id !== id));
    }
  };

  const salvarEdicao = (e) => {
    e.preventDefault();
    setNotas(notas.map(n => n.id === notaEditando.id ? notaEditando : n));
    setNotaEditando(null);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        <section className="hero-sesi-white" style={{ padding: "40px 24px 30px" }}>
          <div className="hero-container">
            <h1 className="hero-title" style={{ fontSize: "2.4rem", marginBottom: "10px" }}>
              Lista de <span className="text-sesi-red">Notas dos Alunos</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: "1rem", marginBottom: "0" }}>
              Visualização das notas dos trabalhos (T1, T2) e avaliações (N1, N2, N3).
            </p>
          </div>
        </section>

        <div className="form-page-container" style={{ padding: "30px 24px 80px" }}>
          <div className="table-card">
            <div className="table-responsive">
              <table className="table-sesi">
                <thead>
                  <tr>
                    <th style={{ width: "50px" }}>ID</th>
                    <th>ALUNO</th>
                    <th style={{ width: "70px" }}>T1</th>
                    <th style={{ width: "70px" }}>T2</th>
                    <th style={{ width: "70px" }}>N1</th>
                    <th style={{ width: "70px" }}>N2</th>
                    <th style={{ width: "70px" }}>N3</th>
                    <th style={{ width: "150px" }}>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {notas.length > 0 ? (
                    notas.map((n) => (
                      <tr key={n.id}>
                        <td><strong>#{n.id}</strong></td>
                        <td><strong style={{ color: "var(--sesi-navy)" }}>{n.aluno}</strong></td>
                        <td>{n.t1}</td>
                        <td>{n.t2}</td>
                        <td>{n.n1}</td>
                        <td>{n.n2}</td>
                        <td>{n.n3}</td>
                        <td>
                          <div className="action-buttons">
                            <button onClick={() => setNotaEditando({ ...n })} className="btn-action-edit">
                              ✏️ Editar
                            </button>
                            <button onClick={() => excluirNota(n.id)} className="btn-action-delete">
                              🗑️ Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                        Nenhuma nota cadastrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE EDIÇÃO DE NOTAS */}
      {notaEditando && (
        <div className="modal-overlay" onClick={() => setNotaEditando(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="form-card-header">
              <h3>Editar Notas de {notaEditando.aluno}</h3>
            </div>
            <div className="form-card-body">
              <form onSubmit={salvarEdicao}>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label">Aluno</label>
                    <input
                      type="text"
                      className="form-input form-input-no-icon"
                      value={notaEditando.aluno}
                      onChange={(e) => setNotaEditando({ ...notaEditando, aluno: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label">T1 (Trabalho 1)</label>
                      <input
                        type="number"
                        step="0.1"
                        className="form-input form-input-no-icon"
                        value={notaEditando.t1}
                        onChange={(e) => setNotaEditando({ ...notaEditando, t1: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">T2 (Trabalho 2)</label>
                      <input
                        type="number"
                        step="0.1"
                        className="form-input form-input-no-icon"
                        value={notaEditando.t2}
                        onChange={(e) => setNotaEditando({ ...notaEditando, t2: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label">N1</label>
                      <input
                        type="number"
                        step="0.1"
                        className="form-input form-input-no-icon"
                        value={notaEditando.n1}
                        onChange={(e) => setNotaEditando({ ...notaEditando, n1: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">N2</label>
                      <input
                        type="number"
                        step="0.1"
                        className="form-input form-input-no-icon"
                        value={notaEditando.n2}
                        onChange={(e) => setNotaEditando({ ...notaEditando, n2: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">N3</label>
                      <input
                        type="number"
                        step="0.1"
                        className="form-input form-input-no-icon"
                        value={notaEditando.n3}
                        onChange={(e) => setNotaEditando({ ...notaEditando, n3: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions-bar">
                  <button type="button" className="btn-sesi-outline" onClick={() => setNotaEditando(null)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-sesi-red" style={{ border: "none", cursor: "pointer" }}>
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
