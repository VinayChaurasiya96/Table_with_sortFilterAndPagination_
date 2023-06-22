import React, { useSyncExternalStore } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsArrowUpShort } from "react-icons/bs";
import { BsArrowDownShort } from "react-icons/bs";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBPagination,
  MDBPaginationLink,
  MDBPaginationItem,
} from "mdb-react-ui-kit";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(5);
  const navigate = useNavigate();

  // react hook
  useEffect(() => {
    loadData(0, pageLimit, 0);
  }, []);

  //fetch all posts using fetch method
  const loadData = async (start, end, increase) => {
    return await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${start}&_end=${end}`
    )
      .then((rowData) => rowData.json())
      .then((result) => {
        setPosts(result);
        setCurrentPage(currentPage + increase);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // handling search using axios method
  const handleSearch = async (e) => {
    e.preventDefault();

    await axios
      .get(`https://jsonplaceholder.typicode.com/posts?q=${e.target.value}`)
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => console.log(err));
  };

  // handling reset
  const handleReset = async (e) => {
    e.preventDefault();
    loadData(0, 5, 0);
  };

  const handleAsc = (type) => {
    console.log("asc");

    var sortedPosts = posts.sort((a, b) => (a[type] > b[type] ? 1 : -1));
    setPosts([...sortedPosts]);
    console.log(sortedPosts);
  };

  const handleDsc = (type) => {
    console.log("desc");
    var sortedPosts = posts.sort((a, b) => (a[type] < b[type] ? 1 : -1));
    setPosts([...sortedPosts]);
    console.log(sortedPosts);
  };

  //handle sort in ascending and descending order
  const handleSort = async (type, value) => {
    if (type === "ascending") {
      handleAsc(value);
    }

    if (type === "descending") {
      handleDsc(value);
    }
  };

  // handle single post view
  const handleView = (el) => {
    navigate("/post", { state: el });
  };

  const renderPagination = () => {
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1} </MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadData(5, 10, 1)}>Next</MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage > 0 && currentPage < 100 / pageLimit - 1) {
      return (
        <MDBPagination className="pagination-head">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadData((currentPage - 1) * 5, currentPage * 5, -1)
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationLink> {currentPage + 1} </MDBPaginationLink>

          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadData(
                  (currentPage + 1) * pageLimit,
                  (currentPage + 2) * pageLimit,
                  1
                )
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadData(5, 10, -1)}> Prev </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink> {currentPage + 1} </MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };
  return (
    <>
      {loading ? (
        <div>
          <span>Loading.....</span>
          <div
            className="spinner-grow"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <MDBContainer>
          <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center",
            }}
            className="d-flex input-group w-auto"
          >
            <input
              type="text"
              className="form-control"
              placeholder="Type here to search..."
              onChange={handleSearch}
            />

            <MDBBtn onClick={handleReset} className="mx-2">
              Reset
            </MDBBtn>
          </form>

          <div>
            <MDBRow>
              <MDBCol size="12">
                <MDBTable>
                  <MDBTableHead className="bg-dark text-white">
                    <tr>
                      <th scope="col">
                        ID
                       <span className="upDownArrow ">
                       <button onClick={(e) => handleSort("ascending", "id")}>
                          <BsArrowUpShort />
                        </button>
                        <button onClick={(e) => handleSort("descending", "id")}>
                          <BsArrowDownShort />
                        </button>
                       </span>
                      </th>
                      <th scope="col">
                        User ID
                        <span className="upDownArrow ">
                       <button onClick={(e) => handleSort("ascending", "userId")}>
                          <BsArrowUpShort />
                        </button>
                        <button onClick={(e) => handleSort("descending", "userId")}>
                          <BsArrowDownShort />
                        </button>
                       </span>
                      </th>
                      <th scope="col" className="">
                        Title
                        <span className="upDownArrow ">
                       <button onClick={(e) => handleSort("ascending", "title")}>
                          <BsArrowUpShort />
                        </button>
                        <button onClick={(e) => handleSort("descending", "title")}>
                          <BsArrowDownShort />
                        </button>
                       </span>
                      </th>
                      <th scope="col">
                        Body
                        <span className="upDownArrow">
                       <button onClick={(e) => handleSort("ascending", "body")}>
                          <BsArrowUpShort />
                        </button>
                        <button onClick={(e) => handleSort("descending", "body")}>
                          <BsArrowDownShort />
                        </button>
                       </span>
                      </th>
                      <th className="ActionBtn" scope="col">Action</th>
                    </tr>
                  </MDBTableHead>
                  {posts.length === 0 ? (
                    <MDBTableBody className="align-center mb-0">
                      <tr>
                        <td colSpan={8} className="text-center mb-0">
                          No data found
                        </td>
                      </tr>
                    </MDBTableBody>
                  ) : Array.isArray(posts) ? (
                    posts.map((el, index) => (
                      <MDBTableBody className="align-center mb-0" key={el.id}>
                        <tr>
                          <td className="text-center mb-0 mw-200">{el.id}</td>
                          <td className="text-center mb-0">{el.userId}</td>
                          <td className="text-center mb-0">{el.title}</td>
                          <td className="text-center mb-0">{el.body}</td>
                          <td className="text-center mb-0">
                            <MDBBtn onClick={() => handleView(el)}>View</MDBBtn>
                          </td>
                        </tr>
                      </MDBTableBody>
                    ))
                  ) : null}
                </MDBTable>
              </MDBCol>
            </MDBRow>
            <div
              style={{
                margin: "0 auto 100px auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
              }}
            >
              {renderPagination()}
            </div>
          </div>
        </MDBContainer>
      )}
    </>
  );
};

export default Posts;
