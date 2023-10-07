import  { useEffect, useState } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Card } from '@radix-ui/themes';
import { Text, Flex } from '@radix-ui/themes';
import { PushSpinner} from "react-spinners-kit";
import { Button } from '@radix-ui/themes';
// import { Dialog, TextField } from '@radix-ui/react-dialog';

import FeedbackDialog from './feedback'; // Adjust the import path as needed

  // import { Dialog, TextField } from '@radix-ui/react-dialog';

  // Import the FeedbackForm component


// Example function to show how an API might behave
async function queryExampleAPI(querystring) {

  // Set some artificial loading time
  // The await keyword pauses execution of an async function until the awaited function resolves
  await new Promise(resolve => setTimeout(resolve, 2000));

  if (querystring === "crisis-response-data") {
    const mockData = [
      { question: 'How many responses did we do this past month?', answer: 'Answer 1' },
      { question: 'How many responses for each "crisis type"?', answer: 'Answer 2' },
      { question: 'How many responses for each tag?', answer: 'Answer 3' },
      { question: 'How many responses by location??', answer: 'Answer 4' },
      { question: 'How many responses by time of day?', answer: 'Answer 5' },
    ];

    const response = {
      error: null,
      data: mockData
    }
    return response // An `async` function returns a `Promise` that must be `await`ed inside another `async` function
  }

  // Sometimes APIs will return an error if your query is invalid or there are other issues
  const response = {
    error: new Error("Invalid API response"),
    data: null
  }
  return response
}

function DataDashboard() {
  // Defining a state variable to store the data
  // State variable is initially null, but will update once the API request finishes
  const [dashboardData, setDashboardData] = useState(null);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);


  // As if data was loading but will replace this with actual API requests
  useEffect(() => {

    // Define async function that calls the API
    const fetchAPIData = async () => {
      // TO-DO: Fetch data from an API endpoint or update it as needed
      const { error, data } = await queryExampleAPI("crisis-response-data"); // Async functions must be awaited
      
      if (error) {
        // Handle errors in API fetching. Ideally error messages should be displayed in the frontend UI, not just console.logged. Fine for development though
        console.log(error.message)
        return
      }

      setDashboardData(data);
      return
    };

    // Run the async function
    fetchAPIData();

  }, []); // Make sure to include the dependency array in useEffect, or your app will infinite loop

  const dashboard = dashboardData ? dashboardData.map((item, index) => (
    <div key={index}>
    <Flex direction="column" gap="3" >
      <Card variant="surface">
        <Text as="div" size="2" weight="bold">
        {item.question}       
         </Text>
        <Text as="div" color="gray" size="2">
        {item.answer}        
        </Text>
      </Card>
    </Flex>
    </div>

  )) : (
  <PushSpinner size={40} color="grey" left="50%"
       /> 

 )

  return (
    <div>
      <Theme>
        {/* Only show the loading spinner when dashboardData is null */}
        {dashboardData === null ? (
          <PushSpinner size={40} color="grey" left="50%"
          /> 
        ) : (
          <>
            <h2>Data Dashboard</h2>
            <ul>{dashboard}</ul>
            <div>
              <Button onClick={() => setIsFeedbackDialogOpen(true)}>Feedback</Button>
            </div>
            {/* Render the FeedbackDialog component */}
            <FeedbackDialog open={isFeedbackDialogOpen} onClose={() => setIsFeedbackDialogOpen(false)} />
                </>
        )}
      </Theme>
    </div>
  );
}

export default DataDashboard;