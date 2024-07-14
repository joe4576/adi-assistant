import { z } from "zod";
import { BaseService } from "@/services/base.service";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const userArraySchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;

export class UserService extends BaseService {
  private get collection() {
    return this.db.collection("users");
  }

  public async getAllUsers(): Promise<User[]> {
    const usersSnapshot = await this.collection.get();

    return userArraySchema.parse(
      usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    );
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const userDoc = await this.collection.doc(id).get();

    if (!userDoc.exists) {
      return undefined;
    }

    return userSchema.parse({
      id: userDoc.id,
      ...userDoc.data(),
    });
  }
}
