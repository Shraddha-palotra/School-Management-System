import React from "react";
import deleteModal_icon from "../assets/images/deleteModal_icon.png";
import { deleteFee } from "../API's/FeeAPI";
import { useTranslation } from "react-i18next";

function DeleteFee({ data }) {
  //  console.log("delete student component rendered");
  //  console.log("data in the delete student",data);
  const {t} = useTranslation();
  const { isDeleteClick, deleteHandle } = data;
  // console.log("is delete",isDeleteClick);
  // console.log("delete handle",deleteHandle);

  const { flag, eachFeeData } = isDeleteClick;
  // console.log("items in the delete");

  const myStyle = {
    display: flag ? "block" : "none",
  };

  const handleDelete = async (eachFeeData) => {
    try {
      const result = await deleteFee(eachFeeData._id);
      if (result.status) {
        deleteHandle(false, result.deleteFeeData);
      }
    } catch (error) {
      console.log(error);
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
                  deleteHandle(false, eachFeeData);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <img src={deleteModal_icon} alt="" className="mainIconModal" />
              <h2>{t("Delete_Student")}</h2>
              <p>{t("Want_to_Delete")} {eachFeeData?.studentName}?</p>
              <div className="footbutton">
                <button
                  type="button"
                  className="custom-btn cancelBtn"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    deleteHandle(false, eachFeeData);
                  }}
                >
                  {t("Cancel")}
                </button>
                <button
                  type="button"
                  className="custom-btn custom-btnCus"
                  onClick={() => {
                    handleDelete(eachFeeData);
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

export default DeleteFee;
