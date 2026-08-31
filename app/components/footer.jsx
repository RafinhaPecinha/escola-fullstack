import Link from "next/link";
import { IconGraduation, IconMapPin, IconPhone, IconMail, IconShieldCheck } from "./icons";

export default function Footer() {
  return (
    <footer className="site-footer-sesi">
      <div className="footer-top-accent"></div>
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand-header">
            <div className="brand-logo-icon-red">
              <IconGraduation width={26} height={26} />
            </div>
            <div>
              <span className="brand-title">SESI Mirandópolis</span>
              <span className="brand-subtitle">Serviço Social da Indústria</span>
            </div>
          </div>
          <p className="brand-desc">
            Portal oficial de gestão escolar do Centro Educacional SESI Mirandópolis. Excelência em educação, tecnologia e acompanhamento do rendimento acadêmico.
          </p>
          <div className="system-status-badge-sesi">
            <IconShieldCheck width={16} height={16} />
            <span>Sistema Escolar Operacional</span>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Navegação</h4>
          <ul>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/cadaluno">Cadastrar Aluno</Link></li>
            <li><Link href="/listaluno">Lista de Alunos</Link></li>
            <li><Link href="/notaluno">Lançar Notas</Link></li>
            <li><Link href="/listanota">Boletins de Notas</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Portal & Destaques</h4>
          <ul>
            <li><a href="#galeria">Instalações da Escola</a></li>
            <li><a href="#avisos">Mural de Comunicados</a></li>
            <li><a href="#estatisticas">Estatísticas SESI</a></li>
            <li><a href="#modulos">Módulos do Sistema</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contato & Unidade</h4>
          <ul className="contact-list">
            <li>
              <IconMapPin width={18} height={18} />
              <span>Av. Dr. Raul da Rocha Medeiros, Mirandópolis - SP</span>
            </li>
            <li>
              <IconPhone width={18} height={18} />
              <span>(18) 3701-4000</span>
            </li>
            <li>
              <IconMail width={18} height={18} />
              <span>contato@sesimirandopolis.org.br</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} SESI SP - Centro Educacional Mirandópolis. Todos os direitos reservados.</p>
          <p className="footer-credits">Sistema Escolar Fullstack</p>
        </div>
      </div>
    </footer>
  );
}
