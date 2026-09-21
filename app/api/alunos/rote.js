import db from "../../db/banco.js";
import { NextResponse } from "next/server";

export async function GET(request) {
    const alunos = db.prepare("SELECT * FROM alunos ORDER BY nome").all();
    try {
        return NextResponse.json(alunos);
    } catch (error) {
        return NextResponse.json({ message: "Erro ao buscar alunos" }, { status: 500 });
    }
}

