import { Demand } from "@/types";
import prisma from ".";

export async function createDemand(demand: Demand) {
    try {
        const demandFromDb = await prisma.demand.create({ data: demand as any });
        return { demand: demandFromDb as Demand }
    } catch (error) {
        console.log(error)
        return { error }
    }
}

export async function findAll() {
    try {
        const demandFromDb = await prisma.demand.findMany()
        return { demandFromDb }
    } catch (error) {
        console.log(error)
        return { error }
    }
}

export async function findDemand(id: any) {
    try {
        const demandFromDb = await prisma.demand.findUnique({
            where: { id }
        });
        return { demand: demandFromDb as Demand }
    } catch (error) {
        return { error }
    }
}
export async function findDemandByEmail(email: any) {
    try {
        const demandFromDb = await prisma.demand.findUnique({
            where: { email }
        });
        return { demand: demandFromDb as Demand }
    } catch (error) {
        return { error }
    }
}
export async function updateDemand(id: any, data: Demand) {
    try {
        const demandFromDb = await prisma.demand.update({
            where: { id },
            data: data as any
        });
        return { demand: demandFromDb as Demand }
    } catch (error) {
        return { error }
    }
}

export async function deleteDemand(id: any) {
    try {
        await prisma.demand.delete({
            where: { id },
        });
        return { success: true }
    } catch (error) {
        return { error }
    }
}
