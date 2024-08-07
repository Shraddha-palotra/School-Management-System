import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import HeaderDash from './HeaderDash'
import  Axios  from 'axios';
import { useTranslation } from 'react-i18next';



function Dashboard({isOpen, setIsOpen}) {

  const [totalStudent, setTotalStudent ] = useState([]);
  const [totalStaff, setTotalStaff ] = useState([]);
  const [totalFee, setTotalFee] = useState([]);
  const {t} = useTranslation();
  useEffect( () => {
    const fetchStudent = async (req, res) => {
      try {
        const res1 =await Axios.get("http://localhost:8080/student/showstudents")
        console.log("res1",res1.data.AllStudents);
        if (res1.data.status){
          setTotalStudent(res1.data.AllStudents)
        }
        else {
          setTotalStudent([]);
        }
      } catch (error) {
        console.log(error);
        setTotalStudent([]);
      }
    }
fetchStudent();
  },[])

  useEffect( () => {
    const fetchStaff = async (req,res) => {
      try {
        const res = await Axios.get("http://localhost:8080/staff/showstaffs")
        console.log("res",res.data.AllStaff);
        if (res.data.status){
          setTotalStaff(res.data.AllStaff)
        }
        else {
          setTotalStaff([]);
        }
      } catch (error) {
        console.log(error);
        setTotalStaff([]);
      }
    }
  fetchStaff();
  },[])

  useEffect( () => {
    const fetchFeeData = async (req,res) => {
      try {
        const res3 = await Axios.get("http://localhost:8080/fee/showfees")
        console.log("res3",res3.data.AllFee);
        if (res3.data.AllFee){
          setTotalFee(res3.data.AllFee)
        }
        else {
          setTotalFee([]);
        }
      } catch (error) {
        console.log(error);
        setTotalFee([]);
      }
    }
  fetchFeeData();
  },[])



  return (
<>
 <div className="wrapper">
      <Sidebar isOpen={isOpen}/>
    <div className={`main-container ${isOpen && 'main-content_large'}`}>
      <HeaderDash isOpen={isOpen}  setIsOpen={setIsOpen}  />
      <div className="content">
        <div className="row mb-3">
          <div className="col-xxl-12">
            <div className="row">
              <div className="col-xxl-12">
                <div className="greetingsText">
                  <div className="greetingsText-heading">
                    <h3>{t("Dashboard")}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-12">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="custom-card offlineEmployee">
                      <div className="left-data">
                        <div className="heading">
                          <h2 className="count">{t("Welcome")}</h2>
                          <span>{t("High_school")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="custom-card presentEmployee">
                      <div className="left-data">
                        <div className="heading">
                          <h2 className="count">{totalStudent.length}</h2>
                          <span>{t("Total_Student's")}</span>
                        </div>
                      </div>                     
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="custom-card presentEmployee">
                      <div className="left-data">
                        <div className="heading">
                          <h2 className="count">{totalStaff.length}</h2>
                          <span>{t("Total_Staff")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="custom-card absentEmployee">
                      <div className="left-data">
                        <div className="heading">
                          <h2 className="count">{totalFee.length}</h2>
                          <span>{t("Due_Amount's")}</span>
                        </div>
                      </div>
                    </div>
                  </div>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</>

  )
}

export default Dashboard