import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import Navbar from "../Components/Navbar";
import "../css/item_card.css";
import "../css/mylisting.css";
import Axios from "axios";
import { Card, Col, Container, Row, Badge } from "react-bootstrap";

export default function Feed() {
  // console.log("Status :", LOGGED_IN)
  // const [user_info,setuser_info]=useState(localStorage.getItem("user"))
  // const [user_info,setuser_info]=useState(localStorage.getItem('user'))
  // const [user_info, setuser_info] = useState(
  //   JSON.parse(localStorage.getItem("user"))
  // );
  // const [user_info,setuser_info]=useState('')
  // console.log(user_info)

  // const location = useLocation();
  // useEffect(()=>{
  //   if(location.user==null){
  //     console.log("if statement",user_info)
  //     // location.user=''
  //   }
  //   else{
  //     // console.log("Else",user_info)
  //     console.log(location.user)
  //     setuser_info(location.user)
  //     console.log(user_info)
  //     // console.log("Else statement",user_info)
  //   }
  // },[])
  // useEffect(()=>{
  //   console.log(location.user)
  //   localStorage.setItem('user',JSON.stringify(location.user))
  //   setuser_info((localStorage.getItem('user')))
  // },[])
  // console.log("User info is :", location.user);
  setConstraint(true);
  // var user_info
  // if(NEW_USER===false){
  //   user_info=location.user
  //   setUser(true)
  // }
  // console.log(constraint.LOGGED_IN);
  const [item, setitem] = useState("");
  const [Found_item, setFound_item] = useState();
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 15) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...." : " show less"}
        </span>
      </p>
    );
  };
  useEffect(() => {
    // console.log("Test");
    Axios({
      url: `https://lost-backend-3lwz.onrender.com/mylistings/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      method: "GET",
    })
      .then((response) => {
        // console.log(response.data.postitems);
        // console.log(response);
        let data = response.data.item;
        // console.log(response.data);
        let items = [];
        let Found_items = [];
        data.reverse().map((item) => {
          let created_date = new Date(item.createdAt);
          // console.log(date.toString());
          let createdAt =
            created_date.getDate() +
            "/" +
            created_date.getMonth() +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();
          items.push(
            <a href={`/${item.name}?cid=${item._id}&type=${item.type}/true`}>
              <Col key={item.name} style={{ marginTop: "2%" }} md={3}>
                {}
                <Card bsPrefix="item-card" style={{ maxHeight: "465px" }}>
                  <Card.Img
                    variant="top"
                    src={`https://lost-and-found-system.s3.amazonaws.com/${item.itemPictures[0].img}`}
                  />
                  <Card.Body bsPrefix="card-body">
                    {item.status ? (
                      <>
                        {" "}
                        <Badge pill variant="success">
                          Active
                        </Badge>
                      </>
                    ) : (
                      <>
                        <Badge pill variant="secondary">
                          Inactive
                        </Badge>
                      </>
                    )}
                    <Card.Title>Item :{item.name}</Card.Title>
                    {/* <Card.Text>Type :{item.type}</Card.Text> */}
                    {item.description ? (
                      <Card.Text>
                        Description :<ReadMore>{item.description}</ReadMore>
                      </Card.Text>
                    ) : (
                      ""
                    )}
                    <Card.Text>Type : {item.type}</Card.Text>
                    <Card.Text>Created at : {createdAt}</Card.Text>
                    {}
                  </Card.Body>
                  {}
                </Card>
              </Col>
            </a>
          );

          // var user1 = false;
          // if (item.createdBy === user_info._id) {
          //   user1=true
          // }
          // console.log("Lost item "+user1+item.name)
        });
        setitem(items);
        setFound_item(Found_items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="listing-title">
        <h2>My Listings</h2>
        <div className="title-border"></div>
      </div>
      <div>
        <Container fluid>
          <Row>{item}</Row>
        </Container>
      </div>
    </div>
  );
}
