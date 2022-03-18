import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { EditComment } from "./EditComments";

const EditCommentModal = ({post, commentId}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-post-modal" onClick={() => setShowModal(true)}>
        Edit Comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment post={post} commentId={commentId} onClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
};

export default EditCommentModal;