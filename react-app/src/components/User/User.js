import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleProfilePostModal from "../Post/SinglePostProfile";
import "./User.css";

export const UserProfile = () => {
  const { userId } = useParams();
  const user = useSelector((state) => state.users[userId]);
  const posts = useSelector((state) => state.posts);
  const postsArr = Object.values(posts).reverse();
  const filteredPost = postsArr.filter((post) => {
    return post.user_id === +userId;
  });

  return (
    <div className="profile-page-container">
      <div className="profile-page-header">
        <div className="profile-user-picture">
          <i class="fa-solid fa-user"></i>
        </div>
        <div className="profile-page-name">{user.username}</div>
        <div className="post-count">{filteredPost?.length}</div>
        <div className="post-count-text">Post</div>
      </div>
      <div className="profile-page">
        {filteredPost.map((post) => (
          <div className="user-posts-container">
            <div key={`user-single-post ${post?.id}`} to={`/posts/${post?.id}`}>
              <div className="profile-post-image">
                <SingleProfilePostModal post={post} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
