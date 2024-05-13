interface User {
    id: string,
    email: string,
    name: string,
    status: string,
    role: Role
}

interface Role {
    id: string,
    name: string,
}