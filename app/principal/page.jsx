"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      desc: "Alunos trabalhando em projetos de automação e robótica de alta performance."
    },
    {
      id: 2,
      src: "/images/classroom.jpg",
      title: "Salas de Aula Digitais e Interativas",
      category: "Ensino",
      desc: "Ambientes modernos com telas interativas e metodologias ativas de aprendizado."
    },
    {
      id: 3,
      src: "/images/robotics.jpg",
      title: "Laboratório STEM & Eletrônica",
      category: "Laboratório",
      desc: "Projetos práticos com Arduino, microcontroladores e programação avançada."
    },
    {
      id: 4,
      src: "/images/library.jpg",
      title: "Biblioteca e Centro de Pesquisa",
      category: "Infraestrutura",
      desc: "Espaço amplo com acervo físico e digital completo para estudos individuais e em grupo."
    }
  ];

  // Avisos recentes
  const announcements = [
    {
      id: 1,
      date: "31 AGO",
      type: "Importante",
      badgeClass: "badge-danger",
      title: "Abertura do Período de Lançamento de Notas do 3º Bimestre",
      text: "Os professores já podem realizar o lançamento das notas e frequências no sistema."
    },
    {
      id: 2,
      date: "05 SET",
      type: "Evento",
      badgeClass: "badge-primary",
      title: "Feira de Tecnologia & Robótica SESI Mirandópolis",
      text: "Apresentação dos projetos desenvolvidos pelos estudantes no laboratório STEM."
    },
    {
      id: 3,
      date: "12 SET",
      type: "Acadêmico",
      badgeClass: "badge-success",
      title: "Reunião de Pais e Mestres - Ensino Fundamental e Médio",
      text: "Entrega de boletins informativos e atendimento individualizado dos docentes."
    }
  ];

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-bg-overlay"></div>
          <div className="hero-container">
            <div className="hero-badge">
              <IconSparkles width={16} height={16} />
              <span>Portal Acadêmico 2026</span>
            </div>

            <h1 className="hero-title">
              Sistema Escolar Integrado <br />
              <span className="text-gradient">SESI Mirandópolis</span>
            </h1>

            <p className="hero-subtitle">
              Gestão educacional de alta performance: acompanhamento de cadastros, controle de notas, emissão de boletins e visualização de indicadores acadêmicos em uma só plataforma.
            </p>

            <div className="hero-actions">
              <Link href="/cadaluno" className="btn-primary">
                <IconUserPlus width={20} height={20} />
                <span>Cadastrar Novo Aluno</span>
              </Link>
              <Link href="/listaluno" className="btn-secondary">
                <IconList width={20} height={20} />
                <span>Ver Lista de Alunos</span>
              </Link>
              <Link href="/notaluno" className="btn-outline">
                <IconFileEdit width={20} height={20} />
                <span>Lançar Notas</span>
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon icon-blue">
                  <IconUsers width={24} height={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">480</span>
                  <span className="stat-label">Alunos Matriculados</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon icon-purple">
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
              <span className="section-tag">Navegação Direta</span>
              <h2 className="section-title">Módulos de Gestão do Sistema</h2>
            </div>
            <p className="section-subtitle">
              Acesse rapidamente as principais funcionalidades de gerenciamento do portal.
            </p>
          </div>

          <div className="modules-grid">
            <Link href="/cadaluno" className="module-card card-blue">
              <div className="card-top">
                <div className="card-icon">
                  <IconUserPlus width={28} height={28} />
                </div>
                <span className="card-badge">Cadastro</span>
              </div>
              <h3>Cadastrar Aluno</h3>
              <p>Registre novos alunos com matrícula, dados pessoais, turma e responsável.</p>
              <div className="card-arrow">
                <span>Acessar formulário</span>
                <IconChevronRight width={18} height={18} />
              </div>
            </Link>

            <Link href="/listaluno" className="module-card card-cyan">
              <div className="card-top">
                <div className="card-icon">
                  <IconList width={28} height={28} />
                </div>
                <span className="card-badge">Consulta</span>
              </div>
              <h3>Lista de Alunos</h3>
              <p>Visualize, busque e filtre a lista completa de estudantes cadastrados no sistema.</p>
              <div className="card-arrow">
                <span>Ver listagem</span>
                <IconChevronRight width={18} height={18} />
              </div>
            </Link>

            <Link href="/notaluno" className="module-card card-purple">
              <div className="card-top">
                <div className="card-icon">
                  <IconFileEdit width={28} height={28} />
                </div>
                <span className="card-badge">Avaliações</span>
              </div>
              <h3>Lançar Notas</h3>
              <p>Insira notas de provas, trabalhos e médias bimestrais por disciplina.</p>
              <div className="card-arrow">
                <span>Lançar notas</span>
                <IconChevronRight width={18} height={18} />
              </div>
            </Link>

            <Link href="/listanota" className="module-card card-emerald">
              <div className="card-top">
                <div className="card-icon">
                  <IconAward width={28} height={28} />
                </div>
                <span className="card-badge">Relatórios</span>
              </div>
              <h3>Lista de Notas & Boletins</h3>
              <p>Consulte histórico de notas, verifique aprovados/reprovados e médias por matéria.</p>
              <div className="card-arrow">
                <span>Ver boletins</span>
                <IconChevronRight width={18} height={18} />
              </div>
            </Link>
          </div>
        </section>

        {/* GALERIA E FOTOS DE DESTAQUE */}
        <section className="section-container section-gallery" id="galeria">
          <div className="section-header">
            <div>
              <span className="section-tag">Infraestrutura & Destaques</span>
              <h2 className="section-title">Galeria de Fotos da Escola</h2>
            </div>
            <p className="section-subtitle">
              Conheça nossas instalações tecnológicas, laboratórios e ambientes de aprendizado no SESI Mirandópolis.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => setSelectedImage(img)}
              >
                <div className="gallery-img-wrapper">
                  <img src={img.src} alt={img.title} className="gallery-img" />
                  <div className="gallery-overlay">
                    <span className="gallery-category">{img.category}</span>
                    <h4 className="gallery-item-title">{img.title}</h4>
                    <p className="gallery-item-desc">{img.desc}</p>
                    <button className="gallery-zoom-btn">
                      <IconZoomIn width={18} height={18} />
                      <span>Ampliar Imagem</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dica para o usuário sobre adição de imagens */}
          <div className="image-tip-box">
            <div className="tip-icon">
              <IconImageIcon width={24} height={24} />
            </div>
            <div className="tip-content">
              <h4>Como personalizar ou adicionar mais imagens no portal?</h4>
              <p>
                Você pode substituir ou adicionar novas fotos colando arquivos de imagem na pasta <code>public/images/</code> do projeto e referenciando seus caminhos no componente.
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE AVISOS E MURAL ACADÊMICO */}
        <section className="section-container" id="avisos">
          <div className="section-header">
            <div>
              <span className="section-tag">Mural de Notícias</span>
              <h2 className="section-title">Comunicados & Calendário Escolar</h2>
            </div>
            <div className="live-notice-pill">
              <IconBell width={16} height={16} />
              <span>Atualizado hoje</span>
            </div>
          </div>

          <div className="announcements-list">
            {announcements.map((item) => (
              <div key={item.id} className="announcement-card">
                <div className="announcement-date">
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

      {/* MODAL DE AMPLIAÇÃO DA FOTO DA GALERIA */}
      {selectedImage && (
        <div className="modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>
              <IconX width={24} height={24} />
            </button>
            <div className="modal-img-holder">
              <img src={selectedImage.src} alt={selectedImage.title} className="modal-img" />
            </div>
            <div className="modal-caption">
              <span className="gallery-category">{selectedImage.category}</span>
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