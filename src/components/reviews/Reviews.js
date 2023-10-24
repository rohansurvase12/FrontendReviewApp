import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'


function CustomAlert({ message, type }) {
    const alertClass = `alert ${type === "success" ? "alert-success" : "alert-danger"}`;
  
    return (
      <div className={`custom-alert ${alertClass}`}>
        {message}
      </div>
    );
  }

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    useEffect(()=>{
        getMovieData(movieId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;
     
        if (rev.value === '') {
            setAlertMessage('Review text cannot be empty');
            setAlertType('danger');
            setShowAlert(true); // Show the alert
      
            // Automatically clear the alert after 2 seconds
            setTimeout(() => {
              setAlertMessage('');
              setShowAlert(false); // Hide the alert
            }, 2000);
      
            return;
          }

        try
        {
            const response = await api.post("/api/v1/review",{review:rev.value,imdbId:movieId});

             console.log(rev.value);

            console.log(response);
            if(rev.value == ""){
                
            }
            const updatedReviews = [...reviews, {review:rev.value}];
    
            rev.value = "";
    
            setReviews(updatedReviews);

            setAlertMessage('Review text cannot be empty');
            setAlertType('success');
            setShowAlert(true); // Show the alert
      
            // Automatically clear the alert after 2 seconds
            setTimeout(() => {
              setAlertMessage('');
              setShowAlert(false); // Hide the alert
            }, 2000);
        }
        catch(err)
        {
            console.log("Eror");
            console.error(err);
        }
        



    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r) => {
                        return(
                            <>
                                <Row>
                                    <Col>{r.review}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews
