import { Container } from "@material-ui/core";
import { Component, DeleteReview, submit, getStars } from "react";
import { Row, Col, state } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class ViewReviews extends Component {
  state = {
    reviews: [],
    config: {
      headers: { authorization: Bearer ${localStorage.getItem("token")} },
    },
  };

  componentDidMount() {
    axios
      .get("http://localhost:90/review/show")
      .then((response) => {
        console.log(response);
        this.setState({
          reviews: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  getStars = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} color="red" />);
    }
    return stars;
  };
  // getStars = () => {
  //   for (i = 0; i < this.state.reviews[i].stars; i++) {
  //     for (j = 0; j < this.state.reviews[i].stars; j++) {
  //       this.state.stars.push(<FontAwesomeIcon icon={faStar} />);
  //     }
  //   }
  //   return this.state.stars;
  // };

  DeleteReview = (reviewId) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(
                "http://localhost:90/review/delete/" + reviewId,
                this.state.config
              )
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err.response);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
    console.log("button clicked", reviewId);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.state.reviews.map((reviews) => {
              return (
                <div class="jumbotron">
                  <div class="row w-100">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                      <div class="card border-info mx-sm-1 p-3">
                        <div class="card border-info shadow text-info p-3 my-card text-center">
                          <span>
                            <FontAwesomeIcon icon={faStar} size="10em" /> Rating
                          </span>

                          <span class="fa fa-car" aria-hidden="true"></span>
                        </div>
                        <div class="text-secondary text-center mt-3">
                          <h4>{reviews.teamname}</h4>
                        </div>
                        <div class="text-danger text-center mt-2">
                          <p>{reviews.comment}</p>
                          <p>
                            {/* <FontAwesomeIcon
                              icon={faStar}
                              color="Yellow"
                              size="10em"
                            /> */}
                            {this.getStars(reviews.rate)}
                            {/* {reviews.rate} */}
                          </p>
                          <a
                            type="button"
                            onClick={this.DeleteReview.bind(this, reviews._id)}
                          >
                            <span>
                              <FontAwesomeIcon icon={faTrash} size="10em" />{" "}
                              Delete
                            </span>
                          </a>
                          <span> </span>

                          <a
                            type="button"
                            href={"/updateReview/" + reviews._id}
                          >
                            <span>
                              <FontAwesomeIcon icon={faEdit} size="10em" />{" "}
                              Update
                            </span>
                          </a>
                        </div>
                        <div class="col-md-3"></div>
                      </div>
                    </div>

                    {/* <div class="col-md-3">
                  <div class="card border-success mx-sm-1 p-3">
                    <div class="card border-success shadow text-success p-3 my-card">
                      <span class="fa fa-eye" aria-hidden="true"></span>
                    </div>
                    <div class="text-success text-center mt-3">
                      <h4>Eyes</h4>
                    </div>
                    <div class="text-success text-center mt-2">
                      <h1>9332</h1>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card border-danger mx-sm-1 p-3">
                    <div class="card border-danger shadow text-danger p-3 my-card">
                      <span class="fa fa-heart" aria-hidden="true"></span>
                    </div>
                    <div class="text-danger text-center mt-3">
                      <h4>Hearts</h4>
                    </div>
                    <div class="text-danger text-center mt-2">
                      <h1>346</h1>
                    </div>
                  </div>
                </div> */}
                    {/* <div class="col-md-3">
                  <div class="card border-warning mx-sm-1 p-3">
                    <div class="card border-warning shadow text-warning p-3 my-card">
                      <span class="fa fa-inbox" aria-hidden="true"></span>
                    </div>
                    <div class="text-warning text-center mt-3">
                      <h4>Inbox</h4>
                    </div>
                    <div class="text-warning text-center mt-2">
                      <h1>346</h1>
                    </div>
                  </div>
                </div> */}
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ViewReviews;