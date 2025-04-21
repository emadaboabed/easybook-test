import axios from "axios";
import { getAuthToken } from "./auth";

const API_URL = "https://taxiapp.easybooks.me:8288";

// Type definitions based on the Swagger documentation
export interface TranslationDto {
  name: string;
  cultureCode: number;
}

export interface GradeDto {
  id: string;
  translations: TranslationDto[];
}

export interface GenderDto {
  id: string;
  translations: TranslationDto[];
}

export interface StudentDto {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  grade: GradeDto;
  gender: GenderDto;
  country: string;
  city: string;
  phone: string;
  remarks: string;
}

export interface AddStudentDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  grade: string;
  gender: string;
  country: string;
  city: string;
  phone: string;
  remarks: string;
}

export interface EditStudentDto extends AddStudentDto {
  id: string;
}

export interface BulkStudentDto {
  deleteId?: string[];
  addedStudent?: AddStudentDto[];
  editedStudent?: EditStudentDto[];
}

// Create an axios instance with auth header
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add auth token to every request
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const studentService = {
  // Get all students
  getAllStudents: async (): Promise<StudentDto[]> => {
    try {
      const response = await apiClient.get("/Student/GetAll");
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },

  // Get student by ID
  getStudentById: async (id: string): Promise<StudentDto> => {
    try {
      const response = await apiClient.get(`/Student/GetyId?Id=${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching student with ID ${id}:`, error);
      throw error;
    }
  },

  // Bulk operations for students (add, edit, delete)
  bulkOperations: async (data: BulkStudentDto): Promise<any> => {
    try {
      const response = await apiClient.post("/Student/Bulk", data);
      return response.data;
    } catch (error) {
      console.error("Error performing bulk operations:", error);
      throw error;
    }
  },

  // Helper methods
  addStudent: async (student: AddStudentDto): Promise<any> => {
    return studentService.bulkOperations({ addedStudent: [student] });
  },

  editStudent: async (student: EditStudentDto): Promise<any> => {
    return studentService.bulkOperations({ editedStudent: [student] });
  },

  deleteStudents: async (ids: string[]): Promise<any> => {
    return studentService.bulkOperations({ deleteId: ids });
  },

  // Get all grades
  getAllGrades: async (): Promise<GradeDto[]> => {
    try {
      const response = await apiClient.get("/Settings/GetAllGrades");
      return response.data;
    } catch (error) {
      console.error("Error fetching grades:", error);
      throw error;
    }
  },

  // Get all genders
  getAllGenders: async (): Promise<GenderDto[]> => {
    try {
      const response = await apiClient.get("/Settings/GetAllGenders");
      return response.data;
    } catch (error) {
      console.error("Error fetching genders:", error);
      throw error;
    }
  },
};

export default studentService;
