"use client";

import { useEffect, useState, use } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  IconFileEdit,
  IconSparkles,
  IconUsers,
  IconBookOpen,
  IconShieldCheck,
  IconGraduation,
  IconList,
  IconChevronRight
} from "../../components/icons";

export default function EditAlunoPage({ params: paramsPromise }) {
  const router = useRouter();
  const routeParams = useParams();
  const searchParams = useSearchParams();

  // Compatibilidade com Next.js 15+ (params como Promise) ou fallback para useParams/useSearchParams
  const resolvedParams = paramsPromise ? use(paramsPromise) : null;
  const id = resolvedParams?.id || routeParams?.id || searchParams?.get("id");

  const [id_aluno, setIdAluno] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [serie, setSerie] = useState("");
  const [ra, setRa] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (id) {
      buscarAluno(id);
    } else {
      setCarregando(false);
    }
  }, [id]);

  async function buscarAluno(idAluno) {
    try {
      setCarregando(true);
      setErro("");
      const resposta = await fetch(`/api/alunos/${idAluno}`);

      if (!resposta.ok) {
        setErro("Aluno não encontrado!");
        return;
      }

      const dados = await resposta.json();
      setIdAluno(dados.id_aluno || "");
      setNome(dados.nome || "");
      setIdade(dados.idade !== undefined ? String(dados.idade) : "");
      setSerie(dados.serie || "");
      setRa(dados.ra !== undefined ? String(dados.ra) : "");
    } catch (erro) {
      console.error("Erro ao carregar aluno:", erro);
      setErro("Erro ao carregar dados do aluno.");
    } finally {
      setCarregando(false);
    }
  }

  async function editarAluno(event) {
    event.preventDefault();

    if (!id) {
      alert("ID do aluno não foi encontrado.");
      return;
    }

    if (!nome || !idade || !serie || !ra) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    try {
      setSalvando(true);
      const resposta = await fetch("/api/alunos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_aluno: Number(id_aluno || id),
          nome,
          idade: Number(idade),
          serie,
          ra,
        }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setSucesso(true);
        setTimeout(() => {
          router.push("/listaluno");
        }, 1200);
      } else {
        alert(dados.mensagem || dados.erro || dados.message || "Erro ao editar aluno");
      }
    } catch (error) {
      console.error("Erro ao editar o aluno:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* BANNER / HERO SESI */}
        <section className="hero-sesi-white" style={{ padding: "40px 24px 30px" }}>
          <div className="hero-container">
            <div className="hero-badge">
              <IconSparkles width={16} height={16} />
              <span>Edição de Matrícula • ID #{id || id_aluno}</span>
            </div>

            <h1 className="hero-title" style={{ fontSize: "2.4rem", marginBottom: "10px" }}>
              Editar <span className="text-sesi-red">Dados do Aluno</span>
            </h1>

            <p className="hero-subtitle" style={{ fontSize: "1rem", marginBottom: "0", maxWidth: "680px" }}>
              Atualize as informações acadêmicas e pessoais do estudante no sistema do Centro Educacional SESI Mirandópolis.
            </p>
          </div>
        </section>

        {/* CONTAINER DO FORMULÁRIO */}
        <div className="form-page-container">
          {carregando ? (
            <div className="form-card" style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
              Carregando informações do aluno...
            </div>
          ) : erro ? (
            <div className="form-card" style={{ padding: "40px", textAlign: "center" }}>
              <h3 style={{ color: "#ef4444", marginBottom: "12px" }}>⚠️ {erro}</h3>
              <p style={{ color: "#64748b", marginBottom: "20px" }}>Não foi possível carregar os dados deste aluno.</p>
              <Link href="/listaluno" className="btn-sesi-navy">
                <IconList width={18} height={18} />
                <span>Voltar para Lista de Alunos</span>
              </Link>
            </div>
          ) : sucesso ? (
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
                    <h3>Alterações Salvas com Sucesso!</h3>
                    <p>Redirecionando para a lista de alunos...</p>
                  </div>
                </div>
              </div>

              <div className="form-card-body">
                <div className="success-banner">
                  <div className="success-banner-icon">
                    <IconShieldCheck width={22} height={22} />
                  </div>
                  <div>
                    <strong>Dados Atualizados!</strong>
                    <p style={{ margin: "2px 0 0", fontSize: "0.85rem" }}>
                      As informações do aluno <strong>{nome}</strong> foram salvas com sucesso.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "20px" }}>
                  <Link href="/listaluno" className="btn-sesi-red">
                    <IconList width={18} height={18} />
                    <span>Voltar à Lista Agora</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="form-card">
              {/* CABEÇALHO DO CARD */}
              <div className="form-card-header">
                <div className="form-header-title">
                  <div className="form-header-icon">
                    <IconFileEdit width={24} height={24} />
                  </div>
                  <div className="form-header-text">
                    <h3>Ficha de Edição do Estudante</h3>
                    <p>Preencha os dados do aluno para atualizar o cadastro no sistema.</p>
                  </div>
                </div>
                <span className="form-step-badge">ID: #{id || id_aluno}</span>
              </div>

              {/* CORPO DO FORMULÁRIO */}
              <div className="form-card-body">
                <form onSubmit={editarAluno}>
                  <input type="hidden" value={id_aluno} />

                  <div className="form-grid">
                    {/* NOME COMPLETO */}
                    <div className="form-group full-width">
                      <label htmlFor="nome" className="form-label">
                        Nome do Aluno <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <IconUsers width={18} height={18} className="input-icon" />
                        <input
                          id="nome"
                          type="text"
                          className="form-input"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Digite o nome do aluno"
                          required
                        />
                      </div>
                      <span className="form-help-text">Insira o nome conforme documento oficial.</span>
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
                          placeholder="Digite o RA"
                          required
                        />
                      </div>
                      <span className="form-help-text">Número de identificação único.</span>
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
                          placeholder="Digite a idade"
                          required
                        />
                      </div>
                      <span className="form-help-text">Idade atual do estudante.</span>
                    </div>

                    {/* SÉRIE / TURMA */}
                    <div className="form-group full-width">
                      <label htmlFor="serie" className="form-label">
                        Série <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <IconBookOpen width={18} height={18} className="input-icon" />
                        <input
                          id="serie"
                          type="text"
                          className="form-input"
                          value={serie}
                          onChange={(e) => setSerie(e.target.value)}
                          placeholder="Digite a série"
                          required
                        />
                      </div>
                      <span className="form-help-text">Informe a série e a turma correspondente.</span>
                    </div>
                  </div>

                  {/* BOTÕES DE AÇÃO */}
                  <div className="form-actions-bar">
                    <Link href="/listaluno" className="btn-sesi-outline" style={{ padding: "12px 20px" }}>
                      <span>Cancelar</span>
                    </Link>

                    <button
                      type="submit"
                      disabled={salvando}
                      className="btn-sesi-red"
                      style={{ border: "none", cursor: salvando ? "wait" : "pointer", fontSize: "0.95rem" }}
                    >
                      <IconFileEdit width={18} height={18} />
                      <span>{salvando ? "Salvando..." : "Editar Aluno"}</span>
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
