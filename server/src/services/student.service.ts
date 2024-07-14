import { z } from "zod";
import { BaseService } from "@server/services/base.service";

// id should be in the schema, but it is not a field that is stored
// in Firestore. The id comes from the document reference.
export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const userArraySchema = z.array(studentSchema);

export type Student = z.infer<typeof studentSchema>;

export class StudentService extends BaseService {
  public async getAllStudents(instructorId: string): Promise<Student[]> {
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
  }): Promise<Student | undefined> {
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

    const student = studentSchema.parse({
      id: studentDoc.id,
      ...studentData,
    });

    return student;
  }

  public async createStudent({
    instructorId,
    student,
  }: {
    instructorId: string;
    student: Student;
  }): Promise<string> {
    const instructorRef = this.db.collection("instructors").doc(instructorId);

    const { id, ...studentData } = student;

    const studentRef = await this.db.collection("students").add({
      ...studentData,
      instructor: instructorRef,
    });

    return studentRef.id;
  }
}
