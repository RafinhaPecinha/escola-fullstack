import db from "../../db/banco.js";
import { NextResponse } from "next/server";

// Buscar/Listar alunos (GET)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (id) {
            const aluno = db.prepare("SELECT * FROM alunos WHERE id_aluno = ?").get(id);
            if (!aluno) {
                return NextResponse.json(
                    { erro: "Aluno não encontrado", message: "Aluno não encontrado" },
                    { status: 404 }
                );
            }
            return NextResponse.json(aluno);
        }

        // Ordenando por nome conforme o repositório de referência
        const alunos = db.prepare("SELECT * FROM alunos ORDER BY nome").all();
        return NextResponse.json(alunos);
    } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        return NextResponse.json(
            { erro: "Erro ao buscar alunos", message: "Erro ao buscar alunos" },
            { status: 500 }
        );
    }
}

// Cadastrar aluno (POST)
export async function POST(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare("INSERT INTO alunos (nome, idade, serie, ra) VALUES (?, ?, ?, ?)");
        sql.run(dados.nome, dados.idade, dados.serie, dados.ra);
        return NextResponse.json({
            mensagem: "Aluno cadastrado com sucesso!",
            message: "Aluno cadastrado com sucesso!"
        });
    } catch (error) {
        console.error("Erro ao realizar o cadastro:", error);
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return NextResponse.json(
                { erro: "Este RA já está cadastrado!", message: "Este RA já está cadastrado!" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { erro: "Erro ao cadastrar aluno", message: "Erro ao cadastrar aluno" },
            { status: 500 }
        );
    }
}

// Editar aluno (PUT)
export async function PUT(request) {
    try {
        const dados = await request.json();
        const id = dados.id_aluno ?? dados.id;

        if (!id) {
            return NextResponse.json(
                { erro: "ID do aluno é obrigatório para atualização.", message: "ID do aluno é obrigatório." },
                { status: 400 }
            );
        }

        const sql = db.prepare(`
            UPDATE alunos
            SET nome = ?, idade = ?, serie = ?, ra = ?
            WHERE id_aluno = ?
        `);
        sql.run(dados.nome, dados.idade, dados.serie, dados.ra, id);

        return NextResponse.json({
            mensagem: "Aluno atualizado com sucesso!",
            message: "Aluno atualizado com sucesso!"
        });
    } catch (erro) {
        console.error("Erro ao editar o aluno:", erro);
        return NextResponse.json(
            { erro: "Erro ao editar o aluno.", message: "Erro ao editar o aluno." },
            { status: 500 }
        );
    }
}

// Excluir aluno pelo id_aluno (DELETE)
export async function DELETE(request) {
    try {
        const dados = await request.json();
        const id = dados.id_aluno ?? dados.id;

        if (!id) {
            return NextResponse.json(
                { erro: "ID do aluno é obrigatório para exclusão.", message: "ID do aluno é obrigatório." },
                { status: 400 }
            );
        }

        const sql = db.prepare("DELETE FROM alunos WHERE id_aluno = ?");
        sql.run(id);

        return NextResponse.json({
            mensagem: "Aluno excluído com sucesso!",
            message: "Aluno excluído com sucesso!"
        });
    } catch (erro) {
        console.error("Erro ao excluir o aluno:", erro);
        return NextResponse.json(
            { erro: "Erro ao excluir o aluno.", message: "Erro ao excluir o aluno." },
            { status: 500 }
        );
    }
}
