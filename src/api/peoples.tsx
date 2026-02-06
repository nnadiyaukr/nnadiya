const usersDatabase = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 28 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 29 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 35 },
];

// Получить всех пользователей
export function fetchAll() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...usersDatabase]);
        }, 1000);
    });
}

// Получить пользователей по имени
export async function fetchAllByName(searchName) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!searchName || !searchName.trim()) {
                resolve([...usersDatabase]);
                return;
            }

            const filteredUsers = usersDatabase.filter((user) =>
                user.name.toLowerCase().includes(searchName.toLowerCase())
            );

            resolve(filteredUsers);
        }, 10);
    });
}
