const bcrypt = require('bcrypt');
const fs = require('fs').promises; 
const path = require('path'); 
const process = require('process');
const numberOfUserToCreate = 521; // Número de usuarios a generar
const fileNameOutput = 'test_users.csv'; // Nombre del archivo de salida con los usuarios generados

// --- Funciones Auxiliares ---

// Modificamos generateRandomString para que el segundo argumento sea el conjunto de caracteres
function generateRandomString(length, characters) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generatePhoneNumber() {
    // Genera un número de teléfono en el formato "+56912345678"
    // "+569" es fijo, seguido de 8 dígitos aleatorios.
    // Usamos '0123456789' para asegurar que solo se generen dígitos.
    const digits = generateRandomString(8, '0123456789'); 
    return `+569${digits}`;
}

// --- Generación de Datos de Usuarios ---

async function generateTestUsers(numUsers) {
    const users = [];
    const usedUsernames = new Set();
    const usedEmails = new Set();
    const saltRounds = 10; 

    for (let i = 0; i < numUsers; i++) {
        // Generar Username único
        let username;
        do {
            const usernamePrefix = generateRandomString(6, 'abcdefghijklmnopqrstuvwxyz0123456789'); // Aquí usamos letras y números
            username = `testuser_${usernamePrefix}`;
        } while (usedUsernames.has(username));
        usedUsernames.add(username);

        // Generar Email único
        let email;
        do {
            const emailPrefix = generateRandomString(8, 'abcdefghijklmnopqrstuvwxyz0123456789'); // Aquí también
            email = `${emailPrefix}@empresa.com`;
        } while (usedEmails.has(email));
        usedEmails.add(email);

        // Generar Número de Teléfono
        const phoneNumber = generatePhoneNumber(); 

        // Contraseña simple para la prueba
        const plainPassword = "password123!"; 

        // Generar hash bcrypt de forma asíncrona
        const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

        users.push({
            username: username,
            password_hash: passwordHash,
            email: email,
            phone_number: phoneNumber 
        });
    }
    return users;
}

// --- Función para escribir a CSV ---

async function writeUsersToCsv(users, filename = 'test_users.csv') {
    const filePath = path.join(process.cwd(), filename); 
    let csvContent = "username,password_hash,email,phone_number\n"; 

    users.forEach(user => {
        csvContent += `"${user.username}","${user.password_hash}","${user.email}","${user.phone_number}"\n`;
    });

    try {
        await fs.writeFile(filePath, csvContent, 'utf8');
        console.log(`\nArchivo CSV "${filename}" generado exitosamente en: ${filePath}`);
    } catch (error) {
        console.error(`Error al escribir el archivo CSV: ${error.message}`);
    }
}

// --- Ejecución Principal del Script ---

async function main() {
    const numUsersToGenerate = numberOfUserToCreate; // Número de usuarios a generar 
    console.log(`Generando ${numUsersToGenerate} usuarios de prueba...`);
    
    const testUsers = await generateTestUsers(numUsersToGenerate);
    await writeUsersToCsv(testUsers, fileNameOutput); 
}

main();