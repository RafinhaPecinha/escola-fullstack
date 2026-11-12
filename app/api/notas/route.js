import db from "../../db/banco.js";
import { NextResponse } from "next/server";

// Buscar/Listar notas (GET)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id_aluno = searchParams.get("id_aluno");
        const id_nota = searchParams.get("id_nota");

        if (id_nota) {
            const nota = db.prepare(`
                SELECT notas.id_nota, notas.id_aluno, notas.t1, notas.t2, notas.n1, notas.n2, notas.n3, 
                       alunos.nome, alunos.ra, alunos.serie 
                FROM notas 
                INNER JOIN alunos ON notas.id_aluno = alunos.id_aluno 
                WHERE notas.id_nota = ?
            `).get(id_nota);
            if (!nota) {
                return NextResponse.json({ erro: "Nota não encontrada", message: "Nota não encontrada" }, { status: 404 });
            }
            return NextResponse.json(nota);
        }

        if (id_aluno) {
            const nota = db.prepare(`
                SELECT notas.id_nota, notas.id_aluno, notas.t1, notas.t2, notas.n1, notas.n2, notas.n3, 
                       alunos.nome, alunos.ra, alunos.serie 
                FROM notas 
                INNER JOIN alunos ON notas.id_aluno = alunos.id_aluno 
                WHERE notas.id_aluno = ?
            `).get(id_aluno);
            if (!nota) {
                return NextResponse.json({ erro: "Nota não encontrada para este aluno", message: "Nota não encontrada" }, { status: 404 });
            }
            return NextResponse.json(nota);
        }

        const notas = db.prepare(`
            SELECT notas.id_nota, notas.id_aluno, notas.t1, notas.t2, notas.n1, notas.n2, notas.n3, 
                   alunos.nome, alunos.ra, alunos.serie 
            FROM notas 
            INNER JOIN alunos ON notas.id_aluno = alunos.id_aluno 
            ORDER BY alunos.nome
        `).all();
        return NextResponse.json(notas);
    } catch (error) {
        console.error("Erro ao buscar notas:", error);
        return NextResponse.json({ erro: "Erro ao buscar notas", message: "Erro ao buscar notas" }, { status: 500 });
    }
}

// Salvar / Cadastrar Nota (POST)
export async function POST(request) {
    try {
        const dados = await request.json();
        const id_aluno = Number(dados.id_aluno);
        const t1 = parseFloat(dados.t1) || 0;
        const t2 = parseFloat(dados.t2) || 0;
        const n1 = parseFloat(dados.n1) || 0;
        const n2 = parseFloat(dados.n2) || 0;
        const n3 = parseFloat(dados.n3) || 0;

        if (!id_aluno) {
            return NextResponse.json({ erro: "Selecione um aluno válido.", message: "Aluno é obrigatório." }, { status: 400 });
        }

        const stmt = db.prepare("INSERT INTO notas (id_aluno, t1, t2, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?)");
        stmt.run(id_aluno, t1, t2, n1, n2, n3);
        return NextResponse.json({ mensagem: "Notas cadastradas com sucesso!", message: "Notas cadastradas com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar notas:", error);
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return NextResponse.json(
                { erro: "Este aluno já possui notas cadastradas! Use a edição para alterar.", message: "Aluno já possui notas." },
                { status: 400 }
            );
        }
        return NextResponse.json({ erro: "Erro ao cadastrar notas", message: "Erro ao cadastrar notas" }, { status: 500 });
    }
}

// Editar Nota (PUT)
export async function PUT(request) {
    try {
        const dados = await request.json();
        const id_nota = dados.id_nota ?? dados.id;
        const id_aluno = dados.id_aluno;
        const t1 = parseFloat(dados.t1) || 0;
        const t2 = parseFloat(dados.t2) || 0;
        const n1 = parseFloat(dados.n1) || 0;
        const n2 = parseFloat(dados.n2) || 0;
        const n3 = parseFloat(dados.n3) || 0;

        if (!id_nota && !id_aluno) {
            return NextResponse.json({ erro: "ID da nota ou aluno é obrigatório.", message: "ID obrigatório." }, { status: 400 });
        }

        const stmt = db.prepare(`
            UPDATE notas 
            SET t1 = ?, t2 = ?, n1 = ?, n2 = ?, n3 = ? 
            WHERE id_nota = ? OR id_aluno = ?
        `);
        stmt.run(t1, t2, n1, n2, n3, id_nota || 0, id_aluno || 0);
        return NextResponse.json({ mensagem: "Notas atualizadas com sucesso!", message: "Notas editadas com sucesso" });
    } catch (error) {
        console.error("Erro ao editar notas:", error);
        return NextResponse.json({ erro: "Erro ao editar notas", message: "Erro ao editar notas" }, { status: 500 });
    }
}

// Deletar Nota (DELETE)
export async function DELETE(request) {
    try {
        const dados = await request.json();
        const id = dados.id_nota ?? dados.id ?? dados.id_aluno;

        if (!id) {
            return NextResponse.json({ erro: "ID da nota é obrigatório.", message: "ID obrigatório." }, { status: 400 });
        }

        const stmt = db.prepare("DELETE FROM notas WHERE id_nota = ? OR id_aluno = ?");
        stmt.run(id, id);
        return NextResponse.json({ mensagem: "Nota excluída com sucesso!", message: "Nota deletada com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar nota:", error);
        return NextResponse.json({ erro: "Erro ao deletar nota", message: "Erro ao deletar nota" }, { status: 500 });
    }
}
