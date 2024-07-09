import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import add from "../assets/icons/add.svg";
import Ellipse7 from "../assets/images/Ellipse7.png";
import Edit from "../assets/icons/Edit.svg";
import Delete from "../assets/icons/Delete.svg";
import view from "../assets/icons/view.svg";
import { useNavigate } from "react-router-dom";
import Axios  from "axios";
import DeleteStaff from "./DeleteStaff";

function Staff({isOpen, setIsOpen}) {
  const navigate = useNavigate();

  const [staff, setStaff] = useState([]);
  const [ searchStaff , setSearchStaff ] = useState("");
   const[isDeleteClick,setIsDeleteClick] = useState({
     flag:false,
     eachStaff:{}
   })
  console.log("is delete click",isDeleteClick);

  const deleteHandle = (flag, eachStaff) => {
       setIsDeleteClick({
        flag:flag,
        eachStaff:eachStaff
       })
  }

  const filteredStaff = staff.filter(
    (staff) =>
      staff.staffName.toLowerCase().includes(searchStaff.toLowerCase()) || 
      staff.staffPosition.toLowerCase().includes(searchStaff.toLowerCase()) ||
      staff.joinDate.toLowerCase().includes(searchStaff.toLowerCase()) ||
      staff.salary.toLowerCase().includes(searchStaff.toLowerCase()) ||
      staff.phoneNumber.toLowerCase().includes(searchStaff.toLowerCase()) ||
      staff.gender.toLowerCase().includes(searchStaff.toLowerCase())
  ); 
  console.log(filteredStaff)


  useEffect( () => {
    Axios.get("http://localhost:8080/staff/showstaffs")
    .then((response) => {
      console.log(response.data.status)
      if(response.data.status) {
            setStaff(response.data.AllStaff)
      }
    })
    .catch((err) => {
      console.log(err)
    })
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
                        <h3>Staff</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex">
                    <div className="buttons d-flex">
                      <button
                        onClick={() => navigate("/add-staff")}
                        className="ctr-btn"
                      >
                        <img src={add} alt="" />
                      </button>
                    </div>
                    <input
                      type="text"
                      className="custom-input-field"
                      placeholder="Search Staff"
                      value={searchStaff}
                      onChange={(e) => setSearchStaff(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xxl-12">
                    <div className="table-responsive">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Staff Name</th>
                            <th scope="col">Staff Position</th>
                            <th scope="col">Join Date</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {filteredStaff.map((items, index) => (
                            <tr key={index} >
                              <td>{index + 1}</td>
                              <td>
                                <span className="d-flex align-items-center cusProfileCir">
                                {/* <img src={Ellipse7} alt="" /> */}
                                <img src={items.profileImage ? `http://localhost:8080${items.profileImage}` :Ellipse7 } alt=" " />
                                <span>{items.staffName}</span>
                                </span>
                              </td>
                              <td>{items.staffPosition}</td>
                              <td>{items.joinDate}</td>
                              <td>{items.gender}</td>
                              <td>{items.salary}</td>
                              <td>{items.phoneNumber}</td>
                              
                              <td>
                                <div className="action-btn">
                                  <button
                                    onClick={() => {
                                      navigate("/edit-staffs",{ state: {items} })
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
                                      navigate("/view-staffs",{state: {items}});
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
          <DeleteStaff
          data={{ isDeleteClick, deleteHandle}}
          />
        </div>
      </div>
    </>
  );
}

export default Staff;
