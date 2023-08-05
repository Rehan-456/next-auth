import fs from 'fs'
import path from 'path'
import {compare, hash} from 'bcryptjs'
const filePath = path.join(process.cwd(),"src","database","users.json")
import React, { useState } from 'react';


export function getAll(){
    const data =fs.readFileSync(filePath)
    return JSON.parse(data);
}

export function getById(id){
    const data = getAll()
    return data.find(user => user.id === Number(id))
}

export function getByEmail(email){
    const data = getAll()
    return data.find(user => user.email.toLowerCase() === email.toLowerCase() )
}

export async function verifyPassword(hashedpassword,password){
    const isValid = await compare(password,hashedpassword)
    return isValid
}

export async function save (email, password){
    const found = getByEmail(email)
    if(found){
        
        throw new Error( "User already exist")
    }

    const data =  getAll()
    const hashedpassword = await hash(password,12)
    console.log(data)
    data.push({
        id : data.length +1,
        email,password : hashedpassword
    });
    fs.writeFileSync(filePath, JSON.stringify(data))
}