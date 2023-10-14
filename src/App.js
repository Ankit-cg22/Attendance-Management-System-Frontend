import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import AttendanceReport from './components/AttendanceReport/AttendanceReport';
import StudentDataUpdateForm from './components/StudentDataUpdateForm/StudentDataUpdateForm';
import CourseList from './components/CourseList/CourseList';
import StudentAttendance from './components/StudentAttendance/StudentAttendance';
import AddAdmin from './components/AddAdmin/AddAdmin';
import CourseAddForm from './components/CourseAddForm/CourseAddForm';
import MarkAttendance from './components/MarkAttendance/MarkAttendance';
import EnrollStudent from './components/EnrollStudent/EnrollStudent';
import StudentEnrollment from './components/StudentEnrollment/StudentEnrollment';
import EvictStudent from './components/EvictStudent/EvictStudent';
import StudentEviction from './components/StudentEviction/StudentEviction';
import { AppContextProvider } from './AppContext';
import EnrollmentCount from './components/Statistics/EnrollmentCount';
import StudentWiseAttendanceCount from './components/Statistics/StudentWiseAttendanceCount';
import CourseWiseAttendaceCount from './components/Statistics/CourseWiseAttendance';
import CourseWiseStudentAttendanceInAMonth from './components/Statistics/CourseWiseStudentAttendanceInAMonth';
import AttendanceDaysHighlight from './components/AttendanceDaysHighlight/AttendanceDaysHighlight';
import Home from './components/Home/Home';
import PastDayAttendance from './components/PastDayAttendance/PastDayAttendance';
function App() {
  return (
    <div>
      <AppContextProvider>
        <Router>
          <Navbar/>
          <Routes >
            <Route exact path="/" Component={Home}/>
            <Route exact path="/register" Component={Register} />
            <Route exact path="/login" Component={Login}/>
            <Route exact path="/student/report" element={
                <Sidebar ChildComponent={AttendanceReport}/>
            }
            />
            <Route exact path="/student/attendanceHeatMap" element={
                <Sidebar ChildComponent={AttendanceDaysHighlight}/>
            }
            />
            <Route exact path="/student/updateData" element={
                <Sidebar ChildComponent={StudentDataUpdateForm}/>
            }
            />
            <Route exact path="/parent/report" element={
                <Sidebar ChildComponent={AttendanceReport}/>
            }
            />
            <Route exact path="/admin/markAttendance" element={
                <Sidebar ChildComponent={MarkAttendance}/>
            }
            />
            <Route  path="/admin/markAttendance/course/:courseId/:courseTitle" element={
                <Sidebar ChildComponent={StudentAttendance}/>
            }/>
            <Route  path="/admin/addAdmin" element={
                <Sidebar ChildComponent={AddAdmin}/>
            }/>
            <Route  path="/admin/addCourse" element={
                <Sidebar ChildComponent={CourseAddForm}/>
            }/>
            <Route  path="/admin/enroll" element={
                <Sidebar ChildComponent={EnrollStudent}/>
            }/>
            <Route  path="/admin/enrollStudent/course/:courseId/:courseTitle" element={
                <Sidebar ChildComponent={StudentEnrollment}/>
            }/>
            <Route  path="/admin/evict" element={
                <Sidebar ChildComponent={EvictStudent}/>
            }/>
            <Route  path="/admin/evictStudent/course/:courseId/:courseTitle" element={
                <Sidebar ChildComponent={StudentEviction}/>
            }/>
            <Route  path="/admin/statistics/enrollment" element={
                <Sidebar ChildComponent={EnrollmentCount} update={true} />
            }/>
            <Route  path="/admin/statistics/student" element={
                <Sidebar ChildComponent={StudentWiseAttendanceCount}/>
            }/>
            <Route  path="/admin/statistics/course" element={
                <Sidebar ChildComponent={CourseWiseAttendaceCount}/>
            }/>
            <Route  path="/admin/statistics/student-course" element={
                <Sidebar ChildComponent={CourseWiseStudentAttendanceInAMonth}/>
            }/>
            <Route  path="/admin/attendanceCorrection" element={
                <Sidebar ChildComponent={PastDayAttendance}/>
            }/>

            {/* <Route exact path="" Component={}/> */}
            {/* <Route exact path="" Component={}/> */}
          </Routes>
        </Router>
      </AppContextProvider>
      </div>
  );
}

export default App;
