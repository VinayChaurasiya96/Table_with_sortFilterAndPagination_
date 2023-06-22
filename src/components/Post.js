import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardOverlay,
    MDBCardImage,
    MDBBtn
  } from 'mdb-react-ui-kit';

const Post = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state;

  return (
    <MDBCard background='dark' className='text-white'>
    <MDBCardImage overlay src='https://www.gigabyte.com/FileUpload/Global/KeyFeature/2115/innergigabyteimages/designconcept/dscc-img-bg.jpg' alt='...' />
    <MDBCardOverlay>
      <MDBCardTitle>{post.title.toUpperCase()}</MDBCardTitle>
      <MDBCardText>
        <hr />
      </MDBCardText>
      <MDBCardText>
        {post.body}
      </MDBCardText>
      
      <MDBBtn onClick={()=>navigate("/")}>Go Back</MDBBtn>
      
    </MDBCardOverlay>
  </MDBCard>
  );
};
export default Post;
