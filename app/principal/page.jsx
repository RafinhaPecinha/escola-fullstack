"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  IconGraduation,
  IconUserPlus,
  IconList,
  IconFileEdit,
  IconAward,
  IconSparkles,
  IconChevronRight,
  IconCalendar,
  IconBell,
  IconUsers,
  IconBookOpen,
  IconZoomIn,
  IconX,
  IconImageIcon
} from "../components/icons";

export default function Principal() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Lista de imagens da galeria de destaques
  const galleryImages = [
    {
      id: 1,
      src: "/images/hero-banner.jpg",
      title: "Hub de Inovação & Robótica SESI SENAI",
      category: "Tecnologia",
      desc: "Alunos trabalhando em projetos de automação, tecnologia e robótica de alta performance."
    },
    {
      id: 2,
      src: "/images/classroom.jpg",
      title: "Salas de Aula Digitais e Interativas",
      category: "Ensino",
      desc: "Ambientes modernos com lousas digitais e metodologias ativas de aprendizado."
    },
    {
      id: 3,
      src: "/images/robotics.jpg",
      title: "Laboratório STEM & Eletrônica",
      category: "Laboratório",
      desc: "Projetos práticos com microcontroladores, programação e kits de eletrônica."
    },
    {
      id: 4,
      src: "/images/library.jpg",
      title: "Biblioteca e Centro de Pesquisa",
      category: "Infraestrutura",
      desc: "Espaço amplo com acervo físico e digital completo para estudos e trabalhos escolares."
    }
  ];

  // Avisos recentes
  const announcements = [
    {
      id: 1,
      date: "31 AGO",
      type: "Importante",
      badgeClass: "badge-sesi-red",
      title: "Abertura do Período de Lançamento de Notas - 3º Bimestre",
      text: "Os professores já podem realizar o lançamento das notas e frequências no sistema escolar SESI."
    },
    {
      id: 2,
      date: "05 SET",
      type: "Evento SESI",
      badgeClass: "badge-sesi-blue",
      title: "Feira de Tecnologia & Robótica SESI Mirandópolis",
      text: "Apresentação dos projetos de automação desenvolvidos pelos estudantes no laboratório STEM."
    },
    {
      id: 3,
      date: "12 SET",
      type: "Acadêmico",
      badgeClass: "badge-sesi-dark",
      title: "Reunião de Pais e Mestres - Ensino Fundamental e Médio",
      text: "Entrega de boletins informativos e atendimento individualizado com os docentes."
    }
  ];

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* HERO SECTION - ESTILO BRANCO SESI */}
        <section className="hero-section hero-sesi-white">
          <div className="hero-container">
            <div className="hero-badge">
              <IconSparkles width={16} height={16} />
              <span>Portal Acadêmico SESI SP</span>
            </div>

            <h1 className="hero-title">
              Sistema Escolar Integrado <br />
              <span className="text-sesi-red">SESI Mirandópolis</span>
            </h1>

            <p className="hero-subtitle">
              Plataforma de gestão educacional e acompanhamento pedagógico. Gerencie matrículas de alunos, lançamentos de notas, boletins e indicadores acadêmicos em um ambiente simples e moderno.
            </p>

            <div className="hero-actions">
              <Link href="/cadaluno" className="btn-sesi-red">
                <IconUserPlus width={20} height={20} />
                <span>Cadastrar Novo Aluno</span>
              </Link>
              <Link href="/listaluno" className="btn-sesi-navy">
                <IconList width={20} height={20} />
                <span>Lista de Alunos</span>
              </Link>
              <Link href="/notaluno" className="btn-sesi-outline">
                <IconFileEdit width={20} height={20} />
                <span>Lançar Notas</span>
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon icon-red">
                  <IconUsers width={24} height={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">480</span>
                  <span className="stat-label">Alunos Matriculados</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon icon-navy">
                  <IconBookOpen width={24} height={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">16</span>
                  <span className="stat-label">Turmas Ativas</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon icon-gold">
                  <IconAward width={24} height={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">8.7</span>
                  <span className="stat-label">Média Geral da Escola</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon icon-green">
                  <IconGraduation width={24} height={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">96.4%</span>
                  <span className="stat-label">Índice de Frequência</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MÓDULOS DE ACESSO RÁPIDO */}
        <section className="section-container" id="modulos">
          <div className="section-header">
            <div>
              <span className="section-tag">Acesso Rápido</span>
              <h2 className="section-title">Módulos de Gestão Escolar</h2>
            </div>
            <p className="section-subtitle">
              Selecione uma das opções para gerenciar as rotas do sistema.
            </p>
          </div>

          <div className="modules-grid">
            <Link href="/cadaluno" className="module-card card-sesi-red">
              <div className="card-top">
                <div className="card-icon">
                  <IconUserPlus width={28} height={28} />
                </div>
                <span className="card-badge">Cadastro</span>
              </div>
              <h3>Cadastrar Aluno</h3>
              <p>Registre novos alunos com dados pessoais, matrícula, turma e contato do responsável.</p>
              <div className="card-arrow">
                <span>Abrir cadastro</span>
                <IconChevronRight width={18} height={18} />
              </div>
            </Link>

            <Link href="/listaluno" className="module-card card-sesi-navy">
              <div className="card-top">
                <div className="card-icon">
                  <IconList width={28} height={28} />
                </div>
                <span className="card-badge">Consulta</span>
              </div>
              <h3>Lista de Alunos</h3>
              <p>Consulte e busque a listagem completa dos alunos matriculados na unidade SESI.</p>
              <div className="card-arrow">
                <span>Ver alunos</span>
                <IconChevronRight width={18} height={18} />
              </div>
            </Link>

            <Link href="/notaluno" className="module-card card-sesi-purple">
              <div className="card-top">
                <div className="card-icon">
                  <IconFileEdit width={28} height={28} />
                </div>
                <span className="card-badge">Avaliações</span>
              </div>
              <h3>Lançar Notas</h3>
              <p>Insira avaliações bimestrais, trabalhos acadêmicos e mídias por disciplina.</p>
              <div className="card-arrow">
                <span>Lançar notas</span>
                <IconChevronRight width={18} height={18} />
              </div>
            </Link>

            <Link href="/listanota" className="module-card card-sesi-emerald">
              <div className="card-top">
                <div className="card-icon">
                  <IconAward width={28} height={28} />
                </div>
                <span className="card-badge">Boletim</span>
              </div>
              <h3>Lista de Notas</h3>
              <p>Consulte o histórico de rendimento, notas dos alunos e relatórios de desempenho.</p>
              <div className="card-arrow">
                <span>Ver notas</span>
                <IconChevronRight width={18} height={18} />
              </div>
            </Link>
          </div>
        </section>

        {/* GALERIA DE FOTOS SESI */}
        <section className="section-container section-gallery-white" id="galeria">
          <div className="section-header">
            <div>
              <span className="section-tag">Instalações SESI</span>
              <h2 className="section-title">Galeria da Escola</h2>
            </div>
            <p className="section-subtitle">
              Conheça os espaços de aprendizado, laboratórios e biblioteca da nossa unidade.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="gallery-item-white"
                onClick={() => setSelectedImage(img)}
              >
                <div className="gallery-img-wrapper">
                  <img src={img.src} alt={img.title} className="gallery-img" />
                  <div className="gallery-overlay-white">
                    <span className="gallery-category-red">{img.category}</span>
                    <h4 className="gallery-item-title">{img.title}</h4>
                    <p className="gallery-item-desc">{img.desc}</p>
                    <button className="gallery-zoom-btn-red">
                      <IconZoomIn width={18} height={18} />
                      <span>Ampliar Imagem</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="image-tip-box-white">
            <div className="tip-icon-red">
              <IconImageIcon width={24} height={24} />
            </div>
            <div className="tip-content">
              <h4>Dica: Como atualizar ou colocar mais imagens no site?</h4>
              <p>
                As fotos ficam salvas na pasta <code>public/images/</code>. Para adicionar mais fotos, basta colocar seus arquivos lá e incluir o caminho no componente!
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE AVISOS */}
        <section className="section-container" id="avisos">
          <div className="section-header">
            <div>
              <span className="section-tag">Comunicação Escola</span>
              <h2 className="section-title">Mural de Avisos & Comunicados</h2>
            </div>
            <div className="live-notice-pill-red">
              <IconBell width={16} height={16} />
              <span>Informativos Recentes</span>
            </div>
          </div>

          <div className="announcements-list">
            {announcements.map((item) => (
              <div key={item.id} className="announcement-card-white">
                <div className="announcement-date-red">
                  <IconCalendar width={18} height={18} />
                  <span>{item.date}</span>
                </div>
                <div className="announcement-content">
                  <div className="announcement-header">
                    <span className={`notice-badge ${item.badgeClass}`}>{item.type}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MODAL DE AMPLIAÇÃO */}
      {selectedImage && (
        <div className="modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="modal-container-white" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-red" onClick={() => setSelectedImage(null)}>
              <IconX width={24} height={24} />
            </button>
            <div className="modal-img-holder">
              <img src={selectedImage.src} alt={selectedImage.title} className="modal-img" />
            </div>
            <div className="modal-caption-white">
              <span className="gallery-category-red">{selectedImage.category}</span>
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}