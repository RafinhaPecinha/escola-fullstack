import { NextResponse } from "next/server";
import db from "../../../db/banco.js";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    if (!id) {
      return NextResponse.json(
        { erro: "ID do aluno não informado", message: "ID do aluno não informado" },
        { status: 400 }
      );
    }

    const aluno = db
      .prepare("SELECT * FROM alunos WHERE id_aluno = ?")
      .get(id);

    if (!aluno) {
      return NextResponse.json(
        { erro: "Aluno não encontrado", message: "Aluno não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(aluno);
  } catch (erro) {
    console.error("Erro ao buscar aluno por ID:", erro);
    return NextResponse.json(
      { erro: "Erro ao buscar aluno", message: "Erro ao buscar aluno" },
      { status: 500 }
    );
  }
}
