"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import studentService, {
  StudentDto,
  GradeDto,
  GenderDto,
  AddStudentDto,
  EditStudentDto,
} from "@/services/stydents";
import { getAuthToken } from "@/services/auth";
import { useRouter } from "next/navigation";
import axios from "axios";

type StudentContextType = {
  students: StudentDto[];
  grades: GradeDto[];
  genders: GenderDto[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  addStudent: (student: AddStudentDto) => Promise<void>;
  editStudent: (student: EditStudentDto) => Promise<void>;
  deleteStudents: (ids: string[]) => Promise<void>;
  bulkOperations: (operations: {
    deleteIds?: string[];
    addStudents?: AddStudentDto[];
    editStudents?: EditStudentDto[];
  }) => Promise<void>;
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [state, setState] = useState<{
    students: StudentDto[];
    grades: GradeDto[];
    genders: GenderDto[];
    loading: boolean;
    error: string | null;
    initialized: boolean;
  }>({
    students: [],
    grades: [],
    genders: [],
    loading: true,
    error: null,
    initialized: false,
  });

  const fetchInitialData = async (retry = true) => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.log("No auth token found, redirecting to login");
        router.push("/login");
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      const [grades, genders, students] = await Promise.all([
        studentService.getAllGrades(),
        studentService.getAllGenders(),
        studentService.getAllStudents(),
      ]);

      setState((prev) => ({
        ...prev,
        grades,
        genders,
        students,
        initialized: true,
        error: null,
      }));
    } catch (error) {
      console.error("Failed to load initial data:", error);
      if (retry) {
        console.log("Retrying data fetch...");
        setTimeout(() => fetchInitialData(false), 1000);
        return;
      }
      setState((prev) => ({
        ...prev,
        error:
          "Failed to load initial data. Please reload the page or check your connection.",
      }));
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const refreshData = () => fetchInitialData();

  const handleOperation = async (
    operation: () => Promise<void>,
    errorMessage: string
  ) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await operation();
      await fetchInitialData(false);
    } catch (error) {
      setState((prev) => ({ ...prev, error: errorMessage }));
      console.error(error);
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const addStudent = (student: AddStudentDto) =>
    handleOperation(
      () => studentService.addStudent(student),
      "Failed to add student"
    );

  const editStudent = (student: EditStudentDto) =>
    handleOperation(
      () => studentService.editStudent(student),
      "Failed to update student"
    );

  const deleteStudents = (ids: string[]) =>
    handleOperation(
      () => studentService.deleteStudents(ids),
      "Failed to delete students"
    );

  const bulkOperations = async (operations: {
    deleteIds?: string[];
    addStudents?: AddStudentDto[];
    editStudents?: EditStudentDto[];
  }) =>
    handleOperation(
      () =>
        studentService.bulkOperations({
          deleteId: operations.deleteIds,
          addedStudent: operations.addStudents,
          editedStudent: operations.editStudents,
        }),
      "Failed to perform bulk operations"
    );

  useEffect(() => {
    // Listen for loginSuccess event to trigger data fetching
    const handleLoginSuccess = () => {
      fetchInitialData();
    };

    window.addEventListener("loginSuccess", handleLoginSuccess);

    // Fetch data on mount if token exists
    if (typeof window !== "undefined" && getAuthToken()) {
      fetchInitialData();
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener("loginSuccess", handleLoginSuccess);
    };
  }, []);

  return (
    <StudentContext.Provider
      value={{
        students: state.students,
        grades: state.grades,
        genders: state.genders,
        loading: state.loading,
        error: state.error,
        refreshData,
        addStudent,
        editStudent,
        deleteStudents,
        bulkOperations,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context)
    throw new Error("useStudents must be used within StudentProvider");
  return context;
};
