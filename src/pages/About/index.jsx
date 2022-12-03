import React, { useState, useEffect } from "react";
import "./index.scss";
import { useContext } from "react";
import { context } from "../../context";

const index = () => {
  const [num, setNum] = useState(0);
  const [user, setUser] = useState([]);
  const [load, setLoad] = useState(false);
  const { lang, langs, setLangs } = useContext(context);

  const a = lang[langs];


  const fetchUser = () => {
    fetch("https://reqres.in/api/users?page=2")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
        setLoad(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();

    return () => {
      console.log("willUnmount");
    };
  }, []);

  if (!load) {
    return <h1>LOADING . . .</h1>;
  }

  return (
    <>
      <div className="container">
        <div className="row p-5 ">
          <div className="card p-5 m-5">
            <h1 className="text-center">{a.userList}</h1>

            <ul className="list-group">
              {user.length > 0 ? (
                user?.map((e) => {
                  return (
                    <li className="list-group-item">
                      <div className="d-flex">
                        <img
                          src={e.avatar}
                          alt={e.email}
                          className={"img-thumbnail"}
                          style={{ width: "230px" }}
                        />
                        <ul className="list-group">
                          <li className="list-group-item">
                            <strong>{a.fName}</strong> {e.first_name}
                          </li>
                          <li className="list-group-item">
                            <strong>{a.lName}</strong> {e.last_name}
                          </li>
                          <li className="list-group-item">
                            <strong>{a.email}</strong> {e.email}
                          </li>
                        </ul>
                      </div>
                    </li>
                  );
                })
              ) : (
                <h2>USER LIST EMPTY</h2>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;