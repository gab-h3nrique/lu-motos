import prisma from "@/databases/prisma";
import { UserModel } from "@/models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

// 200 OK
// 201 Created
// 202 Accepted
// 203 Non-Authoritative Information
// 204 No Content
// 205 Reset Content
// 206 Partial Content

// 400 Bad Request
// 401 Unauthorized
// 402 Payment Required
// 403 Forbidden
// 405 Method Not Allowed
// 406 Not Acceptable
// 429 Too Many Requests
// 500 Internal Server Error
// 501 Not Implemented
// 502 Bad Gateway
// 503 Service Unavailable


export async function GET(req: Request) {

    return new Response( JSON.stringify({ message: 'Not authenticated.' } ) , { status: 401 });

}
export async function POST(request: Request) {

    return new Response( JSON.stringify({ message: 'Not authenticated.' } ) , { status: 401 });

}
export async function PUT(request: Request) {

    return new Response( JSON.stringify({ message: 'Not authenticated.' } ) , { status: 401 });

}
export async function DELETE(request: Request) {

    return new Response( JSON.stringify({ message: 'Not authenticated.' } ) , { status: 401 });

}