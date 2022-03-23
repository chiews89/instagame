import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SinglePostModal from "../Post/GetSinglePost";
import "./User.css";

export const UserProfile = () => {
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);
  const postsArr = Object.values(posts).reverse();

  const filteredPost = postsArr.filter((post) => {
    return post.user_id === user.id;
  });

  return (
    <div>
      <div className="profile-page-header">

      <h1>{user.username}</h1>
      <i className="fa-solid fa-circle-user"></i>
      </div>
      <div className="profile-page">
        {filteredPost.map((post) => (
          <div className="user-posts-container">
            <div key={`user-single-post ${post?.id}`} to={`/posts/${post?.id}`}>
              <div className="profile-post-image">
                <img
                  height={400}
                  width={400}
                  alt={post?.image_url}
                  src={post?.image_url}
                  onError={(e) =>
                    (e.target.src =
                      "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo=")
                  }
                />
              </div>
              <SinglePostModal post={post} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
