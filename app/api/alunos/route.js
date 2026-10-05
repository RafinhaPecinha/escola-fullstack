import db from "../../db/banco.js";
import { NextResponse } from "next/server";

// Buscar/Listar alunos (GET)
export async function GET(request) {
    try {
        const alunos = db.prepare("SELECT * FROM alunos ORDER BY id_aluno DESC").all();
        return NextResponse.json(alunos);
    } catch (error) {
        return NextResponse.json({ message: "Erro ao buscar alunos" }, { status: 500 });
    }
}

// Cadastrar aluno (POST)
export async function POST(request) {
    try {
        const dados = await request.json();
        const stmt = db.prepare("INSERT INTO alunos (nome, idade, serie, ra) VALUES (?, ?, ?, ?)");
        stmt.run(dados.nome, dados.idade, dados.serie, dados.ra);
        return NextResponse.json({ message: "Aluno cadastrado com sucesso" });
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return NextResponse.json({ message: "Este RA já está cadastrado!" }, { status: 400 });
        }
        return NextResponse.json({ message: "Erro ao cadastrar aluno" }, { status: 500 });
    }
}

// Editar aluno (PUT)
export async function PUT(request) {
    try {
        const dados = await request.json();
        const id = dados.id_aluno ?? dados.id;
        const stmt = db.prepare("UPDATE alunos SET nome = ?, idade = ?, serie = ?, ra = ? WHERE id_aluno = ?");
        stmt.run(dados.nome, dados.idade, dados.serie, dados.ra, id);
        return NextResponse.json({ message: "Aluno editado com sucesso" });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao editar aluno" }, { status: 500 });
    }
}

// Deletar aluno (DELETE)
export async function DELETE(request) {
    try {
        const dados = await request.json();
        const id = dados.id_aluno ?? dados.id;
        const stmt = db.prepare("DELETE FROM alunos WHERE id_aluno = ?");
        stmt.run(id);
        return NextResponse.json({ message: "Aluno deletado com sucesso" });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao deletar aluno" }, { status: 500 });
    }
}
