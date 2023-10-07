import { useState } from 'react';
import { Dialog, Overlay, Portal, Text, Button } from '@radix-ui/react-dialog';
import PropTypes from 'prop-types'; 

FeedbackDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  
const FeedbackDialog = ({ open, onClose }) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleFeedbackSubmit = () => {
    // Handle the feedback submission

    onClose();
  };

  return (
    <Portal>
      <Overlay>
        <Dialog open={open} onClose={onClose}>
          <div>
            <Text as="h2">Feedback</Text>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={5}
              placeholder="Type your feedback here..."
            />
            <Button onClick={handleFeedbackSubmit}>Submit</Button>
          </div>
        </Dialog>
      </Overlay>
    </Portal>
  );
};

export default FeedbackDialog;
