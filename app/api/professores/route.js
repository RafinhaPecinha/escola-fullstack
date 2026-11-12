import db from "../../db/banco.js";
import { NextResponse } from "next/server";

// Buscar/Listar professores (GET)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (id) {
            const professor = db.prepare(`
                SELECT p.*, d.nome AS nome_disciplina 
                FROM professores p
                LEFT JOIN disciplinas d ON p.id_disciplina = d.id_disciplina
                WHERE p.id_professor = ?
            `).get(id);
            if (!professor) {
                return NextResponse.json(
                    { erro: "Professor não encontrado", message: "Professor não encontrado" },
                    { status: 404 }
                );
            }
            return NextResponse.json(professor);
        }

        const professores = db.prepare(`
            SELECT p.*, d.nome AS nome_disciplina 
            FROM professores p
            LEFT JOIN disciplinas d ON p.id_disciplina = d.id_disciplina
            ORDER BY p.nome
        `).all();
        return NextResponse.json(professores);
    } catch (error) {
        console.error("Erro ao buscar professores:", error);
        return NextResponse.json(
            { erro: "Erro ao buscar professores", message: "Erro ao buscar professores" },
            { status: 500 }
        );
    }
}

// Cadastrar professor (POST)
export async function POST(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`
            INSERT INTO professores (nome, nif, dias_aula, id_disciplina, total_aulas_semana)
            VALUES (?, ?, ?, ?, ?)
        `);
        sql.run(dados.nome, dados.nif, dados.dias_aula, dados.id_disciplina, dados.total_aulas_semana);
        return NextResponse.json({
            mensagem: "Professor cadastrado com sucesso!",
            message: "Professor cadastrado com sucesso!"
        });
    } catch (error) {
        console.error("Erro ao cadastrar professor:", error);
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return NextResponse.json(
                { erro: "Este NIF já está cadastrado!", message: "Este NIF já está cadastrado!" },
                { status: 400 }
            );
        }
        if (error.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
            return NextResponse.json(
                { erro: "Disciplina não encontrada.", message: "Disciplina não encontrada." },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { erro: "Erro ao cadastrar professor", message: "Erro ao cadastrar professor" },
            { status: 500 }
        );
    }
}

// Editar professor (PUT)
export async function PUT(request) {
    try {
        const dados = await request.json();
        const id = dados.id_professor ?? dados.id;

        if (!id) {
            return NextResponse.json(
                { erro: "ID do professor é obrigatório para atualização.", message: "ID do professor é obrigatório." },
                { status: 400 }
            );
        }

        const sql = db.prepare(`
            UPDATE professores
            SET nome = ?, nif = ?, dias_aula = ?, id_disciplina = ?, total_aulas_semana = ?
            WHERE id_professor = ?
        `);
        sql.run(dados.nome, dados.nif, dados.dias_aula, dados.id_disciplina, dados.total_aulas_semana, id);

        return NextResponse.json({
            mensagem: "Professor atualizado com sucesso!",
            message: "Professor atualizado com sucesso!"
        });
    } catch (erro) {
        console.error("Erro ao editar professor:", erro);
        return NextResponse.json(
            { erro: "Erro ao editar o professor.", message: "Erro ao editar o professor." },
            { status: 500 }
        );
    }
}

// Excluir professor (DELETE)
export async function DELETE(request) {
    try {
        const dados = await request.json();
        const id = dados.id_professor ?? dados.id;

        if (!id) {
            return NextResponse.json(
                { erro: "ID do professor é obrigatório para exclusão.", message: "ID do professor é obrigatório." },
                { status: 400 }
            );
        }

        const sql = db.prepare("DELETE FROM professores WHERE id_professor = ?");
        sql.run(id);

        return NextResponse.json({
            mensagem: "Professor excluído com sucesso!",
            message: "Professor excluído com sucesso!"
        });
    } catch (erro) {
        console.error("Erro ao excluir professor:", erro);
        return NextResponse.json(
            { erro: "Erro ao excluir o professor.", message: "Erro ao excluir o professor." },
            { status: 500 }
        );
    }
}
