'use client'
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import { competition } from "@/app/actions/competition";
import competitionService from "@/services/competition.service";
import { CompetitionButton } from "./competition-button";

export default function Form() {
    const [state, action] = useFormState(competition, undefined)

    const [text, setText] = useState<string>('');

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await competitionService.getCompetitionText()
                setText(data)
            } catch (error) {
                alert(error)
            }
        }
        getData()
    }, []);

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) toast('Alterado com sucesso', { type: "success" });
    }, [state]);

    return (
        <form action={action} className="w-full mt-4">
            <div className="flex gap-8 flex-wrap">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description">Texto</label>
                    <textarea value={text} onChange={e => setText(e.target.value)} required placeholder="Sobre a Fight Logic" rows={10} className="min-w-[300px] px-4 border rounded py-2" id="about" name="text"></textarea>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-300">
                <CompetitionButton />
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}