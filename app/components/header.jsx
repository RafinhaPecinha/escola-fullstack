"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconGraduation, IconUserPlus, IconList, IconFileEdit, IconAward, IconSearch, IconSparkles } from "./icons";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header className="main-header">
      <div className="header-top-bar">
        <div className="top-bar-container">
          <div className="top-info">
            <span className="badge-sesi">SESI SENAI</span>
            <span className="school-unit">Centro Educacional Mirandópolis</span>
          </div>
          <div className="top-meta">
            <span className="live-dot"></span>
            <span>Ano Letivo 2026</span>
          </div>
        </div>
      </div>

      <div className="header-nav-container">
        <Link href="/" className="logo-brand">
          <div className="logo-icon-wrapper">
            <IconGraduation className="logo-icon" width={28} height={28} />
          </div>
          <div className="logo-text-group">
            <span className="brand-name">Sistema Escolar</span>
            <span className="brand-location">SESI Mirandópolis</span>
          </div>
        </Link>

        <nav className="header-nav">
          <ul className="nav-list">
            <li>
              <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
                <IconSparkles width={18} height={18} />
                <span>Início</span>
              </Link>
            </li>
            <li>
              <Link href="/cadaluno" className={`nav-link ${isActive("/cadaluno") ? "active" : ""}`}>
                <IconUserPlus width={18} height={18} />
                <span>Cadastrar Aluno</span>
              </Link>
            </li>
            <li>
              <Link href="/listaluno" className={`nav-link ${isActive("/listaluno") ? "active" : ""}`}>
                <IconList width={18} height={18} />
                <span>Lista de Alunos</span>
              </Link>
            </li>
            <li>
              <Link href="/notaluno" className={`nav-link ${isActive("/notaluno") ? "active" : ""}`}>
                <IconFileEdit width={18} height={18} />
                <span>Lançar Notas</span>
              </Link>
            </li>
            <li>
              <Link href="/listanota" className={`nav-link ${isActive("/listanota") ? "active" : ""}`}>
                <IconAward width={18} height={18} />
                <span>Boletins / Notas</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="search-pill">
            <IconSearch width={16} height={16} />
            <input type="text" placeholder="Buscar aluno, turma..." />
          </div>
          <Link href="/cadaluno" className="cta-btn">
            <IconUserPlus width={16} height={16} />
            <span>Novo Aluno</span>
          </Link>
        </div>
      </div>
    </header>
  );
}