import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import add from "../assets/icons/add.svg";
import Ellipse7 from "../assets/images/Ellipse7.png";
import Edit from "../assets/icons/Edit.svg";
import Delete from "../assets/icons/Delete.svg";
import view from "../assets/icons/view.svg";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import  Axios  from "axios";
import DeleteStudents from "../Student_Management/DeleteStudents";

function Students({isOpen, setIsOpen}) {

  const navigate = useNavigate();
  const [ student, setStudent] = useState([]);
  const [ searchStudent , setSearchStudent ] = useState("");
   const[isDeleteClick,setIsDeleteClick] = useState({
     flag:false,
     eachStudent:{}
   })
  console.log("is delete click",isDeleteClick);
  

 const deleteHandle = (flag,eachStudent)=>{
     console.log("delete handle of student called");
     console.log("each student is",eachStudent);
     setIsDeleteClick({
        flag:flag,
        eachStudent:eachStudent
     })
 }

  const filteredStudents = student.filter(
    (student) =>
      student.rollNumber.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.studentName.toLowerCase().includes(searchStudent.toLowerCase()) || 
      student.fatherName.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.classname.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.phoneNumber.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.gender.toLowerCase().includes(searchStudent.toLowerCase())
  );


  useEffect(() => {
    Axios.get("http://localhost:8080/student/showstudents")
      .then((response) => {
        console.log(response.data.AllStudents);
        console.log(response.data.status);
        if (response.data.status) {
          setStudent(response.data.AllStudents);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[isDeleteClick]);

  return (
    <>
      <div className="wapper">
        <Sidebar isOpen={isOpen} />
        <div className={`main-container ${isOpen && "main-content_large"}`}>
          <HeaderDash isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="content">
            <div className="row mb-3">
              <div className="col-xxl-12">
                <div className="row justify-content-between align-items-center mb-3">
                  <div className="col-lg-4">
                    <div className="greetingsText">
                      <div className="greetingsText-heading">
                        <h3>Student's</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex">
                    <div className="buttons d-flex">
                      <button
                        onClick={() => navigate("/add-student")}
                        className="ctr-btn"
                      >
                        <img src={add} alt="" />
                      </button>
                    </div>
                    <input
                      type="text"
                      className="custom-input-field"
                      placeholder="Search Student"
                      value={searchStudent}
                      onChange={(e) => setSearchStudent(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xxl-12">
                    <div className="table-responsive">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th scope="col">Roll Number</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Father Name </th>
                            {/* <th scope="col">Date of Birth</th> */}
                            <th scope="col">Class</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                         <tbody>
                         
                           {filteredStudents.map((items, index) => (
                            <tr key={index} >
                              <td>{items.rollNumber}</td>
                              <td>
                                <span className="d-flex align-items-center cusProfileCir">
                                {/* <img src={Ellipse7} alt="" /> */}
                                <img src={items.profileImage ? `http://localhost:8080${items.profileImage}` : Ellipse7 } alt=" " />
                                <span>{items.studentName}</span>
                                </span>
                              </td>
                              <td>{items.fatherName}</td>
                              {/* <td>{items.dateOfBirth}</td> */}
                              <td>{items.classname}</td>
                              <td>{items.phoneNumber}</td>
                              <td>{items.gender}</td>
                              <td>
                                <div className="action-btn">
                                  <button
                                    onClick={() => {
                                      navigate("/edit-students",{ state: {items} })
                                    }} 
                                  >
                                    <img src={Edit} alt="Edit" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      deleteHandle(true, items);
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    <img src={Delete} alt="Delete" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      navigate("/view-students",{state: {items}});
                                    }}
                                  >
                                    <img src={view} alt="View" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DeleteStudents
         data={{ isDeleteClick, deleteHandle}}
          />
        </div>
      </div>
    </>
  );
}

export default Students;
