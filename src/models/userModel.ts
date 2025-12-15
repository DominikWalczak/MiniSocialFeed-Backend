import { db } from "../db/db.js";

// klasa z modelami wykonującymi żądania do bazy danych
class UserModel {
  public async findByEmail(email: string) {
    return db.user.findUnique({
      where: {email},
    });
  }
}

export const userModel = new UserModel();