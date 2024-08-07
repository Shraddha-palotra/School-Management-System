import React from "react";
import deleteModal_icon from "../assets/images/deleteModal_icon.png";
import { useTranslation } from "react-i18next";
import { deleteStaffById } from "../API's/StaffAPI";

function DeleteStaff({ data }) {

  const {t} = useTranslation();

  //  console.log("delete student component rendered");
  //  console.log("data in the delete student",data);
  const { isDeleteClick, deleteHandle } = data;
  // console.log("is delete",isDeleteClick);
  // console.log("delete handle",deleteHandle);
  const { flag, eachStaff } = isDeleteClick;
  // console.log("items in the delete");

  const myStyle = {
     display: flag ? "block" : "none",
   };

   const handleDeleteStaff = async (staff) => {
    try {
      const result = await deleteStaffById(staff._id);
      if (result.status) {
        console.log('Delete successfully');
        deleteHandle(false, result.deleteStaff);
      }
    } catch (error) {
      console.error(error);
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
                  deleteHandle(false, eachStaff);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <img src={deleteModal_icon} alt="" className="mainIconModal" />
              <h2>{t("Delete_Staff")}</h2>
              <p>{t("Want_to_Delete")} {eachStaff?.staffName}?</p>
              <div className="footbutton">
                <button
                  type="button"
                  className="custom-btn cancelBtn"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    deleteHandle(false, eachStaff);
                  }}
                >
                  {t("Cancel")}
                </button>
                <button
                  type="button"
                  className="custom-btn custom-btnCus"
                  onClick={() => {
                    handleDeleteStaff(eachStaff);
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

export default DeleteStaff;
