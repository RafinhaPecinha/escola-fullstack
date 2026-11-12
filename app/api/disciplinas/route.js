import db from "../../db/banco.js";
import { NextResponse } from "next/server";

// Buscar/Listar disciplinas (GET)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (id) {
            const disciplina = db.prepare("SELECT * FROM disciplinas WHERE id_disciplina = ?").get(id);
            if (!disciplina) {
                return NextResponse.json(
                    { erro: "Disciplina não encontrada", message: "Disciplina não encontrada" },
                    { status: 404 }
                );
            }
            return NextResponse.json(disciplina);
        }

        const disciplinas = db.prepare("SELECT * FROM disciplinas ORDER BY nome").all();
        return NextResponse.json(disciplinas);
    } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
        return NextResponse.json(
            { erro: "Erro ao buscar disciplinas", message: "Erro ao buscar disciplinas" },
            { status: 500 }
        );
    }
}

// Cadastrar disciplina (POST)
export async function POST(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare("INSERT INTO disciplinas (nome, pontuacao_minima) VALUES (?, ?)");
        sql.run(dados.nome, dados.pontuacao_minima);
        return NextResponse.json({
            mensagem: "Disciplina cadastrada com sucesso!",
            message: "Disciplina cadastrada com sucesso!"
        });
    } catch (error) {
        console.error("Erro ao cadastrar disciplina:", error);
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return NextResponse.json(
                { erro: "Já existe uma disciplina com este nome!", message: "Já existe uma disciplina com este nome!" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { erro: "Erro ao cadastrar disciplina", message: "Erro ao cadastrar disciplina" },
            { status: 500 }
        );
    }
}

// Editar disciplina (PUT)
export async function PUT(request) {
    try {
        const dados = await request.json();
        const id = dados.id_disciplina ?? dados.id;

        if (!id) {
            return NextResponse.json(
                { erro: "ID da disciplina é obrigatório para atualização.", message: "ID da disciplina é obrigatório." },
                { status: 400 }
            );
        }

        const sql = db.prepare(`
            UPDATE disciplinas
            SET nome = ?, pontuacao_minima = ?
            WHERE id_disciplina = ?
        `);
        sql.run(dados.nome, dados.pontuacao_minima, id);

        return NextResponse.json({
            mensagem: "Disciplina atualizada com sucesso!",
            message: "Disciplina atualizada com sucesso!"
        });
    } catch (erro) {
        console.error("Erro ao editar disciplina:", erro);
        return NextResponse.json(
            { erro: "Erro ao editar a disciplina.", message: "Erro ao editar a disciplina." },
            { status: 500 }
        );
    }
}

// Excluir disciplina (DELETE)
export async function DELETE(request) {
    try {
        const dados = await request.json();
        const id = dados.id_disciplina ?? dados.id;

        if (!id) {
            return NextResponse.json(
                { erro: "ID da disciplina é obrigatório para exclusão.", message: "ID da disciplina é obrigatório." },
                { status: 400 }
            );
        }

        const sql = db.prepare("DELETE FROM disciplinas WHERE id_disciplina = ?");
        sql.run(id);

        return NextResponse.json({
            mensagem: "Disciplina excluída com sucesso!",
            message: "Disciplina excluída com sucesso!"
        });
    } catch (erro) {
        console.error("Erro ao excluir disciplina:", erro);
        if (erro.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
            return NextResponse.json(
                { erro: "Não é possível excluir: há professores vinculados a esta disciplina.", message: "Disciplina possui professores vinculados." },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { erro: "Erro ao excluir a disciplina.", message: "Erro ao excluir a disciplina." },
            { status: 500 }
        );
    }
}
