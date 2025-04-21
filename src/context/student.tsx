"use client";

import React, {
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

// Define context state type
interface StudentContextType {
  students: StudentDto[];
  grades: GradeDto[];
  genders: GenderDto[];
  loading: boolean;
  error: string | null;
  fetchStudents: () => Promise<void>;
  fetchGrades: () => Promise<void>;
  fetchGenders: () => Promise<void>;
  addStudent: (student: AddStudentDto) => Promise<void>;
  editStudent: (student: EditStudentDto) => Promise<void>;
  deleteStudents: (ids: string[]) => Promise<void>;
  bulkOperations: (operations: {
    deleteIds?: string[];
    addStudents?: AddStudentDto[];
    editStudents?: EditStudentDto[];
  }) => Promise<void>;
}

// Create context with default undefined value
const StudentContext = createContext<StudentContextType | undefined>(undefined);

// Provider component
export const StudentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [students, setStudents] = useState<StudentDto[]>([]);
  const [grades, setGrades] = useState<GradeDto[]>([]);
  const [genders, setGenders] = useState<GenderDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (err) {
      setError("Failed to fetch students");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all grades
  const fetchGrades = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllGrades();
      setGrades(data);
    } catch (err) {
      setError("Failed to fetch grades");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all genders
  const fetchGenders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllGenders();
      setGenders(data);
    } catch (err) {
      setError("Failed to fetch genders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a student
  const addStudent = async (student: AddStudentDto) => {
    setLoading(true);
    setError(null);
    try {
      await studentService.addStudent(student);
      await fetchStudents(); // Refresh the list
    } catch (err) {
      setError("Failed to add student");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Edit a student
  const editStudent = async (student: EditStudentDto) => {
    setLoading(true);
    setError(null);
    try {
      await studentService.editStudent(student);
      await fetchStudents(); // Refresh the list
    } catch (err) {
      setError("Failed to update student");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete students
  const deleteStudents = async (ids: string[]) => {
    setLoading(true);
    setError(null);
    try {
      await studentService.deleteStudents(ids);
      await fetchStudents(); // Refresh the list
    } catch (err) {
      setError("Failed to delete students");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Bulk operations
  const bulkOperations = async (operations: {
    deleteIds?: string[];
    addStudents?: AddStudentDto[];
    editStudents?: EditStudentDto[];
  }) => {
    setLoading(true);
    setError(null);
    try {
      await studentService.bulkOperations({
        deleteId: operations.deleteIds,
        addedStudent: operations.addStudents,
        editedStudent: operations.editStudents,
      });
      await fetchStudents(); // Refresh the list
    } catch (err) {
      setError("Failed to perform bulk operations");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([fetchGrades(), fetchGenders()]);
      await fetchStudents();
    };

    loadInitialData();
  }, []);

  const value = {
    students,
    grades,
    genders,
    loading,
    error,
    fetchStudents,
    fetchGrades,
    fetchGenders,
    addStudent,
    editStudent,
    deleteStudents,
    bulkOperations,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

// Custom hook for using the context
export const useStudents = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
};
