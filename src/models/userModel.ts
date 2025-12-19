import { db } from "../db/db.js";

// klasa z modelami wykonującymi żądania do bazy danych
export class UserModel {
  public async findByEmail(email: string) {
    return await db.userLogin.findUnique({
      where: {email},
    });
  }
  public async saveRefreshToken(userId: number, token: string, expiresAt: Date){
    return await db.refreshToken.create({
      data: {
        userId: userId,
        tokenHash: token,
        expiresAt: expiresAt,
      }
    });
  }
  public async findRefreshToken(token: string) {
    return await db.refreshToken.findFirst({
      where: {
        tokenHash: token,
        revokedAt: null, // tylko ważne tokeny
      }
    });
  }
  public async revokeRefreshToken(token: string) {
    return await db.refreshToken.updateMany({
      where: { tokenHash: token },
      data: { revokedAt: new Date() }
    });
  }
}