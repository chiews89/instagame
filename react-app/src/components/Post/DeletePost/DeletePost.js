import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSinglePost } from "../../../store/posts";
import EditPostModal from "../EditPost";

export const DeletePost = ({ post, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  if (!user) {
    history.push(`/login`);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteSinglePost(post));
    onClose(false);
  };

  return (
    <div className="edit-delete-post">
      <EditPostModal post={post} />
      <button className="delete-button" onClick={handleDelete}>
        Delete Post
      </button>
    </div>
  );
};
