import { instructorProcedure, protectedProcedure, router } from "@/trpc";
import { StudentService, userSchema } from "@/services/student.service";
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
  createUser: protectedProcedure
    .input(userSchema)
    .mutation(async ({ input }) => {
      // users.push(input);
      return input;
    }),
});
