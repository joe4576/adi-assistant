import { AddStudentModal } from "@client/components/modals/AddStudentModal";
import { useIonModal } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { Student, studentSchema } from "@server/services/student.service";
import api from "@client/api";

export const useAddStudentModal = () => {
  const createStudent = api.student.createStudent.useMutation();

  const utils = api.useUtils();

  const tryCreateStudent = async (student: Student): Promise<boolean> => {
    try {
      const validatedStudent = studentSchema.parse(student);

      const studentId = await createStudent.mutateAsync(validatedStudent);
      await utils.student.getAllStudents.invalidate();

      console.log(studentId);

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  const [present, dismiss] = useIonModal(AddStudentModal, {
    dismiss: async (student: Student, role: string) => {
      if (role !== "confirm") {
        dismiss({ student, role });
        return;
      }

      const studentCreated = await tryCreateStudent(student);

      if (studentCreated) {
        dismiss({ student, role });
      }
    },
  });

  const openModal = () => {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          // setMessage(`Hello, ${ev.detail.data}!`);
        }
      },
    });
  };

  return {
    openModal,
  };
};
