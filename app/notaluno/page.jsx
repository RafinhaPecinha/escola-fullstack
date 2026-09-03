"use client";

import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function NotAluno() {
  const [aluno, setAluno] = useState("");
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [n3, setN3] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Notas do aluno ${aluno} lançadas com sucesso!`);
    setAluno("");
    setT1("");
    setT2("");
    setN1("");
    setN2("");
    setN3("");
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        <section className="hero-sesi-white" style={{ padding: "40px 24px 30px" }}>
          <div className="hero-container">
            <h1 className="hero-title" style={{ fontSize: "2.4rem", marginBottom: "10px" }}>
              Lançar <span className="text-sesi-red">Notas de Aluno</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: "1rem", marginBottom: "0" }}>
              Informe o aluno, notas dos trabalhos (T1, T2) e avaliações (N1, N2, N3).
            </p>
          </div>
        </section>

        <div className="form-page-container">
          <div className="form-card">
            <div className="form-card-header">
              <div className="form-header-title">
                <div className="form-header-text">
                  <h3>Lançamento de Notas</h3>
                  <p>Preencha os campos abaixo com as notas obtidas pelo aluno</p>
                </div>
              </div>
            </div>

            <div className="form-card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  {/* ALUNO */}
                  <div className="form-group full-width">
                    <label htmlFor="aluno" className="form-label">
                      Aluno <span className="required">*</span>
                    </label>
                    <input
                      id="aluno"
                      type="text"
                      className="form-input form-input-no-icon"
                      value={aluno}
                      onChange={(e) => setAluno(e.target.value)}
                      placeholder="Digite o nome do aluno"
                      required
                    />
                  </div>

                  {/* T1 */}
                  <div className="form-group">
                    <label htmlFor="t1" className="form-label">
                      T1 (Trabalho 1) <span className="required">*</span>
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
                      placeholder="Nota T1 (0 a 10)"
                      required
                    />
                  </div>

                  {/* T2 */}
                  <div className="form-group">
                    <label htmlFor="t2" className="form-label">
                      T2 (Trabalho 2) <span className="required">*</span>
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
                      placeholder="Nota T2 (0 a 10)"
                      required
                    />
                  </div>

                  {/* N1 */}
                  <div className="form-group">
                    <label htmlFor="n1" className="form-label">
                      N1 (Nota 1) <span className="required">*</span>
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
                      placeholder="Nota N1 (0 a 10)"
                      required
                    />
                  </div>

                  {/* N2 */}
                  <div className="form-group">
                    <label htmlFor="n2" className="form-label">
                      N2 (Nota 2) <span className="required">*</span>
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
                      placeholder="Nota N2 (0 a 10)"
                      required
                    />
                  </div>

                  {/* N3 */}
                  <div className="form-group full-width">
                    <label htmlFor="n3" className="form-label">
                      N3 (Nota 3) <span className="required">*</span>
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
                      placeholder="Nota N3 (0 a 10)"
                      required
                    />
                  </div>
                </div>

                <div className="form-actions-bar">
                  <button type="submit" className="btn-sesi-red" style={{ border: "none", cursor: "pointer", padding: "12px 24px" }}>
                    Lançar Notas
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
