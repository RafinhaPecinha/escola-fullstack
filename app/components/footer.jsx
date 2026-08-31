import Link from "next/link";
import { IconGraduation, IconMapPin, IconPhone, IconMail, IconShieldCheck } from "./icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand-header">
            <div className="brand-logo-icon">
              <IconGraduation width={28} height={28} />
            </div>
            <div>
              <span className="brand-title">SESI Mirandópolis</span>
              <span className="brand-subtitle">Sistema Escolar Integrado</span>
            </div>
          </div>
          <p className="brand-desc">
            Plataforma de gestão educacional dedicada à excelência no aprendizado, inovação tecnológica e acompanhamento do rendimento escolar de nossos alunos.
          </p>
          <div className="system-status-badge">
            <IconShieldCheck width={16} height={16} />
            <span>Sistema Operacional & Securo v2.4</span>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Acesso Rápido</h4>
          <ul>
            <li><Link href="/">Início / Dashboard</Link></li>
            <li><Link href="/cadaluno">Cadastrar Aluno</Link></li>
            <li><Link href="/listaluno">Lista de Alunos</Link></li>
            <li><Link href="/notaluno">Lançar Notas</Link></li>
            <li><Link href="/listanota">Boletins & Notas</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Recursos & Portal</h4>
          <ul>
            <li><a href="#galeria">Galeria de Fotos</a></li>
            <li><a href="#avisos">Mural de Avisos</a></li>
            <li><a href="#estatisticas">Estatísticas da Escola</a></li>
            <li><a href="#modulos">Módulos Acadêmicos</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contato & Localização</h4>
          <ul className="contact-list">
            <li>
              <IconMapPin width={18} height={18} />
              <span>Av. Dr. Raul da Rocha Medeiros, Mirandópolis - SP</span>
            </li>
            <li>
              <IconPhone width={18} height={18} />
              <span>(18) 3701-4000 / (18) 99700-1234</span>
            </li>
            <li>
              <IconMail width={18} height={18} />
              <span>contato@sesimirandopolis.edu.br</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} SESI SENAI Mirandópolis. Todos os direitos reservados.</p>
          <p className="footer-credits">Desenvolvido com tecnologia Next.js & Fullstack</p>
        </div>
      </div>
    </footer>
  );
}
