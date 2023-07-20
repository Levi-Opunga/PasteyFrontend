"use server"

import {environment} from "@/environment";
import React from "react";


export async function ServerElement() {

    return {base : environment.BASE_URL}

}

export async function getNotes(page:number, size:number):Promise<Note[]> {
    const res = await fetch(environment.BASE_URL + "/note");
    return await res.json();
}

export async function getNoteById(id:number):Promise<Note> {
    const res = await fetch(environment.BASE_URL + "/note/" + id);
    return await res.json();
}
export async function updateNoteById(id:number, note:Note):Promise<Note> {
    const res = await fetch(environment.BASE_URL + "/note/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    return await res.json();
}

export async function deleteNoteById(id:number):Promise<CustomResponseMessage> {
    const res = await fetch(environment.BASE_URL + "/note/" + id, {
        method: 'DELETE',
    });
    return res.json();
}
export async function createNote(note:Note):Promise<Note> {
    const res = await fetch(environment.BASE_URL + "/note", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    return await res.json();
}

export async function getNoteByText(text:string):Promise<Note> {
    const res = await fetch(environment.BASE_URL + "/note/" + text);
    return await res.json();
}
export  async function getAllNotes():Promise<Note[]> {
    const res = await fetch(environment.BASE_URL + "/note",{
        cache: "no-cache"
    });
    return await res.json();
}