import type { UserLogin } from "@prisma/client";

export class UserLoginDto {
    constructor(
        public userId: number,
        public email: string,
    ) {

    }

    static fromPrismaUserLogin = ({userId, email}: UserLogin) => {
        return new UserLoginDto(
            userId,
            email,
        )
    }
}