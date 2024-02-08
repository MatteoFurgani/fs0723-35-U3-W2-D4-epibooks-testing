import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  // componentDidUpdate = async (prevProps) => {
  //   if (prevProps.asin !== props.asin) {
  // this.setState({
  //   isLoading: true,
  // });

  useEffect(() => {
    if (props.asin) {
      fetchComments();
    }
    console.log("sono componentDidMount!");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin]);

  const fetchComments = async () => {
    setIsLoading({ isLoading: true });
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJiODlhYjViMjYxNTAwMTk4YTY5MmQiLCJpYXQiOjE3MDY3ODkyOTIsImV4cCI6MTcwNzk5ODg5Mn0.ZYggs7yUtVxNOAWvgrF-LvfxwnQmzL4vbWw4SxRdGwM",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        // this.setState({
        //   comments: comments,
        //   isLoading: false,
        //   isError: false,
        // });
        setComments(comments);
        setIsLoading({ isLoading: false });
        setIsError({ isError: false });
      } else {
        // this.setState({ isLoading: false, isError: true });
        setIsLoading({ isLoading: false });
        setIsError({ isError: true });
      }
    } catch (error) {
      console.log(error);
      // this.setState({ isLoading: false, isError: true });
      setIsLoading({ isLoading: false });
      setIsError({ isError: true });
    }
  };

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
