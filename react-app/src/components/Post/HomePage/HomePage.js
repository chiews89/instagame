import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { CreateNewComment } from "../../Comments/CreateComment/CreateComment";
import SinglePostModal from "../GetSinglePost";
import { ThreeComments } from "../../Comments/LimitedComments/LimitedComments";
import { useEffect } from "react";
import { AllLikes } from "../../Likes";
import DeletePostModal from "../DeletePost";
import { FiSmile } from "react-icons/fi";
import "./HomePage.css";

export const AllPosts = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);

  const postsArr = Object.values(posts).reverse();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    history.push(`/login`);
  }

  return (
    <main className="posts-main">
      {postsArr.map((post) => (
        <div className="all-posts-container">
        <div className="single-post-username ">
          <div className="single-post-user">
            <i className="fa-solid fa-circle-user"></i>
            <div className="single-post-username-display">
              <NavLink to={`/users/${post.user_id}`}>{post?.username}</NavLink>
            </div>
          </div>
          {user.id === post.user_id && (
            <div className="delete-post-icon">
              <DeletePostModal post={post}  />
            </div>
          )}
        </div>
          <div key={`single-post-link ${post?.id}`} to={`/posts/${post?.id}`}>
            <div className="post-images">
              <img
                height={650}
                width={650}
                alt={""}
                src={post?.image}
                onError={(e) =>
                  (e.target.src =
                    "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo=")
                }
              />
            </div>
          </div>
          <div className="likes-comments-post">
            <AllLikes post={post} />
            <div className="post-user-description">
              <div className="post-d-user">
                <span className="username">
                  <NavLink to={`/users/${post.user_id}`}>
                    {post?.username}
                  </NavLink>
                  <span className="description">{post?.description}</span>
                </span>
              </div>
            </div>
            <div className="post-details">
              <SinglePostModal post={post} />
            </div>
            <div className="last-three-comments">
              <ThreeComments post={post} />
            </div>
            <div className="created-at-post">
              {post.created_at.slice(5, 17)}
            </div>
          </div>
          <div className="add-comment-container">
            <div className="add-comment-user-icon">
              <span className="smiley-face">
                <FiSmile />
              </span>
              <CreateNewComment post={post} />
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};
