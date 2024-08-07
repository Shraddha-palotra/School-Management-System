import React from "react";
import deleteModal_icon from "../assets/images/deleteModal_icon.png";
import { useTranslation } from "react-i18next";
import { deleteStudentAPI } from "../API's/StudentAPI";

function DeleteStudents({ data }) {

  const {t} =useTranslation();
  //  console.log("delete student component rendered");
  //  console.log("data in the delete student",data);
  const { isDeleteClick, deleteHandle } = data;
  // console.log("is delete",isDeleteClick);
  // console.log("delete handle",deleteHandle);
  const { flag, eachStudent } = isDeleteClick;
  // console.log("items in the delete");
  const myStyle = {
    display: flag ? "block" : "none",
  };

  const deleteStudent = async (items) => {
    const id = items._id;
    try {
      const res = await deleteStudentAPI(id);
      console.log("Response:", res);
      if (res.status) {
        console.log("Successfully deleted");
        deleteHandle(false, res.deleteStudent);
      }
    } catch (error) {
      console.log("Delete student error:", error);
    }
  };

  return (
    <>
      <div
        className={`modal fade customDesign ${flag && "show"}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={flag ? "true" : "false"}
        style={myStyle}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                &nbsp;
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  deleteHandle(false, eachStudent);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <img src={deleteModal_icon} alt="" className="mainIconModal" />
              <h2>{t("Delete_Student")}</h2>
              <p>{t("Want_to_Delete")}  {eachStudent?.studentName}?</p>
              <div className="footbutton">
                <button
                  type="button"
                  className="custom-btn cancelBtn"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    deleteHandle(false, eachStudent);
                  }}
                >
                  {t("Cancel")}
                </button>
                <button
                  type="button"
                  className="custom-btn custom-btnCus"
                  onClick={() => {
                    deleteStudent(eachStudent);
                  }}
                >
                  {t("Confirm")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteStudents;
