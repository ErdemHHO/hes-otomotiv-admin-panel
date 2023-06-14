import React from "react";
import { Modal } from "react-bootstrap";

function PhotoModal({ show, handleClose, imageUrl }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <img src={imageUrl} alt="Fotoğraf" style={{ width: "100%" }} />
      </Modal.Body>
    </Modal>
  );
}

export default PhotoModal;
