import { create } from "zustand";
import {mountStoreDevtool} from "simple-zustand-devtools"

export interface StudentDetails {
	matric_number: string;
    password: string
}

interface StudentDetailsStore {
	studentDetails: StudentDetails; 
	setUserDetails: (studentDetails: Partial<StudentDetails>) => void;
}

const useStudentDetailsStore = create<StudentDetailsStore>((set) => ({
	studentDetails: localStorage.getItem("studentDetails")
		? JSON.parse(localStorage.getItem("studentDetails")!)
		: {
            matric_number: '',
            password: ''
		  },
	setUserDetails: (studentDetails: Partial<StudentDetails>) => set((state) => ({ studentDetails: { ...state.studentDetails, ...studentDetails } })),
}));


if(process.env.NODE_ENV){
    mountStoreDevtool('Student: ', useStudentDetailsStore)
}
export default useStudentDetailsStore;
