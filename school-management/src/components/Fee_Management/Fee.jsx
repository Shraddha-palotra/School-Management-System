import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import add from "../assets/icons/add.svg";
import Ellipse7 from "../assets/images/Ellipse7.png";
import Edit from "../assets/icons/Edit.svg";
import Delete from "../assets/icons/Delete.svg";
import view from "../assets/icons/view.svg";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteFee from "./DeleteFee";

function Fee({isOpen, setIsOpen}) {
  
  const navigate = useNavigate();
  const [ fee, setFee] = useState([]);

  const [searchFeeData, setSearchFeeData] = useState("");

  const[isDeleteClick,setIsDeleteClick] = useState({
    flag:false,
    eachFeeData:{}
  })
 console.log("is delete click",isDeleteClick);

 const deleteHandle = (flag,eachFeeData)=>{
  console.log("delete handle of student called");
  console.log("each student is",eachFeeData);
  setIsDeleteClick({
     flag:flag,
     eachFeeData:eachFeeData,
  })
}
 
const filteredFeeData = fee.filter(
  (fee) =>
    fee.rollNumber.toLowerCase().includes(searchFeeData.toLowerCase()) ||
    fee.studentName.toLowerCase().includes(searchFeeData.toLowerCase()) || 
    fee.fatherName.toLowerCase().includes(searchFeeData.toLowerCase()) ||
    fee.classname.toLowerCase().includes(searchFeeData.toLowerCase()) ||
    fee.quaterlyFee.toLowerCase().includes(searchFeeData.toLowerCase()) ||
    fee.feeStatus.toLowerCase().includes(searchFeeData.toLowerCase()) 
);

 
  useEffect(() => {
    Axios.get("http://localhost:8080/fee/showfees")

      .then((res) => {
        
        console.log(res.data.AllFee);
        if (res.data.AllFee) {
          setFee(res.data.AllFee);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[isDeleteClick]);

  return (
    <>
      
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
                        <h3>Fee</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex">
                    <div className="buttons d-flex">
                      <button
                        onClick={() => navigate("/add-fee")}
                        className="ctr-btn"
                      >
                        <img src={add} alt="" />
                      </button>
                    </div>
                    <input
                      type="text"
                      className="custom-input-field"
                      placeholder="Search Fee's Student"
                      value={searchFeeData}
                      onChange={(e) => setSearchFeeData(e.target.value)}
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
                            <th scope="col">Father's Name</th>
                            <th scope="col">Class</th>
                            <th scope="col">Quaterly Fee</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {filteredFeeData.map((items, index) => (
                            <tr key={index} >
                              <td>{items.rollNumber}</td>
                              <td>
                                <span className="d-flex align-items-center cusProfileCir">
                                {/* <img src={Ellipse7} alt="" /> */}
                                <img src={items.profileImage ? `http://localhost:8080${items.profileImage}` :Ellipse7 } alt=" " />
                                <span>{items.studentName}</span>
                                </span>
                              </td>
                              <td>{items.fatherName}</td>
                              <td>{items.classname}</td>
                              <td>{items.quaterlyFee}</td>
                              <td>{items.feeStatus}</td>
                              <td>
                                <div className="action-btn">
                                  <button
                                    onClick={() => {
                                      navigate("/edit-fee",{ state: {items} })
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
                                      navigate("/view-fee",{state: {items}});
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
            <DeleteFee
         data={{ isDeleteClick, deleteHandle}}
          />
          </div>
        </div>
    </>
  );
}

export default Fee;
