import db from "../../db/banco.js";
import { NextResponse } from "next/server";

// Buscar/Listar notas (GET)
export async function GET(request) {
    try {
        const notas = db.prepare(`
            SELECT notas.id_nota, notas.t1, notas.t2, notas.n1, notas.n2, notas.n3, alunos.nome, alunos.ra 
            FROM notas 
            INNER JOIN alunos ON notas.id_aluno = alunos.id_aluno 
            ORDER BY alunos.nome
        `).all();
        return NextResponse.json(notas);
    } catch (error) {
        return NextResponse.json({ message: "Erro ao buscar notas" }, { status: 500 });
    }
}

// Salvar / Cadastrar Nota (POST)
export async function POST(request) {
    try {
        const dados = await request.json();
        const stmt = db.prepare("INSERT INTO notas (t1, t2, n1, n2, n3, id_aluno) VALUES (?, ?, ?, ?, ?, ?)");
        stmt.run(dados.t1, dados.t2, dados.n1, dados.n2, dados.n3, dados.id_aluno);
        return NextResponse.json({ message: "Notas cadastradas com sucesso" });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao cadastrar notas" }, { status: 500 });
    }
}

// Editar Nota (PUT)
export async function PUT(request) {
    try {
        const dados = await request.json();
        const id = dados.id_nota ?? dados.id;
        const stmt = db.prepare("UPDATE notas SET t1 = ?, t2 = ?, n1 = ?, n2 = ?, n3 = ? WHERE id_nota = ? OR id_aluno = ?");
        stmt.run(dados.t1, dados.t2, dados.n1, dados.n2, dados.n3, id, id);
        return NextResponse.json({ message: "Notas editadas com sucesso" });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao editar notas" }, { status: 500 });
    }
}

// Deletar Nota (DELETE)
export async function DELETE(request) {
    try {
        const dados = await request.json();
        const id = dados.id_nota ?? dados.id;
        const stmt = db.prepare("DELETE FROM notas WHERE id_nota = ? OR id_aluno = ?");
        stmt.run(id, id);
        return NextResponse.json({ message: "Nota deletada com sucesso" });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao deletar nota" }, { status: 500 });
    }
}
