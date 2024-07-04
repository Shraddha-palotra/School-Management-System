import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import HeaderDash from './HeaderDash'
import  Axios  from 'axios';



function Dashboard({isOpen, setIsOpen}) {

  const [totalStundet, setTotalStudent ] = useState([]);


  useEffect( () => {
    const fun1 = async (req, res) => {
      try {
        const res1 =await Axios.get("http://localhost:8080/student/showstudents")
        console.log("res1",res1.data.AllStudents);
        if (res1.data.status){
          setTotalStudent(res1.data.AllStudents)
        }

      } catch (error) {
        console.log(error);
      }
    }
fun1()
  },[])

  return (
<>
 <div className="wapper">
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
                    <h3>Dashboard</h3>
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
                          <h2 className="count">Welcome</h2>
                          <span>High school</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="custom-card presentEmployee">
                      <div className="left-data">
                        <div className="heading">
                          <h2 className="count">{totalStundet.length}</h2>
                          <span>Number Of Student's</span>
                        </div>
                      </div>                     
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="custom-card presentEmployee">
                      <div className="left-data">
                        <div className="heading">
                          <h2 className="count">150</h2>
                          <span>Total Staff</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="custom-card absentEmployee">
                      <div className="left-data">
                        <div className="heading">
                          <h2 className="count">55</h2>
                          <span>Fee's Amount</span>
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