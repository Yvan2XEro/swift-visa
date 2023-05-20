'use server';

import { Demand } from "@/types";
import { revalidatePath } from 'next/cache';
import { deleteDemand } from "../prisma/demands";

export async function handleDeleteAction({ id }: Demand) {
    await deleteDemand(id)
    revalidatePath("/admin")
}
