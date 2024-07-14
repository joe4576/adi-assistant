import { z } from "zod";
import { BaseService } from "@/services/base.service";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const userArraySchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;

export class StudentService extends BaseService {
  public async getAllStudents(instructorId: string): Promise<User[]> {
    const instructorRef = this.db.collection("instructors").doc(instructorId);

    const studentsSnapshot = await this.db
      .collection("students")
      .where("instructor", "==", instructorRef)
      .get();

    return userArraySchema.parse(
      studentsSnapshot.docs.map((student) => ({
        id: student.id,
        ...student.data(),
      })),
    );
  }

  public async getStudentById({
    studentId,
    instructorId,
  }: {
    studentId: string;
    instructorId: string;
  }): Promise<User | undefined> {
    const instructorRef = this.db.collection("instructors").doc(instructorId);

    const studentDoc = await this.db
      .collection("students")
      .doc(studentId)
      .get();

    if (!studentDoc.exists) {
      return undefined;
    }

    const studentData = studentDoc.data();

    if (studentData?.instructor?.id !== instructorRef.id) {
      return undefined;
    }

    const student = userSchema.parse({
      id: studentDoc.id,
      ...studentData,
    });

    return student;
  }
}
