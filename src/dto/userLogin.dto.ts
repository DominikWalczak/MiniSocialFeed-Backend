import type { UserLogin } from "@prisma/client";

export class UserLoginDto {
    constructor(
        public userId: number,
    ) {

    }

    static fromPrismaUserLogin = ({userId}: UserLogin) => {
        return new UserLoginDto(
            userId,
        )
    }
}