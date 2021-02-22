export { default as Footer } from '../../components/footer.vue'
export { default as SideBar } from '../../components/admin/sideBar.vue'
export { default as Profile } from '../../components/user/profile.vue'
export { default as ResultCard } from '../../components/user/resultCard.vue'
export { default as ResultMenu } from '../../components/user/resultMenu.vue'
export { default as ScheduleDetails } from '../../components/user/scheduleDetails.vue'
export { default as Schedules } from '../../components/user/schedules.vue'
export { default as GenerateMenu } from '../../components/admin/result/generateMenu.vue'
export { default as GeneratedSheet } from '../../components/admin/result/generatedSheet.vue'
export { default as GetSheet } from '../../components/admin/result/getSheet.vue'
export { default as DetailDialog } from '../../components/admin/schedule/detailDialog.vue'
export { default as EditDialog } from '../../components/admin/schedule/editDialog.vue'
export { default as ScheduleForm } from '../../components/admin/schedule/scheduleForm.vue'
export { default as DeleteFaculty } from '../../components/admin/list/deleteFaculty.vue'
export { default as DeleteSelectedFaculty } from '../../components/admin/list/deleteSelectedFaculty.vue'
export { default as DeleteSelectedStudent } from '../../components/admin/list/deleteSelectedStudent.vue'
export { default as DeleteStudent } from '../../components/admin/list/deleteStudent.vue'
export { default as FacultyForm } from '../../components/admin/list/facultyForm.vue'
export { default as FacultyTable } from '../../components/admin/list/facultyTable.vue'
export { default as StudentForm } from '../../components/admin/list/studentForm.vue'
export { default as StudentTable } from '../../components/admin/list/studentTable.vue'

export const LazyFooter = import('../../components/footer.vue' /* webpackChunkName: "components/footer" */).then(c => c.default || c)
export const LazySideBar = import('../../components/admin/sideBar.vue' /* webpackChunkName: "components/admin/sideBar" */).then(c => c.default || c)
export const LazyProfile = import('../../components/user/profile.vue' /* webpackChunkName: "components/user/profile" */).then(c => c.default || c)
export const LazyResultCard = import('../../components/user/resultCard.vue' /* webpackChunkName: "components/user/resultCard" */).then(c => c.default || c)
export const LazyResultMenu = import('../../components/user/resultMenu.vue' /* webpackChunkName: "components/user/resultMenu" */).then(c => c.default || c)
export const LazyScheduleDetails = import('../../components/user/scheduleDetails.vue' /* webpackChunkName: "components/user/scheduleDetails" */).then(c => c.default || c)
export const LazySchedules = import('../../components/user/schedules.vue' /* webpackChunkName: "components/user/schedules" */).then(c => c.default || c)
export const LazyGenerateMenu = import('../../components/admin/result/generateMenu.vue' /* webpackChunkName: "components/admin/result/generateMenu" */).then(c => c.default || c)
export const LazyGeneratedSheet = import('../../components/admin/result/generatedSheet.vue' /* webpackChunkName: "components/admin/result/generatedSheet" */).then(c => c.default || c)
export const LazyGetSheet = import('../../components/admin/result/getSheet.vue' /* webpackChunkName: "components/admin/result/getSheet" */).then(c => c.default || c)
export const LazyDetailDialog = import('../../components/admin/schedule/detailDialog.vue' /* webpackChunkName: "components/admin/schedule/detailDialog" */).then(c => c.default || c)
export const LazyEditDialog = import('../../components/admin/schedule/editDialog.vue' /* webpackChunkName: "components/admin/schedule/editDialog" */).then(c => c.default || c)
export const LazyScheduleForm = import('../../components/admin/schedule/scheduleForm.vue' /* webpackChunkName: "components/admin/schedule/scheduleForm" */).then(c => c.default || c)
export const LazyDeleteFaculty = import('../../components/admin/list/deleteFaculty.vue' /* webpackChunkName: "components/admin/list/deleteFaculty" */).then(c => c.default || c)
export const LazyDeleteSelectedFaculty = import('../../components/admin/list/deleteSelectedFaculty.vue' /* webpackChunkName: "components/admin/list/deleteSelectedFaculty" */).then(c => c.default || c)
export const LazyDeleteSelectedStudent = import('../../components/admin/list/deleteSelectedStudent.vue' /* webpackChunkName: "components/admin/list/deleteSelectedStudent" */).then(c => c.default || c)
export const LazyDeleteStudent = import('../../components/admin/list/deleteStudent.vue' /* webpackChunkName: "components/admin/list/deleteStudent" */).then(c => c.default || c)
export const LazyFacultyForm = import('../../components/admin/list/facultyForm.vue' /* webpackChunkName: "components/admin/list/facultyForm" */).then(c => c.default || c)
export const LazyFacultyTable = import('../../components/admin/list/facultyTable.vue' /* webpackChunkName: "components/admin/list/facultyTable" */).then(c => c.default || c)
export const LazyStudentForm = import('../../components/admin/list/studentForm.vue' /* webpackChunkName: "components/admin/list/studentForm" */).then(c => c.default || c)
export const LazyStudentTable = import('../../components/admin/list/studentTable.vue' /* webpackChunkName: "components/admin/list/studentTable" */).then(c => c.default || c)
