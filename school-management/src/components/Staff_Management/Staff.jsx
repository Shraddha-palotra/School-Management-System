import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import add from "../assets/icons/add.svg";
import Ellipse7 from "../assets/images/Ellipse7.png";
import Edit from "../assets/icons/Edit.svg";
import Delete from "../assets/icons/Delete.svg";
import view from "../assets/icons/view.svg";
import picture from "../assets/images/picture.png";
import { useNavigate } from "react-router-dom";

function Staff({isOpen, setIsOpen}) {
  const navigate = useNavigate();
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
                          <tr>
                            <td>A01</td>
                            <td className="d-flex">
                              <img src={Ellipse7} alt="" />
                              <span>Pooja Patel</span>
                            </td>
                            <td>Senior Teacher</td>
                            <td>11/06/2023</td>
                            <td>Female</td>
                            <td>15000</td>
                            <td>9898765423</td>
                            <td>
                              <div className="action-btn">
                                <button
                                  onClick={() => {
                                    navigate("/edit-transaction");
                                  }}
                                >
                                  <img src={Edit} alt="" />
                                </button>
                                <button
                                  onClick={() => {
                                    navigate(" ");
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  <img src={Delete} alt="" />
                                </button>
                                <button
                                  onClick={() => {
                                    navigate("/view-transaction");
                                  }}
                                >
                                  <img src={view} alt="" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>A02</td>
                            <td className="d-flex">
                              <img src={picture} alt="" />
                              <span>Vijay Sharma</span>
                            </td>
                            <td>Accountent</td>
                            <td>25/07/2022</td>
                            <td>Male</td>
                            <td>40000</td>
                            <td>6266765423</td>
                            <td className="d-flex">
                              <div className="action-btn">
                                <button
                                  onClick={() => {
                                    navigate("/edit-transaction");
                                  }}
                                >
                                  <img src={Edit} alt="" />
                                </button>
                                <button
                                  onClick={() => {
                                    navigate(" ");
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  <img src={Delete} alt="" />
                                </button>
                                <button
                                  onClick={() => {
                                    navigate("/view-transaction");
                                  }}
                                >
                                  <img src={view} alt="" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>A03</td>
                            <td className="d-flex">
                              <img src={Ellipse7} alt="" />
                              <span>Pooja Patel</span>
                            </td>
                            <td>Principle</td>
                            <td>12/05/2018</td>
                            <td>Female</td>
                            <td>70000</td>
                            <td>6678962343</td>
                            <td>
                              <div className="action-btn">
                                <button
                                  onClick={() => {
                                    navigate("/edit-transaction");
                                  }}
                                >
                                  <img src={Edit} alt="" />
                                </button>
                                <button
                                  onClick={() => {
                                    navigate(" ");
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  <img src={Delete} alt="" />
                                </button>
                                <button
                                  onClick={() => {
                                    navigate("/view-transaction");
                                  }}
                                >
                                  <img src={view} alt="" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>A04</td>
                            <td className="d-flex">
                              <img src={picture} alt="" />
                              <span>Vijay Sharma</span>
                            </td>
                            <td>Vice Principle</td>
                            <td>15/07/2020</td>
                            <td>Male</td>
                            <td>50000</td>
                            <td>6678962343</td>
                            <td>
                              <div className="action-btn">
                                <button
                                  onClick={() => {
                                    navigate("/edit-transaction");
                                  }}
                                >
                                  <img src={Edit} alt="" />
                                </button>
                                <button
                                  onClick={() => {
                                    navigate(" ");
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  <img src={Delete} alt="" />
                                </button>
                                <button
                                  onClick={() => {
                                    navigate("/view-transaction");
                                  }}
                                >
                                  <img src={view} alt="" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="modal fade customDesign" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">&nbsp;</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src="assets/images/deleteModal_icon.png" alt="" className="mainIconModal"/>
                        <h2>Delete Staff</h2>
                        <p>Are you sure you want to Delete Vijay Sharma?</p>
                        <div className="footbutton">
                            <button type="button" className="custom-btn cancelBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="custom-btn custom-btnCus">Confirm</button>
                      </div>
                    </div>
                </div>
            </div>
        </div> */}
    </>
  );
}

export default Staff;
