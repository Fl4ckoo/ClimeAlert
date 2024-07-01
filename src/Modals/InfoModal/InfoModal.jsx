import React from 'react'
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import './InfoModal.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    top: 'initial',
    left: 'initial',
    right: 'initial',
    bottom: 'initial',
    marginRight: 'initial',
    transform: 'initial',
    padding: '0',
    border: 'none',
    background: 'none',
    overflow: 'visible'
  }
};

Modal.setAppElement('#root');

function InfoModal({ isOpen, onRequestClose, description }) {
  const modalVariants = {
    hidden: { opacity: 0, y: '-15vh' },
    visible: { opacity: 1, y: '0' }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Weather Description"
    >
      <motion.div
        className="modal-wrapper"
        variants={modalVariants}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        transition={{ type: 'spring', stiffness: 120, duration: 0.5 }}
      >
        <div className="modal-content">
          <h2 className="modal-title">More Info</h2>
          <br />
          <p className="modal-description">{description}</p>
          <button onClick={onRequestClose} className="close-button">Close</button>
        </div>
      </motion.div>
    </Modal>
  );
}

export default InfoModal;