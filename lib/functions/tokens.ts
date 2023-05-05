import jwt from "jsonwebtoken"
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export const JWT_KEY = 'votre_clé_secrète'

export function generateExpirableToken(id: any) {
    const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 7200, id }, // Expire après 2 heures (2 * 60 * 60 secondes)
        JWT_KEY
    );
    return token
}

export function idByToken(token: string) {
    if (getExpirationDateTime(token) < new Date()) {
        return null
    }
    const decoded = jwt.verify(token, JWT_KEY);
    return (decoded as any).id as string
}

export function getExpirationDateTime(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        const expirationTimestamp = (decoded as any).exp * 1000; // Convertir l'expiration du token en millisecondes
        const expirationDate = new Date(expirationTimestamp);
        return expirationDate;
    } catch (error) {
        return new Date(4)
    }
}

