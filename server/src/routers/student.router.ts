import { instructorProcedure, protectedProcedure, router } from "@server/trpc";
import {
  StudentService,
  studentSchema,
} from "@server/services/student.service";
import { z } from "zod";

export const studentRouter = router({
  getAllStudents: instructorProcedure.query(async ({ ctx }) => {
    const studentService = new StudentService(ctx);

    return await studentService.getAllStudents(ctx.instructorId);
  }),
  getStudentById: instructorProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const studentService = new StudentService(ctx);

      return await studentService.getStudentById({
        studentId: input,
        instructorId: ctx.instructorId,
      });
    }),
  createStudent: instructorProcedure
    .input(studentSchema)
    .mutation(async ({ input, ctx }) => {
      const studentService = new StudentService(ctx);

      const studentId = await studentService.createStudent({
        student: input,
        instructorId: ctx.instructorId,
      });

      return studentId;
    }),
});
