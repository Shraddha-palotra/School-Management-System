import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import { useNavigate } from "react-router-dom";
import dummyProfile from "../assets/images/dummyProfile.png";
import camera from "../assets/images/camera.png";

function AddFee() {
  const navigate = useNavigate();
  return (
    <>
      <div className="wapper">
        <Sidebar />
        <div className="main-container">
          <HeaderDash />
          <div className="content">
            <div className="row mb-3">
              <div className="col-xxl-12">
                <div className="form-body">
                  <div className="row">
                    <div className="col-xxl-12">
                      <div className="greetingsText mb-3">
                        <div className="greetingsText-heading">
                          <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                              <li className="breadcrumb-item">
                                <button
                                  onClick={() => {
                                    navigate("/fee");
                                  }}
                                >
                                  Fee's
                                </button>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                Add Fee
                              </li>
                            </ol>
                          </nav>
                          <h3>Fee's</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-2">
                      <div className="addProjectlogo">
                        <div className="upload-img-box">
                          <div className="circle">
                            <img src={dummyProfile} alt="" />
                          </div>
                          <div className="p-image ml-auto">
                            <label htmlFor="logoSelect">
                              <div>
                                <img src={camera} alt="" />
                              </div>
                            </label>
                            <input
                              className="file-upload"
                              id="logoSelect"
                              name="projectLogo"
                              type="file"
                              accept="image/*"
                            />
                          </div>
                        </div>
                        <h6>Profile Image</h6>
                      </div>
                    </div>
                    <div className="col-xxl-10">
                      <form className="row g-3">
                        <div className="col-md-4">
                          <label
                            htmlFor="fullname"
                            className="custom-form-label"
                          >
                            Enter Name{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            placeholder="Enter Name"
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="school-class"
                            className="custom-form-label"
                          >
                            Class <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="school-class"
                            placeholder="Enter Class"
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="class-section"
                            className="custom-form-label"
                          >
                            Section
                          </label>
                          <select className="custom-input-field">
                            <option value="" selected>
                              A
                            </option>
                            <option value="">B</option>
                            <option value="">C</option>
                            <option value="">D</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="quarterly"
                            className="custom-form-label"
                          >
                            Enter Quarterly Fee{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="quarterly"
                            placeholder="Enter Quarterly fee"
                          />
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="status" className="custom-form-label">
                            Status{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <span className="d-flex">
                            <div className="containGender">
                              <input
                                id="paid"
                                type="radio"
                                name="status"
                                value="paid"
                              />
                              <label className="ps-1" htmlFor="paid">
                                Paid
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="due"
                                type="radio"
                                name="status"
                                value="due"
                              />
                              <label className="ps-1" htmlFor="due">
                                Due
                              </label>
                            </div>
                          </span>
                        </div>

                        <div className="col-md-8">
                          <label
                            htmlFor="description"
                            className="custom-form-label"
                          >
                            Description
                          </label>
                          <textarea
                            type="text"
                            className="custom-input-field"
                            id="description"
                            placeholder="Enter Description"
                            rows="6"
                          ></textarea>
                        </div>
                        <div className="col-md-12 mt-4">
                          <button
                            onClick={() => {
                              navigate("#");
                            }}
                            className="custom-btn col-md-4"
                          >
                            Add Fee's
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddFee;
