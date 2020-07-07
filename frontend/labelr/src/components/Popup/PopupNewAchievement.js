import React, { useState, render } from 'react';
import { Button, Modal, Badge } from 'react-bootstrap';

function PopupNewAchievement() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let number = 100;
  let achievement = 'Top Labeler';

  return (
    <>
      <Button variant='outline-light' size='sm' onClick={handleShow}>
        1
      </Button>
      {/* <Button variant='primary' >
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Congratulations{' '}
            <span role='img' aria-label=''>
              &#127881;
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You labeled {number} Images!
          <br />
          Now you are in state {achievement}
          &#129351;
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Show my achievements
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<Popup />);

export default PopupNewAchievement;
