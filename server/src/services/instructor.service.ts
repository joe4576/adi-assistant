import { BaseService } from "@/services/base.service";
import { z } from "zod";

export const instructorSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const instructorSchemaArray = z.array(instructorSchema);

export type Instructor = z.infer<typeof instructorSchema>;

export class InstructorService extends BaseService {
  public async getAllInstructors(): Promise<Instructor[]> {
    const instructorsSnapshot = await this.db.collection("instructors").get();

    return instructorSchemaArray.parse(
      instructorsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    );
  }

  public async getInstructorById(id: string): Promise<Instructor | undefined> {
    const instructorDoc = await this.db.collection("instructors").doc(id).get();

    if (!instructorDoc.exists) {
      return undefined;
    }

    return instructorSchema.parse({
      id: instructorDoc.id,
      ...instructorDoc.data(),
    });
  }
}
